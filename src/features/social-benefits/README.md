# Ijtimoiy imtiyozlar frontend prototipi

Route: `/apps/social-benefits`. Demo login: `social-benefits` / `ImtiyozDemo!26`.

Modul imtiyozlarning taqsimlanishi, foydalanilishi va tekshirish qamrovini tahlil qilish uchun frontendning o‘zida ishlaydi. Boshlang‘ich katalogdagi 150 ta chora texnik talab hujjatidan olingan. Shaxslar, kontingent bog‘lanishlari, foydalanish faktlari va moliyaviy natijalar namunaviy; huquqiy xulosalar emas.

## Ekranlar

- Tahliliy boshqaruv: umumiy monitoring, risklar va takliflar, kontingent–imtiyoz matritsasi.
- Asosiy sahifalar: shaxslar reyestri, foydalanish holatlari, bog‘cha vaucherlari.
- Yordamchi sahifalar: muvofiqlik tekshiruvi.
- Hisobotlar: ustunlar va filtrlar sozlanadigan hisobot konstruktori.
- Sozlamalar: imtiyozlar katalogi, kontingentlar, tekshirish imkoniyatlari va manbalar.

Oldingi `/flow` va `/integrations` URLlari risklar va tekshirish imkoniyatlariga yo‘naltiriladi. Har bir sahifada tegishli yaratish/tahrirlash shakllari mavjud. Manba boshqaruvi tekshirish imkoniyatlari ekranida ochiladigan bo‘limga joylashtirilgan. Sarlavha umumiy headerda bir marta ko‘rsatiladi.

## Ma’lumotlar va hisoblash

420 ta shaxs, 210 ta oila, 14 ta hudud, 10 ta kontingent va avgust–oktyabr bo‘yicha 5 040 ta boshlang‘ich baholash yozuvi mavjud. Bir shaxs bir nechta kontingent va imtiyozda qatnashishi mumkin. Shaxs va oilalar umumiy hisobda takrorlanmaydi; foydalanish hodisalari manba + hodisa identifikatori bilan ajratiladi. Summa mavjud bo‘lmasa null saqlanadi.

Matritsada qatorlarda kontingentlar, ustunlarda imtiyozlar ko‘rsatiladi. Qator jamisi nomdan keyingi birinchi sonli ustunda, ustun jamisi birinchi ma’lumot qatorida. Excel ham shu tartibda tuziladi. Umumiy jamilar qidiruvga mos barcha imtiyozlarni qamrab oladi. Katakdagi holatlar baholash yozuvlari sonidir; jami shaxslar qayta takrorlanmas hisoblanadi. Katakdan shaxslar ro‘yxatiga o‘tiladi.

Tekshiruv uchun maxsus faol qoida kiritilgan bo‘lsa, yosh, jins, reyestr va kontingent mezonlari qo‘llanadi. Yosh profil qiymatidan olinadi; tarixiy tug‘ilgan sana hisoblanmaydi. Maxsus qoida bo‘lmasa eng so‘nggi demo fakt ishlatiladi. Bu to‘liq huquqiy qoida mexanizmi emas.

## Tekshirish imkoniyatlari va risklar

Moslik va foydalanish manbalari mustaqil yuritiladi: avtomatik, qo‘lda ko‘rib chiqish yoki manba yo‘q. Dastlabki 150 ta choradan 15 tasida kamida bitta manba yo‘qligi demo ssenariysi berilgan. Yangi imtiyozlar manba belgilanguncha noaniq hisoblanadi.

Moslik manbasi yo‘q bo‘lsa huquq aniqlanmagan natijasi beriladi. Foydalanish manbasi yo‘qligi foydalanmagan deb hisoblanmaydi. Ma’lum foydalanish fakti bilan noma’lum huquq bir vaqtda mavjud bo‘lishi mumkin. Avtomatlashtirilmagan choralar past foydalanish, nomuvofiqlik va balans xulosalaridan ajratiladi.

Risklar dalil, ta’sir, talqin chegarasi va ko‘rib chiqiladigan taklif bilan ko‘rsatiladi. Taklif, asos, mas’ul va ko‘rib chiqish holati brauzerda saqlanadi; imtiyoz avtomatik bekor qilinmaydi.

- Past foydalanish: kamida 5 ta huquqi bor baholash va foydalanish ulushi sozlanadigan chegaradan past. Boshlang‘ich chegara 70%; denominator used + unused yozuvlaridir.
- Balans signali: kamida 5 qamrab olingan shaxs va ma’lum summa / shaxs ko‘rsatkichi tanlangan qamrov o‘rtachasidan kamida 1,25 baravar yuqori. Ehtiyoj va xizmat turi normallashtirilmagan.
- Takrorlanish ehtimoli: normallashtirilgan nomlar bir xil; bu birlashtirish uchun yetarli asos emas.
- Nomuvofiqlik va mezon aniqligi: demo baholashlar asosidagi tekshirish signallari.

Qizil xavf va past foydalanishni, yashil ijobiy holatni, to‘q sariq ogohlantirish va ma’lumot yetishmasligini bildiradi. Holat matni va sonlari ham saqlangan. Hisoblash izohlari ochiladigan bo‘limda.

## Shakllar va saqlash

Imtiyoz, kontingent, shaxs, qoida, foydalanish/baholash, vaucher va manba shakllari bor. Takroriy JShShIR, imtiyoz raqami, manba hodisasi, sana va yosh chegaralari tekshiriladi. Dataset snapshoti brauzerga yozilgandan keyin qo‘llanadi; saqlash xatosida ma’lumot o‘zgarmaydi. Dastlabki katalog JSON fayli tahrirlanmaydi. Oldingi lokal vaucher holatlari va kontingent loyihalari saqlanadi.

Hisobot ustunlari, tartibi va filtrlarini nomlab saqlash mumkin. Excelda filtrlar va namunaviylik belgisi alohida varaqda, JShShIR matn sifatida saqlanadi. Vaucher holatlari va tarixi demo jarayoni bo‘lib, operatsion vaucher berish yoki to‘lov tasdig‘i emas.

## Tekshirish

```text
node node_modules/vue-tsc/bin/vue-tsc.js -b
node --test src/features/social-benefits/domain.test.mjs src/features/social-benefits/prototype-store.test.mjs src/features/auth/data/demo-accounts.test.mjs
node node_modules/vite/bin/vite.js build
```

Testlar filtrlar, takrorlanmas hisoblar, matritsa jamisi, manba yetishmasligi, risk signal cheklovlari, shakl validatsiyasi, saqlash/qayta ochish, faol qoida, vaucher tarixi, xotira xatosi va modul vakolatlarini qamrab oladi.
