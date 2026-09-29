/* =====================================================================
   Chhaya Mehndi & Arts  |  script.js
   ---------------------------------------------------------------------
   1) Sabse pehle neeche CONFIG me apna WhatsApp number aur email badlo.
   2) Gallery ke titles badalne ho to GALLERY list me edit karo.
   3) Images: images/ folder me same filename se replace karo
      (mehndi-01.jpg ... mehndi-10.jpg, art-01.jpg ... art-10.jpg).
   ===================================================================== */

document.documentElement.classList.add('js');

/* ------------------------------------------------------------------ CONFIG */
const CONFIG = {
  whatsapp: '917618283669',        // country code + number, bina + aur space ke (India: 91XXXXXXXXXX)
  phoneDisplay: '+91**********', // jo contact section me dikhana hai
  email: 'chhayakakraniya@gmail.com'
};

/* ------------------------------------------------------------------ GALLERY DATA
   file     : images/ folder ke andar ki file ka naam
   cat      : 'mehndi' ya 'art'
   title    : hover / preview me dikhne wala naam
   feat     : 1, 2, 3 = Featured section me dikhegi (us order me)
   shape    : 'arch' = upar se gol (mehrab) shape, tall images ke liye achha lagta hai
*/
const GALLERY = [
  { file: 'bridel Mhandi.jpg', cat: 'mehndi', title: '',       feat: 1, shape: 'arch' },
  { file: 'A2.jpg',    cat: 'art',    title: '',       feat: 2 },
  { file: 'M2.jpg', cat: 'mehndi', title: '' },
  { file: 'A3.jpg',    cat: 'art',    title: '',         feat: 1 },
  { file: 'P1.jpeg', cat: 'mehndi', title: 'Peacock Feather Mehndi',   feat: 2 },
  { file: 'A4.jpg',    cat: 'art',    title: '',            feat: 3 },
  { file: 'M4.jpg', cat: 'mehndi', title: '' },
  { file: 'A5.jpg',    cat: 'art',    title: '' },
  { file: 'M5.jpg', cat: 'mehndi', title: '' },
  { file: 'A6.jpg',    cat: 'art',    title: '' },
  { file: 'M6.jpg', cat: 'mehndi', title: '' },
  { file: 'A7.jpeg',    cat: 'art',    title: '',        shape: 'arch' },
  { file: 'M7.jpg', cat: 'mehndi', title: '' },
  { file: 'A8.jpeg',    cat: 'art',    title: '' },
  { file: 'M8.jpg', cat: 'mehndi', title: '' },
  { file: 'A9.jpeg',    cat: 'art',    title: '' },
  { file: 'BM1.jpeg', cat: 'mehndi', title: 'Dulhan Mandala Panels',    feat: 3, shape: 'arch' },
  { file: 'A10.jpg',    cat: 'art',    title: '' },
  { file: 'M10.jpg', cat: 'mehndi', title: '' },
  { file: 'art-10.jpg',    cat: 'art',    title: 'Village at Dusk' }
];

const CAT_LABEL = { mehndi: 'Mehndi', art: 'Art' };
const IMG_DIR = 'images/';
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

/* ------------------------------------------------------------------ icons + contact links */
const ICONS = {
  wa: '<path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.67c2.2 0 4.26.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.26-8.24zM8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.85-.87 2.07 0 1.22.89 2.39 1.01 2.56.12.16 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.78.97-.15.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48z"/>',
  mail: '<path d="M3.5 4h17A1.5 1.5 0 0 1 22 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 18.5v-13A1.5 1.5 0 0 1 3.5 4zm.7 2L12 11.6 19.8 6H4.2zM20 8l-7.4 5.3a1 1 0 0 1-1.2 0L4 8v10h16V8z"/>'
};
$$('[data-icon]').forEach(el => { el.innerHTML = ICONS[el.dataset.icon] || ''; });

const waLink = text => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text || '')}`;
const mailLink = (subject, body) => `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject || '')}&body=${body || ''}`;

$$('[data-wa]').forEach(a => {
  a.href = waLink(a.dataset.msg);
  a.target = '_blank';
  a.rel = 'noopener';
});
$$('[data-mail]').forEach(a => { a.href = mailLink(a.dataset.subject, a.dataset.body); });
const mailText = $('[data-mail-text]');
if (mailText) { mailText.textContent = CONFIG.email; mailText.href = `mailto:${CONFIG.email}`; }
const waText = $('[data-wa-text]');
if (waText) waText.textContent = 'WhatsApp: ' + CONFIG.phoneDisplay;
$('#year').textContent = new Date().getFullYear();

/* ------------------------------------------------------------------ nav */
const nav = $('#nav');
const burger = $('#burger');
const navLinks = $('#navLinks');
const fab = $('#fab');
const hero = $('#home');

function onScroll() {
  const y = window.scrollY;
  nav.classList.toggle('is-solid', y > 30);
  const heroBottom = hero ? hero.offsetHeight - 200 : 600;
  fab.classList.toggle('is-visible', y > heroBottom);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

function setMenu(open) {
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  navLinks.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
}
burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
navLinks.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });

/* ------------------------------------------------------------------ hero: mandala petals + henna vine */
const SVGNS = 'http://www.w3.org/2000/svg';
const svgEl = (name, attrs = {}) => {
  const el = document.createElementNS(SVGNS, name);
  for (const k in attrs) el.setAttribute(k, attrs[k]);
  return el;
};

(function heroMandala() {
  const svg = $('#heroMandala');
  if (!svg) return;
  const g = svgEl('g', { class: 'petals' });
  for (let i = 0; i < 16; i++) {
    g.appendChild(svgEl('path', { d: 'M0 -150 C 18 -128 18 -108 0 -92 C -18 -108 -18 -128 0 -150Z', transform: `rotate(${i * 22.5})` }));
  }
  for (let i = 0; i < 12; i++) {
    g.appendChild(svgEl('path', { d: 'M0 -92 C 10 -80 10 -70 0 -60 C -10 -70 -10 -80 0 -92Z', transform: `rotate(${i * 30 + 15})` }));
  }
  svg.appendChild(g);
})();

(function heroVine() {
  const svg = $('#heroVine');
  const path = $('#vinePath');
  if (!svg || !path) return;
  const L = path.getTotalLength();
  const DUR = 3.6, DELAY = 0.5;

  path.style.strokeDasharray = L;
  if (reduceMotion) {
    path.style.strokeDashoffset = 0;
  } else {
    path.style.strokeDashoffset = L;
    path.animate([{ strokeDashoffset: L }, { strokeDashoffset: 0 }], {
      duration: DUR * 1000, delay: DELAY * 1000, easing: 'cubic-bezier(.45,.05,.3,1)', fill: 'both'
    });
  }

  let n = 0;
  for (let d = 34; d < L - 14; d += 36, n++) {
    const p = path.getPointAtLength(d);
    const q = path.getPointAtLength(d + 2);
    const ang = Math.atan2(q.y - p.y, q.x - p.x) * 180 / Math.PI;
    const side = n % 2 ? 1 : -1;
    const k = 1.05 - 0.4 * (d / L);
    const t = (DELAY + DUR * (d / L)).toFixed(2) + 's';

    const g = svgEl('g', { transform: `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${(ang + side * 52).toFixed(1)}) scale(${k.toFixed(2)})` });
    const leaf = svgEl('path', { class: 'leaf', d: 'M0 0 C 7 -10 24 -11 38 0 C 24 11 7 10 0 0Z' });
    if (!reduceMotion) leaf.style.animationDelay = t;
    g.appendChild(leaf);
    svg.appendChild(g);

    if (n % 2 === 0) {
      const rad = (ang - side * 90) * Math.PI / 180;
      const bud = svgEl('circle', { class: 'bud', r: 2.6, cx: (p.x + Math.cos(rad) * 12).toFixed(1), cy: (p.y + Math.sin(rad) * 12).toFixed(1) });
      if (!reduceMotion) bud.style.animationDelay = t;
      svg.appendChild(bud);
    }
  }
})();

/* ------------------------------------------------------------------ gallery */
const masonry = $('#masonry');
const state = { filter: 'all' };

function makeImg(item, eager) {
  const img = new Image();
  img.src = IMG_DIR + item.file;
  img.alt = item.title;
  img.decoding = 'async';
  if (!eager) img.loading = 'lazy';
  return img;
}

const ZOOM_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7"/></svg>';

const tiles = GALLERY.map((item, i) => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'tile is-loading' + (item.shape === 'arch' ? ' tile--arch' : '');
  btn.dataset.cat = item.cat;
  btn.dataset.missing = `Add ${IMG_DIR}${item.file}`;
  btn.setAttribute('aria-label', `Open ${item.title} (${CAT_LABEL[item.cat]})`);

  const img = makeImg(item, i < 8);
  const done = () => btn.classList.remove('is-loading');
  img.addEventListener('load', done);
  img.addEventListener('error', () => { btn.classList.remove('is-loading'); btn.classList.add('missing'); });

  btn.appendChild(img);
  btn.insertAdjacentHTML('beforeend',
    `<span class="tile-cat">${CAT_LABEL[item.cat]}</span>` +
    `<span class="tile-zoom">${ZOOM_SVG}</span>` +
    `<span class="tile-cap">${item.title}</span>`);

  btn.addEventListener('click', () => {
    const visible = tiles.filter(t => !t.classList.contains('is-hidden'));
    const list = visible.map(t => GALLERY[tiles.indexOf(t)]);
    openLightbox(list, visible.indexOf(btn), btn);
  });
  masonry.appendChild(btn);
  return btn;
});

const filterBtns = $$('.filter');
function applyFilter(cat) {
  state.filter = cat;
  filterBtns.forEach(b => {
    const on = b.dataset.filter === cat;
    b.classList.toggle('is-active', on);
    b.setAttribute('aria-pressed', String(on));
  });
  let shown = 0;
  tiles.forEach((t, i) => {
    const match = cat === 'all' || GALLERY[i].cat === cat;
    t.classList.toggle('is-hidden', !match);
    if (match) {
      t.classList.remove('pop');
      void t.offsetWidth; // restart animation
      t.style.animationDelay = Math.min(shown, 12) * 45 + 'ms';
      if (!reduceMotion) t.classList.add('pop');
      shown++;
    }
  });
}
filterBtns.forEach(b => b.addEventListener('click', () => applyFilter(b.dataset.filter)));

// counts on the filter buttons
$$('[data-count]').forEach(el => {
  const c = el.dataset.count;
  el.textContent = c === 'all' ? GALLERY.length : GALLERY.filter(g => g.cat === c).length;
});

// "See all mehndi / art" buttons in the featured sections
$$('[data-filter-link]').forEach(b => b.addEventListener('click', () => {
  applyFilter(b.dataset.filterLink);
  $('#gallery').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
}));

/* ------------------------------------------------------------------ featured sections */
function buildFeatured(cat, mountId) {
  const mount = $(mountId);
  if (!mount) return;
  const items = GALLERY.filter(g => g.cat === cat && g.feat).sort((a, b) => a.feat - b.feat);
  items.forEach((item, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'fcard';
    btn.setAttribute('aria-label', `Open ${item.title} (${CAT_LABEL[cat]})`);
    const wrap = document.createElement('span');
    wrap.className = 'fimg';
    const img = makeImg(item, false);
    wrap.appendChild(img);
    btn.appendChild(wrap);
    btn.insertAdjacentHTML('beforeend', `<span class="ftitle">${item.title}</span>`);
    btn.addEventListener('click', () => openLightbox(items, idx, btn));
    mount.appendChild(btn);
  });
}
buildFeatured('mehndi', '#featMehndi');
buildFeatured('art', '#featArt');

/* ------------------------------------------------------------------ lightbox (full-screen preview) */
const lb = $('#lightbox');
const lbImg = $('#lbImg');
const lbTitle = $('#lbTitle');
const lbCat = $('#lbCat');
const lbCount = $('#lbCount');
const lbAsk = $('#lbAsk');
const lbState = { list: [], i: 0, opener: null, open: false };

function lbRender(first) {
  const n = lbState.list.length;
  lbState.i = (lbState.i + n) % n;
  const item = lbState.list[lbState.i];
  const apply = () => {
    lbImg.onload = lbImg.onerror = () => lbImg.classList.remove('is-swapping');
    lbImg.src = IMG_DIR + item.file;
    lbImg.alt = item.title;
  };
  if (first || reduceMotion) { apply(); }
  else { lbImg.classList.add('is-swapping'); setTimeout(apply, 140); }
  lbTitle.textContent = item.title;
  lbCat.textContent = CAT_LABEL[item.cat];
  lbCount.textContent = `${lbState.i + 1} / ${n}`;
  lbAsk.href = waLink(`Hi Chhaya! I'm interested in "${item.title}" (${CAT_LABEL[item.cat]}) from your website. Could you tell me more?`);
  lbAsk.target = '_blank';
  lbAsk.rel = 'noopener';
  // preload neighbours
  [1, -1].forEach(d => { const nb = lbState.list[(lbState.i + d + n) % n]; if (nb) new Image().src = IMG_DIR + nb.file; });
  const single = n < 2;
  $('#lbPrev').style.visibility = $('#lbNext').style.visibility = single ? 'hidden' : 'visible';
}

function openLightbox(list, index, opener) {
  if (!list.length) return;
  lbState.list = list;
  lbState.i = Math.max(0, index);
  lbState.opener = opener || null;
  lbState.open = true;
  lb.hidden = false;
  document.body.classList.add('lb-open');
  lbRender(true);
  requestAnimationFrame(() => lb.classList.add('is-open'));
  $('#lbClose').focus({ preventScroll: true });
}

function closeLightbox() {
  if (!lbState.open) return;
  lbState.open = false;
  lb.classList.remove('is-open');
  document.body.classList.remove('lb-open');
  setTimeout(() => { if (!lbState.open) { lb.hidden = true; lbImg.removeAttribute('src'); } }, reduceMotion ? 0 : 300);
  if (lbState.opener) lbState.opener.focus({ preventScroll: true });
}

$('#lbClose').addEventListener('click', closeLightbox);
$('#lbPrev').addEventListener('click', () => { lbState.i--; lbRender(); });
$('#lbNext').addEventListener('click', () => { lbState.i++; lbRender(); });

// click on the dark backdrop closes the preview
lb.addEventListener('click', e => {
  if (e.target === lb || e.target.classList.contains('lb-stage') || e.target.classList.contains('lb-fig')) closeLightbox();
});

document.addEventListener('keydown', e => {
  if (!lbState.open) return;
  if (e.key === 'Escape') closeLightbox();
  else if (e.key === 'ArrowRight') { lbState.i++; lbRender(); }
  else if (e.key === 'ArrowLeft') { lbState.i--; lbRender(); }
  else if (e.key === 'Tab') {
    const f = $$('button, a[href]', lb).filter(el => el.offsetParent !== null && getComputedStyle(el).visibility !== 'hidden');
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

// swipe on touch screens
let touchX = null;
lb.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
lb.addEventListener('touchend', e => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  touchX = null;
  if (Math.abs(dx) > 50) { lbState.i += dx < 0 ? 1 : -1; lbRender(); }
}, { passive: true });

/* ------------------------------------------------------------------ custom request form -> WhatsApp / email */
(function customForm() {
  const box = $('#customForm');
  if (!box) return;
  box.addEventListener('click', e => {
    const btn = e.target.closest('[data-send]');
    if (!btn) return;
    const name = $('#fName');
    const msg = $('#fMsg');
    if (!name.value.trim()) { name.reportValidity(); return; }
    if (!msg.value.trim()) { msg.reportValidity(); return; }

    const lines = [
      'Hi Chhaya! I found your website and would like to ask about a custom order.',
      '',
      `Name: ${name.value.trim()}`,
      `Need: ${$('#fType').value}`,
      `Date / size: ${$('#fWhen').value.trim() || 'not decided yet'}`,
      `Details: ${msg.value.trim()}`
    ];
    if (btn.dataset.send === 'wa') {
      window.open(waLink(lines.join('\n')), '_blank', 'noopener');
    } else {
      window.location.href = mailLink('Custom order enquiry', encodeURIComponent(lines.join('\n')));
    }
  });
})();

/* ------------------------------------------------------------------ gentle reveal on scroll */
(function reveal() {
  const els = $$('.reveal');
  if (!('IntersectionObserver' in window) || reduceMotion) { els.forEach(el => el.classList.add('is-in')); return; }
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  els.forEach(el => io.observe(el));
})();
