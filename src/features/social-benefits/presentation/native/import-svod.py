"""Usage: python import-svod.py path/to/workbook.xlsx (requires openpyxl)."""
import json
import re
import sys
from collections import defaultdict
from pathlib import Path
from openpyxl import load_workbook

home = Path(__file__).parent
book = load_workbook(sys.argv[1], read_only=True, data_only=True)
platform = json.loads((home / 'platform-data.json').read_text())
sheets = {s.title.strip(): s for s in book}
master = sheets['ЖАМИ имтиёзлар']
cohorts = ['ИЖТИМОИЙ РЕЕСТР', 'Ногиронлик', 'Етим болалар', 'ЖИЭМ', 'Тазйиқ ва зўравонлик',
           'Одам савдоси', 'Пенсия ва нафақа олувчилар', '1941-1945, ДРА, ЧАЭС']
categories = ['Агентликка ўтказиш','Такомиллаштириш','Ваучер','Ижтимоий карта','Проактив ва композит',
              'Рақамлашмаган','Самардорлиги паст','Қўшимча таклифлар']

def clean(value):
    return ' '.join(str(value).split()) if value is not None else ''

def key(value):
    return re.sub(r'[^\w]', '', clean(value).casefold())

def number(value):
    return value if type(value) in (int, float) else None

def records(sheet):
    return [(i,r) for i,r in enumerate(sheet.values,1) if clean(r[0]).rstrip('.').isdigit()]

index = defaultdict(list)
for entry in platform['registry']:
    index[(key(entry['n']), key(entry['b']), entry['ci'])].append(entry)

rows = []
by_source = defaultdict(list)
group = None
for i,r in enumerate(master.values,1):
    heading = key(re.sub(r'\s*\(\d+\)\s*$', '',clean(r[0])))
    if heading in map(key,cohorts):
        group = list(map(key,cohorts)).index(heading)
    if number(r[0]) is None:
        continue
    assert group is not None
    candidates=index[(key(r[2]),key(r[7]),group)]
    # Several providers may be named in one cell. Never split or repeat the reported amounts.
    owners=[entry for entry in candidates if key(entry['o']) in key(r[8])]
    linked = candidates if len(candidates)==1 else owners
    row=dict(row=i, cohort=group, name=clean(r[2]), kind=clean(r[3]), subtype=clean(r[4]),
             rate=clean(r[5]), note=clean(r[6]), basis=clean(r[7]), agency=clean(r[8]),
             digital=clean(r[9]), system=clean(r[10]).strip('-'), figures=[number(v) for v in r[11:15]],
             registryIds=[entry['id'] for entry in linked])
    rows.append(row)
    by_source[(key(r[2]),key(r[7]),key(r[8]))].append(i)

# A registry card must never inherit two indistinguishable source rows.
owners_by_id = defaultdict(list)
for row in rows:
    for registry_id in row['registryIds']:
        owners_by_id[registry_id].append(row['row'])
for row in rows:
    row['registryIds'] = [i for i in row['registryIds'] if len(owners_by_id[i]) == 1]

proposals=[]
for category in categories:
    for i,r in records(sheets[category]):
        if category == categories[-1]:
            name,note,basis,agency=r[1],r[3],r[2],''
        elif category == 'Рақамлашмаган':
            name,note,basis,agency=r[2],'',r[6],r[7]
        else:
            name,note,basis,agency=r[2],r[6],r[7],r[8]
        matches=by_source[(key(name),key(basis),key(agency))]
        proposals.append(dict(sheet=category,row=i,name=clean(name),note=clean(note),basis=clean(basis),
                              agency=clean(agency),masterRow=matches[0] if len(matches)==1 else None))
assert len({r['row'] for r in rows})==577
payload=dict(sheet=master.title.strip(),rows=rows,proposals=proposals)
(home/'svod-data.json').write_text(json.dumps(payload,ensure_ascii=False,separators=(',',':'))+'\n')
print(len(rows), 'measures;',sum(bool(r['registryIds']) for r in rows),'linked source rows;',len(proposals),'review entries')
