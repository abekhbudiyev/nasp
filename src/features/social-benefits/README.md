# Davlat ijtimoiy qo‘llab-quvvatlash choralarining yagona platformasi

NASP ichidagi manzil: `/apps/social-benefits`. Platforma ijtimoiy yordam, xizmat va imtiyozlarni fuqaro kesimida hisobga olish, tahlil qilish hamda fuqaro va oila pasportida ko‘rsatish jarayonini namoyish etadi.

- Umumiy ko‘rinish: respublika ko‘rsatkichlari, oylik tahlil, idoralar ulushi, hududlarni taqqoslash va nazorat signallari.
- Idoralar va choralar: 37 idora, manbadagi 577 chora yig‘masi va 613 ta idora-chora yozuvi.
- Choralar tahlili: 44 ta moliyaviy chora, 14 hudud, vedomost ijrosi va 208 tuman bo‘yicha nafaqa kesimi.
- Fuqaro va oila pasporti: 273 namunaviy pasport, oila a’zolari va to‘lov tarixi, ma’lumotnoma, xizmatlar va namunaviy arizalar.
- Nazorat: 6 signal turi, hududiy taqsimot, tekshiruv dalillari va mahalliy ko‘rib chiqish qaydlari.
- Ijro oqimi va platforma haqida: idoradan fuqaro kabinetigacha bo‘lgan simulyatsiya, ma’lumot qamrovi va joriy etish qarorlari.

Claude manbasining saqlangan nusxasi `presentation/platform.html` faylida. NASP interfeysi Vue komponentlarida; manba HTML brauzerga yuklanmaydi. `node src/features/social-benefits/presentation/native/extract-data.mjs` bu arxivdan platforma ma’lumotlarini qayta yaratadi. `source-manifest.json` olti manba blokining nazorat summalarini saqlaydi.

2025-yil manba ko‘rsatkichlari, namunaviy oylik taqsimot, 2024 va 2026 modellari hamda jonli oqim simulyatsiyasi interfeysda belgilangan. Vazirlik va idoralar bilan jonli almashinuv joriy etish bosqichiga tegishli.
