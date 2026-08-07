/* ════════════════════════════════════════════════════════════
   VAI FERRO BIKE — chi-siamo.js
   Legge il tab "ChiSiamo" del Google Sheet e popola
   dinamicamente i contenuti della pagina chi-siamo.html
   ════════════════════════════════════════════════════════════

   SETUP nel Google Sheet:
   1. Aggiungi un foglio chiamato "ChiSiamo" nello stesso file
   2. Prima riga: intestazioni →  Chiave  |  Valore
   3. Compila le righe:

      Chiave              | Valore
      ─────────────────────────────────────────────────────────
      Titolo_Hero         | Un negozio vero.
      Sottotitolo_Hero    | Dal 2015 a Cavezzo vendiamo bici...
      Testo_Chi_Siamo     | Testo del paragrafo principale...
      Testo_Missione      | La nostra filosofia è semplice...
      Nome_Titolare       | Marco Rossi
      Ruolo_Titolare      | Titolare e meccanico
      Bio_Titolare        | Testo breve sul titolare...
      Foto_Titolare       | https://drive.google.com/file/d/... (link Drive)
      Foto_Negozio        | https://drive.google.com/file/d/... (link Drive)
      Foto_Officina       | https://drive.google.com/file/d/... (link Drive)
      Anno_Fondazione     | 2015
      Valore_1            | Consulenza vera
      Valore_2            | Officina rapida
      Valore_3            | Prezzi onesti
      Valore_4            | Persone reali

   4. Clicca sul tab "ChiSiamo" in basso su Google Sheets
   5. Guarda l'indirizzo (URL) in alto e copia il numero dopo "gid="
   6. Incollalo in GID_CHI_SIAMO qui sotto.
*/

const CS_SHEET_ID = (() => {
  if (typeof IMPOSTAZIONI_SHEET_ID !== 'undefined') return IMPOSTAZIONI_SHEET_ID;
  return '1egFO7xMvKZLGTcVI_OjDq5Fjf2DgAmgFQlYHBxshmoI'; // ← ID del tuo file
})();

const GID_CHI_SIAMO = '2057253982'; // ← INCOLLA QUI IL GID DEL TAB CHISIAMO

/* ─── HELPER ──────────────────────────────────────────────────── */
function csEsc(str) {
  return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function csDriveUrl(url) {
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

function csParseLine(line) {
  const result = []; let cur = '', inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') { if (inQ && line[i + 1] === '"') { cur += '"'; i++; } else { inQ = !inQ; } }
    else if (ch === ',' && !inQ) { result.push(cur); cur = ''; }
    else { cur += ch; }
  }
  result.push(cur); return result;
}

/* ─── FETCH & PARSE ───────────────────────────────────────────── */
async function loadChiSiamo() {
  if (!CS_SHEET_ID || CS_SHEET_ID === 'YOUR_SHEET_ID_HERE') return;
  try {
    const url = `https://docs.google.com/spreadsheets/d/${CS_SHEET_ID}/export?format=csv&gid=${GID_CHI_SIAMO}`;
    const res = await fetch(url);
    if (!res.ok) return; // Foglio non trovato o non configurato: pagina resta statica
    const buffer = await res.arrayBuffer();
    const text = new TextDecoder('utf-8').decode(buffer);
    const lines = text.replace(/^\uFEFF/, '').trim().split('\n');
    const data = {};
    lines.slice(1).forEach(line => {
      const cols = csParseLine(line);
      const key = (cols[0] || '').trim();
      const value = (cols[1] || '').trim();
      if (key && value) data[key] = value;
    });
    renderChiSiamo(data);
  } catch (e) {
    console.warn('[VAIFB] ChiSiamo non caricato:', e.message);
    // Pagina resta con contenuto statico, nessun errore visibile
  }
}

/* ─── RENDER ──────────────────────────────────────────────────── */
function renderChiSiamo(d) {
  /* Hero: titolo e testo */
  setEl('cs-titolo-hero', d.Titolo_Hero);
  setEl('cs-sottotitolo', d.Sottotitolo_Hero);

  /* Sezione "Chi siamo" - testo principale */
  setEl('cs-testo-chi-siamo', d.Testo_Chi_Siamo);
  setEl('cs-testo-missione', d.Testo_Missione);

  /* Anno fondazione */
  if (d.Anno_Fondazione) {
    const annoEl = document.getElementById('cs-anno-fondazione');
    if (annoEl) {
      const anni = new Date().getFullYear() - parseInt(d.Anno_Fondazione);
      annoEl.textContent = `Dal ${d.Anno_Fondazione} — ${anni} anni di esperienza a Cavezzo`;
    }
  }

  /* Foto negozio */
  if (d.Foto_Negozio) {
    renderPhoto('cs-foto-negozio', csDriveUrl(d.Foto_Negozio), 'Interno negozio VAI FERRO BIKE');
  }
  if (d.Foto_Officina) {
    renderPhoto('cs-foto-officina', csDriveUrl(d.Foto_Officina), 'Officina VAI FERRO BIKE');
  }

  /* Scheda titolare */
  const titoEl = document.getElementById('cs-titolare');
  if (titoEl && (d.Nome_Titolare || d.Foto_Titolare)) {
    titoEl.hidden = false;
    if (d.Foto_Titolare) {
      renderPhoto('cs-foto-titolare', csDriveUrl(d.Foto_Titolare), d.Nome_Titolare || 'Il titolare');
    }
    setEl('cs-nome-titolare', d.Nome_Titolare);
    setEl('cs-ruolo-titolare', d.Ruolo_Titolare);
    setEl('cs-bio-titolare', d.Bio_Titolare);
  }

  /* Valori del negozio (fino a 4) */
  const valori = [d.Valore_1, d.Valore_2, d.Valore_3, d.Valore_4].filter(Boolean);
  if (valori.length) {
    const valoriEl = document.getElementById('cs-valori-list');
    if (valoriEl) {
      valoriEl.innerHTML = valori.map(v => `
        <div class="why-item">
          <div class="why-badge">✓</div>
          <div><strong>${csEsc(v)}</strong></div>
        </div>`).join('');
    }
  }
}

function setEl(id, value) {
  if (!value) return;
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function renderPhoto(containerId, src, alt) {
  const el = document.getElementById(containerId);
  if (!el || !src) return;
  el.innerHTML = `<img src="${src}" alt="${csEsc(alt)}" loading="lazy"
    style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius-lg)"
    onerror="this.parentElement.style.display='none'">`;
  el.style.display = 'block';
}

/* ─── AVVIO ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', loadChiSiamo);
