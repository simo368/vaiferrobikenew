/* ═══════════════════════════════════════════════════════════
   VAI FERRO BIKE — prodotti.js  v2.0
   Alimentato da Google Sheets (CSV pubblico, sola lettura)
   ═══════════════════════════════════════════════════════════

   CONFIGURAZIONE:
   1. Nel tuo Google Sheet: File → Condividi → "Chiunque con il link" → Visualizzatore
   2. Copia l'ID dal tuo URL (la parte lunga tra /d/ e /edit)
      es: https://docs.google.com/spreadsheets/d/[QUESTO_QUI]/edit
   3. Incollalo qui sotto al posto di YOUR_SHEET_ID_HERE
   4. Salva. Fine.

   COLONNE SUPPORTATE NEL FOGLIO:
   Nome | Marca | Categoria | Descrizione_Breve | Descrizione_Completa
   Prezzo | Disponibile | In_Evidenza | Immagine | Caratteristiche
   Taglia | Colore | Anno | Ordinamento | Note

   FORMATO IMMAGINE (colonna "Immagine"):
   - Link Google Drive (si convertono automaticamente):
       https://drive.google.com/file/d/FILEID/view
       https://drive.google.com/open?id=FILEID
   - Link diretto (già funzionante):
       https://... qualsiasi URL diretto a un'immagine
   - Più immagini separate da | (pipe):
       https://drive.google.com/file/d/ABC/view|https://drive.google.com/file/d/XYZ/view
*/

const CONFIG = {
  SHEET_ID: '1egFO7xMvKZLGTcVI_OjDq5Fjf2DgAmgFQlYHBxshmoI',   // ← CAMBIA SOLO QUESTO
  WA_NUMBER: '393000000000',         // ← Numero WhatsApp senza + (es. 393331234567)
  WA_BASE_MSG: 'Ciao VAI FERRO BIKE, sono interessato a ',
};

/* ─── DATI DEMO (usati finché SHEET_ID non è configurato) ──── */
const DEMO_BIKES = [
  { Nome: 'Trek Marlin 5', Marca: 'Trek', Categoria: 'MTB', Descrizione_Breve: 'Hardtail versatile per sentieri e uso misto. Forcella ammortizzata, freni a disco.', Descrizione_Completa: 'La Trek Marlin 5 è la scelta ideale per chi vuole avvicinarsi al mountain bike senza compromessi. Forcella SR Suntour XCT da 100mm, freni idraulici Tektro, cambio Shimano Altus 21V. Ruote 29" per un rotolamento fluido e veloce.', Prezzo: 'da €799', Disponibile: 'SI', In_Evidenza: 'SI', Immagine: '', Caratteristiche: 'Forcella 100mm|Freni a disco idraulici|Cambio Shimano 21V|Ruote 29"', Taglia: 'S,M,L,XL', Colore: 'Nero|Blu', Anno: '2024', Ordinamento: '10', Note: '' },
  { Nome: 'Bianchi E-Omnia T', Marca: 'Bianchi', Categoria: 'E-Bike', Descrizione_Breve: 'E-bike da trekking con motore Bosch. Autonomia fino a 120km, display integrato.', Descrizione_Completa: 'La Bianchi E-Omnia T unisce il fascino del brand storico alla tecnologia moderna. Motore Bosch Active Line Plus, batteria 500Wh, display Purion. Perfetta per pendolari e appassionati di cicloturismo.', Prezzo: 'da €2.499', Disponibile: 'SI', In_Evidenza: 'SI', Immagine: '', Caratteristiche: 'Motore Bosch|Batteria 500Wh|Autonomia ~120km|Display Purion', Taglia: 'S,M,L', Colore: 'Celeste|Nero', Anno: '2024', Ordinamento: '20', Note: 'Disponibile in più taglie' },
  { Nome: 'Cube Nature', Marca: 'Cube', Categoria: 'Trekking', Descrizione_Breve: 'Bici da trekking polivalente, ideale per percorsi misti e lunghe uscite su strada e sterrato.', Descrizione_Completa: 'La Cube Nature è progettata per chi ama pedalare senza limiti. Telaio in alluminio leggero, forcella rigida, pneumatici 700x42c per aderenza su tutti i fondi.', Prezzo: 'da €699', Disponibile: 'SI', In_Evidenza: 'NO', Immagine: '', Caratteristiche: 'Telaio alluminio|Pneumatici 700x42c|Cambio Shimano 24V|Portapacchi incluso', Taglia: 'XS,S,M,L', Colore: 'Grigio|Verde', Anno: '2024', Ordinamento: '30', Note: '' },
  { Nome: 'Cannondale Quick 4', Marca: 'Cannondale', Categoria: 'City Bike', Descrizione_Breve: 'Bici urbana veloce e leggera. Per commuter esigenti che non vogliono rinunciare alle prestazioni.', Descrizione_Completa: 'La Cannondale Quick 4 è la scelta dei professionisti urbani. Telaio SmartForm C3, manubrio flat bar, freni a disco meccanici. Agile nel traffico, veloce in rettilineo.', Prezzo: 'da €649', Disponibile: 'SI', In_Evidenza: 'NO', Immagine: '', Caratteristiche: 'Telaio SmartForm C3|Freni a disco meccanici|Ruote 700c|Peso 10.8kg', Taglia: 'XS,S,M,L,XL', Colore: 'Nero|Bianco', Anno: '2023', Ordinamento: '40', Note: '' },
  { Nome: 'Trek Checkpoint ALR 5', Marca: 'Trek', Categoria: 'Gravel', Descrizione_Breve: 'Gravel bike da avventura. Perfetta per lunghe uscite su strade bianche e percorsi misti.', Descrizione_Completa: 'La Trek Checkpoint ALR 5 è costruita per chi vuole esplorare. Telaio Alpha Platinum Aluminium, forcella IsoSpeed, compatibilità con pneumatici fino a 45mm. Portapacchi e borse laterali integrabili.', Prezzo: 'da €1.299', Disponibile: 'SI', In_Evidenza: 'SI', Immagine: '', Caratteristiche: 'Forcella IsoSpeed|Pneumatici 40mm|Cambio Shimano GRX|Attacchi borse', Taglia: 'XS,S,M,L,XL', Colore: 'Verde|Grigio', Anno: '2024', Ordinamento: '50', Note: '' },
  { Nome: 'Specialized Allez', Marca: 'Specialized', Categoria: 'Corsa', Descrizione_Breve: 'Bici da corsa entry-level con geometria aggressiva. Perfetta per iniziare a gareggiare.', Descrizione_Completa: 'La Specialized Allez è la porta di ingresso al mondo della corsa. Telaio E5 Premium Aluminum, forcella carbonio, cambio Shimano Claris 16V. Veloce, reattiva, precisa.', Prezzo: 'da €999', Disponibile: 'SI', In_Evidenza: 'NO', Immagine: '', Caratteristiche: 'Telaio E5 Aluminum|Forcella carbonio|Cambio Claris 16V|Peso 9.7kg', Taglia: 'XS,S,M,L,XL', Colore: 'Rosso|Bianco', Anno: '2024', Ordinamento: '60', Note: '' },
  { Nome: 'Scott Scale 980', Marca: 'Scott', Categoria: 'MTB', Descrizione_Breve: 'MTB hardtail con geometria moderna. Ottima per trail tecnici e discese veloci.', Descrizione_Completa: 'La Scott Scale 980 porta sul sentiero una geometria moderna e aggressiva. Forcella SR Suntour XCR da 120mm, cambio Shimano Deore 12V, freni Shimano MT401 4 pistoni.', Prezzo: 'da €1.099', Disponibile: 'SI', In_Evidenza: 'NO', Immagine: '', Caratteristiche: 'Forcella 120mm|Cambio Deore 12V|Freni 4 pistoni|Geometria trail', Taglia: 'S,M,L,XL', Colore: 'Nero|Arancione', Anno: '2023', Ordinamento: '70', Note: '' },
  { Nome: 'Atala E-Race', Marca: 'Atala', Categoria: 'E-Bike', Descrizione_Breve: 'E-bike da corsa con motore Shimano STEPS. Per chi vuole il piacere della road bike con l\'assistenza elettrica.', Descrizione_Completa: 'L\'Atala E-Race combina l\'estetica da corsa con la tecnologia Shimano STEPS EP8. Motore 250W, batteria integrata 504Wh, display SC-E6100. Cambio Shimano Ultegra.', Prezzo: 'da €3.299', Disponibile: 'SI', In_Evidenza: 'NO', Immagine: '', Caratteristiche: 'Motore Shimano EP8|Batteria 504Wh|Cambio Ultegra|Design road', Taglia: 'S,M,L', Colore: 'Nero', Anno: '2024', Ordinamento: '80', Note: 'Su ordinazione' },
  { Nome: 'Bianchi Fretta', Marca: 'Bianchi', Categoria: 'City Bike', Descrizione_Breve: 'City bike classica con stile inconfondibile. 7 velocità, portapacchi, parafanghi. Pronta per la città.', Descrizione_Completa: 'La Bianchi Fretta è la bici urbana per eccellenza. Telaio acciaio Cro-Mo, cambio Shimano Tourney 7V, freni V-Brake, portapacchi posteriore e parafanghi inclusi. Disponibile in colore Celeste iconico.', Prezzo: 'da €599', Disponibile: 'SI', In_Evidenza: 'NO', Immagine: '', Caratteristiche: 'Telaio acciaio|Cambio 7V|Portapacchi incluso|Parafanghi inclusi', Taglia: 'XS,S,M,L', Colore: 'Celeste', Anno: '2023', Ordinamento: '90', Note: 'Disponibile nel colore Celeste originale' },
  { Nome: 'KTM Macina Charm', Marca: 'KTM', Categoria: 'E-Bike', Descrizione_Breve: 'E-bike da città elegante, con motore Bosch e design premium. Per chi non rinuncia allo stile.', Descrizione_Completa: 'La KTM Macina Charm è la e-bike per chi vuole muoversi in città con classe. Motore Bosch Active Line Plus, batteria 400Wh integrata nel tubo obliquo, display Purion. Cambio Shimano Nexus 8 velocità.', Prezzo: 'da €2.199', Disponibile: 'SI', In_Evidenza: 'SI', Immagine: '', Caratteristiche: 'Motore Bosch|Batteria 400Wh|Cambio Nexus 8V|Design city', Taglia: 'XS,S,M,L', Colore: 'Bianco|Nero', Anno: '2024', Ordinamento: '15', Note: '' },
  { Nome: 'Focus Raven 8.8', Marca: 'Focus', Categoria: 'MTB', Descrizione_Breve: 'Full-suspension trail bike per sentieri impegnativi. 130mm anteriore e posteriore.', Descrizione_Completa: 'La Focus Raven 8.8 è la full-suspension per chi non si accontenta. Forcella Fox Rhythm 34 da 130mm, ammortizzatore Fox Float DPS, cambio Shimano Deore 12V, freni Shimano MT520 4 pistoni.', Prezzo: 'da €2.499', Disponibile: 'SI', In_Evidenza: 'NO', Immagine: '', Caratteristiche: 'Full-suspension 130mm|Forcella Fox|Cambio Deore 12V|Freni 4 pistoni', Taglia: 'S,M,L,XL', Colore: 'Nero', Anno: '2023', Ordinamento: '110', Note: '' },
  { Nome: 'Raleigh Pioneer Low Step', Marca: 'Raleigh', Categoria: 'City Bike', Descrizione_Breve: 'Bici da città con telaio open frame, ideale per chi cerca praticità nel salire e scendere.', Descrizione_Completa: 'La Raleigh Pioneer Low Step è pensata per chi usa la bici ogni giorno. Telaio open frame, cambio Shimano Tourney 21V, freni V-Brake, sella comfort e manubrio alto ergonomico.', Prezzo: 'da €449', Disponibile: 'SI', In_Evidenza: 'NO', Immagine: '', Caratteristiche: 'Telaio open frame|Cambio 21V|Sella comfort|Parafanghi inclusi', Taglia: 'Unica', Colore: 'Bianco|Blu', Anno: '2023', Ordinamento: '120', Note: '' },
  { Nome: 'Trek FX 3 Disc', Marca: 'Trek', Categoria: 'City Bike', Descrizione_Breve: 'Bici da fitness/city ad alte prestazioni. Leggera, reattiva, freni a disco idraulici.', Descrizione_Completa: 'La Trek FX 3 Disc è la scelta di chi vuole prestazioni da fitness bike con la praticità di una city bike. Telaio Alpha Gold Aluminium, freni Shimano MT200, cambio Shimano Deore 20V.', Prezzo: 'da €999', Disponibile: 'SI', In_Evidenza: 'NO', Immagine: '', Caratteristiche: 'Freni idraulici|Cambio Deore 20V|Telaio leggero|Ruote 700c', Taglia: 'XS,S,M,L,XL', Colore: 'Nero|Grigio', Anno: '2024', Ordinamento: '130', Note: '' },
  { Nome: 'Bottecchia Arlecchino', Marca: 'Bottecchia', Categoria: 'Usato', Descrizione_Breve: 'Bici vintage anni \'80 restaurata. Cambio Campagnolo, telaio acciaio Columbus. Pezzo da collezione.', Descrizione_Completa: 'Un gioiello del ciclismo italiano degli anni \'80, restaurato con cura. Telaio acciaio Columbus SL, cambio Campagnolo Record 6V, cerchi Super Champion. Solo per veri appassionati.', Prezzo: '€380', Disponibile: 'SI', In_Evidenza: 'SI', Immagine: '', Caratteristiche: 'Telaio Columbus SL|Cambio Campagnolo|Restaurata|Pezzo da collezione', Taglia: '54cm', Colore: 'Multicolore', Anno: '1985', Ordinamento: '5', Note: 'Unico esemplare disponibile' },
];

/* ─── ICONE SVG PER CATEGORIA ─────────────────────────────── */
const CATEGORY_ICONS = {
  'MTB': `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="14" cy="44" r="10"/><circle cx="50" cy="44" r="10"/><path d="M14 44L26 22h10l14 22M26 22l9 22M36 22l-8 22"/><path d="M8 28l6-6M56 28l-6-6M20 16l16 0"/></svg>`,
  'E-Bike': `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="14" cy="44" r="10"/><circle cx="50" cy="44" r="10"/><path d="M14 44L26 22h10l14 22M26 22l9 22"/><path d="M33 10l-5 9h8l-5 9" stroke-width="2.5"/></svg>`,
  'City Bike': `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="14" cy="44" r="10"/><circle cx="50" cy="44" r="10"/><path d="M14 44L24 24h16l10 20"/><path d="M24 24l8 0M32 24l-6 20M30 20l-4 0M26 16h8"/><path d="M44 30h8M46 24v12"/></svg>`,
  'Gravel': `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="14" cy="44" r="10"/><circle cx="50" cy="44" r="10"/><path d="M14 44L26 20h12l12 24M26 20l8 24M40 20l-8 24"/><path d="M22 16h20M32 20V12"/></svg>`,
  'Trekking': `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="14" cy="44" r="10"/><circle cx="50" cy="44" r="10"/><path d="M14 44L28 22h8l14 22M28 22l6 22M36 22l-8 22"/><rect x="22" y="26" width="20" height="12" rx="2"/></svg>`,
  'Corsa': `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="14" cy="44" r="10"/><circle cx="50" cy="44" r="10"/><path d="M14 44L28 22h8l14 22M28 22l6 22M36 22l-8 22"/><path d="M26 22c0-4 4-8 8-8s8 4 8 8"/></svg>`,
  'Bambino': `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="44" r="8"/><circle cx="46" cy="44" r="8"/><path d="M18 44L28 26h8l10 18M28 26l5 18M36 26l-8 18"/><circle cx="32" cy="14" r="4"/></svg>`,
  'Usato': `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="14" cy="44" r="10"/><circle cx="50" cy="44" r="10"/><path d="M14 44L26 22h10l14 22M26 22l9 22"/><path d="M40 16c3 0 5 2 5 5s-2 5-5 5-5-2-5-5 2-5 5-5"/><path d="M44 26l4 4"/></svg>`,
};
const DEFAULT_ICON = CATEGORY_ICONS['MTB'];

/* ─── STATO APPLICAZIONE ──────────────────────────────────── */
let allBikes = [];
let activeCategory = 'Tutte';
let activeSort = 'evidenza';
let searchQuery = '';
let isFromSheet = false;

/* ─── DOM REFS ────────────────────────────────────────────── */
const gridEl = document.getElementById('prodottiGrid');
const countEl = document.getElementById('prodottiCount');
const filterContainer = document.getElementById('filterPills');
const sortSelect = document.getElementById('sortSelect');
const searchInput = document.getElementById('searchInput');
const searchClear = document.getElementById('searchClear');
const modal = document.getElementById('productModal');

/* ════════════════════════════════════════════════════════════
   GOOGLE DRIVE — conversione link
   ════════════════════════════════════════════════════════════
   Formati supportati:
   • https://drive.google.com/file/d/FILE_ID/view
   • https://drive.google.com/file/d/FILE_ID/view?usp=sharing
   • https://drive.google.com/open?id=FILE_ID
   • https://drive.google.com/uc?id=FILE_ID  (già diretto)
   Tutti diventano: https://drive.google.com/uc?export=view&id=FILE_ID
*/
function convertDriveUrl(url, size = 'w1200') {
  if (!url || !url.includes('drive.google.com')) return url;

  let fileId = null;

  // https://drive.google.com/file/d/FILE_ID/...
  const fileMatch = url.match(/\/file\/d\/([^/?#&]+)/);
  if (fileMatch) fileId = fileMatch[1];

  // https://drive.google.com/open?id=FILE_ID
  // https://drive.google.com/uc?id=FILE_ID
  if (!fileId) {
    const idMatch = url.match(/[?&]id=([^&]+)/);
    if (idMatch) fileId = idMatch[1];
  }

  if (fileId) {
    // /thumbnail è più affidabile di uc?export=view su browser moderni
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=${size}`;
  }

  return url; // formato non riconosciuto → restituisce inalterato
}

/* ─── PARSE IMMAGINI (Drive + diretti, multi) ─────────────── */
function parseImages(raw, size = 'w1200') {
  if (!raw || !raw.trim()) return [];
  return raw.split(/[|,]/)
    .map(u => convertDriveUrl(u.trim(), size))
    .filter(u => u.startsWith('http'));
}

/* ═══════════════════════════════════════════════════════════
   FUNZIONI DI UTILITÀ PER LEGGERE IL FOGLIO GOOGLE
   ═══════════════════════════════════════════════════════════

   Google Sheets può esportare valori in modi diversi a seconda
   di come hai configurato le celle:
     - Checkbox checked   → "VERO" (italiano) oppure "TRUE" (inglese)
     - Checkbox unchecked → "FALSO" / "FALSE"
     - Testo manuale      → "SI" / "NO"
   isTrue() le accetta tutte senza problemi.
*/

/**
 * Legge un campo booleano del foglio.
 * Accetta: SI, NO, VERO, FALSO, TRUE, FALSE (case-insensitive)
 */
function isTrue(val) {
  if (!val) return false;
  const v = String(val).trim().toUpperCase();
  return v === 'SI' || v === 'TRUE' || v === 'VERO';
}

/**
 * Formatta il prezzo da mostrare all'utente.
 * - Se il campo è un numero puro (es. 1149 o 1149.00) → "€ 1.149"
 * - Se contiene già testo (es. "da €3.499") → lascia invariato
 * - Se vuoto → "Su richiesta"
 */
function formatPrezzo(raw) {
  if (!raw || !raw.trim()) return 'Su richiesta';
  const str = raw.trim();
  // Se è già una stringa con testo (contiene lettere o simboli €) la lasciamo invariata
  if (/[^0-9.,]/.test(str)) return str;
  // Numero puro: formattiamo con separatore migliaia e simbolo €
  const num = parseFloat(str.replace(',', '.'));
  if (isNaN(num)) return str;
  return '€\u00A0' + num.toLocaleString('it-IT', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

/* ─── FETCH DAL GOOGLE SHEET ──────────────────────────────── */
async function fetchFromSheet() {
  if (!CONFIG.SHEET_ID || CONFIG.SHEET_ID === 'YOUR_SHEET_ID_HERE') return null;
  const cacheKey = `vaifb_prodotti_${CONFIG.SHEET_ID}`;
  const cached = sessionStorage.getItem(cacheKey);
  if (cached) return cached;

  const url = `https://docs.google.com/spreadsheets/d/${CONFIG.SHEET_ID}/export?format=csv&gid=0`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buffer = await res.arrayBuffer();
  const text = new TextDecoder('utf-8').decode(buffer);
  sessionStorage.setItem(cacheKey, text);
  return text;
}

/* ─── PARSING CSV ROBUSTO ─────────────────────────────────── */
function parseCSV(csvText) {
  // Rimuove BOM UTF-8 se presente
  const text = csvText.replace(/^\uFEFF/, '').trim();
  const lines = text.split('\n');
  if (lines.length < 2) return [];

  const headers = parseLine(lines[0]).map(h => h.trim());

  return lines.slice(1)
    .map(line => {
      const values = parseLine(line);
      const obj = {};
      headers.forEach((h, i) => {
        obj[h] = (values[i] || '').trim();
      });
      return obj;
    })
    .filter(b => b.Nome && b.Nome.trim());
}

function parseLine(line) {
  const result = [];
  let cur = '';
  let inQ = false;
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

/* ─── CARICAMENTO PRINCIPALE ──────────────────────────────── */
async function loadBikes() {
  showSkeleton();
  try {
    const csvText = await fetchFromSheet();
    if (csvText) {
      allBikes = parseCSV(csvText).filter(b => isTrue(b.Disponibile));
      isFromSheet = true;
    } else {
      allBikes = DEMO_BIKES.filter(b => isTrue(b.Disponibile));
      showDemoBanner();
    }
  } catch (e) {
    console.warn('Impossibile caricare il foglio, uso dati demo:', e);
    allBikes = DEMO_BIKES.filter(b => isTrue(b.Disponibile));
    showDemoBanner();
  }
  buildFilters();
  render();
}

/* ─── FILTRI ──────────────────────────────────────────────── */
function buildFilters() {
  if (!filterContainer) return;

  // 1. Estrae tutte le categorie uniche dalle bici caricate (ignorando celle vuote)
  const uniqueCats = Array.from(new Set(allBikes.map(b => b.Categoria?.trim()).filter(Boolean)));
  
  // 2. Crea la lista dinamica: prima "Tutte", poi le altre in ordine alfabetico
  const dynamicCategories = ['Tutte', ...uniqueCats.sort((a, b) => a.localeCompare(b, 'it'))];

  const counts = {};
  dynamicCategories.forEach(c => {
    counts[c] = c === 'Tutte'
      ? allBikes.length
      : allBikes.filter(b => b.Categoria === c).length;
  });

  filterContainer.innerHTML = dynamicCategories
    .filter(c => c === 'Tutte' || counts[c] > 0)
    .map(c => `
      <button class="filter-pill${c === activeCategory ? ' active' : ''}"
        data-cat="${c}" aria-pressed="${c === activeCategory}">
        ${c}
        <span class="pill-count">${counts[c]}</span>
      </button>`)
    .join('');

  filterContainer.querySelectorAll('.filter-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.cat;
      filterContainer.querySelectorAll('.filter-pill').forEach(b => {
        b.classList.toggle('active', b.dataset.cat === activeCategory);
        b.setAttribute('aria-pressed', b.dataset.cat === activeCategory);
      });
      render();
    });
  });
}

/* ─── ORDINAMENTO ─────────────────────────────────────────── */
function getSorted(list) {
  const copy = [...list];
  switch (activeSort) {
    case 'evidenza':
      return copy.sort((a, b) => {
        const aOrd = parseInt(a.Ordinamento) || 999;
        const bOrd = parseInt(b.Ordinamento) || 999;
        const aFeat = isTrue(a.In_Evidenza) ? 0 : 1;
        const bFeat = isTrue(b.In_Evidenza) ? 0 : 1;
        return aFeat - bFeat || aOrd - bOrd || a.Nome.localeCompare(b.Nome, 'it');
      });
    case 'az':   return copy.sort((a, b) => a.Nome.localeCompare(b.Nome, 'it'));
    case 'za':   return copy.sort((a, b) => b.Nome.localeCompare(a.Nome, 'it'));
    case 'marca': return copy.sort((a, b) => a.Marca.localeCompare(b.Marca, 'it') || a.Nome.localeCompare(b.Nome, 'it'));
    case 'anno': return copy.sort((a, b) => parseInt(b.Anno || '0') - parseInt(a.Anno || '0') || a.Nome.localeCompare(b.Nome, 'it'));
    default:     return copy;
  }
}

/* ─── RICERCA ─────────────────────────────────────────────── */
function applySearch(list) {
  const q = searchQuery.toLowerCase().trim();
  if (!q) return list;
  return list.filter(b =>
    b.Nome?.toLowerCase().includes(q) ||
    b.Marca?.toLowerCase().includes(q) ||
    b.Categoria?.toLowerCase().includes(q) ||
    b.Descrizione_Breve?.toLowerCase().includes(q)
  );
}

/* ─── RENDER GRIGLIA ──────────────────────────────────────── */
function render() {
  if (!gridEl) return;
  const filtered = activeCategory === 'Tutte'
    ? allBikes
    : allBikes.filter(b => b.Categoria === activeCategory);
  const searched = applySearch(filtered);
  const sorted = getSorted(searched);

  if (countEl) {
    let label = `<strong>${sorted.length}</strong> bici`;
    if (activeCategory !== 'Tutte') label += ` in <em>${activeCategory}</em>`;
    else label += ' in catalogo';
    if (searchQuery) label += ` · ricerca: "<em>${escapeHtml(searchQuery)}</em>"`;
    countEl.innerHTML = label;
  }

  if (sorted.length === 0) {
    gridEl.innerHTML = `
      <div class="products-empty">
        <div class="products-empty__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg>
        </div>
        <h3>Nessuna bici trovata</h3>
        <p>Prova a cambiare filtro o modifica la ricerca.<br>Potremmo comunque averla in negozio — scrivici!</p>
        <a class="btn btn-primary" href="https://wa.me/${CONFIG.WA_NUMBER}?text=Ciao%20VAI%20FERRO%20BIKE%2C%20cerco%20una%20bici%20specifica." target="_blank" rel="noopener">Chiedi su WhatsApp</a>
      </div>`;
    return;
  }

  gridEl.innerHTML = sorted.map((bike, i) => renderCard(bike, i)).join('');
  gridEl.querySelectorAll('.product-card').forEach((card, i) => {
    card.addEventListener('click', () => openModal(sorted[i]));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openModal(sorted[i]); });
    card.querySelector('.product-card__cta')?.addEventListener('click', e => e.stopPropagation());
  });
}

/* ─── RENDER CARD v3 ──────────────────────────────────────── */
function renderCard(bike) {
  const icon = CATEGORY_ICONS[bike.Categoria] || DEFAULT_ICON;
  const imgs = parseImages(bike.Immagine, 'w600');
  const firstImg = imgs[0] || '';
  const hasImg = !!firstImg;
  const isFeatured = isTrue(bike.In_Evidenza);
  const waText = encodeURIComponent(`${CONFIG.WA_BASE_MSG}${bike.Nome} (${bike.Categoria}). Potete darmi informazioni?`);

  return `
    <article class="product-card" tabindex="0" role="listitem" aria-label="${escapeHtml(bike.Nome)}">
      <div class="product-card__visual">
        ${hasImg
          ? `<img class="product-card__img" src="${firstImg}" alt="${escapeHtml(bike.Nome)}" loading="lazy"
               onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
             <div class="product-card__icon" style="display:none">${icon}</div>`
          : `<div class="product-card__icon">${icon}</div>`}
        <div class="product-card__badges">
          ${isFeatured ? '<span class="badge-gold" style="font-size:11px">★ In evidenza</span>' : ''}
          ${bike.Categoria === 'Usato' ? '<span class="badge-accent" style="font-size:11px">Usato</span>' : ''}
        </div>
        <div class="product-card__overlay">
          <span class="btn btn-sm btn-primary" style="pointer-events:none">Vedi dettaglio</span>
        </div>
      </div>
      <div class="product-card__body">
        <div class="product-card__meta">
          <span class="product-card__cat">${escapeHtml(bike.Categoria)}</span>
          ${bike.Marca ? `<span class="product-card__brand">${escapeHtml(bike.Marca)}</span>` : ''}
        </div>
        <h3 class="product-card__name">${escapeHtml(bike.Nome)}</h3>
        <p class="product-card__desc">${escapeHtml(bike.Descrizione_Breve || '')}</p>
        <div class="product-card__footer">
          <span class="product-card__price">${escapeHtml(formatPrezzo(bike.Prezzo))}</span>
          <span class="product-card__cta">
            Chiedi
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </span>
        </div>
      </div>
    </article>`;
}

/* ─── SKELETON LOADER v3 ──────────────────────────────────── */
function showSkeleton() {
  if (!gridEl) return;
  gridEl.className = 'product-grid';
  gridEl.innerHTML = Array(8).fill(`
    <div class="product-skeleton">
      <div class="product-skeleton__visual"></div>
      <div class="product-skeleton__body">
        <div class="product-skeleton__line short"></div>
        <div class="product-skeleton__line wide"></div>
        <div class="product-skeleton__line mid"></div>
        <div class="product-skeleton__line short"></div>
      </div>
    </div>`).join('');
}

/* ─── BANNER DEMO ─────────────────────────────────────────── */
function showDemoBanner() {
  const banner = document.getElementById('demoBanner');
  if (banner) banner.hidden = false;
}

/* ─── ESCAPE HTML (sicurezza XSS) ────────────────────────── */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ─── CAROUSEL BUILDER ────────────────────────────────────── */
function buildCarousel(images, bikeName, icon) {
  if (images.length === 0) {
    return `<div class="product-modal__visual-fallback">${icon}</div>`;
  }
  const slides = images.map(url =>
    `<div class="carousel__slide">
      <img src="${url}" alt="${escapeHtml(bikeName)}" loading="lazy"
        onerror="this.parentElement.style.background='var(--color-surface-raised)';this.style.display='none'">
    </div>`
  ).join('');
  const dots = images.map((_, i) =>
    `<button class="carousel__dot${i === 0 ? ' active' : ''}" aria-label="Foto ${i + 1}"></button>`
  ).join('');
  return `
    <div class="carousel" data-count="${images.length}">
      <div class="carousel__track">${slides}</div>
      ${images.length > 1 ? `
      <button class="carousel__btn carousel__btn--prev" aria-label="Foto precedente">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button class="carousel__btn carousel__btn--next" aria-label="Foto successiva">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M9 18l6-6-6-6"/></svg>
      </button>
      <div class="carousel__dots">${dots}</div>` : ''}
    </div>`;
}

function initCarousel(el) {
  const count = parseInt(el.dataset.count) || 1;
  if (count <= 1) return;
  const track = el.querySelector('.carousel__track');
  const dots = el.querySelectorAll('.carousel__dot');
  const prevBtn = el.querySelector('.carousel__btn--prev');
  const nextBtn = el.querySelector('.carousel__btn--next');
  let cur = 0;

  function goTo(index) {
    cur = ((index % count) + count) % count;
    track.style.transform = `translateX(-${cur * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === cur));
  }

  prevBtn?.addEventListener('click', () => goTo(cur - 1));
  nextBtn?.addEventListener('click', () => goTo(cur + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  let tx = 0, ty = 0;
  el.addEventListener('touchstart', e => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
  el.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - tx;
    const dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 44) goTo(dx < 0 ? cur + 1 : cur - 1);
  }, { passive: true });

  el._keyHandler = (e) => {
    if (e.key === 'ArrowLeft') goTo(cur - 1);
    if (e.key === 'ArrowRight') goTo(cur + 1);
  };
  document.addEventListener('keydown', el._keyHandler);
}

/* ─── MODAL DETTAGLIO ─────────────────────────────────────── */
function openModal(bike) {
  if (!modal) return;
  const icon = CATEGORY_ICONS[bike.Categoria] || DEFAULT_ICON;
  const images = parseImages(bike.Immagine);
  const waText = encodeURIComponent(`${CONFIG.WA_BASE_MSG}${bike.Nome} (${bike.Categoria}). Vorrei sapere disponibilità e prezzo.`);
  const features = bike.Caratteristiche
    ? bike.Caratteristiche.split('|').map(f => f.trim()).filter(Boolean)
    : [];

  // Carousel
  const visualEl = modal.querySelector('.product-modal__visual');
  visualEl.innerHTML = buildCarousel(images, bike.Nome, icon);
  const carouselEl = visualEl.querySelector('.carousel');
  if (carouselEl && images.length > 1) initCarousel(carouselEl);

  // Meta chips
  modal.querySelector('.product-modal__meta').innerHTML = `
    <span class="product-card__badge" style="position:static">${bike.Categoria}</span>
    ${bike.In_Evidenza?.toUpperCase() === 'SI' ? '<span class="chip">⭐ In evidenza</span>' : ''}
    ${bike.Marca ? `<span class="chip">${escapeHtml(bike.Marca)}</span>` : ''}
    ${bike.Anno ? `<span class="chip">📅 ${escapeHtml(bike.Anno)}</span>` : ''}`;

  modal.querySelector('.product-modal__title').textContent = bike.Nome;
  modal.querySelector('.product-modal__price').textContent = bike.Prezzo || 'Prezzo su richiesta';
  modal.querySelector('.product-modal__desc').textContent = bike.Descrizione_Completa || bike.Descrizione_Breve || '';

  // Taglie
  const sizesEl = modal.querySelector('.product-modal__sizes');
  const sizes = bike.Taglia ? bike.Taglia.split(',').map(s => s.trim()).filter(Boolean) : [];
  if (sizes.length) {
    sizesEl.removeAttribute('hidden');
    sizesEl.innerHTML = `
      <h4>Taglie disponibili</h4>
      <div class="size-chips-list">
        ${sizes.map(s => `<span class="size-chip size-chip--lg">${s}</span>`).join('')}
      </div>`;
  } else {
    sizesEl.hidden = true;
  }

  // Info chips (Anno + Colore)
  const infoEl = modal.querySelector('.product-modal__info-chips');
  const infoChips = [];
  if (bike.Colore) {
    bike.Colore.split('|').forEach(c => {
      infoChips.push(`<span class="info-chip">🎨 ${escapeHtml(c.trim())}</span>`);
    });
  }
  if (infoChips.length) {
    infoEl.removeAttribute('hidden');
    infoEl.innerHTML = `<div class="info-chips-list">${infoChips.join('')}</div>`;
  } else {
    infoEl.hidden = true;
  }

  // Caratteristiche
  const featEl = modal.querySelector('.product-modal__features');
  featEl.innerHTML = features.length ? `
    <h4>Caratteristiche principali</h4>
    <div class="feature-tags-list">
      ${features.map(f => `
        <span class="feature-tag">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          ${escapeHtml(f)}
        </span>`).join('')}
    </div>` : '';

  // Note
  const noteEl = modal.querySelector('.product-modal__note');
  noteEl.hidden = !bike.Note;
  if (bike.Note) noteEl.textContent = `📌 ${bike.Note}`;

  const waTarget = window.VAIFB?.WA_Vendite || window.VAIFB?.WA_Officina || CONFIG.WA_NUMBER;
  const telTarget = (window.VAIFB?.Tel_Vendite || window.VAIFB?.Tel_Officina || CONFIG.WA_NUMBER).replace(/\s/g, '');
  
  modal.querySelector('.modal-wa-btn').href = `https://wa.me/${waTarget}?text=${waText}`;
  modal.querySelector('.modal-call-btn').href = `tel:${telTarget.startsWith('+') ? telTarget : '+' + telTarget}`;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  modal.querySelector('.product-modal__close')?.focus();
}

function closeModal() {
  if (!modal) return;
  const carouselEl = modal.querySelector('.carousel');
  if (carouselEl?._keyHandler) document.removeEventListener('keydown', carouselEl._keyHandler);
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

/* ─── EVENT LISTENERS ─────────────────────────────────────── */
modal?.querySelector('.product-modal__close')?.addEventListener('click', closeModal);
modal?.querySelector('.product-modal__backdrop')?.addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

sortSelect?.addEventListener('change', e => {
  activeSort = e.target.value;
  render();
});

// Ricerca con debounce
let searchTimer = null;
searchInput?.addEventListener('input', e => {
  clearTimeout(searchTimer);
  searchQuery = e.target.value;
  searchClear && (searchClear.hidden = !searchQuery);
  searchTimer = setTimeout(render, 220);
});

searchClear?.addEventListener('click', () => {
  if (searchInput) searchInput.value = '';
  searchQuery = '';
  searchClear.hidden = true;
  searchInput?.focus();
  render();
});

/* ─── AVVIO ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', loadBikes);
