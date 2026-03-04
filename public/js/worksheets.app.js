import stories from './worksheets.data.js';

let currentIndex = null;
let lastScore = null;

const grid = document.getElementById('storyGrid');
const sheet = document.getElementById('worksheetSheet');
const previewModal = document.getElementById('previewModal');

renderGrid();

function renderGrid() {
  grid.innerHTML = '';

  stories.forEach((story, i) => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <img src="${story.cover}">
      <h3>${story.title}</h3>

      <div class="card-actions">
        <button class="ws-btn" onclick="showWorksheetOptions(${i})">
          Worksheet
        </button>

        <button class="ws-btn" onclick="generateWorksheet(${i}); startQuiz()">
          Take Quiz
        </button>
      </div>
    `;

    grid.appendChild(card);
  });
}

function showWorksheetOptions(i) {
  currentIndex = i;
  generateWorksheet(i);
}

function generateWorksheet(i) {
  currentIndex = i;

  const s = stories[i];

  const shortHTML = s.short.map(q => `
    <p>${q}</p>
    <div class="line"></div>
    <div class="line"></div>
  `).join('');

  const mcqHTML = s.mcq.map(m => `
    <p>${m.q}</p>
    ${m.a.map(a => `☐ ${a}<br>`).join('')}
  `).join('');

  const blankHTML = s.blanks.map(b => `<p>${b}</p>`).join('');

  sheet.innerHTML = `
    <h1>${s.title} Worksheet</h1>

    <p>
      Name: <input id="studentName" placeholder="Student name">
      Date: __________
    </p>

    <h3>Section A – Answer the questions</h3>
    ${shortHTML}

    <h3>Section B – Multiple Choice</h3>
    ${mcqHTML}

    <h3>Section C – Fill in the blanks</h3>
    ${blankHTML}

    <h3>Draw your favorite scene</h3>
    <div class="draw-box"></div>

    <div class="actions">
      <button onclick="window.print()">🖨️ Print</button>
      <button onclick="downloadWorksheetPDF()">⬇️ Download</button>
      <button id="takeQuizBtn" onclick="startQuiz()">📝 Take Quiz</button>
      <button id="showCertBtn" onclick="showCertificateOption()" style="display:none;">🎖️ Show Certificate</button>
      <button onclick="closePreview()">✕ Close</button>
    </div>
  `;

  previewModal.classList.remove('hidden');
}

function handlePrint() {
  window.print();
}

function handleDownload() {
  downloadWorksheetPDF();
}

function handleTakeQuiz() {
  startQuiz();
}

function showCertificateOption() {
  if (lastScore !== null && lastScore >= 50) {
    askStudentName(name => {
      openCertificate(name);
    });
  } else {
    showAlert('Take and pass the quiz first (50%+) to get a certificate');
  }
}

function downloadWorksheetPDF() {
  html2pdf().from(sheet).save();
}

function closePreview() {
  previewModal.classList.add('hidden');
  // restore any hidden action buttons when closing preview
  if (previewModal){
    previewModal.querySelectorAll('.actions').forEach(a=> a.style.display = 'flex');
    previewModal.querySelectorAll('#worksheetSheet .actions').forEach(a=> a.style.display = 'flex');
  }
  // restore take quiz button visibility in worksheet if present
  const takeBtnEl = document.getElementById('takeQuizBtn');
  if (takeBtnEl){ takeBtnEl.style.display = 'inline-block'; }
  // restore certificate controls
  document.querySelectorAll('.cert-controls').forEach(c=> c.style.display='flex');
}

function startQuiz() {
  if (currentIndex == null) return alert('Open worksheet first');

  const s = stories[currentIndex];
  lastScore = null;

  // remove any existing certificate modal while quiz is active
  document.querySelectorAll('.cert-holder').forEach(el=>el.remove());
  // hide / disable the show-certificate button if present
  const showBtnEl = document.getElementById('showCertBtn');
  if (showBtnEl){ showBtnEl.style.display = 'none'; showBtnEl.disabled = true; }
  // hide take quiz button in the sheet actions while quiz active
  const takeBtnEl = document.getElementById('takeQuizBtn');
  if (takeBtnEl){ takeBtnEl.style.display = 'none'; }

  // hide any action buttons inside the preview modal to avoid non-working defaults
  if (previewModal){
    previewModal.querySelectorAll('.actions').forEach(a=> a.style.display = 'none');
    // also hide any worksheet action buttons inside sheet
    previewModal.querySelectorAll('#worksheetSheet .actions').forEach(a => a.style.display = 'none');
  }

  // hide any certificate controls that might appear while quiz is active
  document.querySelectorAll('.cert-controls').forEach(c=> c.style.display='none');

  sheet.innerHTML = `
    <div class="quiz-box">
      <h2>${s.title} Quiz</h2>
      <div id="quizQuestions"></div>

      <div class="actions">
        <button onclick="submitQuiz()">Submit Quiz</button>
        <button onclick="closePreview()">Close</button>
      </div>

      <div id="scoreBox"></div>
    </div>
  `;

  const container = document.getElementById('quizQuestions');

  s.quiz.forEach((q, i) => {
    container.innerHTML += `
      <div class="quiz-q">
        <p>${i + 1}. ${q.q}</p>
        ${q.a.map((opt, j) =>
          `<label><input type="radio" name="q${i}" value="${j}"> ${opt}</label>`
        ).join('')}
      </div>
    `;
  });
}


function submitQuiz() {
  const s = stories[currentIndex];

  let score = 0;

  s.quiz.forEach((q, i) => {
    const ans = document.querySelector(`input[name="q${i}"]:checked`);
    if (ans && parseInt(ans.value) === q.c) score++;
  });

  lastScore = Math.round((score / s.quiz.length) * 100);

  document.getElementById('scoreBox').innerHTML =
    `<h3>Score: ${lastScore}%</h3>`;

  if (lastScore >= 50) {
    // ask for name, but do not open certificate immediately
    askStudentName(name => {
      // enable the Show Certificate button below the worksheet
      const showBtn = document.getElementById('showCertBtn');
      if (showBtn){
        showBtn.style.display = 'inline-block';
        showBtn.disabled = false;
        showBtn.onclick = () => openCertificate(name);
      } else {
        // fallback: directly open if button not found
        openCertificate(name);
      }
    });
  } else {
    alert('Score 50% or more to receive certificate');
  }
}

function askStudentName(callback) {

  const modal = document.createElement('div');
  modal.className = 'styled-alert-modal';

  modal.innerHTML = `
    <div class="styled-alert-box">
      <div class="message">Enter student name for the certificate</div>
      <input id="certNameInput" class="styled-input" placeholder="Student name">
      <div class="styled-actions">
        <button id="okBtn" class="styled-btn primary">Get Certificate</button>
        <button id="cancelBtn" class="styled-btn ghost">Cancel</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById('okBtn').onclick = () => {
    const name = document.getElementById('certNameInput').value.trim();
    if (!name) return;
    document.body.removeChild(modal);
    callback(name);
  };

  document.getElementById('cancelBtn').onclick = () => document.body.removeChild(modal);
}

function openCertificate(name) {

  const type =
    lastScore >= 80
      ? 'Completion Certificate'
      : 'Participation Certificate';

  const holder = document.createElement('div');
  holder.className = 'cert-holder';

  const cert = document.createElement('div');
  cert.className = 'ppt-cert';

  cert.innerHTML = `
    <div class="cert-border"></div>

    <svg class="teddy" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g fill="#f59e0b">
        <circle cx="40" cy="60" r="30" />
        <circle cx="160" cy="60" r="30" />
        <circle cx="100" cy="120" r="60" />
      </g>
    </svg>

    <h1 class="cert-title">MAGIC CHOICE STORIES</h1>
    <h2 class="cert-type">${type}</h2>

    <p class="cert-text">This certificate is proudly awarded to</p>

    <div class="cert-name">${name}</div>

    <p class="cert-text">for successfully completing the story</p>

    <h3 class="story-name">${stories[currentIndex].title}</h3>

    <p class="score">Score : ${lastScore}%</p>

    <div class="founder">Founder — Pavani Pagadala</div>
  `;

  const controls = document.createElement('div');
  controls.className = 'cert-controls';

  const printBtn = document.createElement('button');
  printBtn.innerText = 'Print';
  printBtn.className = 'cert-btn print';
  printBtn.onclick = () => {
    const w = window.open('', '_blank');
    const cssLink = '<link rel="stylesheet" href="css/worksheet.css">';
    const fontLink = '<link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap" rel="stylesheet">';
    const printStyle = `<style>@page{size:A4;margin:0}html,body{height:100%}body{margin:0;padding:0;display:flex;align-items:center;justify-content:center;background:transparent} .ppt-cert{width:8.27in;height:11.69in;margin:0;overflow:visible !important}</style>`;
    w.document.write('<html><head><title>Certificate - '+name+'</title>'+cssLink+fontLink+printStyle+'</head><body>' + cert.outerHTML + '</body></html>');
    w.document.close();
    w.onload = () => setTimeout(()=> w.print(), 200);
  };

  const downloadBtn = document.createElement('button');
  downloadBtn.innerText = 'Download PDF';
  downloadBtn.className = 'cert-btn download';
  downloadBtn.onclick = async () => {
    // clone cert and render full A4 size
    const clone = cert.cloneNode(true);
    const pxW = Math.round(8.27 * 96); // 8.27in width at 96dpi (~795px)
    const pxH = Math.round(11.69 * 96); // 11.69in height (~1122px)
    clone.style.width = pxW + 'px';
    clone.style.height = pxH + 'px';
    clone.style.maxWidth = pxW + 'px';
    clone.style.maxHeight = pxH + 'px';
    clone.style.overflow = 'visible';
    const tmp = document.createElement('div');
    tmp.style.position = 'fixed'; tmp.style.left = '-9999px'; tmp.style.top = '0'; tmp.style.width = pxW + 'px'; tmp.style.height = pxH + 'px'; tmp.appendChild(clone);
    document.body.appendChild(tmp);
    try{
      if (document.fonts && document.fonts.ready) await document.fonts.ready;
      // wait for images inside clone
      const imgs = clone.querySelectorAll('img');
      await Promise.all(Array.from(imgs).map(img => new Promise(res => { if (img.complete) res(); else { img.onload = img.onerror = res; } })));

      // Prefer direct html2canvas for higher control
      const html2canvasFn = (window.html2canvas && typeof window.html2canvas === 'function') ? window.html2canvas : (typeof html2canvas === 'function' ? html2canvas : null);
      if (!html2canvasFn && typeof html2pdf === 'function') {
        // fallback to html2pdf internal rendering
        await html2pdf().set({ margin:0, filename:`${name}_certificate_A4.pdf`, image:{type:'jpeg',quality:0.98}, html2canvas:{scale:3,useCORS:true}, jsPDF:{unit:'in',format:'a4',orientation:'portrait'} }).from(clone).save();
        return;
      }

      // target high-res A4 at 300dpi for clarity
      const targetPxW = Math.round(8.27 * 300); // ~2481
      const scale = Math.max(2, targetPxW / pxW);
      const canvas = await html2canvasFn(clone, { scale: scale, useCORS: true, backgroundColor: null });
      const imgData = canvas.toDataURL('image/jpeg', 0.95);

      const jsPDFctor = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF ? window.jsPDF : null);
      if (jsPDFctor) {
        const pdf = new jsPDFctor({ unit:'in', format:'a4', orientation:'portrait' });
        pdf.addImage(imgData, 'JPEG', 0, 0, 8.27, 11.69);
        pdf.save(`${name}_certificate_A4.pdf`);
      } else if (typeof html2pdf === 'function') {
        await html2pdf().set({ margin:0, filename:`${name}_certificate_A4.pdf`, image:{type:'jpeg',quality:0.98}, html2canvas:{scale:Math.round(scale),useCORS:true}, jsPDF:{unit:'in',format:'a4',orientation:'portrait'} }).from(clone).save();
      } else {
        throw new Error('No PDF generator available');
      }
    }catch(e){ console.error('Download failed', e); showAlert('Download failed. Try Print.'); }
    finally{ if(document.body.contains(tmp)) document.body.removeChild(tmp); }
  };

  const closeBtn = document.createElement('button');
  closeBtn.className = 'cert-btn close';
  closeBtn.innerText = 'Close';
  closeBtn.onclick = () => document.body.removeChild(holder);

  controls.append(printBtn, downloadBtn, closeBtn);

  holder.append(cert, controls);
  document.body.appendChild(holder);
}

function showAlert(message){
  const modal = document.createElement('div');
  modal.className = 'styled-alert-modal';
  modal.innerHTML = `
    <div class="styled-alert-box">
      <div class="message">${message}</div>
      <div style="margin-top:12px"><button id="saOk" class="styled-btn primary">OK</button></div>
    </div>
  `;
  document.body.appendChild(modal);
  document.getElementById('saOk').onclick = ()=> document.body.removeChild(modal);
}

window.generateWorksheet = generateWorksheet;
window.startQuiz = startQuiz;
window.submitQuiz = submitQuiz;
window.closePreview = closePreview;
window.downloadWorksheetPDF = downloadWorksheetPDF;
window.showWorksheetOptions = showWorksheetOptions;
window.showCertificateOption = showCertificateOption;
window.openCertificate = openCertificate;
window.showAlert = showAlert;
window.askStudentName = askStudentName;