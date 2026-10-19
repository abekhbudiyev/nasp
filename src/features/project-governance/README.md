# Loyihalarni boshqarish — 346 + 79

NASP ichidagi ishlaydigan frontend MVP. Barcha ma’lumotlar Pinia xotirasida; sahifa yangilanganda demo boshlang‘ich holatga qaytadi. Tashqi xizmatlarga so‘rov yuborilmaydi.

## Ochish

`npm run dev -- --host 127.0.0.1 --port 5173`

`http://127.0.0.1:5173/apps/project-governance`

Kirish sahifasida «Demo hisoblar» → «Loyihalarni boshqarish» → «To‘ldirish» → «Kirish». Yoki frontend demo hisob: `project-governance` / `LoyihaDemo!26`.

## Amalga oshirilgan

- Modullar reyestri, sidebar, 8 sahifa va loyiha detali, modulga tegishli permission va demo hisobi.
- Konsepsiya, paket to‘liqligi, kotib ko‘rigi va nomuvofiq paketni qaytarish.
- Kengash: 10 a’zo, kamida 7 ishtirokchi, har bir ovoz, oddiy ko‘pchilik, bayonnoma rekviziti va 7 mezon.
- Ijobiy xulosa, qayta ishlash yoki maqsadga muvofiq emas xulosasi; qayta ishlash muddatini 1–30 ish kuni qilib belgilash.
- Muddati o‘tgan qayta topshirishni bloklash; yangi tashabbus yaratish mumkin.
- Konsepsiya roziligi → texnik talab → texnik topshiriq/smeta → TT tasdiqlash → loyiha buyrug‘i → shartnoma → ijro.
- Ijobiy xulosa, hujjat rekvizitlari va zarur ekspertiza xulosasi bo‘yicha o‘tish cheklovlari.
- Fayl biriktirish va yuklab olish; fayl versiyalari alohida attachment sifatida saqlanadi.
- Smeta: mutaxassis soni × oylik stavka × oy + 5%. Kishi/soat alohida maydon. Rasmiy tariflar mavjud emasligi ko‘rsatilgan.
- Oylik dalolatnoma, hisobot fayli, loyiha/oy bo‘yicha yagona yozuv, jami summaning loyiha qiymatidan oshmasligi, kumulyativ bajarilish pasaymasligi.
- Tashabbuskor va BTRTRning alohida kelishuvi; ikkala kelishuvdan so‘ng tasdiqlash; hisob-faktura bilan Jamg‘armaga yuborish; demo moliyalashtirish qaydi.
- Asosli e’tiroz, tuzatish izohi, qayta topshirishda yangi kelishuv; o‘zicha tuzatish muddati belgilanmaydi.
- Nazorat sanalari, kechikishlar, ish kunlari kalendari va foydalanuvchi kiritadigan dam olish sanalari.
- Loyiha/qaror/dalolatnoma harakatlari tarixi; Kengash xulosasida a’zolar ovozlari saqlanadi.
- JSON loyiha eksporti va ixcham, imzolanmagan HTML dalolatnoma eksporti. HTML eksport rasmiy shaklning to‘liq o‘rnini bosmaydi.

## Reglament va demo chegarasi

Buyruqlar: 346-son (17.12.2024) va 79-son (24.02.2026), taqdim etilgan nusxalar asosida. 79-son Nizomda majlisni tashkil etish «5 kun» deb berilgan, «5 ish kuni» emas. Paketni qaytarish esa «5 ish kuni».

Rolni tanlash demo simulyatoridir. Bu server RBAC yoki a’zoning shaxsiy elektron imzosi emas. Modul darajasidagi yo‘lga kirish NASPning mavjud demo auth/permission mexanizmi orqali tekshiriladi.

Ish kunlari hisoblashda keyingi kundan boshlab, shanba/yakshanba va kiritilgan dam olish sanalari chiqariladi. Bu hisoblash sozlamasi, rasmiy ishlab chiqarish kalendari emas. Ko‘chirilgan ish kunlari uchun integratsiya kerak.

Ijobiy xulosaga o‘tishda 7 mezonning baholanganini belgilash — interfeysning qayd talabi; buyruqdagi alohida elektron forma emas. Ekspertiza zarurligini mas’ul foydalanuvchi belgilaydi.

E’tiroz izohi va uning bartaraf etilganini qayd etish uchun demo forma bor; e’tiroz muddati, eskalatsiya va hujjatlarning yuridik kuchi qo‘shimcha reglamentga bog‘liq. Sukut avtomatik kelishish hisoblanmaydi.

## Ishlab chiqarish uchun qolgan ishlar

Backend/API va ma’lumotlar bazasi; serverdagi transition/RBAC nazorati; elektron imzo va versiyalangan hujjatlar; EDO; moliyaviy tizimdan to‘lov tasdig‘i; tasdiqlangan tarif va kalendar; bildirishnoma/eskalatsiya reglamenti; to‘liq rasmiy hujjat eksporti. Ushbu MVP ularning bajarilganini da’vo qilmaydi.

## Tekshirish

`node --test src/features/project-governance/domain.test.mjs src/features/auth/data/demo-accounts.test.mjs`

`npm run build`

`git diff --check`

29 avtomatik tekshiruv: kvorum, ovoz/ko‘pchilik, rol, hujjat, ekspertiza, ijobiy xulosa, qayta ishlash, dual kelishuv, e’tiroz, hisob-faktura, takroriy moliyalashtirish, summa grani, kumulyativ bajarilish, kalendar va modul izolyatsiyasi.

## Boshqaruv va ma’lumotnomalar

`/apps/project-governance/management` — tashkilotlar, tarkibiy bo‘linmalar, lavozimlar/rollar, xodimlar, loyiha mas’ul lavozimlari va audit. Tahrirlash — «Boshqaruv administratori · demo» roli.

Jarayon egasi: tashkilot + bo‘linma + barqaror lavozim IDsi + rol. Xodim lavozimga bog‘lanadi; loyiha va hujjat xodimning shaxsiy IDsi bilan bloklanmaydi. Xodim nofaol bo‘lganda ham loyiha holati, dalolatnoma kelishuvi va biriktirilgan lavozim saqlanadi. Shu lavozimdagi yangi faol xodim jarayonni davom ettiradi.

Amal muallifi: auditda actorId, actorName va positionId nusxasi saqlanadi. Xodim almashishi yoki ismi o‘zgarishi avvalgi amal muallifini o‘zgartirmaydi. «Demo xodim» tanlovi buni sinash uchun; haqiqiy shaxs autentifikatsiyasi va server vakolati hali ulanmagan.

Boshqa tashkilot yoki bo‘linmaning shu nomli roli avtomatik vakolat bermaydi: tanlangan xodim loyiha vazifasiga biriktirilgan aynan shu lavozimda bo‘lishi kerak. Vakant lavozimda hujjat navbatda qoladi; faol xodim tayinlangach davom etadi.

Faol loyihaga biriktirilgan lavozimni nofaol qilish himoyalangan. Xodimni esa vazifalarni qo‘lda ko‘chirmasdan nofaol qilish mumkin. Lavozim biriktirishni o‘zgartirish sababi auditga yoziladi. Xodimning rol/vazifalari uning lavozimidan olinadi. Bir lavozimda bir nechta faol demo xodim bo‘lishi mumkin; bu shtat birligi cheklovini modellashtirmaydi.

Kengashning individual ovozlari qaror tarixidagi alohida dalil; mavjud xulosalar qayta yozilmaydi. Buyruqdagi 10 a’zolik tarkib demo ko‘rigida saqlangan.

29 test: xodimdan vorisga o‘tish, eski muallif saqlanishi, shaxsni lavozim o‘rniga tayinlash taqiqlanishi, boshqa lavozimdagi bir xil rolning cheklanishi va oldingi biznes qoidalari.

Ma’lumotlar sessiya xotirasida. Ishlab chiqarish uchun umumiy tashkilot/lavozim/xodim reyestri, vaqtinchalik o‘rinbosarlik va server RBAC integratsiyasi kerak.

## IHMA rasmiy sayti ma’lumotlari — 14.10.2026

`official-directory.ts` rasmiy saytning shu sahifalarida ishlatiladigan ochiq Nuxt Content to‘plamidan tayyorlangan statik nusxa: management, central-office, organizations-under-agency. Manba sahifalari inglizcha; interfeys nomlari sayt to‘plamidagi o‘zbekcha variantdan olindi.

6 rahbariyat vakili; markaziy apparatda 34 lavozim; 13 tizim tashkilotida 28 rahbar/lavozim. Jami 68 rasmiy lavozim va xodim yozuvi. Tashkilotlar soni Agentlikning o‘zi bilan 14. Public ish telefonlari va email berilgan joylarda yozuvda saqlanadi. Manbadagi yozuvlar avtomatik autentifikatsiya yoki jarayon vakolati bermaydi.

Tashkilot nomlari rahbar lavozimidan ajratildi; markaziy bo‘linma nomlarida boshliq/mudir qo‘shimchasi ajratildi. Tizim tashkilotlarining ichki strukturasi berilmagan joylarda «Rahbariyat» mantiqiy guruhi tuzildi — bu alohida rasmiy bo‘linma deb talqin qilinmaydi. «Manbadan tuzilgan» belgisi shu hosil qilingan yozuvlarga tegishli.

6 mavjud demo lavozim/xodim va ikki demo ishchi guruh workflow sinovlari uchun saqlandi, «Demo jarayon» deb belgilandi. Xodimlar va lavozimlar tablari standart ravishda «Rasmiy sayt» filtrini ochadi. Kengash buyruqdagi tarixiy tarkibi ushbu import bilan yangilanmaydi. Rasmiy lavozimlarning process role ro‘yxati bo‘sh; administrator vakolatni reglament asosida alohida biriktiradi.

32 test: 68 yozuvning to‘liqligi, ID yagonaligi, org/unit/position/person bog‘liqligi, manba va sana, vakolatning avtomatik berilmasligi va avvalgi 29 jarayon tekshiruvi.
