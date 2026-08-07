# Guida alla Gestione del Sito VAI FERRO BIKE

Tutto il tuo sito web è collegato a un **singolo Foglio Google**. Non ti serve un programmatore per cambiare i testi, i numeri di telefono, o per aggiungere bici al catalogo o alle occasioni. Fa tutto il sito in automatico!

Ecco come funziona, passo per passo.

---

## ⚙️ 1. Impostazioni Generali (Numeri di Telefono, WhatsApp, Orari)

Per modificare il numero di WhatsApp che appare ovunque sul sito (header, pulsanti, ecc.) o i tuoi numeri di cellulare, devi usare il foglio **Impostazioni**.

### Come configurarlo:
1. Nel tuo file Google Sheet principale, in basso a sinistra c'è un pulsante **"+"**. Cliccalo per aggiungere un nuovo foglio.
2. Rinomina questo nuovo foglio in `Impostazioni`.
3. Nella **prima colonna** (A) scrivi `Chiave` e nella **seconda colonna** (B) scrivi `Valore`.
4. Sotto queste intestazioni, compila le righe esattamente così:

| Chiave (scrivi questo in A) | Valore (scrivi il tuo dato reale in B) |
| :--- | :--- |
| **WA_Officina** | 393331111111 *(Numero WhatsApp per Riparazioni/Generale: senza il '+' e senza spazi!)* |
| **Tel_Officina** | +39 333 1111111 *(Il cellulare per le telefonate Riparazioni/Generale)* |
| **WA_Vendite** | 393442222222 *(Numero WhatsApp per info Vendita Bici/Usato: senza il '+' e senza spazi!)* |
| **Tel_Vendite** | +39 344 2222222 *(Il cellulare per telefonate Vendita Bici/Usato)* |
| **Indirizzo** | Via Volturno 86 |
| **Citta** | Cavezzo (MO) |
| **Orari** | Lun–Sab 08:30–12:30 / 15:30–19:30 |
| **Orari_Domenica**| Domenica chiuso |

**💡 Cosa succede quando modifichi questo foglio?**
Il sito dividerà intelligentemente le chiamate: se un utente è nella pagina Riparazioni, chiamerà il numero dell'Officina. Se è nella pagina Bici/Occasioni, il pulsante lo metterà in contatto con le Vendite. Tutto in automatico!

---

## 🚴‍♂️ 2. Il Catalogo Bici

Il foglio principale che hai già creato serve per mostrare le bici nella pagina "Le nostre bici".

### Le colonne obbligatorie:
- `Nome` (es: "Orbea Alma M50")
- `Marca` (es: "Orbea")
- `Categoria` (es: "MTB", "E-Bike", "Corsa", "City Bike", "Usato")
- `Prezzo` (es: "€ 1.500")
- `Descrizione_Breve` (Poche parole per incuriosire)
- `Immagine` (Qui ci va il link di Google Drive, vedi sotto)
- `Disponibile` (Scrivi "SI" per mostrarla sul sito, "NO" per nasconderla)

### Le nuove colonne avanzate (aggiungile al tuo foglio):
- `Taglia` (es: "M" oppure "S | M | L" per inserire più taglie)
- `Colore` (es: "Rosso | Nero")
- `Anno` (es: "2024" — ti permette di ordinare le bici dalla più recente)
- `Ordinamento` (Se scrivi `1`, la bici uscirà per prima in assoluto, utile per spingere un modello)
- `In_Evidenza` (Se scrivi "SI", spunterà una piccola icona con una stella d'oro sulla foto)

---

## ♻️ 3. Le Occasioni (L'Usato)

La pagina "Occasioni" si alimenta **da sola**. Non devi fare niente di diverso!

Se nel foglio del catalogo (spiegato al punto 2) aggiungi una bici e scrivi `Usato` nella colonna **Categoria**, quella bici comparirà automaticamente sia nel catalogo, sia nella griglia speciale della pagina Occasioni.

### Una colonna in più per l'Usato:
Aggiungi una colonna chiamata `Condizione`. Se per una bici usata scrivi uno di questi valori, uscirà una bellissima etichetta colorata sulla card:
- `Ottimo` (Verde scuro: ✦ Ottimo stato)
- `Buono` (Blu: ✦ Buono stato)
- `Usato` (Bronzo: ✦ Usato)
- `Nuovo` (Arancione: ✦ Come nuovo)

---

## 🏪 4. La pagina "Chi Siamo"

Vuoi cambiare il testo che racconta la storia del negozio? Aggiungere una foto tua o del tuo negozio senza toccare il codice?

### Come configurarlo:
1. Nel tuo file Google Sheet principale, aggiungi un terzo foglio e chiamalo `ChiSiamo`.
2. Nella **prima riga** scrivi `Chiave` (in A) e `Valore` (in B).
3. Compila le righe così:

| Chiave (A) | Valore (B) |
| :--- | :--- |
| **Titolo_Hero** | Un negozio vero. |
| **Sottotitolo_Hero**| Da VAI FERRO BIKE puoi entrare per comprare una bici... |
| **Testo_Chi_Siamo** | Siamo nati nel 2015 con l'idea di... |
| **Nome_Titolare** | Marco Rossi |
| **Ruolo_Titolare** | Titolare e meccanico |
| **Bio_Titolare** | La mia passione per le bici nasce da ragazzino... |
| **Foto_Titolare** | *(Incolla il link di Google Drive della tua foto!)* |
| **Foto_Negozio** | *(Incolla il link di Google Drive della foto del negozio!)* |
| **Anno_Fondazione** | 2015 *(Il sito calcolerà in automatico quanti anni sono)* |

Se lasci vuoto il campo "Foto_Titolare", il sito capisce da solo di non mostrare la tua foto senza rompere il design. È tutto automatico!

---

## 📸 5. Come gestire le Fotografie con Google Drive (IMPORTANTE)

Non devi pagare server strani per caricare le foto. Usiamo il tuo Google Drive. Il sito è intelligente e prende il link di condivisione normale e lo converte in un'immagine da mostrare a schermo.

**Fai così:**
1. Vai su Google Drive e crea una cartella chiamata `Sito VAI FERRO BIKE` (così tieni tutto in ordine).
2. Trascina dentro le foto delle bici o del negozio.
3. Fai **tasto destro** sulla foto → **Condividi** → **Condividi**.
4. In "Accesso generale" (in basso) cambia da "Con restrizioni" a **"Chiunque abbia il link"**. (Se non fai questo, il sito mostrerà un'immagine rotta!)
5. Clicca su **"Copia link"**.
6. Incolla quel link dentro il foglio Google (nella colonna `Immagine` del catalogo, o `Foto_Negozio` in ChiSiamo).

### Vuoi mettere PIÙ foto per una sola bici?
Il sito ha un carosello automatico. Ti basta prendere due o tre link di Google Drive e incollarli tutti nella stessa cella del foglio Excel, separandoli con una sbarra dritta `|`.
**Esempio in cella:**
`https://drive.google.com/file/d/foto1/view | https://drive.google.com/file/d/foto2/view`

---

## 🛠️ Step finale per far funzionare tutto

Siccome ho creato 3 tab (fogli) diversi, per far sì che il sito legga le informazioni di *Impostazioni* e di *ChiSiamo*, devo inserire un codice univoco chiamato "GID" nei file del sito.

Appena hai creato i 3 tab nel tuo Google Sheet:
1. Guarda l'indirizzo (URL) in alto nel tuo browser mentre sei nel foglio **Impostazioni**.
2. Alla fine dell'indirizzo c'è scritto qualcosa come `gid=123456789`.
3. Copia quel numero.
4. Apri il file `impostazioni.js` del sito con un blocco note, trova la riga `const GID_IMPOSTAZIONI = '1';` e sostituisci `1` con il tuo numero.
5. Fai la stessa cosa per il foglio **ChiSiamo**, copia il suo GID (che sarà diverso), e incollalo nel file `chi-siamo.js` alla riga `const GID_CHI_SIAMO = '2';`.

*Questo va fatto solo una volta nella vita. Dopodiché, governerai l'intero sito web direttamente da Excel!*
