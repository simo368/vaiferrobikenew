/* ════════════════════════════════════════════════════════════
   VAI FERRO BIKE — impostazioni.js
   Legge il tab "Impostazioni" del Google Sheet e aggiorna
   automaticamente tutti i link WhatsApp, telefono e testi
   dinamici su tutto il sito.
   ════════════════════════════════════════════════════════════

   SETUP (una tantum):
   1. Nel tuo file Google Sheet principale, aggiungi un foglio chiamato "Impostazioni"
   2. Prima riga: intestazioni →  Chiave   (colonna A)  |  Valore  (colonna B)
   3. Compila le righe con i tuoi dati reali:

      Chiave            | Valore
      ──────────────────────────────────────────
      WA_Officina       | 393331111111          ← WhatsApp per Officina e Generale
      Tel_Officina      | +39 333 1111111       ← Chiamate per Officina e Generale
      WA_Vendite        | 393442222222          ← WhatsApp per Vendita Bici e Usato
      Tel_Vendite       | +39 344 2222222       ← Chiamate per Vendita Bici e Usato
      Indirizzo         | Via Volturno 86
      Citta             | Cavezzo (MO)
      Orari             | Lun–Sab 08:30–12:30 / 15:30–19:30
      Orari_Domenica    | Domenica chiuso
      URL_Sito          | https://vaiferrobike.it
      WA_Testo_Default  | Ciao VAI FERRO BIKE vorrei informazioni.

   4. Clicca sul tab "Impostazioni" in basso su Google Sheets
   5. Guarda l'indirizzo (URL) in alto e copia il numero dopo "gid="
      (es: #gid=123456789 → copia 123456789)
   6. Incollalo in GID_IMPOSTAZIONI qui sotto.
*/

const IMPOSTAZIONI_SHEET_ID = '1egFO7xMvKZLGTcVI_OjDq5Fjf2DgAmgFQlYHBxshmoI'; // ← ID del tuo file
const GID_IMPOSTAZIONI = '2074692725'; // ← INCOLLA QUI IL GID DEL TAB IMPOSTAZIONI

/* ─── VALORI DI FALLBACK (mostrati finché il foglio non carica) ── */
window.VAIFB = {
  WA_Officina:      '393203476892',
  Tel_Officina:     '+393203476892',
  WA_Vendite:       '393203476892',
  Tel_Vendite:      '+393203476892',
  Indirizzo:        'Via Volturno, 86',
  Citta:            'Cavezzo (MO)',
  CAP:              '41032',
  Orari:            'Lun–Sab 08:30–12:30 / 15:30–19:30',
  Orari_Domenica:   'Domenica chiuso',
  URL_Sito:         'https://simo368.github.io/vaiferrobike/',
  WA_Testo_Default: 'Ciao VAI FERRO BIKE vorrei informazioni.',
  // Mappa lat/lon (usata dalla pagina contatti)
  Lat:              '44.8327569',
  Lon:              '11.0342762',
  // Foto hero gallery (tab Impostazioni: Foto_Hero_1 ... Foto_Hero_5)
  Foto_Hero_1: '',
  Foto_Hero_2: '',
  Foto_Hero_3: '',
  Foto_Hero_4: '',
  Foto_Hero_5: '',
  // Slogan hero a 3 righe (tab Impostazioni: Hero_Riga_1, Hero_Riga_2, Hero_Riga_3, Hero_Accento)
  Hero_Riga_1:  'PEDALA.',
  Hero_Riga_2:  'VIVI.',
  Hero_Riga_3:  'RIPARA.',
  Hero_Accento: '2',  // numero della riga con colore accent (1, 2 o 3)
  // Servizi Home (titolo e testo delle 3 card)
  Home_Servizio_1_Titolo: 'Negozio bici',
  Home_Servizio_1_Testo:  'MTB, city bike, gravel, trekking, bici da corsa e bici bambino. Ti aiutiamo a scegliere la bici giusta per il tuo uso e il tuo budget.',
  Home_Servizio_2_Titolo: 'Officina',
  Home_Servizio_2_Testo:  'Riparazioni rapide, manutenzione, regolazione cambio e freni, sostituzione gomme, revisione completa. Anche per e-bike.',
  Home_Servizio_3_Titolo: 'E-bike',
  Home_Servizio_3_Testo:  'Consulenza guidata sul budget, scelta del modello giusto per il tuo uso e assistenza tecnica post-vendita direttamente in negozio.',
  // Statistiche Home
  Home_Stat_1_Numero:    '10+',
  Home_Stat_1_Etichetta: 'Anni di esperienza',
  Home_Stat_2_Numero:    '50+',
  Home_Stat_2_Etichetta: 'Modelli in negozio',
  Home_Stat_3_Numero:    '0',
  Home_Stat_3_Etichetta: 'Compromessi sulla qualità',
  // Testi generali Home
  Home_Titolo_Servizi:   'Tutto ciò di cui\nhai bisogno, qui.',
  Home_Testo_Servizi:    'Vendita, officina, e-bike e consulenza. Un solo posto, persone vere.',
  Home_CTA_Titolo:       'Vieni a trovarci o scrivici.',
  Home_CTA_Testo:        'Via Volturno 86, Cavezzo. Aperti dal lunedì al sabato, 08:30–12:30 / 15:30–19:30.',
  // Testi Officina
  Officina_Titolo_Hero:  'Officina rapida.',
  Officina_Sottotitolo_Hero: 'Riparazioni, manutenzione e check-up. Il cuore di VAI FERRO BIKE batte qui.',
  Officina_CTA:          'Non serve sempre prenotare. Passa in negozio per un check-up rapido.',
  // Testi E-Bike
  Ebike_Titolo_Hero:     'Il futuro è elettrico.',
  Ebike_Sottotitolo_Hero: 'Più chilometri, meno fatica. Scopri come una e-bike può cambiarti la vita quotidiana e il weekend.',
  Ebike_CTA:             'Vieni a provarne una.',
  // Testi Contatti
  Contatti_Indirizzo:    'Via Volturno, 86<br>41032 Cavezzo (MO)',
  Contatti_Telefono:     '+39 320 347 6892',
  Contatti_WhatsApp:     'Scrivi su WhatsApp →',
  Contatti_Orari:        'Lun – Sab: 08:30–12:30 / 15:30–19:30',
};

/* ─── PARSING CSV ROBUSTO (stesso algoritmo di prodotti.js) ──── */
function parseCSVRow(line) {
  const result = [];
  let cur = '', inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQ && line[i + 1] === '"') { cur += '"'; i++; }
      else { inQ = !inQ; }
    } else if (ch === ',' && !inQ) {
      result.push(cur); cur = '';
    } else {
      cur += ch;
    }
  }
  result.push(cur);
  return result;
}

/* ─── CARICA DAL FOGLIO ──────────────────────────────────────── */
async function loadImpostazioni() {
  if (!IMPOSTAZIONI_SHEET_ID || IMPOSTAZIONI_SHEET_ID === 'YOUR_SHEET_ID_HERE') return;
  try {
    const cacheKey = `vaifb_impostazioni_${IMPOSTAZIONI_SHEET_ID}`;
    const cached = sessionStorage.getItem(cacheKey);
    let text;
    
    if (cached) {
      text = cached;
    } else {
      const url = `https://docs.google.com/spreadsheets/d/${IMPOSTAZIONI_SHEET_ID}/export?format=csv&gid=${GID_IMPOSTAZIONI}`;
      const res = await fetch(url);
      if (!res.ok) return;
      const buffer = await res.arrayBuffer();
      text = new TextDecoder('utf-8').decode(buffer);
      sessionStorage.setItem(cacheKey, text);
    }
    
    const lines = text.replace(/^\uFEFF/, '').trim().split('\n');
    // lines[0] = intestazioni (Chiave, Valore) → saltiamo
    lines.slice(1).forEach(line => {
      const cols = parseCSVRow(line);
      const key   = (cols[0] || '').trim();
      const value = (cols[1] || '').trim();
      if (key) window.VAIFB[key] = value;
    });
  } catch (e) {
    console.warn('[VAIFB] Impostazioni non caricate:', e.message);
  }
  applyConfig();
  // Notifica gli altri script (es. prodotti.js) che la config è pronta
  document.dispatchEvent(new CustomEvent('vaifb:ready', { detail: window.VAIFB }));
}

/* ─── APPLICA CONFIGURAZIONE AL DOM ─────────────────────────── */
function applyConfig() {
  const waOff  = window.VAIFB.WA_Officina || '393000000000';
  const telOff = (window.VAIFB.Tel_Officina || '').replace(/\s/g, '');
  const waVen  = window.VAIFB.WA_Vendite || waOff;
  const telVen = (window.VAIFB.Tel_Vendite || telOff).replace(/\s/g, '');

  /* Aggiorna tutti i link WhatsApp globali */
  document.querySelectorAll('a[href*="wa.me/"]').forEach(a => {
    let target = waOff; // Default: Officina / Generale
    if (a.hasAttribute('data-vaifb-wa')) {
      if (a.dataset.vaifbWa === 'Vendite') target = waVen;
    }
    a.href = a.href.replace(/wa\.me\/\d+/, `wa.me/${target}`);
  });

  /* Aggiorna tutti i link telefono globali */
  document.querySelectorAll('a[href^="tel:"]').forEach(a => {
    if (!a.hasAttribute('data-vaifb-tel')) {
      let target = telOff; // Default: Officina / Generale
      if (a.hasAttribute('data-vaifb-tel-link')) {
        if (a.dataset.vaifbTelLink === 'Vendite') target = telVen;
      }
      if (target) {
        a.href = `tel:${target.startsWith('+') ? target : '+' + target}`;
      }
    }
  });

  /* Aggiorna testi semplici */
  document.querySelectorAll('[data-vaifb]').forEach(el => {
    const key = el.dataset.vaifb;
    if (window.VAIFB[key] !== undefined && window.VAIFB[key] !== '') {
      // Usa textContent sicuro, ma permette <br> convertendo i line breaks
      const safeText = String(window.VAIFB[key])
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/\n/g, '<br>');
      el.innerHTML = safeText;
      // Se l'elemento è uno stat-num con animazione counter, sincronizza data-count
      // per mantenere l'animazione numerica coerente col valore del foglio
      if (el.classList.contains('stat-num') && el.hasAttribute('data-count')) {
        const raw = String(window.VAIFB[key]).trim();
        // Estrae il numero e il suffisso (es. "10+" → count=10, suffix="+")
        const match = raw.match(/^(\d+)(.*)$/);
        if (match) {
          el.dataset.count  = match[1];
          el.dataset.suffix = match[2];
        }
      }
    }
  });

  /* Aggiorna link telefonici specifici testuali (es. pagina Contatti) */
  document.querySelectorAll('[data-vaifb-tel]').forEach(el => {
    const key = el.dataset.vaifbTel;
    const val = window.VAIFB[key];
    
    if (val && val.trim() !== '') {
      const p = val.replace(/\s/g, '');
      el.href = `tel:${p.startsWith('+') ? p : '+' + p}`;
      el.textContent = val;
    }
  });

  /* Aggiorna lo schema JSON-LD se presente */
  const ldScript = document.querySelector('script[type="application/ld+json"]');
  if (ldScript) {
    try {
      const ld = JSON.parse(ldScript.textContent);
      if (ld.telephone !== undefined) ld.telephone = window.VAIFB.Telefono;
      if (ld.url !== undefined && window.VAIFB.URL_Sito) ld.url = window.VAIFB.URL_Sito;
      ldScript.textContent = JSON.stringify(ld);
    } catch (_) { /* JSON-LD non valido, skip */ }
  }

  /* Aggiorna immagini globali (data-vaifb-img) */
  document.querySelectorAll('[data-vaifb-img]').forEach(el => {
    const key = el.dataset.vaifbImg;
    const url = window.VAIFB[key];
    if (url && url.trim() !== '') {
      const imgUrl = vaifbDriveUrl(url);
      el.innerHTML = `<img src="${imgUrl}" alt="${key}" loading="lazy" style="width:100%;height:100%;object-fit:cover;border-radius:var(--r-xl);display:block" onerror="this.parentElement.style.display='none'">`;
      el.classList.remove('editorial-visual__ph');
      el.style.display = 'block';
      el.style.padding = '0';
      el.style.border = 'none';
      el.style.width = '100%';
      el.style.height = '100%';
    }
  });

  /* ─── HERO GALLERY (Foto_Hero_1 ... Foto_Hero_5) ───────────────────── */
  initHeroGallery();

  /* ─── SLOGAN HERO (Hero_Riga_1/2/3 + Hero_Accento) ────────────────── */
  initHeroSlogan();
}

function vaifbDriveUrl(url) {
  if (!url || !url.includes('drive.google.com')) return url;
  let fileId = null;
  const m = url.match(/\/file\/d\/([^/?#&]+)/);
  if (m) fileId = m[1];
  if (!fileId) {
    const o = url.match(/[?&]id=([^&]+)/);
    if (o) fileId = o[1];
  }
  if (fileId) return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`;
  return url;
}

/* ─── HERO GALLERY ─────────────────────────────────────────────────────── */
function initHeroGallery() {
  const gallery = document.getElementById('heroGallery');
  if (!gallery) return; // non siamo sulla homepage

  // Raccoglie le URL configurate (Foto_Hero_1 ... Foto_Hero_5)
  const urls = [1, 2, 3, 4, 5]
    .map(n => (window.VAIFB[`Foto_Hero_${n}`] || '').trim())
    .filter(Boolean)
    .map(u => vaifbDriveUrl(u));

  if (urls.length === 0) return; // nessuna foto → mostra placeholder, niente da fare

  // Nasconde il placeholder
  const placeholder = gallery.querySelector('.hero-gallery__placeholder');
  if (placeholder) placeholder.style.display = 'none';

  // Crea le slide
  urls.forEach((url, i) => {
    const slide = document.createElement('div');
    slide.className = 'hero-gallery__slide' + (i === 0 ? ' active' : '');
    const img = document.createElement('img');
    img.src = url;
    img.alt = `Foto negozio ${i + 1}`;
    img.loading = i === 0 ? 'eager' : 'lazy';
    img.decoding = 'async';
    img.onerror = function() {
      // Slide con errore: la nascondiamo e andiamo avanti
      this.parentElement.remove();
    };
    slide.appendChild(img);
    gallery.appendChild(slide);
  });

  if (urls.length === 1) return; // 1 sola foto: statica, basta

  // Crea i puntini indicatori
  const dotsEl = document.createElement('div');
  dotsEl.className = 'hero-gallery__dots';
  urls.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'hero-gallery__dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Foto ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(dot);
  });
  gallery.appendChild(dotsEl);

  let current = 0;
  let timer = null;

  function getSlides() {
    return [...gallery.querySelectorAll('.hero-gallery__slide')];
  }

  function getDots() {
    return [...dotsEl.querySelectorAll('.hero-gallery__dot')];
  }

  function goTo(index) {
    const slides = getSlides();
    const dots   = getDots();
    if (!slides.length) return;
    const n = ((index % slides.length) + slides.length) % slides.length;
    slides[current]?.classList.remove('active');
    dots[current]?.classList.remove('active');
    current = n;
    slides[current]?.classList.add('active');
    dots[current]?.classList.add('active');
  }

  function startAuto() {
    timer = setInterval(() => {
      const slides = getSlides();
      goTo((current + 1) % slides.length);
    }, 4000);
  }

  // Pausa su hover per non disturbare chi guarda le foto
  gallery.addEventListener('mouseenter', () => clearInterval(timer));
  gallery.addEventListener('mouseleave', startAuto);

  startAuto();
}

/* ─── SLOGAN HERO ────────────────────────────────────────────────────── */
function initHeroSlogan() {
  const slogan = document.getElementById('heroSlogan');
  if (!slogan) return; // non siamo sulla homepage

  const accent = parseInt(window.VAIFB.Hero_Accento, 10) || 2;

  [1, 2, 3].forEach(n => {
    const text = (window.VAIFB[`Hero_Riga_${n}`] || '').trim();
    const span = slogan.querySelector(`[data-vaifb-slogan="${n}"]`);
    if (!span) return;

    // Aggiorna testo se configurato nel foglio
    if (text) span.textContent = text;

    // Applica accent alla riga configurata
    span.classList.toggle('hero__slogan-accent', n === accent);
  });

  // Aggiorna aria-label per accessibilità
  const rows = [...slogan.querySelectorAll('[data-vaifb-slogan]')]
    .map(s => s.textContent.trim()).join(' ');
  if (rows) slogan.setAttribute('aria-label', rows);
}

/* ─── ESPORTA applyConfig per richiamo esterno (es. prodotti.js) */
window.VAIFB.applyConfig = applyConfig;

/* ─── AVVIO ──────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', loadImpostazioni);
