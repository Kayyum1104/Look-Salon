/* ===== LOOK SALON – script.js ===== */

/* ---------- 1. EASY-EDIT CONFIGURATION ---------- */
const CONFIG = {
  // Country code + number, digits only. Example (India): "919876543210". Leave "" until ready.
  whatsappNumber: "918928342665",
  whatsappDisplay: "+91 8928342665",
  phone: "+91 8928342665",
  address: "Shop Number 6, Girdhanr Nivas, Shahid Bhagal Singh Road, Opposite Kailash Parbat Hotel, Colaba, Arthur Bunder Rd, Apollo Bandar, Colaba, Mumbai, Maharashtra 400005",
  hours: "10am – 10pm (Mon–Sat), 9am – 10pm (Sun)",
  instagram: "https://www.instagram.com/kayyum_.11?dlrf=MW00Z3pkc3d3ZDduZw==",   // e.g. "https://instagram.com/yourhandle"
  facebook: "https://www.facebook.com/share/1HqR3UeDHW/",
  directionsUrl: "https://maps.app.goo.gl/9uoGj9KZyfpAJwwN6", // e.g. a Google Maps share link of your salon
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1713.3745891205633!2d72.8295473950408!3d18.917392250806163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1794138968398!5m2!1sen!2sin"    // the src="..." from Google Maps > Share > Embed a map
};

// Prices are placeholders – change the numbers (in ₹) below.
const SERVICES = [
  { name: "Men's Haircut", desc: "Clean, classic cuts tailored to your face and style.", price: 150, img: "svc1.jpg" },
  { name: "Hair Styling", desc: "Get styled for work, events or everyday confidence.", price: 100, img: "svc2.jpg" },
  { name: "Beard Trimming", desc: "Neat, even trimming to keep your beard in shape.", price: 80, img: "svc3.jpg" },
  { name: "Beard Styling", desc: "Shaped lines and contours for a sharp beard look.", price: 120, img: "svc4.jpg" },
  { name: "Hair Colouring", desc: "Fresh colour or grey coverage with care.", price: 400, img: "svc5.jpg" },
  { name: "Facial", desc: "Refreshing facial to clean and revive tired skin.", price: 350, img: "svc6.jpg" },
  { name: "Hair Spa", desc: "Nourishing treatment for healthier, smoother hair.", price: 500, img: "svc7.jpg" },
  { name: "Head Massage", desc: "Relaxing massage to relieve stress and tension.", price: 150, img: "svc8.jpg" },
  { name: "Haircut + Beard Combo", desc: "Haircut and beard trim together at a better price.", price: 220, img: "svc9.jpg" }
];

const PRICE_MENU = {
  "Hair Services": [["Regular Haircut", 150], ["Premium Haircut", 250], ["Hair Styling", 100], ["Hair Colouring", 400]],
  "Beard Services": [["Beard Trim", 80], ["Beard Styling", 120], ["Clean Shave", 70]],
  "Grooming Services": [["Facial", 350], ["Hair Spa", 500], ["Head Massage", 150]],
  "Combo Packages": [["Haircut + Beard", 220], ["Haircut + Facial", 450], ["Complete Grooming Package", 650]]
};

const OFFERS = [
  { title: "Haircut + Beard Combo", desc: "Look sharp from head to chin with our popular combo.", badge: "POPULAR", price: 199, img: "svc9.jpg" },
  { title: "Student Grooming Offer", desc: "Special pricing for students (valid ID required – to be confirmed).", badge: "SPECIAL OFFER", price: 129, img: "svc1.jpg" },
  { title: "Complete Grooming Package", desc: "Haircut, beard, facial and head massage in one visit.", badge: "SPECIAL OFFER", price: 599, img: "svc6.jpg" }
];

const BARBERS = [
  { name: "Jean Martin", spec: "Modern Haircuts", intro: "Specializes in classic cuts and modern hairstyles to match your personality.", img: "brb-modern.jpg" },
  { name: "Lucas Bernard", spec: "Fade Haircuts", intro: "Skilled in low fades, mid fades and sharp, stylish hair transformations.", img: "brb-faid.jpg" },
  { name: "Leon Fischer", spec: "Beard Styling", intro: "Focuses on precise beard trimming, clean edges and well-defined beard styles.", img: "brb-beard.jpg" },
  { name: "Arthur Robert", spec: "Hair Grooming", intro: "Experienced in hair care, styling and grooming treatments for a fresh look.", img: "brb-heaiGrooming.jpg" }
];

const GALLERY = [
  { img: "g1.jpg", alt: "Modern men's haircut" },
  { img: "g2.jpg", alt: "Fade hairstyle" },
  { img: "g3.jpg", alt: "Beard transformation" },
  { img: "g4.jpg", alt: "Hair styling" },
  { img: "g5.jpg", alt: "Salon interior" },
  { img: "g6.jpg", alt: "Grooming service" }
];

const REVIEWS = [
  { name: "Junaid S.", stars: 5, text: "Great haircut at an affordable price. The barber understood exactly the style I wanted." },
  { name: "Amit K.", stars: 5, text: "Good service, friendly staff and a clean environment. Definitely worth visiting!" },
  { name: "Rahul M.", stars: 4, text: "Nice grooming experience. The haircut was neat and the pricing was reasonable." }
];

/* ---------- 2. HELPERS ---------- */
const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];
const rupee = n => "₹" + n;
const imgTag = (file, alt, lazy = true) =>
  `<div class="img-wrap"><img src="images/${file}" alt="${alt}" ${lazy ? 'loading="lazy"' : ""}></div>`;
const bookBtn = (service, label = "Book Now", cls = "btn btn--primary") =>
  `<button class="${cls} book-btn" data-service="${service}">${label}</button>`;

let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 5000);
}

/* ---------- 3. RENDER SECTIONS FROM DATA ---------- */
function render() {
  $("#servicesGrid").innerHTML = SERVICES.map(s => `
    <article class="card reveal">${imgTag(s.img, s.name)}
      <div class="card__body"><h3>${s.name}</h3><p>${s.desc}</p>
      <span class="price">From ${rupee(s.price)}</span>${bookBtn(s.name)}</div>
    </article>`).join("");

  $("#priceGrid").innerHTML = Object.entries(PRICE_MENU).map(([cat, items]) => `
    <div class="pbox reveal"><h3>${cat}</h3>${items.map(([n, p]) => `
      <div class="prow"><span>${n}</span><strong>${rupee(p)}</strong>${bookBtn(n, "Book", "btn btn--ghost")}</div>`).join("")}
    </div>`).join("");

  $("#offersGrid").innerHTML = OFFERS.map(o => `
    <article class="card offer reveal"><span class="badge">${o.badge}</span>${imgTag(o.img, o.title)}
      <div class="card__body"><h3>${o.title}</h3><p>${o.desc}</p>
      <span class="price">${rupee(o.price)}</span>
      ${bookBtn(o.title)}</div>
    </article>`).join("");

  $("#barbersGrid").innerHTML = BARBERS.map(b => `
    <article class="card barber reveal">${imgTag(b.img, "Barber – " + b.spec)}
      <div class="card__body"><h3>${b.name}</h3><span class="spec">${b.spec}</span><p>${b.intro}</p></div>
    </article>`).join("");

  $("#galleryGrid").innerHTML = GALLERY.map((g, i) => `
    <button class="img-wrap reveal" data-index="${i}" aria-label="View larger: ${g.alt}">
      <img src="images/${g.img}" alt="${g.alt}" loading="lazy"></button>`).join("");

  $("#reviewsGrid").innerHTML = REVIEWS.map(r => `
    <article class="review reveal"><div class="stars" aria-label="${r.stars} out of 5 stars">${"★".repeat(r.stars)}${"☆".repeat(5 - r.stars)}</div>
      <p>${r.text}</p><strong>${r.name}</strong></article>`).join("");
}

/* ---------- 4. CONTACT / CONFIG DISPLAY ---------- */
function applyConfig() {
  $$("[data-cfg]").forEach(el => (el.textContent = CONFIG[el.dataset.cfg]));
  $$("[data-cfg-link]").forEach(el => {
    const url = CONFIG[el.dataset.cfgLink];
    if (url) el.href = url;
    else { el.href = "#contact"; el.addEventListener("click", e => { e.preventDefault(); toast("Add this link in CONFIG (script.js)."); }); }
  });
  $("#year").textContent = new Date().getFullYear();

  const map = $("#mapBox");
  if (CONFIG.mapEmbedUrl) map.innerHTML = `<iframe src="${CONFIG.mapEmbedUrl}" title="LOOK SALON location map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>`;
  else map.textContent = "Google Maps placeholder – paste your embed URL in CONFIG.mapEmbedUrl (script.js).";

  const dir = $("#directionsBtn");
  if (CONFIG.directionsUrl) dir.href = CONFIG.directionsUrl;
  else dir.addEventListener("click", e => { e.preventDefault(); toast("Directions link not set yet. Add CONFIG.directionsUrl in script.js."); });

  const contact = $("#contactBtn");
  contact.addEventListener("click", e => {
    e.preventDefault();
    if (/^\d{10,15}$/.test(CONFIG.whatsappNumber)) openWhatsApp("General Enquiry");
    else toast("Contact number not set yet. Add it in CONFIG (script.js).");
  });
}

/* ---------- 5. WHATSAPP BOOKING ---------- */
function openWhatsApp(service) {
  const num = String(CONFIG.whatsappNumber).replace(/\D/g, "");
  if (!/^\d{10,15}$/.test(num) || num !== CONFIG.whatsappNumber) {
    toast("WhatsApp number not configured. Open script.js and set CONFIG.whatsappNumber (e.g. 919876543210).");
    return;
  }
  const msg = `Hello LOOK SALON! I would like to book an appointment.\n\nService: ${service}\n\nPlease let me know the available appointment timings.`;
  window.open(`https://wa.me/${num}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
}
document.addEventListener("click", e => {
  const btn = e.target.closest(".book-btn");
  if (btn) { openWhatsApp(btn.dataset.service || "General Appointment"); closeMenu(); }
});

/* ---------- 6. MOBILE MENU ---------- */
const burger = $("#burger"), menu = $("#menu");
function closeMenu() { menu.classList.remove("open"); burger.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }
burger.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  burger.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", open);
});
$$("#menu a").forEach(a => a.addEventListener("click", closeMenu));

/* ---------- 7. SCROLL EFFECTS ---------- */
const toTop = $("#toTop");
window.addEventListener("scroll", () => {
  $("#nav").classList.toggle("scrolled", scrollY > 20);
  toTop.classList.toggle("show", scrollY > 500);
}, { passive: true });
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

function initReveal() {
  const items = $$(".reveal");
  if (!("IntersectionObserver" in window)) { items.forEach(i => i.classList.add("visible")); return; }
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
  }), { threshold: 0.12 });
  items.forEach(i => io.observe(i));
}

/* ---------- 8. LIGHTBOX ---------- */
const lb = $("#lightbox"), lbImg = $("#lbImg"), lbCap = $("#lbCap");
let current = 0, lastFocus = null;
function showImage(i) {
  current = (i + GALLERY.length) % GALLERY.length;
  lbImg.src = "images/" + GALLERY[current].img;
  lbImg.alt = lbCap.textContent = GALLERY[current].alt;
}
function openLightbox(i) { lastFocus = document.activeElement; showImage(i); lb.hidden = false; document.body.style.overflow = "hidden"; $("#lbClose").focus(); }
function closeLightbox() { lb.hidden = true; document.body.style.overflow = ""; lastFocus && lastFocus.focus(); }
$("#galleryGrid").addEventListener("click", e => {
  const b = e.target.closest("[data-index]");
  if (b) openLightbox(+b.dataset.index);
});
$("#lbClose").addEventListener("click", closeLightbox);
$("#lbPrev").addEventListener("click", () => showImage(current - 1));
$("#lbNext").addEventListener("click", () => showImage(current + 1));
lb.addEventListener("click", e => { if (e.target === lb) closeLightbox(); });
document.addEventListener("keydown", e => {
  if (lb.hidden) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") showImage(current - 1);
  if (e.key === "ArrowRight") showImage(current + 1);
});

/* ---------- 9. MISSING-IMAGE FALLBACK ---------- */
// Hides broken images so the gradient placeholder shows until real photos are added.
document.addEventListener("error", e => { if (e.target.tagName === "IMG" && e.target.id !== "lbImg") e.target.hidden = true; }, true);

/* ---------- INIT ---------- */
render();
applyConfig();
initReveal();