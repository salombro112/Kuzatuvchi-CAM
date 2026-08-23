/* =========================================================================
   KUZATUV CAM — Mahsulotlar ma'lumotlar bazasi (avtomatik yaratilgan)

   Bu fayl TP-Link va Ezviz narxlar ro'yxati (Excel) fayllaridan avtomatik
   ko'chirilgan barcha mahsulotlarni o'z ichiga oladi: nomi, narxi (USD),
   tavsifi va rasmi (images/ papkasidagi fayl).

   YANGI MAHSULOT QO'SHISH: buni qo'lda tahrirlashning hojati yo'q — saytga
   ADMIN sifatida kirib, "+ Mahsulot qo'shish" tugmasi orqali qo'shing,
   tahrirlang yoki o'chiring. Bu yerdagi ro'yxat — faqat BOSHLANG'ICH
   ma'lumotlar to'plami (birinchi marta ishga tushganda yuklanadi).

   NARX: barcha narxlar USD (u.e.) da, chunki manba prayс-list shunday edi.
   So'mga aylantirish kursi app.js dagi CONFIG.USD_TO_SUM da sozlanadi.
   ========================================================================= */

const CATEGORIES = [
  { slug: "vigi-camera",  label: "VIGI kameralar",   icon: "📷" },
  { slug: "vigi-nvr",     label: "VIGI NVR",          icon: "🖥️" },
  { slug: "wifi-router",  label: "Wi-Fi Router",      icon: "📶" },
  { slug: "mesh",         label: "Mesh System",       icon: "🕸️" },
  { slug: "access-point", label: "Access Point",      icon: "📡" },
  { slug: "poe-switch",   label: "PoE kommutator",    icon: "🔀" },
  { slug: "mercusys",     label: "Mercusys",          icon: "🔷" },
  { slug: "ezviz",        label: "Ezviz kameralar",   icon: "🎥" },
];

const PRODUCTS_DATA = [
  {
    "id": "vigi-camera-001",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "VIGI C320I(2.8mm)",
    "price": 20.0,
    "desc": "2MP tashqi silindrsimon IP-kamera Texnik xususiyatlari: H.265+/H.265/H.264+/H.264, 1/3\" progressiv skanerlashli CMOS-matritsa, Color/0.1 Lux@F2.0, 0 Lux with IR, 25fps/30fps (1920x1080,1280x960, 1280x720), PoE, 2.8 mm qat'iy ob'ektiv. Xususiyatlari: Smart Detection (odam/avtomobilni aniqlash),harakat datchigi, zonaga bostirib kirishni aniqlash, chiziqdan o'tishni aniqlash, kameraga ta'sirni aniqlash, tashlab ketilgan buyumlarni aniqlash, obyekt yo'qolishini aniqlash, zonaga kirishni aniqlash, zonadan chiqishni aniqlash, avtomobilni aniqlash , odamni aniqlash), SmartVid (Smart IR, DWDR, 3D DNR, BLC), IR tungi ko'rish (30 m gacha), IP67, ONVIF, masofadan kuzatish, VIGI App mobil ilovasi, VIGI Security Manager ilovasi, o'rnatilgan mikrofon,",
    "image": "images/vigi-kameralar-vigi-c320i28mm-1.jpeg"
  },
  {
    "id": "vigi-camera-002",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "VIGI C330l(2.8mm)(UN)",
    "price": 24.0,
    "desc": "3MP tashqi silindrsimon IP-kamera Texnik xususiyatlari: H.265+/H.265/H.264+/H.264, 1/2.8\" progressiv skanerlashli CMOS-matritsa, Color/0.1 Lux@F2.0, 0 Lux with IR, 25fps/30fps (2304x1296,2048x1280, 1920x1080,1280x720), PoE/12V doimiy tok, 2.8 mm qat'iy ob'ektiv. Xususiyatlari: Smart Detection (odam/avtomobilni aniqlash),harakat datchigi, zonaga bostirib kirishni aniqlash, chiziqdan o'tishni aniqlash, kameraga ta'sirni aniqlash, tashlab ketilgan buyumlarni aniqlash, obyekt yo'qolishini aniqlash, zonaga kirishni aniqlash, zonadan chiqishni aniqlash, avtomobilni aniqlash , odamni aniqlash), SmartVid (Smart IR, DWDR, 3D DNR, BLC), IR tungi ko'rish (30 m gacha), IP67, ONVIF, masofadan kuzatish, VIGI App mobil ilovasi, Web, VIGI Security Manager ilovasi",
    "image": "images/vigi-kameralar-vigi-c330l28mmun-2.jpeg"
  },
  {
    "id": "vigi-camera-003",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "VIGI C340I(2.8mm)",
    "price": 26.7,
    "desc": "4MP tashqi silindrsimon IP-kamera Texnik xususiyatlari: H.265+/H.265/H.264+/H.264, 1/3\" progressiv skanerlashli CMOS-matritsa, 0.01 Lux@F2.2 da rangli suratga olish, 0 Lux (infraqizil yoritgich bilan), 25fps/30fps (2560x1440,2304x1296,2048x1280, 1920x1080,1280x720), PoE/12V doimiy tok, 2.8 mm qat'iy ob'ektiv, IP67 Xususiyatlari: aqlli aniqlash (odam/avtomobilni aniqlash),harakat datchigi, zonaga bostirib kirishni aniqlash, chiziqdan o'tishni aniqlash, kameraga ta'sirni aniqlash, tashlab ketilgan buyumlarni aniqlash, obyekt yo'qolishini aniqlash, zonaga kirishni aniqlash, zonadan chiqishni aniqlash, avtomobilni aniqlash , odamni aniqlash), SmartVid (Smart IR, DWDR, 3D DNR, BLC), IR-yoritgichli tungi ko'rish (30 m gacha), ONVIF, masofadan kuzatish, VIGI App mobil ilovasi, Web, VIGI Security Manager ilovasi, o'rnatilgan mikrofon,",
    "image": "images/vigi-kameralar-vigi-c340i28mm-3.jpeg"
  },
  {
    "id": "vigi-camera-004",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "VIGI C420I(2.8mm)",
    "price": 20.0,
    "desc": "2MP turelsimon IP-kamera Texnik xususiyatlari: H.265+/H.265/H.264+/H.264, 1/3\" progressiv skanerlashli CMOS-matritsa, Color/0.1 Lux@F2.0, 0 Lux with IR, 25fps/30fps (1920x1080,1280x960, 1280x720), PoE, 2.8 mm qat'iy ob'ektiv. Xususiyatlari: Smart Detection (odam/avtomobilni aniqlash),harakat datchigi, zonaga bostirib kirishni aniqlash, chiziqdan o'tishni aniqlash, kameraga ta'sirni aniqlash, tashlab ketilgan buyumlarni aniqlash, obyekt yo'qolishini aniqlash, zonaga kirishni aniqlash, zonadan chiqishni aniqlash, avtomobilni aniqlash , odamni aniqlash), SmartVid (Smart IR, DWDR, 3D DNR, BLC), IR tungi ko'rish (30 m gacha), ONVIF, masofadan kuzatish, VIGI App mobil ilovasi, VIGI Security Manager ilovasi, o'rnatilgan mikrofon,",
    "image": "images/vigi-kameralar-vigi-c420i28mm-4.png"
  },
  {
    "id": "vigi-camera-005",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "VIGI C440I(2.8mm)",
    "price": 23.0,
    "desc": "4MP turelsimon IP-kamera Texnik xususiyatlari: H.265+/H.265/H.264+/H.264, 1/3\" progressiv skanerlashli CMOS-matritsa, Color/0.1 Lux@F2.0, 0 Lux with IR, 25fps/30fps (2560x1440,2304x1296,2048x1280, 1920x1080,1280x720), PoE/12V doimiy tok, 2.8 mm qat'iy ob'ektiv. Xususiyatlari: Smart Detection (odam/avtomobilni aniqlash),harakat datchigi, zonaga bostirib kirishni aniqlash, chiziqdan o'tishni aniqlash, kameraga ta'sirni aniqlash, tashlab ketilgan buyumlarni aniqlash, obyekt yo'qolishini aniqlash, zonaga kirishni aniqlash, zonadan chiqishni aniqlash, avtomobilni aniqlash , odamni aniqlash), SmartVid (Smart IR, DWDR, 3D DNR, BLC), IR tungi ko'rish (30 m gacha), ONVIF, masofadan kuzatish, VIGI App mobil ilovasi, Web, VIGI Security Manager ilovasi, o'rnatilgan mikrofon,",
    "image": "images/vigi-kameralar-vigi-c440i28mm-5.png"
  },
  {
    "id": "vigi-camera-006",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "VIGI C220I(2.8mm)",
    "price": 22.0,
    "desc": "2MP gumbazsimon IP-kamera Texnik xususiyatlari: H.265+/H.265/H.264+/H.264, 1/3\" progressiv skanerlashli CMOS-matritsa, 0.01 Lux@F2.2 da rangli suratga olish, 0 Lux (infraqizil yoritgich bilan), 25fps/30fps (1920x1080,1280x960, 1280x720), PoE, 2.8 mm qat'iy ob'ektiv, IK10, IP67 Xususiyatlari: aqlli aniqlash (odam/avtomobilni aniqlash),harakat datchigi, zonaga bostirib kirishni aniqlash, chiziqdan o'tishni aniqlash, kameraga ta'sirni aniqlash, tashlab ketilgan buyumlarni aniqlash, obyekt yo'qolishini aniqlash, zonaga kirishni aniqlash, zonadan chiqishni aniqlash, avtomobilni aniqlash , odamni aniqlash), IR-yoritgichli tungi ko'rish (30 m gacha), SmartVid (Smart IR, WDR, 3D DNR, BLC), ONVIF, masofadan kuzatish, VIGI App mobil ilovasi, VIGI Security Manager ilovasi, o'rnatilgan mikrofon,",
    "image": "images/vigi-kameralar-vigi-c220i28mm-6.jpeg"
  },
  {
    "id": "vigi-camera-007",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "VIGI C230I(2.8mm)",
    "price": 25.0,
    "desc": "2MP gumbazsimon IP-kamera Texnik xususiyatlari: H.265+/H.265/H.264+/H.264, 1/3\" progressiv skanerlashli CMOS-matritsa, 0.01 Lux@F2.2 da rangli suratga olish, 0 Lux (infraqizil yoritgich bilan), 25fps/30fps (1920x1080,1280x960, 1280x720), PoE, 2.8 mm qat'iy ob'ektiv, IK10, IP67 Xususiyatlari: aqlli aniqlash (odam/avtomobilni aniqlash),harakat datchigi, zonaga bostirib kirishni aniqlash, chiziqdan o'tishni aniqlash, kameraga ta'sirni aniqlash, tashlab ketilgan buyumlarni aniqlash, obyekt yo'qolishini aniqlash, zonaga kirishni aniqlash, zonadan chiqishni aniqlash, avtomobilni aniqlash , odamni aniqlash), IR-yoritgichli tungi ko'rish (30 m gacha), SmartVid (Smart IR, WDR, 3D DNR, BLC), ONVIF, masofadan kuzatish, VIGI App mobil ilovasi, VIGI Security Manager ilovasi, o'rnatilgan mikrofon,",
    "image": "images/vigi-kameralar-vigi-c230i28mm-7.jpeg"
  },
  {
    "id": "vigi-camera-008",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "VIGI C240I(2.8mm)",
    "price": 28.0,
    "desc": "4MP gumbazsimon IP-kamera Texnik xususiyatlari: H.265+/H.265/H.264+/H.264, 1/3\" progressiv skanerlashli CMOS-matritsa, 0.01 Lux@F2.2 da rangli suratga olish, 0 Lux (infraqizil yoritgich bilan), 25fps/30fps ( 2560x1440,2304x1296, 2048x1280, 1920x1080), PoE/12V doimiy tok, 2.8 mm qat'iy ob'ektiv, IK10, IP67 Xususiyatlari: aqlli aniqlash (odam/avtomobilni aniqlash),harakat datchigi, zonaga bostirib kirishni aniqlash, chiziqdan o'tishni aniqlash, kameraga ta'sirni aniqlash, tashlab ketilgan buyumlarni aniqlash, obyekt yo'qolishini aniqlash, zonaga kirishni aniqlash, zonadan chiqishni aniqlash, avtomobilni aniqlash , odamni aniqlash), IR-yoritgichli tungi ko'rish (30 m gacha), SmartVid (Smart IR, WDR, 3D DNR, BLC), ONVIF, masofadan kuzatish, VIGI App mobil ilovasi, Web, VIGI Security Manager ilovasi, o'rnatilgan mikrofon,",
    "image": "images/vigi-kameralar-vigi-c240i28mm-8.jpeg"
  },
  {
    "id": "vigi-camera-009",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "EasyCam C320(2.8mm)(UN)",
    "price": 26.5,
    "desc": "2Mp tashqi silindrsimon IP-kamera Texnik xususiyatlari: H.265+/H.265/H.264+/H.264, 1/2.9\" progressiv skanerlashli CMOS-matritsa, 0.005 Lux@F1.6 da rangli suratga olish, 0 Lux (IK/oq yoritgich bilan), 25fps/30fps (1920x1080, 1280x720), PoE/12V doimiy tok, 2.8 mm qat'iy ob'ektiv, IP67. Xususiyatlari: Aqlli aniqlash (odam va transport vositalarini tasniflash), harakat datchigi, zonaga bostirib kirishni aniqlash, chiziqdan o'tishni aniqlash, kameraga ta'sirni aniqlash, tashlab ketilgan buyumlarni aniqlash, obyekt yo'qolishini aniqlash, zonaga kirish/chiqishni aniqlash, Full-Color (rangli tungi ko'rish) va IK-yoritgich (30 m gacha), SmartVid (Smart IR, WDR, 3D DNR, BLC), ONVIF, masofadan kuzatish (VIGI App, Web, VIGI Security Manager), o'rnatilgan mikrofon.",
    "image": "images/vigi-kameralar-easycam-c32028mmun-9.jpeg"
  },
  {
    "id": "vigi-camera-010",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "VIGI C330(2.8mm)(UN)",
    "price": 29.5,
    "desc": "3Mp tashqi silindrsimon IP-kamera Texnik xususiyatlari: H.265+/H.265/H.264+/H.264, 1/2.8\" progressiv skanerlashli CMOS-matritsa, 0.005 Lux@F1.6 da rangli suratga olish, 0 Lux (IK/oq yoritgich bilan), 25fps/30fps (2304×1296, 2048×1280, 1920×1080), PoE/12V doimiy tok, 2.8 mm qat'iy ob'ektiv, IP67. Xususiyatlari: Aqlli aniqlash (odam va transport vositalarini tasniflash), harakat datchigi, zonaga bostirib kirishni aniqlash, chiziqdan o'tishni aniqlash, kameraga ta'sirni aniqlash, tashlab ketilgan buyumlarni aniqlash, obyekt yo'qolishini aniqlash, zonaga kirish/chiqishni aniqlash, Full-Color (to'liq rangli tungi ko'rish) va IK-yoritgich (30 m gacha), SmartVid (Smart IR, WDR, 3D DNR, BLC), ONVIF, masofadan kuzatish (VIGI App, Web, VIGI Security Manager), o'rnatilgan mikrofon.",
    "image": "images/vigi-kameralar-vigi-c33028mmun-10.jpeg"
  },
  {
    "id": "vigi-camera-011",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "VIGI C340(2.8mm)",
    "price": 32.5,
    "desc": "4MP tashqi to'liq rangli silindrsimon IP-kamera Texnik xususiyatlari: H.265+/H.265/H.264+/H.264, 1/3\" progressiv skanerlashli CMOS-matritsa, Color/0.04 Lux@F1.6, 0 Lux (IR/oq yoritgich bilan), 25fps/30fps ( 2560x1440,2304x1296, 2048x1280, 1920x1080), PoE/12V doimiy tok, 2.8 mm qat'iy ob'ektiv, o'rnatilgan mikrofon va dinamik, Micro SD xotira kartasi uyasi. Xususiyatlari: Full-Color va IR tungi ko'rish (30 m gacha), Active Defense, ikki tomonlama audio, lokal yozuv, Smart Detection (harakat datchigi (odamni aniqlash), kameraga ta'sirni aniqlash, chiziqlardan o'tish, zonaga bostirib kirish), SmartVid (Smart IR, DWDR, 3D DNR, BLC),IP66, ONVIF, masofadan kuzatish, VIGI App mobil ilovasi",
    "image": "images/vigi-kameralar-vigi-c34028mm-11.jpeg"
  },
  {
    "id": "vigi-camera-012",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "EasyCam C420(2.8mm)(UN)",
    "price": 27.0,
    "desc": "2Mp gumbazsimon IP-kamera Texnik xususiyatlari: H.265+/H.265/H.264+/H.264, 1/3\" progressiv skanerlashli CMOS-matritsa, 0.005 Lux@F1.6 da rangli suratga olish, 0 Lux (IK/oq yoritgich bilan), 25fps/30fps (1920x1080, 1280x720), PoE/12V doimiy tok, 2.8 mm qat'iy ob'ektiv, IP67. Xususiyatlari: Aqlli aniqlash (odam va transport vositalarini tasniflash), harakat datchigi, zonaga bostirib kirishni aniqlash, chiziqdan o'tishni aniqlash, kameraga ta'sirni aniqlash, tashlab ketilgan buyumlarni aniqlash, obyekt yo'qolishini aniqlash, zonaga kirish/chiqishni aniqlash, Full-Color (to'liq rangli tungi ko'rish) va IK-yoritgich (30 m gacha), SmartVid (Smart IR, WDR, 3D DNR, BLC), ONVIF, masofadan kuzatish (VIGI App, Web, VIGI Security Manager), o'rnatilgan mikrofon.",
    "image": "images/vigi-kameralar-easycam-c42028mmun-12.jpeg"
  },
  {
    "id": "vigi-camera-013",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "VIGI C430(2.8mm)",
    "price": 30.5,
    "desc": "3MP to'liq rangli turelsimon IP-kamera Texnik xususiyatlari: H.265+/H.265/H.264+/H.264, 1/2.8\" progressiv skanerlashli CMOS-matritsa, Color/0.04 Lux@F1.6, 0 Lux (IR/oq yoritgich bilan), 25fps/30fps (2304x1296,2048x1280, 1920x1080,1280x720), PoE/12V doimiy tok, 2.8 mm qat'iy ob'ektiv, o'rnatilgan mikrofon va dinamik, Micro SD xotira kartasi uyasi. Xususiyatlari: Full-Color/IR tungi ko'rish (30 m gacha), Active Defense, ikki tomonlama audio, lokal yozuv, Smart Detection (harakat datchigi (odamni aniqlash), kameraga ta'sirni aniqlash, chiziqlardan o'tish, zonaga bostirib kirish), SmartVid (Smart IR, WDR, 3D DNR, BLC), ONVIF, masofadan kuzatish, VIGI App mobil ilovasi",
    "image": "images/vigi-kameralar-vigi-c43028mm-13.jpeg"
  },
  {
    "id": "vigi-camera-014",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "VIGI C440(2.8mm)",
    "price": 32.5,
    "desc": "4MP to'liq rangli turelsimon IP-kamera Texnik xususiyatlari: H.265+/H.265/H.264+/H.264, 1/3\" progressiv skanerlashli CMOS-matritsa, Color/0.04 Lux@F1.6, 0 Lux (IR/oq yoritgich bilan), 25fps/30fps ( 2560x1440,2304x1296, 2048x1280, 1920x1080),  PoE/12V doimiy tok, 2.8 mm qat'iy ob'ektiv, o'rnatilgan mikrofon va dinamik, Micro SD xotira kartasi uyasi. Xususiyatlari: Full-Color/IR tungi ko'rish (30 m gacha), Active Defense, ikki tomonlama audio, lokal yozuv, Smart Detection (harakat datchigi (odamni aniqlash), kameraga ta'sirni aniqlash, chiziqlardan o'tish, zonaga bostirib kirish), SmartVid (Smart IR, WDR, 3D DNR, BLC), ONVIF, masofadan kuzatish, VIGI App mobil ilovasi",
    "image": "images/vigi-kameralar-vigi-c44028mm-14.jpeg"
  },
  {
    "id": "vigi-camera-015",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "VIGI C440-W(4mm)(UN)",
    "price": 35.0,
    "desc": "4Mp gumbazsimon Wi-Fi IP-kamera Texnik xususiyatlari: H.265+/H.265/H.264+/H.264, 1/3\" progressiv skanerlashli CMOS-matritsa, 0.005 Lux@F1.6 da rangli suratga olish, 0 Lux (IK/oq yoritgich bilan), 25fps/30fps (2560x1440, 2304x1296, 1920x1080), Wi-Fi (IEEE 802.11b/g/n) / Ethernet (RJ45), 12V doimiy tok, 4.0 mm qat'iy ob'ektiv, IP67. Xususiyatlari: Aqlli aniqlash (odam va transport vositalarini tasniflash), harakat datchigi, zonaga bostirib kirishni aniqlash, chiziqdan o'tishni aniqlash, kameraga ta'sirni aniqlash, tashlab ketilgan buyumlarni aniqlash, obyekt yo'qolishini aniqlash, zonaga kirish/chiqishni aniqlash, Full-Color (to'liq rangli tungi ko'rish) va IK-yoritgich (30 m gacha), SmartVid (Smart IR, WDR, 3D DNR, BLC), ONVIF, masofadan kuzatish (VIGI App, Web, VIGI Security Manager), o'rnatilgan mikrofon va dinamik (ikki tomonlama audio aloqa), MicroSD karta uyasi (256 GB gacha).",
    "image": "images/vigi-kameralar-vigi-c440-w4mmun-15.jpeg"
  },
  {
    "id": "vigi-camera-016",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "VIGI C450(2.8mm)",
    "price": 35.0,
    "desc": "5MP to'liq rangli turelsimon IP-kamera Texnik xususiyatlari: H.265+/H.265/H.264+/H.264, 1/2.7\" progressiv skanerlashli CMOS-matritsa, 0.005 Lux@F1.6 da rangli suratga olish, 0 Lux (infraqizil/oq yoritgich bilan), 25fps/30fps ( 2880x1620, 2048x1280, 1920x1080,1280x720), to'liq WDR, PoE/12V doimiy tok, 2.8 mm qat'iy ob'ektiv, o'rnatilgan mikrofon, dinamik, Micro SD xotira kartasi uyasi. Xususiyatlari: to'liq ranglilik va IR-yoritgichli tungi ko'rish (30 m gacha), faol himoya, ikki tomonlama audio, lokal yozuv,aqlli aniqlash (odam/avtomobilni aniqlash),harakat datchigi, zonaga bostirib kirishni aniqlash, chiziqdan o'tishni aniqlash, kameraga ta'sirni aniqlash, tashlab ketilgan buyumlarni aniqlash, obyekt yo'qolishini aniqlash, zonaga kirishni aniqlash, zonadan chiqishni aniqlash, avtomobilni aniqlash , odamni aniqlash), SmartVid (Smart IR, 3D DNR, BLC), yo'lak rejimi, ONVIF, masofadan kuzatish, VIGI App mobil ilovasi, Web, VIGI Security Manager ilovasi",
    "image": "images/vigi-kameralar-vigi-c45028mm-16.jpeg"
  },
  {
    "id": "vigi-camera-017",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "VIGI C230(2.8mm)",
    "price": 30.0,
    "desc": "3MP to'liq rangli gumbazsimon IP-kamera Texnik xususiyatlari: H.265+/H.265/H.264+/H.264, 1/2.8\" progressiv skanerlashli CMOS-matritsa, 0.005 Lux@F1.6 da rangli suratga olish, 0 Lux (infraqizil/oq yoritgich bilan), 25fps/30fps (2304x1296,2048x1280, 1920x1080,1280x720), PoE/12V doimiy tok, 2.8 mm qat'iy ob'ektiv, o'rnatilgan mikrofon, IK10, IP67 Xususiyatlari: to'liq ranglilik va IR-yoritgichli tungi ko'rish (30 m gacha), aqlli aniqlash (odam/avtomobilni aniqlash),harakat datchigi, zonaga bostirib kirishni aniqlash, chiziqdan o'tishni aniqlash, kameraga ta'sirni aniqlash, tashlab ketilgan buyumlarni aniqlash, obyekt yo'qolishini aniqlash, zonaga kirishni aniqlash, zonadan chiqishni aniqlash, avtomobilni aniqlash , odamni aniqlash), SmartVid (Smart IR, DWDR, 3D DNR, BLC), ONVIF, masofadan kuzatish, VIGI App mobil ilovasi, Web, VIGI Security Manager ilovasi",
    "image": "images/vigi-kameralar-vigi-c23028mm-17.jpeg"
  },
  {
    "id": "vigi-camera-018",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "VIGI C240(2.8mm)",
    "price": 33.5,
    "desc": "4MP to'liq rangli gumbazsimon IP-kamera Texnik xususiyatlari: H.265+/H.265/H.264+/H.264, 1/3\" progressiv skanerlashli CMOS-matritsa, 0.005 Lux@F1.6 da rangli suratga olish, 0 Lux (infraqizil/oq yoritgich bilan), 25fps/30fps ( 2560x1440,2304x1296, 2048x1280, 1920x1080), PoE/12V doimiy tok, 2.8 mm qat'iy ob'ektiv, o'rnatilgan mikrofon, Micro SD xotira kartasi uyasi, IK10, IP67 Xususiyatlari: to'liq ranglilik va IR-yoritgichli tungi ko'rish (30 m gacha), aqlli aniqlash (odam/avtomobilni aniqlash),harakat datchigi, zonaga bostirib kirishni aniqlash, chiziqdan o'tishni aniqlash, kameraga ta'sirni aniqlash, tashlab ketilgan buyumlarni aniqlash, obyekt yo'qolishini aniqlash, zonaga kirishni aniqlash, zonadan chiqishni aniqlash, avtomobilni aniqlash , odamni aniqlash), SmartVid (Smart IR, DWDR, 3D DNR, BLC), ONVIF, masofadan kuzatish, VIGI App mobil ilovasi, Web, VIGI Security Manager ilovasi",
    "image": "images/vigi-kameralar-vigi-c24028mm-18.jpeg"
  },
  {
    "id": "vigi-camera-019",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "InSight S325(2,8mm)",
    "price": 36.0,
    "desc": "Texnik xususiyatlari: 2MP, 2.8 mm qat'iy ob'ektiv, 1/3” progressiv skanerlashli CMOS-matritsa, H.265+/H.265/H.264+/H.264, IR va oq yoritgich, 25fps/30fps (1920 × 1080), IP67, PoE / 12V doimiy tok bilan quvvatlanish, WDR, o'rnatilgan mikrofon, Micro SD xotira kartasi uyasi (512 GB gacha). Xususiyatlari: Full-Color va IR-yoritgichli tungi ko'rish (30 m gacha), aqlli aniqlash (odam/avtomobilni aniqlash), SmartVid (Smart IR, 3D DNR, BLC/WLC), ONVIF (Profile S/T), masofadan kuzatish, VIGI App mobil ilovasi, Web, Tarmoq video registratori GUI, VMS\"",
    "image": "images/vigi-kameralar-insight-s32528mm-19.jpeg"
  },
  {
    "id": "vigi-camera-020",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "InSight S345S(4mm)",
    "price": 112.0,
    "desc": "Texnik xususiyatlari: 4MP, 4.0 mm qat'iy ob'ektiv, 1/1.79” progressiv skanerlashli CMOS-matritsa (Ultra Low-Light), H.265+/H.265/H.264+/H.264, IR va oq yoritgich, 25fps/30fps (2688 × 1520), IP67, PoE / 12V doimiy tok bilan quvvatlanish, 120dB True WDR, o'rnatilgan mikrofon va dinamik (ikki tomonlama audio aloqa), signal kirish/chiqish (Alarm In/Out), Micro SD xotira kartasi uyasi (512 GB gacha). Xususiyatlari: ColorPro 2.0 (yorqin yoritishsiz o'ta past yoritishda to'liq rangli tungi ko'rish), tungi yoritgich (30 m gacha), odam va transport aqlli analitikasi (People & Vehicle Analytics), SmartVid (Smart IR, 3D DNR, BLC/HLC), ONVIF (Profile S/T), masofadan kuzatish, VIGI App mobil ilovasi, Web, Tarmoq video registratori GUI, VMS.",
    "image": "images/vigi-kameralar-insight-s345s4mm-20.jpeg"
  },
  {
    "id": "vigi-camera-021",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "InSight S345(2.8mm)",
    "price": 60.0,
    "desc": "VIGI 4MP Full-Color tashqi silindrsimon tarmoq kamerasi Texnik xususiyatlari: 4MP, 2.8 mm qat'iy ob'ektiv, 1/2.7” progressiv skanerlashli CMOS-matritsa, H.265+/H.265/H.264+/H.264, infraqizil/oq yoritgich bilan, 25fps/30fps (2688 × 1520), IP67, PoE / 12V doimiy tok bilan quvvatlanish,120dB WDR, o'rnatilgan mikrofon va dinamik, Micro SD xotira kartasi uyasi (512 GB gacha). Xususiyatlari: Full-Color va IR-yoritgichli tungi ko'rish (30 m gacha), aqlli aniqlash (odam/avtomobilni aniqlash), inson/avtomobil analitikasi, SmartVid (Smart IR, 3D DNR, BLC), ONVIF (Profile S/T/G), masofadan kuzatish, VIGI App mobil ilovasi, Web, Tarmoq video registratori, VMS",
    "image": "images/vigi-kameralar-insight-s34528mm-21.jpeg"
  },
  {
    "id": "vigi-camera-022",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "InSight S355(2.8mm)",
    "price": 63.0,
    "desc": "VIGI 5MP Full-Color tashqi silindrsimon tarmoq kamerasi Texnik xususiyatlari: 5MP, 2.8 mm qat'iy ob'ektiv, 1/2.7” progressiv skanerlashli CMOS-matritsa, H.265+/H.265/H.264+/H.264, infraqizil/oq yoritgich bilan, 25fps (3840 × 2160), IP67, PoE / 12V doimiy tok bilan quvvatlanish,120dB WDR, o'rnatilgan mikrofon va dinamik, Micro SD xotira kartasi uyasi (512 GB gacha). Xususiyatlari: Full-Color va IR-yoritgichli tungi ko'rish (30 m gacha), aqlli aniqlash (odam/avtomobilni aniqlash), inson/avtomobil analitikasi, SmartVid (Smart IR, 3D DNR, BLC), ONMF (Profile S/T/G), masofadan kuzatish, VIGI App mobil ilovasi, Web, Tarmoq video registratori, VMS",
    "image": "images/vigi-kameralar-insight-s35528mm-22.jpeg"
  },
  {
    "id": "vigi-camera-023",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "InSight S385(2.8mm)",
    "price": 72.0,
    "desc": "VIGI 8MP Full-Color tashqi silindrsimon tarmoq kamerasi Texnik xususiyatlari: 8MP, 2.8 mm qat'iy ob'ektiv, 1/2.7” progressiv skanerlashli CMOS-matritsa, H.265+/H.265/H.264+/H.264, infraqizil/oq yoritgich bilan, 25fps (3840 × 2160), IP67, PoE / 12V doimiy tok bilan quvvatlanish,120dB WDR, o'rnatilgan mikrofon va dinamik, Micro SD xotira kartasi uyasi (512 GB gacha). Xususiyatlari: Full-Color va IR-yoritgichli tungi ko'rish (30 m gacha), aqlli aniqlash (odam/avtomobilni aniqlash), inson/avtomobil analitikasi, SmartVid (Smart IR, 3D DNR, BLC), ONMF (Profile S/T/G), masofadan kuzatish, VIGI App mobil ilovasi, Web, Tarmoq video registratori, VMS",
    "image": "images/vigi-kameralar-insight-s38528mm-23.jpeg"
  },
  {
    "id": "vigi-camera-024",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "InSight S425(2.8mm)(UN)",
    "price": 40.0,
    "desc": "4Mp gumbazsimon IP-kamera Texnik xususiyatlari: H.265+/H.265/H.264+/H.264, 1/3\" progressiv skanerlashli CMOS-matritsa, 0.005 Lux@F1.6 da rangli suratga olish, 0 Lux (IK/oq yoritgich bilan), 25fps/30fps (2560x1440, 2304x1296, 1920x1080), PoE/12V doimiy tok, 2.8 mm qat'iy ob'ektiv, IP67, IK10 (vandalizmga qarshi). Xususiyatlari: Aqlli aniqlash (odam va transport vositalarini tasniflash), harakat datchigi, zonaga bostirib kirishni aniqlash, chiziqdan o'tishni aniqlash, kameraga ta'sirni aniqlash, tashlab ketilgan buyumlarni aniqlash, obyekt yo'qolishini aniqlash, zonaga kirish/chiqishni aniqlash, Full-Color (rangli tungi ko'rish) va IK-yoritgich (30 m gacha), SmartVid (Smart IR, WDR 120dB, 3D DNR, BLC), ONVIF, masofadan kuzatish (VIGI App, Web, VIGI Security Manager), o'rnatilgan mikrofon, MicroSD karta uyasi (256 GB gacha).",
    "image": null
  },
  {
    "id": "vigi-camera-025",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "InSight S225(2.8mm)",
    "price": 40.0,
    "desc": "VIGI 2MP Full-Color gumbazsimon tarmoq kamerasi Texnik xususiyatlari: 2MP, 2.8 mm qat'iy ob'ektiv, 1/3” progressiv skanerlashli CMOS-matritsa, H.265+/H.265/H.264+/H.264, IR va oq yoritgich, 25fps/30fps (1920 × 1080), IP67, IK10, PoE / 12V doimiy tok bilan quvvatlanish,120dB WDR, o'rnatilgan mikrofon va dinamik, Micro SD xotira kartasi uyasi (512 GB gacha). Xususiyatlari: Full-Color va IR-yoritgichli tungi ko'rish (30 m gacha), aqlli aniqlash (odam/avtomobilni aniqlash), SmartVid (Smart IR, 3D DNR, BLC), ONVIF (Profile S/T), masofadan kuzatish, VIGI App mobil ilovasi, Web, Tarmoq video registratori GUI, VMS",
    "image": "images/vigi-kameralar-insight-s22528mm-25.jpeg"
  },
  {
    "id": "vigi-camera-026",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "InSight S445(2.8mm)",
    "price": 45.3,
    "desc": "VIGI 4MP Full-Color turelsimon tarmoq kamerasi Texnik xususiyatlari: 4MP, 2.8 mm qat'iy ob'ektiv, 1/2.7” progressiv skanerlashli CMOS-matritsa, H.265+/H.265/H.264+/H.264, infraqizil/oq yoritgich bilan, 25fps/30fps (2688 × 1520), IP67, PoE / 12V doimiy tok bilan quvvatlanish,120dB WDR, o'rnatilgan mikrofon va dinamik, Micro SD xotira kartasi uyasi (512 GB gacha). Xususiyatlari: Full-Color va IR-yoritgichli tungi ko'rish (30 m gacha), aqlli aniqlash (odam/avtomobilni aniqlash),  inson/avtomobil analitikasi, SmartVid (Smart IR, 3D DNR, BLC), ONVIF (Profile S/T/G), masofadan kuzatish, VIGI App mobil ilovasi, Web, Tarmoq video registratori, VMS",
    "image": "images/vigi-kameralar-insight-s44528mm-26.jpeg"
  },
  {
    "id": "vigi-camera-027",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "InSight S445S(2.8mm)(UN)",
    "price": 82.0,
    "desc": "4Mp gumbazsimon IP-kamera (Ultra seriyasi) Texnik xususiyatlari: H.265+/H.265/H.264+/H.264, 1/1.8\" progressiv skanerlashli CMOS-matritsa (kattalashtirilgan sensor), o'ta yuqori sezuvchanlik 0.0005 Lux@F1.0, 0 Lux (IK/oq yoritgich bilan), 25fps/30fps (2688x1520, 2560x1440, 1920x1080), PoE/12V doimiy tok, 2.8 mm qat'iy ob'ektiv, IP67, IK10 (vandalizmga qarshi). Xususiyatlari: Ilg'or aqlli aniqlash (odam va transport vositalarini tasniflash), harakat datchigi, zonaga bostirib kirishni aniqlash, chiziqdan o'tishni aniqlash, kameraga ta'sirni aniqlash, tashlab ketilgan buyumlarni aniqlash, obyekt yo'qolishini aniqlash, zonaga kirish/chiqishni aniqlash, Full-Color (qorong'ulikda to'liq rangli tasvir) va IK-yoritgich (30 m gacha), SmartVid (True WDR 120dB, 3D DNR, BLC, HLC), ONVIF, masofadan kuzatish (VIGI App, Web, VIGI Security Manager), o'rnatilgan mikrofon, MicroSD karta uyasi (256 GB gacha).",
    "image": "images/vigi-kameralar-insight-s445s28mmun-27.jpeg"
  },
  {
    "id": "vigi-camera-028",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "InSight S245(2.8mm)",
    "price": 58.0,
    "desc": "VIGI 4MP Full-Color gumbazsimon tarmoq kamerasi Texnik xususiyatlari: 4MP, 2.8 mm qat'iy ob'ektiv, 1/2.7” progressiv skanerlashli CMOS-matritsa, H.265+/H.265/H.264+/H.264, infraqizil/oq yoritgich bilan, 25fps/30fps (2688 × 1520), IP67, IK10, PoE / 12V doimiy tok bilan quvvatlanish,120dB WDR, o'rnatilgan mikrofon va dinamik, Micro SD xotira kartasi uyasi (512 GB gacha). Xususiyatlari: Full-Color va IR-yoritgichli tungi ko'rish (30 m gacha), aqlli aniqlash (odam/avtomobilni aniqlash), inson/avtomobil analitikasi, SmartVid (Smart IR, 3D DNR, BLC), ONVIF (Profile S/T/G), masofadan kuzatish, VIGI App mobil ilovasi, Web, Tarmoq video registratori, VMS",
    "image": "images/vigi-kameralar-insight-s24528mm-28.jpeg"
  },
  {
    "id": "vigi-camera-029",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "InSight S485(2.8mm)",
    "price": 70.0,
    "desc": "VIGI 8MP Full-Color turelsimon tarmoq kamerasi Texnik xususiyatlari: 8MP, 2.8 mm qat'iy ob'ektiv, 1/2.7” progressiv skanerlashli CMOS-matritsa, H.265+/H.265/H.264+/H.264, infraqizil/oq yoritgich bilan, 25fps/30fps (3840x2160), IP67, PoE / 12V doimiy tok bilan quvvatlanish,120dB WDR, o'rnatilgan mikrofon va dinamik, Micro SD xotira kartasi uyasi (512 GB gacha). Xususiyatlari: Full-Color va IR-yoritgichli tungi ko'rish (30 m gacha), aqlli aniqlash (odam/avtomobilni aniqlash),  inson/avtomobil analitikasi, SmartVid (Smart IR, 3D DNR, BLC), ONVIF (Profile S/T/G), masofadan kuzatish, VIGI App mobil ilovasi, Web, Tarmoq video registratori, VMS",
    "image": "images/vigi-kameralar-insight-s48528mm-29.jpeg"
  },
  {
    "id": "vigi-camera-030",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "InSight S285(2.8mm)",
    "price": 70.0,
    "desc": "VIGI 8MP Full-Color gumbazsimon tarmoq kamerasi Texnik xususiyatlari: 8MP, 2.8 mm qat'iy ob'ektiv, 1/2.7” progressiv skanerlashli CMOS-matritsa, H.265+/H.265/H.264+/H.264, infraqizil/oq yoritgich bilan, 25fps (3840 × 2160), IP67, IK10, PoE / 12V doimiy tok bilan quvvatlanish,120dB WDR, o'rnatilgan mikrofon va dinamik, Micro SD xotira kartasi uyasi (512 GB gacha). Xususiyatlari: Full-Color va IR-yoritgichli tungi ko'rish (30 m gacha), aqlli aniqlash (odam/avtomobilni aniqlash), inson/avtomobil analitikasi, SmartVid (Smart IR, 3D DNR, BLC), ONVIF (Profile S/T/G), masofadan kuzatish, VIGI App mobil ilovasi, Web, Tarmoq video registratori, VMS",
    "image": "images/vigi-kameralar-insight-s28528mm-30.jpeg"
  },
  {
    "id": "vigi-camera-031",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "InSight S245ZI",
    "price": 86.6,
    "desc": "VIGI 4MP IR tashqi motorli varifokal gumbazsimon tarmoq kamerasi Texnik xususiyatlari: 4MP, 2.7 - 13.5 mm (5×) varifokal ob'ektiv, 1/2.9'' progressiv skanerlashli CMOS-matritsa, H.265+/H.265/H.264+/H.264, IR LED, 25fps/30fps (2688 × 1520), IP67, IK10, PoE / 12V doimiy tok bilan quvvatlanish,120dB WDR, o'rnatilgan mikrofon va dinamik, Micro SD xotira kartasi uyasi (512 GB gacha), signal kirish/chiqish, audio kirish/audio chiqish Xususiyatlari: oson o'rnatish va monitoring uchun 5x optik zoom, IR-yoritgichli tungi ko'rish (60 m gacha), aqlli aniqlash (odam/avtomobilni aniqlash), SmartVid (Smart IR, 3D DNR, BLC), ONVIF (Profile S/T/G), masofadan kuzatish, VIGI App mobil ilovasi, Web, Tarmoq video registratori, VIGI VMS",
    "image": "images/vigi-kameralar-insight-s245zi-31.jpeg"
  },
  {
    "id": "vigi-camera-032",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "InSight S445ZI",
    "price": 80.0,
    "desc": "VIGI 4MP IR motorli varifokal turelsimon tarmoq kamerasi Texnik xususiyatlari: 4MP, 2.7 - 13.5 mm (5×) varifokal ob'ektiv, 1/2.9'' progressiv skanerlashli CMOS-matritsa, H.265+/H.265/H.264+/H.264, IR LED, 25fps/30fps (2688x1520), IP67, IK10, PoE / 12V doimiy tok bilan quvvatlanish,120dB WDR, o'rnatilgan mikrofon va dinamik, Micro SD xotira kartasi uyasi (512 GB gacha), signal kirish/chiqish, audio kirish/audio chiqish Xususiyatlari: oson o'rnatish va monitoring uchun 5x optik zoom, IR-yoritgichli tungi ko'rish (60 m gacha), aqlli aniqlash (odam/avtomobilni aniqlash), SmartVid (Smart IR, 3D DNR, BLC), ONVIF (Profile S/T/G), masofadan kuzatish, VIGI App mobil ilovasi, Web, Tarmoq video registratori, VMS",
    "image": "images/vigi-kameralar-insight-s445zi-32.jpeg"
  },
  {
    "id": "vigi-camera-033",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "VIGI C540-4G(4mm)",
    "price": 72.0,
    "desc": "4MP 4G LTE to'liq rangli simsiz aylanuvchi-egiluvchi IP-kamera Texnik xususiyatlari: 4G Cat.4 - 150 / 50 Mbit/s ni qo'llab-quvvatlaydi, LTE-FDD/LTE-TDD/HSPA+/UMTS, H.265+/H.265/H.264+/H.264, 1/3\" progressiv skanerlashli CMOS-matritsa, 0.005 Lux@F1.6 da rangli suratga olish, 0 Lux (infraqizil/oq yoritgich bilan), 25fps/30fps ( 2560x1440,2304x1296, 2048x1280, 1920x1080), 12V doimiy tok, 4 mm qat'iy ob'ektiv, o'rnatilgan mikrofon, dinamik, Micro SD xotira kartasi uyasi, IP66 Xususiyatlari: IR-yoritgichli to'liq rangli tungi ko'rish (30 m gacha), sozlanadigan patrul, avtomatik kuzatish, faol himoya, ikki tomonlama audio, lokal yozuv, aqlli aniqlash (odam/avtomobilni aniqlash),harakatni aniqlash, zonaga bostirib kirishni aniqlash, chiziqdan o'tishni aniqlash, kameraga ta'sirni aniqlash, tashlab ketilgan buyumlarni aniqlash, obyekt yo'qolishini aniqlash, zonaga kirishni aniqlash, zonadan chiqishni aniqlash, avtomobilni aniqlash , odamni aniqlash), SmartVid (Smart IR, WDR, 3D DNR, BLC), ONVIF, masofadan kuzatish, VIGI App mobil ilovasi, VIGI Security Manager ilovasi",
    "image": "images/vigi-kameralar-vigi-c540-4g4mm-33.jpeg"
  },
  {
    "id": "vigi-camera-034",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "VIGI C540V",
    "price": 80.0,
    "desc": "4MP to'liq rangli aylanuvchi-egiluvchi, ikki ob'ektivli va o'zgaruvchan fokus masofali IP-kamera Texnik xususiyatlari: H.265+/H.265/H.264+/H.264, 1/3\" progressiv skanerlashli CMOS-matritsa, 0.005 Lux@F1.6 da rangli suratga olish, 0 Lux (infraqizil/oq yoritgich bilan), 25fps/30fps ( 2560x1440,2304x1296, 2048x1280, 1920x1080),  PoE/12V doimiy tok, 4-12 mm o'zgaruvchan fokusli ob'ektiv, o'rnatilgan mikrofon, dinamik, Micro SD xotira kartasi uyasi, IP66 Xususiyatlari: to'liq ranglilik va IR-yoritgichli tungi ko'rish (30 m gacha), sozlanadigan patrul, avtomatik kuzatish, faol himoya, ikki tomonlama audio, lokal yozuv, aqlli aniqlash (odam/avtomobilni aniqlash),harakat datchigi, zonaga bostirib kirishni aniqlash, chiziqdan o'tishni aniqlash, kameraga ta'sirni aniqlash, tashlab ketilgan buyumlarni aniqlash, obyekt yo'qolishini aniqlash, zonaga kirishni aniqlash, zonadan chiqishni aniqlash, avtomobilni aniqlash , odamni aniqlash), SmartVid (Smart IR, WDR, 3D DNR, BLC), ONVIF, masofadan kuzatish, VIGI App mobil ilovasi, Web, VIGI Security Manager ilovasi",
    "image": "images/vigi-kameralar-vigi-c540v-34.jpeg"
  },
  {
    "id": "vigi-camera-035",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "VIGI C540S(4mm)(UN)",
    "price": 100.0,
    "desc": "4Mp tashqi panoramali IP-kamera (PT / Ultra seriyasi) Texnik xususiyatlari: H.265+/H.265/H.264+/H.264, 1/1.8\" progressiv skanerlashli CMOS-matritsa (kattalashtirilgan sensor), o'ta yuqori sezuvchanlik 0.0005 Lux@F1.0, 0 Lux (IK/oq yoritgich bilan), 25fps/30fps (2688x1520, 2560x1440, 1920x1080), PoE/12V doimiy tok, 4.0 mm qat'iy ob'ektiv, IP66. Xususiyatlari: Pan/Tilt (0–350° panoramalash, 0–120° egilish), aqlli aniqlash (odam va transport vositalarini tasniflash), obyektni avtomatik kuzatish (Auto Tracking), harakat datchigi, zonaga bostirib kirishni aniqlash, chiziqdan o'tishni aniqlash, Full-Color (24/7 to'liq rangli tasvir) va IK-yoritgich (30 m gacha), SmartVid (True WDR 120dB, 3D DNR, BLC, HLC), ONVIF, masofadan kuzatish (VIGI App, Web, VIGI Security Manager), o'rnatilgan mikrofon va dinamik (ikki tomonlama audio aloqa), MicroSD karta uyasi (256 GB gacha).",
    "image": "images/vigi-kameralar-vigi-c540s4mmun-35.jpeg"
  },
  {
    "id": "vigi-camera-036",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "VIGI C540-W(4mm)(UN)",
    "price": 59.0,
    "desc": "4Mp tashqi panoramali Wi-Fi IP-kamera Texnik xususiyatlari: H.265+/H.265/H.264+/H.264, 1/3\" progressiv skanerlashli CMOS-matritsa, 0.005 Lux@F1.6 da rangli suratga olish, 0 Lux (IK/oq yoritgich bilan), 25fps/30fps (2560x1440, 2304x1296, 1920x1080), Wi-Fi (IEEE 802.11b/g/n) / Ethernet (RJ45), 12V doimiy tok, 4.0 mm qat'iy ob'ektiv, IP66. Xususiyatlari: Pan/Tilt (0–350° panoramalash, 0–120° egilish), aqlli aniqlash (odam va transport vositalarini tasniflash), avtomatik kuzatish (Auto Tracking), harakat datchigi, zonaga bostirib kirishni aniqlash, chiziqdan o'tishni aniqlash, kameraga ta'sirni aniqlash, tashlab ketilgan buyumlarni aniqlash, obyekt yo'qolishini aniqlash, zonaga kirish/chiqishni aniqlash, Full-Color (to'liq rangli tungi ko'rish) va IK-yoritgich (30 m gacha), SmartVid (Smart IR, WDR, 3D DNR, BLC), ONVIF, masofadan kuzatish (VIGI App, Web, VIGI Security Manager), o'rnatilgan mikrofon va dinamik (ikki tomonlama audio aloqa), MicroSD karta uyasi (256 GB gacha).",
    "image": "images/vigi-kameralar-vigi-c540-w4mmun-36.jpeg"
  },
  {
    "id": "vigi-camera-037",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "VIGI C540(4mm)(UN)",
    "price": 55.0,
    "desc": "4Mp tashqi panoramali IP-kamera (PT) Texnik xususiyatlari: H.265+/H.265/H.264+/H.264, 1/3\" progressiv skanerlashli CMOS-matritsa, 0.005 Lux@F1.6 da rangli suratga olish, 0 Lux (IK/oq yoritgich bilan), 25fps/30fps (2560x1440, 2304x1296, 1920x1080), PoE/12V doimiy tok, 4.0 mm qat'iy ob'ektiv, IP66. Xususiyatlari: Pan/Tilt (0–350° panoramalash, 0–120° egilish), aqlli aniqlash (odam va transport vositalarini tasniflash), avtomatik kuzatish (Auto Tracking), harakat datchigi, zonaga bostirib kirishni aniqlash, chiziqdan o'tishni aniqlash, kameraga ta'sirni aniqlash, tashlab ketilgan buyumlarni aniqlash, obyekt yo'qolishini aniqlash, zonaga kirish/chiqishni aniqlash, Full-Color (to'liq rangli tungi ko'rish) va IK-yoritgich (30 m gacha), SmartVid (Smart IR, WDR, 3D DNR, BLC), ONVIF, masofadan kuzatish (VIGI App, Web, VIGI Security Manager), o'rnatilgan mikrofon va dinamik (ikki tomonlama audio aloqa), MicroSD karta uyasi (256 GB gacha).",
    "image": "images/vigi-kameralar-vigi-c5404mmun-37.jpeg"
  },
  {
    "id": "vigi-camera-038",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "VIGI C230I Mini(2.8mm)(UN)",
    "price": 45.0,
    "desc": "3Mp ixcham gumbazsimon IP-kamera Texnik xususiyatlari: H.265+/H.265/H.264+/H.264, 1/2.8\" progressiv skanerlashli CMOS-matritsa, 0.01 Lux@F2.2 da rangli suratga olish, 0 Lux (IK-yoritgich bilan), 25fps/30fps (2304x1296, 2048x1280, 1920x1080), PoE/12V doimiy tok, 2.8 mm qat'iy ob'ektiv, IK08 (zarbalardan himoya), ichki o'rnatish (ixcham korpus). Xususiyatlari: Aqlli aniqlash (odam va transport vositalarini tasniflash), harakat datchigi, zonaga bostirib kirishni aniqlash, chiziqdan o'tishni aniqlash, kameraga ta'sirni aniqlash, zonaga kirish/chiqishni aniqlash, IK-yoritgich (30 m gacha), SmartVid (Smart IR, WDR 120dB, 3D DNR, BLC), ONVIF, masofadan kuzatish (VIGI App, Web, VIGI Security Manager), o'rnatilgan mikrofon.",
    "image": "images/vigi-kameralar-vigi-c230i-mini28mmun-38.jpeg"
  },
  {
    "id": "vigi-camera-039",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "VIGI C340-W(4mm)(UN)",
    "price": 40.0,
    "desc": "4Mp tashqi silindrsimon Wi-Fi IP-kamera Texnik xususiyatlari: H.265+/H.265/H.264+/H.264, 1/3\" progressiv skanerlashli CMOS-matritsa, 0.005 Lux@F1.6 da rangli suratga olish, 0 Lux (IK/oq yoritgich bilan), 25fps/30fps (2560x1440, 2304x1296, 1920x1080), Wi-Fi (IEEE 802.11b/g/n) / Ethernet (RJ45), 12V doimiy tok, 4.0 mm qat'iy ob'ektiv, IP67. Xususiyatlari: Aqlli aniqlash (odam va transport vositalarini tasniflash), harakat datchigi, zonaga bostirib kirishni aniqlash, chiziqdan o'tishni aniqlash, kameraga ta'sirni aniqlash, tashlab ketilgan buyumlarni aniqlash, obyekt yo'qolishini aniqlash, zonaga kirish/chiqishni aniqlash, Full-Color (to'liq rangli tungi ko'rish) va IK-yoritgich (30 m gacha), SmartVid (Smart IR, WDR, 3D DNR, BLC), ONVIF, masofadan kuzatish (VIGI App, Web, VIGI Security Manager), o'rnatilgan mikrofon va dinamik (ikki tomonlama audio aloqa), MicroSD karta uyasi (256 GB gacha), tashqi Wi-Fi antennalari.",
    "image": "images/vigi-kameralar-vigi-c340-w4mmun-39.jpeg"
  },
  {
    "id": "vigi-camera-040",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "InSight S345-4G(4mm)",
    "price": 100.0,
    "desc": "VIGI 4MP Full-Color 4G qo'llab-quvvatlovchi tashqi silindrsimon tarmoq kamerasi Texnik xususiyatlari: 4G Cat4, LTE-TDD/LTE-FDD/WCDMA, 3 × LAN port, 4MP, 1/2.7” progressiv skanerlashli CMOS-matritsa, H.265+/H.265 /H.264+/H.264, IR va oq yoritgich, 25fps/30fps (2688 × 1520), IP66, 12V doimiy tok,120dB WDR, o'rnatilgan mikrofon va dinamik, Micro SD xotira kartasi uyasi (512 GB gacha). Xususiyatlari: 4G mobil tarmog'i, quyi qurilmalar uchun 3 × gigabitli LAN port, Full-Color va IR-yoritgichli tungi ko'rish (30 m gacha), aqlli aniqlash (odam/avtomobilni aniqlash), SmartVid (Smart IR, 3D DNR, BLC), ONVIF (Profile S/T/G), masofadan kuzatish, VIGI App mobil ilovasi, Web, Tarmoq video registratori, VMS",
    "image": "images/vigi-kameralar-insight-s345-4g4mm-40.jpeg"
  },
  {
    "id": "vigi-camera-041",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "InSight S345ZI",
    "price": 106.6,
    "desc": "VIGI 4MP IR tashqi motorli varifokal silindrsimon tarmoq kamerasi Texnik xususiyatlari: 4MP, 2.7 - 13.5 mm (5×) varifokal ob'ektiv, 1/2.9'' progressiv skanerlashli CMOS-matritsa, H.265+/H.265/H.264+/H.264, IR LED, 25fps/30fps (2688x1520), IP67, IK10, PoE / 12V doimiy tok bilan quvvatlanish,120dB WDR, o'rnatilgan mikrofon va dinamik, Micro SD xotira kartasi uyasi (512 GB gacha), signal kirish/chiqish, audio kirish/audio chiqish Xususiyatlari: oson o'rnatish va monitoring uchun 5x optik zoom, IR-yoritgichli tungi ko'rish (60 m gacha), aqlli aniqlash (odam/avtomobilni aniqlash), SmartVid (Smart IR, 3D DNR, BLC), ONVIF (Profile S/T/G), masofadan kuzatish, VIGI App mobil ilovasi, Web, Tarmoq video registratori, VIGI VMS",
    "image": "images/vigi-kameralar-insight-s345zi-41.jpeg"
  },
  {
    "id": "vigi-camera-042",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "VIGI C340S(4mm)",
    "price": 70.6,
    "desc": "4MP tashqi to'liq rangli silindrsimon IP-kamera ColorPro Texnik xususiyatlari: 4MP, 4 mm qat'iy ob'ektiv, 1/1.8” progressiv skanerlashli CMOS-matritsa, H.265+/H.265/H.264+/H.264, oq yoritgich, 25fps/30fps (2688x1520, 2560x1440, 2304x1296, 2048x1280, 1920x1080, 1280x720), IP67,Web, PoE / 12V doimiy tok bilan quvvatlanish,120dB WDR, o'rnatilgan mikrofon va dinamik, Micro SD xotira kartasi uyasi. Xususiyatlari: to'liq rangli tungi ko'rish (30 m gacha), aqlli aniqlash (odam/avtomobilni aniqlash),harakatni aniqlash, zonaga bostirib kirishni aniqlash, chiziqdan o'tishni aniqlash, kameraga ta'sirni aniqlash, qoldirilgan buyumlarni aniqlash, obyektlar yo'qolishini aniqlash, zonaga kirishni aniqlash, zonadan chiqishni aniqlash, beixtiyor aylanib yurishni aniqlash, sahna o'zgarishini aniqlash, avtomobilni aniqlash, odamni aniqlash), chuqur o'rganish funksiyasi (odam va transport vositasini bir vaqtda aniqlash/qayd etishni qo'llab-quvvatlaydi, yuzni suratga olish, yuzlarni solishtirish), SmartVid (Smart IR, 3D DNR, BLC), ONMF, masofadan kuzatish, VIGI App mobil ilovasi, Web, VIGI Security Manager ilovasi",
    "image": "images/vigi-kameralar-vigi-c340s4mm-42.jpeg"
  },
  {
    "id": "vigi-camera-043",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "InSight S485PI",
    "price": 95.0,
    "desc": "VIGI 8MP IR panoramali turelsimon tarmoq kamerasi Texnik xususiyatlari: 8MP, 1.65 mm qat'iy ob'ektiv, 1/2.7'' progressiv skanerlashli CMOS-matritsa, H.265+/H.265/H.264+/H.264, IR LED, 25fps/30fps (3840 × 2160), IP67, IK10, PoE / 12V doimiy tok bilan quvvatlanish,120dB WDR, o'rnatilgan mikrofon va dinamik, Micro SD xotira kartasi uyasi (512 GB gacha), signal kirish/chiqish, audio kirish/audio chiqish Xususiyatlari: 180° panoramali ko'rish, Qizil-ko'k signalizatsiya, IR-yoritgichli tungi ko'rish (20 m gacha), aqlli aniqlash (odam/avtomobilni aniqlash), inson/avtomobil analitikasi, SmartVid (Smart IR, 3D DNR, BLC), ONVIF (Profile S/T/G), masofadan kuzatish, VIGI App mobil ilovasi, Web, Tarmoq video registratori, VMS",
    "image": "images/vigi-kameralar-insight-s485pi-43.jpeg"
  },
  {
    "id": "vigi-camera-044",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "InSight S385DPS(UN)",
    "price": 170.0,
    "desc": "8Mp (4K) qo'sh ob'ektivli (Dual-Lens) tashqi silindrsimon IP-kamera Texnik xususiyatlari: H.265+/H.265/H.264+/H.264, Ikkita progressiv skanerlashli 1/1.8\" CMOS-matritsa, o'ta yuqori sezuvchanlik 0.0005 Lux@F1.0, 0 Lux (IK/oq yoritgich bilan), 25fps/30fps (3840x2160, 2560x1440, 1920x1080), PoE/12V doimiy tok, qo'sh ob'ektiv (keng burchakli + zoom uchun teleobyektiv), IP67. Xususiyatlari: Aqlli gibrid zoom, ilg'or aqlli aniqlash (odam va transport vositalarini tasniflash), harakat datchigi, zonaga bostirib kirishni aniqlash, chiziqdan o'tishni aniqlash, kameraga ta'sirni aniqlash, tashlab ketilgan buyumlarni aniqlash, obyekt yo'qolishini aniqlash, zonaga kirish/chiqishni aniqlash, Full-Color (qorong'ulikda to'liq rangli tasvir) va IK-yoritgich (30 m gacha), SmartVid (True WDR 120dB, 3D DNR, BLC, HLC), ONVIF, masofadan kuzatish (VIGI App, Web, VIGI Security Manager), o'rnatilgan mikrofon va dinamik (ikki tomonlama audio aloqa), MicroSD karta uyasi (256 GB gacha).",
    "image": "images/vigi-kameralar-insight-s385dpsun-44.jpeg"
  },
  {
    "id": "vigi-camera-045",
    "category": "vigi-camera",
    "subcategory": null,
    "name": "InSight S385PI",
    "price": 113.3,
    "desc": "VIGI 8MP IR tashqi panoramali silindrsimon tarmoq kamerasi Texnik xususiyatlari: 8MP, 1.65 mm qat'iy ob'ektiv, 1/2.7'' progressiv skanerlashli CMOS-matritsa, H.265+/H.265/H.264+/H.264, IR LED, 25fps/30fps (3840 × 2160), IP67, IK10, PoE / 12V doimiy tok bilan quvvatlanish,120dB WDR, o'rnatilgan mikrofon va dinamik, Micro SD xotira kartasi uyasi (512 GB gacha), signal kirish/chiqish, audio kirish/audio chiqish Xususiyatlari: 180° panoramali ko'rish, Qizil-ko'k signalizatsiya, IR-yoritgichli tungi ko'rish (20 m gacha), aqlli aniqlash (odam/avtomobilni aniqlash), inson/avtomobil analitikasi, SmartVid (Smart IR, 3D DNR, BLC), ONVIF (Profile S/T/G), masofadan kuzatish, VIGI App mobil ilovasi, Web, Tarmoq video registratori, VMS",
    "image": "images/vigi-kameralar-insight-s385pi-45.jpeg"
  },
  {
    "id": "vigi-nvr-001",
    "category": "vigi-nvr",
    "subcategory": null,
    "name": "VIGI NVR1004H",
    "price": 37.3,
    "desc": "4 kanalli tarmoq video registratori Texnik xususiyatlari: H.265+/H.265/H.264+/H.264, 8 MP gacha aniqlik, dekodlash imkoniyati: 8 kanal = 2MP, 80 Mbit/s kiruvchi tarmoq tezligi (4 kanalgacha), 1 × SATA interfeysi (10 TB gacha), 1 × 10/100 Mbit/s port,  2 × USB 2.0 port, 12V doimiy tok, 1.5 A, 1 × VGA port / 1 × HDMI port (4K gacha rezolyutsiya) (sinxron chiqish). Xususiyatlari: avtomatik initsializatsiya, aqlli aniqlash funksiyasi konfiguratsiyasi, ikki tomonlama audio, bir vaqtda qayta ko'rsatish, oqimlarni sozlash, ONVIF, masofadan kuzatish, VIGI App mobil ilovasi, Web, VIGI Security Manager ilovasi",
    "image": "images/vigi-nvr-vigi-nvr1004h-1.jpeg"
  },
  {
    "id": "vigi-nvr-002",
    "category": "vigi-nvr",
    "subcategory": null,
    "name": "VIGI NVR1008H",
    "price": 41.3,
    "desc": "8 kanalli tarmoq video registratori Texnik xususiyatlari: H.265+/H.265/H.264+/H.264, 5 megapikselgacha aniqlik, kiruvchi tarmoq tezligi 80 Mbit/s (8 kanalgacha), 1 × SATA interfeysi (10 TB gacha), 12V doimiy tok, 1.5 A, 2 × USB 2.0 port, 1 × VGA port, 1 × HDMI port. Xususiyatlari: ikki tomonlama audio aloqa, bir vaqtda qayta ko'rsatish, oqimlarni sozlash, ONVIF,  masofadan monitoring, VIGI App mobil ilovasi",
    "image": "images/vigi-nvr-vigi-nvr1008h-2.jpeg"
  },
  {
    "id": "vigi-nvr-003",
    "category": "vigi-nvr",
    "subcategory": null,
    "name": "VIGI NVR1016H",
    "price": 80.0,
    "desc": "16 kanalli tarmoq video registratori Texnik xususiyatlari: H.265+/H.265/H.264+/H.264, 8 MP gacha aniqlik, Kiruvchi tarmoq tezligi 80 Mbit/s (16 kanalgacha), 1 SATA interfeysi (10 TB gacha), 12V/1, 5 A, 2 × USB 2.0 port, 1 × VGA port, 1 × HDMI port. Xususiyatlari: ikki tomonlama audio, bir vaqtda qayta ko'rsatish, optimallashtirilgan sozlash, ONVIF, masofadan monitoring, VIGI App mobil ilovasi",
    "image": "images/vigi-nvr-vigi-nvr1016h-3.jpeg"
  },
  {
    "id": "vigi-nvr-004",
    "category": "vigi-nvr",
    "subcategory": null,
    "name": "VIGI NVR4032H",
    "price": 193.3,
    "desc": "32 kanalli tarmoq video registratori Texnik xususiyatlari: H.265+/H.265/H.264+/H.264, 8 MP gacha aniqlik, dekodlash imkoniyati - 16 kanal × 2MP, kiruvchi tarmoq tezligi 320 Mbit/s (32 kanalgacha), 4 × SATA interfeysi (40 TB gacha), 2 × gigabitli port, 2 × USB 2.0 port, 1 × USB 3.0 port, 1 × VGA port / 1 × HDMI port (mustaqil video chiqishlar). Xususiyatlari: avtomatik initsializatsiya, aqlli aniqlash funksiyasi konfiguratsiyasi, ikki tomonlama audio, bir vaqtda qayta ko'rsatish, oqimlarni sozlash, ONVIF, masofadan kuzatish, VIGI App mobil ilovasi, Web, VIGI Security Manager ilovasi",
    "image": "images/vigi-nvr-vigi-nvr4032h-4.jpeg"
  },
  {
    "id": "vigi-nvr-005",
    "category": "vigi-nvr",
    "subcategory": null,
    "name": "VIGI NVR4064H",
    "price": 386.6,
    "desc": "VIGI 64 kanalli tarmoq video registratori Texnik xususiyatlari: H.265+/H.265/H.264+/H.264, 8 MP gacha aniqlik, RX/TX-320 Mbit/s/320 Mbit/s, 32 MP dekodlash imkoniyati, mustaqil HDMI/VGA video chiqishlari, 100-240V AC, 4 × SATA interfeysi (64 TB gacha), 2 × gigabitli Ethernet port. Xususiyatlari: avtomatik initsializatsiya, aniqlash va signalizatsiyaning aqlli konfiguratsiyasi, ikki tomonlama audio, real vaqtda 64 kanalni bir vaqtda ko'rish, HDMI 4K video chiqishi, 16 kanal yozuvlarini sinxron ko'rish, oqimlarni sozlash, ONVIF, masofadan kuzatish, VIGI App mobil ilovasi, Web, GUI, VMS",
    "image": "images/vigi-nvr-vigi-nvr4064h-5.jpeg"
  },
  {
    "id": "vigi-nvr-006",
    "category": "vigi-nvr",
    "subcategory": null,
    "name": "VIGI NVR2O16H(UN)",
    "price": 130.0,
    "desc": "16 kanalli real vaqt rejimida ko'rish va HDMI orqali 4K video chiqishi. 1080p (25 kadr/soniya) rezolyutsiyada 10 kanalgacha dekodlash imkoniyati. 16 kanalli sinxron qayta ko'rsatish † Kiruvchi va chiquvchi 160 Mbit/s tarmoq tezligi. 2 ta SATA interfeysi va 16 TB gacha xotira kartasi uyasi* H.265+ siqish texnologiyasi. Kiruvchi/chiquvchi signalizatsiya: 6/4. HDMI va VGA orqali mustaqil/bir vaqtda video chiqishi. Masofadan monitoring",
    "image": "images/vigi-nvr-vigi-nvr2o16hun-6.jpeg"
  },
  {
    "id": "vigi-nvr-007",
    "category": "vigi-nvr",
    "subcategory": null,
    "name": "VIGI NVR2016H-16MP",
    "price": 240.0,
    "desc": "Sakkiz kanalli 2 Mp¹ dekodlash: yozuvlarni sinxron qayta ko'rsatish va jonli translatsiyalarni ko'rish uchun ko'plab kanallar. PoE qo'llab-quvvatlash: PoE+ standartini (802.3af/at) qo'llab-quvvatlovchi va umumiy 140 Vt² byudjetli 16 port. 16 kanalda sinxron qayta ko'rsatish³: 16 ta kameradan yozuv va jonli translatsiyalarni bir vaqtda ko'rish imkoniyati, qayta ko'rsatish tezligini oshirish, shuningdek, hodisalar bo'yicha qidiruv yozilgan materialda navigatsiyani osonlashtiradi. H.265+ video siqish formati: tasvir sifatini yo'qotmasdan qattiq diskda joy tejash va tarmoq yukini kamaytirish imkonini beradi. ONVIF⁶ protokoli: keng moslikni ta'minlaydi va boshqa ishlab chiqaruvchilar kameralarini to'siqsiz ulash imkonini beradi. Tezkor sozlash: «Avtomatik initsializatsiya» tugmasini bosing, bu kameralar va qattiq disklarning asosiy parametrlarini bir zumda sozlash imkonini beradi. Kunu tun yozuv: ulangan kameralardan video yozuvlarni 32 TB gacha (1048 kun⁴) hajmda saqlash. Ikki tomonlama audio aloqa: ovozli aloqa potentsial buzg'unchilarni qo'rqitish imkonini beradi. Masofadan monitoring: VIGI ilovasi orqali, veb-interfeys yoki «VIGI Security Manager» dasturi. Masofadan monitoring",
    "image": "images/vigi-nvr-vigi-nvr2016h-16mp-7.jpeg"
  },
  {
    "id": "wifi-router-001",
    "category": "wifi-router",
    "subcategory": "Wi-Fi 4 Router",
    "name": "TL-WR840N",
    "price": 16.2,
    "desc": "N300 Wi-Fi Router SPEED: 300 Mbps at 2.4 GHz SPEC: 2× Antennas, 1× 10/100M WAN Port + 4× 10/100M LAN Ports FEATURE: Tether App, Router/Access Point/Range Extender/WISP Mode, IPv6 Supported,  IPTV",
    "image": "images/wi-fi-router-tl-wr840n-1.jpeg"
  },
  {
    "id": "wifi-router-002",
    "category": "wifi-router",
    "subcategory": "Wi-Fi 4 Router",
    "name": "TL-WR841N",
    "price": 16.2,
    "desc": "N300 Wi-Fi Router SPEED: 300 Mbps at 2.4 GHz SPEC: 2× Antennas, 1× 10/100M WAN Port + 4× 10/100M LAN Ports FEATURE: Tether App, Router/Access Point/Range Extender/WISP Mode, IPv6 Supported,  IPTV",
    "image": "images/wi-fi-router-tl-wr841n-2.jpeg"
  },
  {
    "id": "wifi-router-003",
    "category": "wifi-router",
    "subcategory": "Wi-Fi 4 Router",
    "name": "TL-WR842N",
    "price": 16.2,
    "desc": "N300Mbps Multi-function Wireless N Router, 3G/4G USB modem support, QCA (Atheros), 2T2R, 2.4GHz, 802.11b/g/n, 1 10/100Mbps WAN + 4 10/100Mbps LAN ports, 1 USB 2.0 port, FTP/Media/Print Server, 2 fixed 5dBi antennas, support Russian PPTP/L2TP/PPPoE, support IGMP Snooping/Proxy, Bridge and 802.1Q TAG VLAN for IPTV, RU WEB management interface, Utility, Manual and Box",
    "image": "images/wi-fi-router-tl-wr842n-3.jpeg"
  },
  {
    "id": "wifi-router-004",
    "category": "wifi-router",
    "subcategory": "Wi-Fi 4 Router",
    "name": "TL-WR845N",
    "price": 18.0,
    "desc": "N300 Wi-Fi Router SPEED: 300 Mbps at 2.4 GHz SPEC: 3× Antennas, 1× 10/100M WAN Port + 4× 10/100M LAN Ports FEATURE: Tether App, Router/Access Point/Range Extender/WISP Mode, IPv6 Supported,  IPTV",
    "image": "images/wi-fi-router-tl-wr845n-4.jpeg"
  },
  {
    "id": "wifi-router-005",
    "category": "wifi-router",
    "subcategory": "Wi-Fi 4 Router",
    "name": "TL-WR941HP",
    "price": 18.0,
    "desc": "N450 High Power Wi-Fi Router SPEED: 450 Mbps at 2.4 GHz SPEC: 3× 9 dBi Antennas, 1× 10/100M WAN Port + 4× 10/100M LAN Ports, 1000 mw, Independent High-Power Amplifiers FEATURE: Router/Access Point/Range Extender Mode, IPTV, Wall-Penetrating Wi-Fi",
    "image": "images/wi-fi-router-tl-wr941hp-5.jpeg"
  },
  {
    "id": "wifi-router-006",
    "category": "wifi-router",
    "subcategory": "Wi-Fi 5 Router",
    "name": "Archer C24",
    "price": 21.6,
    "desc": "AC750 Dual Band Wi-Fi Router SPEED: 300 Mbps at 2.4 GHz + 433 Mbps at 5 GHz SPEC: 4×Antennas, 1×10/100M WAN Port, 4×10/100M LAN Ports FEATURE: Tether App, Router/Access Point/Range Extender Mode, IPv6 Supported, IPTV, Agile Config",
    "image": "images/wi-fi-router-archer-c24-6.jpeg"
  },
  {
    "id": "wifi-router-007",
    "category": "wifi-router",
    "subcategory": "Wi-Fi 5 Router",
    "name": "Archer C20",
    "price": 23.4,
    "desc": "AC750 Dual-Band Wi-Fi Router SPEED: 300 Mbps at 2.4 GHz + 433 Mbps at 5 GHz SPEC: 3× Antennas, 1× 10/100M WAN Port + 4× 10/100M LAN Ports FEATURE: Tether App, Router/Access Point/Range Extender Mode, IPv6 Supported, IPTV, Agile Config",
    "image": "images/wi-fi-router-archer-c20-7.jpeg"
  },
  {
    "id": "wifi-router-008",
    "category": "wifi-router",
    "subcategory": "Wi-Fi 5 Router",
    "name": "Archer C54",
    "price": 23.4,
    "desc": "AC1200 Dual-Band Wi-Fi Router SPEED: 300 Mbps at 2.4 GHz + 867 Mbps at 5 GHz SPEC: 4× Antennas, 1× 10/100M WAN Port + 4× 10/100M LAN Ports FEATURE: Tether App, WPA3, Router/Access Point/Range Extender Mode, IPv6 Supported, IPTV, Beamforming, MU-MIMO, Agile Config",
    "image": "images/wi-fi-router-archer-c54-8.jpeg"
  },
  {
    "id": "wifi-router-009",
    "category": "wifi-router",
    "subcategory": "Wi-Fi 5 Router",
    "name": "Archer A5",
    "price": 25.8,
    "desc": "AC1200 Dual-Band Wi-Fi Router SPEED: 300 Mbps at 2.4 GHz + 867 Mbps at 5 GHz SPEC: 4× Antennas, 1× 10/100M WAN Port + 4× 10/100M LAN Ports FEATURE: Tether App, WPA3, Router/Access Point/Range Extender Mode, IPv6 Supported,  IPTV, Beamforming, MU-MIMO",
    "image": "images/wi-fi-router-archer-a5-9.jpeg"
  },
  {
    "id": "wifi-router-010",
    "category": "wifi-router",
    "subcategory": "Wi-Fi 5 Router",
    "name": "Archer C50",
    "price": 25.8,
    "desc": "AC1200 Dual-Band Wi-Fi Router SPEED: 300 Mbps at 2.4 GHz + 867 Mbps at 5 GHz SPEC: 4× Antennas, 1× 10/100M WAN Port + 4× 10/100M LAN Ports FEATURE: Tether App, WPA3, Router/Access Point/Range Extender Mode, IPv6 Supported,  IPTV, Beamforming, MU-MIMO",
    "image": "images/wi-fi-router-archer-c50-10.jpeg"
  },
  {
    "id": "wifi-router-011",
    "category": "wifi-router",
    "subcategory": "Wi-Fi 5 Router",
    "name": "Archer A64",
    "price": 31.2,
    "desc": "AC1200 Dual-Band Wi-Fi Router SPEED: 400 Mbps at 2.4 GHz + 867 Mbps at 5 GHz SPEC: 4× Antennas, 1× Gigabit WAN Port + 4× Gigabit LAN Ports FEATURE: Tether App, WPA3, Access Point Mode, IPv6 Supported, IPTV, Beamforming, Smart Connect, Airtime Fairness, MU-MIMO, Cloud Support, Agile Config, Easymesh (Compatible with Onemesh)",
    "image": "images/wi-fi-router-archer-a64-11.jpeg"
  },
  {
    "id": "wifi-router-012",
    "category": "wifi-router",
    "subcategory": "Wi-Fi 5 Router",
    "name": "Archer C64",
    "price": 31.2,
    "desc": "AC1200 Dual-Band Wi-Fi Router SPEED: 400 Mbps at 2.4 GHz + 867 Mbps at 5 GHz SPEC: 4× Antennas, 1× Gigabit WAN Port + 4× Gigabit LAN Ports FEATURE: Tether App, WPA3, Access Point Mode, IPv6 Supported, IPTV, Beamforming, Smart Connect, Airtime Fairness, MU-MIMO, Cloud Support, Agile Config, Easymesh (Compatible with Onemesh)",
    "image": "images/wi-fi-router-archer-c64-12.jpeg"
  },
  {
    "id": "wifi-router-013",
    "category": "wifi-router",
    "subcategory": "Wi-Fi 5 Router",
    "name": "Archer C6",
    "price": 36.0,
    "desc": "AC1200 Dual-Band Wi-Fi Router SPEED: 300 Mbps at 2.4 GHz + 867 Mbps at 5 GHz SPEC: 4× Antennas, 1× Gigabit WAN Port + 4× Gigabit LAN Ports FEATURE: Tether App, WPA3, Access Point Mode, IPv6 Supported, IPTV, Beamforming, MU-MIMO, Cloud Support, Easymesh (Compatible with Onemesh)",
    "image": "images/wi-fi-router-archer-c6-13.jpeg"
  },
  {
    "id": "wifi-router-014",
    "category": "wifi-router",
    "subcategory": "Wi-Fi 5 Router",
    "name": "Archer C80",
    "price": 39.6,
    "desc": "AC1900 Dual-Band Wi-Fi Router SPEED: 600 Mbps at 2.4 GHz + 1300 Mbps at 5 GHz SPEC:  4× Antennas, 1× Gigabit WAN Port + 4× Gigabit LAN Ports FEATURE: Tether App, WPA3, Access Point Mode, IPv6 Supported, IPTV, Beamforming, Smart Connect, Airtime Fairness, MU-MIMO, Cloud Support, Agile Config, Easymesh (Compatible with Onemesh)",
    "image": "images/wi-fi-router-archer-c80-14.jpeg"
  },
  {
    "id": "wifi-router-015",
    "category": "wifi-router",
    "subcategory": "Wi-Fi 6 Router",
    "name": "Archer AX10",
    "price": 51.6,
    "desc": "AX1500 Wi-Fi 6 Router SPEED: 300 Mbps at 2.4 GHz + 1201 Mbps at 5 GHz SPEC: 4× Antennas, Broadcom 1.5 GHz Triple-Core CPU, 1× Gigabit WAN Port + 4× Gigabit LAN Ports, 1024-QAM, OFDMA FEATURE: Tether App, Access Point Mode, IPv6 Supported, IPTV, Beamforming, Smart Connect, Airtime Fairness, VPN Server, Cloud Support, Easymesh (Compatible with Onemesh)",
    "image": "images/wi-fi-router-archer-ax10-15.jpeg"
  },
  {
    "id": "wifi-router-016",
    "category": "wifi-router",
    "subcategory": "Wi-Fi 6 Router",
    "name": "Archer AX1800",
    "price": 56.4,
    "desc": "AX1800 Dual-Band Wi-Fi 6 Router SPEED: 574 Mbps at 2.4 GHz + 1201 Mbps at 5 GHz SPEC: 4× Antennas, Dual-Core CPU, 1× Gigabit WAN Port + 4× Gigabit LAN Ports,  1024-QAM, OFDMA FEATURE: Tether App, WPA3, Access Point Mode, IPv6 Supported, IPTV, Beamforming, Smart Connect, Airtime Fairness, VPN Server, Cloud Support, Easymesh (Compatible with Onemesh)",
    "image": "images/wi-fi-router-archer-ax1800-16.jpeg"
  },
  {
    "id": "wifi-router-017",
    "category": "wifi-router",
    "subcategory": "Wi-Fi 6 Router",
    "name": "Archer AX23",
    "price": 58.8,
    "desc": "AX1800 Dual-Band Wi-Fi 6 Router SPEED: 574 Mbps at 2.4 GHz + 1201 Mbps at 5 GHz SPEC: 4× Antennas, Dual-Core CPU, 1× Gigabit WAN Port + 4× Gigabit LAN Ports,  1024-QAM, OFDMA FEATURE: Tether App, WPA3, Access Point Mode, IPv6 Supported, IPTV, Beamforming, Smart Connect, Airtime Fairness, VPN Server, Cloud Support，Easymesh (Compatible with Onemesh)",
    "image": "images/wi-fi-router-archer-ax23-17.jpeg"
  },
  {
    "id": "wifi-router-018",
    "category": "wifi-router",
    "subcategory": "Wi-Fi 6 Router",
    "name": "Archer AX20",
    "price": 69.6,
    "desc": "AX1800 Dual-Band Wi-Fi 6 Router SPEED: 574 Mbps at 2.4 GHz + 1201 Mbps at 5 GHz SPEC: 4× Antennas, Broadcom 1.5 GHz Quad-Core CPU, 1× Gigabit WAN Port + 4× Gigabit LAN Ports, USB 2.0 Port, 1024-QAM, OFDMA FEATURE: Tether App, WPA3, Access Point Mode, IPv6 Supported, IPTV, Beamforming, Smart Connect, Airtime Fairness, VPN Server, Cloud Support，Onemesh",
    "image": "images/wi-fi-router-archer-ax20-18.jpeg"
  },
  {
    "id": "wifi-router-019",
    "category": "wifi-router",
    "subcategory": "Wi-Fi 6 Router",
    "name": "Archer AX53",
    "price": 60.0,
    "desc": "AX3000 Dual-Band Wi-Fi 6 Router SPEED: 574 Mbps at 2.4 GHz + 2402 Mbps at 5 GHz SPEC: 4× Antennas, 1× Gigabit WAN Port + 4× Gigabit LAN Ports, 1024-QAM, OFDMA, HE160 FEATURE: Tether App, WPA3, Access Point Mode, IPv6 Supported, IPTV, Beamforming, Smart Connect, Airtime Fairness, VPN Server, DFS, Cloud Support, HomeShield, Easymesh (Compatible with Onemesh)",
    "image": "images/wi-fi-router-archer-ax53-19.jpeg"
  },
  {
    "id": "wifi-router-020",
    "category": "wifi-router",
    "subcategory": "Wi-Fi 6 Router",
    "name": "Archer AX55",
    "price": 70.8,
    "desc": "AX3000 Dual-Band Wi-Fi 6 Router SPEED: 574 Mbps at 2.4 GHz + 2402 Mbps at 5 GHz SPEC: 4× Antennas, 1× Gigabit WAN Port + 4× Gigabit LAN Ports, USB 3.0 Port, 1024-QAM, OFDMA, HE160 FEATURE: Tether App, WPA3, Access Point Mode, IPv6 Supported, IPTV, Beamforming, Smart Connect, Airtime Fairness,  VPN Server, VPN Client, DFS, Cloud Support, HomeShield, Easymesh (Compatible with Onemesh)",
    "image": "images/wi-fi-router-archer-ax55-20.jpeg"
  },
  {
    "id": "wifi-router-021",
    "category": "wifi-router",
    "subcategory": "Wi-Fi 6 Router",
    "name": "Archer AX72",
    "price": 103.2,
    "desc": "AX5400 Dual-Band Wi-Fi 6 Router SPEED: 574 Mbps at 2.4 GHz + 4804 Mbps at 5 GHz SPEC: 6× Antennas, Qualcomm 1 GHz Dual-Core CPU, 1× Gigabit WAN Port + 4× Gigabit LAN Ports, USB 3.0 Port, 1024-QAM, OFDMA, HE160 FEATURE: Tether App, WPA3, Access Point Mode, IPv6 Supported, IPTV, Beamforming, Smart Connect, Airtime Fairness, MU-MIMO, VPN Server, VPN Client, DFS, Cloud Support, HomeShield, Easymesh (Compatible with Onemesh)",
    "image": "images/wi-fi-router-archer-ax72-21.jpeg"
  },
  {
    "id": "wifi-router-022",
    "category": "wifi-router",
    "subcategory": "Wi-Fi 6 Router",
    "name": "Archer AX73",
    "price": 126.0,
    "desc": "AX5400 Dual-Band Wi-Fi 6 Router SPEED: 574 Mbps at 2.4 GHz + 4804 Mbps at 5 GHz SPEC: 6× Antennas, Broadcom 1.5 GHz Triple-Core CPU, 1× Gigabit WAN Port + 4× Gigabit LAN Ports, USB 3.0 Port, 1024-QAM, OFDMA, HE160 FEATURE: Tether App, WPA3, Access Point Mode, IPv6 Supported, IPTV, Beamforming, Smart Connect, Airtime Fairness, MU-MIMO, VPN Server, VPN Client, DFS, Cloud Support, HomeShield, Easymesh (Compatible with Onemesh)",
    "image": "images/wi-fi-router-archer-ax73-22.jpeg"
  },
  {
    "id": "wifi-router-023",
    "category": "wifi-router",
    "subcategory": "Wi-Fi 7 Router",
    "name": "Archer BE550",
    "price": 200.4,
    "desc": "BE19000 Tri Band Wi-Fi 7 Router SPEED: 1376 Mbps at 2.4 GHz + 5760 Mbps at 5 GHz + 11520 Mbps at 6 GHz SPEC: 8× Internal Antennas, Quad-Core CPU, 1*10Gbps SFP+/RJ45 Combo WAN/LAN port +1*10 Gbps RJ45 WAN/LAN port +4*2.5 Gbps LAN ports, 1*USB 3.0 Port, MLO, 4096-QAM, OFDMA,HE160 on 5GHz, HE320 on 6GHz, LED Screen FEATURE: Tether App, WPA3, Access Point Mode, IPv6 Supported, IPTV, Beamforming, Smart Connect, Airtime Fairness, VPN Server, VPN Client, DFS, Cloud Support, HomeShield, Easymesh (Compatible with Onemesh), IoT Network",
    "image": "images/wi-fi-router-archer-be550-23.jpeg"
  },
  {
    "id": "wifi-router-024",
    "category": "wifi-router",
    "subcategory": "Wi-Fi 7 Router",
    "name": "Archer BE805",
    "price": 400.8,
    "desc": "BE19000 Tri-Band Wi-Fi 7 Router SPEED: 1376 Mbps at 2.4 GHz + 5760 Mbps at 5 GHz + 11520 Mbps at 6 GHz SPEC: 8× Internal Antennas, 1.8 GHz Quad-Core CPU, 1*10 Gbps WAN port + 1*10 Gbps LAN port + 4*1 Gbps LAN ports, 2*USB 3.0 Port, MLO, 4096-QAM, OFDMA, HE160 on 5GHz, HE320 on 6GHz FEATURE: Tether App, WPA3, Access Point Mode, IPv6 Supported, IPTV, Beamforming, Smart Connect, Airtime Fairness, VPN Server, VPN Client, DFS, Cloud Support, HomeShield, Easymesh (Compatible with Onemesh), IoT Network",
    "image": "images/wi-fi-router-archer-be805-24.jpeg"
  },
  {
    "id": "wifi-router-025",
    "category": "wifi-router",
    "subcategory": "Wi-Fi 7 Router",
    "name": "Archer BE800",
    "price": 487.2,
    "desc": "BE9300 Tri-Band Wi-Fi 7 Router SPEED: 574 Mbps at 2.4 GHz + 2880 Mbps at 5 GHz + 5760 Mbps at 6 GHz SPEC: 6× Internal Antennas, 1.5 GHz Quad-Core CPU, 1*2.5 Gbps WAN port + 4*2.5 Gbps LAN ports, 1*USB 3.0 Port, MLO, 4096-QAM, OFDMA, HE160 on 5GHz, HE320 on 6GHz FEATURE: Tether App, WPA3, Access Point Mode, IPv6 Supported, IPTV, Beamforming, Smart Connect, Airtime Fairness, VPN Server, VPN Client, DFS, Cloud Support, HomeShield, Easymesh (Compatible with Onemesh), IoT Network",
    "image": "images/wi-fi-router-archer-be800-25.jpeg"
  },
  {
    "id": "wifi-router-026",
    "category": "wifi-router",
    "subcategory": "LTE/5G Router",
    "name": "Archer MR200",
    "price": 68.4,
    "desc": "AC750 Wireless Dual Band 4G LTE Router Build-In 150Mbps 4G LTE Modem SPEED: 433 Mbps at 5 GHz + 300 Mbps at 2.4 GHz, 4G Cat4 150/50 Mbps SPEC: 2× Antennas, 3× Fast Ethernet LAN Ports, 1× Fast Ethernet WAN/LAN Port, LTE-FDD/LTE-TDD/DC-HSPA+/HSPA+/HSPA/UMTS FEATURE: Tether App, Cloud Support, Parental Controls, QoS",
    "image": "images/wi-fi-router-archer-mr200-26.jpeg"
  },
  {
    "id": "wifi-router-027",
    "category": "wifi-router",
    "subcategory": "LTE/5G Router",
    "name": "Archer MR400",
    "price": 72.0,
    "desc": "AC1200 Wireless Dual Band 4G LTE Router Build-In 150Mbps 4G LTE Modem SPEED: 867 Mbps at 5 GHz + 300 Mbps at 2.4 GHz, 4G Cat4 150/50 Mbps SPEC: 2× Antennas, 3× Fast Ethernet LAN Ports, 1× Fast Ethernet WAN/LAN Port, LTE-FDD/LTE-TDD/DC-HSPA+/HSPA+/HSPA/UMTS FEATURE: Tether App, Cloud Support, Parental Controls, QoS",
    "image": "images/wi-fi-router-archer-mr400-27.jpeg"
  },
  {
    "id": "wifi-router-028",
    "category": "wifi-router",
    "subcategory": "LTE/5G Router",
    "name": "Archer MR500",
    "price": 104.4,
    "desc": "AC1200 4G LTE Advanced Cat6 Gigabit Router Build-In 300Mbps 4G+ LTE Advanced Modem SPEED: 867 Mbps at 5 GHz + 300 Mbps at 2.4 GHz, 4G+ Cat6 300/50 Mbps SPEC: 2× Antennas, 3× Gigabit LAN Ports, 1× Gigabit WAN/LAN Port, LTE-FDD/LTE-TDD/DC-HSPA+/HSPA+/HSPA/UMTS FEATURE: Tether App, WPA3, Cloud Support, Parental Controls, QoS, OneMesh",
    "image": "images/wi-fi-router-archer-mr500-28.jpeg"
  },
  {
    "id": "wifi-router-029",
    "category": "wifi-router",
    "subcategory": "LTE/5G Router",
    "name": "Archer MR600",
    "price": 115.2,
    "desc": "AC1200 4G LTE Advanced Cat6 Gigabit Router Build-In 300Mbps 4G+ LTE Advanced Modem SPEED: 867 Mbps at 5 GHz + 300 Mbps at 2.4 GHz, 4G+ Cat6 300/50 Mbps SPEC: 2× Antennas, 3× Gigabit LAN Ports, 1× Gigabit WAN/LAN Port, LTE-FDD/LTE-TDD/DC-HSPA+/HSPA+/HSPA/UMTS FEATURE: Tether App, Cloud Support, Parental Controls, QoS, OneMesh",
    "image": "images/wi-fi-router-archer-mr600-29.jpeg"
  },
  {
    "id": "wifi-router-030",
    "category": "wifi-router",
    "subcategory": "Mobile Wi-Fi",
    "name": "M7010",
    "price": 39.0,
    "desc": "150Mbps 4G LTE Mobile Wi-Fi Build-In 150Mbps 4G LTE Modem SPEED: 300 Mbps at 2.4 GHz, 4G Cat4 150/50 Mbps SPEC: LTE-FDD/LTE-TDD/HSPA+/UMTS FEATURE: tpMiFi App, 2000 mAH Rechargeable Battery",
    "image": "images/wi-fi-router-m7010-30.jpeg"
  },
  {
    "id": "wifi-router-031",
    "category": "wifi-router",
    "subcategory": "Mobile Wi-Fi",
    "name": "M7201",
    "price": 45.6,
    "desc": "150Mbps 4G LTE Mobile Wi-Fi Build-In 150Mbps 4G LTE Modem SPEED: 300 Mbps at 2.4 GHz, 4G Cat4 150/50 Mbps SPEC: LTE-FDD/LTE-TDD/DC-HSPA+/HSPA/UMTS, Qualcomm CPU FEATURE: tpMiFi App, 2000 mAH Rechargeable Battery",
    "image": "images/wi-fi-router-m7201-31.jpeg"
  },
  {
    "id": "mesh-001",
    "category": "mesh",
    "subcategory": "Wi-Fi 5 Mesh System",
    "name": "Deco S7(1-pack)",
    "price": 51.6,
    "desc": "AC1900 Whole Home Mesh Wi-Fi Unit SPEED: 600 Mbps at 2.4 GHz +1300 Mbps at 5 GHz SEPC: 3× Internal Antennas, 3× Gigabit Ports (WAN/LAN auto-sensing) FEATURE: Deco App, Router/AP Mode, IPv6, IPTV, Parental Controls, QoS, MU-MIMO, Beamforming, Alexa Supported",
    "image": "images/mesh-system-deco-s71-pack-1.jpeg"
  },
  {
    "id": "mesh-002",
    "category": "mesh",
    "subcategory": "Wi-Fi 5 Mesh System",
    "name": "Deco S7(2-pack)",
    "price": 99.6,
    "desc": "AC1900 Whole Home Mesh Wi-Fi Unit SPEED: 600 Mbps at 2.4 GHz +1300 Mbps at 5 GHz SEPC: 3× Internal Antennas, 3× Gigabit Ports (WAN/LAN auto-sensing) FEATURE: Deco App, Router/AP Mode, IPv6, IPTV, Parental Controls, QoS, MU-MIMO, Beamforming, Alexa Supported",
    "image": "images/mesh-system-deco-s72-pack-2.jpeg"
  },
  {
    "id": "mesh-003",
    "category": "mesh",
    "subcategory": "Wi-Fi 5 Mesh System",
    "name": "Deco S7(3-pack)",
    "price": 140.4,
    "desc": "AC1900 Whole Home Mesh Wi-Fi Unit SPEED: 600 Mbps at 2.4 GHz +1300 Mbps at 5 GHz SEPC: 3× Internal Antennas, 3× Gigabit Ports (WAN/LAN auto-sensing) FEATURE: Deco App, Router/AP Mode, IPv6, IPTV, Parental Controls, QoS, MU-MIMO, Beamforming, Alexa Supported",
    "image": "images/mesh-system-deco-s73-pack-3.jpeg"
  },
  {
    "id": "mesh-004",
    "category": "mesh",
    "subcategory": "Wi-Fi 6 Mesh System",
    "name": "Deco X10(1-pack)",
    "price": 50.4,
    "desc": "AX1500 Whole Home Mesh Wi-Fi 6 System SPEED: 300 Mbps at 2.4 GHz + 1201 Mbps at 5 GHz SPEC: Internal Antennas, 2× Gigabit Ports (WAN/LAN auto-sensing) FEATURE: Deco App, Router/AP Mode, IPv6, IPTV, HomeShield (Parental Controls, Antivirus, QoS, Reports), OFDMA, MU-MIMO, 1024-QAM, WPA3, Beamforming, Alexa and Google Assistant Supported",
    "image": "images/mesh-system-deco-x101-pack-4.jpeg"
  },
  {
    "id": "mesh-005",
    "category": "mesh",
    "subcategory": "Wi-Fi 6 Mesh System",
    "name": "Deco X10(2-pack)",
    "price": 96.0,
    "desc": "AX1500 Whole Home Mesh Wi-Fi 6 System SPEED: 300 Mbps at 2.4 GHz + 1201 Mbps at 5 GHz SPEC: Internal Antennas, 2× Gigabit Ports (WAN/LAN auto-sensing) FEATURE: Deco App, Router/AP Mode, IPv6, IPTV, HomeShield (Parental Controls, Antivirus, QoS, Reports), OFDMA, MU-MIMO, 1024-QAM, WPA3, Beamforming, Alexa and Google Assistant Supported",
    "image": "images/mesh-system-deco-x102-pack-5.jpeg"
  },
  {
    "id": "mesh-006",
    "category": "mesh",
    "subcategory": "Wi-Fi 6 Mesh System",
    "name": "Deco X10(3-pack)",
    "price": 147.6,
    "desc": "AX1500 Whole Home Mesh Wi-Fi 6 System SPEED: 300 Mbps at 2.4 GHz + 1201 Mbps at 5 GHz SPEC: Internal Antennas, 2× Gigabit Ports (WAN/LAN auto-sensing) FEATURE: Deco App, Router/AP Mode, IPv6, IPTV, HomeShield (Parental Controls, Antivirus, QoS, Reports), OFDMA, MU-MIMO, 1024-QAM, WPA3, Beamforming, Alexa and Google Assistant Supported",
    "image": "images/mesh-system-deco-x103-pack-6.jpeg"
  },
  {
    "id": "mesh-007",
    "category": "mesh",
    "subcategory": "Wi-Fi 6 Mesh System",
    "name": "Deco X20(1-pack)",
    "price": 62.4,
    "desc": "AX1800 Whole Home Mesh Wi-Fi 6 Unit SPEED: 574 Mbps at 2.4 GHz + 1201 Mbps at 5 GHz SPEC: Internal Antennas, 2× Gigabit Ports (WAN/LAN auto-sensing) FEATURE: Deco App, Router/AP Mode, IPv6, IPTV, HomeShield (Parental Controls, Antivirus, QoS, Reports), OFDMA, MU-MIMO, 1024-QAM, WPA3, Beamforming, Alexa and Google Assistant Supported",
    "image": "images/mesh-system-deco-x201-pack-7.jpeg"
  },
  {
    "id": "mesh-008",
    "category": "mesh",
    "subcategory": "Wi-Fi 6 Mesh System",
    "name": "Deco X20(2-pack)",
    "price": 123.6,
    "desc": "AX1800 Whole Home Mesh Wi-Fi 6 Unit SPEED: 574 Mbps at 2.4 GHz + 1201 Mbps at 5 GHz SPEC: Internal Antennas, 2× Gigabit Ports (WAN/LAN auto-sensing) FEATURE: Deco App, Router/AP Mode, IPv6, IPTV, HomeShield (Parental Controls, Antivirus, QoS, Reports), OFDMA, MU-MIMO, 1024-QAM, WPA3, Beamforming, Alexa and Google Assistant Supported",
    "image": "images/mesh-system-deco-x202-pack-8.jpeg"
  },
  {
    "id": "mesh-009",
    "category": "mesh",
    "subcategory": "Wi-Fi 6 Mesh System",
    "name": "Deco X20(3-pack)",
    "price": 182.4,
    "desc": "AX1800 Whole Home Mesh Wi-Fi 6 Unit SPEED: 574 Mbps at 2.4 GHz + 1201 Mbps at 5 GHz SPEC: Internal Antennas, 2× Gigabit Ports (WAN/LAN auto-sensing) FEATURE: Deco App, Router/AP Mode, IPv6, IPTV, HomeShield (Parental Controls, Antivirus, QoS, Reports), OFDMA, MU-MIMO, 1024-QAM, WPA3, Beamforming, Alexa and Google Assistant Supported",
    "image": "images/mesh-system-deco-x203-pack-9.jpeg"
  },
  {
    "id": "mesh-010",
    "category": "mesh",
    "subcategory": "Wi-Fi 6 Mesh System",
    "name": "Deco X50(1-pack)",
    "price": 79.2,
    "desc": "AC1200 Dual-Band Wi-Fi Router SPEED: 400 Mbps at 2.4 GHz + 867 Mbps at 5 GHz SPEC: 4× Antennas, 1× Gigabit WAN Port + 4× Gigabit LAN Ports FEATURE: Tether App, WPA3, Access Point Mode, IPv6 Supported, IPTV, Beamforming, Smart Connect, Airtime Fairness, MU-MIMO, Cloud Support, Agile Config, Easymesh (Compatible with Onemesh)",
    "image": "images/mesh-system-deco-x501-pack-10.jpeg"
  },
  {
    "id": "mesh-011",
    "category": "mesh",
    "subcategory": "Wi-Fi 6 Mesh System",
    "name": "Deco X50(2-pack)",
    "price": 156.0,
    "desc": "AC1200 Dual-Band Wi-Fi Router SPEED: 300 Mbps at 2.4 GHz + 867 Mbps at 5 GHz SPEC: 4× Antennas, 1× Gigabit WAN Port + 4× Gigabit LAN Ports FEATURE: Tether App, WPA3, Access Point Mode, IPv6 Supported, IPTV, Beamforming, MU-MIMO, Cloud Support, Easymesh (Compatible with Onemesh)",
    "image": "images/mesh-system-deco-x502-pack-11.jpeg"
  },
  {
    "id": "mesh-012",
    "category": "mesh",
    "subcategory": "Wi-Fi 6 Mesh System",
    "name": "Deco X50(3-pack)",
    "price": 228.0,
    "desc": "AC1900 Dual-Band Wi-Fi Router SPEED: 600 Mbps at 2.4 GHz + 1300 Mbps at 5 GHz SPEC:  4× Antennas, 1× Gigabit WAN Port + 4× Gigabit LAN Ports FEATURE: Tether App, WPA3, Access Point Mode, IPv6 Supported, IPTV, Beamforming, Smart Connect, Airtime Fairness, MU-MIMO, Cloud Support, Agile Config, Easymesh (Compatible with Onemesh)",
    "image": "images/mesh-system-deco-x503-pack-12.jpeg"
  },
  {
    "id": "mesh-013",
    "category": "mesh",
    "subcategory": "Wi-Fi 6 Mesh System",
    "name": "Deco X60(2-pack)",
    "price": 188.4,
    "desc": "AX5400 Whole Home Mesh Wi-Fi 6 System SPEED: 574 Mbps at 2.4 GHz + 4804 Mbps at 5 GHz SPEC: 4× Internal Antennas, 2× Gigabit Ports (WAN/LAN auto-sensing),  4 Streams and HE160 for 5 GHz FEATURE: Deco App, Router/AP Mode, IPv6, IPTV, HomeShield (Parental Controls, Antivirus, QoS, Reports), OFDMA, MU-MIMO, 1024-QAM, HE160, WPA3, Beamforming, Alexa and Google Assistant Supported",
    "image": "images/mesh-system-deco-x602-pack-13.jpeg"
  },
  {
    "id": "mesh-014",
    "category": "mesh",
    "subcategory": "Wi-Fi 6 Mesh System",
    "name": "Deco X60(3-pack)",
    "price": 288.0,
    "desc": "AX5400 Whole Home Mesh Wi-Fi 6 System SPEED: 574 Mbps at 2.4 GHz + 4804 Mbps at 5 GHz SPEC: 4× Internal Antennas, 2× Gigabit Ports (WAN/LAN auto-sensing),  4 Streams and HE160 for 5 GHz FEATURE: Deco App, Router/AP Mode, IPv6, IPTV, HomeShield (Parental Controls, Antivirus, QoS, Reports), OFDMA, MU-MIMO, 1024-QAM, HE160, WPA3, Beamforming, Alexa and Google Assistant Supported",
    "image": "images/mesh-system-deco-x603-pack-14.jpeg"
  },
  {
    "id": "mesh-015",
    "category": "mesh",
    "subcategory": "Wi-Fi 6 Mesh System",
    "name": "Deco X68(1-pack)",
    "price": 139.2,
    "desc": "AX3600 Whole Home Mesh Wi-Fi 6 Unit (Tri-Band) SPEED: 574 Mbps at 2.4 GHz + 1802 Mbps at 5 GHz-1 +1201 Mbps at 5 GHz-2 SPEC: 5× Internal Antennas, 2× Gigabit Ports (WAN/LAN auto-sensing), Broadcom 1.5 GHz Quad-core CPU FEATURE: Deco App, Router/AP Mode, IPv6, IPTV, HomeShield (Parental Controls, Antivirus, QoS, Reports), OFDMA, MU-MIMO, 1024-QAM, WPA3, Beamforming, Alexa Supported",
    "image": "images/mesh-system-deco-x681-pack-15.jpeg"
  },
  {
    "id": "mesh-016",
    "category": "mesh",
    "subcategory": "Wi-Fi 6 Mesh System",
    "name": "Deco X68(2-pack)",
    "price": 258.0,
    "desc": "AX3600 Whole Home Mesh Wi-Fi 6 Unit (Tri-Band) SPEED: 574 Mbps at 2.4 GHz + 1802 Mbps at 5 GHz-1 +1201 Mbps at 5 GHz-2 SPEC: 5× Internal Antennas, 2× Gigabit Ports (WAN/LAN auto-sensing), Broadcom 1.5 GHz Quad-core CPU FEATURE: Deco App, Router/AP Mode, IPv6, IPTV, HomeShield (Parental Controls, Antivirus, QoS, Reports), OFDMA, MU-MIMO, 1024-QAM, WPA3, Beamforming, Alexa Supported",
    "image": "images/mesh-system-deco-x682-pack-16.jpeg"
  },
  {
    "id": "mesh-017",
    "category": "mesh",
    "subcategory": "Wi-Fi 6 Mesh System",
    "name": "Deco XE75 Pro(3-pack)",
    "price": 416.4,
    "desc": "AXE5400 Whole Home Mesh Wi-Fi 6E System(Tri-Band) SPEED: 574 Mbps at 2.4 GHz + 2402 Mbps at 5 GHz + 2402 Mbps at 6 GHz SPEC: 4× Internal Antennas, 1× 2.5 Gigabit Port + 2× Gigabit Ports (WAN/LAN auto-sensing), HE160 for 5 GHz and 6 GHz FEATURE: Deco App, Router/AP Mode, IPv6, IPTV, HomeShield (Parental Controls, Antivirus, QoS, Reports), AI Mesh, OFDMA, MU-MIMO, 1024-QAM, HE160, WPA3, Beamforming, Alexa and Google Assistant Supported",
    "image": "images/mesh-system-deco-xe75-pro3-pack-17.jpeg"
  },
  {
    "id": "mesh-018",
    "category": "mesh",
    "subcategory": "Ceiling-Mount Mesh System",
    "name": "Deco X50-PoE(1-pack)",
    "price": 86.4,
    "desc": "AX1500 Wi-Fi 6 Router SPEED: 300 Mbps at 2.4 GHz + 1201 Mbps at 5 GHz SPEC: 4× Antennas, Broadcom 1.5 GHz Triple-Core CPU, 1× Gigabit WAN Port + 4× Gigabit LAN Ports, 1024-QAM, OFDMA FEATURE: Tether App, Access Point Mode, IPv6 Supported, IPTV, Beamforming, Smart Connect, Airtime Fairness, VPN Server, Cloud Support, Easymesh (Compatible with Onemesh)",
    "image": "images/mesh-system-deco-x50-poe1-pack-18.jpeg"
  },
  {
    "id": "mesh-019",
    "category": "mesh",
    "subcategory": "Ceiling-Mount Mesh System",
    "name": "Deco X50-PoE(2-pack)",
    "price": 169.2,
    "desc": "AX1800 Dual-Band Wi-Fi 6 Router SPEED: 574 Mbps at 2.4 GHz + 1201 Mbps at 5 GHz SPEC: 4× Antennas, Dual-Core CPU, 1× Gigabit WAN Port + 4× Gigabit LAN Ports,  1024-QAM, OFDMA FEATURE: Tether App, WPA3, Access Point Mode, IPv6 Supported, IPTV, Beamforming, Smart Connect, Airtime Fairness, VPN Server, Cloud Support, Easymesh (Compatible with Onemesh)",
    "image": "images/mesh-system-deco-x50-poe2-pack-19.jpeg"
  },
  {
    "id": "mesh-020",
    "category": "mesh",
    "subcategory": "Ceiling-Mount Mesh System",
    "name": "Deco X50-PoE(3-pack)",
    "price": 249.6,
    "desc": "AX1800 Dual-Band Wi-Fi 6 Router SPEED: 574 Mbps at 2.4 GHz + 1201 Mbps at 5 GHz SPEC: 4× Antennas, Dual-Core CPU, 1× Gigabit WAN Port + 4× Gigabit LAN Ports,  1024-QAM, OFDMA FEATURE: Tether App, WPA3, Access Point Mode, IPv6 Supported, IPTV, Beamforming, Smart Connect, Airtime Fairness, VPN Server, Cloud Support，Easymesh (Compatible with Onemesh)",
    "image": "images/mesh-system-deco-x50-poe3-pack-20.jpeg"
  },
  {
    "id": "mesh-021",
    "category": "mesh",
    "subcategory": "Outdoor Mesh System",
    "name": "Deco X50-Outdoor(1-pack)",
    "price": 104.4,
    "desc": "AX3000 Outdoor/Indoor Mesh Wi-Fi 6 Unit SPEED: 574 Mbps at 2.4 GHz + 2402 Mbps at 5 GHz SPEC: Internal Antennas, 2× Gigabit Ports (WAN/LAN auto-sensing), IP65, PoE and AC Power Supply FEATURE: Deco App, Router/AP Mode, IPv6, IPTV, HomeShield (Parental Controls, Antivirus, QoS, Reports), OFDMA, MU-MIMO, 1024-QAM, HE160, WPA3, Beamforming, Alexa and Google Assistant Supported, Multi-Scenario(Pole Mount, Wall Mount, Tabletop)",
    "image": "images/mesh-system-deco-x50-outdoor1-pack-21.jpeg"
  },
  {
    "id": "mesh-022",
    "category": "mesh",
    "subcategory": "Mesh System with BBA (5G, 4G, DSL)",
    "name": "Deco X20-DSL(1-pack)",
    "price": 108.0,
    "desc": "AX3000 Whole Home Mesh Wi-Fi 6 Modem Router SPEED: 574 Mbps at 2.4 GHz + 2402 Mbps at 5 GHz, VDSL Profile 35b 350/60 Mbps SPEC: Internal Antennas, 4× Gigabit Ports (WAN/LAN auto-sensing), 1× RJ11 DSL Port FEATURE: Deco App, Annex A/B, DSL/Router/AP Mode, IPv6, IPTV, HomeShield (Parental Controls, Antivirus, QoS, Reports), OFDMA, MU-MIMO, 1024-QAM, WPA3, Beamforming, Alexa Supported",
    "image": "images/mesh-system-deco-x20-dsl1-pack-22.jpeg"
  },
  {
    "id": "mesh-023",
    "category": "mesh",
    "subcategory": "Mesh System with BBA (5G, 4G, DSL)",
    "name": "Deco X50-DSL(1-pack)",
    "price": 122.4,
    "desc": "AX1800 Whole Home Mesh Wi-Fi 6 Modem Router SPEED: 574 Mbps at 2.4 GHz + 1201 Mbps at 5 GHz, VDSL Profile 35b 350/60 Mbps SPEC: Internal Antennas, 4× Gigabit Ports (WAN/LAN auto-sensing), 1× RJ11 Port FEATURE: Deco App, Annex A/B, DSL/Router/AP Mode, IPv6, IPTV, HomeShield (Parental Controls, Antivirus, QoS, Reports), OFDMA, MU-MIMO, 1024-QAM, WPA3, Beamforming, Alexa Supported",
    "image": "images/mesh-system-deco-x50-dsl1-pack-23.jpeg"
  },
  {
    "id": "access-point-001",
    "category": "access-point",
    "subcategory": "Wi-Fi 6 AP",
    "name": "EAP613 OEM",
    "price": 74.88,
    "desc": "AX1800 Ceiling Mount Dual-Band Wi-Fi 6 Access Point PORT:1× Gigabit RJ45 Port SPEED:574Mbps at  2.4 GHz + 1201 Mbps at 5 GHz FEATURE: 802.3at POE and 12V DC (Power Adapter is not included), 2×Internal Antennas, MU-MIMO, Seamless Roaming, Band Steering, Beamforming, Load Balance, Airtime Fairness, Centralized Management by Omada SDN Controller, Omada App",
    "image": "images/access-point-eap613-oem-1.jpeg"
  },
  {
    "id": "access-point-002",
    "category": "access-point",
    "subcategory": "Wi-Fi 6 AP",
    "name": "EAP613(5-pack)",
    "price": 374.4,
    "desc": "AX1800 Ceiling Mount Dual-Band Wi-Fi 6 Access Point PORT:1× Gigabit RJ45 Port SPEED:574Mbps at  2.4 GHz + 1201 Mbps at 5 GHz FEATURE: 802.3at POE and 12V DC (Power Adapter is not included), 2×Internal Antennas, MU-MIMO, Seamless Roaming, Band Steering, Beamforming, Load Balance, Airtime Fairness, Centralized Management by Omada SDN Controller, Omada App",
    "image": "images/access-point-eap6135-pack-2.jpeg"
  },
  {
    "id": "access-point-003",
    "category": "access-point",
    "subcategory": "Wi-Fi 6 AP",
    "name": "EAP613",
    "price": 90.48,
    "desc": "AX1800 Shift shiftga o'rnatiladigan ikki diapazonli Wi-Fi 6 kirish nuqtasi PORT: 1 × Gigabitli RJ45 port TEZLIK: 2,4 GGts + 5 GGts chastotasida 1201 Mbit/s FUNKSIYALAR: 802.3at POE va 12 V doimiy tok (quvvat adapteri komplektga kirmaydi), 2 × o'rnatilgan antenna, MU-MIMO, uzluksiz rouming, diapazonni boshqarish, nur shakllantirish, yuklamani muvozanatlash, efir vaqtini adolatli taqsimlash, Omada SDN kontrolleri yordamida markazlashgan boshqaruv, Omada ilovasi",
    "image": "images/access-point-eap613-3.jpeg"
  },
  {
    "id": "access-point-004",
    "category": "access-point",
    "subcategory": "Wi-Fi 6 AP",
    "name": "EAP610",
    "price": 93.6,
    "desc": "AX1800 Ceiling Mount Dual-Band Wi-Fi 6 Access Point PORT:1× Gigabit RJ45 Port SPEED:574Mbps at  2.4 GHz + 1201 Mbps at 5 GHz FEATURE: 802.3at POE and 12V DC, 2×Internal Antennas, MU-MIMO, Seamless Roaming, Band Steering, Beamforming, Load Balance, Airtime Fairness, Centralized Management by Omada SDN Controller, Omada App",
    "image": "images/access-point-eap610-4.jpeg"
  },
  {
    "id": "access-point-005",
    "category": "access-point",
    "subcategory": "Wi-Fi 6 AP",
    "name": "EAP620 HD",
    "price": 140.4,
    "desc": "AX1800 Ceiling Mount Dual-Band Wi-Fi 6 Access Point PORT:1× Gigabit RJ45 Port SPEED:574Mbps at  2.4 GHz + 1201 Mbps at 5 GHz FEATURE: High Density connectivity（1000+ Clients）, 802.3at POE and 12V DC, 2×Internal Antennas, MU-MIMO, Seamless Roaming, Band Steering, Beamforming, Load Balance, Airtime Fairness, Centralized Management by Omada SDN Controller, Omada App",
    "image": "images/access-point-eap620-hd-5.jpeg"
  },
  {
    "id": "access-point-006",
    "category": "access-point",
    "subcategory": "Wi-Fi 6 AP",
    "name": "EAP650",
    "price": 101.92,
    "desc": "AX3000 Ceiling Mount Dual-Band Wi-Fi 6 Access Point PORT:1× Gigabit RJ45 Port SPEED:574Mbps at  2.4 GHz + 2402 Mbps at 5 GHz FEATURE: 802.3at POE and 12V DC, 2×Internal Antennas, 160MHz  Supported, MU-MIMO, Seamless Roaming, Band Steering, Beamforming, Load Balance, Airtime Fairness, Centralized Management by Omada SDN Controller, Omada App",
    "image": "images/access-point-eap650-6.jpeg"
  },
  {
    "id": "access-point-007",
    "category": "access-point",
    "subcategory": "Wi-Fi 6 AP",
    "name": "EAP660 HD",
    "price": 224.64,
    "desc": "AX3600 Ceiling Mount Dual-Band Wi-Fi 6 Access Point PORT:1×2.5 Gigabit RJ45 Port SPEED:1148Mbps at  2.4 GHz + 2402 Mbps at 5 GHz FEATURE: High Density connectivity（1000+ Clients）, 802.3at POE and 12V DC, 8×Internal Antennas, MU-MIMO, Seamless Roaming, Band Steering, Beamforming, Load Balance, Airtime Fairness, Centralized Management by Omada SDN Controller, Omada App",
    "image": "images/access-point-eap660-hd-7.jpeg"
  },
  {
    "id": "access-point-008",
    "category": "access-point",
    "subcategory": "Wi-Fi 6 AP",
    "name": "EAP673",
    "price": 140.4,
    "desc": "AX5400 Ceiling Mount Dual-Band Wi-Fi 6 Access Point PORT: 1×2.5 Gigabit RJ45 Port SPEED:574Mbps at  2.4 GHz + 4804 Mbps at 5 GHz FEATURE: 802.3at POE and 12V DC (Power Adapter is not included), 6×Internal Antennas, MU-MIMO, 160MHz Supported, Seamless Roaming, Band Steering, Beamforming, Load Balance, Airtime Fairness, Centralized Management by Omada SDN Controller, Omada App",
    "image": "images/access-point-eap673-8.jpeg"
  },
  {
    "id": "access-point-009",
    "category": "access-point",
    "subcategory": "Wi-Fi 6 AP",
    "name": "EAP683 UR",
    "price": 135.2,
    "desc": "Omada  AX6000 Ceiling Mount Dual-Band Wi-Fi 6 Access Point PORT: 1×2.5G RJ45 Port SPEED:1148Mbps at  2.4 GHz + 4804 Mbps at 5 GHz FEATURE: 802.3at POE+ and 12V DC (Power Adapter is not included), 4×Internal Antennas, MU-MIMO, 160MHz Supported, Seamless Roaming, Band Steering, Beamforming, Load Balance, Airtime Fairness, ,Centralized Management by Omada SDN Controller, Omada App",
    "image": "images/access-point-eap683-ur-9.jpeg"
  },
  {
    "id": "access-point-010",
    "category": "access-point",
    "subcategory": "Wi-Fi 7 AP",
    "name": "EAP773",
    "price": 224.64,
    "desc": "Omada  BE9300 Ceiling Mount Tri-Band Wi-Fi 7 Access Point PORT: 1×10G RJ45 Port SPEED:574Mbps at  2.4 GHz + 2880 Mbps at 5 GHz+ 5760 Mbps at 6 GHz FEATURE: 802.3bt POE++ and 12V DC (Power Adapter is not included), 4×Internal Antennas, MU-MIMO, 320MHz Supported, Seamless Roaming, Band Steering, Beamforming, Load Balance, Airtime Fairness, MLO, 4K-QAM, Centralized Management by Omada SDN Controller, Omada App",
    "image": "images/access-point-eap773-10.jpeg"
  },
  {
    "id": "access-point-011",
    "category": "access-point",
    "subcategory": "Omada Hardware Controller",
    "name": "OC200",
    "price": 74.88,
    "desc": "Omada Hardware Controller PORT: 2× 10/100 Mbps Ethernet Ports, 1× USB 2.0 Port, 1× Micro USB Port FEATURE: Cloud Access, Centralized Management for up to 100 Omada EAPs + 20 Omada switchs + 10 Omada routers, Powered by 802.3af PoE or Micro-USB Power Adapter, Omada App",
    "image": "images/access-point-oc200-11.jpeg"
  },
  {
    "id": "access-point-012",
    "category": "access-point",
    "subcategory": "Omada Hardware Controller",
    "name": "OC300",
    "price": 264.16,
    "desc": "Omada Hardware Controller PORT: 2× 10/100/1000 Mbps Ethernet Ports, 1× USB 3.0 Port  FEATURE: Cloud Access, Centralized Management for up to 500 Omada EAPs + 100 Omada switchs + 100 Omada routers, Multi-site Management, Omada App, Metal casing, Rack-Mountable",
    "image": "images/access-point-oc300-12.jpeg"
  },
  {
    "id": "poe-switch-001",
    "category": "poe-switch",
    "subcategory": "Unmanaged/Easy Smart PoE Switch",
    "name": "TL-SG1210PP",
    "price": 118.8,
    "desc": "10-Port Gigabit Desktop Switch with 6-Port PoE+ and 2-Port PoE++ PORT: 2× Gigabit PoE++ Ports, 6× Gigabit PoE+ Ports, 2x Gigabit Non-PoE Ports, 1× Combo Gigabit SFP Slot SPEC: 802.3af/at/bt type3, 123 W PoE Power,  Desktop Steel Case FEATURE: Extend Mode for 250m PoE Transmitting for Port1-4, Priority Mode for Port1-2, Isolation Mode for Port1-4/5-8, PoE Auto Recovery for Port1-8, Plug and Play",
    "image": "images/poe-kommutator-tl-sg1210pp-1.jpeg"
  },
  {
    "id": "poe-switch-002",
    "category": "poe-switch",
    "subcategory": "Unmanaged/Easy Smart PoE Switch",
    "name": "TL-SG1210MPE",
    "price": 108.0,
    "desc": "10-Port Gigabit Easy Smart Switch with 8-Port PoE+ PORT: 8× Gigabit PoE+ Ports, 2x Gigabit Non-PoE Ports, 1× Combo Gigabit SFP Slot SPEC: 802.3at/af, 123 W PoE Power,  Desktop Steel Case FEATURE: PoE Auto Recovery, MTU/Port/Tag-based VLAN, QoS, IGMP Snooping, Web/Utility Management, Plug and Play",
    "image": "images/poe-kommutator-tl-sg1210mpe-2.jpeg"
  },
  {
    "id": "poe-switch-003",
    "category": "poe-switch",
    "subcategory": "Unmanaged/Easy Smart PoE Switch",
    "name": "TL-SG1218MPE",
    "price": 170.4,
    "desc": "18-Port Gigabit Easy Smart Switch with 16-Port PoE+ PORT: 16× Gigabit PoE+ Ports, 2× Gigabit Non-PoE Ports, 2× Combo Gigabit SFP Slots SPEC: 802.3at/af, 250 W PoE Power, 1U 19-inch Rack-mountable Steel Case FEATURE: PoE Auto Recovery, MTU/Port/Tag-based VLAN, QoS, IGMP Snooping, Web/Utility Management, Plug and Play",
    "image": "images/poe-kommutator-tl-sg1218mpe-3.jpeg"
  },
  {
    "id": "poe-switch-004",
    "category": "poe-switch",
    "subcategory": "Unmanaged/Easy Smart PoE Switch",
    "name": "TL-SG1428PE",
    "price": 214.8,
    "desc": "28-Port Gigabit Easy Smart Switch with 24-Port PoE+ PORT: 24× Gigabit PoE+ Ports, 2× Gigabit Non-PoE Ports, 2×  Gigabit SFP Slots SPEC: 802.3at/af, 250 W PoE Power, 1U 19-inch Rack-mountable Steel Case FEATURE: PoE Auto Recovery, MTU/Port/Tag-based VLAN, QoS, IGMP Snooping, Web/Utility Management, Plug and Play",
    "image": "images/poe-kommutator-tl-sg1428pe-4.jpeg"
  },
  {
    "id": "poe-switch-005",
    "category": "poe-switch",
    "subcategory": "L2+ Managed POE Switch",
    "name": "SG2210P",
    "price": 102.96,
    "desc": "Omada 8-Port Gigabit Smart PoE+ Switch with 2 SFP Slots PORT: 8× Gigabit PoE Ports, 2× Gigabit SFP Slots SPEC: 802.3at/af, 61 W PoE Power, Desktop Steel Case FEATURE: Centralized Managed by Omada SDN Controller, 802.1Q VLAN, STP/RSTP/MSTP, IGMP Snooping, 802.1p/DSCP QoS, ACL, 802.1x, Radius/Tacacs+ Authentication, LACP, CLI, SNMP, Dual Image, IPv6",
    "image": "images/poe-kommutator-sg2210p-5.jpeg"
  },
  {
    "id": "poe-switch-006",
    "category": "poe-switch",
    "subcategory": "L2+ Managed POE Switch",
    "name": "SG2210XMP-M2",
    "price": 280.8,
    "desc": "Omada 8-Port 2.5GBASE-T and 2-Port 10GE SFP+ Smart Switch with 8-Port PoE+ PORT: 8× 2.5G PoE+ Ports, 2× 10G SFP+ Slots SPEC: 802.3at/af, 160 W PoE Power, Desktop & Fanless Steel Case FEATURE: Centralized Managed by Omada SDN Controller, Static Routing, 802.1Q VLAN, STP/RSTP/MSTP, IGMP Snooping, 802.1p/DSCP QoS, ACL, 802.1x, Radius/Tacacs+ Authentication, LACP, CLI, SNMP, Dual Image, IPv6",
    "image": "images/poe-kommutator-sg2210xmp-m2-6.jpeg"
  },
  {
    "id": "poe-switch-007",
    "category": "poe-switch",
    "subcategory": "L2+ Managed POE Switch",
    "name": "SG3210XHP-M2",
    "price": 336.96,
    "desc": "Omada 8-Port PoE+ 2.5GBASE-T L2+ Managed Switch with 2 10GE SFP+ Slots PORT: 8× 2.5G PoE+ Ports, 2× 10G SFP+ Slots, RJ45/Micro-USB Console Port SPEC: 802.3at/af, 240 W PoE Power, 1U 19-inch Rack-mountable Steel Case FEATURE: Centralized Managed by Omada SDN Controller,Static Routing, OAM, DDM, sFlow, 802.1Q VLAN, QinQ, STP/RSTP/MSTP, IGMP Snooping, 802.1p/DSCP QoS, ACL, 802.1x, Radius/Tacacs+ Authentication, LACP, CLI, SNMP, Dual Image/Configuration, IPv6",
    "image": "images/poe-kommutator-sg3210xhp-m2-7.jpeg"
  },
  {
    "id": "poe-switch-008",
    "category": "poe-switch",
    "subcategory": "L2+ Managed POE Switch",
    "name": "SG2016P",
    "price": 149.76,
    "desc": "Omada  16-Port Gigabit Smart Switch with 8-Port PoE+ PORT: 8× Gigabit PoE+ Ports SPEC: 802.3at/af, 120 W PoE Power, Desktop Steel Case FEATURE: Centralized Managed by Omada SDN Controller, Static Routing, 802.1Q VLAN, STP/RSTP/MSTP, IGMP Snooping, 802.1p/DSCP QoS, ACL, 802.1x, Radius/Tacacs+ Authentication, LACP, CLI, SNMP, Dual Image, IPv6",
    "image": "images/poe-kommutator-sg2016p-8.jpeg"
  },
  {
    "id": "poe-switch-009",
    "category": "poe-switch",
    "subcategory": "L2+ Managed POE Switch",
    "name": "SG3218XP-M2",
    "price": 374.4,
    "desc": "Omada 16-Port 2.5GBASE-T and 2-Port 10GE SFP+ L2+ Managed Switch with 8-Port PoE+ PORT: 8× 2.5G PoE+ Ports, 8× 2.5G Non-PoE Ports, 2× 10G SFP+ Slots, RJ45/Micro-USB Console Port SPEC: 802.3at/af, 240 W PoE Power, 1U 19-inch Rack-mountable Steel Case FEATURE: Centralized Managed by Omada SDN Controller,Static Routing, OAM, DDM, 802.1Q VLAN, QinQ, STP/RSTP/MSTP, IGMP Snooping, 802.1p/DSCP QoS, ACL, 802.1x, Radius/Tacacs+ Authentication, LACP, CLI, SNMP, Dual Image/Configuration, IPv6",
    "image": "images/poe-kommutator-sg3218xp-m2-9.jpeg"
  },
  {
    "id": "poe-switch-010",
    "category": "poe-switch",
    "subcategory": "L2+ Managed POE Switch",
    "name": "SG2428P",
    "price": 271.44,
    "desc": "Omada 28-Port PoE+ Gigabit Smart Switch with 4 SFP Slots PORT: 24× Gigabit PoE+ Ports, 4× Gigabit SFP Slots SPEC: 802.3at/af, 250 W PoE Power, 1U 19-inch Rack-mountable Steel Case FEATURE: Centralized Managed by Omada SDN Controller, Static Routing, 802.1Q VLAN, STP/RSTP/MSTP, IGMP Snooping, 802.1p/DSCP QoS, ACL, 802.1x, Radius/Tacacs+ Authentication, LACP, CLI, SNMP, Dual Image, IPv6",
    "image": "images/poe-kommutator-sg2428p-10.jpeg"
  },
  {
    "id": "poe-switch-011",
    "category": "poe-switch",
    "subcategory": "L2+ Managed POE Switch",
    "name": "SG3428MP",
    "price": 355.68,
    "desc": "Omada 28-Port PoE+ Gigabit L2+ Managed Switch with 4 SFP Slots PORT: 24× Gigabit PoE+ Ports, 4× Gigabit SFP Slots, RJ45/Micro-USB Console Port SPEC: 802.3at/af, 384 W PoE Power, 1U 19-inch Rack-mountable Steel Case FEATURE: Centralized Managed by Omada SDN Controller,Static Routing, OAM, 802.1Q VLAN, QinQ, STP/RSTP/MSTP, IGMP Snooping, 802.1p/DSCP QoS, ACL, 802.1x, Radius/Tacacs+ Authentication, LACP, CLI, SNMP, Dual Image/Configuration, IPv6",
    "image": "images/poe-kommutator-sg3428mp-11.jpeg"
  },
  {
    "id": "poe-switch-012",
    "category": "poe-switch",
    "subcategory": "L2+ Managed POE Switch",
    "name": "SG3428XMP",
    "price": 411.84,
    "desc": "Omada 24-Port PoE+ Gigabit L2+ Managed Switch with 4 10GE SFP+ Slots PORT: 24× Gigabit PoE+ Ports, 4× 10G SFP+ Slots, RJ45/Micro-USB Console Port SPEC: 802.3at/af, 384 W PoE Power, 1U 19-inch Rack-mountable Steel Case FEATURE: Centralized Managed by Omada SDN Controller,Static Routing, OAM, DDM, sFlow, 802.1Q VLAN, QinQ, STP/RSTP/MSTP, IGMP Snooping, 802.1p/DSCP QoS, ACL, 802.1x, Radius/Tacacs+ Authentication, LACP, CLI, SNMP, Dual Image/Configuration, IPv6",
    "image": "images/poe-kommutator-sg3428xmp-12.jpeg"
  },
  {
    "id": "poe-switch-013",
    "category": "poe-switch",
    "subcategory": "L2+ Managed POE Switch",
    "name": "SG3428XPP-M2",
    "price": 430.56,
    "desc": "Omada 24-Port 2.5GBASE-T and 4-Port 10GE SFP+ L2+ Managed Switch with 16-Port PoE+ & 8-Port PoE++ PORT: 16× 2.5G PoE+ Ports, 8× 2.5G PoE++ Ports, 4× 10G SFP+ Slots, RJ45/Micro-USB Console Port SPEC: 802.3bt/at/af, 500 W PoE Power, 1U 19-inch Rack-mountable Steel Case FEATURE: Centralized Managed by Omada SDN Controller, Static Routing, OAM, DDM, 802.1Q VLAN, QinQ, STP/RSTP/MSTP, IGMP Snooping, 802.1p/DSCP QoS, ACL, 802.1x, Radius/Tacacs+ Authentication, LACP, CLI, SNMP, Dual Image/Configuration, IPv6",
    "image": "images/poe-kommutator-sg3428xpp-m2-13.jpeg"
  },
  {
    "id": "poe-switch-014",
    "category": "poe-switch",
    "subcategory": "L2+ Managed POE Switch",
    "name": "SG3452P",
    "price": 524.16,
    "desc": "Omada 52-Port Gigabit L2+ Managed Switch with 48-Port PoE+ PORT: 48× Gigabit PoE+ Ports, 4× Gigabit SFP Slots, RJ45/Micro-USB Console Port SPEC: 802.3at/af, 384 W PoE Power, 1U 19-inch Rack-mountable Steel Case FEATURE: Centralized Managed by Omada SDN Controller,Static Routing, 802.1Q VLAN, QinQ, STP/RSTP/MSTP, IGMP Snooping, 802.1p/DSCP QoS, ACL, 802.1x, Radius/Tacacs+ Authentication, LACP, CLI, SNMP, Dual Image/Configuration, IPv6",
    "image": "images/poe-kommutator-sg3452p-14.jpeg"
  },
  {
    "id": "poe-switch-015",
    "category": "poe-switch",
    "subcategory": "L2+ Managed POE Switch",
    "name": "SG3452XP",
    "price": 661.44,
    "desc": "Omada 48-Port PoE+ Gigabit L2+ Managed Switch with 4 10GE SFP+ Slots PORT: 48× Gigabit PoE+ Ports, 4× 10G SFP+ Slots, RJ45/Micro-USB Console Port SPEC: 802.3at/af, 500 W PoE Power, 1U 19-inch Rack-mountable Steel Case FEATURE: Centralized Managed by Omada SDN Controller,Static Routing, OAM, DDM, sFlow, 802.1Q VLAN, QinQ, STP/RSTP/MSTP, IGMP Snooping, 802.1p/DSCP QoS, ACL, 802.1x, Radius/Tacacs+ Authentication, LACP, CLI, SNMP, Dual Image/Configuration, IPv6",
    "image": "images/poe-kommutator-sg3452xp-15.jpeg"
  },
  {
    "id": "poe-switch-016",
    "category": "poe-switch",
    "subcategory": "L2+ Managed POE Switch",
    "name": "SG3452XMPP",
    "price": 702.0,
    "desc": "Omada 48-Port Gigabit and 4-Port 10GE SFP+ L2+ Managed Switch with 40-Port PoE+ & 8-Port PoE++ PORT: 40× Gigabit PoE+ Ports, 8×Gigabit PoE++ Ports (max 90W/port), 4× 10G SFP+ Slots, RJ45/Micro-USB Console Port SPEC: 802.3bt/at/af, 750 W PoE Power, 1U 19-inch Rack-mountable Steel Case FEATURE: Centralized Managed by Omada SDN Controller, Static Routing, OAM, DDM, sFlow, 802.1Q VLAN, QinQ, STP/RSTP/MSTP, IGMP Snooping, 802.1p/DSCP QoS, ACL, 802.1x, Radius/Tacacs+ Authentication, LACP, CLI, SNMP, Dual Image/Configuration, IPv6",
    "image": "images/poe-kommutator-sg3452xmpp-16.jpeg"
  },
  {
    "id": "mercusys-001",
    "category": "mercusys",
    "subcategory": "Wi-Fi Router",
    "name": "MR50G",
    "price": 29.0,
    "desc": "AC1900 Dual-Band Wi-Fi Gigabit Router SPEED: 600 Mbps at 2.4 GHz + 1300 Mbps at 5 GHz SPEC:  6× Fixed External Antennas, 2× Gigabit LAN Ports, 1× Gigabit WAN Port FEATURE: MERCUSYS APP, Router/Access Point Mode, WPS/Reset Button, IPTV, IPv6, Smart Connect, Beamforming, MU-MIMO, Parental Controls, Guest Network, TR-069, ISP Preset (Agile Config), Aginet ACS, Superadmin, EasyMesh",
    "image": "images/mercusys-mr50g-1.jpeg"
  },
  {
    "id": "mercusys-002",
    "category": "mercusys",
    "subcategory": "Wi-Fi Router",
    "name": "MR60X",
    "price": 28.0,
    "desc": "AX1500 Dual-Band Wi-Fi 6 Router SPEED: 300 Mbps at 2.4 GHz + 1201 Mbps at 5 GHz SPEC: 4× Fixed External Antennas, 2× Gigabit LAN Ports, 1× Gigabit WAN Port, 1024-QAM, OFDMA FEATURE: MERCUSYS APP, Router/Access Point Mode, WPS/Reset Button, IPTV, IPv6, Smart Connect, Beamforming, MU-MIMO, Parental Controls, Guest Network, WPA3, BSS Color, TWT, TR-069, ISP Preset (Agile Config), Aginet ACS, Superadmin, EasyMesh",
    "image": "images/mercusys-mr60x-2.jpeg"
  },
  {
    "id": "mercusys-003",
    "category": "mercusys",
    "subcategory": "Wi-Fi Router",
    "name": "MB115-4G",
    "price": 33.0,
    "desc": "N300 Wi-Fi 4G LTE Router, Build-In 150Mbps 4G LTE Modem SPEED: 300 Mbps at 2.4 GHz, 4G Cat4 150/50 Mbps SPEC: 2× Fixed External Antennas, 3× 10/100 Mbps LAN Port, 1× 10/100 Mbps WAN/LAN Port, FDD-LTE (B1/B3/B5/B7/B8/B20/B28), TDD-LTE (B38/B40), HSPA+/UMTS (B1/B5/B8) FEATURE: MERCUSYS APP, Nano SIM Card Plug and Play, 3G/4G Router/Wi-Fi Router Mode, IPTV, IPv6, Parental Controls",
    "image": "images/mercusys-mb115-4g-3.jpeg"
  },
  {
    "id": "mercusys-004",
    "category": "mercusys",
    "subcategory": "Wi-Fi Router",
    "name": "MB112-4G",
    "price": 33.0,
    "desc": "MB112-4G 4G LTE qo'llab-quvvatlaydigan N300 Wi-Fi router. 4G LTE — 150 Mbit/s gacha kiruvchi tezlik. Sozlash talab qilinmaydi — shunchaki SIM-kartani soling va ishlatishni boshlang. Wi-Fi tarmog'i — 300 Mbit/s gacha tezlik. Ko'plab ulanishlar — bir vaqtning o'zida Wi-Fi tarmog'iga 32 tagacha qurilma ulash imkoniyati. Zaxira ulanish — agar 4G tarmog'i mavjud bo'lmasa, qurilmani Ethernet kabeli orqali internetga ulash mumkin.",
    "image": "images/mercusys-mb112-4g-4.jpeg"
  },
  {
    "id": "mercusys-005",
    "category": "mercusys",
    "subcategory": "Wi-Fi Router",
    "name": "Halo H60X(3-pack)",
    "price": 77.5,
    "desc": "Texnik xususiyatlari: AX1500, 3 modulli komplekt (1× asosiy H60XR router + 2× H60XS sputnik), ikki diapazonli Wi-Fi 6 (802.11ax), 5 GGtsda 1201 Mbit/s gacha va 2.4 GGtsda 300 Mbit/s gacha tezlik, gigabitli portlar (asosiy modulda 3 ta WAN/LAN porti, sputniklarda 2 tadan LAN port), ichki antenna, MU-MIMO qo'llab-quvvatlash, OFDMA, Beamforming, WPA3 shifrlash, 12V adapterdan quvvatlanish. Xususiyatlari: Yagona tarmoq nomi (SSID) va parol bilan uzluksiz rouming, 550 m² gacha katta maydonni qamrab olish («o'lik zonalarni» yo'qotish), 100 dan ortiq qurilmani bir vaqtda ulash, ota-ona nazorati (profillar, saytlarni bloklash, vaqt cheklovi), ma'lumotlarni ustuvorlashtirish (QoS), mehmon tarmog'i, MERCUSYS App mobil ilovasi orqali oddiy boshqaruv va sozlash.",
    "image": "images/mercusys-halo-h60x3-pack-5.jpeg"
  },
  {
    "id": "mercusys-006",
    "category": "mercusys",
    "subcategory": "Wi-Fi Router",
    "name": "Halo H60X(1-pack)",
    "price": 29.37,
    "desc": "Texnik xususiyatlari: AX1500, komplektda 1 modul (asosiy H60XR router), ikki diapazonli Wi-Fi 6 (802.11ax), 5 GGtsda 1201 Mbit/s gacha va 2.4 GGtsda 300 Mbit/s gacha tezlik, avtomatik aniqlovchi 3 ta gigabitli WAN/LAN port (10/100/1000 Mbit/s), ichki antenna, MU-MIMO qo'llab-quvvatlash, OFDMA, Beamforming, WPA3 shifrlash, 12V adapterdan quvvatlanish. Xususiyatlari: 230 m² gacha maydonni qamrab olish («o'lik zonalarni» yo'qotish), 100 dan ortiq qurilmani bir vaqtda ulash, Halo seriyasidagi boshqa modullarni qo'shganda uzluksiz Mesh tarmoq yaratish imkoniyati, ota-ona nazorati (profillar, saytlarni bloklash, vaqt cheklovi), ma'lumotlarni ustuvorlashtirish (QoS), mehmon tarmog'i, MERCUSYS App mobil ilovasi orqali oddiy boshqaruv va sozlash.",
    "image": "images/mercusys-halo-h60x1-pack-6.jpeg"
  },
  {
    "id": "mercusys-007",
    "category": "mercusys",
    "subcategory": "Wi-Fi Router",
    "name": "Halo H50G(3-pack)",
    "price": 77.5,
    "desc": "Texnik xususiyatlari: AC1900, komplektda 3 ta modul, ikki diapazonli Wi-Fi 5 (802.11ac), 5 GGtsda 1300 Mbit/s gacha va 2.4 GGtsda 600 Mbit/s gacha tezlik, har bir modulda avtomatik aniqlovchi 3 ta gigabitli WAN/LAN port (10/100/1000 Mbit/s), 3×3 MU-MIMO qo'llab-quvvatlash, Beamforming, WPA-PSK/WPA2-PSK shifrlash, 12V adapterdan quvvatlanish. Xususiyatlari: Yagona tarmoq nomi (SSID) va parol bilan uzluksiz rouming (802.11k/v/r standartlari), 550 m² gacha katta maydonni qamrab olish («o'lik zonalarni» yo'qotish), 100 dan ortiq qurilmani bir vaqtda ulash, ota-ona nazorati (saytlarni bloklash, profillar, vaqt cheklovi), ma'lumotlarni ustuvorlashtirish (QoS), mehmon tarmog'i, MERCUSYS App mobil ilovasi orqali oddiy boshqaruv va sozlash.",
    "image": "images/mercusys-halo-h50g3-pack-7.jpeg"
  },
  {
    "id": "mercusys-008",
    "category": "mercusys",
    "subcategory": "Wi-Fi Router",
    "name": "Halo H30G(3-pack)",
    "price": 75.62,
    "desc": "Texnik xususiyatlari: AC1200, komplektda 3 ta modul, ikki diapazonli Wi-Fi 5 (802.11ac), 5 GGtsda 867 Mbit/s gacha va 2.4 GGtsda 300 Mbit/s gacha tezlik, har bir modulda avtomatik aniqlovchi 2 ta gigabitli WAN/LAN port (10/100/1000 Mbit/s), 2×2 MU-MIMO qo'llab-quvvatlash, Beamforming, WPA-PSK/WPA2-PSK shifrlash, 9V adapterdan quvvatlanish. Xususiyatlari: Yagona tarmoq nomi (SSID) va parol bilan uzluksiz rouming (802.11k/v/r standartlari), 320 m² gacha katta maydonni qamrab olish («o'lik zonalarni» yo'qotish), 100 tagacha qurilmani bir vaqtda ulash, ota-ona nazorati (saytlarni bloklash, profillar, vaqt cheklovi), ma'lumotlarni ustuvorlashtirish (QoS), mehmon tarmog'i, MERCUSYS App mobil ilovasi orqali oddiy boshqaruv va sozlash.",
    "image": "images/mercusys-halo-h30g3-pack-8.jpeg"
  },
  {
    "id": "mercusys-009",
    "category": "mercusys",
    "subcategory": "Wi-Fi Router",
    "name": "Halo H30G(2-pack)",
    "price": 50.62,
    "desc": "Texnik xususiyatlari: AC1200, komplektda 2 ta modul, ikki diapazonli Wi-Fi 5 (802.11ac), 5 GGtsda 867 Mbit/s gacha va 2.4 GGtsda 300 Mbit/s gacha tezlik, har bir modulda avtomatik aniqlovchi 2 ta gigabitli WAN/LAN port (10/100/1000 Mbit/s), 2×2 MU-MIMO qo'llab-quvvatlash, Beamforming, WPA-PSK/WPA2-PSK shifrlash, 9V adapterdan quvvatlanish. Xususiyatlari: Yagona tarmoq nomi (SSID) va parol bilan uzluksiz rouming (802.11k/v/r standartlari), 260 m² gacha maydonni qamrab olish («o'lik zonalarni» yo'qotish), 100 tagacha qurilmani bir vaqtda ulash, ota-ona nazorati (saytlarni bloklash, profillar, vaqt cheklovi), ma'lumotlarni ustuvorlashtirish (QoS), mehmon tarmog'i, MERCUSYS App mobil ilovasi orqali oddiy boshqaruv va sozlash.",
    "image": "images/mercusys-halo-h30g2-pack-9.jpeg"
  },
  {
    "id": "mercusys-010",
    "category": "mercusys",
    "subcategory": "Wi-Fi Router",
    "name": "MR80X",
    "price": 38.12,
    "desc": "Texnik xususiyatlari: AX3000, Wi-Fi 6 standarti (802.11ax), 5 GGtsda 2402 Mbit/s gacha va 2.4 GGtsda 574 Mbit/s gacha tezlik, ikki yadroli Qualcomm protsessori, 5 dBi yuqori kuchaytirish koeffitsientiga ega 4 ta tashqi statsionar antenna, 1 gigabitli WAN port + 3 ta gigabitli LAN port (10/100/1000 Mbit/s), 2×2 MU-MIMO qo'llab-quvvatlash, OFDMA, Beamforming, kanal kengligi 160 MGts, WPA3 shifrlash. Xususiyatlari: Smart Connect (har bir qurilma uchun optimal diapazonni avtomatik tanlash), EasyMesh qo'llab-quvvatlash (mos qurilmalar bilan uzluksiz tarmoq yaratish), BSS Coloring (qo'shni Wi-Fi tarmoqlaridan halaqitni kamaytirish), Target Wake Time (TWT — mobil gadjetlarning quvvat sarfini kamaytirish), ota-ona nazorati, mehmon tarmog'i, ustuvorlashtirish (QoS), kirish nuqtasi rejimi, MERCUSYS App mobil ilovasi yoki veb-interfeys orqali sozlash.",
    "image": "images/mercusys-mr80x-10.jpeg"
  },
  {
    "id": "mercusys-011",
    "category": "mercusys",
    "subcategory": "Wi-Fi Router",
    "name": "ME80X",
    "price": 36.25,
    "desc": "Texnik xususiyatlari: AX3000, Wi-Fi 6 standarti (802.11ax), 5 GGtsda 2402 Mbit/s gacha va 2.4 GGtsda 574 Mbit/s gacha tezlik, 1 gigabitli Ethernet porti (10/100/1000 Mbit/s), 2 ta tashqi sozlanadigan yuqori kuchaytirish koeffitsientli antenna, OFDMA qo'llab-quvvatlash, MU-MIMO, Beamforming, WPA3 shifrlash, to'g'ridan-to'g'ri rozetkadan quvvatlanish (13 Vt gacha quvvat sarfi). Xususiyatlari: Ikki ish rejimi (Signal kuchaytirgich / Kirish nuqtasi), EasyMesh texnologiyasini qo'llab-quvvatlash (mos routerlar bilan uzluksiz Mesh tarmoq yaratish), barcha Wi-Fi routerlar bilan universal moslik, WPS tugmasi bilan bir bosishda tezkor sozlash, eng qulay o'rnatish joyini topish uchun aqlli LED signal indikatori, MERCUSYS App mobil ilovasi orqali masofadan boshqarish.",
    "image": "images/mercusys-me80x-11.jpeg"
  },
  {
    "id": "mercusys-012",
    "category": "mercusys",
    "subcategory": "Wi-Fi Router",
    "name": "ME60X",
    "price": 25.0,
    "desc": "Texnik xususiyatlari: AX1500, Wi-Fi 6 standarti (802.11ax), 5 GGtsda 1201 Mbit/s gacha va 2.4 GGtsda 300 Mbit/s gacha tezlik, 1 gigabitli Ethernet porti (10/100/1000 Mbit/s), 2 ta tashqi statsionar yuqori kuchaytirish koeffitsientli antenna, OFDMA qo'llab-quvvatlash, MU-MIMO, Beamforming, WPA3 shifrlash, to'g'ridan-to'g'ri rozetkadan quvvatlanish. Xususiyatlari: Ikki ish rejimi (Signal kuchaytirgich / Kirish nuqtasi), EasyMesh texnologiyasini qo'llab-quvvatlash (mos routerlar bilan uzluksiz Mesh tarmoq yaratish), barcha Wi-Fi routerlar bilan universal moslik, WPS tugmasi bilan bir bosishda tezkor sozlash, eng qulay o'rnatish joyini topish uchun aqlli LED signal indikatori, MERCUSYS App mobil ilovasi orqali masofadan boshqarish.",
    "image": "images/mercusys-me60x-12.jpeg"
  },
  {
    "id": "ezviz-001",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-H1C   (1080P)",
    "price": 30.0,
    "desc": "Rezolyutsiya 1080p. 108° keng burchakli ob'ektiv. 10 m (32 fut) masofagacha infraqizil tungi ko'rish. Harakatni aniqlash. Uchta ovozli ogohlantirish rejimi. Maxfiylikni himoya qiluvchi uyqu rejimi. Ikki tomonlama suhbat. Magnit asos yordamida o'rnatiladi. microSD kartani qo'llab-quvvatlaydi (512 GB gacha hajmda).",
    "image": "images/ezviz-kameralar-cs-h1c-1080p-1.png"
  },
  {
    "id": "ezviz-002",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-H6C pro   (1080P)",
    "price": 30.0,
    "desc": "Rezolyutsiya 1080p. Panoramali ko'rinish. Patrul rejimi. Sensorli chaqiruv tugmasi. Aqlli rangli tungi ko'rish. Inson shaklini aqlli aniqlash. Avtomatik kuzatish. Baland shovqinni aniqlash. Ikki tomonlama suhbat. MicroSD kartani qo'llab-quvvatlaydi (512 GB gacha).",
    "image": "images/ezviz-kameralar-cs-h6c-pro-1080p-2.png"
  },
  {
    "id": "ezviz-003",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-H6C pro     (4MP)",
    "price": 40.0,
    "desc": "Rezolyutsiya 4MP 2K+. Panoramali ko'rinish. Patrul rejimi. Sensorli chaqiruv tugmasi. Aqlli rangli tungi ko'rish. Inson shaklini aqlli aniqlash. Avtomatik kuzatish. Baland shovqinni aniqlash. Ikki tomonlama suhbat. MicroSD kartani qo'llab-quvvatlaydi (512 GB gacha).",
    "image": "images/ezviz-kameralar-cs-h6c-pro-4mp-3.png"
  },
  {
    "id": "ezviz-004",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-H6C pro     (8MP)",
    "price": 55.0,
    "desc": "Rezolyutsiya 8MP 4K. Panoramali ko'rinish. Patrul rejimi. Sensorli chaqiruv tugmasi. Aqlli rangli tungi ko'rish. Inson shaklini aqlli aniqlash. Avtomatik kuzatish. Baland shovqinni aniqlash. Ikki tomonlama suhbat. MicroSD kartani qo'llab-quvvatlaydi (512 GB gacha).",
    "image": "images/ezviz-kameralar-cs-h6c-pro-8mp-4.png"
  },
  {
    "id": "ezviz-005",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-C6N G1          (5MP)",
    "price": 40.0,
    "desc": "Rezolyutsiya 5MP 3K. Panoramali ko'rinish. Patrul rejimi. Sensorli chaqiruv tugmasi. Aqlli rangli tungi ko'rish. Inson shaklini aqlli aniqlash. Avtomatik kuzatish. Baland shovqinni aniqlash. Ikki tomonlama suhbat. MicroSD kartani qo'llab-quvvatlaydi (512 GB gacha).",
    "image": "images/ezviz-kameralar-cs-c6n-g1-5mp-5.png"
  },
  {
    "id": "ezviz-006",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-C6N G1          (8MP)",
    "price": 50.0,
    "desc": "Rezolyutsiya 8MP 4K. Panoramali ko'rinish. Patrul rejimi. Sensorli chaqiruv tugmasi. Aqlli rangli tungi ko'rish. Inson shaklini aqlli aniqlash. Avtomatik kuzatish. Baland shovqinni aniqlash. Ikki tomonlama suhbat. MicroSD kartani qo'llab-quvvatlaydi (512 GB gacha).",
    "image": "images/ezviz-kameralar-cs-c6n-g1-8mp-6.png"
  },
  {
    "id": "ezviz-007",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-H7C   (4MP)",
    "price": 52.0,
    "desc": "4MP 2K⁺ va 4MP 2K⁺ qo'sh ob'ektiv. Panoramali ko'rinish. Sensorli tugma orqali ikki tomonlama chaqiruv. Aqlli rangli tungi ko'rish. Sun'iy intellekt yordamida inson shaklini aniqlash. Baland shovqinni aniqlash. Avtomatik xavfsizlik uchun ikkita patrul rejimi. Ikki diapazonli Wi-Fi 6 ni qo'llab-quvvatlaydi (2,4/5 GGts). MicroSD kartani qo'llab-quvvatlaydi (512 GB gacha).",
    "image": "images/ezviz-kameralar-cs-h7c-4mp-7.png"
  },
  {
    "id": "ezviz-008",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-S10                (4MP)",
    "price": 125.0,
    "desc": "4 dyuymli sensorli ekran. IK-tungi ko'rish (10 m / 33 futgacha). Elektron albom. Bluetooth-dinamik. Himoya pardasi. WDR. Ikki diapazonli Wi-Fi 6 ni qo'llab-quvvatlaydi (2,4/5 GGts)². MicroSD kartalarini qo'llab-quvvatlaydi (512 GB gacha).",
    "image": "images/ezviz-kameralar-cs-s10-4mp-8.png"
  },
  {
    "id": "ezviz-009",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-E4p   (6MP)",
    "price": 105.0,
    "desc": "3K⁺ rezolyutsiya. 360° panoramali ko'rinish. IK-tungi ko'rish (10 m / 33 futgacha). Bir nechta bo'lingan ekranli ko'rish rejimlari. SI yordamida inson shaklini aniqlash. Baland shovqinni aniqlash. Ikki tomonlama suhbat. Maxfiylikni himoya qiluvchi uyqu rejimi. MicroSD kartalarini qo'llab-quvvatlaydi (512 GB gacha).",
    "image": "images/ezviz-kameralar-cs-e4p-6mp-9.png"
  },
  {
    "id": "ezviz-010",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-C7 Dual (4MP)",
    "price": 65.0,
    "desc": "2K⁺ va 2K⁺ qo'sh linza. Panoramali ko'rinish. Imo-ishoralarni aniqlash orqali ikki tomonlama aloqa. Sun'iy intellekt yordamida inson va uy hayvonlari shaklini aniqlash. Avtomatik qo'riqlash uchun ikkita patrul rejimi. IK-tungi ko'rish (33 fut / 10 m gacha). Maxfiylikni himoya qiluvchi uyqu rejimi. Ikki diapazonli Wi-Fi 6 ni qo'llab-quvvatlaydi (2,4/5 GGts)¹. MicroSD kartalarini qo'llab-quvvatlaydi (512 GB gacha).",
    "image": "images/ezviz-kameralar-cs-c7-dual-4mp-10.png"
  },
  {
    "id": "ezviz-011",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-C60P  (3MP)",
    "price": 52.0,
    "desc": "3MP 2K va 3MP 2K qo'sh ob'ektiv. Panoramali ko'rinish. Sensorli tugma orqali ikki tomonlama chaqiruv. Aqlli rangli tungi ko'rish. Sun'iy intellekt yordamida inson shaklini aniqlash. Baland shovqinni aniqlash. Avtomatik xavfsizlik uchun ikkita patrul rejimi. Ikki diapazonli Wi-Fi 6 ni qo'llab-quvvatlaydi (2,4/5 GGts). MicroSD kartani qo'llab-quvvatlaydi (512 GB gacha).",
    "image": "images/ezviz-kameralar-cs-c60p-3mp-11.png"
  },
  {
    "id": "ezviz-012",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-H4 (3MP)",
    "price": 40.0,
    "desc": "Rezolyutsiya 2K. Sun'iy intellekt asosida inson/transport vositasi shaklini aniqlash. Sirena va stroboskop bilan faol himoya. Rangli tungi ko'rish, Takomillashtirilgan tovush qabul qilgich (15 metrgacha). Ikki tomonlama suhbat. Sozlanadigan ovozli ogohlantirishlar. IP67 har qanday ob-havoga mos dizayn. MicroSD kartani qo'llab-quvvatlaydi (512 GB gacha).",
    "image": "images/ezviz-kameralar-cs-h4-3mp-12.png"
  },
  {
    "id": "ezviz-013",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-H6     (5MP)",
    "price": 55.0,
    "desc": "Rezolyutsiya 5MP 3K. Panoramali ko'rinish. Starlight linzali rangli ko'rish. Sun'iy intellekt yordamida inson va uy hayvonlari shaklini aniqlash. Avtomatik masshtab kuzatuvi. Baland shovqinni aniqlash. Ikki tomonlama chaqiruv. Maxfiylik uchun parda. microSD kartani qo'llab-quvvatlaydi (512 GB gacha hajmda).",
    "image": "images/ezviz-kameralar-cs-h6-5mp-13.png"
  },
  {
    "id": "ezviz-014",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-C6c 8MP  4K",
    "price": 70.0,
    "desc": "Rezolyutsiya 4K. Panoramali ko'rinish. Aqlli rangli tungi ko'rish. Sun'iy intellekt yordamida inson va uy hayvonlari shaklini aniqlash. Avtomatik masshtab kuzatuvi. Imo-ishoralarni aniqlash orqali ikki tomonlama chaqiruv. Ikki diapazonli Wi-Fi 6 ni qo'llab-quvvatlaydi (2,4/5 GGts). microSD kartani qo'llab-quvvatlaydi (512 GB gacha hajmda).",
    "image": "images/ezviz-kameralar-cs-c6c-8mp-4k-14.png"
  },
  {
    "id": "ezviz-015",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-H5  (3MP) 4G",
    "price": 55.0,
    "desc": "4G tarmog'iga ulanishni qo'llab-quvvatlaydi. 2K rezolyutsiya. Sun'iy intellekt yordamida inson/transport vositasi shaklini aniqlash. Ikki tomonlama suhbat. Rangli tungi ko'rish. Sirena va stroboskop bilan faol himoya². Har qanday ob-havoga chidamli IP67 korpus. MicroSD kartalarini qo'llab-quvvatlaydi (512 GB gacha).",
    "image": "images/ezviz-kameralar-cs-h5-3mp-4g-15.png"
  },
  {
    "id": "ezviz-016",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-H3   (5MP)",
    "price": 60.0,
    "desc": "Rezolyutsiya 3K, Sun'iy intellekt yordamida inson/transport vositasi shaklini aniqlash, Rangli tungi ko'rish, Faol himoya, Sozlanadigan aniqlash zonasi, sozlanadigan ovozli ogohlantirishlar, Yuqori mustahkamlikdagi alyuminiy qotishmadan yasalgan korpus, atmosfera ta'siridan himoya IP67, Ikki tomonlama aloqa, H.265 video texnologiyasi, MicroSD kartalarini qo'llab-quvvatlash¹ (512 GB gacha).",
    "image": "images/ezviz-kameralar-cs-h3-5mp-16.png"
  },
  {
    "id": "ezviz-017",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-H3c  (1080P)",
    "price": 40.0,
    "desc": "Rezolyutsiya 1080p. Sun'iy intellekt yordamida inson shaklini aniqlash. Tovush qabul qilgich. Infraqizil tungi ko'rish (30 m / 98 futgacha). microSD kartalarini qo'llab-quvvatlaydi (512 GB gacha). H.265 video texnologiyasi.",
    "image": "images/ezviz-kameralar-cs-h3c-1080p-17.png"
  },
  {
    "id": "ezviz-018",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-H3c  (1080p) color",
    "price": 45.0,
    "desc": "Rezolyutsiya 1080p. Rangli tungi ko'rish. Sun'iy intellekt yordamida inson shaklini aniqlash. Tovush qabul qilgich. Stroboskopli faol himoya. microSD kartani qo'llab-quvvatlaydi (512 GB gacha hajmda).",
    "image": "images/ezviz-kameralar-cs-h3c-1080p-color-18.png"
  },
  {
    "id": "ezviz-019",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-H3c  (3MP) color",
    "price": 50.0,
    "desc": "Rezolyutsiya 2K. Rangli tungi ko'rish. Ikki tomonlama suhbat. Sun'iy intellekt yordamida inson shaklini aniqlash. Sozlanadigan aniqlash zonasi. Sozlanadigan ovozli ogohlantirishlar. Sirena va stroboskop bilan faol himoya. microSD kartani qo'llab-quvvatlaydi (512 GB gacha hajmda). Google Assistant bilan aqlli integratsiya, Amazon Alexa va IFTTT.",
    "image": "images/ezviz-kameralar-cs-h3c-3mp-color-19.png"
  },
  {
    "id": "ezviz-020",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-H3c  (4MP) color",
    "price": 52.0,
    "desc": "Rezolyutsiya 2K+. Rangli tungi ko'rish. Ikki tomonlama suhbat. Sun'iy intellekt yordamida inson shaklini aniqlash. Sozlanadigan aniqlash zonasi. Sozlanadigan ovozli ogohlantirishlar. Sirena va stroboskop bilan faol himoya. microSD kartani qo'llab-quvvatlaydi (512 GB gacha hajmda). Google Assistant bilan aqlli integratsiya, Amazon Alexa va IFTTT.",
    "image": "images/ezviz-kameralar-cs-h3c-4mp-color-20.png"
  },
  {
    "id": "ezviz-021",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-CB1  (1080P)",
    "price": 60.0,
    "desc": "Rezolyutsiya 1080p. 5 m (16 fut) masofagacha infraqizil tungi ko'rish. Inson harakatini aqlli aniqlash. 40 kungacha avtonom ishlash vaqti (1600 mAh quvvatli akkumulyator batareyasi). Magnit asos yordamida o'rnatiladi. Ikki tomonlama suhbat. Maxfiylikni himoya qiluvchi uyqu rejimi. microSD kartani qo'llab-quvvatlaydi (512 GB gacha hajmda).",
    "image": "images/ezviz-kameralar-cs-cb1-1080p-21.png"
  },
  {
    "id": "ezviz-022",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-CB2   (2MP)",
    "price": 80.0,
    "desc": "Rezolyutsiya 1080p, 5 m (16 fut) masofagacha IK tungi ko'rish kamerasi, Inson harakatini aqlli aniqlash, ikki tomonlama aloqa, 50 kungacha¹ avtonom ishlash vaqti (2000 mAh quvvatli akkumulyator), Kaft o'lchamidagi kamera, magnit asosga o'rnatiladi, microSD kartalarini qo'llab-quvvatlaydi (256 GB gacha)³.",
    "image": "images/ezviz-kameralar-cs-cb2-2mp-22.png"
  },
  {
    "id": "ezviz-023",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-CB2   (3MP)  4G",
    "price": 90.0,
    "desc": "4G aloqa. Rezolyutsiya 2K. Doimiy video rejimi. Sun'iy intellekt yordamida inson shaklini aniqlash. Kadr-kadr suratga olish. 2000 mAh quvvatli akkumulyator batareyasi. Magnit asos. EZVIZ Power Partner bilan ishlaydi. Ikki tomonlama suhbat. IK-tungi ko'rish (8 m / 26 futgacha). MicroSD kartalarini qo'llab-quvvatlaydi (512 GB gacha).",
    "image": "images/ezviz-kameralar-cs-cb2-3mp-4g-23.png"
  },
  {
    "id": "ezviz-024",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-EB3   (3MP)",
    "price": 115.0,
    "desc": "Rezolyutsiya 2K, 120 kungacha¹ avtonom ishlash (5200 mAh), Inson harakatini aqlli aniqlash, Rangli tungi ko'rish, Atmosfera ta'siridan himoya, Sirena va stroboskop bilan faol himoya, Ikki tomonlama suhbat, Sozlanadigan ovozli ogohlantirishlar, H.265 video texnologiyasi, Akkumulyatorni zaryadlash uchun EZVIZ³ quyosh paneli bilan ishlaydi, microSD xotira kartasini qo'llab-quvvatlaydi (256 GB gacha).",
    "image": "images/ezviz-kameralar-cs-eb3-3mp-24.png"
  },
  {
    "id": "ezviz-025",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-EB3 4G  (3MP)",
    "price": 120.0,
    "desc": "Rezolyutsiya 2K, 5200 mAh quvvatli litiy akkumulyator batareyasi, Supports 4G Network Connectivity, Rangli tungi ko'rish. Inson harakatini aqlli aniqlash, Rangli tungi ko'rish, Atmosfera ta'siridan himoya, Sirena va stroboskop bilan faol himoya, Ikki tomonlama suhbat, Sozlanadigan ovozli ogohlantirishlar, H.265 video texnologiyasi, Akkumulyatorni zaryadlash uchun EZVIZ³ quyosh paneli bilan ishlaydi, microSD xotira kartasini qo'llab-quvvatlaydi (256 GB gacha).",
    "image": "images/ezviz-kameralar-cs-eb3-4g-3mp-25.png"
  },
  {
    "id": "ezviz-026",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-EB5 4K",
    "price": 150.0,
    "desc": "Rezolyutsiya 4K. Doimiy video rejimi. O'rnatilgan quyosh paneli quvvati 1,4 Vt. 10400 mAh quvvatli katta batareya (quyosh quvvatisiz 180 kungacha)². Inson/transport vositasi shaklini aniqlash. Rangli tungi ko'rish. Ikki tomonlama suhbat. Wi-Fi 6 tarmog'ini qo'llab-quvvatlaydi (2,4 GGts). MicroSD kartalarini qo'llab-quvvatlaydi (512 GB gacha).",
    "image": "images/ezviz-kameralar-cs-eb5-4k-26.png"
  },
  {
    "id": "ezviz-027",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-LC3   (4MP)",
    "price": 99.0,
    "desc": "Rezolyutsiya 2K, sun'iy intellekt yordamida odamni aniqlash, 32 GB quvvatli o'rnatilgan eMMC xotira, Rangli tungi ko'rish, 700 lyumen yorqinlik, 157 daraja ko'rish burchagi. Diagonal ko'rish burchagi, Wi-Fi 2,4 GGts, ikkita antenna bilan, ikki tomonlama aloqa, chang va suvdan himoya IP65.",
    "image": "images/ezviz-kameralar-cs-lc3-4mp-27.png"
  },
  {
    "id": "ezviz-028",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-EL3   (3MP)",
    "price": 110.0,
    "desc": "Rezolyutsiya 2K, Gorizontal aylanuvchi sozlanadigan kamera ko'rinishi, Inson/transport vositasi shaklini aniqlash, Avtomobil raqamlarini tanish, Avtomobil raqamlarini tanish, Avtomatik kuzatish, Rangli tungi ko'rish, Ikki tomonlama suhbat, Sirena va stroboskop bilan faol himoya, MicroSD kartalarini qo'llab-quvvatlaydi (512 GB gacha).",
    "image": "images/ezviz-kameralar-cs-el3-3mp-28.png"
  },
  {
    "id": "ezviz-029",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-C8C   (1080)",
    "price": 50.0,
    "desc": "Rezolyutsiya 1080. 360° panoramali qamrov. Sun'iy intellekt asosida inson/transport vositasi shaklini aniqlash. Avtomatik masshtab kuzatuvi. Rangli tungi ko'rish. Sirena va stroboskop bilan faol himoya. Ikki tomonlama suhbat. Har qanday ob-havoga mos dizayn. H.265 video texnologiyasi. microSD kartalarini qo'llab-quvvatlash (512 GB gacha).",
    "image": "images/ezviz-kameralar-cs-c8c-1080-29.png"
  },
  {
    "id": "ezviz-030",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-C8C   (5MP)",
    "price": 65.0,
    "desc": "Rezolyutsiya 3K. 360° panoramali qamrov. Sun'iy intellekt asosida inson/transport vositasi shaklini aniqlash. Avtomatik masshtab kuzatuvi. Rangli tungi ko'rish. Sirena va stroboskop bilan faol himoya. Ikki tomonlama suhbat. Har qanday ob-havoga mos dizayn. H.265 video texnologiyasi. microSD kartalarini qo'llab-quvvatlash (512 GB gacha).",
    "image": "images/ezviz-kameralar-cs-c8c-5mp-30.png"
  },
  {
    "id": "ezviz-031",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-H8C   (1080P)",
    "price": 50.0,
    "desc": "Rezolyutsiya 1080p, 360° panoramali qamrov, Rangli tungi ko'rish, Sun'iy intellekt yordamida inson shaklini aniqlash, Avtomatik kuzatish, Sichqonchaning bir bosishi bilan belgilangan yo'nalishlarga qaytish, Ikki tomonlama aloqa, Sirena va stroboskop bilan faol himoya, Atmosfera ta'siridan himoya, H.265 video texnologiyasi, microSD kartalarini qo'llab-quvvatlash (512 GB gacha).",
    "image": "images/ezviz-kameralar-cs-h8c-1080p-31.png"
  },
  {
    "id": "ezviz-032",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-H8c   (3MP)",
    "price": 55.0,
    "desc": "Rezolyutsiya 2K, 360° panoramali qamrov, Rangli tungi ko'rish, Sun'iy intellekt yordamida inson shaklini aniqlash, Avtomatik kuzatish, Sichqonchaning bir bosishi bilan belgilangan yo'nalishlarga qaytish, Ikki tomonlama aloqa, Sirena va stroboskop bilan faol himoya, Atmosfera ta'siridan himoya, H.265 video texnologiyasi, microSD kartalarini qo'llab-quvvatlash (512 GB gacha).",
    "image": "images/ezviz-kameralar-cs-h8c-3mp-32.png"
  },
  {
    "id": "ezviz-033",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-H8C   (4MP)",
    "price": 60.0,
    "desc": "Rezolyutsiya 2K+, 360° panoramali qamrov, Rangli tungi ko'rish, Sun'iy intellekt yordamida inson shaklini aniqlash, Avtomatik kuzatish, Sichqonchaning bir bosishi bilan belgilangan yo'nalishlarga qaytish, Ikki tomonlama aloqa, Sirena va stroboskop bilan faol himoya, Atmosfera ta'siridan himoya, H.265 video texnologiyasi, microSD kartalarini qo'llab-quvvatlash (512 GB gacha).",
    "image": "images/ezviz-kameralar-cs-h8c-4mp-33.png"
  },
  {
    "id": "ezviz-034",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-H8c 4G  (3MP)",
    "price": 60.0,
    "desc": "Rezolyutsiya 2K, 360° panoramali qamrov,Supports 4G Network Connectivity. Rangli tungi ko'rish, Sun'iy intellekt yordamida inson shaklini aniqlash, Avtomatik kuzatish, Sichqonchaning bir bosishi bilan belgilangan yo'nalishlarga qaytish, Ikki tomonlama aloqa, Sirena va stroboskop bilan faol himoya, Atmosfera ta'siridan himoya, H.265 video texnologiyasi, microSD kartalarini qo'llab-quvvatlash (512 GB gacha).",
    "image": "images/ezviz-kameralar-cs-h8c-4g-3mp-34.png"
  },
  {
    "id": "ezviz-035",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-H8c   (3MP)",
    "price": 55.0,
    "desc": "Rezolyutsiya 2K, 360° panoramali qamrov, Rangli tungi ko'rish, Sun'iy intellekt yordamida inson shaklini aniqlash, Avtomatik kuzatish, Sichqonchaning bir bosishi bilan belgilangan yo'nalishlarga qaytish, Ikki tomonlama aloqa, Sirena va stroboskop bilan faol himoya, Atmosfera ta'siridan himoya, H.265 video texnologiyasi, microSD kartalarini qo'llab-quvvatlash (512 GB gacha). POE.",
    "image": "images/ezviz-kameralar-cs-h8c-3mp-35.png"
  },
  {
    "id": "ezviz-036",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-H8c pro  (8MP)",
    "price": 85.0,
    "desc": "Rezolyutsiya 4K+, 360° panoramali qamrov, Rangli tungi ko'rish, Sun'iy intellekt yordamida inson shaklini aniqlash, Avtomatik kuzatish, Sichqonchaning bir bosishi bilan belgilangan yo'nalishlarga qaytish, Ikki tomonlama aloqa, Sirena va stroboskop bilan faol himoya, Atmosfera ta'siridan himoya, H.265 video texnologiyasi, microSD kartalarini qo'llab-quvvatlash (512 GB gacha).",
    "image": null
  },
  {
    "id": "ezviz-037",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-H80X (8MP+2MP)",
    "price": 95.0,
    "desc": "Rezolyutsiya 4K. Aqlli qo'sh linza. Juda past yoritishda ColorFULL tungi ko'rish. Avtomatik masshtab kuzatuvi. F1.0 katta diafragma. Sirena va stroboskop bilan faol himoya. Ikki tomonlama suhbat. MicroSD kartalarini qo'llab-quvvatlaydi (512 GB gacha).",
    "image": "images/ezviz-kameralar-cs-h80x-8mp2mp-37.png"
  },
  {
    "id": "ezviz-038",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-H8X (4MP)",
    "price": 90.0,
    "desc": "Rezolyutsiya 2K⁺. 1/1,1/8 dyuymli KMOP-sensor. Juda past yoritishda ColorFULL tungi ko'rish. 360° panoramali ko'rinish. Sun'iy intellekt yordamida inson/transport vositasi shaklini aniqlash. Avtomatik qo'riqlash uchun ikkita patrul rejimi. Sirena va stroboskop bilan faol himoya. Ikki tomonlama suhbat. MicroSD kartalarini qo'llab-quvvatlaydi (512 GB gacha).",
    "image": "images/ezviz-kameralar-cs-h8x-4mp-38.png"
  },
  {
    "id": "ezviz-039",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-H80F                   (4+4+4MP)",
    "price": 100.0,
    "desc": "2K⁺ uch linzali. 12 karra aralash zoom. Sun'iy intellekt yordamida inson/transport vositasi shaklini aniqlash uchun qo'sh tasvir. Inson/transport vositasini avtomatik kuzatish va masshtablash. Avtomatik qo'riqlash uchun ikkita patrul rejimi. Rangli tungi ko'rish. Sirena va stroboskop bilan faol himoya. Ikki tomonlama suhbat. MicroSD kartalarini qo'llab-quvvatlaydi (512 GB gacha).",
    "image": "images/ezviz-kameralar-cs-h80f-444mp-39.png"
  },
  {
    "id": "ezviz-040",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-H90 Dual  (4MP+4MP)",
    "price": 100.0,
    "desc": "2K+ va 2K+ qo'sh linza. Avtomatik aqlli kuzatish uchun birgalikda aniqlash. O'ta moslashuvchan ko'rish uchun qo'sh aylanish. Sun'iy intellekt yordamida inson/transport vositasi shaklini aniqlash. Ikki tomonlama suhbat. Sirena va stroboskop bilan faol himoya. Takomillashtirilgan qo'sh Wi-Fi antennalari. MicroSD kartalarini qo'llab-quvvatlaydi (512 GB gacha).",
    "image": "images/ezviz-kameralar-cs-h90-dual-4mp4mp-40.png"
  },
  {
    "id": "ezviz-041",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-H9c   (3MP+3MP)",
    "price": 78.0,
    "desc": "2K va 2K qo'sh ob'ektiv. Avtomatik aqlli kuzatish uchun birgalikda aniqlash. Sun'iy intellekt asosida inson/transport vositasi shaklini aniqlash. 360° panoramali qamrov. Rangli tungi ko'rish. Ikki tomonlama suhbat. Sirena va stroboskop bilan faol himoya. MicroSD kartani qo'llab-quvvatlaydi (512 GB gacha).",
    "image": "images/ezviz-kameralar-cs-h9c-3mp3mp-41.png"
  },
  {
    "id": "ezviz-042",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-H9c   (5MP+5MP)",
    "price": 85.0,
    "desc": "2K+ va 2K+ qo'sh ob'ektiv. Avtomatik aqlli kuzatish uchun birgalikda aniqlash. Sun'iy intellekt asosida inson/transport vositasi shaklini aniqlash. 360° panoramali qamrov. Rangli tungi ko'rish. Ikki tomonlama suhbat. Sirena va stroboskop bilan faol himoya. MicroSD kartani qo'llab-quvvatlaydi (512 GB gacha).",
    "image": "images/ezviz-kameralar-cs-h9c-5mp5mp-42.png"
  },
  {
    "id": "ezviz-043",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-EB8 4G  (3MP)",
    "price": 185.0,
    "desc": "4G tarmog'iga ulanish. GPS orqali qurilma joylashuvini ko'rish. 2K rezolyutsiya. Panoramali ko'rinish. Juda katta akkumulyator quvvati (10 400 mAh)³. Inson harakatini aqlli aniqlash. Ikki tomonlama suhbat. Rangli tungi ko'rish. Sirena va stroboskop bilan faol himoya. Atmosfera ta'siriga chidamli dizayn. Akkumulyatorni zaryadlash uchun EZVIZ quyosh paneli (Type-C versiyasi) bilan ishlaydi. microSD kartalarini (512 GB gacha) va EZVIZ Play bulutli xotirasini qo'llab-quvvatlaydi.",
    "image": "images/ezviz-kameralar-cs-eb8-4g-3mp-43.png"
  },
  {
    "id": "ezviz-044",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-HB8C/SP 4G (4MP)",
    "price": 125.0,
    "desc": "Ikkilamchi ulanish: 4G va Wi-Fi. 2K⁺ rezolyutsiya. Doimiy video rejimi 2.0. 360° panoramali ko'rinish. Sun'iy intellekt yordamida inson/transport vositasi shaklini aniqlash. Aqlli kuzatish. Rangli tungi ko'rish. Qayta zaryadlanadigan litiy batareya. Ikki tomonlama suhbat. Sirena va stroboskop bilan faol himoya. MicroSD kartalarini qo'llab-quvvatlaydi (512 GB gacha).",
    "image": "images/ezviz-kameralar-cs-hb8csp-4g-4mp-44.png"
  },
  {
    "id": "ezviz-045",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-HB8C/SP (4MP)",
    "price": 105.0,
    "desc": "Rezolyutsiya 2K⁺. Doimiy video rejimi 2.0. Sun'iy intellekt yordamida inson/transport vositasi shaklini aniqlash. Rangli tungi ko'rish. 5200 mAh quvvatli litiy akkumulyator. Ikki tomonlama suhbat. MicroSD kartalarini qo'llab-quvvatlaydi (512 GB gacha).",
    "image": "images/ezviz-kameralar-cs-hb8csp-4mp-45.png"
  },
  {
    "id": "ezviz-046",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-HB90/SP  (4MP+4MP)",
    "price": 160.0,
    "desc": "2K+ va 2K+ qo'sh ob'ektiv. Doimiy video rejimi 2.0. Avtomatik aqlli kuzatish uchun birgalikda aniqlash. Komplektga 8 Vt quvvatli yuqori samarali quyosh paneli kiradi. 10 400 mAh quvvatli litiy akkumulyator. O'ta moslashuvchan ko'rish uchun qo'sh aylanish. Ikki tomonlama suhbat. MicroSD kartalarini qo'llab-quvvatlaydi (512 GB gacha).",
    "image": "images/ezviz-kameralar-cs-hb90sp-4mp4mp-46.png"
  },
  {
    "id": "ezviz-047",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-HB90X/SP   (4MP+4MP)      WiFi +4G",
    "price": 230.0,
    "desc": "Ikkilamchi ulanish: 4G va Wi-Fi 6. 2K+ va 2K+ qo'sh ob'ektiv. Doimiy video rejimi 2.0. Maksimal moslashuvchan ko'rish uchun qo'sh aylanish. Komplektga 8 Vt quvvatli yuqori samarali quyosh paneli kiradi. 10 400 mAh quvvatli qayta zaryadlanadigan litiy batareya. Aqlli avtomatik kuzatish uchun birgalikda aniqlash. Ikki tomonlama aloqa. microSD kartalar bilan mos keladi (512 GB gacha).",
    "image": "images/ezviz-kameralar-cs-hb90xsp-4mp4mp-wifi-4g-47.png"
  },
  {
    "id": "ezviz-048",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-CMT- Solar Panel-C",
    "price": 30.0,
    "desc": "Quyosh panelidan energiya tejamkor va ekologik toza quvvatlanish. Monokristall silikon quyosh elementlari tufayli yuqori samaradorlik. Zaryadlash quvvati 6 gacha,uzoq muddatli quvvatlanish uchun 18 Vt. Qulay montaj uchun 4 m uzunlikdagi kabel. Tashqarida foydalanish uchun IP65 himoya darajasiga ega ob-havoga chidamli korpus",
    "image": "images/ezviz-kameralar-cs-cmt--solar-panel-c-48.png"
  },
  {
    "id": "ezviz-049",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-DP2C",
    "price": 100.0,
    "desc": "Video 1080p. Juda keng 155° ko'rish burchagi. Harakatni aniqlash uchun PIR-datchik. Real vaqtda ko'rish va ikki tomonlama video aloqa. 4,3 dyuymli rangli ekran. 5 m gacha IK yoritgich. O'rnatilgan elektron eshik qo'ng'irog'i. 4600 mA·soat quvvatli qayta zaryadlanadigan litiy akkumulyator. H.265 video siqish. MicroSD karta qo'llab-quvvatlanadi (512 GB gacha).",
    "image": "images/ezviz-kameralar-cs-dp2c-49.png"
  },
  {
    "id": "ezviz-050",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-DP2  (3MP)",
    "price": 115.0,
    "desc": "Video 2K. Juda keng 166° ko'rish burchagi. Harakatni aniqlash uchun PIR-datchik. Real vaqtda ko'rish va ikki tomonlama video aloqa. 4,3 dyuymli rangli sensorli ekran. 5 m gacha IK yoritgich. O'rnatilgan elektron eshik qo'ng'irog'i. 4600 mA·soat quvvatli qayta zaryadlanadigan litiy akkumulyator. H.265 video siqish. MicroSD karta qo'llab-quvvatlanadi (512 GB gacha).",
    "image": "images/ezviz-kameralar-cs-dp2-3mp-50.png"
  },
  {
    "id": "ezviz-051",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-HP4 (1080p)",
    "price": 85.0,
    "desc": "Video 1080p. Juda keng 155° ko'rish burchagi. Real vaqtda ko'rish va ikki tomonlama video aloqa. 4,3 dyuymli rangli ekran. 5 m gacha IK yoritgich. O'rnatilgan elektron eshik qo'ng'irog'i. 4600 mA·soat quvvatli qayta zaryadlanadigan litiy akkumulyator. H.265 video siqish. MicroSD karta qo'llab-quvvatlanadi (512 GB gacha).",
    "image": "images/ezviz-kameralar-cs-hp4-1080p-51.png"
  },
  {
    "id": "ezviz-052",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-HP5(1080P)",
    "price": 160.0,
    "desc": "Rezolyutsiya 1080. 7 dyuymli rangli sensorli ekran. Eshik/darvozani masofadan ochish¹. 2 simli. Inson harakatini aqlli aniqlash. Ikki tomonlama suhbat (ovoz almashtirish funksiyasini qo'llab-quvvatlaydi). Bir nechta jiringlash ohangli o'rnatilgan eshik qo'ng'irog'i. Aqlli RFID orqali ochish (komplektda 2 ta belgi). Har qanday ob-havoga mos dizayn. Komplektda 2 ta ism kartochkasi. Ikki diapazonli Wi-Fi ni qo'llab-quvvatlaydi 2,4/5 GGts. MicroSD kartani qo'llab-quvvatlaydi (512 GB gacha).",
    "image": "images/ezviz-kameralar-cs-hp51080p-52.png"
  },
  {
    "id": "ezviz-053",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-HP7(3MP)",
    "price": 190.0,
    "desc": "Rezolyutsiya 2K. 7 dyuymli rangli sensorli ekran. Eshik/darvozani masofadan ochish¹. 2 simli. Inson harakatini aqlli aniqlash. Ikki tomonlama suhbat (ovoz almashtirish funksiyasini qo'llab-quvvatlaydi). Bir nechta jiringlash ohangli o'rnatilgan eshik qo'ng'irog'i. Aqlli RFID orqali ochish (komplektda 3 ta belgi). Har qanday ob-havoga mos dizayn. Komplektda 3 ta ism kartochkasi. Ikki diapazonli Wi-Fi ni qo'llab-quvvatlaydi 2,4/5 GGts. MicroSD kartani qo'llab-quvvatlaydi (512 GB gacha).",
    "image": "images/ezviz-kameralar-cs-hp73mp-53.png"
  },
  {
    "id": "ezviz-054",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-SD7                   Умный экран",
    "price": 110.0,
    "desc": "7 dyuymli sensorli IPS-ekran, EZVIZ qurilmalari bilan aqlli integratsiya, 4600 mAh quvvatli litiy akkumulyator batareyasi (Type-C orqali quvvatlash), Real vaqtda ko'rish va qayta ko'rsatish, EZVIZ ilovasi orqali masofadan boshqarish, EZVIZ ilovasi orqali masofadan boshqarish, 2,4 GGts Wi-Fi.",
    "image": "images/ezviz-kameralar-cs-sd7-умный-экран-54.png"
  },
  {
    "id": "ezviz-055",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-DL03 pro",
    "price": 95.0,
    "desc": "Wi-Fi 2 ga ulanadi,4 GGts. Barmoq izi bilan ochish. EZVIZ ilovasi orqali masofadan ochish va boshqarish. Qulflash holatini real vaqtda tekshirish va bildirishnomalar. Bir nechta ochish usullari. EZVIZ kameralari bilan aqlli integratsiya. Ruxsatsiz kirishga qarshi signalizatsiya. Favqulodda elektr ta'minotini qo'llab-quvvatlaydi.",
    "image": "images/ezviz-kameralar-cs-dl03-pro-55.png"
  },
  {
    "id": "ezviz-056",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-DL04 pro",
    "price": 110.0,
    "desc": "Wi-Fi 2 ga ulanadi,4 GGts. Barmoq izi bilan ochish. EZVIZ ilovasi orqali masofadan ochish va boshqarish. Qulflash holatini tekshirish va bildirishnomalar. EZVIZ kameralari bilan aqlli integratsiya¹. Ko'z bilan kuzatishdan himoya kodlarini qo'llab-quvvatlaydi. Ruxsatsiz kirishga qarshi signalizatsiya. Favqulodda elektr ta'minotini (Type-C) qo'llab-quvvatlaydi.",
    "image": "images/ezviz-kameralar-cs-dl04-pro-56.png"
  },
  {
    "id": "ezviz-057",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-DL05   (WBCP,M)",
    "price": 135.0,
    "desc": "Bir nechta ochish usullari. EZVIZ ilovasi orqali oddiy boshqaruv. Real vaqtda mobil bildirishnomalar. Vaqtinchalik kirish kodlarini qo'llab-quvvatlaydi. Ko'z bilan kuzatishga qarshi kodlarni qo'llab-quvvatlaydi. Bolalardan himoya qulfini qo'llab-quvvatlaydi. O'rnatilgan elektron eshik qo'ng'irog'i. Buzib kirishga qarshi signalizatsiya. Favqulodda quvvat manbaini qo'llab-quvvatlaydi. Past batareya haqida ogohlantirish signali. EZVIZ kameralari bilan aqlli integratsiya.",
    "image": "images/ezviz-kameralar-cs-dl05-wbcpm-57.png"
  },
  {
    "id": "ezviz-058",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-L2-11FCP   (A0)(BLACK)",
    "price": 150.0,
    "desc": "Barmoq izi bo'yicha aqlli qulf, Wi-Fi'siz versiya, To'rtta ochish usuli, O'rnatilgan elektron eshik qo'ng'irog'i, Ruxsatsiz kirishga qarshi signalizatsiya, Ilashish mexanizmli eshik dastagi, Past batareya haqida ogohlantirish signali, Favqulodda quvvat manbai.",
    "image": "images/ezviz-kameralar-cs-l2-11fcp-a0black-58.png"
  },
  {
    "id": "ezviz-059",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-DL06   (WBCP)",
    "price": 150.0,
    "desc": "Ikki tomonlama barmoq izi skaneri. Barmoq izi orqali ochish. Parol va kontaktsiz karta orqali ochish. EZVIZ ilovasi orqali masofadan ochish va boshqarish. EZVIZ kameralari bilan aqlli integratsiya. Wi-Fi va Bluetooth orqali ulanishni qo'llab-quvvatlaydi. Ruxsatsiz kirishga qarshi signalizatsiya. O'rnatilgan eshik qo'ng'irog'i. Akkumulyator batareyasi (Type-C orqali quvvatlashni qo'llab-quvvatlaydi).",
    "image": "images/ezviz-kameralar-cs-dl06-wbcp-59.png"
  },
  {
    "id": "ezviz-060",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-DL20FVS   (WBP,GR)",
    "price": 270.0,
    "desc": "3D-chuqurlik skanerlash texnologiyasi yordamida ishonchli va tezkor yuzni aniqlash. Qo'shimcha kontaktsiz qulaylik uchun kaft tomirlarini aniqlash funksiyasi. Sun'iy intellekt uchun 12 nm yuqori unumdorlikdagi chip va ikki yadroli protsessor. EZVIZ ilovasi orqali masofadan ochish va holatni tekshirish. 4 dyuymli ichki aqlli ekranli o'rnatilgan eshik ko'zchasi. Ikki tomonlama video aloqali jonli translatsiya. Buzib kirishga qarshi signalizatsiyali mustahkam qulf korpusi. Katta quvvatli litiy batareya.",
    "image": "images/ezviz-kameralar-cs-dl20fvs-wbpgr-60.png"
  },
  {
    "id": "ezviz-061",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-DL50FVS   (WBP,GR)",
    "price": 280.0,
    "desc": "Ikki linzali 3D-strukturaviy yoritish orqali yuzni aniqlash. Bir nechta ochish usullari. EZVIZ ilovasi orqali masofadan boshqarish va bildirishnomalar. O'rnatilgan aqlli eshik ko'zchasi. 4 dyuymli rangli IPS-ekran. Ikki tomonlama video qo'ng'iroqli real vaqtda ko'rish. 5000 mA·soat quvvatli litiy akkumulyator. Ruxsatsiz kirish signalizatsiyali mustahkam qulf korpusi. Favqulodda elektr ta'minotini qo'llab-quvvatlaydi.",
    "image": "images/ezviz-kameralar-cs-dl50fvs-wbpgr-61.png"
  },
  {
    "id": "ezviz-062",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-R5C-R100-8F",
    "price": 75.0,
    "desc": "EZVIZ R5C 8 kanalli NVR. 8 tagacha EZVIZ kuzatuv kamerasini ulaydi. Lokal qattiq diskni qo'llab-quvvatlaydi (8 TB gacha). Maksimal IP-kamera rezolyutsiyasi: 8 Mp.",
    "image": "images/ezviz-kameralar-cs-r5c-r100-8f-62.png"
  },
  {
    "id": "ezviz-063",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-X5S 4W",
    "price": 60.0,
    "desc": "Simsiz tarmoq video registratori X5S. HDMI/VGA chiqishi. 3K sifatgacha yuqori aniqlikdagi kameralarni qo'llab-quvvatlaydi. Wi-Fi radiusi: 100 m gacha (300 fut). Kamerani qo'llab-quvvatlaydi, ONVIF standartiga mos. H.265 video texnologiyasi. 8 TB gacha xotira.",
    "image": "images/ezviz-kameralar-cs-x5s-4w-63.png"
  },
  {
    "id": "ezviz-064",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-X5S 8W",
    "price": 65.0,
    "desc": "Simsiz tarmoq video registratori X5S. HDMI/VGA chiqishi. 3K sifatgacha yuqori aniqlikdagi kameralarni qo'llab-quvvatlaydi. Wi-Fi radiusi: 100 m gacha (300 fut). Kamerani qo'llab-quvvatlaydi, ONVIF standartiga mos. H.265 video texnologiyasi. 8 TB gacha xotira.",
    "image": "images/ezviz-kameralar-cs-x5s-8w-64.png"
  },
  {
    "id": "ezviz-065",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-PB18         Power Partne",
    "price": 24.0,
    "desc": "Ezviz Power Partner ichki akkumulyatorli kamera uchun. Akkumulyator quvvati 5200 mAh.",
    "image": "images/ezviz-kameralar-cs-pb18-power-partne-65.png"
  },
  {
    "id": "ezviz-066",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-DL-IC-CPU-R200",
    "price": 10.0,
    "desc": "Ezviz CS-DL-IC-CPU-R200 kontaktsiz kalit-brelok. Qadoqda 4 dona.",
    "image": "images/ezviz-kameralar-cs-dl-ic-cpu-r200-66.png"
  },
  {
    "id": "ezviz-067",
    "category": "ezviz",
    "subcategory": null,
    "name": "CS-T36",
    "price": 20.0,
    "desc": "Aqlli uy Wi-Fi rele. EZVIZ ilovasi orqali oddiy boshqaruv. Bir nechta xavfsizlik konstruksiyalari. Jadval. Quvvat monitori. Google Assistant va Amazon Alexa bilan aqlli integratsiya.",
    "image": "images/ezviz-kameralar-cs-t36-67.png"
  }
];
