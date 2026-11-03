# Ijtimoiy imtiyozlar frontend prototipi

Route: `/apps/social-benefits`. Demo login: `social-benefits` / `ImtiyozDemo!26`.

Modul imtiyozlarning taqsimlanishi, foydalanilishi va tekshirish qamrovini tahlil qilish uchun frontendning o‘zida ishlaydi. Boshlang‘ich katalogdagi 150 ta chora texnik talab hujjatidan olingan. Shaxslar, kontingent bog‘lanishlari, foydalanish faktlari va moliyaviy natijalar namunaviy; huquqiy xulosalar emas.

Sidebar bo‘limlari sarlavhadan ochilib-yopiladi. Joriy sahifa bo‘limi navigatsiyada avtomatik ochiladi; bir nechta bo‘limni birga ochish mumkin. Ixcham ikonali rejimda barcha havolalar mavjud. Bu holat localStoragega yozilmaydi.

## Ekranlar

- Tahliliy boshqaruv: umumiy monitoring, risklar va takliflar, kontingent–imtiyoz matritsasi.
- Asosiy sahifalar: shaxslar reyestri, foydalanish holatlari, bog‘cha va qo‘shimcha ta’lim vaucherlari.
- Yordamchi sahifalar: muvofiqlik tekshiruvi.
- Hisobotlar: ustunlar va filtrlar sozlanadigan hisobot konstruktori.
- Sozlamalar: imtiyozlar katalogi, kontingentlar, tekshirish imkoniyatlari va manbalar.

Oldingi `/flow` va `/integrations` URLlari risklar va tekshirish imkoniyatlariga yo‘naltiriladi. Har bir sahifada tegishli yaratish/tahrirlash shakllari mavjud. Manba boshqaruvi tekshirish imkoniyatlari ekranida ochiladigan bo‘limga joylashtirilgan. Sarlavha umumiy headerda bir marta ko‘rsatiladi.

## Ma’lumotlar va hisoblash

420 ta shaxs, 210 ta oila, 14 ta hudud, 10 ta kontingent va avgust–oktyabr bo‘yicha 5 040 ta boshlang‘ich baholash yozuvi mavjud. Bir shaxs bir nechta kontingent va imtiyozda qatnashishi mumkin. Shaxs va oilalar umumiy hisobda takrorlanmaydi; foydalanish hodisalari manba + hodisa identifikatori bilan ajratiladi. Summa mavjud bo‘lmasa null saqlanadi.

Matritsada qatorlarda kontingentlar, ustunlarda imtiyozlar ko‘rsatiladi. Qator jamisi nomdan keyingi birinchi sonli ustunda, ustun jamisi birinchi ma’lumot qatorida. Excel ham shu tartibda tuziladi. Umumiy jamilar qidiruvga mos barcha imtiyozlarni qamrab oladi. Katakdagi holatlar baholash yozuvlari sonidir; jami shaxslar qayta takrorlanmas hisoblanadi. Katakdan shaxslar ro‘yxatiga o‘tiladi.

Tekshiruv uchun maxsus faol qoida kiritilgan bo‘lsa, yosh, jins, reyestr va kontingent mezonlari qo‘llanadi. Yosh profil qiymatidan olinadi; tarixiy tug‘ilgan sana hisoblanmaydi. Maxsus qoida bo‘lmasa eng so‘nggi demo fakt ishlatiladi. Bu to‘liq huquqiy qoida mexanizmi emas.

## Qo‘shimcha ta’lim va yo‘lkira

02.11.2026 texnik talabidagi 2-imtiyoz EDU-VOUCHER kodi bilan qo‘shilgan. Eski katalog identifikatorlari saqlanadi; hujjat tartib raqami alohida yuritiladi. Sidebardagi Vaucherlar bo‘limida Bog‘cha vaucherlari (/vouchers/kindergarten) va Qo‘shimcha ta’lim va yo‘lkira (/vouchers/education) alohida sahifalar sifatida ochiladi. Eski /vouchers havolalari tegishli sahifaga yo‘naltiriladi.

To‘garakning joriy oqimi bog‘cha vaucheri bilan bir xil: tashqi tizimdan tasdiqlangan reja → Kutilmoqda vaucher va vazirlikka avtomatik xabar → vazirlikning faollashtirish xabari → oylik to‘lovlar monitoringi. Amal muddati vazirlik yuborgan faollashtirish sanasidan bir kalendar yil. Operator reja tasdiqlamaydi, to‘garakka bog‘lamaydi, tarif hisoblamaydi yoki to‘lov kiritmaydi.

Ro‘yxat faqat mavjud vaucherlardan iborat. Ixcham Jami, Kutilmoqda, Faollashtirilgan va Muddati yakunlangan kartochkalari bor. Qidiruv, hudud filtri, pagination va Excel saqlangan. Bitta bolaga bir nechta vaucher alohida yozuvlarda ko‘rsatiladi. Batafsil kartada reja identifikatori, vazirlikka xabar, to‘garak, faollashtirish va tugash sanalari, jarayon tarixi hamda har oyda vazirlik yuborgan to‘garak va yo‘lkira to‘lovlari mavjud. Ma’lumot kelmagan oy nol summadan ajratiladi. Qo‘lda jarayon amallari yo‘q.

Har bir tasdiqlangan reja uchun aynan 2 ta vaucher avtomatik yaratiladi: 1-fan va 2-fan. Oliy ta’lim vazirligi ularni bittadan faollashtiradi. Har birining bir yillik muddati o‘z faollashgan sanasidan hisoblanadi; ikkinchi vaucher birinchisining muddatini o‘zgartirmaydi. Kartada ikkala vaucherning statusi va alohida muddatlari yonma-yon ko‘rsatiladi. 12 ta namunaviy vaucher: 5 ta Kutilmoqda, 3 ta Faollashtirilgan, 4 ta Muddati yakunlangan. Namunalar ikkala vaucher kutayotgan, bittasi faol, ikkalasi turli sanalarda faol va muddatlari yakunlangan holatlarni qamrab oladi. Yakunlanganlar to‘liq va qisman foydalanishni namoyish etadi. Joriy almashinuv receiveApprovedEducationPlan, receiveEducationActivation va receiveEducationMonthlyPayment orqali xotirada sinov qilinadi; takroriy xabarlar qo‘shilmaydi, tuzatilgan oylik summa oldingisini almashtiradi. Refresh boshlang‘ich namunalarga qaytaradi. Eski murojaat/hisoblash yordamchilari mavjud testlar uchun saqlangan, joriy sahifada ishlatilmaydi.

### Bog‘cha vaucheri: IHMA jarayoni

Reja boshqa tizimda shakllanadi. Uning ma’lumoti kelishi bilan IHMA modulida vaucher avtomatik **Kutilmoqda** holatida yaratiladi; qo‘lda reja yoki vaucher yaratish amali yo‘q. Takroriy reja xabari ikkinchi vaucher yaratmaydi. Vaucher paydo bo‘lishi bilan Ta’lim vazirligiga xabar avtomatik yuborilgan hisoblanadi; operatorning xabar berish amali yo‘q. Vazirlik qabul sanasi va tashkilot ma’lumotini yuborganda vaucher **Faollashtirilgan** bo‘ladi. Amal muddati faollashgan sanadan bir kalendar yil; tugash sanasi o‘tgach **Muddati yakunlangan** bo‘ladi. IHMA vazirlik yuborgan oylik to‘lovlarni monitoring qiladi; tarif hisoblash va pul o‘tkazish bajarilmaydi.

Ro‘yxat faqat mavjud vaucherlardan iborat: hujjat, shaxs, qabul, holat, foydalanish va ko‘rish belgisi. FIO to‘liq bosh harflarda; uchta status kartasi ro‘yxatni saralaydi. JAMI qatori yo‘q. Manbadan ma’lumot kelmagani nol to‘lovdan ajratiladi. Karta faqat ko‘rish va monitoring uchun: xabar yuborish, qabul yoki to‘lov kiritish demo tugmalari yo‘q. Qidiruv, pagination va Excel eksporti mavjud. Reja qabul qilish, qabul va oylik to‘lov xabarlari operativ xotirada ishlaydi; refresh boshlang‘ich namunalarni tiklaydi.

Bog‘cha namunalarida 3 ta Kutilmoqda, 3 ta Faollashtirilgan va 2 ta Muddati yakunlangan vaucher bor. Yakunlangan ikkita vaucher to‘liq (12/12 oy) va qisman (8/12 oy) foydalanishni namoyish etadi.

### Transport sahifalari

Sidebardagi Transport bo‘limi imtiyoz oluvchilar, chipta amallari, buyurtmanomalar/to‘lovlar sahifalariga kirishni beradi. Transport ma’lumotnomalari sidebarda chiqarilmaydi. Sahifalar /apps/social-benefits/transport ostida ayni transport komponentini ishlatadi; modul nomi, breadcrumb va ko‘rish huquqi social-benefits moduliga tegishli. Ichki havolalar shu modul doirasida qoladi. Maxsus transport amallari uchun alohida vakolat talablari saqlanadi. Eski transport modulining manzillari ham ishlashda davom etadi.

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
node --test src/features/social-benefits/domain.test.mjs src/features/social-benefits/prototype-store.test.mjs src/features/social-benefits/education.test.mjs src/features/social-benefits/kindergarten.test.mjs src/features/auth/data/demo-accounts.test.mjs
node node_modules/vite/bin/vite.js build
```

Testlar filtrlar, takrorlanmas hisoblar, matritsa jamisi, manba yetishmasligi, risk signal cheklovlari, shakl validatsiyasi, saqlash/qayta ochish, faol qoida, vaucher tarixi, xotira xatosi va modul vakolatlarini qamrab oladi.

### Sahifa tuzilishi

Ijtimoiy imtiyozlar sahifalari EI modulidagi `PageContainer`, `StatusTabs`, `FilterPopover` va umumiy tugmalardan foydalanadi. `BenefitsToolbar` qidiruv, filter va amallarni birlashtiradi; `BenefitsPagination` qatorlar soni, diapazon, tiklash va sahifa boshqaruvini beradi. Katta ekranda jadval ichidan aylanadi, pagination ko‘rinib turadi. Sidebar guruhlari mustaqil ochilib-yopiladi; faol sahifaning guruhi avtomatik ochiladi.

Bog‘cha va qo‘shimcha ta’lim sahifalari avval vaucherlar ro‘yxatini ochadi. Jarayon va hisoblar ro‘yxatdagi yozuv orqali ko‘riladi; umumiy ta’lim tahlili `Tahlil` tugmasidan ochiladi.
To‘garak ro‘yxati va kartasida yo‘nalish hamda aniq fan ko‘rsatiladi. Faollashtirish xabaridagi subjectId tashkilot taqdim etadigan fan bilan tekshiriladi. Bir bolaning bitta tasdiqlangan rejasidagi ikki vaucher bir xil fanga faollashtirilmaydi, hatto tashkilotlari turlicha bo‘lsa ham. Bir yo‘nalishdagi boshqa fan (masalan, ingliz tili va rus tili) uchun alohida faollashtirish mumkin.

Bog‘cha va to‘garak vaucherlarida tashkilot / fan almashishi alohida manba xabari sifatida qabul qilinadi (receiveKindergartenTransfer / receiveEducationTransfer). O‘tishlar kirish sanasi bilan ro‘yxat, karta va Excelda saqlanadi. Dastlabki faollashgan sana, tugash sanasi va yig‘ilgan to‘lovlar o‘zgarmaydi. To‘garakda bir rejaning ikki vaucheri bo‘yicha bir fanning davrlari ustma-ust kelishi taqiqlanadi.

Bog‘cha va to‘garak ro‘yxatlarida umumiy VoucherWorkspace ishlatiladi: 4 ixcham status kartasi, noyob bolalar, yakunlangan oylar ma’lumotining qamrovi, nazorat signallari, qo‘llanadigan kengaytirilgan filterlar va sahifa ichidagi Hisobot. Foydalanish bahosi joriy oydan oldingi yakunlangan oylar asosida, manba ma’lumoti to‘liq bo‘lsagina hisoblanadi; jami muddatdagi foydalanish alohida ko‘rsatiladi. Kutish chegarasi prototipdagi sozlanadigan 30 kunlik tahliliy mezon, normativ muddat emas.
Hisobot guruhini yoki sonini bosish tegishli ro‘yxatga olib o‘tadi. Excel ro‘yxat, o‘tishlar, oylik monitoring va parametrlarni; yig‘ma Excel hisobot va parametrlarni beradi. PDF uchun brauzerning chop etish / PDFga saqlash oynasi ishlatiladi. Tashkilot/fan kesimi joriy biriktirish bo‘yicha; tashkilotga bog‘langan to‘lov manbasi bo‘lmagani uchun mablag‘ tashkilotlar o‘rtasida sun’iy taqsimlanmaydi. JAMI noyob bolalar va vaucherlar bo‘yicha qayta hisoblanadi.
Vaucher kartasiga ?voucher=ID havolasi bilan kiriladi. Noto‘g‘ri ID xabar chiqaradi. Kartada nazorat, kirish/chiqish sanalari bilan tashkilot/fan tarixi va manba xabarlari mavjud. Ro‘yxatga qaytishda filter va sahifalash xotirada saqlanadi; to‘liq refreshda namunalar va ko‘rinish holati qayta boshlanadi.
