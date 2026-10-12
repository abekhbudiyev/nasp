# VMQ-440 transport imtiyozlari moduli — MVP tasklar

## MVP chegarasi

MVP kontingent ma’lumotlarini qabul qilishdan chipta qaytarilishigacha bo‘lgan jarayonlarni qamrab oladi. To‘lov va moliyalashtirish jarayonlari keyingi bosqichda ishlab chiqiladi.

## Backend

### BE-01. Ma’lumotnomalar va biznes qoidalari

- Toifalar, transport turlari, chipta klasslari, event turlari, sabablar va holatlar uchun umumiy ma’lumotnoma modelini yaratish.
- Ma’lumotnomalarni kodga hardcode qilmasdan bazadan boshqarish.
- Toifa bo‘yicha transport, hudud, davr, limit va imtiyoz qoidalarini sozlash imkonini yaratish.

### BE-02. Kontingent ma’lumotlarini qabul qilish

- Barcha vazirlik va idoralar uchun yagona `POST /v1/beneficiary-events` API yaratish.
- Huquqni berish, tuzatish, bekor qilish va qayta tiklash eventlarini qayta ishlash.
- PINFL bo‘yicha amaldagi huquqlar va ularning tarixini yuritish.
- Manba tashkiloti yuborgan event va yozuv identifikatorlarini saqlash.

### BE-03. Imtiyozga moslikni tekshirish va rezerv qilish

- Barcha tashuvchilar uchun yagona `POST /v1/entitlements/check-and-reserve` API yaratish.
- Shaxsning faol huquqi, transport turi, yo‘nalish, klass va limitini tekshirish.
- Mos natijada global limitni atomar ravishda rezerv qilish.
- Benefitsiar, qonuniy vakil va hamroh holatlarini qo‘llab-quvvatlash.

### BE-04. Chipta eventlarini qayta ishlash

- Barcha tashuvchilar uchun yagona `POST /v1/ticket-events` API yaratish.
- Chipta chiqarish, qaytarish, bekor qilish, almashtirish, foydalanish va no-show eventlarini qayta ishlash.
- Chipta, rezerv va limit holatlarini o‘zaro bog‘langan holda yuritish.
- Qaytarilgan chiptalarda limitni avtomatik tiklamasdan, tekshiruv jarayoniga yuborish.

### BE-05. Operator APIlari va monitoring

- Kontingent, huquqlar, rezervlar, chiptalar va eventlar ro‘yxati uchun ichki APIlarni yaratish.
- PINFL, tashkilot, transport turi, toifa, sana va holat bo‘yicha qidiruv hamda filtrlashni ta’minlash.
- Qaytarish holatlarini ko‘rib chiqish va limitni tiklash yoki rad etish funksiyasini yaratish.
- MVP statistikasi va integratsiya xatolari uchun agregat ma’lumotlarni tayyorlash.

## Frontend

### FE-01. Modul dashboardi

- Kontingentlar, faol huquqlar, rezervlar va chiptalar bo‘yicha asosiy ko‘rsatkichlarni chiqarish.
- Transport turlari va holatlar bo‘yicha statistikani ko‘rsatish.
- Muammoli integratsiyalar va ko‘rib chiqilishi kerak bo‘lgan qaytarishlarni ajratib ko‘rsatish.

### FE-02. Kontingent va huquqlar reyestri

- Kontingent yozuvlarini qidirish, filtrlash va ko‘rish sahifasini yaratish.
- Shaxsning toifalari, huquq muddati, manba tashkiloti va o‘zgarishlar tarixini ko‘rsatish.
- Shaxsga tegishli rezerv va chiptalarni bitta detail oynasida ko‘rsatish.

### FE-03. Rezervlar va chiptalar reyestri

- Rezervlar va chipta eventlari uchun umumiy reyestr yaratish.
- Chipta holati, tashuvchi, transport turi, yo‘nalish va sana bo‘yicha filtrlarni qo‘shish.
- Chipta, rezerv, limit va eventlar tarixini bog‘langan ko‘rinishda chiqarish.

### FE-04. Qaytarishlarni ko‘rib chiqish

- Qaytarilgan va foydalanilmagan chiptalar uchun ko‘rib chiqish navbatini yaratish.
- Sabab va tasdiqlovchi hujjatlarni ko‘rsatish.
- Limitni tiklash yoki rad etish qarorini kiritish imkonini yaratish.

### FE-05. Ma’lumotnomalar va qoidalar

- Barcha ma’lumotnomalarni bo‘limlar bo‘yicha boshqarish sahifasini yaratish.
- Toifa va transport qoidalarini sozlash interfeysini yaratish.
- Yozuvlarni faollashtirish, amal qilish vaqtini belgilash va versiyalar tarixini ko‘rsatish.

## MVP yakuniy natijasi

MVP yakunida tizim:

1. idoralardan kontingent eventlarini qabul qiladi;
2. tashuvchiga imtiyozga moslik va rezerv natijasini beradi;
3. chipta eventlarini qabul qilib reyestr yuritadi;
4. qaytarish va limitni tiklash jarayonini boshqaradi;
5. operatorlarga monitoring va ma’lumotnomalarni boshqarish imkonini beradi.
