# Transport imtiyozlari bo‘yicha bajariladigan ishlar va talablar tahlili

Tahlil sanasi: 2026-yil 12-oktabr.

## 1. Natija va joriy bosqich

Kontingent va chipta ma’lumotlarini yuritish ishga tushirilgan MVPning mavjud funksiyalari sifatida qabul qilinadi. Joriy ishlar oylik buyurtmanomani qabul qilish, chipta va hujjatlarni tekshirish, qoplash summasini tasdiqlash, subsidiya tizimiga yuborish va to‘lov natijasini tashuvchiga yetkazishga qaratiladi.

Biriktirilgan hujjatdagi 40 ta raqamlangan talab quyida to‘liq qamrab olindi. Takroriy talablar birlashtiriladi; bajarilgan UI ishlari qaytadan ishlab chiqish taski emas, tekshirish va zarur bo‘lsa real APIga ulash mezoni bo‘ladi.

### Solishtirilgan manbalar

- [Biriktirilgan ishlar ro‘yxati](</Users/aswillback/Downloads/0_Транспорт_имтиёзлари_ахборот_модулида_қилинадиган_ишлар (1).docx>): asosiy talablar, rasmlardagi jadvallar va FRONT BAJARILDI / BACKEND BAJARILDI belgilari.
- [Avvalgi backend/frontend tasklar](vmq-440-mvp-backend-frontend-tasks.md).
- [Avvalgi agent uchun ishlab chiqish rejasi](vmq-440-mvp-ai-agent-implementation-plan.md).
- [Avvalgi tashqi API kontraktlari](vmq-440-external-api-contracts.md).
- [Kanonik spetsifikatsiya](../VMQ-440_transport_imtiyozlari_AT_spetsifikatsiyasi.md) va [VMQ-440](https://lex.uz/docs/8400823).
- Mahalliy prototipdagi `ReimbursementPanel.vue`, `IntegrationExplorer.vue`, `finance-api-contracts.ts` va `reimbursement.ts`.

### Holatlarni talqin qilish

- **Hujjatda bajarilgan:** DOCXda aniq bajarildi belgisi bor. Bu belgi production backend va moliyaviy integratsiya tekshirilganini anglatmaydi.
- **Ulanishi kerak:** hujjatda frontend tayyor, backend endpointi kutilayotganligi ko‘rsatilgan.
- **Prototipda mavjud:** mahalliy frontendda ishlaydigan namuna bor, haqiqiy xizmatga ulash alohida ish.
- **Bajariladi:** yangi yoki tugallanmagan talab.

Hujjatda toifa nomi va kodi bo‘yicha backend ham bajarilganligi aniq ko‘rsatilgan. Moliyalashtirish paneli va chipta jadvalidagi ayrim maydonlar esa endpoint kutmoqda. Boshqa backend ishlari shu belgilar asosida avtomatik bajarilgan deb hisoblanmaydi.

## 2. Yakuniy yirik tasklar

Tasklar tashkilot yoki transport turi kesimida takrorlanmaydi. Bir xil jarayon uchun umumiy API, reyestr va ma’lumotnomalar qo‘llanadi. Mavjud MVP funksiyalari qayta yozilmaydi.

### Backend

#### BE-01. Fayl sozlamalari va alohida fayl xizmati

- `GET /v1/file-configs?purpose_code=TRANSPORT_REIMBURSEMENT`: hujjat turi, nomi, ruxsat etilgan kengaytmalar va majburiylik shartlarini ma’lumotnomadan qaytarish.
- `POST /v1/files`: faylni alohida saqlash va `file_id` qaytarish. So‘rovdagi fayl turi fileconfig qiymatiga mos bo‘lishi kerak.
- Biriktirish vaqtida fayl mavjudligi, yuklash tugallanganligi, turi va tashkilotga tegishliligini tekshirish.
- Vakolatli operator hujjatni ko‘rishi/yuklab olishi uchun fayl xizmati bilan ulanishni ta’minlash; bu operatsiyaning aniq kontrakti fayl xizmati bilan kelishiladi.

**Qabul natijasi:** buyurtmanomaga binary yoki base64 kiritilmaydi; `type: {id, code}` va `file_id` yuboriladi. Mos bo‘lmagan fayl biriktirilmaydi.

#### BE-02. Oylik buyurtmanoma va tuzatishlar

- `POST /v1/reimbursement-requests`: hisobot oyi, tashuvchining buyurtmanoma raqami, bank rekvizitlari, chipta qatorlari va hujjat IDlarini qabul qilish.
- Tizimning `request_id`si bilan tashuvchining `source_request_id`sini alohida saqlash.
- `POST /v1/reimbursement-requests/{request_id}/corrections`: xatoli buyurtmanomani yangi versiya sifatida qabul qilish; oldingi versiyani saqlash.
- Takror yuborilgan ayni buyurtmanoma uchun yangi to‘lov talabi yaratmaslik; boshqa mazmunni tuzatish sifatida boshqarish.
- Davr, tashkilot, qabul vaqti, versiya, holat va mas’ul xodim bo‘yicha ichki ro‘yxat/detail APIlarini berish.

**Qabul natijasi:** bitta tashkilotning bitta buyurtmanomasi aniq identifikator va versiyalar tarixiga ega; to‘lovga yuborilgan versiya o‘zgartirilmaydi.

#### BE-03. Tekshirish, hisoblash va tasdiqlash

- Chipta mavjudligi, tashuvchiga va davrga mosligi, imtiyoz huquqi, holati, qaytarish/almashtirish zanjiri va hujjatlarni tekshirish.
- Takroriy qator, boshqa buyurtmanomaga kiritilgan yoki boshqa kanal orqali qoplangan chiptani aniqlash.
- Qoplashga yaroqli chipta qatorlari bo‘yicha hisoblash; amaldagi narx, imtiyozli narx, so‘ralgan va tasdiqlangan summalarni alohida saqlash.
- Xatoni qator darajasida `reason: {id, code}` va tushunarli izoh bilan qaytarish.
- Mas’ulning tasdiqlash, tuzatishga qaytarish va yakuniy rad etish qarorlarini sabab, vaqt va tarix bilan saqlash.
- Hisobvaraqning mablag‘ oluvchi tashuvchiga tegishliligini tekshirish.

**Qabul natijasi:** qoplash summasi API so‘rovlari sonidan emas, tekshirilgan chiptalardan hosil bo‘ladi. `RECEIVED`, `APPROVED` va `PAID` bir-biridan ajratiladi.

**Kelishiladigan chegaralar:** tarif komponentlari, sotilgan/safarda foydalanilgan chipta bo‘yicha qoplash asosi, qisman qabul va yakuniy rad etish reglamenti. Ular frontend taxmini bilan hardcode qilinmaydi.

#### BE-04. Subsidiya integratsiyasi va to‘lov natijalari

- Tasdiqlangan buyurtmanoma versiyasi, summa va bank rekvizitlarini subsidiya modulining haqiqiy API kontraktiga mos yuborish.
- Tashqi `payment_id` va bizning buyurtmanoma/versiya o‘rtasidagi bog‘lanishni saqlash.
- To‘lov holatlarini qabul qilish; to‘lov sanasi, hujjat raqami, haqiqiy to‘langan summa va xato sababini yozish.
- Qayta yuborish, takroriy callback va kech kelgan xabarlar natijasida ikkinchi to‘lov yaratilishining oldini olish.
- `GET /v1/reimbursement-requests/{request_id}` orqali holatni berish; tashuvchiga status o‘zgarishi haqida xabar yuborish va yetkazish natijasini saqlash.
- Buyurtmanoma taqdim etilgan sana va 10 ish kunlik muddatni ish kunlari kalendari asosida kuzatish.

**Qabul natijasi:** texnik qabul javobi bilan jarayon tugamaydi; to‘lov natijasi tashuvchiga yetkaziladi. Kutilgan va haqiqiy to‘langan summa farqi tekshiruvga tushadi.

#### BE-05. Mavjud reyestrlar, ma’lumotnomalar va hisobotlarni boyitish

- Shaxs kartochkasida chipta, qaytarish va haqiqiy qoplangan summa tarixini ko‘rsatish uchun bog‘langan ma’lumotlarni berish.
- Hamrohni asosiy imtiyoz oluvchining ayni safariga bog‘lash; uni mustaqil toifa sifatida takror yaratmaslik.
- Tashkilotning STIRi, bank rekvizitlari, hudud, transport turi va amal qilish holatini ma’lumotnomalarda yuritish.
- Tasdiqlangan toifalar, geografiya, hisobot davrlari va sabablarni ma’lumotnomadan olish.
- Imtiyoz oluvchilar, chiptalar, qaytarishlar, buyurtmanomalar va to‘lovlar bo‘yicha umumiy hisobot APIlari, Excel eksporti va hisobot tarixini yaratish.
- Shaxslar soni, chipta soni va buyurtmanoma qatorlari soni uchun alohida hisoblash qoidalarini belgilash.

**Qabul natijasi:** statistika va detail ro‘yxatlar ayni filtrlar bilan mos keladi; to‘langan summalar faqat haqiqiy to‘lov natijalaridan hisoblanadi.

### Frontend

#### FE-01. Fayllarni yuklash va hujjatlarni biriktirish

- Yuklash maydonlarini fileconfig javobidan shakllantirish; hujjat nomi, kengaytmasi va majburiyligini ko‘rsatish.
- Faylni alohida yuklash, yuklanish/xato holatini va olingan fayl raqamini ko‘rsatish.
- Buyurtmanomaga yuklangan fayllarni turi bo‘yicha biriktirish; hujjatlarni ko‘rish/yuklab olish.
- Prototipdagi fayl nomlarini localStoragega yozish mexanizmini real fayl xizmatiga almashtirish.

**Qabul natijasi:** fayl muvaffaqiyatli yaratilmaguncha buyurtmanomaga biriktirilmaydi. Ruxsat etilgan kengaytmalar frontendda alohida hardcode qilinmaydi.

#### FE-02. Yagona buyurtmanomalar reyestri

- Yangi buyurtmanoma, davr/tashuvchi/holat filtrlari va detail oynasini real APIga ulash.
- “Barchasi”, “Qabul qilingan”, “Tasdiqlangan”, “Tuzatish kerak”, “Rad etilgan” ko‘rinishlarini ayni reyestr orqali berish.
- Tashuvchi STIRi, buyurtmanoma raqami, davr, yuborilgan/qabul qilingan sana, so‘ralgan/tasdiqlangan summa va mas’ulni ko‘rsatish.
- Detailda fuqaro va chipta qatorlari, tarif, imtiyoz, hujjatlar, versiya va o‘zgarishlar tarixini chiqarish.

**Qabul natijasi:** alohida tashuvchi yoki holat uchun takroriy sahifa va jadval ishlab chiqilmaydi; saqlangan filtr/tab ishlatiladi.

#### FE-03. Tekshirish va qaror qabul qilish oynasi

- Qator bo‘yicha tekshiruv natijasi, xato sababi va mos kelmayotgan summani ko‘rsatish.
- Tuzatish, qayta yuborish, tasdiqlash va rad etish jarayonlarini umumiy detail oynasida boshqarish.
- Tasdiqlashda hisob-kitob va bank hisob raqamini aniq ko‘rsatish; qaror bergan mas’ul va vaqtni chiqarish.
- Yakuniy rad etish bilan tuzatishga qaytarishni UI va ma’lumotnomada ajratish.

**Qabul natijasi:** foydalanuvchi nimani tuzatish kerakligini ko‘radi; “qabul qilindi”ni “to‘landi” deb tushunmaydi.

#### FE-04. To‘lovlar va tashuvchi uchun natija

- Subsidiya tizimiga yuborilgan, jarayondagi, to‘langan va bajarilmagan operatsiyalarni ko‘rsatish.
- To‘lov raqami, sana, hujjat, tasdiqlangan/to‘langan summa, bank rekvizitlari va xato sababini chiqarish.
- Buyurtmanoma raqami orqali holatni qidirish, qayta yuborish va tashuvchiga xabar yetkazish tarixini ko‘rsatish.
- Prototipdagi “To‘langan holatini ko‘rish (sinov)” tugmasini real ish rejimida olib tashlash; to‘langan holat faqat backend natijasidan olinadi.

**Qabul natijasi:** moliyalashtirish oynasi ayni buyurtmanoma va to‘lov ma’lumotlarining ko‘rinishi bo‘ladi; yangi mustaqil pul hisobini yaratmaydi.

#### FE-05. Shaxs kartochkasi, hisobotlar va umumiy interfeys

- Tugallanmagan talablar bo‘yicha shaxs kartochkasi, hamroh, safar va qoplash tarixini to‘ldirish.
- Qaytarilgan chiptalar uchun umumiy chipta reyestrida alohida tab/filtr va sabablar tahlilini yaratish.
- Hisobotlarni davr, hudud, manba, toifa, mamlakat, transport va tashuvchi bo‘yicha ko‘rsatish; Excel eksporti va hisobot tarixini ulash.
- Statistik kartochkadan ayni filtrlangan ro‘yxatga o‘tishni ta’minlash.
- Hujjatda bajarilgan menyu nomlari, jami sonlar, sana/raqam formati va tugma dizaynini umumiy komponentlar bilan tekshirish; ularni qaytadan alohida tasklarga ajratmaslik.
- Integrations sahifasidagi Request/Response namunalari bilan backend kontraktlarini bir xil saqlash.

**Qabul natijasi:** ko‘rsatkich va ro‘yxat sonlari bir xil hisoblash qoidasi bilan olinadi; pasport/foto kabi qo‘shimcha ma’lumotlar asosiy tashqi requestni kengaytirmaydi.

## 3. DOCXdagi 40 talabni solishtirish

Band raqamlari DOCXning o‘zidagi ro‘yxat raqamlaridir. “Bajarilgan” — hujjatdagi belgi; u alohida production tekshiruvi emas.

| Band | Talab | Qaror va izoh | Yakuniy task |
|---|---|---|---|
| 1 | Moliyalashtirish va hisobotlar menyusi | Frontend bajarilgan, moliyalashtirish endpoint kutmoqda. Menyuni qayta yaratish emas, ulash va funksiyalarni to‘ldirish | FE-04, FE-05 |
| 2–3 | Hujjatlar/Reyestr va benefitsiar nomini o‘zgartirish | Hujjatda bajarilgan. Sodda atamalarni yakuniy UI bilan moslash, qayta task ochmaslik | FE-05 tekshiruvi |
| 4 | Shaxslar sonini jadval yuqorisiga chiqarish | Hujjatda bajarilgan; 21 va 28 bilan umumiy jami komponent | FE-05 |
| 5, 10 | Toifa nomi va kodi bitta ustunda, alohida kod ustunini olib tashlash | Bir xil talab. Hujjatda backend/frontend bajarilgan. Bitta tekshiruv mezoni | FE-05 |
| 6 | Tug‘ilgan sana | Hujjatda frontend bajarilgan. Shaxs kartochkasi/reyestr ma’lumotiga bog‘lash | BE-05, FE-05 |
| 7 | Manba nomi va tashkilot filtri | Hujjatda bajarilgan. Manba nomi ma’lumotnomadan olinadi | BE-05, FE-05 |
| 8, 13 | Faol/passiv va sabablar, ranglar | Bajarilgan deb belgilangan; birlashtirish. “Vafot etgan”, “chet elda”, “JIEMda” holat/sabablarini aralashtirmaslik; faqat ushbu sabab asosida huquqni avtomatik bekor qilish normativ qoida bilan tasdiqlanadi | BE-05, FE-05 |
| 9 | Huquq IDsi o‘rniga bekor qilingan vaqt | UIda bajarilgan. Ichki huquq identifikatori bazada saqlanadi; faqat ustun yashiriladi | FE-05 |
| 11 | 5 xonali ID bilan shaxs qidirish | Qidiruv kerak. Aynan 5 xonaga cheklash shart emas; mavjud barqaror ichki raqam orqali qidirish | BE-05, FE-05 |
| 12 | Shaxs fotosi va 2026-yildan safar/to‘lov tarixi | Safar va to‘lov tarixi kerak. Foto manbasi bo‘lsa keyingi yaxshilash; tarixiy ma’lumotlar mavjud bo‘lgan davr ochiq ko‘rsatiladi | BE-05, FE-05 |
| 14 | IDni jami shaxslar soniga tenglashtirish | Chiqarish. Identifikator va COUNT boshqa tushunchalar; hujjatdagi izoh ham tenglashtirmaslikni bildiradi | Alohida task kerak emas |
| 15 | Dashboard, 12 toifa va hududiy statistikalar | Dashboard saqlanadi; 12 sonini hardcode qilish chiqariladi. Toifalar tasdiqlangan ma’lumotnomadan olinadi | BE-05, FE-05 |
| 16, 23, 29 | Tugmalar va ranglar | 16/23 bajarilgan deb belgilangan. 29 shu umumiy dizayn talabining takrori; bitta komponent bilan qoplash | FE-05 |
| 17 | Statistikadagi nomni soddalashtirish | Hujjatda bajarilgan. Qayta ishlab chiqish kerak emas | FE-05 tekshiruvi |
| 18 | Raqam formati va idoralar ulushi | Hujjatda bajarilgan. Ulush hisobida unique shaxs/huquq yozuvlari farqi belgilanadi | BE-05, FE-05 |
| 19 | Statistika kartochkasidan ro‘yxatga o‘tish | Hujjatda bajarilgan; barcha kartochkalar uchun umumiy filtrlangan ro‘yxatga o‘tish | FE-05 |
| 20, 22 | Bekor qilinganlarni manba/toifa kesimida ko‘rish | 22 bajarilgan. 20ni alohida yangi reyestr sifatida yaratmaslik; shu ko‘rinishni kerakli filtrlar bilan kengaytirish | BE-05, FE-05 |
| 21 | Jami ma’lumotni yuqoriga chiqarish | Hujjatda bajarilgan; 4/28 bilan birlashtirish | FE-05 |
| 24 | Foydalangan shaxslar va talon ma’lumotlari | Yangi tahliliy ko‘rinish kerak. “Chipta berilgan” va “foydalangan”ni ajratish; eski talon ma’lumotlari manbasi/importi bo‘lsa qo‘shish | BE-05, FE-05 |
| 25 | Hamroh ma’lumotlari | Mavjud hamroh modelini to‘ldirish. Asosiy benefitsiar/safar/chipta bilan bog‘lanadi; mustaqil kontingent jadvali yaratmaslik | BE-05, FE-05 |
| 26 | Hududiy statistika | 15 va 37 bilan birlashtirish | BE-05, FE-05 |
| 27 | Chipta bo‘limi nomini o‘zgartirish | Hujjatda bajarilgan; qayta task emas | FE-05 tekshiruvi |
| 28 | Chipta berilgan shaxslar jami soni | Hujjatda bajarilgan. Shaxs va chipta sonini ikki alohida ko‘rsatkich qilish | BE-05, FE-05 |
| 30 | Chipta jadvali ustunlari | Ustunlar tayyorligi, backend endpointi kutilishi qayd etilgan. Jo‘nash/kelish, reys, klass, narx maydonlarini APIga ulash | BE-05, FE-05 |
| 31 | Qaytarilgan chiptalar paneli | Kerakli ko‘rinish. Mavjud chipta reyestrida tab/filtr; sabab va qaytarish sanasini ko‘rsatish | BE-05, FE-05 |
| 32 | Buyurtmanomalar, qabul/rad, moliyalashtirish oynalari | Funksiyalar kerak; takroriy jadvallar o‘rniga yagona buyurtmanoma reyestri va bog‘langan to‘lov ko‘rinishi | BE-02…04, FE-02…04 |
| 33 | Tashuvchi bo‘yicha buyurtmanoma, umumiy va fuqaro detail jadvallari | Saqlash va umumlashtirish. Tashuvchi/oy filtri va umumiy detail komponent | BE-02, BE-03, FE-02 |
| 34 | Qabul/rad ro‘yxatlari va fuqaro kesimidagi tafsilotlar | 32/33ning status ko‘rinishi. Alohida servis/jadval emas. Rad etish, tuzatish va qator sabablari alohida yuritiladi | BE-03, FE-02, FE-03 |
| 35–36 | Qoplangan mablag‘lar va hudud/tashuvchi filtrlari | Saqlash. Faqat to‘lov tasdiqlari asosida hisoblash; so‘ralgan/tasdiqlangan summadan ajratish | BE-04, BE-05, FE-04, FE-05 |
| 37 | Davriy hisobotlar va Excel | Bitta hisobot mexanizmi, turli davr/filtrlar. Oylik, choraklik, yarim yillik, yillik uchun takroriy servis kerak emas | BE-05, FE-05 |
| 38 | Hisobotlar tarixini saqlash | Qo‘shish. Davr, filtrlar, yaratilgan vaqt, natija fayli va `file_id`ni saqlash | BE-01, BE-05, FE-05 |
| 39 | Shaxslar, buyurtmanomalar va moliya dinamikalari | 15/37 bilan bitta analitik ma’lumot manbasi; alohida takroriy hisoblash yo‘q | BE-05, FE-05 |
| 40 | Toifa, yo‘nalish, reys, tashkilot, foydalanuvchi, rol, FAQ | Ma’lumotnomalar kerak. Reys jadvalini tashuvchidan olish; to‘liq jadvalni qo‘lda yaratish yangi majburiy moliyaviy task emas. Mavjud foydalanuvchi/rol boshqaruvi qayta yozilmaydi. FAQ keyingi yaxshilash | BE-05, FE-05 |

## 4. Birlashtiriladigan takroriy ishlar

| Takrorlanish | Yagona yechim |
|---|---|
| 4, 21, 28: jami sonlarni yuqoriga chiqarish | Umumiy jadval sarlavhasida filtrlangan jami son |
| 5 va 10: toifa nomi/kodini birlashtirish | Bitta ustun, bitta ma’lumotnoma qiymati |
| 8 va 13: holat, rang va sabab | Holat belgisi + sabab + sana uchun umumiy komponent |
| 16, 23, 29: tugma dizayni | Yangilash, tozalash, filtr va eksport tugmalarining umumiy komponenti |
| 20 va 22: bekor qilinganlar ro‘yxati | Ayni reyestrning status/manba/toifa filtri |
| 15, 26, 37, 39: statistika va davriy hisobot | Umumiy filtrlar, bir xil hisoblash qoidalari va bog‘langan grafik/ro‘yxat |
| 32–34: barcha/qabul/rad/tashuvchi bo‘yicha buyurtmanoma | Bitta reyestr + status va tashkilot filtrlari + bitta detail oynasi |
| 35–36 va 37: qoplangan mablag‘ hisobotlari | To‘lov natijalaridan olinadigan umumiy analitik ma’lumot |

## 5. Chiqariladigan yoki qayta yoziladigan talablar

1. **IDni shaxslar soniga tenglashtirish:** noto‘g‘ri talab; ID barqaror identifikator, jami esa filtrlangan unique yozuvlar soni.
2. **Aynan 5 xonali ID majburiyligi:** faqat qidiruv uchun bunday cheklov kerak emas. Mavjud raqam orqali qidirish saqlanadi.
3. **12 ta toifani kodga qattiq yozish:** tasdiqlangan ma’lumotnoma va huquqiy asosga almashtiriladi. DOCXdagi son rasmiy yopiq katalog sifatida olinmaydi.
4. **Har bir tashuvchi yoki status uchun mustaqil jadval/servis:** umumiy reyestrning filtrlari bilan almashtiriladi; foydalanuvchi ko‘rinishlari saqlanadi.
5. **Faylni buyurtmanoma body ichida yuborish:** yangi modelda kerak emas; alohida fayl xizmati + `file_id`.
6. **To‘lovni faqat yuborish/qabul javobi bilan tugatish:** eski MVP chegarasi joriy moliyaviy bosqichga mos emas; to‘lov natijasi va tashuvchiga yetkazish qo‘shiladi.
7. **Tugma ranglari va nomlar uchun bajarilgan ishlarni qayta task qilish:** regressiya tekshiruvi sifatida qoladi.
8. **Mavjud foydalanuvchi/rol boshqaruvini qayta yaratish:** yangi auth moduli taski ochilmaydi. Moliyaviy tasdiqlash va rad etish mavjud vakolatlar bilan ishlashi kerak.

Quyidagilar keraksiz emas, lekin moliyaviy jarayonni ishga tushirish uchun keyingi yaxshilashga ajratilishi mumkin: foto, FAQ, to‘liq reys jadvali muharriri, keng qamrovli tarixiy talon importi. Talon importi zarur limit yoki qoplash hisobiga ta’sir qilsa, tegishli oqimdan oldin bajariladi.

## 6. Yangi qo‘shiladigan ishlar va prototipdagi ochiq joylar

| Ish | Hozirgi holat | Qo‘shiladigan natija |
|---|---|---|
| GET fileconfig | Integrations sahifasida Request/Response bor | Backend ma’lumotnomasi va formani dinamik boshqarish |
| Alohida fayl yuklash | Prototipda metadata va file_id simulyatsiyasi | Haqiqiy fayl ombori, ko‘rish/yuklab olish va egasini tekshirish |
| Buyurtmanoma API | Frontend namunasi bor | Backend saqlash, ro‘yxat/detail va takror yuborish nazorati |
| Versiyali tuzatish | API namunasida bir xil request_id/yangi version; UI yangi buyurtmanoma yaratmoqda | UI va backendni bir xil versiya modeliga keltirish |
| Hujjat turlari | Ma’lumotnoma namunasi bor | Majburiylik, kengaytma va elektron chipta shartlarini server/FEda ayni konfiguratsiyadan olish |
| Pul va rekvizitlar | API namunasi tiyinda va bank_code bilan; UI so‘mda, bank_code maydoni yo‘q | Bir xil Money konvertatsiyasi; bank_code va tashuvchi STIRini ma’lumotnomaga ulash |
| Qator xatolari | Prototipda asosan erkin matn | Backenddan sababning id/code qiymati va qator natijasi |
| Yakuniy rad etish | DOCX talab qiladi; joriy modelda faqat NEEDS_CORRECTION mavjud | Rad etish holati va qaror sababi; tuzatishga qaytarishdan ajratish |
| Qisman to‘lov va qaytarilgan to‘lov | Joriy namuna PAID/FAILED bilan cheklangan | Subsidiya kontrakti qo‘llasa alohida holatlar, summalar va solishtirish |
| Subsidiya adapteri | Request/Response namunalari bor | Haqiqiy endpointlar, mapping va to‘lov natijalari |
| Callback va polling | Ekranda simulyatsiya va namuna bor | Haqiqiy tashqi callback, yetkazish natijasi va GET holat API |
| 10 ish kunlik muddat | Hozir matn bilan ko‘rsatilgan | Sana/ish kunlari kalendari, muddat nazorati va kechikish ko‘rsatkichi |
| Qoplangan mablag‘ statistikasi | Frontend demo summalari bor | PAID va haqiqiy summalardan olinadigan hisobot |
| Kontraktlar bir xilligi | Eski integrations kontingent/chipta namunalari yangi alohida MDlardan farq qiladi | Integrations, MD, OpenAPI va backend uchun yagona model |

## 7. Eski hujjatlardagi tafovutlar

| Manba | Tafovut | Qaror |
|---|---|---|
| Avvalgi backend/frontend tasklar | To‘lov/moliyalashtirish keyingi bosqich deb yozilgan | Endi mavjud MVPga qo‘shilayotgan moliyaviy ishlar ro‘yxati sifatida yangilanishi kerak |
| Agent uchun implementation reja | Jarayon texnik ACK/NACKda tugaydi; post-payment listener o‘chiq | To‘lov natijasini qabul qilish, saqlash va tashuvchiga berish bilan kengaytirish |
| Eski tashqi API kontraktlari | `/v1/settlements`, `claim`, alohida issue/events va storage reference modeli | Yangi buyurtmanoma tashqi kontrakti bilan aniq mapping yaratish; ichki claim modelini takroriy API sifatida tashuvchiga chiqarmaslik |
| Kanonik spetsifikatsiya | Huquqiy talablar va tasdiqlanadigan hisoblash qoidalari | Saqlanadi. Yangi moliyaviy kontrakt alohida qo‘shimcha hujjat; tasdiqlanmagan qoidalar bajarilgan deb belgilanmaydi |
| DOCXdagi skrinshotlar | Misol foizlar, toifa kodlari va geografiya yozuvlari bor | Namuna maket sifatida olinadi; hisoblash qoidasi yoki rasmiy klassifikator sifatida olinmaydi |

“MDH” umumiy sarlavhasi tegishli Bitimga kiruvchi davlatlar ro‘yxatining o‘rnini bosmaydi. Mamlakatlar va ularga tegishli amal davri ma’lumotnomadan aniqlanadi. Shaxsning yashash hududi, jo‘nash/kelish hududi va tashuvchining hududi hisobotda alohida tushunchalar sifatida yuritiladi.

## 8. Normativ talab va loyiha qarorini ajratish

[Nizomning 17–18-bandlari](https://lex.uz/docs/8400823#8405929) bo‘yicha tashuvchi oylik reyestrni keyingi oyning 10-sanasigacha, zarur ilovalar va amaldagi/imtiyozli qiymatlar bilan taqdim etadi. Mablag‘ hujjatlar taqdim etilgach 10 ish kuni ichida tegishli tashuvchining bank hisobvarag‘iga o‘tkaziladi.

Fileconfig, file_id, REST endpointlari, callback, texnik status ID/code qiymatlari — loyihada kelishilgan texnik yechimlar. Ular qarorning o‘zida tayyor API sifatida belgilanmagan.

Quyidagi masalalar alohida hisob-kitob reglamenti yoki subsidiya kontraktidan aniqlanadi:

- tarif tarkibidagi xizmat/yig‘imlarni qoplash;
- qisman qabul va qisman to‘lov;
- to‘lovdan keyingi chipta qaytarilishi va moliyaviy tuzatish;
- kech buyurtmanoma va kamchilikli hujjatlarning muddatga ta’siri;
- buyurtmanomani yakuniy rad etish asoslari;
- tashqi to‘lovning yakuniy tasdiqlovchi statusi va hujjati.

## 9. Bajarish ketma-ketligi

1. **Kontraktlarni birlashtirish:** fileconfig, buyurtmanoma, tuzatish, xato sabablari, statuslar va subsidiya mappingini yakunlash.
2. **Fayl va buyurtmanoma:** BE-01/02 va FE-01/02; haqiqiy fayl IDsi bilan buyurtmanoma qabul qilish.
3. **Tekshirish va tasdiqlash:** BE-03 va FE-03; qayta yuborish va versiya nazorati.
4. **To‘lov va natija:** BE-04 va FE-04; subsidiya sandboxida end-to-end tekshirish, takror to‘lovsiz qayta so‘rov.
5. **Hisobot va mavjud UI yakuni:** BE-05 va FE-05; qoplangan summalar, shaxs tarixi va DOCXdagi bajarilgan ishlarni regressiya tekshiruvi.

### Umumiy yakuniy qabul

- Fayl alohida yuklanadi, buyurtmanoma faqat file_id bilan yuboriladi.
- Buyurtmanoma tekshiriladi; xato sababi qator kesimida qaytadi va tuzatish yangi versiya yaratadi.
- To‘lov tasdiqlangan ayni versiya va summaga bog‘lanadi.
- Takror so‘rov/xabar ikkinchi to‘lov yaratmaydi.
- Haqiqiy to‘lov natijasi tashuvchiga callback va GET orqali yetkaziladi.
- Moliyaviy hisobotlar so‘ralgan, tasdiqlangan va to‘langan summalarni aralashtirmaydi.
- Mavjud kontingent/chipta funksiyalari saqlanadi; bir xil imkoniyatlar qayta ishlab chiqilmaydi.
