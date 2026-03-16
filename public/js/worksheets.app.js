import stories from './worksheets.data.js';

let currentIndex = null;
let lastScore = null;

const grid = document.getElementById("storyGrid");
const sheet = document.getElementById("worksheetSheet");
const previewModal = document.getElementById("previewModal");

renderGrid();


/* ==========================
   STORY GRID
========================== */

function renderGrid(){

  grid.innerHTML="";

  stories.forEach((story,i)=>{

    const card=document.createElement("div");
    card.className="card";

    const img=document.createElement("img");
    img.src=story.cover;

    const title=document.createElement("h3");
    title.textContent=story.title;

    const btn=document.createElement("button");
    btn.className="ws-btn";
    btn.textContent="📄 Worksheet";

    btn.onclick=()=>openWorksheet(i);

    card.append(img,title,btn);

    grid.appendChild(card);

  });

}


/* ==========================
   OPEN WORKSHEET
========================== */

function openWorksheet(i){

  currentIndex=i;

  generateWorksheet();

  previewModal.classList.remove("hidden");

}


/* ==========================
   GENERATE WORKSHEET
========================== */

function generateWorksheet(){

  const s=stories[currentIndex];

  const shortHTML=s.short.map(q=>`
      <p>${q}</p>
      <div class="line"></div>
      <div class="line"></div>
  `).join("");

  const mcqHTML=s.mcq.map(m=>`
      <p>${m.q}</p>
      ${m.a.map(a=>`☐ ${a}<br>`).join("")}
  `).join("");

  const blankHTML=s.blanks.map(b=>`
      <p>${b}</p>
  `).join("");

  sheet.innerHTML=`

    <h1>${s.title} Worksheet</h1>

    <p>
      Name: ____________   
      Date: ____________
    </p>

    <h3>Section A – Answer</h3>
    ${shortHTML}

    <h3>Section B – MCQ</h3>
    ${mcqHTML}

    <h3>Section C – Fill Blanks</h3>
    ${blankHTML}

    <h3>Draw Your Favorite Scene</h3>
    <div class="draw-box"></div>

    <div class="actions">

      <button onclick="printWorksheet()">Print</button>

      <button onclick="downloadWorksheet()">Download PDF</button>

      <button onclick="startQuiz()">Take Quiz</button>

      <button onclick="closePreview()">Close</button>

    </div>

  `;

}


/* ==========================
   PRINT WORKSHEET
========================== */

window.printWorksheet=function(){

  window.print();

}


/* ==========================
   DOWNLOAD WORKSHEET
========================== */

window.downloadWorksheet=function(){

  const opt={
    margin:0,
    filename:"worksheet.pdf",
    image:{type:"jpeg",quality:0.98},
    html2canvas:{scale:3},
    jsPDF:{unit:"mm",format:"a4"}
  };

  html2pdf().set(opt).from(sheet).save();

}


/* ==========================
   CLOSE PREVIEW
========================== */

window.closePreview=function(){

  previewModal.classList.add("hidden");

}


/* ==========================
   START QUIZ
========================== */

window.startQuiz=function(){

  const s=stories[currentIndex];

  sheet.innerHTML=`

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

  const container=document.getElementById("quizQuestions");

  s.quiz.forEach((q,i)=>{

    const html=`

      <div class="quiz-q">

        <p>${i+1}. ${q.q}</p>

        ${q.a.map((opt,j)=>`

          <label>
            <input type="radio" name="q${i}" value="${j}">
            ${opt}
          </label><br>

        `).join("")}

      </div>

    `;

    container.innerHTML+=html;

  });

}


/* ==========================
   SUBMIT QUIZ
========================== */

window.submitQuiz=function(){

  const s=stories[currentIndex];

  let score=0;

  s.quiz.forEach((q,i)=>{

    const ans=document.querySelector(`input[name="q${i}"]:checked`);

    if(ans && Number(ans.value)===q.c) score++;

  });

  lastScore=Math.round((score/s.quiz.length)*100);

  document.getElementById("scoreBox").innerHTML=
  `<h3>Your Score : ${lastScore}%</h3>`;

  if(lastScore>=50){

    askStudentName();

  }else{

    alert("You need 50% to get certificate");

  }

}


/* ==========================
   ASK STUDENT NAME
========================== */

function askStudentName(){

  const name=prompt("Enter Student Name for Certificate:");

  if(!name) return;

  generateCertificate(name);

}


/* ==========================
   GENERATE CERTIFICATE
========================== */

function generateCertificate(name){

  const holder=document.createElement("div");
  holder.className="cert-holder";

  const cert=document.createElement("div");
  cert.className="ppt-cert";

  cert.innerHTML=`

    <div class="cert-title">
      MAGIC CHOICE STORIES
    </div>

    <div class="cert-body">

      <h2>Certificate of Completion</h2>

      <p>This certificate is proudly presented to</p>

      <div class="cert-name">${name}</div>

      <p>For completing</p>

      <h3>${stories[currentIndex].title}</h3>

      <p>Score : ${lastScore}%</p>

    </div>

  `;

  const controls=document.createElement("div");
  controls.className="cert-controls";


  const printBtn=document.createElement("button");
  printBtn.innerText="Print";
  printBtn.onclick=()=>window.print();


  const downloadBtn=document.createElement("button");
  downloadBtn.innerText="Download PDF";

  downloadBtn.onclick=()=>{

    const opt={
      margin:0,
      filename:"certificate.pdf",
      image:{type:"jpeg",quality:0.98},
      html2canvas:{scale:3},
      jsPDF:{unit:"mm",format:"a4",orientation:"landscape"}
    };

    html2pdf().set(opt).from(cert).save();

  };


  const closeBtn=document.createElement("button");
  closeBtn.innerText="Close";
  closeBtn.onclick=()=>holder.remove();


  controls.append(printBtn,downloadBtn,closeBtn);

  holder.append(cert,controls);

  document.body.appendChild(holder);

}