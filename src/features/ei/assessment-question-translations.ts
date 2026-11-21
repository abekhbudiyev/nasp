import { toUzbekCyrillic } from "../../shared/uzbek-script";
export { toUzbekCyrillic };
import type { QuestionnaireTranslations } from "./questionnaire-languages";

type QuestionTranslationSeed = {
  uzLatn: string;
  en: string;
  kaaLatn: string;
};

export const assessmentQuestionTranslationSeeds: Record<
  string,
  QuestionTranslationSeed
> = {
  "KID-001": {
    uzLatn: "Ko‘krakdan yoki butilkadan oziqlanadi",
    en: "Feeds from the breast or a bottle",
    kaaLatn: "Emshekten yamasa shısheden azıqlanadı",
  },
  "KID-002": {
    uzLatn: "Boshidagi qalpoqchasini yechib tashlaydi",
    en: "Pulls the cap off their head",
    kaaLatn: "Basındaǵı qalpaqshasın sheship taslaydı",
  },
  "KID-003": {
    uzLatn: "Qoshiqdan ovqat yeydi",
    en: "Takes food from a spoon",
    kaaLatn: "Qasıqtan awqat jeydi",
  },
  "KID-004": {
    uzLatn: "Bekinmachoq («ku-ku») o‘ynaydi: yuzini kaftlari bilan «yashiradi»",
    en: "Plays peekaboo, hiding their face behind their hands",
    kaaLatn: "Jasırınbaq («ku-ku») oynaydı: betin alaqanları menen «jasıradı»",
  },
  "KID-005": {
    uzLatn: "O‘yinchog‘ini olib qo‘yishsa yig‘laydi",
    en: "Cries when a toy is taken away",
    kaaLatn: "Oyınshıǵın alıp qoysa jılaydı",
  },
  "KID-006": {
    uzLatn: "Quticha qopqog‘ini zavq bilan ochib-yopadi",
    en: "Enjoys opening and closing a box lid",
    kaaLatn: "Qutı qapaǵın quwanısh penen ashıp-jabadı",
  },
  "KID-007": {
    uzLatn:
      "Yo‘talish, mo‘rash, tilni taqillatish va boshqa tovushlarga taqlid qiladi",
    en: "Imitates coughing, humming, clicking, and other sounds",
    kaaLatn:
      "Jóteliw, mıńǵırlaw, til shaqıldatıw hám basqa seslerge eliklep etedi",
  },
  "KID-008": {
    uzLatn: "Mayda buyumlarni ikki barmog‘i bilan oladi",
    en: "Picks up small objects with two fingers",
    kaaLatn: "Mayda zatlardı eki barmaǵı menen aladı",
  },
  "KID-009": {
    uzLatn: "Qorni bilan yotgan holatidan mustaqil o‘tira oladi",
    en: "Can sit up independently from lying on the stomach",
    kaaLatn: "Qarnında jatqan halattan óz betinshe otıra aladı",
  },
  "KID-010": {
    uzLatn: "Qo‘ltiqlaridan ushlab turilsa sakraydi",
    en: "Bounces when supported under the arms",
    kaaLatn: "Qoltıǵınan uslap turılsa sekiredi",
  },
  "KID-011": {
    uzLatn: "Tik turgan holatidan mustaqil o‘tira oladi",
    en: "Can sit down independently from standing",
    kaaLatn: "Tik turǵan halattan óz betinshe otıra aladı",
  },
  "KID-012": {
    uzLatn: "Qo‘llarini yengga uzatib, kiyinishga yordam beradi",
    en: "Helps with dressing by putting arms into sleeves",
    kaaLatn: "Qolların jeńge sozıp, kiyiniwge járdem beredi",
  },
  "KID-013": {
    uzLatn: "Odamlarga qarab tinchlanadi",
    en: "Looks at people and calms down",
    kaaLatn: "Adamlarǵa qarap tınıshlanadı",
  },
  "KID-014": {
    uzLatn: "Tanish odamga talpinadi",
    en: "Reaches toward a familiar person",
    kaaLatn: "Tanıs adamǵa umtıladı",
  },
  "KID-015": {
    uzLatn: "O‘yinchoqlar bilan 15 daqiqa mustaqil o‘ynay oladi",
    en: "Can play alone with toys for 15 minutes",
    kaaLatn: "Oyınshıqlar menen 15 minut óz betinshe oynay aladı",
  },
  "KID-016": {
    uzLatn: "Qo‘liga shaqildoq berilsa, uni silkitadi",
    en: "Shakes a rattle placed in their hand",
    kaaLatn: "Qolına saqıldawıq berilse, onı silkiledi",
  },
  "KID-017": {
    uzLatn: "O‘z tashabbusi bilan qalamda chizg‘ilaydi",
    en: "Scribbles with a pencil on their own initiative",
    kaaLatn: "Óz baslaması menen qálemde sızǵılaydı",
  },
  "KID-018": {
    uzLatn: "Kerakli buyumni olish uchun to‘siqlardan oshadi",
    en: "Overcomes obstacles to reach a desired object",
    kaaLatn: "Kerekli zattı alıw ushın tosıqlardan ótedi",
  },
  "KID-019": {
    uzLatn: "«Mmm» yoki «sss» tovushlarini aytadi",
    en: "Produces “mmm” or “sss” sounds",
    kaaLatn: "«Mmm» yamasa «sss» seslerin aytadı",
  },
  "KID-020": {
    uzLatn: "Kerakli paytda qo‘l silkitib «xayr» deydi",
    en: "Waves goodbye at the appropriate time",
    kaaLatn: "Kerekli waqıtta qol bılǵap «saw bol» deydi",
  },
  "KID-021": {
    uzLatn: "Butilkasini ushlab turadi va tushirib yuborsa yana oladi",
    en: "Holds their bottle and picks it up again after dropping it",
    kaaLatn: "Shıshelerin uslap turadı hám túsirip alsa qayta aladı",
  },
  "KID-022": {
    uzLatn: "O‘tirgan holatidan emaklay boshlay oladi",
    en: "Can begin crawling from a sitting position",
    kaaLatn: "Otırǵan halattan eńbekley baslay aladı",
  },
  "KID-023": {
    uzLatn: "Butilkadan emayotganda uni ikki qo‘li bilan ushlaydi",
    en: "Holds the bottle with both hands while sucking",
    kaaLatn: "Shısheden emgende onı eki qolı menen uslaydı",
  },
  "KID-024": {
    uzLatn:
      "G‘udurlash va tabassum bilan kattalar e’tiborini jalb qilishga urinadi",
    en: "Tries to attract an adult’s attention by babbling and smiling",
    kaaLatn: "Bıldırlaw hám jımıyıw menen úlkenniń dıqqatın tartıwǵa urınadı",
  },
  "KID-025": {
    uzLatn: "Qo‘lingizni uzatsangiz o‘yinchoqni beradi",
    en: "Gives the toy when you reach for it",
    kaaLatn: "Qolıńızdı sozsańız oyınshıqtı beredi",
  },
  "KID-026": {
    uzLatn: "Og‘riq yetkazishi mumkin bo‘lgan buyumlardan qochadi",
    en: "Avoids objects that may cause pain",
    kaaLatn: "Awırıw keltiriwi múmkin bolǵan zatlardan qashadı",
  },
  "KID-027": {
    uzLatn: "Buyumlarni olib, ularni ko‘zdan kechiradi",
    en: "Picks up and examines objects",
    kaaLatn: "Zatlardı alıp, olardı kózden keshiredi",
  },
  "KID-028": {
    uzLatn: "O‘z tilida «gapiradi» (g‘udurlaydi)",
    en: "“Talks” in their own language by cooing",
    kaaLatn: "Óz tilinde «sóyleydi» (bıldırlaydı)",
  },
  "KID-029": {
    uzLatn: "Bitta so‘zni aniq aytadi",
    en: "Clearly says one word",
    kaaLatn: "Bir sózdi anıq aytadı",
  },
  "KID-030": {
    uzLatn: "So‘ralganda qarsak chaladi",
    en: "Claps hands when asked",
    kaaLatn: "Soralsa qol shappatlaydı",
  },
  "KID-031": {
    uzLatn: "Kaftiga o‘yinchoq qo‘yilganda qo‘lini siqadi",
    en: "Closes the hand when a toy is placed in the palm",
    kaaLatn: "Alaqanına oyınshıq qoyılǵanda qolın jumadı",
  },
  "KID-032": {
    uzLatn: "Qo‘li yetmaydigan o‘yinchoqni olishga urinadi",
    en: "Tries to get a toy that is out of reach",
    kaaLatn: "Qolı jetpeytuǵın oyınshıqtı alıwǵa urınadı",
  },
  "KID-033": {
    uzLatn: "Suyuqlikni qalqib ketmasdan yutadi",
    en: "Swallows liquid without choking",
    kaaLatn: "Suyıqlıqtı qaqalmastan jutadı",
  },
  "KID-034": {
    uzLatn: "Mustaqil ovqatlanishni afzal ko‘radi",
    en: "Prefers to eat independently",
    kaaLatn: "Óz betinshe awqatlanıwdı maqul kóredi",
  },
  "KID-035": {
    uzLatn: "Kattaga talpinib, qo‘llarini uzatib uning e’tiborini jalb qiladi",
    en: "Tries to attract an adult’s attention by reaching out",
    kaaLatn: "Úlkenge umtılıp, qolların sozıp onıń dıqqatın tartadı",
  },
  "KID-036": {
    uzLatn: "O‘yinchoqni kattaga uzatadi, ammo bermaydi",
    en: "Holds a toy out to an adult but does not give it",
    kaaLatn: "Oyınshıqtı úlkenge uzatadı, biraq bermeydi",
  },
  "KID-037": {
    uzLatn: "Ko‘z o‘ngida yashirilgan o‘yinchoqni qidiradi",
    en: "Looks for a toy hidden in front of them",
    kaaLatn: "Kóz aldında jasırılǵan oyınshıqtı izleydi",
  },
  "KID-038": {
    uzLatn: "Suratlarga qiziqadi va ko‘rsatilganda tomosha qiladi",
    en: "Shows interest in photographs when they are shown",
    kaaLatn: "Súwretlerge qızıǵadı hám kórsetilgende qaraydı",
  },
  "KID-039": {
    uzLatn: "Onasining tanish harakatlariga taqlid qiladi",
    en: "Imitates familiar actions of the mother",
    kaaLatn: "Anasınıń tanıs háreketlerine eliklep etedi",
  },
  "KID-040": {
    uzLatn: "His-tuyg‘ularini ovoz bilan ifodalaydi, faqat yig‘lamaydi",
    en: "Uses the voice to express emotions, not only crying",
    kaaLatn: "Sezimlerin dawıs penen bildiredi, tek jılamaydı",
  },
  "KID-041": {
    uzLatn: "«Ma-ma» yoki «da-da»ga taqlid qiladi",
    en: "Imitates “ma-ma” or “da-da”",
    kaaLatn: "«Ma-ma» yamasa «da-da»ǵa eliklep etedi",
  },
  "KID-042": {
    uzLatn: "Mushtiga o‘yinchoq tegizilsa, uni ochadi",
    en: "Opens the fist when touched with a toy",
    kaaLatn: "Jumırıǵına oyınshıq tiygizilse, onı ashadı",
  },
  "KID-043": {
    uzLatn:
      "Buyumlarni barmog‘i bilan turtadi, itaradi, ishqalaydi yoki yumalatadi",
    en: "Pokes, pushes, rubs, or rolls objects with a finger",
    kaaLatn:
      "Zatlardı barmaǵı menen túrtedi, iyteredi, ısqılaydı yamasa domalatadı",
  },
  "KID-044": {
    uzLatn: "Tik ushlab turilganda oyoqlarini polga qo‘yadi",
    en: "Places the feet on the floor when held upright",
    kaaLatn: "Tik uslap turılǵanda ayaqların polǵa qoyadı",
  },
  "KID-045": {
    uzLatn: "Qorni bilan yotganda ko‘kragini to‘shakdan ko‘taradi",
    en: "Lifts the chest off the bed while lying on the stomach",
    kaaLatn: "Qarnında jatqanda kókiregin tósekten kóteredi",
  },
  "KID-046": {
    uzLatn: "Buyumlarni og‘ziga olib boradi",
    en: "Brings objects to the mouth",
    kaaLatn: "Zatlardı awzına alıp baradı",
  },
  "KID-047": {
    uzLatn: "Yumshoq, ezilgan ovqatni yutadi",
    en: "Swallows soft, pureed food",
    kaaLatn: "Jumsaq, ezilgen awqattı jutadı",
  },
  "KID-048": {
    uzLatn: "Katta odam qo‘liga olganda quvonadi",
    en: "Becomes excited when an adult picks them up",
    kaaLatn: "Úlken adam qolına alǵanda quwanadı",
  },
  "KID-049": {
    uzLatn: "Katta odam olib berishi uchun o‘yinchoqlarni tashlashni yoqtiradi",
    en: "Likes dropping toys for an adult to pick up",
    kaaLatn: "Úlken adam alıp beriwi ushın oyınshıqlardı taslawdı jaqsı kóredi",
  },
  "KID-050": {
    uzLatn: "Qo‘ng‘iroqcha yoki shaqildoq tovushiga javob qaytaradi",
    en: "Responds to the sound of a bell or rattle",
    kaaLatn: "Qońıraw yamasa saqıldawıq sesine juwap beredi",
  },
  "KID-051": {
    uzLatn: "Oldiga qo‘yilgan buyumni darhol payqaydi",
    en: "Immediately notices an object placed in front",
    kaaLatn: "Aldına qoyılǵan zattı dárhal bayqaydı",
  },
  "KID-052": {
    uzLatn: "Qo‘g‘irchoqlar bilan o‘ynaydi",
    en: "Plays with dolls",
    kaaLatn: "Quwırshaqlar menen oynaydı",
  },
  "KID-053": {
    uzLatn: "Tanbeh berilganda ingraydi yoki yig‘laydi",
    en: "Whines or cries when scolded",
    kaaLatn: "Urısılǵanda qıńsılaydı yamasa jılaydı",
  },
  "KID-054": {
    uzLatn: "Onasini anglab «ma-ma» deb ataydi",
    en: "Meaningfully calls the mother “ma-ma”",
    kaaLatn: "Anasın ańlap «ma-ma» dep ataydı",
  },
  "KID-055": {
    uzLatn: "Yaqinidagi mayda buyumlarni ushlashga urinadi",
    en: "Tries to grasp small objects nearby",
    kaaLatn: "Janındaǵı mayda zatlardı uslawǵa urınadı",
  },
  "KID-056": {
    uzLatn: "Qog‘ozni ikki qo‘li bilan yirtadi",
    en: "Tears paper with both hands",
    kaaLatn: "Qaǵazdı eki qolı menen jırtadı",
  },
  "KID-057": {
    uzLatn: "Qo‘ltiqlaridan ushlab turilsa tik turadi",
    en: "Stands when supported under the arms",
    kaaLatn: "Qoltıǵınan uslap turılsa tik turadı",
  },
  "KID-058": {
    uzLatn: "Emaklash harakatlarini qiladi",
    en: "Makes crawling movements",
    kaaLatn: "Eńbeklew háreketlerin etedi",
  },
  "KID-059": {
    uzLatn: "Butilkani mustaqil og‘ziga olib bora oladi",
    en: "Can bring a bottle to the mouth independently",
    kaaLatn: "Shısheni óz betinshe awzına alıp bara aladı",
  },
  "KID-060": {
    uzLatn: "Rashkini namoyon qiladi",
    en: "Shows jealousy",
    kaaLatn: "Qızǵanıshın kórsetedi",
  },
  "KID-061": {
    uzLatn: "Musiqa ostida harakatlanadi",
    en: "Moves to music",
    kaaLatn: "Muzıka astında háreketlenedi",
  },
  "KID-062": {
    uzLatn: "Shaqildoq yoki qo‘ng‘iroq tovushini eshitib kuladi",
    en: "Smiles at the sound of a rattle or bell",
    kaaLatn: "Saqıldawıq yamasa qońıraw sesin esitip jımıyadı",
  },
  "KID-063": {
    uzLatn: "O‘yinchoqlarni tashlaydi va qayta oladi",
    en: "Drops and picks up toys",
    kaaLatn: "Oyınshıqlardı taslaydı hám qayta aladı",
  },
  "KID-064": {
    uzLatn: "Katta odam bilan koptok yumalatadi",
    en: "Rolls a ball with an adult",
    kaaLatn: "Úlken adam menen toptı domalatadı",
  },
  "KID-065": {
    uzLatn: "Yuzi mato bilan yopilsa, uni olib tashlaydi",
    en: "Removes a cloth covering the face",
    kaaLatn: "Beti gezleme menen jabılsa, onı alıp taslaydı",
  },
  "KID-066": {
    uzLatn: "O‘z ismini eshitganda javob qaytaradi",
    en: "Responds upon hearing their name",
    kaaLatn: "Óz atın esitkende juwap beredi",
  },
  "KID-067": {
    uzLatn: "Kamida ikkita turli tovush chiqaradi",
    en: "Produces at least two different sounds",
    kaaLatn: "Keminde eki túrli ses shıǵaradı",
  },
  "KID-068": {
    uzLatn: "O‘yinchoqni ushlab turadi",
    en: "Holds a toy",
    kaaLatn: "Oyınshıqtı uslap turadı",
  },
  "KID-069": {
    uzLatn: "O‘tqazish uchun qo‘llaridan tortilganda boshini barqaror tutadi",
    en: "Keeps the head steady when pulled by the arms into sitting",
    kaaLatn: "Otırǵızıw ushın qollarınan tartılǵanda basın turaqlı uslaydı",
  },
  "KID-070": {
    uzLatn: "Butilka yoki ko‘krakni ko‘rganda og‘zini ochadi",
    en: "Opens the mouth at the sight of a bottle or breast",
    kaaLatn: "Shıshe yamasa emshekti kórgende awzın ashadı",
  },
  "KID-071": {
    uzLatn: "Yangi ovqatni birinchi marta taklif qilishganda injiqliksiz yeydi",
    en: "Eats a new food without fuss when first offered",
    kaaLatn: "Jańa awqattı birinshi ret usınǵanda erkeliksiz jeydi",
  },
  "KID-072": {
    uzLatn: "«Xayr» so‘zini tushunadi",
    en: "Understands “bye-bye”",
    kaaLatn: "«Saw bol» sózin túsinedi",
  },
  "KID-073": {
    uzLatn: "«Yuqoriga» va «pastga» so‘zlarining ma’nosini tushunadi",
    en: "Appears to understand “up” and “down”",
    kaaLatn: "«Joqarıǵa» hám «tómenge» sózleriniń mánisin túsinedi",
  },
  "KID-074": {
    uzLatn: "Qo‘llar harakatini ko‘zi bilan kuzatadi",
    en: "Tracks hand movements with the eyes",
    kaaLatn: "Qol háreketlerin kózi menen baqlaydı",
  },
  "KID-075": {
    uzLatn: "Yaxshiroq ko‘rish uchun tana holatini o‘zgartiradi",
    en: "Changes body position to see something better",
    kaaLatn: "Jaqsıraq kóriw ushın dene halatın ózgertedi",
  },
  "KID-076": {
    uzLatn: "O‘z ismini eshitganda jilmayadi",
    en: "Smiles upon hearing their name",
    kaaLatn: "Óz atın esitkende jımıyadı",
  },
  "KID-077": {
    uzLatn: "Uch yoki to‘rtta so‘zni aniq aytadi",
    en: "Clearly says three or four words",
    kaaLatn: "Úsh yamasa tórt sózdi anıq aytadı",
  },
  "KID-078": {
    uzLatn: "Xohlagan buyumini ko‘rsatadi",
    en: "Points to an object they want",
    kaaLatn: "Qáleǵen zatın kórsetedi",
  },
  "KID-079": {
    uzLatn: "Turli buyumlarni quti va butilkalarga soladi",
    en: "Puts different objects into boxes and bottles",
    kaaLatn: "Túrli zatlardı qutı hám shıshelerge saladı",
  },
  "KID-080": {
    uzLatn: "O‘tirganda yoki tik ushlab turilganda boshini erkin buradi",
    en: "Turns the head freely while sitting or held upright",
    kaaLatn: "Otırǵanda yamasa tik uslap turılǵanda basın erkin buradı",
  },
  "KID-081": {
    uzLatn: "Cho‘kkalab o‘tiradi",
    en: "Squats",
    kaaLatn: "Shókkalap otıradı",
  },
  "KID-082": {
    uzLatn: "To‘siqlar ustidan oshib o‘tadi",
    en: "Climbs over obstacles",
    kaaLatn: "Tosıqlar ústinen asıp ótedi",
  },
  "KID-083": {
    uzLatn: "Ovqatlantirilganda ezilgan qattiq oddiy ovqatni yeydi",
    en: "Eats mashed regular solid food when fed",
    kaaLatn: "Awqatlandırılǵanda ezilgen qattı ádettegi awqattı jeydi",
  },
  "KID-084": {
    uzLatn: "Ovqatlanish va cho‘milish paytida tovushlar chiqaradi",
    en: "Makes sounds during feeding and bathing",
    kaaLatn: "Awqatlanıw hám shomılıw waqtında sesler shıǵaradı",
  },
  "KID-085": {
    uzLatn: "Vannada cho‘milish va suv sachratishni yoqtiradi",
    en: "Enjoys bathing and splashing",
    kaaLatn: "Vannada shomılıw hám suw shashıwdı jaqsı kóredi",
  },
  "KID-086": {
    uzLatn:
      "Katta yoki bola o‘yinchoqni tortib olishga uringanda qarshilik qiladi",
    en: "Resists when an adult or child tries to take a toy",
    kaaLatn: "Úlken yamasa bala oyınshıqtı alıwǵa urınǵanda qarsılıq etedi",
  },
  "KID-087": {
    uzLatn: "Qorni bilan yotganda iyagini ko‘taradi",
    en: "Raises the chin while lying on the stomach",
    kaaLatn: "Qarnında jatqanda iyegin kóteredi",
  },
  "KID-088": {
    uzLatn: "Ko‘zgudagi aksiga qiziqadi",
    en: "Shows interest in their reflection in a mirror",
    kaaLatn: "Aynadaǵı sáwlesine qızıǵadı",
  },
  "KID-089": {
    uzLatn: "Biror narsa yo‘qolsa, burchak ortiga qaraydi",
    en: "Looks around a corner when something is lost",
    kaaLatn: "Bir zat joǵalsa, múyesh artına qaraydı",
  },
  "KID-090": {
    uzLatn: "«Mumkin emas» desangiz to‘xtaydi",
    en: "Stops when told “no”",
    kaaLatn: "«Bolmaydı» deseńiz toqtaydı",
  },
  "KID-091": {
    uzLatn: "«Ma-ma», «ba-ba», «la-la»ga o‘xshash tovushlar chiqaradi",
    en: "Produces sounds like “ma-ma,” “ba-ba,” and “la-la”",
    kaaLatn: "«Ma-ma», «ba-ba», «la-la»ǵa uqsas sesler shıǵaradı",
  },
  "KID-092": {
    uzLatn: "So‘zlarni takrorlashga urinadi",
    en: "Tries to repeat words",
    kaaLatn: "Sózlerdi tákirarlawǵa urınadı",
  },
  "KID-093": {
    uzLatn: "«Mening oldimga kel» deganda qo‘llarini ko‘taradi",
    en: "Raises the arms in response to “come to me”",
    kaaLatn: "«Maǵan kel» degende qolların kóteredi",
  },
  "KID-094": {
    uzLatn: "Yaqin olib kelingan o‘yinchoqqa talpinadi",
    en: "Reaches for a toy brought close",
    kaaLatn: "Jaqın alıp kelingen oyınshıqqa umtıladı",
  },
  "KID-095": {
    uzLatn: "O‘yinchoqlarni qutidan chiqaradi",
    en: "Takes toys out of a box",
    kaaLatn: "Oyınshıqlardı qutıdan shıǵaradı",
  },
  "KID-096": {
    uzLatn: "Chalqancha yotganda boshini ko‘taradi",
    en: "Raises the head while lying on the back",
    kaaLatn: "Shalqasınan jatqanda basın kóteredi",
  },
  "KID-097": {
    uzLatn: "Karavot chetidan ushlab tortiladi va o‘rnidan turadi",
    en: "Pulls up and stands while holding the crib edge",
    kaaLatn: "Kerewet shetinen uslap tartıladı hám ornınan turadı",
  },
  "KID-098": {
    uzLatn: "Shkaf tortmalarini tortib ochadi",
    en: "Pulls cabinet drawers open",
    kaaLatn: "Shkaf tartpaların tartıp ashadı",
  },
  "KID-099": {
    uzLatn: "Ovqatni chaynaydi",
    en: "Chews food",
    kaaLatn: "Awqattı shaynaydı",
  },
  "KID-100": {
    uzLatn: "Oddiy qattiq ovqatni yeydi",
    en: "Eats regular solid food",
    kaaLatn: "Ádettegi qattı awqattı jeydi",
  },
  "KID-101": {
    uzLatn: "U bilan gaplashilganda g‘udurlaydi",
    en: "Babbles when spoken to",
    kaaLatn: "Onıń menen sóyleskende bıldırlaydı",
  },
  "KID-102": {
    uzLatn: "Uni havoga otishganda yoki erkalatishganda quvonadi",
    en: "Enjoys being tossed up or played with",
    kaaLatn: "Onı joqarı taslaǵanda yamasa erkeletkende quwanadı",
  },
  "KID-103": {
    uzLatn: "O‘z ismini eshitganda o‘giriladi",
    en: "Turns upon hearing their name",
    kaaLatn: "Óz atın esitkende burıladı",
  },
  "KID-104": {
    uzLatn: "Ataylab gapga quloq solmaydi",
    en: "Deliberately disobeys",
    kaaLatn: "Ádeyi tıńlamaydı",
  },
  "KID-105": {
    uzLatn: "Ko‘zgudagi aksiga jilmayadi",
    en: "Smiles at their reflection in a mirror",
    kaaLatn: "Aynadaǵı sáwlesine jımıyadı",
  },
  "KID-106": {
    uzLatn: "Qo‘li yetmaydigan buyumni olish uchun harakatlanadi",
    en: "Moves to reach an object that is out of reach",
    kaaLatn: "Qolı jetpeytuǵın zattı alıw ushın háreketlenedi",
  },
  "KID-107": {
    uzLatn: "«Mumkin emas» deb baqirsangiz to‘xtaydi",
    en: "Stops when you shout “no”",
    kaaLatn: "«Bolmaydı» dep baqırsańız toqtaydı",
  },
  "KID-108": {
    uzLatn: "Tanish ovozga boshini tez buradi",
    en: "Quickly turns the head toward a familiar voice",
    kaaLatn: "Tanıs dawısqa basın tez buradı",
  },
  "KID-109": {
    uzLatn: "Buyumlarni bir qo‘li bilan oladi",
    en: "Picks up objects with one hand",
    kaaLatn: "Zatlardı bir qolı menen aladı",
  },
  "KID-110": {
    uzLatn: "Bir vaqtning o‘zida ikki yoki undan ortiq buyum bilan o‘ynaydi",
    en: "Plays with two or more objects at the same time",
    kaaLatn: "Bir waqıtta eki yamasa odan artıq zat penen oynaydı",
  },
  "KID-111": {
    uzLatn: "Tizzangizda o‘tiradi",
    en: "Sits on your lap",
    kaaLatn: "Dizeńizde otıradı",
  },
  "KID-112": {
    uzLatn: "To‘rt oyoqlab tez emaklaydi",
    en: "Crawls quickly on all fours",
    kaaLatn: "Tórt ayaqlap tez eńbekleydi",
  },
  "KID-113": {
    uzLatn: "Butilkani taniydi va unga talpinadi",
    en: "Recognizes the bottle and reaches for it",
    kaaLatn: "Shısheni tanıydı hám oǵan umtıladı",
  },
  "KID-114": {
    uzLatn: "Pirog yoki pechenyeni ushlab, tishlab va chaynab yeydi",
    en: "Holds, bites, and chews a pastry or biscuit",
    kaaLatn: "Pirog yamasa pechenyeni uslap, tislep hám shaynap jeydi",
  },
  "KID-115": {
    uzLatn: "Ba’zi odamlarga jilmayadi, boshqalariga esa yo‘q",
    en: "Smiles at some people but not others",
    kaaLatn: "Ayırım adamlarǵa jımıyadı, basqalarına bolsa joq",
  },
  "KID-116": {
    uzLatn: "«Qarsak-qarsak» o‘yiniga taqlid qiladi",
    en: "Imitates a pat-a-cake game",
    kaaLatn: "«Qol shappatlaw» oyınına eliklep etedi",
  },
  "KID-117": {
    uzLatn: "Qoshiq yaqinlashganda og‘zini ochadi",
    en: "Opens the mouth as a spoon approaches",
    kaaLatn: "Qasıq jaqınlaǵanda awzın ashadı",
  },
  "KID-118": {
    uzLatn: "U bilan gaplashilganda tovushlar chiqaradi",
    en: "Makes sounds when spoken to",
    kaaLatn: "Onıń menen sóyleskende sesler shıǵaradı",
  },
  "KID-119": {
    uzLatn: "O‘z ismini eshitganda to‘xtaydi",
    en: "Stops upon hearing their name",
    kaaLatn: "Óz atın esitkende toqtaydı",
  },
  "KID-120": {
    uzLatn: "Buyumni ikki qo‘li bilan ushlaydi",
    en: "Holds an object with both hands",
    kaaLatn: "Zattı eki qolı menen uslaydı",
  },
  "KID-121": {
    uzLatn: "Kitob sahifalarini varaqlashga yordam beradi",
    en: "Helps turn pages in a book",
    kaaLatn: "Kitap betlerin awdarıwǵa járdem beredi",
  },
  "KID-122": {
    uzLatn: "Mebeldan ushlab tik turadi",
    en: "Stands while holding onto furniture",
    kaaLatn: "Mebelden uslap tik turadı",
  },
  "KID-123": {
    uzLatn: "Chalqanchadan yonboshiga o‘giriladi",
    en: "Rolls from the back onto the side",
    kaaLatn: "Shalqasınan qaptalına awdarıladı",
  },
  "KID-124": {
    uzLatn: "Eshikni ochishga urinadi",
    en: "Tries to open a door",
    kaaLatn: "Esikti ashıwǵa urınadı",
  },
  "KID-125": {
    uzLatn: "Ovqat bo‘laklarini og‘ziga soladi",
    en: "Puts pieces of food into the mouth",
    kaaLatn: "Awqat bóleklerin awzına saladı",
  },
  "KID-126": {
    uzLatn: "Onasini quchoqlab, unga mehrini ko‘rsatadi",
    en: "Hugs the mother and shows affection",
    kaaLatn: "Anasın qushaqlap, oǵan mehirin kórsetedi",
  },
  "KID-127": {
    uzLatn: "Qisman yashirilgan buyumlarni topadi",
    en: "Finds partially hidden objects",
    kaaLatn: "Yarım jasırılǵan zatlardı tabadı",
  },
  "KID-128": {
    uzLatn: "Onasining ovozini taniydi",
    en: "Recognizes the mother’s voice",
    kaaLatn: "Anasınıń dawısın tanıydı",
  },
  "KID-129": {
    uzLatn: "Ko‘ziga ko‘ringan barcha narsaga talpinadi",
    en: "Reaches for everything within sight",
    kaaLatn: "Kózine kóringen barlıq zatqa umtıladı",
  },
  "KID-130": {
    uzLatn: "«Xayr» so‘zining ma’nosini tushunadi",
    en: "Appears to understand “bye-bye”",
    kaaLatn: "«Saw bol» sóziniń mánisin túsinedi",
  },
  "KID-131": {
    uzLatn: "Ba’zan baland, ba’zan past tovush chiqaradi",
    en: "Makes sounds that vary between loud and quiet",
    kaaLatn: "Geyde joqarı, geyde tómen ses shıǵaradı",
  },
  "KID-132": {
    uzLatn: "Kitob sahifalarini bir yo‘la ikki-uchtadan varaqlaydi",
    en: "Turns two or three book pages at a time",
    kaaLatn: "Kitap betlerin birden eki-úshten awdaradı",
  },
  "KID-133": {
    uzLatn: "Biroz suyab turilganda boshini tutib o‘tiradi",
    en: "Sits with some support while holding the head steady",
    kaaLatn: "Azlap súyep turılǵanda basın uslap otıradı",
  },
  "KID-134": {
    uzLatn: "Ikki qo‘lidan ushlab turilsa tik turadi",
    en: "Stands when held by both hands",
    kaaLatn: "Eki qolınan uslap turılsa tik turadı",
  },
  "KID-135": {
    uzLatn: "Chalqanchadan qorniga oson ag‘dariladi",
    en: "Easily rolls from the back onto the stomach",
    kaaLatn: "Shalqasınan qarnına ańsat awdarıladı",
  },
  "KID-136": {
    uzLatn: "O‘yinchoqni ehtiyotkorlik bilan qo‘ya oladi",
    en: "Can put a toy down carefully",
    kaaLatn: "Oyınshıqtı abaylap qoya aladı",
  },
  "KID-137": { uzLatn: "Jilmayadi", en: "Smiles", kaaLatn: "Jımıyadı" },
  "KID-138": {
    uzLatn: "O‘yinchoqlar bilan yolg‘iz o‘ynaydi",
    en: "Plays alone with toys",
    kaaLatn: "Oyınshıqlar menen jalǵız oynaydı",
  },
  "KID-139": {
    uzLatn: "Xonada yolg‘iz qoldirilsa xafa bo‘ladi",
    en: "Becomes upset when left alone in a room",
    kaaLatn: "Bólmede jalǵız qaldırılsa qapa boladı",
  },
  "KID-140": {
    uzLatn: "Qitiqlaganda qattiq kuladi",
    en: "Laughs loudly when tickled",
    kaaLatn: "Qıtıqlaǵanda qattı kúledi",
  },
  "KID-141": {
    uzLatn: "Otasini quchoqlab, unga mehrini ko‘rsatadi",
    en: "Hugs the father and shows affection",
    kaaLatn: "Ákesin qushaqlap, oǵan mehirin kórsetedi",
  },
  "KID-142": {
    uzLatn: "Buyumlarga diqqat bilan qarab tinchlanadi",
    en: "Looks carefully at objects and calms down",
    kaaLatn: "Zatlarǵa dıqqat penen qarap tınıshlanadı",
  },
  "KID-143": {
    uzLatn: "«Ku-ku» o‘yiniga javob qaytaradi",
    en: "Responds to a peekaboo game",
    kaaLatn: "«Ku-ku» oyınına juwap beredi",
  },
  "KID-144": {
    uzLatn: "Kattalarning harakatlarini ancha vaqt o‘tgach takrorlaydi",
    en: "Imitates adult actions after a long delay",
    kaaLatn: "Úlkenlerdiń háreketlerin biraz waqıt ótkennen keyin tákirarlaydı",
  },
  "KID-145": {
    uzLatn: "So‘ralganda so‘zlarni takrorlaydi",
    en: "Repeats words when asked",
    kaaLatn: "Soralsa sózlerdi tákirarlaydı",
  },
  "KID-146": {
    uzLatn: "Shaqildoqni silkitadi",
    en: "Shakes a rattle",
    kaaLatn: "Saqıldawıqtı silkiledi",
  },
  "KID-147": {
    uzLatn: "Qo‘lidan ushlab turilganda ko‘tarilib o‘tirishga urinadi",
    en: "Tries to pull up and sit when held by the hand",
    kaaLatn: "Qolınan uslap turılǵanda kóterilip otırıwǵa urınadı",
  },
  "KID-148": {
    uzLatn: "Qornidan chalqanchasiga ag‘dariladi",
    en: "Rolls from the stomach onto the back",
    kaaLatn: "Qarnınan shalqasına awdarıladı",
  },
  "KID-149": {
    uzLatn: "Bir qo‘lida o‘yinchoqni ushlab, ikkinchi qo‘li bilan o‘ynaydi",
    en: "Holds a toy in one hand and plays with it using the other",
    kaaLatn: "Bir qolında oyınshıqtı uslap, ekinshi qolı menen oynaydı",
  },
  "KID-150": {
    uzLatn: "Ovqatni qoshiq bilan olishga urinadi",
    en: "Tries to scoop food with a spoon",
    kaaLatn: "Awqattı qasıq penen alıwǵa urınadı",
  },
  "KID-151": {
    uzLatn: "Eng tanish kattalarni taniydi",
    en: "Recognizes the most familiar adults",
    kaaLatn: "Eń tanıs úlkenlerdi tanıydı",
  },
  "KID-152": {
    uzLatn: "Aytilganda qo‘l silkitib «xayr» deydi",
    en: "Waves goodbye when told",
    kaaLatn: "Aytilǵanda qol bılǵap «saw bol» deydi",
  },
  "KID-153": {
    uzLatn: "Qo‘g‘irchoq yoki ayiqchani quchoqlab, mehr ko‘rsatadi",
    en: "Hugs a doll or teddy bear and shows affection",
    kaaLatn: "Quwırshaq yamasa ayıwshıqtı qushaqlap, mehir kórsetedi",
  },
  "KID-154": {
    uzLatn: "O‘yinchoqlarni tashlab, qanday tushishini kuzatadi",
    en: "Throws toys and watches them fall",
    kaaLatn: "Oyınshıqlardı taslap, qalay túsiwin baqlaydı",
  },
  "KID-155": {
    uzLatn: "Onasi so‘rasa o‘yinchoqni unga uzatadi",
    en: "Hands a toy to the mother when she asks",
    kaaLatn: "Anası sorasa oyınshıqtı oǵan uzatadı",
  },
  "KID-156": {
    uzLatn: "Tovushlarga taqlid qila oladi",
    en: "Can imitate sounds",
    kaaLatn: "Seslerge eliklep ete aladı",
  },
  "KID-157": {
    uzLatn: "O‘tirgan holda koptok yumalatadi",
    en: "Rolls a ball while sitting",
    kaaLatn: "Otırǵan halda toptı domalatadı",
  },
  "KID-158": {
    uzLatn: "Mustaqil tik turadi",
    en: "Stands independently",
    kaaLatn: "Óz betinshe tik turadı",
  },
  "KID-159": {
    uzLatn:
      "Polga yotqizilganda chalqanchadan yonboshga, yonboshdan qoringa ag‘darila oladi",
    en: "Can roll over in different directions when left on the floor",
    kaaLatn:
      "Polǵa jatqızılǵanda shalqasınan qaptalına, qaptalınan qarnına awdarıladı",
  },
  "KID-160": {
    uzLatn: "Oyoqlariga qo‘llari bilan tegadi",
    en: "Touches their feet with their hands",
    kaaLatn: "Ayaqlarına qolları menen tiyedi",
  },
  "KID-161": {
    uzLatn: "Qoshiqni dastasidan ushlaydi",
    en: "Holds a spoon by the handle",
    kaaLatn: "Qasıqtı sapınan uslaydı",
  },
  "KID-162": {
    uzLatn: "Ovqatni qalqimasdan, tiqilmasdan va yo‘talmasdan yutadi",
    en: "Swallows food without choking, gagging, or coughing",
    kaaLatn: "Awqattı qaqalmastan, tıǵılmastan hám jótelmesten jutadı",
  },
  "KID-163": {
    uzLatn: "Kerakli paytda kattalar eslatmasdan qo‘l silkitib «xayr» deydi",
    en: "Waves goodbye at the right time without being prompted",
    kaaLatn: "Kerekli waqıtta úlkenler aytpastan qol bılǵap «saw bol» deydi",
  },
  "KID-164": {
    uzLatn: "Kattaning yuzi, sochi, munchoqlari yoki kiyimini paypaslaydi",
    en: "Feels an adult’s face, hair, beads, or clothing",
    kaaLatn: "Úlkenniń betin, shashın, monshaǵın yamasa kiyimin sıypalaydı",
  },
  "KID-165": {
    uzLatn: "So‘ralganda kattani o‘padi",
    en: "Kisses an adult when asked",
    kaaLatn: "Soralsa úlkendi súyedi",
  },
  "KID-166": {
    uzLatn: "Oddiy harakatlarni takrorlaydi",
    en: "Copies simple actions",
    kaaLatn: "Ápiwayı háreketlerdi tákirarlaydı",
  },
  "KID-167": {
    uzLatn: "Qo‘llariga tayanib o‘tiradi",
    en: "Sits while supporting the body with the hands",
    kaaLatn: "Qollarına súyenip otıradı",
  },
  "KID-168": {
    uzLatn: "«Mening oldimga kel» kabi oddiy ko‘rsatmalarni bajaradi",
    en: "Follows simple instructions such as “come to me”",
    kaaLatn: "«Maǵan kel» sıyaqlı ápiwayı kórsetpelerdi orınlaydı",
  },
  "KID-169": {
    uzLatn: "Bir xil tovushlarni ko‘p marta takrorlaydi",
    en: "Repeats the same sounds many times",
    kaaLatn: "Birdey seslerdi kóp márte tákirarlaydı",
  },
  "KID-170": {
    uzLatn: "Qah-qah otib kuladi",
    en: "Laughs heartily",
    kaaLatn: "Qattı kúledi",
  },
  "KID-171": {
    uzLatn: "Bir qo‘li bilan ikkita mayda o‘yinchoqni oladi",
    en: "Picks up two small toys with one hand",
    kaaLatn: "Bir qolı menen eki mayda oyınshıqtı aladı",
  },
  "KID-172": {
    uzLatn: "Bir necha soniya mustaqil o‘tiradi",
    en: "Sits independently for several seconds",
    kaaLatn: "Birneshe sekund óz betinshe otıradı",
  },
  "KID-173": {
    uzLatn: "Mustaqil ravishda barqaror tik turadi",
    en: "Stands steadily without support",
    kaaLatn: "Óz betinshe turaqlı tik turadı",
  },
  "KID-174": {
    uzLatn: "Kerakli buyumni olish uchun stul yoki mebel ustiga chiqadi",
    en: "Climbs onto chairs or furniture to reach an object",
    kaaLatn: "Kerekli zattı alıw ushın stul yamasa mebel ústine shıǵadı",
  },
  "KID-175": {
    uzLatn: "Engashib, o‘yinchoqni poldan oladi",
    en: "Bends down and picks up a toy from the floor",
    kaaLatn: "Eńkeyip, oyınshıqtı poldan aladı",
  },
  "KID-176": {
    uzLatn: "Qoshiqni ushlab ovqatni og‘ziga yetkazadi",
    en: "Holds a spoon and brings food to the mouth",
    kaaLatn: "Qasıqtı uslap awqattı awzına jetkizedi",
  },
  "KID-177": {
    uzLatn: "Pechenye yoki suxarini og‘zida so‘rib va ezib yeydi",
    en: "Sucks and gums a biscuit or cracker",
    kaaLatn: "Pechenye yamasa suxarini awzında sorıp hám ezip jeydi",
  },
  "KID-178": {
    uzLatn: "Begona va tanish odamlarga turlicha munosabat bildiradi",
    en: "Responds differently to strangers and familiar people",
    kaaLatn: "Bóten hám tanıs adamlarǵa hár túrli qatnas bildiredi",
  },
  "KID-179": {
    uzLatn: "Ko‘zgudagi aksiga jilmayadi",
    en: "Smiles at their reflection in the mirror",
    kaaLatn: "Aynadaǵı sáwlesine jımıyadı",
  },
  "KID-180": {
    uzLatn: "Boshqa bolaga taqlid qiladi",
    en: "Imitates another child",
    kaaLatn: "Basqa balaǵa eliklep etedi",
  },
  "KID-181": {
    uzLatn: "Kutilmagan ovoz yoki shovqindan seskanadi",
    en: "Startles at unexpected voices or noises",
    kaaLatn: "Kútilmegen dawıs yamasa shawqımnan seskenedi",
  },
  "KID-182": {
    uzLatn: "Katta jilmayganda yoki qitiqlaganda tovush chiqaradi",
    en: "Makes sounds when an adult smiles or tickles",
    kaaLatn: "Úlken jımıyǵanda yamasa qıtıqlaǵanda ses shıǵaradı",
  },
  "KID-183": {
    uzLatn: "Mebeldan ushlab yuradi",
    en: "Walks while holding onto furniture",
    kaaLatn: "Mebelden uslap júredi",
  },
  "KID-184": {
    uzLatn: "Zinadan yuqoriga emaklab chiqadi",
    en: "Crawls up stairs",
    kaaLatn: "Basqıshtan joqarı eńbeklep shıǵadı",
  },
  "KID-185": {
    uzLatn: "Katta kulgili yuz ifodasini qilsa jilmayadi",
    en: "Smiles when an adult makes a funny face",
    kaaLatn: "Úlken kúlkili bet álpentin etse jımıyadı",
  },
  "KID-186": {
    uzLatn: "O‘z qo‘llari bilan o‘ynaydi",
    en: "Plays with their hands",
    kaaLatn: "Óz qolları menen oynaydı",
  },
  "KID-187": {
    uzLatn: "Sevimli o‘yinchog‘ini ko‘rganda jilmayadi",
    en: "Smiles at the sight of a favorite toy",
    kaaLatn: "Súyikli oyınshıǵın kórgende jımıyadı",
  },
  "KID-188": {
    uzLatn: "Bir vaqtning o‘zida ikkita o‘yinchoq bilan o‘ynaydi",
    en: "Plays with two toys at the same time",
    kaaLatn: "Bir waqıtta eki oyınshıq penen oynaydı",
  },
  "KID-189": {
    uzLatn: "Rad etish belgisi sifatida boshini chayqaydi",
    en: "Shakes the head to indicate no",
    kaaLatn: "Qarsılıq belgisi retinde basın shayqaydı",
  },
  "KID-190": {
    uzLatn: "No‘xatdek mayda buyumlarni terib oladi",
    en: "Picks up pea-sized objects",
    kaaLatn: "Burshaqtay mayda zatlardı terip aladı",
  },
  "KID-191": {
    uzLatn: "Koptokni otadi",
    en: "Throws a ball",
    kaaLatn: "Toptı ılaqtıradı",
  },
  "KID-192": {
    uzLatn: "Uzoq vaqt mustaqil o‘tiradi",
    en: "Sits independently for a long time",
    kaaLatn: "Uzaq waqıt óz betinshe otıradı",
  },
  "KID-193": {
    uzLatn: "Muvozanat uchun ikki qo‘lidan ushlab turilsa yuradi",
    en: "Walks when held by both hands for balance",
    kaaLatn: "Teńsalmaqlılıq ushın eki qolınan uslap turılsa júredi",
  },
  "KID-194": {
    uzLatn: "Piyolani ushlab, undan ichadi",
    en: "Holds a cup and drinks from it",
    kaaLatn: "Keseni uslap, onnan ishedi",
  },
  "KID-195": {
    uzLatn: "Paypog‘ini yechib tashlaydi",
    en: "Pulls off socks",
    kaaLatn: "Shulǵawın sheship taslaydı",
  },
  "KID-196": {
    uzLatn: "Katta ushlab turgan piyoladan ichadi",
    en: "Drinks from a cup held by an adult",
    kaaLatn: "Úlken uslap turǵan keseden ishedi",
  },
  "KID-197": {
    uzLatn: "Qo‘liga berilgan qoshiqni bir soniya ushlab turadi",
    en: "Holds a spoon placed in the hand for one second",
    kaaLatn: "Qolına berilgen qasıqtı bir sekund uslap turadı",
  },
  "KID-198": {
    uzLatn: "Katta kulgili yuz ifodasini qilsa kuladi",
    en: "Laughs when an adult makes a funny face",
    kaaLatn: "Úlken kúlkili bet álpentin etse kúledi",
  },
  "KID-199": {
    uzLatn: "Ko‘zgudagi aksiga talpinib, uni qoqadi",
    en: "Reaches toward and pats the reflection in a mirror",
    kaaLatn: "Aynadaǵı sáwlesine umtılıp, onı qaqadı",
  },
  "KID-200": {
    uzLatn: "O‘z oyoqlari bilan o‘ynaydi",
    en: "Plays with their feet",
    kaaLatn: "Óz ayaqları menen oynaydı",
  },
  "KID-201": {
    uzLatn: "Yaqin, ammo bevosita ushlab bo‘lmaydigan o‘yinchoqlarga talpinadi",
    en: "Reaches for nearby toys that cannot be grasped directly",
    kaaLatn: "Jaqın, biraq tikkeley uslap bolmaytuǵın oyınshıqlarǵa umtıladı",
  },
  "KID-202": {
    uzLatn:
      "Uchinchi o‘yinchoqni olish uchun qo‘lidagi ikkitasidan birini tashlaydi",
    en: "Drops one of two held toys to take a third",
    kaaLatn: "Úshinshi oyınshıqtı alıw ushın qolındaǵı ekewinen birin taslaydı",
  },
  "KID-203": {
    uzLatn: "Yangi o‘yinchoqni ko‘rganda jilmayadi",
    en: "Smiles at the sight of a new toy",
    kaaLatn: "Jańa oyınshıqtı kórgende jımıyadı",
  },
  "KID-204": {
    uzLatn: "Derazadan zavq bilan qaraydi",
    en: "Enjoys looking out of a window",
    kaaLatn: "Terezeden quwanısh penen qaraydı",
  },
  "KID-205": {
    uzLatn: "Karavotda yolg‘iz qolganida g‘udurlaydi",
    en: "Babbles when alone in the crib",
    kaaLatn: "Kerewette jalǵız qalǵanda bıldırlaydı",
  },
  "KID-206": {
    uzLatn: "Tanish buyumlarning nomlarini taniydi",
    en: "Recognizes the names of familiar objects",
    kaaLatn: "Tanıs zatlardıń atların tanıydı",
  },
  "KID-207": {
    uzLatn: "Buyumlarni bir qo‘lidan ikkinchisiga o‘tkazadi",
    en: "Transfers objects from one hand to the other",
    kaaLatn: "Zatlardı bir qolınan ekinshisine ótkeredi",
  },
  "KID-208": {
    uzLatn: "Tik turgan holda koptok otadi",
    en: "Throws a ball while standing",
    kaaLatn: "Tik turǵan halda toptı ılaqtıradı",
  },
  "KID-209": {
    uzLatn: "Bir qo‘lidan ushlab turilganda yuradi",
    en: "Walks when held by one hand",
    kaaLatn: "Bir qolınan uslap turılǵanda júredi",
  },
  "KID-210": {
    uzLatn: "O‘tirgan holda kerakli buyumni olish uchun oldinga egiladi",
    en: "Leans forward while sitting to reach an object",
    kaaLatn: "Otırǵan halda kerekli zattı alıw ushın aldıǵa eńkeyedi",
  },
  "KID-211": {
    uzLatn: "Ko‘zlarini ishqalaydi",
    en: "Rubs the eyes",
    kaaLatn: "Kózlerin ısqılaydı",
  },
  "KID-212": {
    uzLatn: "Katta ushlab turgan piyoladan to‘kmasdan ichadi",
    en: "Drinks without spilling from a cup held by an adult",
    kaaLatn: "Úlken uslap turǵan keseden tókpesten ishedi",
  },
  "KID-213": {
    uzLatn: "Uyda onasining ortidan yurishga urinadi",
    en: "Tries to follow the mother around the house",
    kaaLatn: "Úyde anasınıń artınan júriwge urınadı",
  },
  "KID-214": {
    uzLatn: "Uydagi ayrim buyumlar qayerda saqlanishini eslaydi",
    en: "Remembers where some household items are kept",
    kaaLatn: "Úydegi ayırım zatlar qayda saqlanıwın esinde tutadı",
  },
  "KID-215": {
    uzLatn: "Tovush chiqarishi uchun qo‘g‘irchoq yoki o‘yinchoqni siqadi",
    en: "Squeezes a doll or toy to make it sound",
    kaaLatn: "Ses shıǵarıwı ushın quwırshaq yamasa oyınshıqtı qısadı",
  },
  "KID-216": {
    uzLatn: "Ingraydi yoki yig‘laydi",
    en: "Whines or cries",
    kaaLatn: "Qıńsılaydı yamasa jılaydı",
  },
  "KID-217": {
    uzLatn: "Har bir qo‘lida bittadan, ikki buyumni bir vaqtda ushlaydi",
    en: "Holds two objects at once, one in each hand",
    kaaLatn: "Hár qolında birewden, eki zattı bir waqıtta uslaydı",
  },
  "KID-218": {
    uzLatn: "Qanday qilish ko‘rsatilsa qalamda chizg‘ilaydi",
    en: "Scribbles with a pencil after being shown how",
    kaaLatn: "Qalay etiw kórsetilse qálemde sızǵılaydı",
  },
  "KID-219": {
    uzLatn: "Mustaqil o‘tirib, o‘yinchoqlar bilan o‘ynaydi",
    en: "Sits independently and plays with toys",
    kaaLatn: "Óz betinshe otırıp, oyınshıqlar menen oynaydı",
  },
  "KID-220": {
    uzLatn: "Kattalar yordamisiz bir necha qadam yuradi",
    en: "Takes several steps without adult help",
    kaaLatn: "Úlkenler járdemisiz birneshe qádem júredi",
  },
  "KID-221": {
    uzLatn: "O‘tirish uchun ag‘darilib, o‘zini ko‘taradi",
    en: "Rolls over and pushes up to sit",
    kaaLatn: "Otırıw ushın awdarılıp, ózin kóteredi",
  },
  "KID-222": {
    uzLatn: "Burnini artishga uringanda boshini o‘giradi",
    en: "Turns the head away when someone tries to wipe the nose",
    kaaLatn: "Murnın súrtiwge urınǵanda basın buradı",
  },
  "KID-223": {
    uzLatn: "Taroq yoki cho‘tkani sochiga olib borishga urinadi",
    en: "Tries to bring a comb or brush to the hair",
    kaaLatn: "Taraq yamasa shótkani shashına alıp barıwǵa urınadı",
  },
  "KID-224": {
    uzLatn:
      "Ingrash yoki yig‘lash bilan katta e’tiborini jalb qilishga urinadi",
    en: "Tries to attract an adult’s attention by whining or crying",
    kaaLatn: "Qıńsılaw yamasa jılaw menen úlkenniń dıqqatın tartıwǵa urınadı",
  },
  "KID-225": {
    uzLatn: "Kattaning yuz ifodasiga taqlid qiladi",
    en: "Imitates an adult’s facial expression",
    kaaLatn: "Úlkenniń bet álpentine eliklep etedi",
  },
  "KID-226": {
    uzLatn: "Engashib, tushib ketgan buyumni qidiradi",
    en: "Bends down and looks for a dropped object",
    kaaLatn: "Eńkeyip, túsip ketken zattı izleydi",
  },
  "KID-227": {
    uzLatn: "Buyumlarni tashish uchun savat, sumka yoki qutidan foydalanadi",
    en: "Uses a basket, bag, or box to carry things",
    kaaLatn: "Zatlardı tasıw ushın sebet, sumka yamasa qutıdan paydalanadı",
  },
  "KID-228": {
    uzLatn: "Tanish buyumlarni olib keladi va ko‘tarib yuradi",
    en: "Fetches and carries familiar objects",
    kaaLatn: "Tanıs zatlardı alıp keledi hám kóterip júredi",
  },
  "KID-229": {
    uzLatn: "Buyumni bir qo‘li bilan oladi",
    en: "Reaches for an object with one hand",
    kaaLatn: "Zattı bir qolı menen aladı",
  },
  "KID-230": {
    uzLatn: "Chalqancha yotgan holatidan kattalar yordamisiz o‘tira oladi",
    en: "Can sit up from lying on the back without adult help",
    kaaLatn: "Shalqasınan jatqan halattan úlkenler járdemisiz otıra aladı",
  },
  "KID-231": {
    uzLatn: "Mustaqil yaxshi yuradi",
    en: "Walks well independently",
    kaaLatn: "Óz betinshe jaqsı júredi",
  },
  "KID-232": {
    uzLatn: "Qo‘g‘irchoq kattaligidagi buyumni ushlaydi",
    en: "Holds an object about the size of a doll",
    kaaLatn: "Quwırshaq úlkenligindegi zattı uslaydı",
  },
  "KID-233": {
    uzLatn: "Vannada gubka yoki o‘yinchoqlar bilan o‘ynaydi",
    en: "Plays with a sponge or toys in the bath",
    kaaLatn: "Vannada gubka yamasa oyınshıqlar menen oynaydı",
  },
  "KID-234": {
    uzLatn: "To‘rt bo‘lakka kesilgan buterbrodni yeydi",
    en: "Eats a sandwich cut into four pieces",
    kaaLatn: "Tórt bólekke kesilgen buterbrodtı jeydi",
  },
  "KID-235": {
    uzLatn: "Televizor ko‘radi",
    en: "Watches television",
    kaaLatn: "Televizor kóredi",
  },
  "KID-236": {
    uzLatn: "Harakatlanayotgan buyumlarga tegishga urinadi",
    en: "Tries to touch moving objects",
    kaaLatn: "Háreketlenip turǵan zatlarǵa tiyiwge urınadı",
  },
  "KID-237": { uzLatn: "Chinqiradi", en: "Squeals", kaaLatn: "Shıńǵıradı" },
  "KID-238": {
    uzLatn: "O‘yinchoqlarni stol yoki polga uradi",
    en: "Bangs toys on a table or floor",
    kaaLatn: "Oyınshıqlardı stol yamasa polǵa uradı",
  },
  "KID-239": {
    uzLatn: "O‘tirgan holatidan yordamsiz chalqancha yota oladi",
    en: "Can lie back from sitting without help",
    kaaLatn: "Otırǵan halattan járdemsiz shalqasına jata aladı",
  },
  "KID-240": {
    uzLatn: "Hech narsadan ushlamasdan poldan turib, mustaqil yuradi",
    en: "Gets up from the floor without support and walks independently",
    kaaLatn: "Hesh zattan uslamastan poldan turıp, óz betinshe júredi",
  },
  "KID-241": {
    uzLatn: "O‘tirgan holatidan mustaqil turadi",
    en: "Stands up independently from sitting",
    kaaLatn: "Otırǵan halattan óz betinshe turadı",
  },
  "KID-242": {
    uzLatn:
      "O‘tirganda kerakli buyumni olish uchun yoniga yoki orqaga buriladi",
    en: "Turns sideways or backward while sitting to reach an object",
    kaaLatn:
      "Otırǵanda kerekli zattı alıw ushın qaptalına yamasa arqaǵa burıladı",
  },
  "KID-243": {
    uzLatn: "Ovqatni og‘zida ushlab turadi",
    en: "Keeps food in the mouth",
    kaaLatn: "Awqattı awzında uslap turadı",
  },
  "KID-244": {
    uzLatn: "Oyoqlarini shimga kiritadi",
    en: "Puts the legs into trousers",
    kaaLatn: "Ayaqların shalbarǵa kirgizedi",
  },
  "KID-245": {
    uzLatn: "Harakatlanayotgan buyumni ushlashga urinadi",
    en: "Tries to catch a moving object",
    kaaLatn: "Háreketlenip turǵan zattı uslawǵa urınadı",
  },
  "KID-246": {
    uzLatn: "O‘ralgan yoki biror narsa bilan yopilgan o‘yinchoqni ochadi",
    en: "Unwraps or uncovers a toy",
    kaaLatn: "Oralǵan yamasa bir zat penen jabılǵan oyınshıqtı ashadı",
  },
  "KID-247": {
    uzLatn: "Yon tomonga yura oladi",
    en: "Can walk sideways",
    kaaLatn: "Qaptalǵa júre aladı",
  },
  "KID-248": {
    uzLatn: "Tagligi almashtirilganda oyoqlarini ko‘taradi",
    en: "Raises the legs during a diaper change",
    kaaLatn: "Júrgigi almastırılǵanda ayaqların kóteredi",
  },
  "KID-249": {
    uzLatn: "Buyumlarni qutidan chiqarib, qayta solishni yoqtiradi",
    en: "Enjoys taking objects out of a box and putting them back",
    kaaLatn: "Zatlardı qutıdan shıǵarıp, qayta salıwdı jaqsı kóredi",
  },
  "KID-250": {
    uzLatn: "Piyolani ikki qo‘li bilan ko‘taradi",
    en: "Lifts a cup with both hands",
    kaaLatn: "Keseni eki qolı menen kóteredi",
  },
  "KID-251": {
    uzLatn: "Vannada gubka bilan yuvinishga urinadi",
    en: "Tries to wash with a sponge in the bath",
    kaaLatn: "Vannada gubka menen juwınıwǵa urınadı",
  },
  "KID-252": {
    uzLatn: "Katta yordamida qoshiq bilan ozgina ovqat oladi",
    en: "Scoops a small amount of food with a spoon with adult help",
    kaaLatn: "Úlken járdeminde qasıq penen azǵana awqat aladı",
  },
  "RCDI-001": {
    uzLatn: "«Salom» yoki shunga o‘xshash so‘z bilan salomlashadi",
    en: "Greets others by saying “Hello” or something similar",
    kaaLatn: "«Sálem» yamasa soǵan uqsas sóz benen sálemlesedi",
  },
  "RCDI-002": {
    uzLatn: "Boshqa bolalar haqida g‘iybat qiladi yoki chaqimchilik qiladi",
    en: "Gossips about or tattles on other children",
    kaaLatn: "Basqa balalar haqqında ǵıybat etedi yamasa shaǵım etedi",
  },
  "RCDI-003": {
    uzLatn:
      "Boshqa bolalarga hamdard bo‘lib, ularga yordam va tasalli berishga urinadi",
    en: "Shows sympathy, trying to help and comfort other children",
    kaaLatn:
      "Basqa balalarǵa tilekles bolıp, járdem beriwge hám jubatıwǵa urınadı",
  },
  "RCDI-004": {
    uzLatn: "Bezovta qilishganda ba’zan «Yo‘q» deydi",
    en: "Sometimes says “No” when bothered",
    kaaLatn: "Mazası alınǵanda geyde «Joq» deydi",
  },
  "RCDI-005": {
    uzLatn: "Uy ishlariga ozgina yordam beradi",
    en: "Helps a little with household tasks",
    kaaLatn: "Úy jumıslarına azlap járdem beredi",
  },
  "RCDI-006": {
    uzLatn: "Biror ish qilayotganda yordam so‘raydi",
    en: "Asks for help while doing something",
    kaaLatn: "Bir jumıs etip atırǵanda járdem soraydı",
  },
  "RCDI-007": {
    uzLatn: "«Men qila olmayman», «Bilmayman» yoki «Buni sen qil» deydi",
    en: "Says “I can’t,” “I don’t know,” or “You do it”",
    kaaLatn: "«Men ete almayman», «Bilmeymen» yamasa «Bunı sen et» deydi",
  },
  "RCDI-008": {
    uzLatn: "Diqqatini yaxshi jamlaydi va boshqalarni tinglaydi",
    en: "Concentrates well and listens to others",
    kaaLatn: "Dıqqatın jaqsı jámleydi hám basqalardı tıńlaydı",
  },
  "RCDI-009": {
    uzLatn: "Noto‘g‘ri ish qilganda «Kechirasiz» deb uzr so‘raydi",
    en: "Apologizes, for example by saying “Sorry” after doing something wrong",
    kaaLatn: "Nadurıs is etse «Keshiriń» dep keshirim soraydı",
  },
  "RCDI-010": {
    uzLatn: "Boshqa bolalarga buyruq beradi",
    en: "Bosses other children around",
    kaaLatn: "Basqa balalarǵa buyırıq beredi",
  },
  "RCDI-011": {
    uzLatn: "Tanish kattalarni taniydi va ularga talpinadi",
    en: "Recognizes familiar adults and reaches toward them",
    kaaLatn: "Tanıs úlkenlerdi tanıydı hám olarǵa umtıladı",
  },
  "RCDI-012": {
    uzLatn:
      "Boshqa bolalar bilan quvlashmachoq, bekinmachoq kabi faol o‘yinlar o‘ynaydi",
    en: "Plays active games with other children, such as tag or hide-and-seek",
    kaaLatn:
      "Basqa balalar menen quwalaspash, jasırınbaq sıyaqlı háreketli oyınlar oynaydı",
  },
  "RCDI-013": {
    uzLatn:
      "Boshqa bolalardan ish qilish, ma’lumot yoki tushuntirish uchun yordam so‘raydi",
    en: "Asks other children for practical help, information, or explanations",
    kaaLatn:
      "Basqa balalardan jumıs, maǵlıwmat yamasa túsindiriw ushın járdem soraydı",
  },
  "RCDI-014": {
    uzLatn: "Boshqa bolalar bilan birgalikda narsalar yasaydi yoki quradi",
    en: "Makes or builds things together with other children",
    kaaLatn: "Basqa balalar menen birge zatlar jasaydı yamasa quradı",
  },
  "RCDI-015": {
    uzLatn: "Shashka kabi oddiy stol o‘yinlarini o‘ynaydi",
    en: "Plays simple board games such as checkers",
    kaaLatn: "Shashka sıyaqlı ápiwayı stol oyınların oynaydı",
  },
  "RCDI-016": {
    uzLatn: "Biror ish qilayotganda «Menga qara» deydi",
    en: "Says “Look at me” while doing something",
    kaaLatn: "Bir is etip atırǵanda «Maǵan qara» deydi",
  },
  "RCDI-017": {
    uzLatn:
      "Qo‘g‘irchoq, ayiqcha yoki boshqa o‘yinchoq bilan uxlashni xohlaydi",
    en: "Wants to sleep with a doll, teddy bear, or similar toy",
    kaaLatn:
      "Quwırshaq, ayıwshıq yamasa basqa oyınshıq penen uyıqlawdı qáleydi",
  },
  "RCDI-018": {
    uzLatn:
      "«Bir daqiqa kut» degan gapni tushunib, qisqa vaqt sabr bilan kutadi",
    en: "Understands “Wait a minute” and waits patiently for a short time",
    kaaLatn:
      "«Bir minut kúte tur» degen sózdi túsinip, qısqa waqıt sabır menen kútedi",
  },
  "RCDI-019": {
    uzLatn: "Oddiy stol yoki karta o‘yinlari qoidalariga rioya qiladi",
    en: "Follows the rules of simple board or card games",
    kaaLatn: "Ápiwayı stol yamasa karta oyınları qaǵıydalarına ámel etedi",
  },
  "RCDI-020": {
    uzLatn: "Ko‘zgudagi aksini qiziqish bilan tomosha qiladi",
    en: "Looks at their reflection in a mirror with interest",
    kaaLatn: "Aynadaǵı sáwlesine qızıǵıw menen qaraydı",
  },
  "RCDI-021": {
    uzLatn:
      "Boshqa bolalar bilan ishni qanday bajarishni muhokama qiladi, fikrini aytadi va boshqalarni tinglaydi",
    en: "Discusses with other children how to do something, shares ideas, and listens to theirs",
    kaaLatn:
      "Basqa balalar menen isti qalay orınlawdı talqılaydı, pikirin aytadı hám olardı tıńlaydı",
  },
  "RCDI-022": {
    uzLatn:
      "Navbat talab qiladigan o‘yinlarni o‘ynaydi va odatda o‘z navbatini kutadi",
    en: "Plays turn-taking games and usually waits for their turn",
    kaaLatn:
      "Gezekti talap etetuǵın oyınlardı oynaydı hám ádette óz gezegin kútedi",
  },
  "RCDI-023": {
    uzLatn: "Biror ishni qilish yoki qilmaslik so‘ralganda odatda quloq soladi",
    en: "Usually obeys when asked to do or not do something",
    kaaLatn: "Bir isti etiw yamasa etpew soralǵanda ádette tıńlaydı",
  },
  "RCDI-024": {
    uzLatn: "Boshqalarga yordam taklif qiladi",
    en: "Offers to help others",
    kaaLatn: "Basqalarǵa járdem usınadı",
  },
  "RCDI-025": {
    uzLatn: "Boshqa bolalar bilan birgalikda biror ish qilib o‘ynaydi",
    en: "Plays cooperatively with other children",
    kaaLatn: "Basqa balalar menen birge bir is etip oynaydı",
  },
  "RCDI-026": {
    uzLatn:
      "Telefonda gaplashish yoki uxlash kabi tanish ishlarni «go‘yoki» bajaradi",
    en: "Pretends to do familiar activities such as talking on the phone or sleeping",
    kaaLatn:
      "Telefonda sóylesiw yamasa uyıqlaw sıyaqlı tanıs islerdi «oyın retinde» etedi",
  },
  "RCDI-027": {
    uzLatn: "O‘zini oqlaydi",
    en: "Makes excuses or justifies themselves",
    kaaLatn: "Ózin aqlaydı",
  },
  "RCDI-028": {
    uzLatn: "Boshqa bolalarga mehr ko‘rsatadi",
    en: "Shows affection toward other children",
    kaaLatn: "Basqa balalarǵa mehir kórsetedi",
  },
  "RCDI-029": {
    uzLatn:
      "O‘zi haqida «Men yaxshiman», «Men kattaman» kabi ijobiy gaplar aytadi",
    en: "Speaks positively about themselves, such as “I’m good” or “I’m big”",
    kaaLatn:
      "Ózi haqqında «Men jaqsıman», «Men úlkenmen» sıyaqlı jaqsı sózler aytadı",
  },
  "RCDI-030": {
    uzLatn: "Boshqa bolalar qatnashadigan ishlarni boshlab, yetakchilik qiladi",
    en: "Initiates activities involving other children and acts as a leader",
    kaaLatn: "Basqa balalar qatnasatuǵın islerdi baslap, jetekshilik etedi",
  },
  "RCDI-031": {
    uzLatn:
      "Boshqa bolalar bilan ona, ota, o‘qituvchi yoki kosmonavt rolidagi o‘yinlarni o‘ynaydi",
    en: "Plays role games with other children, pretending to be a parent, teacher, astronaut, and so on",
    kaaLatn:
      "Basqa balalar menen ana, áke, muǵallim yamasa kosmonavt rolindegi oyınlardı oynaydı",
  },
  "RCDI-032": {
    uzLatn:
      "Tengdoshlari bilan guruhli o‘yinlarda ko‘rsatmalarni odatda bajaradi",
    en: "Usually follows directions during group games with peers",
    kaaLatn:
      "Qurbasları menen toparlıq oyınlarda kórsetpelerdi ádette orınlaydı",
  },
  "RCDI-033": {
    uzLatn: "Shikoyatini so‘z bilan ifodalaydi",
    en: "Expresses complaints in words",
    kaaLatn: "Shaǵımın sóz benen bildiredi",
  },
  "RCDI-034": {
    uzLatn:
      "Odatda o‘yinchoq va boshqa buyumlarni bo‘lishadi, ba’zan ular uchun tortishishi mumkin",
    en: "Usually shares toys or other things, though may sometimes argue over them",
    kaaLatn:
      "Ádette oyınshıq hám basqa zatlardı bólisedi, geyde olar ushın tartısıwı múmkin",
  },
  "RCDI-035": {
    uzLatn: "Kichiklarni himoya qiladi",
    en: "Protects younger children",
    kaaLatn: "Kishilerdi qorǵaydı",
  },
  "RCDI-036": {
    uzLatn: "Ba’zan guruh manfaati uchun o‘z xohishidan voz kechadi",
    en: "Sometimes gives up personal wishes for the group’s interests",
    kaaLatn: "Geyde topar mápi ushın óz qálewinen bas tartadı",
  },
  "RCDI-037": {
    uzLatn: "Quchoqlash yoki o‘pish orqali mehr ko‘rsatadi",
    en: "Shows affection by hugging or kissing",
    kaaLatn: "Qushaqlaw yamasa súyiw arqalı mehir kórsetedi",
  },
  "RCDI-038": {
    uzLatn:
      "Odatda tanbehga yaxshi javob berib, noto‘g‘ri xatti-harakatini to‘xtatadi",
    en: "Usually responds well to correction and stops misbehaving",
    kaaLatn: "Ádette eskertiwge jaqsı juwap berip, nadurıs háreketin toqtatadı",
  },
  "RCDI-039": {
    uzLatn:
      "Guruhga yaxshi qo‘shiladi: tinglaydi, bo‘lishadi, navbat kutadi va o‘z hissasini qo‘shadi",
    en: "Joins groups well by listening, sharing, taking turns, and contributing",
    kaaLatn:
      "Toparǵa jaqsı qosıladı: tıńlaydı, bólisedi, gezek kútedi hám óz úlesin qosadı",
  },
  "RCDI-040": {
    uzLatn:
      "Tengdoshlarga ko‘rsatma berib va yordam qilib, ularga rahbarlik qila oladi",
    en: "Can lead peers by giving directions and helping them",
    kaaLatn:
      "Qurbaslarına kórsetpe berip hám járdem etip, olarǵa basshılıq ete aladı",
  },
  "RCDI-041": {
    uzLatn: "Qoshiq bilan mustaqil ovqatlanadi",
    en: "Eats independently with a spoon",
    kaaLatn: "Qasıq penen óz betinshe awqatlanadı",
  },
  "RCDI-042": {
    uzLatn: "Qoshiq bilan deyarli to‘kmasdan yeydi",
    en: "Eats with a spoon with almost no spilling",
    kaaLatn: "Qasıq penen derlik tókpesten jeydi",
  },
  "RCDI-043": {
    uzLatn: "Qo‘llarini yuvadi va artadi",
    en: "Washes and dries the hands",
    kaaLatn: "Qolların juwadı hám súrtedi",
  },
  "RCDI-044": {
    uzLatn: "Kichik va katta hojat uchun tuvakka so‘rashga o‘rgangan",
    en: "Is toilet trained for both urination and bowel movements",
    kaaLatn: "Kishi hám úlken hájet ushın gorshokqa soranıwǵa úyrengen",
  },
  "RCDI-045": {
    uzLatn: "Bitta yoki bir nechta tugmani taqadi",
    en: "Fastens one or more buttons",
    kaaLatn: "Bir yamasa birneshe túymeni taǵadı",
  },
  "RCDI-046": {
    uzLatn: "Ko‘ylak, bluzka yoki paltoning barcha tugmalarini to‘g‘ri taqadi",
    en: "Correctly fastens all buttons on a shirt, blouse, or coat",
    kaaLatn: "Kóylek, bluzka yamasa paltonıń barlıq túymelerin durıs taǵadı",
  },
  "RCDI-047": {
    uzLatn: "Sanchqi bilan ovqatlanadi",
    en: "Eats with a fork",
    kaaLatn: "Shanıshqı menen awqatlanadı",
  },
  "RCDI-048": {
    uzLatn: "Oyoq kiyim bog‘ichidan tashqari, mustaqil kiyinadi va yechinadi",
    en: "Dresses and undresses independently except for tying shoelaces",
    kaaLatn:
      "Ayaq kiyim bawın baylawdan basqa, óz betinshe kiyinedi hám sheshinedi",
  },
  "RCDI-049": {
    uzLatn: "Eshikni ochishda tutqichni burab tortadi",
    en: "Turns and pulls the handle to open a door",
    kaaLatn: "Esikti ashqanda tutqanı burıp tartadı",
  },
  "RCDI-050": {
    uzLatn: "Piyolani og‘ziga olib borib ichadi",
    en: "Brings a cup to the mouth and drinks",
    kaaLatn: "Keseni awzına alıp barıp ishedi",
  },
  "RCDI-051": {
    uzLatn: "Ko‘ylak yoki bluzkani mustaqil kiyadi",
    en: "Puts on a shirt or blouse independently",
    kaaLatn: "Kóylek yamasa bluzkanı óz betinshe kiyedi",
  },
  "RCDI-052": {
    uzLatn: "Tufli va paypog‘ini yechadi",
    en: "Takes off shoes and socks",
    kaaLatn: "Tufli hám shulǵawın sheshedi",
  },
  "RCDI-053": {
    uzLatn: "Bo‘sh tarelkani onasi yoki otasiga beradi",
    en: "Hands an empty plate to the mother or father",
    kaaLatn: "Bos tarelkanı anasına yamasa ákesine beredi",
  },
  "RCDI-054": {
    uzLatn:
      "Kvartira bo‘ylab mustaqil yurishiga ruxsat beriladi va uni doimiy kuzatish shart emas",
    en: "Is allowed to move around the home independently without constant supervision",
    kaaLatn:
      "Úy boylap óz betinshe júriwine ruxsat beriledi hám onı úzliksiz baqlaw shárt emes",
  },
  "RCDI-055": {
    uzLatn: "To‘liq mustaqil yechinadi",
    en: "Undresses completely without help",
    kaaLatn: "Tolıq óz betinshe sheshinedi",
  },
  "RCDI-056": {
    uzLatn: "Uyda turli buyumlar qayerda saqlanishini eslaydi",
    en: "Remembers where different things are kept at home",
    kaaLatn: "Úyde túrli zatlar qayda saqlanıwın esinde tutadı",
  },
  "RCDI-057": {
    uzLatn: "Kreker yoki pechenyeni o‘zi yeydi",
    en: "Eats crackers or biscuits independently",
    kaaLatn: "Kreker yamasa pechenyeni ózi jeydi",
  },
  "RCDI-058": {
    uzLatn:
      "Buyumlarni tashish uchun kichik chelak yoki boshqa idishdan foydalanadi",
    en: "Uses a small bucket or other container to carry things",
    kaaLatn:
      "Zatlardı tasıw ushın kishkene shelek yamasa basqa ıdıstan paydalanadı",
  },
  "RCDI-059": {
    uzLatn: "Tuflini to‘g‘ri oyog‘iga kiyadi",
    en: "Puts each shoe on the correct foot",
    kaaLatn: "Tuflidi durıs ayaǵına kiyedi",
  },
  "RCDI-060": {
    uzLatn: "Vannada o‘zi yuvinadi, biroz yordam olishi mumkin",
    en: "Bathes independently, perhaps with a little help",
    kaaLatn: "Vannada ózi juwınadı, azlap járdem alıwı múmkin",
  },
  "RCDI-061": {
    uzLatn: "O‘z buyumlarini tartibli saqlaydi",
    en: "Keeps personal belongings in order",
    kaaLatn: "Óz zatların tártipli saqlaydı",
  },
  "RCDI-062": {
    uzLatn: "Surkash uchun stol pichog‘idan foydalanadi",
    en: "Uses a table knife for spreading",
    kaaLatn: "Jaǵıw ushın stol pıshaǵınan paydalanadı",
  },
  "RCDI-063": {
    uzLatn: "Paypog‘ini yechadi",
    en: "Takes off socks",
    kaaLatn: "Shulǵawın sheshedi",
  },
  "RCDI-064": {
    uzLatn: "Yuzini mustaqil yuvadi",
    en: "Washes the face independently",
    kaaLatn: "Betin óz betinshe juwadı",
  },
  "RCDI-065": {
    uzLatn: "Tun bo‘yi quruq qoladi",
    en: "Stays dry throughout the night",
    kaaLatn: "Tún boyı qurǵaq qaladı",
  },
  "RCDI-066": {
    uzLatn: "Ovqatni chaynaydi",
    en: "Chews food",
    kaaLatn: "Awqattı shaynaydı",
  },
  "RCDI-067": {
    uzLatn: "Tuflisini kiyishga urinadi yoki o‘zi kiyadi",
    en: "Tries to put on shoes or puts them on",
    kaaLatn: "Tuflisin kiyiwge urınadı yamasa ózi kiyedi",
  },
  "RCDI-068": {
    uzLatn: "Ko‘ylak yoki shim teskari o‘girilganini payqab, uni to‘g‘rilaydi",
    en: "Notices inside-out clothing and turns it the right way",
    kaaLatn: "Kóylek yamasa shalbar teris awdarılǵanın bayqap, onı durıslaydı",
  },
  "RCDI-069": {
    uzLatn: "Molniyani ochadi",
    en: "Unzips zippers",
    kaaLatn: "Sıdırmanı ashadı",
  },
  "RCDI-070": {
    uzLatn: "To‘kilgan narsani latta yoki gubka bilan artadi",
    en: "Wipes up spills with a cloth or sponge",
    kaaLatn: "Tógilgen zattı gezleme yamasa gubka menen súrtedi",
  },
  "RCDI-071": {
    uzLatn: "Sutni piyolaga to‘kmasdan quyadi",
    en: "Pours milk into a cup without spilling",
    kaaLatn: "Sútti kesege tókpesten quyadı",
  },
  "RCDI-072": {
    uzLatn: "Biror narsani olish uchun stul, kursi yoki qutiga chiqadi",
    en: "Climbs onto a chair, stool, or box to reach something",
    kaaLatn: "Bir zattı alıw ushın stul, otırǵısh yamasa qutıǵa shıǵadı",
  },
  "RCDI-073": {
    uzLatn: "Qoshiqni dastasidan ushlaydi",
    en: "Holds a spoon by the handle",
    kaaLatn: "Qasıqtı sapınan uslaydı",
  },
  "RCDI-074": {
    uzLatn: "Tugmalari yechilgan ko‘ylak yoki bluzkani mustaqil yechadi",
    en: "Takes off an unbuttoned shirt or blouse independently",
    kaaLatn: "Túymeleri sheshilgen kóylek yamasa bluzkanı óz betinshe sheshedi",
  },
  "RCDI-075": {
    uzLatn: "Tishlarini mustaqil tozalaydi",
    en: "Brushes the teeth independently",
    kaaLatn: "Tislerin óz betinshe tazalaydı",
  },
  "RCDI-076": {
    uzLatn: "O‘ziga ichimlik quyadi",
    en: "Pours a drink for themselves",
    kaaLatn: "Ózine ishimlik quyadı",
  },
  "RCDI-077": {
    uzLatn: "Oyoq kiyim bog‘ichini bog‘laydi",
    en: "Ties shoelaces",
    kaaLatn: "Ayaq kiyim bawın baylaydı",
  },
  "RCDI-078": {
    uzLatn: "Ko‘chadan o‘tishda odatda ikki tomonga qaraydi",
    en: "Usually looks both ways before crossing a street",
    kaaLatn: "Kósheden ótkende ádette eki tárepke qaraydı",
  },
  "RCDI-079": {
    uzLatn:
      "Hojatxonaga mustaqil boradi, tozalanadi, suvni oqizadi va qo‘lini yuvadi",
    en: "Uses the toilet independently, wipes, flushes, and washes hands",
    kaaLatn:
      "Hájetxanaǵa óz betinshe baradı, tazalanadı, suwdı aǵızadı hám qolın juwadı",
  },
  "RCDI-080": {
    uzLatn:
      "Mustaqil ovqatlanadi, kiyinadi va yuvinadi, ammo ozgina yordam kerak bo‘lishi mumkin",
    en: "Eats, dresses, and washes independently but may need a little help",
    kaaLatn:
      "Óz betinshe awqatlanadı, kiyinedi hám juwınadı, biraq azlap járdem kerek bolıwı múmkin",
  },
  "RCDI-081": {
    uzLatn: "Mustaqil yuradi",
    en: "Walks independently",
    kaaLatn: "Óz betinshe júredi",
  },
  "RCDI-082": {
    uzLatn: "Zinadan ikki oyog‘ini birga qo‘yib sakraydi",
    en: "Jumps off steps with both feet together",
    kaaLatn: "Basqıshtan eki ayaǵın birge qoyıp sekiredi",
  },
  "RCDI-083": {
    uzLatn: "Tik turib koptok otadi",
    en: "Throws a ball while standing",
    kaaLatn: "Tik turıp toptı ılaqtıradı",
  },
  "RCDI-084": { uzLatn: "Yuguradi", en: "Runs", kaaLatn: "Júgiredi" },
  "RCDI-085": {
    uzLatn: "Burchaklardan aylanib va keskin to‘xtab, erkin yuguradi",
    en: "Runs freely around corners and makes sudden stops",
    kaaLatn: "Múyeshlerden aylanıp hám birden toqtap, erkin júgiredi",
  },
  "RCDI-086": {
    uzLatn: "Pedal bosib uch g‘ildirakli velosiped minadi",
    en: "Rides a tricycle by pedaling",
    kaaLatn: "Pedal basıp úsh dóńgelekli velosiped minedi",
  },
  "RCDI-087": {
    uzLatn: "Zinadan mustaqil chiqadi va tushadi",
    en: "Goes up and down stairs independently",
    kaaLatn: "Basqıshtan óz betinshe shıǵadı hám túsedi",
  },
  "RCDI-088": {
    uzLatn:
      "Har bir zinaga oyoqlarini navbat bilan qo‘yib mustaqil chiqadi va tushadi",
    en: "Goes up and down stairs independently, alternating feet on each step",
    kaaLatn:
      "Hár basqıshqa ayaqların gezek penen qoyıp, óz betinshe shıǵadı hám túsedi",
  },
  "RCDI-089": {
    uzLatn: "Koptokni oyog‘i bilan tepadi",
    en: "Kicks a ball",
    kaaLatn: "Toptı ayaǵı menen tebedi",
  },
  "RCDI-090": {
    uzLatn: "Yordamsiz bir oyog‘ida ketma-ket kamida ikki marta sakraydi",
    en: "Hops on one foot at least twice in a row without support",
    kaaLatn: "Járdemsiz bir ayaǵında qatarınan keminde eki ret sekiredi",
  },
  "RCDI-091": {
    uzLatn: "Yugurayotganda uchragan to‘siqlardan sakrab o‘tadi",
    en: "Jumps over obstacles while running",
    kaaLatn: "Júgirip baratırǵanda ushırasqan tosıqlardan sekirip ótedi",
  },
  "RCDI-092": {
    uzLatn: "Bir oyog‘ida yordamsiz barqaror turadi",
    en: "Stands steadily on one foot without support",
    kaaLatn: "Bir ayaǵında járdemsiz turaqlı turadı",
  },
  "RCDI-093": {
    uzLatn: "Bolalar maydonchasidagi qurilmalarga tirmashadi",
    en: "Climbs playground structures",
    kaaLatn: "Balalar maydanshasındaǵı qurılmalarǵa órmelep shıǵadı",
  },
  "RCDI-094": {
    uzLatn: "Oldinga umbaloq oshadi",
    en: "Does a forward somersault",
    kaaLatn: "Aldıǵa domalap asadı",
  },
  "RCDI-095": {
    uzLatn: "Bir oyog‘ida yordamsiz sakraydi",
    en: "Hops on one foot without support",
    kaaLatn: "Bir ayaǵında járdemsiz sekiredi",
  },
  "RCDI-096": {
    uzLatn: "Arg‘imchoqda o‘zi tebranadi",
    en: "Swings independently",
    kaaLatn: "Átkenshekte ózi terbeledi",
  },
  "RCDI-097": {
    uzLatn: "Chalqanchadan qorniga ag‘dariladi",
    en: "Rolls from the back onto the stomach",
    kaaLatn: "Shalqasınan qarnına awdarıladı",
  },
  "RCDI-098": {
    uzLatn: "Yordamsiz barqaror tik turadi",
    en: "Stands steadily without support",
    kaaLatn: "Járdemsiz turaqlı tik turadı",
  },
  "RCDI-099": {
    uzLatn: "Tik turgan joyidan buyumlar yoki odamlar ustidan sakrab o‘tadi",
    en: "Jumps over objects or people from a standing position",
    kaaLatn: "Tik turǵan ornınan zatlar yamasa adamlar ústinen sekirip ótedi",
  },
  "RCDI-100": {
    uzLatn: "Manej yoki mebeldan ushlab, uning bo‘ylab yuradi",
    en: "Walks along a playpen or furniture while holding on",
    kaaLatn: "Manej yamasa mebelden uslap, onıń boylap júredi",
  },
  "RCDI-101": {
    uzLatn: "Yiqilmasdan yaxshi yuguradi",
    en: "Runs well without falling",
    kaaLatn: "Jıǵılmastan jaqsı júgiredi",
  },
  "RCDI-102": {
    uzLatn: "Bir oyog‘ida yordamsiz bir necha soniya turadi",
    en: "Stands on one foot for several seconds without support",
    kaaLatn: "Bir ayaǵında járdemsiz birneshe sekund turadı",
  },
  "RCDI-103": {
    uzLatn: "Tepalik zinapoyasiga mustaqil chiqib, undan sirpanib tushadi",
    en: "Climbs the ladder to a slide and slides down independently",
    kaaLatn: "Tóbeshik basqıshına óz betinshe shıǵıp, odan sırǵanap túsedi",
  },
  "RCDI-104": {
    uzLatn: "Yordamsiz o‘tiradi",
    en: "Sits without support",
    kaaLatn: "Járdemsiz otıradı",
  },
  "RCDI-105": {
    uzLatn: "Yon g‘ildirakli yoki ularsiz ikki g‘ildirakli velosiped minadi",
    en: "Rides a two-wheeled bicycle with or without training wheels",
    kaaLatn: "Qaptal dóńgelekli yamasa olarsız eki dóńgelekli velosiped minedi",
  },
  "RCDI-106": {
    uzLatn: "Tortilib yoki boshqa usulda mustaqil o‘rnidan turadi",
    en: "Gets to standing independently by pulling up or otherwise",
    kaaLatn: "Tartılıp yamasa basqa usılda óz betinshe ornınan turadı",
  },
  "RCDI-107": {
    uzLatn: "«G‘ildirak» mashqini bajaradi",
    en: "Does a cartwheel",
    kaaLatn: "«Dóńgelek» shınıǵıwın orınlaydı",
  },
  "RCDI-108": {
    uzLatn:
      "Boshqa bolalar bilan koptok o‘ynaydi: ularga otadi va kamida yarmida tutib oladi",
    en: "Plays ball with other children, throwing and catching it at least half the time",
    kaaLatn:
      "Basqa balalar menen top oynaydı: olarǵa ılaqtıradı hám keminde yarımında tutıp aladı",
  },
  "RCDI-109": {
    uzLatn: "Tirmashib kattalar stuliga chiqadi va o‘tiradi",
    en: "Climbs onto and sits in an adult chair",
    kaaLatn: "Órmelep úlkenler stulına shıǵadı hám otıradı",
  },
  "RCDI-110": {
    uzLatn:
      "Yugurish, tirmashish va sakrashli o‘yinlarda yaxshi muvozanat va muvofiqlik ko‘rsatadi",
    en: "Shows good balance and coordination in games involving running, climbing, and jumping",
    kaaLatn:
      "Júgiriw, órmelew hám sekiriwli oyınlarda jaqsı teńsalmaqlılıq hám sáykeslik kórsetedi",
  },
  "RCDI-111": {
    uzLatn: "Buyumlarni bir qo‘li bilan oladi",
    en: "Picks up objects with one hand",
    kaaLatn: "Zatlardı bir qolı menen aladı",
  },
  "RCDI-112": {
    uzLatn: "Ikki yoki undan ortiq kubikdan minora quradi",
    en: "Builds towers of two or more blocks",
    kaaLatn: "Eki yamasa odan artıq kubikten minara quradı",
  },
  "RCDI-113": {
    uzLatn: "Har bir qo‘lida bittadan ikki buyumni bir vaqtda ushlaydi",
    en: "Holds two objects at once, one in each hand",
    kaaLatn: "Hár qolında birewden eki zattı bir waqıtta uslaydı",
  },
  "RCDI-114": {
    uzLatn: "Katta buyumlarni ikki qo‘li bilan ko‘taradi",
    en: "Lifts large objects with both hands",
    kaaLatn: "Úlken zatlardı eki qolı menen kóteredi",
  },
  "RCDI-115": {
    uzLatn: "Kesishgan ikki chiziqni (+) chizadi yoki ko‘chirib chizadi",
    en: "Draws or copies two intersecting lines (+)",
    kaaLatn: "Kesilisken eki sızıqtı (+) sızadı yamasa kóshirip sızadı",
  },
  "RCDI-116": {
    uzLatn: "To‘qqiz yoki undan ortiq bo‘lakli pazl rasmini yig‘adi",
    en: "Completes picture puzzles of nine or more pieces",
    kaaLatn: "Toǵız yamasa odan artıq bólekli pazl súwretin jıynaydı",
  },
  "RCDI-117": {
    uzLatn:
      "Pechenye bo‘lagi kabi mayda buyumni bosh barmoq va yana bir barmog‘i bilan oladi",
    en: "Picks up small objects using the thumb and another finger",
    kaaLatn:
      "Pechenye bólegi sıyaqlı mayda zattı bas barmaq hám taǵı bir barmaǵı menen aladı",
  },
  "RCDI-118": {
    uzLatn:
      "Ko‘z, burun va og‘izli bosh, tana, qo‘l-oyoq, kaft va oyoq panjalari bor to‘liq odam rasmini chizadi",
    en: "Draws complete people with a face, body, arms, legs, hands, and feet",
    kaaLatn:
      "Kóz, murın hám awızlı bası, denesi, qol-ayaǵı, alaqanı hám tabanı bar tolıq adam súwretin sızadı",
  },
  "RCDI-119": {
    uzLatn: "Bo‘rni kattalardek bir nechta barmog‘i bilan ushlaydi",
    en: "Holds a crayon with several fingers, much like an adult",
    kaaLatn: "Bordı úlkenler sıyaqlı birneshe barmaǵı menen uslaydı",
  },
  "RCDI-120": {
    uzLatn: "Buyumlarni bir qo‘lidan ikkinchisiga o‘tkazadi",
    en: "Transfers objects from one hand to the other",
    kaaLatn: "Zatlardı bir qolınan ekinshisine ótkeredi",
  },
  "RCDI-121": {
    uzLatn: "Bo‘r yoki qalam bilan chizg‘ilaydi",
    en: "Scribbles with a crayon or pencil",
    kaaLatn: "Bor yamasa qálem menen sızǵılaydı",
  },
  "RCDI-122": {
    uzLatn: "Qog‘ozni qaychi bilan bir chetidan ikkinchi chetigacha kesadi",
    en: "Cuts paper with scissors from one edge to the other",
    kaaLatn: "Qaǵazdı qayshı menen bir shetinen ekinshi shetine shekem kesedi",
  },
  "RCDI-123": {
    uzLatn: "Tanish mumkin bo‘lgan rasmlarni chizadi",
    en: "Draws recognizable pictures",
    kaaLatn: "Tanıwǵa bolatuǵın súwretlerdi sızadı",
  },
  "RCDI-124": {
    uzLatn: "To‘liq doira chizadi yoki ko‘chirib chizadi",
    en: "Draws or copies a complete circle",
    kaaLatn: "Tolıq dóńgelek sızadı yamasa kóshirip sızadı",
  },
  "RCDI-125": {
    uzLatn: "Kichik qaychi bilan kesishga urinadi yoki kesadi",
    en: "Tries to cut or cuts with small scissors",
    kaaLatn: "Kishkene qayshı menen kesiwge urınadı yamasa kesedi",
  },
  "RCDI-126": {
    uzLatn: "To‘rtta aniq burchakli kvadrat chizadi yoki ko‘chirib chizadi",
    en: "Draws or copies a square with four clear corners",
    kaaLatn: "Tórt anıq múyeshli kvadrat sızadı yamasa kóshirip sızadı",
  },
  "RCDI-127": {
    uzLatn: "Oddiy kontur yoki shakl bo‘ylab qaychi bilan kesadi",
    en: "Cuts along a simple outline or shape with scissors",
    kaaLatn: "Ápiwayı kontur yamasa forma boylap qayshı menen kesedi",
  },
  "RCDI-128": {
    uzLatn: "Besh yoki undan ortiq kubikdan minora quradi",
    en: "Builds towers of five or more blocks",
    kaaLatn: "Bes yamasa odan artıq kubikten minara quradı",
  },
  "RCDI-129": {
    uzLatn: "Bolalar kitobi sahifalarini bittadan varaqlaydi",
    en: "Turns the pages of a children’s book one at a time",
    kaaLatn: "Balalar kitabınıń betlerin bir-birden awdaradı",
  },
  "RCDI-130": {
    uzLatn:
      "Bosh, ko‘z, burun, og‘iz, soch, tana, qo‘l yoki oyoq kabi kamida uch qismli odam rasmini chizadi",
    en: "Draws people with at least three parts such as a head, eyes, nose, mouth, hair, body, arms, or legs",
    kaaLatn:
      "Bas, kóz, murın, awız, shash, dene, qol yamasa ayaq sıyaqlı keminde úsh bólimli adam súwretin sızadı",
  },
  "RCDI-131": {
    uzLatn: "Sakkiz yoki undan ortiq kubikdan minora quradi",
    en: "Builds towers of eight or more blocks",
    kaaLatn: "Segiz yamasa odan artıq kubikten minara quradı",
  },
  "RCDI-132": {
    uzLatn:
      "Bir qo‘lini boshqasidan ko‘proq ishlatib, muayyan qo‘lni afzal ko‘radi",
    en: "Uses one hand more than the other and shows a hand preference",
    kaaLatn:
      "Bir qolın basqasınan kóbirek isletip, belgili bir qolın maqul kóredi",
  },
  "RCDI-133": {
    uzLatn: "Kubiklardan oddiy uy, ko‘prik yoki mashina kabi narsalar quradi",
    en: "Builds simple houses, bridges, or cars from blocks",
    kaaLatn:
      "Kubiklerden ápiwayı úy, kópir yamasa mashina sıyaqlı zatlar quradı",
  },
  "RCDI-134": {
    uzLatn: "Bo‘yash kitobidagi shakllarni konturdan chiqmasdan bo‘yaydi",
    en: "Colors shapes in a coloring book while staying within outlines",
    kaaLatn: "Boyaw kitabındaǵı formalardı konturdan shıqpastan boyaydı",
  },
  "RCDI-135": {
    uzLatn: "Aylana harakat bilan chizg‘ilaydi",
    en: "Scribbles using circular movements",
    kaaLatn: "Aylana háreket penen sızǵılaydı",
  },
  "RCDI-136": {
    uzLatn: "Banka va butilka qopqoqlarini burab ochadi va yopadi",
    en: "Unscrews and screws on jar and bottle lids",
    kaaLatn: "Banka hám shıshe qapaqların burap ashadı hám jabıwladı",
  },
  "RCDI-137": {
    uzLatn: "Tik yoki yotiq chiziqlar chizadi yoki ko‘chirib chizadi",
    en: "Draws or copies vertical or horizontal lines",
    kaaLatn: "Tik yamasa jatıq sızıqlar sızadı yamasa kóshirip sızadı",
  },
  "RCDI-138": {
    uzLatn:
      "Yig‘ma rasmning alohida oddiy shakl bo‘laklarini o‘z joyiga qo‘yadi",
    en: "Places individual simple pieces correctly in an inset puzzle",
    kaaLatn:
      "Jıynalma súwrettiń bólek ápiwayı forma bóleklerin óz ornına qoyadı",
  },
  "RCDI-139": {
    uzLatn: "Bir qo‘li bilan ikkita kichik o‘yinchoqni oladi",
    en: "Picks up two small toys with one hand",
    kaaLatn: "Bir qolı menen eki kishkene oyınshıqtı aladı",
  },
  "RCDI-140": {
    uzLatn:
      "O‘ylangan tartibda mazmunli rasm chizadi va bosma harflar bilan yozadi",
    en: "Draws and prints letters in a deliberate, meaningful way",
    kaaLatn:
      "Oylanǵan tártipte mánili súwret sızadı hám baspa háripler menen jazadı",
  },
  "RCDI-141": {
    uzLatn: "Sizni «ona», «ota» yoki shunga o‘xshash so‘z bilan ataydi",
    en: "Calls you “mom,” “dad,” or something similar",
    kaaLatn: "Sizdi «ana», «áke» yamasa soǵan uqsas sóz benen ataydı",
  },
  "RCDI-142": {
    uzLatn:
      "«Kerak emas», «qila olmayman», «qilmayman» kabi gaplarda «emas» inkorini ishlatadi",
    en: "Uses negation in phrases such as “don’t,” “can’t,” or “won’t”",
    kaaLatn:
      "«Kerek emes», «ete almayman», «etpeymen» sıyaqlı sózlerde biykarlawdı qollanadı",
  },
  "RCDI-143": {
    uzLatn: "«Ona» va «ota»dan tashqari kamida ikkita so‘z aytadi",
    en: "Says at least two words besides “mom” and “dad”",
    kaaLatn: "«Ana» hám «áke»den basqa keminde eki sóz aytadı",
  },
  "RCDI-144": {
    uzLatn: "Kamida 10 ta so‘z ishlatadi",
    en: "Uses at least 10 words",
    kaaLatn: "Keminde 10 sóz qollanadı",
  },
  "RCDI-145": {
    uzLatn: "Gapirayotgandek, gaplarga o‘xshash tovushlar chiqaradi",
    en: "“Talks,” making sounds as if speaking in sentences",
    kaaLatn: "Sóylep atırǵanday, gáplerge uqsas sesler shıǵaradı",
  },
  "RCDI-146": {
    uzLatn:
      "«Yiqilsa jarohat olardi» kabi, yuz berishi mumkin bo‘lgan voqealar haqida gapiradi",
    en: "Talks about things that could happen, such as “He would get hurt if he fell”",
    kaaLatn:
      "«Jıǵılsa jaralanar edi» sıyaqlı, bolıwı múmkin waqıyalar haqqında sóyleydi",
  },
  "RCDI-147": {
    uzLatn:
      "Rasmda tasvirlangan harakatni, masalan «Mushuk ovqat yeyapti» deb aytadi",
    en: "Describes the action in a picture, such as “The cat is eating”",
    kaaLatn: "Súwrettegi háreketti, mısalı «Pıshıq awqat jep atır» dep aytadı",
  },
  "RCDI-148": {
    uzLatn:
      "«Nima» yoki «qayerda» so‘zlari bilan boshlanadigan savollar beradi",
    en: "Asks questions beginning with “what” or “where”",
    kaaLatn: "«Ne» yamasa «qayda» sózleri menen baslanatuǵın sorawlar beredi",
  },
  "RCDI-149": {
    uzLatn:
      "Turli buyumlarni ifodalash uchun kamida beshta turli so‘z ishlatadi",
    en: "Uses at least five different words for different objects",
    kaaLatn: "Túrli zatlardı bildiriw ushın keminde bes túrli sóz qollanadı",
  },
  "RCDI-150": {
    uzLatn:
      "«Men», «sen», «u», «menga» yoki «meni» so‘zlaridan kamida bittasini ishlatadi",
    en: "Uses at least one pronoun such as “I,” “you,” “he,” “she,” “me,” or “myself”",
    kaaLatn:
      "«Men», «sen», «ol», «maǵan» yamasa «meni» sózlerinen keminde birin qollanadı",
  },
  "RCDI-151": {
    uzLatn:
      "«Nega», «qachon» yoki «qanday» bilan boshlanadigan savollar beradi",
    en: "Asks questions beginning with “why,” “when,” or “how”",
    kaaLatn:
      "«Nege», «qashan» yamasa «qalay» menen baslanatuǵın sorawlar beredi",
  },
  "RCDI-152": {
    uzLatn: "O‘n yoki undan ortiq so‘zli uzun, murakkab gaplar ishlatadi",
    en: "Uses long, complex sentences of up to ten or more words",
    kaaLatn: "On yamasa odan artıq sózli uzın, quramalı gáplerdi qollanadı",
  },
  "RCDI-153": {
    uzLatn:
      "Voqealar ketma-ketligini tasvirlab, nima bo‘lganini batafsil gapiradi",
    en: "Describes what happened in detail and in sequence",
    kaaLatn: "Waqıyalar izbe-izligin súwretlep, ne bolǵanın tolıq aytıp beredi",
  },
  "RCDI-154": {
    uzLatn: "O‘z buyumlari haqida «mening» deydi",
    en: "Uses possessive words such as “mine” for personal belongings",
    kaaLatn: "Óz zatları haqqında «meniki» deydi",
  },
  "RCDI-155": {
    uzLatn: "Buyumlarni ko‘rsatadi",
    en: "Points to objects",
    kaaLatn: "Zatlardı kórsetedi",
  },
  "RCDI-156": {
    uzLatn:
      "So‘zlarni ko‘plik shaklida ishlatadi, masalan «itlar», «mashinalar»",
    en: "Uses plural forms of words, such as “dogs” or “cars”",
    kaaLatn: "Sózlerdi kóplik túrinde qollanadı, mısalı «iytler», «mashinalar»",
  },
  "RCDI-157": {
    uzLatn: "«Yana», «yana bitta» deb so‘raydi",
    en: "Asks for “more” or “one more”",
    kaaLatn: "«Taǵı», «taǵı birew» dep soraydı",
  },
  "RCDI-158": {
    uzLatn: "Ovqat yoki ichimlikni so‘z yoki tovush bilan so‘raydi",
    en: "Asks for food or drink using words or sounds",
    kaaLatn: "Awqat yamasa ishimlikti sóz yamasa ses penen soraydı",
  },
  "RCDI-159": {
    uzLatn: "Ikki-uch yoki undan ortiq so‘zli gaplar ishlatadi",
    en: "Uses sentences of two, three, or more words",
    kaaLatn: "Eki-úsh yamasa odan artıq sózli gáplerdi qollanadı",
  },
  "RCDI-160": {
    uzLatn: "Rasmli kitobdagi bir nechta tanish buyumni nomlaydi",
    en: "Names several familiar objects in picture books",
    kaaLatn: "Súwretli kitaptaǵı birneshe tanıs zattı ataydı",
  },
  "RCDI-161": {
    uzLatn: "Ikki gapni «yoki», «lekin» bog‘lovchilari bilan birlashtiradi",
    en: "Joins two sentences with “or” or “but”",
    kaaLatn: "Eki gápti «yamasa», «biraq» dánekerleri menen birlestiredi",
  },
  "RCDI-162": {
    uzLatn: "Hafta kunlarini to‘g‘ri ketma-ketlikda aytadi",
    en: "Names the days of the week in the correct order",
    kaaLatn: "Hápteniń kúnlerin durıs izbe-izlikte aytadı",
  },
  "RCDI-163": {
    uzLatn: "«Bugun», «kecha» va «ertaga» so‘zlarini to‘g‘ri ishlatadi",
    en: "Uses “today,” “yesterday,” and “tomorrow” correctly",
    kaaLatn: "«Búgin», «keshe» hám «erteń» sózlerin durıs qollanadı",
  },
  "RCDI-164": {
    uzLatn: "Oddiy savollarga «ha» yoki «yo‘q» deb to‘g‘ri javob beradi",
    en: "Answers simple questions correctly with “yes” or “no”",
    kaaLatn: "Ápiwayı sorawlarǵa «awa» yamasa «joq» dep durıs juwap beredi",
  },
  "RCDI-165": {
    uzLatn:
      "Belgi yoki xususiyatning juda yuqori darajasini bildiradigan so‘z shakllarini ishlatadi",
    en: "Uses word forms expressing a very high or superlative degree of a quality",
    kaaLatn:
      "Belgi yamasa qásiyettiń eń joqarı dárejesin bildiretuǵın sóz túrlerin qollanadı",
  },
  "RCDI-166": {
    uzLatn: "Siz aytgan ayrim tovushlarga taqlid qiladi",
    en: "Imitates some sounds that you make",
    kaaLatn: "Siz aytqan ayırım seslerge eliklep etedi",
  },
  "RCDI-167": {
    uzLatn:
      "«Kuchukcha, mushukcha yoki o‘rdakcha qanday ovoz chiqaradi?» kabi savollarga javob beradi",
    en: "Answers questions such as “What sound does a dog, cat, or duck make?”",
    kaaLatn:
      "«Kúshik, pıshıq yamasa úyrek qanday ses shıǵaradı?» sıyaqlı sorawlarǵa juwap beredi",
  },
  "RCDI-168": {
    uzLatn: "Qo‘l silkitib «xayr» deydi",
    en: "Waves goodbye",
    kaaLatn: "Qol bılǵap «saw bol» deydi",
  },
  "RCDI-169": {
    uzLatn:
      "«Xursandman», «xafaman», «o‘zimni yomon his qilyapman», «jahlim chiqdi» kabi hislari haqida gapiradi",
    en: "Talks about feelings such as being happy, sad, unwell, or angry",
    kaaLatn:
      "«Quwanıshlıman», «qapaman», «ózimdi jaman sezip atırman», «ashıwlıman» sıyaqlı sezimleri haqqında sóyleydi",
  },
  "RCDI-170": {
    uzLatn:
      "Otlarni faqat bosh shaklda emas, turli kelishik shakllarida ishlatadi",
    en: "Uses nouns in different grammatical cases, not only the basic form",
    kaaLatn:
      "Atlıqlardı tek bas túrinde emes, túrli seplik túrlerinde qollanadı",
  },
  "RCDI-171": {
    uzLatn: "Fe’llarni o‘tgan zamonda ishlatadi, masalan «Koptok tushdi»",
    en: "Uses verbs in the past tense, for example “The ball fell”",
    kaaLatn: "Feyillerdi ótken máhálde qollanadı, mısalı «Top tústi»",
  },
  "RCDI-172": {
    uzLatn: "Fe’llarni kelasi zamonda ishlatadi, masalan «chizaman»",
    en: "Uses verbs in the future tense, for example “I will draw”",
    kaaLatn: "Feyillerdi keler máhálde qollanadı, mısalı «sızaman»",
  },
  "RCDI-173": {
    uzLatn: "Ikki gapni «va», «esa» bog‘lovchilari bilan birlashtiradi",
    en: "Joins two sentences with conjunctions such as “and” or “while”",
    kaaLatn: "Eki gápti «hám», «al» dánekerleri menen birlestiredi",
  },
  "RCDI-174": {
    uzLatn:
      "«Ko‘proq», «kamroq», «og‘riqliroq» kabi qiyosiy sifat yoki ravishlarni ishlatadi",
    en: "Uses comparative adjectives or adverbs such as “more,” “less,” or “more painful”",
    kaaLatn:
      "«Kóbirek», «azıraq», «awırıwlıraq» sıyaqlı salıstırmalı sıpat yamasa ráwishlerdi qollanadı",
  },
  "RCDI-175": {
    uzLatn:
      "Sifatlarning qiyosiy darajasini to‘g‘ri tuzadi, masalan «yaxshi - yaxshiroq», «yomon - yomonroq»",
    en: "Forms comparative adjectives correctly, such as “good-better” and “bad-worse”",
    kaaLatn:
      "Sıpatlardıń salıstırmalı dárejesin durıs jasaydı, mısalı «jaqsı-jaqsıraq», «jaman-jamanıraq»",
  },
  "RCDI-176": {
    uzLatn:
      "«Balki», «ehtimol», «albatta» kabi ishonch darajasini bildiradigan so‘zlarni ishlatadi",
    en: "Uses words expressing certainty, such as “maybe,” “probably,” or “certainly”",
    kaaLatn:
      "«Bálkim», «itimal», «álbette» sıyaqlı isenim dárejesin bildiretuǵın sózlerdi qollanadı",
  },
  "RCDI-177": {
    uzLatn: "Buyum yoqmasa uni «yomon» yoki shunga o‘xshash so‘z bilan ataydi",
    en: "Calls an object “bad” or something similar when they dislike it",
    kaaLatn: "Zat jaqpasa onı «jaman» yamasa soǵan uqsas sóz benen ataydı",
  },
  "RCDI-178": {
    uzLatn: "So‘zlarning ma’nosini so‘raydi",
    en: "Asks what words mean",
    kaaLatn: "Sózlerdiń mánisin soraydı",
  },
  "RCDI-179": {
    uzLatn: "O‘z ismiga javob berib, o‘girilib qaraydi",
    en: "Responds to their name by turning and looking",
    kaaLatn: "Óz atına juwap berip, burılıp qaraydı",
  },
  "RCDI-180": {
    uzLatn:
      "«Nega?» bilan boshlanadigan savollarga yaxshi tushuntirish bilan javob beradi",
    en: "Answers “why” questions with good explanations",
    kaaLatn:
      "«Nege?» menen baslanatuǵın sorawlarǵa jaqsı túsindiriw menen juwap beredi",
  },
  "RCDI-181": {
    uzLatn:
      "So‘ralganda burun, og‘iz, qo‘l yoki oyoq kabi kamida uchta tana qismini ko‘rsatadi",
    en: "Points to at least three body parts when asked",
    kaaLatn:
      "Soralsa murın, awız, qol yamasa ayaq sıyaqlı keminde úsh dene bólimin kórsetedi",
  },
  "RCDI-182": {
    uzLatn:
      "«Ustiga» va «ustidan» ma’nolarini tushunib, shu so‘zli ko‘rsatmalarni bajaradi",
    en: "Understands “on” and “off/from” and follows directions using them",
    kaaLatn:
      "«Ústine» hám «ústinen» mánilerin túsinip, sol sózli kórsetpelerdi orınlaydı",
  },
  "RCDI-183": {
    uzLatn: "«Yuqoriga» va «pastga» so‘zlarining ma’nosini tushunadi",
    en: "Understands “up” and “down”",
    kaaLatn: "«Joqarıǵa» hám «tómenge» sózleriniń mánisin túsinedi",
  },
  "RCDI-184": {
    uzLatn:
      "O‘zini va boshqa bolalarni «o‘g‘il bola» yoki «qiz bola» deb to‘g‘ri ataydi",
    en: "Correctly identifies themselves and other children as boys or girls",
    kaaLatn:
      "Ózin hám basqa balalardı «ul bala» yamasa «qız bala» dep durıs ataydı",
  },
  "RCDI-185": {
    uzLatn:
      "«Bir xil» va «boshqa» ma’nolarini bilib, ikki buyumning o‘xshash va farqli tomonlarini aytadi",
    en: "Understands “same” and “different” and explains similarities and differences",
    kaaLatn:
      "«Birdey» hám «basqa» mánilerin bilip, eki zattıń uqsas hám parıqlı táreplerin aytadı",
  },
  "RCDI-186": {
    uzLatn:
      "«Bu nima?» deb so‘ralganda buyumni tasvirlaydi yoki undan qanday foydalanilishini aytadi",
    en: "When asked “What is it?”, describes the object or says what it is used for",
    kaaLatn:
      "«Bul ne?» dep soralǵanda zattı súwretleydi yamasa onnan qalay paydalanıwdı aytadı",
  },
  "RCDI-187": {
    uzLatn: "Nomiga ko‘ra kamida to‘rtta rangni to‘g‘ri aniqlaydi",
    en: "Correctly identifies at least four named colors",
    kaaLatn: "Atı boyınsha keminde tórt reńdi durıs anıqlaydı",
  },
  "RCDI-188": {
    uzLatn:
      "«Pechenye, qalpoq yoki piyola bilan nima qilinadi?» kabi savollarga javob beradi",
    en: "Answers questions such as “What do you do with a biscuit, hat, or cup?”",
    kaaLatn:
      "«Pechenye, qalpaq yamasa kese menen ne etiledi?» sıyaqlı sorawlarǵa juwap beredi",
  },
  "RCDI-189": {
    uzLatn: "«Agar ..., unda ...?» turidagi savollarga javob beradi",
    en: "Answers “If ..., then what?” questions",
    kaaLatn: "«Eger ..., onda ...?» túrindegi sorawlarǵa juwap beredi",
  },
  "RCDI-190": {
    uzLatn:
      "«Xonangga bor va menga ... olib kel» kabi ikki qismli ko‘rsatmalarni bajaradi",
    en: "Follows two-part directions such as “Go to your room and bring me ...”",
    kaaLatn:
      "«Bólmeńe bar hám maǵan ... alıp kel» sıyaqlı eki bólimli kórsetpelerdi orınlaydı",
  },
  "RCDI-191": {
    uzLatn: "«Bu nima?» deb so‘ralganda buyum tegishli bo‘lgan guruhni aytadi",
    en: "When asked “What is it?”, names the category the object belongs to",
    kaaLatn: "«Bul ne?» dep soralǵanda zat tiyisli bolǵan topar atın aytadı",
  },
  "RCDI-192": {
    uzLatn: "Oddiy ko‘rsatmalarni bajaradi",
    en: "Follows simple directions",
    kaaLatn: "Ápiwayı kórsetpelerdi orınlaydı",
  },
  "RCDI-193": {
    uzLatn: "«Isming nima?» deb so‘ralganda o‘z ismini aytadi",
    en: "States their name when asked “What is your name?”",
    kaaLatn: "«Atıń ne?» dep soralǵanda óz atın aytadı",
  },
  "RCDI-194": {
    uzLatn: "Palto yoki stul kabi ayrim buyumlar nimadan yasalganini aytadi",
    en: "Says what some things, such as a coat or chair, are made of",
    kaaLatn: "Palto yamasa stul sıyaqlı ayırım zatlar neden jasalǵanın aytadı",
  },
  "RCDI-195": {
    uzLatn:
      "«Och» va «yop» so‘zlarining ma’nosini tushunib, shu ko‘rsatmalarni bajaradi",
    en: "Understands “open” and “close” and follows directions using them",
    kaaLatn:
      "«Ash» hám «jap» sózleriniń mánisin túsinip, sol kórsetpelerdi orınlaydı",
  },
  "RCDI-196": {
    uzLatn:
      "«Och qolsang, chanqasang yoki charchasang nima qilasan?» kabi savollarga javob beradi",
    en: "Answers questions such as what to do when hungry, thirsty, or tired",
    kaaLatn:
      "«Ash qalǵanda, suwsaǵanda yamasa sharshaǵanda ne eteseń?» sıyaqlı sorawlarǵa juwap beredi",
  },
  "RCDI-197": {
    uzLatn: "Chaqirilganda odatda keladi",
    en: "Usually comes when called",
    kaaLatn: "Shaqırılǵanda ádette keledi",
  },
  "RCDI-198": {
    uzLatn: "«Tez» va «sekin» so‘zlarini to‘g‘ri ishlatadi",
    en: "Uses “fast” and “slow” correctly",
    kaaLatn: "«Tez» hám «áste» sózlerin durıs qollanadı",
  },
  "RCDI-199": {
    uzLatn: "Yashaydigan shahar yoki qishlog‘ining nomini aytadi",
    en: "Says where they live by naming the city or village",
    kaaLatn: "Jasaytuǵın qalası yamasa awılınıń atın aytadı",
  },
  "RCDI-200": {
    uzLatn: "So‘rasangiz sizga o‘yinchoqni beradi",
    en: "Gives you a toy when asked",
    kaaLatn: "Sorasańız sizge oyınshıqtı beredi",
  },
  "RCDI-201": {
    uzLatn:
      "«To‘la» va «bo‘sh» ma’nolarini tushunib, bu so‘zlarni to‘g‘ri ishlatadi",
    en: "Understands and correctly uses “full” and “empty”",
    kaaLatn: "«Tolı» hám «bos» mánilerin túsinip, bul sózlerdi durıs qollanadı",
  },
  "RCDI-202": {
    uzLatn:
      "Buyum joylashuvini bildiradigan «ichida», «ustida», «ostida», «yonida» kabi kamida uchta so‘zni tushunadi",
    en: "Understands at least three position words such as “in,” “on,” “under,” and “beside”",
    kaaLatn:
      "Zattıń ornın bildiretuǵın «ishinde», «ústinde», «astında», «janında» sıyaqlı keminde úsh sózdi túsinedi",
  },
  "RCDI-203": {
    uzLatn: "Biror narsa og‘ir tuyulganda buni aytadi",
    en: "Says when something feels heavy",
    kaaLatn: "Bir zat awır sezilgende bunı aytadı",
  },
  "RCDI-204": {
    uzLatn: "So‘ralganda o‘z ismi va familiyasini aytadi",
    en: "States their first and last name when asked",
    kaaLatn: "Soralsa óz atı hám familiyasın aytadı",
  },
  "RCDI-205": {
    uzLatn:
      "O‘zi va boshqa bolalar haqida «yaxshi» va «yomon» so‘zlarini ishlatadi",
    en: "Uses “good” and “bad” when talking about self and other children",
    kaaLatn:
      "Ózi hám basqa balalar haqqında «jaqsı» hám «jaman» sózlerin qollanadı",
  },
  "RCDI-206": {
    uzLatn: "«Necha yoshdasan?» deb so‘ralganda yoshini to‘g‘ri aytadi",
    en: "States their age correctly when asked",
    kaaLatn: "«Neshe jastasań?» dep soralǵanda jasın durıs aytadı",
  },
  "RCDI-207": {
    uzLatn:
      "Buyum joylashuvini bildiradigan «ichida», «ustida», «ostida», «yonida», «yuqorida», «pastda» kabi kamida oltita so‘zni tushunadi",
    en: "Understands at least six position words such as “in,” “on,” “under,” “beside,” “above,” and “below”",
    kaaLatn:
      "Zattıń ornın bildiretuǵın «ishinde», «ústinde», «astında», «janında», «joqarıda», «tómende» sıyaqlı keminde altı sózdi túsinedi",
  },
  "RCDI-208": {
    uzLatn: "Uchta oddiy ko‘rsatma ketma-ketligini to‘g‘ri tartibda bajaradi",
    en: "Carries out a sequence of three simple directions in the correct order",
    kaaLatn: "Úsh ápiwayı kórsetpe izbe-izligin durıs tártipte orınlaydı",
  },
  "RCDI-209": {
    uzLatn:
      "«Oson» va «qiyin» ma’nolarini tushunib, ikkala so‘zni to‘g‘ri ishlatadi",
    en: "Understands and correctly uses “easy” and “difficult”",
    kaaLatn:
      "«Ańsat» hám «qıyın» mánilerin túsinip, eki sózdi de durıs qollanadı",
  },
  "RCDI-210": {
    uzLatn:
      "«Yo‘q!» va «Mumkin emas!»ni tushunib, taqiqlangan ishni hech bo‘lmasa qisqa vaqt to‘xtatadi",
    en: "Understands “No!” and stops the forbidden action at least briefly",
    kaaLatn:
      "«Joq!» hám «Bolmaydı!»nı túsinip, qadaǵan etilgen isti hesh bolmasa qısqa waqıt toqtatadı",
  },
  "RCDI-211": {
    uzLatn: "Kelajakda nima bo‘lishi kerakligi haqida gapiradi",
    en: "Talks about the future and what is expected to happen",
    kaaLatn: "Keleshekte ne bolıwı kerekligi haqqında sóyleydi",
  },
  "RCDI-212": {
    uzLatn: "Nomiga ko‘ra kamida bitta rangni to‘g‘ri aniqlaydi",
    en: "Correctly identifies at least one named color",
    kaaLatn: "Atı boyınsha keminde bir reńdi durıs anıqlaydı",
  },
  "RCDI-213": {
    uzLatn: "So‘ralganda ikki buyumdan kattasini ko‘rsatadi yoki aytadi",
    en: "Points to or names the larger of two objects when asked",
    kaaLatn: "Soralsa eki zattan úlkenin kórsetedi yamasa aytadı",
  },
  "RCDI-214": {
    uzLatn: "Uch yoki undan ortiq buyumni sanay oladi",
    en: "Can count three or more objects",
    kaaLatn: "Úsh yamasa odan artıq zattı sanay aladı",
  },
  "RCDI-215": {
    uzLatn:
      "«Bitta» ma’nosini tushunib, «bitta» so‘ralganda aynan bitta buyum beradi",
    en: "Understands “one” and gives exactly one object when asked",
    kaaLatn: "«Bir» mánisin túsinip, «bir» soralǵanda dál bir zattı beredi",
  },
  "RCDI-216": {
    uzLatn:
      "«Hammasi» ma’nosini tushunib, barcha qalamlar so‘ralganda ularning hammasini beradi",
    en: "Understands “all” and gives all the pencils when asked",
    kaaLatn:
      "«Hámmesi» mánisin túsinip, barlıq qálemler soralǵanda olardıń hámmesin beredi",
  },
};

export function getSeededQuestionTranslations(
  questionId: string,
  russianText: string,
): QuestionnaireTranslations | undefined {
  const seed = assessmentQuestionTranslationSeeds[questionId];

  if (!seed) {
    return undefined;
  }

  return {
    uzLatn: seed.uzLatn,
    uzCyrl: toUzbekCyrillic(seed.uzLatn),
    ru: russianText,
    en: seed.en,
    kaaLatn: seed.kaaLatn,
  };
}
