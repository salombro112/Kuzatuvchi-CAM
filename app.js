const CONFIG = {
  BOT_TOKEN: "8956590718:AAGn9IHrFumnd9w1aMKvlRVaJyoGGn27uwA",     // <-- @BotFather'dan olingan token
  CHAT_ID: "@buyurtmalar_cam",          // <-- yoki -100XXXXXXXXXX ko'rinishidagi guruh id

  // 1 AQSH dollari necha so'm ekanini shu yerda ko'rsating (mahsulot narxlari
  // manba fayllarda USD/u.e.da bo'lgani uchun). Kerak bo'lsa yangilab turing.
  USD_TO_SUM: 1,

  FIREBASE: {
    apiKey: "AIzaSyC2ps_V1sw7CIAq2LJbt9VSQaTQLZqjeTk",
    authDomain: "kuzatuvchicam-uz.firebaseapp.com",
    databaseURL: "https://kuzatuvchicam-uz-default-rtdb.firebaseio.com",
    projectId: "kuzatuvchicam-uz",
  },
};

const FIREBASE_ENABLED = CONFIG.FIREBASE.apiKey !== "YOUR_FIREBASE_API_KEY";

/* Administrator hisobi — shu ism va "parol" (telefon raqami maydoniga
   yoziladi) bilan kirilsa, akkauntga admin huquqlari beriladi. */
const ADMIN_CREDENTIALS = { name: "Sirius", phone: "sIRIUS746" };

/* ---------------------------- Mahsulotlar katalogi (standart) ---------------------------- */
const DEFAULT_PRODUCTS = (typeof PRODUCTS_DATA !== "undefined") ? PRODUCTS_DATA : [];
/* Boshlang'ich kategoriyalar ro'yxati (birinchi marta ishga tushganda
   yuklanadi). Admin bu ro'yxatni saytdan turib tartibini o'zgartirishi
   va yangi kategoriya qo'shishi mumkin — o'zgarishlar getAllCategories()
   orqali qo'llaniladi (pastda). */
const DEFAULT_CATEGORIES = (typeof CATEGORIES !== "undefined") ? CATEGORIES : [];

/* ---------------------------- Holat (state) va localStorage ---------------------------- */
const LS = {
  account: "kc_account",
  knownAccounts: "kc_known_accounts",
  comments: "kc_comments",
  productOverrides: "kc_product_overrides",   // demo-rejim: {id: {...changed fields, deleted?:true}}
  customProducts: "kc_custom_products",       // demo-rejim: [ {..full product obj, deleted?:true} ]
  categoryOverrides: "kc_category_overrides", // demo-rejim: {slug: {...changed fields (order/label/icon), deleted?:true}}
  customCategories: "kc_custom_categories",   // demo-rejim: [ {slug,label,icon,order, deleted?:true} ]
};

function loadJSON(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch (e) { return fallback; }
}
function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

let state = {
  account: loadJSON(LS.account, null),
  knownAccounts: loadJSON(LS.knownAccounts, {}),
  cart: [],
  cable: { set: 0, tok: 0 },
  comments: loadJSON(LS.comments, {}),
  orders: [],
  // Umumiy (Firebase) mahsulotlar ombori — sinxronlashgach shu to'ldiriladi.
  cloudProducts: null,
  // Umumiy (Firebase) akkauntlar ro'yxati — Admin > Akkauntlar bo'limi uchun.
  cloudAccounts: null,
  productOverrides: loadJSON(LS.productOverrides, {}),
  customProducts: loadJSON(LS.customProducts, []),
  // Umumiy (Firebase) kategoriyalar ro'yxati — sinxronlashgach shu to'ldiriladi.
  cloudCategories: null,
  categoryOverrides: loadJSON(LS.categoryOverrides, {}),
  customCategories: loadJSON(LS.customCategories, []),
  screen: "home",
  category: "all",
  searchQuery: "",
};

function loadAccountSession() {
  if (!state.account) { state.cart = []; state.cable = { set: 0, tok: 0 }; state.orders = []; return; }
  const stored = state.knownAccounts[state.account.phone] || {};
  state.cart = stored.cart || [];
  state.cable = stored.cable || { set: 0, tok: 0 };
  state.orders = stored.orders || [];
}

function persist() {
  if (state.account) {
    const phone = state.account.phone;
    state.account.cart = state.cart;
    state.account.cable = state.cable;
    state.account.orders = state.orders;
    state.knownAccounts[phone] = { ...(state.knownAccounts[phone] || {}), ...state.account };
    saveJSON(LS.account, state.account);
    syncAccountToCloud(state.account);
  }
  saveJSON(LS.comments, state.comments);
  saveJSON(LS.knownAccounts, state.knownAccounts);
  if (!FIREBASE_ENABLED) {
    saveJSON(LS.productOverrides, state.productOverrides);
    saveJSON(LS.customProducts, state.customProducts);
    saveJSON(LS.categoryOverrides, state.categoryOverrides);
    saveJSON(LS.customCategories, state.customCategories);
  }
}

/* Akkaunt ma'lumotini umumiy (Firebase) "accounts" ro'yxatiga yozadi — shu
   orqali Admin > Akkauntlar bo'limida SAYTGA KIRGAN BARCHA foydalanuvchilar
   ko'rinadi va yangi ro'yxatdan o'tganlar avtomatik shu ro'yxatga qo'shiladi. */
function syncAccountToCloud(account) {
  if (!FIREBASE_ENABLED || !fbDb || !account || !account.phone) return;
  const safeKey = account.phone.replace(/[.#$\[\]\/]/g, "_");
  fbDb.ref("accounts/" + safeKey).set({
    name: account.name,
    phone: account.phone,
    isAdmin: !!account.isAdmin,
    createdAt: account.createdAt,
    ordersCount: (account.orders || []).length,
  });
}

/* Barcha akkauntlarni qaytaradi: Firebase yoqilgan bo'lsa — barcha
   foydalanuvchilar (barcha qurilmalardan); aks holda — faqat shu qurilmada
   ma'lum bo'lgan akkauntlar (demo rejim). */
function getAllAccounts() {
  const list = FIREBASE_ENABLED
    ? Object.values(state.cloudAccounts || {})
    : Object.values(state.knownAccounts || {}).map((a) => ({
        name: a.name, phone: a.phone, isAdmin: !!a.isAdmin, createdAt: a.createdAt,
        ordersCount: (a.orders || []).length,
      }));
  return list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
}

/* Bitta mahsulot uchun barcha izohlarni tekis massiv qilib qaytaradi
   (Firebase'da push() bilan qo'shilgan izohlar obyekt ko'rinishida bo'ladi,
   demo-rejimda esa oddiy massiv — ikkalasini ham qo'llab-quvvatlaydi). */
function commentsForProduct(id) {
  const c = state.comments[id];
  if (!c) return [];
  return Array.isArray(c) ? c : Object.values(c);
}

/* Barcha mahsulotlar bo'yicha barcha izohlarni (mahsulot nomi bilan birga)
   bitta ro'yxatga yig'ib qaytaradi — Admin > Izohlar bo'limi uchun. */
function getAllCommentsFlat() {
  const out = [];
  Object.keys(state.comments || {}).forEach((productId) => {
    const p = findProduct(productId);
    commentsForProduct(productId).forEach((cm) => {
      out.push({ ...cm, productId, productName: p ? p.name : "Mahsulot o'chirilgan" });
    });
  });
  return out;
}

function isAdmin() { return !!(state.account && state.account.isAdmin); }

/* ---------------------------- Firebase (umumiy ma'lumotlar bazasi) ---------------------------- */
let fbDb = null;

function initFirebase() {
  if (!FIREBASE_ENABLED) return;
  try {
    firebase.initializeApp(CONFIG.FIREBASE);
    fbDb = firebase.database();
    const ref = fbDb.ref("products");
    ref.once("value").then((snap) => {
      if (!snap.exists()) {
        // Birinchi marta ishga tushirilyapti — boshlang'ich katalogni bulutga yozamiz.
        const seed = {};
        DEFAULT_PRODUCTS.forEach((p) => { seed[p.id] = p; });
        ref.set(seed);
      }
    });
    // Real-time tinglovchi: har qanday admin o'zgarishi shu yerda barcha
    // foydalanuvchilarga bir zumda yetib boradi.
    ref.on("value", (snap) => {
      const val = snap.val() || {};
      state.cloudProducts = Object.values(val);
      render();
    });

    // Izohlar: BARCHA foydalanuvchilar yozgan izohlar shu yerdan real-time
    // o'qiladi — shu tufayli Admin > Izohlar bo'limida hammasi ko'rinadi
    // va yangi izoh yozilishi bilan darhol yangilanadi.
    fbDb.ref("comments").on("value", (snap) => {
      state.comments = snap.val() || {};
      render();
    });

    // Akkauntlar: saytga kirgan BARCHA foydalanuvchilar shu yerdan real-time
    // o'qiladi — Admin > Akkauntlar bo'limi uchun.
    fbDb.ref("accounts").on("value", (snap) => {
      state.cloudAccounts = snap.val() || {};
      render();
    });

    // Kategoriyalar: admin qo'shgan/tartibini o'zgartirgan kategoriyalarni
    // BARCHA foydalanuvchiga bir zumda yetkazish uchun.
    const catRef = fbDb.ref("categories");
    catRef.once("value").then((snap) => {
      if (!snap.exists()) {
        const seed = {};
        DEFAULT_CATEGORIES.forEach((c, i) => { seed[c.slug] = { ...c, order: i }; });
        catRef.set(seed);
      }
    });
    catRef.on("value", (snap) => {
      const val = snap.val() || {};
      state.cloudCategories = Object.values(val);
      render();
    });
  } catch (e) {
    console.error("Firebase ulanmadi:", e);
  }
}

/* ---------------------------- Yordamchi funksiyalar ---------------------------- */
function fmtSum(usd) {
  const sum = usd * CONFIG.USD_TO_SUM;
  return Math.round(sum).toLocaleString("ru-RU").replace(/,/g, " ") + " so'm";
}
function fmtUsd(usd) {
  return "$" + Number(usd).toLocaleString("en-US", { maximumFractionDigits: 2 });
}

function getAllProducts() {
  if (FIREBASE_ENABLED) {
    return (state.cloudProducts || DEFAULT_PRODUCTS).filter((p) => !p.deleted);
  }
  // Demo-rejim: localStorage override/custom mexanizmi (avvalgi kamera tizimi kabi)
  const base = DEFAULT_PRODUCTS
    .map((p) => ({ ...p, ...(state.productOverrides[p.id] || {}) }))
    .filter((p) => !p.deleted);
  const custom = state.customProducts.filter((p) => !p.deleted);
  return [...base, ...custom];
}
function findProduct(id) { return getAllProducts().find((p) => p.id === id); }

/* Joriy kategoriyalar ro'yxatini (admin tartibi/qo'shgan kategoriyalari bilan
   birga) tartiblangan holda qaytaradi. Har doim shu funksiya orqali
   foydalaniladi — DEFAULT_CATEGORIES to'g'ridan-to'g'ri ishlatilmaydi,
   chunki admin uni saytdan turib o'zgartirishi mumkin. */
function getAllCategories() {
  if (FIREBASE_ENABLED) {
    const list = state.cloudCategories && state.cloudCategories.length
      ? state.cloudCategories
      : DEFAULT_CATEGORIES.map((c, i) => ({ ...c, order: i }));
    return list.filter((c) => !c.deleted).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }
  // Demo-rejim: localStorage override/custom mexanizmi (mahsulotlar kabi)
  const base = DEFAULT_CATEGORIES
    .map((c, i) => ({ ...c, order: i, ...(state.categoryOverrides[c.slug] || {}) }))
    .filter((c) => !c.deleted);
  const custom = state.customCategories.filter((c) => !c.deleted);
  return [...base, ...custom].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

function categoryInfo(slug) { return getAllCategories().find((c) => c.slug === slug) || { slug, label: slug, icon: "\u{1F4E6}" }; }

/* Lotin harflari, raqam va chiziqchadan tashkil topgan noyob "slug" (ID)
   yaratadi — yangi kategoriya qo'shilganda ishlatiladi. */
function slugifyCategory(label) {
  const base = String(label).toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "") || "kategoriya";
  const existing = new Set(getAllCategories().map((c) => c.slug));
  let slug = base, n = 2;
  while (existing.has(slug)) { slug = `${base}-${n++}`; }
  return slug;
}

/* Kategoriyani bir pog'ona yuqoriga (dir=-1) yoki pastga (dir=1) suradi —
   order maydonlarini qo'shni kategoriya bilan almashtiradi. */
function moveCategory(slug, dir) {
  const cats = getAllCategories();
  const idx = cats.findIndex((c) => c.slug === slug);
  const swapIdx = idx + dir;
  if (idx < 0 || swapIdx < 0 || swapIdx >= cats.length) return;

  // Har bir kategoriyaga uning ro'yxatdagi joriy o'rnini order sifatida
  // qayta belgilaymiz, faqat ikkitasining o'rnini almashtirib.
  const reordered = cats.slice();
  [reordered[idx], reordered[swapIdx]] = [reordered[swapIdx], reordered[idx]];

  if (FIREBASE_ENABLED && fbDb) {
    reordered.forEach((c, i) => { fbDb.ref("categories/" + c.slug + "/order").set(i); });
    return;
  }
  reordered.forEach((c, i) => { setCategoryFields(c.slug, { order: i }); });
  persist();
  render();
}

/* Kategoriya maydonlarini (order/label/icon) demo-rejimda yangilaydi —
   standart yoki admin qo'shgan kategoriya bo'lishidan qat'iy nazar ishlaydi. */
function setCategoryFields(slug, fields) {
  const isDefault = DEFAULT_CATEGORIES.some((d) => d.slug === slug);
  if (isDefault) {
    state.categoryOverrides[slug] = { ...(state.categoryOverrides[slug] || {}), ...fields };
  } else {
    const idx = state.customCategories.findIndex((c) => c.slug === slug);
    if (idx > -1) state.customCategories[idx] = { ...state.customCategories[idx], ...fields };
  }
}

function addCategory(label, icon) {
  label = (label || "").trim();
  if (!label) return;
  const slug = slugifyCategory(label);
  const order = getAllCategories().length;
  const cat = { slug, label, icon: (icon || "").trim() || "\u{1F4E6}", order };

  if (FIREBASE_ENABLED && fbDb) {
    fbDb.ref("categories/" + slug).set(cat);
    showToast("Kategoriya qo'shildi ✓ (barcha foydalanuvchiga yuboriladi)");
    render();
    return;
  }
  state.customCategories.push(cat);
  persist();
  showToast("Kategoriya qo'shildi ✓ (demo rejim — faqat shu qurilmada)");
  render();
}

function editCategory(slug) {
  const cat = categoryInfo(slug);
  const newLabel = prompt("Kategoriya nomi:", cat.label);
  if (newLabel === null) return;
  const newIcon = prompt("Ikonka (emoji):", cat.icon || "");
  if (newIcon === null) return;
  const fields = { label: newLabel.trim() || cat.label, icon: newIcon.trim() || cat.icon };

  if (FIREBASE_ENABLED && fbDb) {
    fbDb.ref("categories/" + slug).update(fields);
    showToast("Saqlandi ✓");
    return;
  }
  setCategoryFields(slug, fields);
  persist();
  showToast("Saqlandi ✓");
  render();
}

function deleteCategory(slug) {
  const cat = categoryInfo(slug);
  const productCount = getAllProducts().filter((p) => p.category === slug).length;
  const warn = productCount > 0
    ? `Bu kategoriyada ${productCount} ta mahsulot bor. Kategoriyani o'chirsangiz, ular "Barchasi" bo'limida ko'rinishda qoladi, lekin bu kategoriya filtri yo'qoladi. Davom etasizmi?`
    : `"${cat.label}" kategoriyasini o'chirmoqchimisiz?`;
  if (!confirm(warn)) return;

  if (FIREBASE_ENABLED && fbDb) {
    fbDb.ref("categories/" + slug).remove();
    showToast("Kategoriya o'chirildi");
    if (state.category === slug) state.category = "all";
    return;
  }
  const isDefault = DEFAULT_CATEGORIES.some((d) => d.slug === slug);
  if (isDefault) {
    state.categoryOverrides[slug] = { ...(state.categoryOverrides[slug] || {}), deleted: true };
  } else {
    state.customCategories = state.customCategories.filter((c) => c.slug !== slug);
  }
  if (state.category === slug) state.category = "all";
  persist();
  showToast("Kategoriya o'chirildi");
  render();
}

function cartQty(id) {
  const item = state.cart.find((i) => i.id === id);
  return item ? item.qty : 0;
}
function cartProductTotal() {
  return state.cart.reduce((sum, i) => {
    const p = findProduct(i.id);
    return sum + (p ? p.price * i.qty : 0);
  }, 0);
}
function cableTotalSum() {
  return (state.cable.set || 0) * 4000 + (state.cable.tok || 0) * 2500;
}
function grandTotalUsd() { return cartProductTotal(); }
function totalCartCount() { return state.cart.reduce((s, i) => s + i.qty, 0); }

function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => t.classList.remove("show"), 2200);
}

/* ---------------------------- Onboarding ---------------------------- */
document.getElementById("onboardForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("regName").value.trim();
  const phone = document.getElementById("regPhone").value.trim();
  if (!name || !phone) return;

  const isTheAdmin = name === ADMIN_CREDENTIALS.name && phone === ADMIN_CREDENTIALS.phone;
  const existing = state.knownAccounts[phone];

  state.account = existing
    ? { ...existing, name, isAdmin: isTheAdmin || !!existing.isAdmin }
    : { id: "u_" + Date.now(), name, phone, createdAt: new Date().toISOString(), isAdmin: isTheAdmin, cart: [], cable: { set: 0, tok: 0 }, orders: [] };

  state.knownAccounts[phone] = state.account;
  loadAccountSession();
  saveJSON(LS.account, state.account);
  saveJSON(LS.knownAccounts, state.knownAccounts);
  syncAccountToCloud(state.account);
  boot();
});

/* ---------------------------- Navigatsiya ---------------------------- */
document.querySelectorAll(".nav-btn").forEach((btn) => {
  btn.addEventListener("click", () => goScreen(btn.dataset.screen));
});
document.getElementById("topCartBtn").addEventListener("click", () => goScreen("cart"));

function goScreen(name, params) {
  state.screen = name;
  state.screenParams = params || {};
  document.querySelectorAll(".nav-btn").forEach((b) => {
    b.classList.toggle("active", b.dataset.screen === name);
  });
  render();
  document.getElementById("content").scrollTo?.(0, 0);
  window.scrollTo(0, 0);
}

/* ---------------------------- Render: markazi ---------------------------- */
function render() {
  updateCartBadge();
  const el = document.getElementById("content");
  switch (state.screen) {
    case "home": el.innerHTML = renderHome(); break;
    case "search": el.innerHTML = renderSearch(); break;
    case "cart": el.innerHTML = renderCart(); break;
    case "orderLocation": el.innerHTML = renderOrderLocation(); break;
    case "profile": el.innerHTML = renderProfile(); break;
    case "detail": el.innerHTML = renderDetail(state.screenParams.id); break;
    case "adminForm": el.innerHTML = renderAdminForm(state.screenParams.id); break;
    case "adminComments": el.innerHTML = renderAdminComments(); break;
    case "adminAccounts": el.innerHTML = renderAdminAccounts(); break;
    case "adminCategories": el.innerHTML = renderAdminCategories(); break;
    default: el.innerHTML = renderHome();
  }
  attachDynamicListeners();
}

function updateCartBadge() {
  const n = totalCartCount() + ((state.cable.set > 0 || state.cable.tok > 0) ? 1 : 0);
  const badge = document.getElementById("cartBadge");
  if (n > 0) { badge.style.display = "flex"; badge.textContent = n; }
  else { badge.style.display = "none"; }
}

/* Savat ekranida kabel summasi va umumiy jami to'lovni input maydonlarini
   qayta yaratmasdan (fokusni yo'qotmasdan) yangilaydi — shu funksiya
   set/tok kabel inputlariga har bir belgi kiritilganda chaqiriladi. */
function updateCableSummary() {
  updateCartBadge();
  const cabTotal = cableTotalSum();
  const sumLineVal = document.querySelector(".cable-sum-line b");
  if (sumLineVal) sumLineVal.textContent = cabTotal.toLocaleString("ru-RU").replace(/,/g, " ") + " so'm";

  const cabLine = document.querySelectorAll(".summary-line")[1]?.querySelector("span:last-child");
  if (cabLine) cabLine.textContent = cabTotal.toLocaleString("ru-RU").replace(/,/g, " ") + " so'm";

  const totalLine = document.querySelector(".summary-line.total span:last-child");
  if (totalLine) {
    const total = grandTotalUsd();
    totalLine.textContent = (Math.round(total * CONFIG.USD_TO_SUM) + cabTotal).toLocaleString("ru-RU").replace(/,/g, " ") + " so'm";
  }

  const orderBtn = document.getElementById("goLocationBtn");
  if (orderBtn) {
    const empty = state.cart.length === 0 && !state.cable.set && !state.cable.tok;
    orderBtn.disabled = empty;
  }
}

/* ---------------------------- Bosh menyu ---------------------------- */
function renderHome() {
  const all = getAllProducts();
  const categories = getAllCategories();
  const cats = [{ slug: "all", label: "\u{1F5C2}\uFE0F Barchasi", icon: "" }, ...categories.map((c) => ({ slug: c.slug, label: `${c.icon} ${c.label}` }))];

  const demoNotice = !FIREBASE_ENABLED
    ? `<div class="demo-bar">⚠️ Demo rejim: mahsulot o'zgarishlari faqat shu qurilmada saqlanadi. Barcha foydalanuvchida ko'rinishi uchun app.js dagi CONFIG.FIREBASE ni sozlang.</div>`
    : "";

  let body = "";
  if (state.category === "all") {
    // Har bir kategoriya bo'yicha guruhlab, barcha mahsulotlarni ko'rsatamiz.
    categories.forEach((cat) => {
      const items = all.filter((p) => p.category === cat.slug);
      if (items.length === 0) return;
      body += `
        <div class="cat-section">
          <div class="section-title">${cat.icon} ${cat.label} <span style="color:var(--text-faint);font-weight:600;">(${items.length})</span></div>
          <div class="grid">${items.map(productCard).join("")}</div>
        </div>`;
    });
    if (!body) body = `<div class="empty-state"><span class="emoji">📦</span>Hozircha mahsulot yo'q</div>`;
  } else {
    const items = all.filter((p) => p.category === state.category);
    const cat = categoryInfo(state.category);
    // Subkategoriyalar bo'yicha guruhlaymiz (masalan Wi-Fi 4/5/6/7 Router)
    const subGroups = {};
    const noSub = [];
    items.forEach((p) => {
      if (p.subcategory) { (subGroups[p.subcategory] = subGroups[p.subcategory] || []).push(p); }
      else noSub.push(p);
    });
    body += `<div class="section-title">${cat.icon} ${cat.label} <span style="color:var(--text-faint);font-weight:600;">(${items.length})</span></div>`;
    if (noSub.length) body += `<div class="grid">${noSub.map(productCard).join("")}</div>`;
    Object.keys(subGroups).forEach((sub) => {
      body += `<div class="subcat-title">${sub}</div><div class="grid">${subGroups[sub].map(productCard).join("")}</div>`;
    });
    if (items.length === 0) body += `<div class="empty-state"><span class="emoji">📦</span>Bu bo'limda mahsulot yo'q</div>`;
  }

  return `
    ${isAdmin() ? `<div class="admin-bar"><span>🛠️ Administrator rejimi</span><div style="display:flex;gap:8px;"><button data-goscreen="adminCategories">🗂️ Kategoriyalar</button><button data-newcam="1">+ Mahsulot qo'shish</button></div></div>` : ""}
    ${demoNotice}
    <div class="hero">
      <div class="hero-eyebrow">Xavfsizlik va tarmoq tizimlari</div>
      <div class="hero-title">TP-Link VIGI, Mercusys<br>va Ezviz mahsulotlari</div>
      <div class="hero-desc">Kamera, NVR, Wi-Fi router, Mesh tizim va PoE kommutatorlarni tanlang — biz o'rnatib beramiz.</div>
    </div>

    <div class="chip-row">
      ${cats.map((c) => `<button class="chip ${state.category === c.slug ? "active" : ""}" data-category="${c.slug}">${c.label}</button>`).join("")}
    </div>

    ${body}
  `;
}

function productCard(p) {
  const inCart = cartQty(p.id) > 0;
  const cat = categoryInfo(p.category);
  return `
    <div class="card" data-open="${p.id}">
      <div class="card-img" ${p.image ? `style="background-image:url('${p.image}');background-size:cover;background-position:center;"` : ""}>
        <span class="card-tag">${p.subcategory ? escapeHtml(p.subcategory) : cat.label}</span>
        ${isAdmin() ? `
          <div class="card-admin-actions">
            <span class="card-icon-btn" data-editcam="${p.id}">✏️</span>
            <span class="card-icon-btn danger" data-delcam="${p.id}">🗑</span>
          </div>` : ""}
        ${p.image ? "" : "📷"}
      </div>
      <div class="card-body">
        <div class="card-name">${escapeHtml(p.name)}</div>
        <div class="card-bottom">
          <span class="card-price">${fmtSum(p.price)}</span>
          <button class="add-btn ${inCart ? "added" : ""}" data-quickadd="${p.id}">${inCart ? "✓" : "+"}</button>
        </div>
      </div>
    </div>
  `;
}

/* ---------------------------- Qidiruv ---------------------------- */
function renderSearch() {
  const q = state.searchQuery.trim().toLowerCase();
  const results = q
    ? getAllProducts().filter((p) => p.name.toLowerCase().includes(q) || (p.desc || "").toLowerCase().includes(q))
    : [];
  return `
    <div class="section-title">Qidiruv</div>
    <div class="search-box">
      <span class="search-icon">🔍</span>
      <input type="text" id="searchInput" placeholder="Mahsulot nomini kiriting..." value="${escapeHtml(state.searchQuery)}">
    </div>
    ${
      !q
        ? `<div class="empty-state"><span class="emoji">🔎</span>Mahsulot nomini yozing, masalan: "VIGI", "NVR", "Deco", "Archer"</div>`
        : results.length === 0
        ? `<div class="empty-state"><span class="emoji">🙅‍♂️</span>Hech narsa topilmadi</div>`
        : `<div class="grid">${results.map(productCard).join("")}</div>`
    }
  `;
}

/* ---------------------------- Mahsulot detali ---------------------------- */
function renderDetail(id) {
  const p = findProduct(id);
  if (!p) return `<div class="empty-state">Mahsulot topilmadi</div>`;
  const qty = cartQty(p.id);
  const comments = commentsForProduct(p.id);
  const cat = categoryInfo(p.category);

  return `
    <button class="back-btn" data-back="1">‹ Orqaga</button>
    <div class="detail-hero" ${p.image ? `style="background-image:url('${p.image}');background-size:cover;background-position:center;"` : ""}>${p.image ? "" : "📷"}</div>
    ${isAdmin() ? `
      <div class="admin-actions">
        <button data-editcam="${p.id}">✏️ Tahrirlash</button>
        <button data-delcam="${p.id}" class="danger">🗑 O'chirish</button>
      </div>` : ""}
    <div class="detail-location">${cat.icon} ${cat.label}${p.subcategory ? " · " + escapeHtml(p.subcategory) : ""}</div>
    <h2 class="detail-title">${escapeHtml(p.name)}</h2>
    <div class="detail-price">${fmtSum(p.price)}</div>

    <p style="font-size:13px;color:var(--text-dim);line-height:1.65;margin-bottom:18px;white-space:pre-line;">${escapeHtml(p.desc || "")}</p>

    <button class="add-to-cart-btn" data-addcart="${p.id}">
      ${qty > 0 ? `Savatda: ${qty} ta · Yana qo'shish` : "Savatga qo'shish"}
    </button>

    <div class="comment-section">
      <div class="section-title" style="font-size:14.5px;">Izohlar (${comments.length})</div>
      <form class="comment-form" data-comment-form="${p.id}">
        <textarea placeholder="Savol yoki izohingizni yozing..." required></textarea>
        <button type="submit" class="comment-send">Yuborish</button>
      </form>
      ${
        comments.length === 0
          ? `<div class="empty-state" style="padding:24px 10px;"><span class="emoji">💬</span>Hali izoh yo'q. Birinchi bo'lib yozing!</div>`
          : comments.slice().reverse().map((cm) => `
            <div class="comment-item">
              <div class="comment-head"><b>${escapeHtml(cm.name)}</b><span>${cm.date}</span></div>
              <div class="comment-text">${escapeHtml(cm.text)}</div>
            </div>
          `).join("")
      }
    </div>
  `;
}

/* ---------------------------- Savat ---------------------------- */
function renderCart() {
  const items = state.cart.map((i) => ({ ...findProduct(i.id), qty: i.qty })).filter((i) => i.id);
  const camTotal = cartProductTotal();
  const cabTotal = cableTotalSum();
  const total = grandTotalUsd();
  const empty = items.length === 0 && !state.cable.set && !state.cable.tok;

  return `
    <div class="section-title">Savat</div>

    ${
      items.length === 0
        ? `<div class="empty-state"><span class="emoji">🛒</span>Savatda hali mahsulot yo'q</div>`
        : items.map((p) => `
          <div class="cart-item">
            <div class="cart-item-img" ${p.image ? `style="background-image:url('${p.image}');background-size:cover;background-position:center;"` : ""}>${p.image ? "" : "📷"}</div>
            <div class="cart-item-info">
              <div class="cart-item-name">${escapeHtml(p.name)}</div>
              <div class="cart-item-bottom">
                <div class="qty-control">
                  <button data-cartminus="${p.id}">−</button>
                  <span>${p.qty}</span>
                  <button data-cartplus="${p.id}">+</button>
                </div>
                <span class="cart-item-price">${fmtSum(p.price * p.qty)}</span>
              </div>
            </div>
          </div>
        `).join("")
    }

    <div class="cable-box">
      <h3>🔌 Kabel hisoblagichi</h3>
      <p class="cable-desc">O'rnatish uchun kerakli kabel uzunligini metrda kiriting — narxi avtomatik hisoblab, umumiy summaga qo'shiladi.</p>

      <div class="cable-row">
        <div class="cable-row-label"><b>Set kabel</b><small>1 metr — 4 000 so'm</small></div>
        <input type="number" min="0" id="setKabelInput" value="${state.cable.set || ""}" placeholder="0 m">
      </div>
      <div class="cable-row">
        <div class="cable-row-label"><b>Tok kabel</b><small>1 metr — 2 500 so'm</small></div>
        <input type="number" min="0" id="tokKabelInput" value="${state.cable.tok || ""}" placeholder="0 m">
      </div>

      <div class="cable-sum-line"><span>Kabel narxi jami</span><b>${(cabTotal).toLocaleString("ru-RU").replace(/,/g," ")} so'm</b></div>
    </div>

    <div class="summary-box">
      <div class="summary-line"><span>Mahsulotlar narxi</span><span>${fmtSum(camTotal)}</span></div>
      <div class="summary-line"><span>Kabel narxi</span><span>${(cabTotal).toLocaleString("ru-RU").replace(/,/g," ")} so'm</span></div>
      <div class="summary-line total"><span>Jami to'lov</span><span>${(Math.round(total*CONFIG.USD_TO_SUM)+cabTotal).toLocaleString("ru-RU").replace(/,/g," ")} so'm</span></div>
    </div>

    <button class="order-btn" id="goLocationBtn" ${empty ? "disabled" : ""}>Buyurtma berish</button>
  `;
}

/* ---------------------------- Admin: mahsulot qo'shish / tahrirlash forma ---------------------------- */
function renderAdminForm(id) {
  const editing = !!id;
  const categories = getAllCategories();
  const p = editing ? findProduct(id) : {
    name: "", category: categories[0]?.slug || "", subcategory: "", price: "", desc: "", image: "",
  };

  return `
    <button class="back-btn" data-back="1">‹ Orqaga</button>
    <div class="section-title">${editing ? "Mahsulotni tahrirlash" : "Yangi mahsulot qo'shish"}</div>

    <form id="adminCamForm" class="onboard-form">
      <div class="field">
        <span>Rasm</span>
        <div class="img-upload" id="imgUploadBox">
          ${p.image ? `<img src="${p.image}" class="img-preview">` : `<span class="img-upload-placeholder">📷 Rasm tanlash uchun bosing</span>`}
        </div>
        <input type="file" id="camImageInput" accept="image/*" style="display:none;">
      </div>

      <label class="field"><span>Mahsulot nomi</span>
        <input type="text" id="camName" value="${escapeHtml(p.name)}" required>
      </label>

      <label class="field"><span>Kategoriya</span>
        <select id="camCategory" class="select-input">
          ${categories.map((c) => `<option value="${c.slug}" ${p.category === c.slug ? "selected" : ""}>${c.icon} ${c.label}</option>`).join("")}
        </select>
      </label>

      <label class="field"><span>Subkategoriya (ixtiyoriy)</span>
        <input type="text" id="camSub" value="${escapeHtml(p.subcategory || "")}" placeholder="Masalan: Wi-Fi 6 Router">
      </label>

      <label class="field"><span>Narxi (USD, $)</span>
        <input type="number" id="camPrice" value="${p.price}" min="0" step="0.1" required>
      </label>

      <label class="field"><span>Tavsif</span>
        <textarea id="camDesc" rows="5">${escapeHtml(p.desc || "")}</textarea>
      </label>

      <button type="submit" class="btn-primary">${editing ? "Saqlash" : "Qo'shish"}</button>
    </form>
  `;
}

let pendingImageDataUrl = null;

function resizeImageFile(file, maxWidth) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.8));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function saveAdminCamera(id) {
  const name = document.getElementById("camName").value.trim();
  const category = document.getElementById("camCategory").value;
  const subcategory = document.getElementById("camSub").value.trim();
  const price = parseFloat(document.getElementById("camPrice").value) || 0;
  const desc = document.getElementById("camDesc").value.trim();

  const fields = { name, category, subcategory: subcategory || null, price, desc };
  if (pendingImageDataUrl) fields.image = pendingImageDataUrl;

  if (FIREBASE_ENABLED && fbDb) {
    const realId = id || ("custom_" + Date.now());
    const existing = id ? findProduct(id) : {};
    fbDb.ref("products/" + realId).set({ id: realId, image: existing.image || null, ...existing, ...fields });
    pendingImageDataUrl = null;
    showToast("Saqlandi ✓ (barcha foydalanuvchiga yuboriladi)");
    goScreen("home");
    return;
  }

  // Demo-rejim (Firebase sozlanmagan) — faqat shu qurilmada saqlanadi
  const isDefault = DEFAULT_PRODUCTS.some((d) => d.id === id);
  if (id && isDefault) {
    state.productOverrides[id] = { ...(state.productOverrides[id] || {}), ...fields };
  } else if (id) {
    const idx = state.customProducts.findIndex((c) => c.id === id);
    if (idx > -1) state.customProducts[idx] = { ...state.customProducts[idx], ...fields };
  } else {
    state.customProducts.push({ id: "custom_" + Date.now(), ...fields });
  }
  pendingImageDataUrl = null;
  persist();
  showToast("Saqlandi ✓ (demo rejim — faqat shu qurilmada)");
  goScreen("home");
}

function deleteAdminCamera(id) {
  if (!confirm("Bu mahsulotni o'chirmoqchimisiz?")) return;

  if (FIREBASE_ENABLED && fbDb) {
    fbDb.ref("products/" + id).remove();
    showToast("O'chirildi (barcha foydalanuvchida)");
    goScreen("home");
    return;
  }

  const isDefault = DEFAULT_PRODUCTS.some((d) => d.id === id);
  if (isDefault) {
    state.productOverrides[id] = { ...(state.productOverrides[id] || {}), deleted: true };
  } else {
    state.customProducts = state.customProducts.filter((c) => c.id !== id);
  }
  persist();
  showToast("O'chirildi");
  goScreen("home");
}

/* ---------------------------- Admin: Izohlar bo'limi ---------------------------- */
function renderAdminComments() {
  const all = getAllCommentsFlat().sort((a, b) => (b.ts || 0) - (a.ts || 0));
  return `
    <button class="back-btn" data-back="profile">‹ Profilga qaytish</button>
    <div class="section-title">💬 Izohlar <span style="color:var(--text-faint);font-weight:600;">(${all.length})</span></div>
    <p class="section-sub">Mahsulotlarga yozilgan barcha izohlar shu yerda, yozilgan tartibda (yangisi tepada) ko'rinadi va yangi izoh kelishi bilan avtomatik yangilanadi.</p>
    ${
      all.length === 0
        ? `<div class="empty-state"><span class="emoji">💬</span>Hali hech qanday izoh yo'q</div>`
        : all.map((cm) => `
          <div class="comment-item" data-open="${cm.productId}" style="cursor:pointer;">
            <div class="comment-head"><b>${escapeHtml(cm.name)}</b><span>${cm.date}</span></div>
            <div style="font-size:12px;color:var(--text-faint);margin-bottom:4px;">📦 ${escapeHtml(cm.productName)}${cm.phone ? " · " + escapeHtml(cm.phone) : ""}</div>
            <div class="comment-text">${escapeHtml(cm.text)}</div>
          </div>
        `).join("")
    }
  `;
}

/* ---------------------------- Admin: Akkauntlar bo'limi ---------------------------- */
function renderAdminAccounts() {
  const accounts = getAllAccounts();
  return `
    <button class="back-btn" data-back="profile">‹ Profilga qaytish</button>
    <div class="section-title">👥 Akkauntlar <span style="color:var(--text-faint);font-weight:600;">(${accounts.length})</span></div>
    <p class="section-sub">Saytda ro'yxatdan o'tgan barcha foydalanuvchilar shu yerda ko'rinadi — yangi akkaunt ochilishi bilan avtomatik shu ro'yxatga qo'shiladi.</p>
    ${!FIREBASE_ENABLED ? `<div class="demo-bar">⚠️ Demo rejim: bu yerda faqat shu qurilmada ro'yxatdan o'tgan/kirgan akkauntlar ko'rinadi. Barcha foydalanuvchini ko'rish uchun app.js dagi CONFIG.FIREBASE ni sozlang.</div>` : ""}
    ${
      accounts.length === 0
        ? `<div class="empty-state"><span class="emoji">👤</span>Hali akkaunt yo'q</div>`
        : accounts.map((a) => `
          <div class="order-history-item">
            <div class="order-history-head">
              <span><b>${escapeHtml(a.name)}</b>${a.isAdmin ? ` <span class="admin-badge">ADMIN</span>` : ""}</span>
              <span>${a.createdAt ? new Date(a.createdAt).toLocaleDateString("uz-UZ") : ""}</span>
            </div>
            <div class="order-history-sum" style="font-weight:500;">📞 ${escapeHtml(a.phone)} · 📦 ${a.ordersCount || 0} ta buyurtma</div>
          </div>
        `).join("")
    }
  `;
}

/* ---------------------------- Admin: Kategoriyalar bo'limi ---------------------------- */
function renderAdminCategories() {
  const cats = getAllCategories();
  return `
    <button class="back-btn" data-back="home">‹ Bosh menyuga qaytish</button>
    <div class="section-title">🗂️ Kategoriyalar <span style="color:var(--text-faint);font-weight:600;">(${cats.length})</span></div>
    <p class="section-sub">Tartibni o'zgartirish uchun ↑ / ↓ tugmalaridan, nomi yoki ikonkasini o'zgartirish uchun ✏️ dan foydalaning.</p>

    ${!FIREBASE_ENABLED ? `<div class="demo-bar">⚠️ Demo rejim: kategoriya o'zgarishlari faqat shu qurilmada saqlanadi. Barcha foydalanuvchida ko'rinishi uchun app.js dagi CONFIG.FIREBASE ni sozlang.</div>` : ""}

    <div class="cat-admin-list">
      ${cats.map((c, i) => `
        <div class="cat-admin-row">
          <span class="cat-admin-icon">${c.icon || "📦"}</span>
          <span class="cat-admin-label">${escapeHtml(c.label)}</span>
          <div class="cat-admin-actions">
            <button class="cat-admin-btn" data-catup="${c.slug}" ${i === 0 ? "disabled" : ""} title="Yuqoriga">↑</button>
            <button class="cat-admin-btn" data-catdown="${c.slug}" ${i === cats.length - 1 ? "disabled" : ""} title="Pastga">↓</button>
            <button class="cat-admin-btn" data-catedit="${c.slug}" title="Tahrirlash">✏️</button>
            <button class="cat-admin-btn danger" data-catdel="${c.slug}" title="O'chirish">🗑</button>
          </div>
        </div>
      `).join("")}
    </div>

    <div class="section-title" style="margin-top:22px;font-size:14.5px;">+ Yangi kategoriya qo'shish</div>
    <form id="addCategoryForm" class="onboard-form">
      <label class="field"><span>Nomi</span>
        <input type="text" id="newCatLabel" placeholder="Masalan: Ezviz Mesh" required minlength="2">
      </label>
      <label class="field"><span>Ikonka (emoji, ixtiyoriy)</span>
        <input type="text" id="newCatIcon" placeholder="🕸️" maxlength="4">
      </label>
      <button type="submit" class="btn-primary">Qo'shish</button>
    </form>
  `;
}

/* ---------------------------- Profil ---------------------------- */
function renderProfile() {
  const a = state.account;
  const initials = a.name.trim().slice(0, 1).toUpperCase();
  return `
    <div class="section-title">Profil</div>
    <div class="profile-card">
      <div class="profile-avatar">${initials}</div>
      <div class="profile-name">${escapeHtml(a.name)} ${isAdmin() ? `<span class="admin-badge">ADMIN</span>` : ""}</div>
      <div class="profile-phone">${escapeHtml(a.phone)}</div>
    </div>

    <div class="profile-list">
      <div class="profile-row"><span>Ro'yxatdan o'tgan sana</span><span>${new Date(a.createdAt).toLocaleDateString("uz-UZ")}</span></div>
      <div class="profile-row"><span>Jami buyurtmalar</span><span>${state.orders.length} ta</span></div>
    </div>

    ${isAdmin() ? `
      <div class="admin-bar" style="flex-direction:column;align-items:stretch;gap:8px;">
        <span>🛠️ Administrator bo'limlari</span>
        <button data-goscreen="adminCategories">🗂️ Kategoriyalar (${getAllCategories().length})</button>
        <button data-goscreen="adminComments">💬 Izohlar (${getAllCommentsFlat().length})</button>
        <button data-goscreen="adminAccounts">👥 Akkauntlar (${getAllAccounts().length})</button>
      </div>
    ` : ""}

    <button class="logout-btn" id="logoutBtn">Chiqish</button>

    <div class="section-title" style="margin-top:22px;font-size:14.5px;">Buyurtmalar tarixi</div>
    ${
      state.orders.length === 0
        ? `<div class="empty-state" style="padding:30px 10px;"><span class="emoji">📦</span>Hali buyurtma yo'q</div>`
        : state.orders.slice().reverse().map((o) => `
          <div class="order-history-item">
            <div class="order-history-head"><span>${o.date}</span><span>${o.items.length} mahsulot</span></div>
            <div class="order-history-sum">${o.totalSumFormatted || ""}</div>
            ${o.location && o.location.text ? `<div style="font-size:12px;color:var(--text-faint);margin-top:4px;">📍 ${escapeHtml(o.location.text)}</div>` : ""}
          </div>
        `).join("")
    }
  `;
}

/* ---------------------------- Dinamik event listenerlar ---------------------------- */
function attachDynamicListeners() {
  document.querySelectorAll("[data-category]").forEach((el) => {
    el.addEventListener("click", () => { state.category = el.dataset.category; render(); });
  });

  document.querySelectorAll("[data-open]").forEach((el) => {
    el.addEventListener("click", () => goScreen("detail", { id: el.dataset.open }));
  });

  document.querySelectorAll("[data-back]").forEach((el) => {
    el.addEventListener("click", () => goScreen(el.dataset.back === "profile" ? "profile" : "home"));
  });

  document.querySelectorAll("[data-goscreen]").forEach((el) => {
    el.addEventListener("click", () => goScreen(el.dataset.goscreen));
  });

  document.querySelectorAll("[data-quickadd]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      addToCart(el.dataset.quickadd, 1);
      showToast("Savatga qo'shildi ✓");
      render();
    });
  });

  document.querySelectorAll("[data-addcart]").forEach((el) => {
    el.addEventListener("click", () => {
      addToCart(el.dataset.addcart, 1);
      showToast("Savatga qo'shildi ✓");
      render();
    });
  });

  document.querySelectorAll("[data-cartplus]").forEach((el) => {
    el.addEventListener("click", () => { addToCart(el.dataset.cartplus, 1); render(); });
  });
  document.querySelectorAll("[data-cartminus]").forEach((el) => {
    el.addEventListener("click", () => { addToCart(el.dataset.cartminus, -1); render(); });
  });

  const setInput = document.getElementById("setKabelInput");
  const tokInput = document.getElementById("tokKabelInput");
  // MUHIM: bu yerda to'liq render() chaqirilmaydi — aks holda har bir
  // bosilgan tugmadan keyin input elementi qayta yaratilib, fokus (kursor)
  // undan uzilib qolar edi va faqat 1 ta raqam kiritish mumkin bo'lardi.
  // Shuning uchun faqat summalar DOM'da to'g'ridan-to'g'ri yangilanadi.
  if (setInput) setInput.addEventListener("input", () => {
    state.cable.set = Math.max(0, parseFloat(setInput.value) || 0);
    persist(); updateCableSummary();
  });
  if (tokInput) tokInput.addEventListener("input", () => {
    state.cable.tok = Math.max(0, parseFloat(tokInput.value) || 0);
    persist(); updateCableSummary();
  });

  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", () => { state.searchQuery = searchInput.value; render(); });
    searchInput.focus();
    searchInput.selectionStart = searchInput.selectionEnd = searchInput.value.length;
  }

  document.querySelectorAll("[data-comment-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = form.dataset.commentForm;
      const textarea = form.querySelector("textarea");
      const text = textarea.value.trim();
      if (!text) return;
      const entry = {
        name: state.account.name,
        phone: state.account.phone,
        text,
        date: new Date().toLocaleDateString("uz-UZ"),
        ts: Date.now(),
      };
      if (FIREBASE_ENABLED && fbDb) {
        // Barcha foydalanuvchiga (jumladan Admin > Izohlar bo'limiga) real-time yetib boradi.
        fbDb.ref("comments/" + id).push(entry);
      } else {
        if (!state.comments[id]) state.comments[id] = [];
        state.comments[id].push(entry);
        persist();
        render();
      }
      textarea.value = "";
      showToast("Izohingiz qo'shildi");
    });
  });

  const orderBtn = document.getElementById("goLocationBtn");
  if (orderBtn) orderBtn.addEventListener("click", () => {
    pendingLocation = null;
    goScreen("orderLocation");
    // "Buyurtma berish" bosilishi bilan joylashuv koordinatasi avtomatik
    // aniqlanadi (foydalanuvchi alohida tugma bosishi shart emas).
    detectLocation(document.getElementById("locStatus"));
  });

  const shareLocBtn = document.getElementById("shareLocBtn");
  if (shareLocBtn) {
    shareLocBtn.addEventListener("click", () => {
      detectLocation(document.getElementById("locStatus"));
    });
  }

  const confirmBtn = document.getElementById("confirmOrderBtn");
  if (confirmBtn) {
    confirmBtn.addEventListener("click", () => {
      const manual = document.getElementById("manualAddress").value.trim();
      if (!pendingLocation && !manual) {
        showToast("Joylashuvni yuboring yoki manzilni yozing");
        return;
      }
      // Koordinata (avtomatik aniqlangan) va qo'lda yozilgan manzil bo'lsa —
      // ikkalasi ham bitta "text" ko'rinishida Buyurtma ro'yxatiga qo'shiladi.
      const coordText = pendingLocation && pendingLocation.text ? pendingLocation.text : "";
      const combinedText = [manual, coordText].filter(Boolean).join(" | ");
      const location = {
        ...(pendingLocation || {}),
        address: manual || (pendingLocation && pendingLocation.address) || "",
        text: combinedText || coordText || manual,
      };
      submitOrder(location);
    });
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) logoutBtn.addEventListener("click", () => {
    state.account = null;
    localStorage.removeItem(LS.account);
    state.cart = []; state.cable = { set: 0, tok: 0 }; state.orders = [];
    document.getElementById("regName").value = "";
    document.getElementById("regPhone").value = "";
    boot();
  });

  document.querySelectorAll("[data-newcam]").forEach((el) => {
    el.addEventListener("click", () => { pendingImageDataUrl = null; goScreen("adminForm", { id: null }); });
  });
  document.querySelectorAll("[data-editcam]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      pendingImageDataUrl = null;
      goScreen("adminForm", { id: el.dataset.editcam });
    });
  });
  document.querySelectorAll("[data-delcam]").forEach((el) => {
    el.addEventListener("click", (e) => { e.stopPropagation(); deleteAdminCamera(el.dataset.delcam); });
  });

  document.querySelectorAll("[data-catup]").forEach((el) => {
    el.addEventListener("click", () => moveCategory(el.dataset.catup, -1));
  });
  document.querySelectorAll("[data-catdown]").forEach((el) => {
    el.addEventListener("click", () => moveCategory(el.dataset.catdown, 1));
  });
  document.querySelectorAll("[data-catedit]").forEach((el) => {
    el.addEventListener("click", () => editCategory(el.dataset.catedit));
  });
  document.querySelectorAll("[data-catdel]").forEach((el) => {
    el.addEventListener("click", () => deleteCategory(el.dataset.catdel));
  });

  const addCategoryForm = document.getElementById("addCategoryForm");
  if (addCategoryForm) {
    addCategoryForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const label = document.getElementById("newCatLabel").value;
      const icon = document.getElementById("newCatIcon").value;
      addCategory(label, icon);
      addCategoryForm.reset();
    });
  }

  const imgBox = document.getElementById("imgUploadBox");
  const imgInput = document.getElementById("camImageInput");
  if (imgBox && imgInput) {
    imgBox.addEventListener("click", () => imgInput.click());
    imgInput.addEventListener("change", async () => {
      const file = imgInput.files[0];
      if (!file) return;
      const dataUrl = await resizeImageFile(file, 640);
      pendingImageDataUrl = dataUrl;
      imgBox.innerHTML = `<img src="${dataUrl}" class="img-preview">`;
    });
  }

  const adminForm = document.getElementById("adminCamForm");
  if (adminForm) {
    adminForm.addEventListener("submit", (e) => {
      e.preventDefault();
      saveAdminCamera(state.screenParams.id);
    });
  }
}

function addToCart(id, delta) {
  const existing = state.cart.find((i) => i.id === id);
  if (existing) {
    existing.qty += delta;
    if (existing.qty <= 0) state.cart = state.cart.filter((i) => i.id !== id);
  } else if (delta > 0) {
    state.cart.push({ id, qty: delta });
  }
  persist();
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

/* ---------------------------- Buyurtma: lokatsiya so'rash ---------------------------- */
let pendingLocation = null;

/* Joylashuvni aniqlaydi va pendingLocation ga yozadi. Avvalgi versiyada
   joylashuv doim ham to'g'ri aniqlanavermas edi (ayniqsa yopiq joyda GPS
   signali kuchsiz bo'lganda yoki HTTPS bo'lmagan saytlarda) — shu sabablarni
   hisobga olib, aniq xatolik xabarlari va ikkinchi (kamroq aniqlik bilan,
   lekin ko'proq kutish vaqti bilan) urinish qo'shildi. */
function detectLocation(statusEl) {
  if (!statusEl) return;
  if (!navigator.geolocation) {
    statusEl.textContent = "❌ Brauzeringiz joylashuvni aniqlay olmaydi. Manzilni qo'lda yozing.";
    return;
  }
  const isSecure = location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1";
  if (!isSecure) {
    statusEl.textContent = "❌ Joylashuvni aniqlash faqat HTTPS saytlarda ishlaydi. Iltimos, manzilni qo'lda yozing.";
    return;
  }

  statusEl.textContent = "📡 Aniqlanmoqda...";

  function onSuccess(pos) {
    const lat = pos.coords.latitude, lng = pos.coords.longitude;
    pendingLocation = {
      ...(pendingLocation || {}),
      lat, lng,
      mapsUrl: `https://maps.google.com/?q=${lat},${lng}`,
      text: `Koordinatalar: ${lat.toFixed(6)}, ${lng.toFixed(6)} — https://maps.google.com/?q=${lat},${lng}`,
    };
    statusEl.textContent = `✅ Joylashuv aniqlandi (${lat.toFixed(5)}, ${lng.toFixed(5)})`;
  }

  function onFail(err) {
    let msg = "❌ Joylashuvni aniqlab bo'lmadi. Manzilni qo'lda yozing.";
    if (err && err.code === err.PERMISSION_DENIED) msg = "❌ Joylashuvga ruxsat berilmadi. Brauzer sozlamalaridan ruxsat bering yoki manzilni qo'lda yozing.";
    else if (err && err.code === err.POSITION_UNAVAILABLE) msg = "❌ Joylashuv aniqlanmadi (signal yo'q). Manzilni qo'lda yozing.";
    else if (err && err.code === err.TIMEOUT) msg = "❌ Joylashuvni aniqlash vaqti tugadi. Manzilni qo'lda yozing.";
    statusEl.textContent = msg;
  }

  navigator.geolocation.getCurrentPosition(
    onSuccess,
    () => {
      // Birinchi (yuqori aniqlik, tez) urinish muvaffaqiyatsiz bo'lsa —
      // pastroq aniqlik bilan, lekin uzoqroq kutib, qayta urinamiz.
      statusEl.textContent = "📡 Qayta urinilmoqda...";
      navigator.geolocation.getCurrentPosition(
        onSuccess,
        onFail,
        { enableHighAccuracy: false, timeout: 15000, maximumAge: 60000 }
      );
    },
    { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
  );
}

function renderOrderLocation() {
  const total = Math.round(grandTotalUsd() * CONFIG.USD_TO_SUM) + cableTotalSum();
  return `
    <button class="back-btn" data-back="1">‹ Savatga qaytish</button>
    <div class="section-title">Yetkazish manzili</div>
    <p class="section-sub">Buyurtmani rasmiylashtirish uchun joylashuvingizni yuboring yoki manzilni qo'lda yozing.</p>

    <button class="btn-primary" id="shareLocBtn" type="button">📍 Joylashuvimni yuborish</button>
    <div id="locStatus" class="loc-status"></div>

    <div class="field" style="margin-top:16px;">
      <span>Yoki manzilni qo'lda yozing</span>
      <textarea id="manualAddress" rows="3" placeholder="Masalan: Toshkent sh., Chilonzor tumani, ..."></textarea>
    </div>

    <div class="summary-box" style="margin-top:18px;">
      <div class="summary-line total"><span>Jami to'lov</span><span>${total.toLocaleString("ru-RU").replace(/,/g," ")} so'm</span></div>
    </div>

    <button class="order-btn" id="confirmOrderBtn">Buyurtmani tasdiqlash</button>
  `;
}

/* ---------------------------- Buyurtma berish + Telegramga yuborish ---------------------------- */
async function submitOrder(location) {
  const btn = document.getElementById("confirmOrderBtn");
  if (btn) { btn.disabled = true; btn.textContent = "Yuborilmoqda..."; }

  const items = state.cart.map((i) => ({ ...findProduct(i.id), qty: i.qty })).filter((i) => i.id);
  const cabTotal = cableTotalSum();
  const totalSum = Math.round(grandTotalUsd() * CONFIG.USD_TO_SUM) + cabTotal;

  const order = {
    id: "ord_" + Date.now(),
    date: new Date().toLocaleString("uz-UZ"),
    account: { name: state.account.name, phone: state.account.phone },
    items: items.map((i) => ({ name: i.name, qty: i.qty, price: i.price })),
    cable: { set: state.cable.set || 0, tok: state.cable.tok || 0, sum: cabTotal },
    location,
    total: totalSum,
    totalSumFormatted: totalSum.toLocaleString("ru-RU").replace(/,/g," ") + " so'm",
  };

  const message = buildTelegramMessage(order);

  try {
    await sendToTelegram(message);
    state.orders.push(order);
    state.cart = [];
    state.cable = { set: 0, tok: 0 };
    pendingLocation = null;
    persist();
    showToast("Buyurtma qabul qilindi! ✓");
    goScreen("profile");
  } catch (err) {
    console.error(err);
    showToast("Xatolik: buyurtma yuborilmadi. Internetni tekshiring.");
    if (btn) { btn.disabled = false; btn.textContent = "Buyurtmani tasdiqlash"; }
  }
}

function buildTelegramMessage(order) {
  const lines = [];
  lines.push("🆕 <b>YANGI BUYURTMA — Kuzatuv Cam</b>");
  lines.push("");
  lines.push(`👤 <b>Mijoz:</b> ${escapeHtml(order.account.name)}`);
  lines.push(`📞 <b>Telefon:</b> ${escapeHtml(order.account.phone)}`);
  lines.push("");
  if (order.items.length) {
    lines.push("📦 <b>Mahsulotlar:</b>");
    order.items.forEach((i) => {
      lines.push(`• ${escapeHtml(i.name)} — ${i.qty} ta — ${fmtSum(i.price * i.qty)}`);
    });
  }
  if (order.cable.set > 0 || order.cable.tok > 0) {
    lines.push("");
    lines.push("🔌 <b>Kabellar:</b>");
    if (order.cable.set > 0) lines.push(`• Set kabel — ${order.cable.set} m — ${(order.cable.set*4000).toLocaleString("ru-RU").replace(/,/g," ")} so'm`);
    if (order.cable.tok > 0) lines.push(`• Tok kabel — ${order.cable.tok} m — ${(order.cable.tok*2500).toLocaleString("ru-RU").replace(/,/g," ")} so'm`);
  }
  if (order.location && (order.location.text || order.location.address || order.location.mapsUrl)) {
    lines.push("");
    lines.push("📍 <b>Manzil:</b>");
    if (order.location.text) {
      lines.push(escapeHtml(order.location.text));
    } else {
      if (order.location.address) lines.push(escapeHtml(order.location.address));
      if (order.location.mapsUrl) lines.push(order.location.mapsUrl);
    }
  }
  lines.push("");
  lines.push(`💰 <b>Jami summa:</b> ${order.totalSumFormatted}`);
  lines.push(`🕐 ${order.date}`);
  return lines.join("\n");
}

async function sendToTelegram(text) {
  if (CONFIG.BOT_TOKEN === "YOUR_BOT_TOKEN_HERE") {
    throw new Error("BOT_TOKEN sozlanmagan. app.js faylidagi CONFIG bo'limini to'ldiring.");
  }
  const url = `https://api.telegram.org/bot${CONFIG.BOT_TOKEN}/sendMessage`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CONFIG.CHAT_ID,
      text,
      parse_mode: "HTML",
    }),
  });
  const data = await res.json();
  if (!data.ok) throw new Error(data.description || "Telegram xatoligi");
  return data;
}

/* ---------------------------- Telegram Mini App ---------------------------- */
function initTelegramWebApp() {
  if (window.Telegram && window.Telegram.WebApp) {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();
    const tgUser = tg.initDataUnsafe && tg.initDataUnsafe.user;
    if (tgUser && !state.account) {
      const nameInput = document.getElementById("regName");
      if (nameInput && !nameInput.value) nameInput.value = tgUser.first_name || "";
    }
  }
}

/* ---------------------------- Ilovani ishga tushirish ---------------------------- */
function boot() {
  if (state.account) {
    loadAccountSession();
    document.getElementById("onboarding").style.display = "none";
    document.getElementById("mainApp").style.display = "block";
    goScreen("home");
  } else {
    document.getElementById("onboarding").style.display = "block";
    document.getElementById("mainApp").style.display = "none";
  }
}

initTelegramWebApp();
initFirebase();
boot();
