import source from './geography.json'

export type Bounds = readonly [number, number, number, number]
export type Point = readonly [number, number]

type RawDistrict = [id: string, name: string, mahallas: [id: string, name: string][]]
interface SourceRegion {
  id: string
  name: string
  shortName: string
  path: string
  center: Point
  districts: RawDistrict[]
}

export interface AreaScope {
  region?: string
  district?: string
  mahalla?: string
}

export interface MapFeature {
  id: string
  name: string
  path: string
  center: Point
  bounds: Bounds
}

const catalog = source as unknown as { regions: SourceRegion[]; camera: { P: number; lat0: number; lon0: number; Rg: number }; disc: { cx: number; cy: number } }
export const regions = catalog.regions.map(region => ({
  ...region,
  districts: region.districts.map(([id, name, mahallas]) => ({
    id, name,
    mahallas: mahallas.map(([id, name]) => ({ id, name })),
  })),
}))

export function resolveArea(scope: AreaScope) {
  const region = regions.find(item => item.id === scope.region)
  const district = region?.districts.find(item => item.id === scope.district)
  const mahalla = district?.mahallas.find(item => item.id === scope.mahalla)
  return { region, district, mahalla, scope: { region: region?.id, district: district?.id, mahalla: mahalla?.id } }
}

export function scopeName(scope: AreaScope): string {
  const { region, district, mahalla } = resolveArea(scope)
  return mahalla?.name ?? district?.name ?? region?.name ?? 'O‘zbekiston'
}

export function withinScope(parent: AreaScope, child: AreaScope): boolean {
  return (!parent.region || child.region === parent.region)
    && (!parent.district || child.district === parent.district)
    && (!parent.mahalla || child.mahalla === parent.mahalla)
}

export type NeighborhoodScope = Required<AreaScope>
export const neighborhoods = regions.flatMap(region => region.districts.flatMap(district => district.mahallas.map(mahalla => ({
  region: region.id, district: district.id, mahalla: mahalla.id,
  regionName: region.name, districtName: district.name, name: mahalla.name,
}))))

export function uniteBounds(features: readonly MapFeature[]): Bounds {
  return features.reduce<Bounds>((bounds, feature) => [
    Math.min(bounds[0], feature.bounds[0]), Math.min(bounds[1], feature.bounds[1]),
    Math.max(bounds[2], feature.bounds[2]), Math.max(bounds[3], feature.bounds[3]),
  ], [Infinity, Infinity, -Infinity, -Infinity])
}

function pathBounds(path: string): Bounds {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  for (const match of path.matchAll(/(-?[\d.]+)[ ,](-?[\d.]+)/g)) {
    const x = Number(match[1]), y = Number(match[2])
    minX = Math.min(minX, x)
    minY = Math.min(minY, y)
    maxX = Math.max(maxX, x)
    maxY = Math.max(maxY, y)
  }
  return [minX, minY, maxX, maxY]
}

export const republicFeatures: MapFeature[] = regions.map(({ id, shortName, path, center }) => ({
  id, name: shortName, path, center, bounds: pathBounds(path),
}))

const radians = Math.PI / 180
const { camera, disc } = catalog
const sinLatitude = Math.sin(camera.lat0 * radians)
const cosLatitude = Math.cos(camera.lat0 * radians)

function project(lng: number, lat: number): Point {
  const distance = (lng / 10000 - camera.lon0) * radians
  const latitude = lat / 10000 * radians
  const cosine = Math.cos(latitude)
  const sine = Math.sin(latitude)
  const depth = sinLatitude * sine + cosLatitude * cosine * Math.cos(distance)
  const scale = camera.Rg * (camera.P - 1) / (camera.P - depth)
  return [
    disc.cx + scale * cosine * Math.sin(distance),
    disc.cy - scale * (cosLatitude * sine - sinLatitude * cosine * Math.cos(distance)),
  ]
}

// DWH paths contain delta encoded lon/lat pairs, with one reset per ring.
function decodeFeature(id: string, name: string, encoded: string): MapFeature | undefined {
  if (!encoded) return undefined
  let path = ''
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  let largestRing = 0
  let center: Point = [0, 0]
  for (const ring of encoded.split(/[;|]/)) {
    const coordinates = ring.split(',')
    if (coordinates.length < 6) continue
    let longitude = 0, latitude = 0
    let ringPath = ''
    let area = 0, momentX = 0, momentY = 0
    let first: Point | undefined, previous: Point | undefined
    for (let i = 0; i + 1 < coordinates.length; i += 2) {
      longitude += Number(coordinates[i])
      latitude += Number(coordinates[i+1])
      const point = project(longitude, latitude)
      const [x, y] = point
      minX = Math.min(minX, x)
      minY = Math.min(minY, y)
      maxX = Math.max(maxX, x)
      maxY = Math.max(maxY, y)
      if (previous) {
        const cross = previous[0] * y - x * previous[1]
        area += cross
        momentX += (previous[0] + x) * cross
        momentY += (previous[1] + y) * cross
      }
      first ??= point
      previous = point
      ringPath += (i ? 'L' : 'M') + x.toFixed(3) + ' ' + y.toFixed(3)
    }
    if (first && previous) {
      const cross = previous[0] * first[1] - first[0] * previous[1]
      area += cross
      momentX += (previous[0] + first[0]) * cross
      momentY += (previous[1] + first[1]) * cross
    }
    if (Math.abs(area) > largestRing) {
      largestRing = Math.abs(area)
      center = [momentX / (3 * area), momentY / (3 * area)]
    }
    path += ringPath + 'Z'
  }
  if (!path || !Number.isFinite(minX + minY + maxX + maxY)) return undefined
  return { id, name, path, bounds: [minX, minY, maxX, maxY], center: largestRing ? center : [(minX+maxX)/2, (minY+maxY)/2] }
}

export interface RegionGeometry {
  districts: Record<string, string>
  mahallas: Record<string, string>
}

const requests = new Map<string, Promise<RegionGeometry>>()

export function loadRegionGeometry(region: string) {
  let request = requests.get(region)
  if (!request) {
    request = fetch(import.meta.env.BASE_URL + 'social-benefits/geography/' + region + '.json')
      .then(response => {
        if (!response.ok) throw new Error('Geometry unavailable')
        return response.json() as Promise<RegionGeometry>
      })
      .catch(error => {
        requests.delete(region)
        throw error
      })
    requests.set(region, request)
  }
  return request
}

export function featuresAt(scope: AreaScope, geometry?: RegionGeometry): MapFeature[] {
  const { region, district } = resolveArea(scope)
  if (!region) return republicFeatures
  if (!geometry) return []
  const rows = district ? district.mahallas : region.districts
  return rows.flatMap(row => {
    const rings = district ? geometry.mahallas[district.id + '/' + row.id] : geometry.districts[row.id]
    const feature = rings ? decodeFeature(row.id, row.name, rings) : undefined
    return feature ? [feature] : []
  })
}
