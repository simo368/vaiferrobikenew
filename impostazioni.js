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
      el.textContent = window.VAIFB[key];
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

/* ─── ESPORTA applyConfig per richiamo esterno (es. prodotti.js) */
window.VAIFB.applyConfig = applyConfig;

/* ─── AVVIO ──────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', loadImpostazioni);
