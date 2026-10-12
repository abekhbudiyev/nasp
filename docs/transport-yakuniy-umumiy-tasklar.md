# Transport imtiyozlari modulini rivojlantirish bo‘yicha yakuniy umumiy tasklar

Sana: 2026-yil 12-oktabr. Shakl: mavjud tizimni rivojlantirish bo‘yicha tavsiyalar.

Backend va frontend real holatda mavjud, MVP chiqarilgan. Imtiyoz oluvchilar va chiptalarni yuritish mavjud jarayon sifatida qabul qilinadi. Quyidagi ishlar mavjud imkoniyatlarni tekshirish, bir-biriga moslashtirish va yetishmayotgan qismlarni to‘ldirishga qaratilgan. Bajarilgan ishlar qayta yaratilmaydi.

## Umumiy tasklar

| ID | Ish paketi | Tavsiya etiladigan ishlar | Kutiladigan natija |
|---|---|---|---|
| T-01 | Mavjud tizim va APIlarni moslashtirish | Amaldagi backend/frontend kontraktlarini solishtirish; bajarilgan, ulanishi kerak va yetishmayotgan qismlarni aniqlash. Sodda atamalar, yagona statuslar va API namunalari bo‘yicha tafovutlarni bartaraf etish | Amaldagi funksiyalar saqlangan, ikki tomon uchun kelishilgan kontrakt va aniq qolgan ishlar |
| T-02 | Fayllar va ma’lumotnomalar | Mavjud fayl xizmatini qo‘llash; GET fileconfig orqali hujjat nomlari, kengaytmalari va majburiylik shartlarini olish. Fayllarni alohida yuklab, buyurtmanomaga hujjat turi va file_id biriktirish | Fayl almashinuvi buyurtmanomadan ajratilgan; frontend konfiguratsiyani backenddan oladi |
| T-03 | Oylik buyurtmanomalar va tuzatishlar | Barcha tashuvchilar uchun yagona buyurtmanoma jarayoni; davr, chipta qatorlari, bank rekvizitlari va hujjat IDlari. Ro‘yxat/detail, filtrlar va ayni buyurtmanomaning yangi versiyasi orqali tuzatish | Takroriy so‘rovlar yangi buyurtmanoma/to‘lov yaratmaydi; versiyalar tarixi saqlanadi |
| T-04 | Tekshirish va tasdiqlash | Buyurtmanomani mavjud huquq/chipta reyestri bilan solishtirish; summalar, hujjatlar, bank rekvizitlari va takror qoplashni tekshirish. Qator xatolari, tuzatishga qaytarish, tasdiqlash va yakuniy rad etish | So‘ralgan va tasdiqlangan summa ajratilgan; qaror va sabablari kuzatiladi |
| T-05 | Subsidiya orqali to‘lov va natijani yetkazish | Tasdiqlangan versiyani subsidiya moduliga yuborish; haqiqiy payment_id, status, summa, sana va hujjatni olish. Tashuvchiga xabar yuborish va buyurtmanoma raqami orqali holatni qaytarish | Jarayon to‘lov natijasigacha kuzatiladi; qayta yuborish ikkinchi to‘lovga olib kelmaydi |
| T-06 | Reyestrlar, monitoring va hisobotlar | Mavjud shaxs kartochkasi, safar/hamroh/qaytarish tarixi va to‘lovlarni bog‘lash. Hudud, tashkilot, transport, toifa va davr bo‘yicha ko‘rsatkichlar; Excel eksporti va hisobot tarixi | Hisobotlar haqiqiy ma’lumotlarga tayanadi; shaxs, chipta va buyurtmanoma sonlari aralashtirilmaydi |

## Birlashtirish qoidalari

- “Barchasi”, “Qabul qilingan”, “Tasdiqlangan”, “Tuzatish kerak” va “Rad etilgan” — bitta buyurtmanoma reyestrining ko‘rinishlari.
- Har bir tashuvchi, transport yoki toifa uchun takroriy API va jadvallar yaratish tavsiya etilmaydi.
- Jami sonlar, filtrlar, tugmalar, holat belgilari va sana/pul formatlari mavjud umumiy komponentlardan olinadi.
- Toifa, hujjat turi, fayl kengaytmasi, transport, holat, sabab va davr sozlamalari ma’lumotnomadan boshqariladi.
- IDni jami shaxslar soniga tenglashtirish yoki toifalar sonini kodga qattiq yozish talabi kiritilmaydi.

## Ishlarning chegarasi

Moliyaviy oqim buyurtmanomani qabul qilishdan to‘lov natijasini tashuvchiga yetkazishgacha qamrab olinadi. Bevosita bank o‘tkazmasi mavjud subsidiya/moliya tizimining vazifasi va kontraktiga muvofiq bajariladi.

Mavjud foydalanuvchi va vakolat boshqaruvi saqlanadi; yangi auth modulini yaratish ushbu ro‘yxatning alohida taski emas. Foto, FAQ va to‘liq reys jadvali muharriri moliyaviy jarayondan keyingi yaxshilash sifatida ko‘rib chiqilishi mumkin.

## Bajarish tartibi va yakuniy tekshiruv

1. T-01: amaldagi holat va kontraktlarni aniqlashtirish.
2. T-02 va T-03: fayl raqamlari bilan buyurtmanoma qabul qilishni yakunlash.
3. T-04: tekshirish, tuzatish va tasdiqlashni yakunlash.
4. T-05: subsidiya bilan to‘lov natijasigacha sinash.
5. T-06: hisobotlar va mavjud funksiyalar regressiyasini tekshirish.

Yakuniy tekshiruv: haqiqiy fayl IDsi → buyurtmanoma → tekshiruv → zarur bo‘lsa tuzatish → tasdiqlash → subsidiya → to‘lov statusi → tashuvchiga xabar/GET javobi. Takror so‘rov, qaytarilgan chipta va tashqi tizimdagi xatolik holatlari ham sinovga kiritiladi.

[AI agent uchun backend va frontend bo‘yicha batafsil tavsiyaviy topshiriq](transport-ai-agent-backend-frontend-topshiriq.md).
