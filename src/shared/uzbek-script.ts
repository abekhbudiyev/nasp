const latinDigraphs: Array<[string, string]> = [
  ["O‘", "Ў"],
  ["O'", "Ў"],
  ["o‘", "ў"],
  ["o'", "ў"],
  ["G‘", "Ғ"],
  ["G'", "Ғ"],
  ["g‘", "ғ"],
  ["g'", "ғ"],
  ["Sh", "Ш"],
  ["sh", "ш"],
  ["Ch", "Ч"],
  ["ch", "ч"],
  ["Ng", "Нг"],
  ["ng", "нг"],
  ["Yo", "Ё"],
  ["yo", "ё"],
  ["Yu", "Ю"],
  ["yu", "ю"],
  ["Ya", "Я"],
  ["ya", "я"],
];

const latinCharacters: Record<string, string> = {
  A: "А",
  a: "а",
  B: "Б",
  b: "б",
  D: "Д",
  d: "д",
  E: "Е",
  e: "е",
  F: "Ф",
  f: "ф",
  G: "Г",
  g: "г",
  H: "Ҳ",
  h: "ҳ",
  I: "И",
  i: "и",
  J: "Ж",
  j: "ж",
  K: "К",
  k: "к",
  L: "Л",
  l: "л",
  M: "М",
  m: "м",
  N: "Н",
  n: "н",
  O: "О",
  o: "о",
  P: "П",
  p: "п",
  Q: "Қ",
  q: "қ",
  R: "Р",
  r: "р",
  S: "С",
  s: "с",
  T: "Т",
  t: "т",
  U: "У",
  u: "у",
  V: "В",
  v: "в",
  X: "Х",
  x: "х",
  Y: "Й",
  y: "й",
  Z: "З",
  z: "з",
};

export function toUzbekCyrillic(value: string) {
  let result = value
    .replace(/(^|[\s([{"«“])E/g, "$1Э")
    .replace(/(^|[\s([{"«“])e/g, "$1э");

  latinDigraphs.forEach(([latin, cyrillic]) => {
    result = result.split(latin).join(cyrillic);
  });

  return [...result]
    .map((character) => latinCharacters[character] ?? character)
    .join("");
}

const letters:Record<string,string>={'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'yo','ж':'j','з':'z','и':'i','й':'y','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'x','ц':'ts','ч':'ch','ш':'sh','щ':'sh','ъ':'’','ы':'i','ь':'','э':'e','ю':'yu','я':'ya','ў':'o‘','қ':'q','ғ':'g‘','ҳ':'h'}

// Use a common spelling for matching names entered in either alphabet.
export function legacyLatin(value:string|undefined) {
  return (value??'').replace(/[ÖöĞğŞşÇç]/g,c=>({
    Ö:'O‘',ö:'o‘',Ğ:'G‘',ğ:'g‘',Ş:'Sh',ş:'sh',Ç:'Ch',ç:'ch',
  }[c]??c)).replace(/[А-Яа-яЁёЎўҚқҒғҲҳ]/g,(c,offset,source:string)=>{
    const lower=c.toLowerCase()
    const previous=source[offset-1]??''
    let letter=letters[lower]??c
    if(lower==='е' && (!/[\p{L}]/u.test(previous)||/[аеиоуэюяёъь]/i.test(previous))) letter='ye'
    return c===lower?letter:letter.charAt(0).toUpperCase()+letter.slice(1)
  })
}

const protectedTokens=/(https?:\/\/[^\s]+|[\w.-]+\.(?:uz|com|org)(?:\/[^\s]*)?|\b(?:CSV|XLSX|PDF|Excel|OneID|Humo|UzCard|OSM|OCHA|geoBoundaries)\b|\b(?:IV|III|II|I)(?=\s+(?:çorak|chorak|чорак))|\b(?:SR|DEMO)-[\w-]+|\b[hcr]\d+\b)/gi

function writeWords(text:string,cyrillic:boolean){
  if(!cyrillic) return legacyLatin(text).replace(/[oOgG][‘’ʻʼ'`]|sh|ch/gi,token=>{
    const letter=({o:'ö',g:'ğ',s:'ş',c:'ç'})[token[0]!.toLowerCase()]!
    return token[0]===token[0]!.toUpperCase()?letter.toUpperCase():letter
  }).replace(/(?<=\p{L})[’‘'ʻ](?=\p{L})/gu,'ʼ')
  return text.replace(/[a-zöğşç][a-zöğşç‘’ʻʼ'`]*/gi,word=>{
    const upper=word.length>1 && word===word.toUpperCase()
    let input=legacyLatin(word).replace(/[’ʻʼ'`]/g,'‘')
    input=input.replace(/yo‘/gi,m=>m[0]==='Y'?'Йў':'йў').replace(/ye/gi,m=>m[0]==='Y'?'Е':'е')
    if(upper) input=input.toLowerCase()
    const result=toUzbekCyrillic(input).replace(/[‘’]/g,'ъ').replace(/филтр/gi,match=>match[0]==='Ф'?'Фильтр':'фильтр')
    return upper?result.toUpperCase():result
  })
}

export function uzbekScript(value:string,cyrillic:boolean){
  return value.split(protectedTokens).map((part,index)=>index%2?part:writeWords(part,cyrillic)).join('')
}
