"use strict";
/* Kuzatuvchi CAM — Telegram Mini App.
   Xavfsizlik: hech qanday kalit yo'q; har bir so'rov Telegram imzosi (initData) bilan yuboriladi,
   narx/admin huquqi serverda tekshiriladi; barcha matnlar html`` orqali avtomatik escape qilinadi (XSS yo'q). */
const tg = window.Telegram && window.Telegram.WebApp;
const $ = (s, r = document) => r.querySelector(s);

/* ---------- Xavfsiz shablon ---------- */
class Raw { constructor(s) { this.s = s; } }
const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const put = (v) => v instanceof Raw ? v.s : Array.isArray(v) ? v.map(put).join("")
  : v == null || v === false ? "" : String(v).replace(/[&<>"']/g, (c) => ESC[c]);
const html = (strs, ...vals) => new Raw(strs.reduce((a, s, i) => a + s + (i < vals.length ? put(vals[i]) : ""), ""));

/* ---------- Holat ---------- */
const S = { screen: "home", params: {}, stack: [], root: "home", cat: "all", q: "", chat: [], typing: false,
  orders: null, admin: null, adminTab: "orders", comments: {}, loc: null, cart: {}, cable: { set: 0, tok: 0 } };
const STATUS = { new: "Yangi", accepted: "Qabul qilindi", delivering: "Yo'lda", done: "Yakunlandi", cancelled: "Bekor qilindi" };
const TABS = ["home", "search", "assistant", "cart", "profile"];

/* ---------- Yordamchilar ---------- */
const z = (n) => String(n).padStart(2, "0");
const som = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " so'm";
const usd = (v) => "$" + Number(v).toFixed(2).replace(/\.00$/, "");
const lineSum = (p, q) => Math.round(p.price * S.rate * q);
const dt = (ts) => { const d = new Date(ts * 1000); return `${z(d.getDate())}.${z(d.getMonth() + 1)}.${d.getFullYear()} ${z(d.getHours())}:${z(d.getMinutes())}`; };
const haptic = (t) => { try { tg.HapticFeedback.impactOccurred(t || "light"); } catch (e) { /* eski versiya */ } };
const ask = (msg) => new Promise((r) => tg && tg.isVersionAtLeast("6.2") ? tg.showConfirm(msg, r) : r(confirm(msg)));

function toast(msg) {
  const t = $("#toast");
  t.textContent = msg; t.classList.add("show");
  clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("show"), 2600);
}

async function api(path, { json, body, method } = {}) {
  const headers = { Authorization: "tma " + (tg ? tg.initData : "") };
  if (json) headers["Content-Type"] = "application/json";
  const r = await fetch(path, { method: method || (json || body ? "POST" : "GET"), headers, body: json ? JSON.stringify(json) : body });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(d.error || "Tarmoq xatosi, qayta urinib ko'ring");
  return d;
}

const store = {
  key: "kc",
  load() { try { return JSON.parse(localStorage.getItem(this.key)) || {}; } catch (e) { return {}; } },
  save() { try { localStorage.setItem(this.key, JSON.stringify({ cart: S.cart, cable: S.cable })); } catch (e) { /* xotira yopiq */ } },
};

const CAM = html`<svg viewBox="0 0 24 24"><path d="M3 7.5h11.5v8H3z"/><path d="m14.5 10 5-2.5v8l-5-2.5"/><path d="M7 15.5v3h3"/></svg>`;
const PH = html`<div class="ph">${CAM}</div>`;
const img = (p) => p.image ? html`<img src="${p.image}" alt="" loading="lazy">` : PH;
// Rasm topilmasa — bir xil zaxira belgi (inline onerror CSP bilan taqiqlangan)
document.addEventListener("error", (e) => {
  const t = e.target;
  if (t.tagName === "IMG" && !t.classList.contains("top-logo") && !t.dataset.f) {
    t.dataset.f = 1; const d = document.createElement("div"); d.innerHTML = PH.s; t.replaceWith(d.firstChild);
  }
}, true);

/* ---------- Navigatsiya ---------- */
function render() {
  $("#view").innerHTML = SCREENS[S.screen](S.params).s;
  document.querySelectorAll(".tabs button").forEach((b) => b.classList.toggle("on", b.dataset.id === S.root));
  const n = Object.values(S.cart).reduce((a, b) => a + b, 0);
  $("#badge").hidden = !n; $("#badge").textContent = n;
  if (tg && tg.BackButton) S.stack.length ? tg.BackButton.show() : tg.BackButton.hide();
  if (S.screen === "assistant") scrollTo(0, document.body.scrollHeight);
  tick();
}
function go(screen, params = {}, push = true) {
  if (push) S.stack.push({ screen: S.screen, params: S.params, y: scrollY });
  S.screen = screen; S.params = params; render(); toTop();
}
function back() {
  const p = S.stack.pop(); if (!p) return;
  S.screen = p.screen; S.params = p.params; render(); scrollTo(0, p.y || 0);
}
function tab(name) { S.stack = []; S.root = name; S.screen = name; S.params = {}; render(); toTop(); }
const toTop = () => S.screen !== "assistant" && scrollTo(0, 0);

function tick() {
  const el = $("#osd-time"); if (!el) return;
  const d = new Date();
  el.textContent = `${z(d.getDate())}.${z(d.getMonth() + 1)}.${d.getFullYear()} ${z(d.getHours())}:${z(d.getMinutes())}:${z(d.getSeconds())}`;
}
setInterval(tick, 1000);

/* ---------- Ekranlar ---------- */
const card = (p) => {
  const r = S.ratings[p.id], q = S.cart[p.id];
  return html`<div class="card" role="button" tabindex="0" data-act="open" data-id="${p.id}">
    <div class="pic">${img(p)}</div>
    <div class="body"><div class="name">${p.name}</div>${r ? html`<div class="stars">★ ${r[0]} (${r[1]})</div>` : ""}
      <div class="row"><span class="price">${som(p.price * S.rate)}</span>
      <button class="add ${q ? "in" : ""}" data-act="add" data-id="${p.id}" aria-label="Savatga qo'shish">${q ? q + "×" : "+"}</button></div>
    </div></div>`;
};
const grid = (items) => html`<div class="grid">${items.map(card)}</div>`;

function home() {
  const chips = [{ slug: "all", label: "Barchasi", icon: "" }, ...S.cats];
  let body;
  if (S.cat === "all") {
    body = S.cats.map((c) => {
      const items = S.prods.filter((p) => p.category === c.slug);
      return items.length ? html`<h2>${c.icon} ${c.label}<small>${items.length}</small></h2>${grid(items.slice(0, 6))}
        ${items.length > 6 ? html`<div class="btns"><button class="btn ghost" data-act="cat" data-id="${c.slug}">Hammasini ko'rish (${items.length})</button></div>` : ""}` : "";
    });
  } else {
    const items = S.prods.filter((p) => p.category === S.cat), groups = {};
    items.forEach((p) => (groups[p.subcategory || ""] = groups[p.subcategory || ""] || []).push(p));
    const c = S.catMap[S.cat] || { label: "", icon: "" };
    body = html`<h2>${c.icon} ${c.label}<small>${items.length}</small></h2>
      ${Object.entries(groups).map(([sub, list]) => html`${sub ? html`<h3>${sub}</h3>` : ""}${grid(list)}`)}
      ${items.length ? "" : html`<p class="empty">Bu bo'limda hozircha mahsulot yo'q.</p>`}`;
  }
  return html`
    ${S.user.admin ? html`<div class="btns"><button class="btn sm" data-act="newProduct">+ Mahsulot qo'shish</button><button class="btn sm ghost" data-act="admin">Boshqaruv</button></div>` : ""}
    <section class="monitor">
      <span class="osd tl">CAM 01</span><span class="osd tr" id="osd-time"></span>
      <span class="osd bl"><i class="rec"></i>REC</span><span class="corner a"></span><span class="corner b"></span>
      <h1>Kamera, NVR va tarmoq uskunalari</h1>
      <p>TP-Link VIGI, Ezviz va Mercusys. Tanlang — o'rnatib beramiz.</p>
    </section>
    <div class="chips">${chips.map((c) => html`<button class="chip ${S.cat === c.slug ? "on" : ""}" data-act="cat" data-id="${c.slug}">${c.icon} ${c.label}</button>`)}</div>
    ${body}`;
}

function results() {
  const words = S.q.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return html`<p class="empty">Nomini yozing, masalan: VIGI, NVR, Deco, Archer</p>`;
  const found = S.prods.filter((p) => { const t = `${p.name} ${p.subcategory || ""} ${p.desc || ""}`.toLowerCase(); return words.every((w) => t.includes(w)); });
  return found.length ? grid(found.slice(0, 60)) : html`<p class="empty">Hech narsa topilmadi. Boshqa so'z bilan qidiring yoki Yordamchidan so'rang.</p>`;
}
const search = () => html`<h2>Qidiruv</h2><input id="q" type="search" placeholder="Mahsulot nomi" value="${S.q}" autocomplete="off"><div id="results">${results()}</div>`;

function product({ id }) {
  const p = S.byId.get(id);
  if (!p) return html`<p class="empty">Mahsulot topilmadi yoki o'chirilgan.</p>`;
  const r = S.ratings[id], mine = S.mine[id] || 0, q = S.cart[id] || 0, c = S.catMap[p.category];
  const cm = S.comments[id];
  if (!cm) loadComments(id);
  return html`
    <div class="hero-img">${img(p)}</div>
    <div class="crumb">${c ? c.label : ""}${p.subcategory ? " / " + p.subcategory : ""}</div>
    <h1 class="title">${p.name}</h1>
    <div class="muted">${r ? `★ ${r[0]} — ${r[1]} ta baho` : "Hali baho yo'q"}</div>
    <div class="big-price">${som(p.price * S.rate)}</div><div class="muted">${usd(p.price)}</div>
    <div class="btns">
      ${q ? html`<div class="stepper"><button data-act="dec" data-id="${id}" aria-label="Kamaytirish">−</button><span>${q}</span><button data-act="inc" data-id="${id}" aria-label="Ko'paytirish">+</button></div>
        <button class="btn sm" data-act="tab" data-id="cart">Savatga o'tish</button>`
      : html`<button class="btn" data-act="add" data-id="${id}">Savatga qo'shish</button>`}
    </div>
    ${S.user.admin ? html`<div class="btns"><button class="btn sm ghost" data-act="editProduct" data-id="${id}">Tahrirlash</button><button class="btn sm danger" data-act="delProduct" data-id="${id}">O'chirish</button></div>` : ""}
    ${p.desc ? html`<div class="panel desc">${p.desc}</div>` : ""}
    <div class="panel"><b>Baholang</b><div class="rate">${[1, 2, 3, 4, 5].map((n) => html`<button class="${n <= mine ? "on" : ""}" data-act="rate" data-id="${id}" data-n="${n}" aria-label="${n} yulduz">★</button>`)}</div></div>
    <div class="panel"><b>Savol va izohlar</b>
      <textarea id="cm" maxlength="500" placeholder="Savol yoki izohingiz"></textarea>
      <div class="btns"><button class="btn sm" data-act="comment" data-id="${id}">Yuborish</button></div>
      ${!cm ? html`<p class="muted">Yuklanmoqda…</p>` : cm.length ? cm.map((x) => html`<div class="comment"><b>${x.name || "Mijoz"}</b><time>${dt(x.created_at)}</time><p>${x.text}</p></div>`)
        : html`<p class="muted">Hali izoh yo'q.</p>`}
    </div>`;
}

function cartTotals() {
  const goods = Object.entries(S.cart).reduce((a, [id, q]) => a + (S.byId.has(id) ? lineSum(S.byId.get(id), q) : 0), 0);
  const cable = S.cable.set * S.cfg.set + S.cable.tok * S.cfg.tok;
  return { goods, cable, total: goods + cable };
}
const sumBox = () => { const t = cartTotals(); return html`<div class="sum"><span>Mahsulotlar</span><span>${som(t.goods)}</span></div>
  <div class="sum"><span>Kabel</span><span>${som(t.cable)}</span></div><div class="sum total"><span>Jami</span><span>${som(t.total)}</span></div>`; };

function cart() {
  const items = Object.entries(S.cart).map(([id, q]) => [S.byId.get(id), q]).filter(([p]) => p);
  return html`<h2>Savat</h2>
    <div class="panel">${items.length ? items.map(([p, q]) => html`<div class="line">
      <div class="thumb">${img(p)}</div>
      <div class="info"><div>${p.name}</div><div class="muted">${som(lineSum(p, q))}</div></div>
      <div class="stepper"><button data-act="dec" data-id="${p.id}" aria-label="Kamaytirish">−</button><span>${q}</span><button data-act="inc" data-id="${p.id}" aria-label="Ko'paytirish">+</button></div>
    </div>`) : html`<p class="empty">Savat bo'sh.<button class="btn ghost" data-act="tab" data-id="home">Katalogni ochish</button></p>`}</div>
    <div class="panel"><b>Kabel kerakmi?</b><div class="muted">Uzunligini metrda yozing — narx avtomatik qo'shiladi.</div>
      <div class="cable"><div><b>Set kabel</b><small>1 m — ${som(S.cfg.set)}</small></div><input type="number" inputmode="numeric" min="0" max="2000" data-cable="set" value="${S.cable.set || ""}" placeholder="0"></div>
      <div class="cable"><div><b>Tok kabel</b><small>1 m — ${som(S.cfg.tok)}</small></div><input type="number" inputmode="numeric" min="0" max="2000" data-cable="tok" value="${S.cable.tok || ""}" placeholder="0"></div>
    </div>
    <div class="panel" id="sum">${sumBox()}</div>
    <button class="btn" data-act="checkout" ${cartTotals().total ? "" : "disabled"}>Buyurtma berish</button>`;
}

const checkout = () => html`<h2>Buyurtmani rasmiylashtirish</h2>
  <div class="panel">
    <label for="addr">Manzil</label><textarea id="addr" maxlength="300" placeholder="Shahar, ko'cha, uy, mo'ljal"></textarea>
    <div class="btns"><button class="btn ghost" data-act="locate">${S.loc ? "📍 Joylashuv olindi" : "Joylashuvimni yuborish"}</button></div>
    <label for="phone">Aloqa uchun telefon</label><input id="phone" type="tel" maxlength="20" value="${S.user.phone}">
  </div>
  <div class="panel">${sumBox()}</div>
  <button class="btn" data-act="order">Buyurtmani tasdiqlash</button>
  <p class="muted">Yakuniy narx serverda joriy kurs bo'yicha hisoblanadi. Operator siz bilan bog'lanadi.</p>`;

const done = ({ o }) => html`<div class="gate"><img src="logo.jpg" alt=""><h1>Buyurtma #${o.id} qabul qilindi</h1>
  <p>Jami: ${som(o.total)}. Operator tez orada qo'ng'iroq qiladi, holat o'zgarsa botga xabar keladi.</p>
  <button class="btn" data-act="tab" data-id="profile">Buyurtmalarim</button><button class="btn ghost" data-act="tab" data-id="home">Katalogga qaytish</button></div>`;

function assistant() {
  const msgs = [{ t: "Salom! Men Kuzatuvchi CAM ning AI agentiman. Qaysi kamera kerakligi, narxlar yoki sozlash muammosi haqida so'rang." }, ...S.chat];
  return html`<div class="btns"><button class="btn sm ghost" data-act="chatReset">Yangi suhbat</button></div>
    <div class="chat">${msgs.map((m) => html`<div class="msg ${m.me ? "me" : "bot"}">${m.t}</div>`)}${S.typing ? html`<div class="msg bot typing">Yozmoqda…</div>` : ""}</div>
    <div class="chat-pad"></div>
    <form class="composer" data-form="chat"><textarea id="ask" rows="1" maxlength="1000" placeholder="Savolingizni yozing"></textarea><button class="add" aria-label="Yuborish">↑</button></form>`;
}

const orderRow = (o, admin) => html`<div class="order">
  <div class="head"><span>#${o.id}${admin ? " — " + (o.uname || "") : ""}</span><span class="status ${o.status}">${STATUS[o.status]}</span></div>
  <div class="muted">${dt(o.created_at)}${admin ? " — " + o.phone : ""}</div>
  ${o.items.map((i) => html`<div>${i.name} × ${i.qty}</div>`)}
  ${o.cable.sum ? html`<div>Kabel: set ${o.cable.set} m, tok ${o.cable.tok} m</div>` : ""}
  ${admin && o.address ? html`<div class="muted">${o.address}</div>` : ""}
  <b>${som(o.total)}</b></div>`;

function profile() {
  if (S.orders === null) once("orders", () => api("/api/orders").then((d) => { S.orders = d; if (S.screen === "profile") render(); }).catch((e) => toast(e.message)));
  return html`<div class="panel"><b>${S.user.name}</b><div class="muted">${S.user.phone}</div></div>
    ${S.user.admin ? html`<button class="btn" data-act="admin">Boshqaruv paneli</button>` : ""}
    <h2>Buyurtmalarim</h2>
    <div class="panel">${S.orders === null ? html`<p class="muted">Yuklanmoqda…</p>` : S.orders.length ? S.orders.map((o) => orderRow(o))
      : html`<p class="empty">Hali buyurtma yo'q.</p>`}</div>`;
}

/* ---------- Admin ---------- */
const ATABS = { orders: "Buyurtmalar", comments: "Izohlar", users: "Mijozlar", cats: "Kategoriyalar", settings: "Sozlamalar" };
function admin() {
  const a = S.admin;
  if (!a) { loadAdmin(); return html`<p class="muted">Yuklanmoqda…</p>`; }
  const t = S.adminTab;
  const views = {
    orders: () => html`<p class="muted">Holatni Telegram'dagi buyurtma xabari tugmalari bilan o'zgartiring — mijozga avtomatik xabar boradi.</p>
      <div class="panel">${a.orders.length ? a.orders.map((o) => orderRow(o, true)) : html`<p class="empty">Buyurtma yo'q.</p>`}</div>`,
    comments: () => html`<div class="panel">${a.comments.length ? a.comments.map((c) => html`<div class="row-item"><div class="grow">
      <b>${c.name || "Mijoz"}</b> <span class="muted">— ${c.product || c.product_id}, ${dt(c.created_at)}</span><div>${c.text}</div></div>
      <button class="btn sm danger" data-act="delComment" data-id="${c.id}">O'chirish</button></div>`) : html`<p class="empty">Izoh yo'q.</p>`}</div>`,
    users: () => html`<div class="panel">${a.users.map((u) => html`<div class="row-item"><div class="grow"><b>${u.name}</b>${u.username ? " @" + u.username : ""}
      <div class="muted">${u.phone || "raqam yo'q"} — ID ${u.id}</div></div>
      <button class="btn sm ${u.banned ? "ghost" : "danger"}" data-act="ban" data-id="${u.id}" data-b="${u.banned ? 0 : 1}">${u.banned ? "Blokdan chiqarish" : "Bloklash"}</button></div>`)}</div>`,
    cats: () => html`<div class="panel">${[...S.cats, { slug: "", label: "", icon: "", pos: S.cats.length }].map((c) => html`<div class="cat-edit" data-slug="${c.slug}">
      <input name="icon" value="${c.icon}" maxlength="8" aria-label="Belgi" placeholder="📷"><input name="label" value="${c.label}" maxlength="40" aria-label="Nomi" placeholder="Yangi kategoriya">
      <input name="pos" type="number" value="${c.pos}" aria-label="Tartib">
      <div class="btns"><button class="btn sm" data-act="saveCat">${c.slug ? "Saqlash" : "Qo'shish"}</button>${c.slug ? html`<button class="btn sm danger" data-act="delCat">O'chirish</button>` : ""}</div></div>`)}</div>`,
    settings: () => html`<div class="panel">
      <label for="s-rate">1 $ kursi (so'm)</label><input id="s-rate" type="number" step="0.01" value="${S.rate}">
      <label class="check"><input id="s-auto" type="checkbox" ${S.rateAuto ? "checked" : ""}>Markaziy bank kursini avtomatik olish</label>
      <label for="s-set">Set kabel, 1 m (so'm)</label><input id="s-set" type="number" value="${S.cfg.set}">
      <label for="s-tok">Tok kabel, 1 m (so'm)</label><input id="s-tok" type="number" value="${S.cfg.tok}">
      <div class="btns"><button class="btn" data-act="saveSettings">Saqlash</button></div></div>`,
  };
  return html`<h2>Boshqaruv</h2>
    <div class="admin-tabs chips">${Object.entries(ATABS).map(([k, v]) => html`<button class="chip ${t === k ? "on" : ""}" data-act="aTab" data-id="${k}">${v}</button>`)}</div>
    ${views[t]()}`;
}

function productForm({ id }) {
  const p = S.form;
  return html`<h2>${id ? "Mahsulotni tahrirlash" : "Yangi mahsulot"}</h2><div class="panel">
    <label for="f-name">Nomi</label><input id="f-name" maxlength="120" value="${p.name}">
    <label for="f-cat">Kategoriya</label><select id="f-cat">${S.cats.map((c) => html`<option value="${c.slug}" ${c.slug === p.category ? "selected" : ""}>${c.label}</option>`)}</select>
    <label for="f-sub">Bo'lim (ixtiyoriy)</label><input id="f-sub" maxlength="60" value="${p.subcategory || ""}">
    <label for="f-price">Narx, $</label><input id="f-price" type="number" step="0.01" min="0" value="${p.price}"><div class="muted" id="f-som">${p.price ? som(p.price * S.rate) : ""}</div>
    <label for="f-desc">Tavsif</label><textarea id="f-desc" rows="7" maxlength="3000">${p.desc || ""}</textarea>
    <label for="f-img">Rasm — JPG, PNG yoki WEBP, 3 MB gacha</label><input id="f-img" type="file" accept="image/jpeg,image/png,image/webp">
    <div id="f-prev">${p.image ? html`<img class="preview" src="${p.image}" alt="">` : ""}</div></div>
    <button class="btn" data-act="saveProduct" data-id="${id || ""}">Saqlash</button>`;
}

const SCREENS = { home, search, product, cart, checkout, done, assistant, profile, admin, productForm };

/* ---------- Ma'lumot yuklash ---------- */
function apply(d) {
  Object.assign(S, { user: d.user, rate: d.rate, rateAuto: d.rate_auto, cfg: d.cable, cats: d.categories,
    prods: d.products, ratings: d.ratings, mine: d.my_ratings, bot: d.bot });
  S.byId = new Map(d.products.map((p) => [p.id, p]));
  S.catMap = Object.fromEntries(d.categories.map((c) => [c.slug, c]));
  if (!S.loaded) { store.key = "kc:" + d.user.id; const s = store.load(); S.cart = s.cart || {}; S.cable = s.cable || S.cable; S.loaded = true; }
  for (const id in S.cart) if (!S.byId.has(id)) delete S.cart[id];
  store.save();
}
const reload = async () => apply(await api("/api/bootstrap"));
const pending = new Set();
function once(key, fn) { if (pending.has(key)) return; pending.add(key); fn().finally(() => pending.delete(key)); }
function loadComments(id) {
  once("c:" + id, () => api(`/api/products/${encodeURIComponent(id)}/comments`).then((d) => { S.comments[id] = d; if (S.params.id === id && S.screen === "product") render(); }).catch(() => {}));
}
function loadAdmin() {
  once("admin", () => api("/api/admin/overview").then((d) => { S.admin = d; if (S.screen === "admin") render(); }).catch((e) => toast(e.message)));
}

/* ---------- Savat ---------- */
function setQty(id, q) {
  q = Math.max(0, Math.min(99, q));
  q ? (S.cart[id] = q) : delete S.cart[id];
  store.save(); haptic();
  if (S.screen === "home" || S.screen === "search") {  // butun sahifani qayta chizmaslik (scroll saqlanadi)
    document.querySelectorAll(`.add[data-id="${CSS.escape(id)}"]`).forEach((b) => { b.classList.toggle("in", !!q); b.textContent = q ? q + "×" : "+"; });
    const n = Object.values(S.cart).reduce((a, b) => a + b, 0); $("#badge").hidden = !n; $("#badge").textContent = n;
  } else render();
}

/* ---------- Harakatlar ---------- */
const A = {
  tab: (el) => tab(el.dataset.id),
  cat: (el) => { S.cat = el.dataset.id; render(); scrollTo(0, 0); $(".chips .on").scrollIntoView({ inline: "center", block: "nearest" }); },
  open: (el) => go("product", { id: el.dataset.id }),
  add: (el) => setQty(el.dataset.id, (S.cart[el.dataset.id] || 0) + 1),
  inc: (el) => setQty(el.dataset.id, (S.cart[el.dataset.id] || 0) + 1),
  dec: (el) => setQty(el.dataset.id, (S.cart[el.dataset.id] || 0) - 1),
  checkout: () => go("checkout"),
  admin: () => { S.admin = null; go("admin"); },
  aTab: (el) => { S.adminTab = el.dataset.id; render(); },
  newProduct: () => { S.form = { name: "", category: (S.cats[0] || {}).slug, subcategory: "", price: "", desc: "", image: "" }; go("productForm", {}); },
  editProduct: (el) => { S.form = { ...S.byId.get(el.dataset.id) }; go("productForm", { id: el.dataset.id }); },
  openBot: () => tg.openTelegramLink("https://t.me/" + S.bot),
  retry: () => boot(),

  async rate(el) {
    try {
      const d = await api(`/api/products/${encodeURIComponent(el.dataset.id)}/rating`, { json: { stars: +el.dataset.n } });
      S.mine[el.dataset.id] = +el.dataset.n; S.ratings[el.dataset.id] = d.summary; render(); toast("Bahoingiz saqlandi");
    } catch (e) { toast(e.message); }
  },
  async comment(el) {
    const t = $("#cm").value.trim(); if (t.length < 2) return toast("Izoh juda qisqa");
    el.disabled = true;
    try { await api(`/api/products/${encodeURIComponent(el.dataset.id)}/comments`, { json: { text: t } }); delete S.comments[el.dataset.id]; render(); toast("Izoh yuborildi"); }
    catch (e) { toast(e.message); el.disabled = false; }
  },
  locate(el) {
    el.textContent = "Aniqlanmoqda…";
    const ok = (lat, lon) => { S.loc = { lat, lon }; el.textContent = "📍 Joylashuv olindi"; };
    const fail = () => { el.textContent = "Joylashuvimni yuborish"; toast("Joylashuvni aniqlab bo'lmadi — manzilni yozing"); };
    const nav = () => navigator.geolocation ? navigator.geolocation.getCurrentPosition((p) => ok(p.coords.latitude, p.coords.longitude), fail, { enableHighAccuracy: true, timeout: 15000 }) : fail();
    const LM = tg && tg.isVersionAtLeast("8.0") && tg.LocationManager;
    LM ? LM.init(() => LM.isLocationAvailable ? LM.getLocation((d) => d ? ok(d.latitude, d.longitude) : fail()) : nav()) : nav();
  },
  async order(el) {
    const address = $("#addr").value.trim();
    if (!address && !S.loc) return toast("Manzilni yozing yoki joylashuvni yuboring");
    el.disabled = true; el.textContent = "Yuborilmoqda…";
    try {
      const o = await api("/api/orders", { json: { items: Object.entries(S.cart).map(([id, qty]) => ({ id, qty })), cable: S.cable, address, phone: $("#phone").value, ...(S.loc || {}) } });
      S.cart = {}; S.cable = { set: 0, tok: 0 }; S.loc = null; S.orders = null; store.save();
      try { tg.HapticFeedback.notificationOccurred("success"); } catch (e) { /* */ }
      S.stack = []; S.root = "profile"; go("done", { o }, false);
    } catch (e) { toast(e.message); el.disabled = false; el.textContent = "Buyurtmani tasdiqlash"; }
  },
  async chatReset() { S.chat = []; render(); api("/api/chat/reset", { json: {} }).catch(() => {}); },
  async delProduct(el) {
    if (!(await ask("Mahsulot o'chirilsinmi?"))) return;
    try { await api(`/api/admin/product/${encodeURIComponent(el.dataset.id)}`, { method: "DELETE" }); await reload(); toast("O'chirildi"); tab("home"); }
    catch (e) { toast(e.message); }
  },
  async saveProduct(el) {
    const id = el.dataset.id, v = (s) => $(s).value;
    el.disabled = true;
    try {
      const d = await api("/api/admin/product", { json: { id, name: v("#f-name"), category: v("#f-cat"), subcategory: v("#f-sub"), price: v("#f-price"), desc: v("#f-desc"), image: S.form.image } });
      await reload(); toast("Saqlandi");
      id ? back() : go("product", { id: d.id }, false);
    } catch (e) { toast(e.message); el.disabled = false; }
  },
  async delComment(el) {
    try { await api(`/api/admin/comment/${el.dataset.id}`, { method: "DELETE" }); S.admin.comments = S.admin.comments.filter((c) => String(c.id) !== el.dataset.id); S.comments = {}; render(); }
    catch (e) { toast(e.message); }
  },
  async ban(el) {
    if (el.dataset.b === "1" && !(await ask("Foydalanuvchi bloklansinmi? U bot va do'kondan foydalana olmaydi."))) return;
    try { await api("/api/admin/ban", { json: { user_id: +el.dataset.id, banned: el.dataset.b === "1" } }); loadAdmin(); }
    catch (e) { toast(e.message); }
  },
  async saveCat(el) {
    const row = el.closest(".cat-edit"), f = (n) => $(`[name=${n}]`, row).value;
    try { await api("/api/admin/category", { json: { slug: row.dataset.slug, icon: f("icon"), label: f("label"), pos: f("pos") || 0 } }); await reload(); render(); toast("Saqlandi"); }
    catch (e) { toast(e.message); }
  },
  async delCat(el) {
    if (!(await ask("Kategoriya o'chirilsinmi?"))) return;
    try { await api(`/api/admin/category/${encodeURIComponent(el.closest(".cat-edit").dataset.slug)}`, { method: "DELETE" }); await reload(); render(); }
    catch (e) { toast(e.message); }
  },
  async saveSettings() {
    try {
      await api("/api/admin/settings", { json: { usd_rate: $("#s-rate").value, rate_auto: $("#s-auto").checked, cable_set: $("#s-set").value, cable_tok: $("#s-tok").value } });
      await reload(); render(); toast("Saqlandi");
    } catch (e) { toast(e.message); }
  },
};

document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-act]");
  if (el && A[el.dataset.act]) { e.preventDefault(); A[el.dataset.act](el, e); }
});
document.addEventListener("keydown", (e) => {
  if ((e.key === "Enter" || e.key === " ") && e.target.matches('[role="button"]')) { e.preventDefault(); e.target.click(); }
  if (e.key === "Enter" && !e.shiftKey && e.target.id === "ask") { e.preventDefault(); sendChat(); }
});
document.addEventListener("submit", (e) => { e.preventDefault(); if (e.target.dataset.form === "chat") sendChat(); });
document.addEventListener("input", (e) => {
  const t = e.target;
  if (t.id === "q") { S.q = t.value; $("#results").innerHTML = results().s; }
  if (t.dataset.cable) { S.cable[t.dataset.cable] = Math.max(0, Math.min(2000, parseInt(t.value, 10) || 0)); store.save(); $("#sum").innerHTML = sumBox().s;
    $('[data-act="checkout"]').disabled = !cartTotals().total; }
  if (t.id === "f-price") $("#f-som").textContent = t.value ? som(t.value * S.rate) : "";
});
document.addEventListener("change", async (e) => {
  if (e.target.id !== "f-img" || !e.target.files[0]) return;
  const fd = new FormData(); fd.append("file", e.target.files[0]);
  try {
    const d = await api("/api/admin/upload", { body: fd, method: "POST" });
    S.form.image = d.url; $("#f-prev").innerHTML = html`<img class="preview" src="${d.url}" alt="">`.s;
  } catch (err) { toast(err.message); e.target.value = ""; }
});

async function sendChat() {
  const box = $("#ask"), t = box.value.trim();
  if (!t || S.typing) return;
  S.chat.push({ me: true, t }); S.typing = true; render();
  try { S.chat.push({ t: (await api("/api/chat", { json: { text: t } })).answer }); }
  catch (e) { S.chat.push({ t: e.message }); }
  S.chat = S.chat.slice(-40); S.typing = false;
  if (S.screen === "assistant") render();
}

/* ---------- Ishga tushirish ---------- */
function gate(title, text, actions) {
  $("#tabs").hidden = true;
  $("#view").innerHTML = html`<div class="gate"><img src="logo.jpg" alt=""><h1>${title}</h1><p>${text}</p>${actions || ""}</div>`.s;
}
function theme() {
  document.documentElement.dataset.theme = tg.colorScheme;
  const bg = getComputedStyle(document.documentElement).getPropertyValue("--bg").trim();
  try { tg.setHeaderColor(bg); tg.setBackgroundColor(bg); } catch (e) { /* eski versiya */ }
}

async function boot() {
  if (!tg || !tg.initData) return gate("Telegram orqali oching", "Do'kon Kuzatuvchi CAM boti ichida ishlaydi. Botni oching va «Do'kon» tugmasini bosing.");
  gate("Kuzatuvchi CAM", "Yuklanmoqda…");
  try { await reload(); }
  catch (e) { return gate("Ulanib bo'lmadi", e.message, html`<button class="btn" data-act="retry">Qayta urinish</button>`); }
  if (!S.user.phone) {
    return gate("Raqamingizni ulashing", "Buyurtma berish uchun botga qayting va «Raqamni ulashish» tugmasini bosing, so'ng shu yerga qayting.",
      html`<button class="btn" data-act="openBot">Botga o'tish</button><button class="btn ghost" data-act="retry">Tekshirish</button>`);
  }
  $("#tabs").hidden = false;
  tab("home");
}

if (tg) { tg.ready(); tg.expand(); theme(); tg.onEvent("themeChanged", theme); tg.BackButton.onClick(back); }
boot();
