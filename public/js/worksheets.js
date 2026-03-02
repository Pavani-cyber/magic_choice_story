const stories = [
{
  title:"Monkey Magic Jungle",
  cover:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772028109/monkey1_eizvhp.jpg",
  short:[
    "Why did Milo climb the tall tree?",
    "What gave Milo super jumping powers?",
    "Who did Milo help?",
  ],
  mcq:[
    {q:"Where does Milo live?", a:["City","Jungle","Ocean"], c:1},
    {q:"What did Milo find?", a:["Magic fruit","Treasure","Boat"], c:0}
  ],
  blanks:["Milo is a ______.","The forest was ______."]
},

{
  title:"Pirate Treasure Hunt",
  cover:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772029225/pri1_loyxny.jpg",
  short:[
    "Where did the map lead Leo?",
    "What was inside the chest?",
    "What danger did they escape?"
  ],
  mcq:[
    {q:"Leo is a:", a:["Pilot","Pirate","Doctor"], c:1},
    {q:"They traveled by:", a:["Ship","Car","Plane"], c:0}
  ],
  blanks:["The crew found a ______ chest.","Gold ______ sparkled."]
},

{
  title:"Ocean Explorer",
  cover:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772071133/oc1_bqzxwr.jpg",
  short:[
    "What animals did you see first?",
    "What did you discover underwater?",
    "Did you explore the cave?"
  ],
  mcq:[
    {q:"Where is the story set?", a:["Forest","Ocean","Space"], c:1},
    {q:"You found:", a:["Pearls","Fire","Books"], c:0}
  ],
  blanks:["Colorful ______ swam by.","A sea ______ hid treasure."]
},

{
  title:"Space Star Adventure",
  cover:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772072019/sp1_scv65g.jpg",
  short:[
    "Why did Arjun launch the rocket?",
    "What happened on the Moon?",
    "Who did he meet?"
  ],
  mcq:[
    {q:"He traveled in a:", a:["Boat","Rocket","Car"], c:1},
    {q:"Aliens were:", a:["Scary","Friendly","Invisible"], c:1}
  ],
  blanks:["The rocket went to ______.","He got a star ______."]
},

{
  title:"Dinosaur Valley",
  cover:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772073235/di1_exrrea.jpg",
  short:[
    "How did you reach the valley?",
    "Which dinosaur appeared?",
    "What did you discover?"
  ],
  mcq:[
    {q:"Dinosaurs are:", a:["Future animals","Ancient animals","Robots"], c:1},
    {q:"You saw:", a:["Eggs","Cars","Snow"], c:0}
  ],
  blanks:["A big ______ appeared.","The nest had ______."]
},

{
  title:"Magic Tree Secret",
  cover:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772073898/tr1_npvutw.jpg",
  short:[
    "What was special about the tree?",
    "What did you find inside?",
    "Why protect forests?"
  ],
  mcq:[
    {q:"The tree could:", a:["Talk","Swim","Drive"], c:0},
    {q:"Inside were:", a:["Books","Cars","Coins"], c:0}
  ],
  blanks:["The tree was ______.","Fireflies gave ______."]
},

{
  title:"Robot City Rescue",
  cover:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772074537/rb1_ycfr7m.jpg",
  short:[
    "Why did the city stop?",
    "Which robot asked for help?",
    "What did you fix?"
  ],
  mcq:[
    {q:"The place is:", a:["Farm","Robot city","Jungle"], c:1},
    {q:"You repaired:", a:["Wires","Books","Trees"], c:0}
  ],
  blanks:["The city lights ______.","Robots said ______."]
},

{
  title:"Flying Kite Dream",
  cover:"https://res.cloudinary.com/detq8ltdi/image/upload/v1772075196/kt1_uzmk3e.jpg",
  short:[
    "Where did you find the kite?",
    "What did you see from the sky?",
    "How did the ride end?"
  ],
  mcq:[
    {q:"The kite helped you:", a:["Fly","Swim","Dig"], c:0},
    {q:"The sky was:", a:["Green","Colorful","Dark"], c:1}
  ],
  blanks:["The kite flew ______.","The sunset was ______."]
}
];

const grid = document.getElementById("storyGrid");

stories.forEach((s,i)=>{
  grid.innerHTML += `
    <div class="card">
      <img src="${s.cover}">
      <h3>${s.title}</h3>
      <button onclick="generateWorksheet(${i})">Worksheet</button>
    </div>
  `;
});

function generateWorksheet(i){
  const s = stories[i];
  const sheet = document.getElementById("worksheetSheet");

  const shortHTML = s.short.map(q=>`
    <p>${q}</p>
    <div class="line"></div>
    <div class="line"></div>
  `).join("");

  const mcqHTML = s.mcq.map(m=>`
    <p>${m.q}</p>
    ${m.a.map(a=>`☐ ${a}<br>`).join("")}
  `).join("");

  const blankHTML = s.blanks.map(b=>`
    <p>${b}</p>
  `).join("");

  sheet.innerHTML = `
    <h1>${s.title} Worksheet</h1>
    <p>Name: __________ Date: __________</p>

    <h3>Section A – Answer the questions</h3>
    ${shortHTML}

    <h3>Section B – Multiple Choice</h3>
    ${mcqHTML}

    <h3>Section C – Fill in the blanks</h3>
    ${blankHTML}

    <h3>Section D – Draw your favorite scene</h3>
    <div style="height:200px;border:2px dashed #aaa;"></div>
  `;

  document.getElementById("previewModal").classList.remove("hidden");
}

function closePreview(){
  document.getElementById("previewModal").classList.add("hidden");
}

function downloadWorksheetPDF(){
  const sheet = document.getElementById('worksheetSheet');
  if(!sheet) return alert('No worksheet to download');

  const titleEl = sheet.querySelector('h1');
  const title = titleEl ? titleEl.textContent.replace(/\s+/g,'_') : 'worksheet';

  const opt = {
    margin:       0.4,
    filename:     `${title}.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2, useCORS: true },
    jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  // Use html2pdf (included via CDN in the HTML) to generate and save the PDF
  try{
    html2pdf().set(opt).from(sheet).save();
  }catch(e){
    console.error('PDF generation failed', e);
    alert('Unable to generate PDF. Open the preview and try Print instead.');
  }
}

stories.forEach(s=>{
  s.quiz = [
    {q:"This story is about?", a:["Forest","Main character","Space"], c:1},
    {q:"Where does it happen?", a:["Ocean","Story place","Moon"], c:1},
    {q:"Is the hero brave?", a:["Yes","No"], c:0},
    {q:"Did the hero solve a problem?", a:["Yes","No"], c:0},
    {q:"Was the ending happy?", a:["Yes","No"], c:0}
  ];
});


let currentQuiz = [];
let currentStoryTitle = "";



function startQuiz(){
  const s = stories.find(x => x.title === document.querySelector(".sheet h1").innerText.replace(" Worksheet",""));

  currentQuiz = s.quiz;
  currentStoryTitle = s.title;

  const sheet = document.getElementById("worksheetSheet");

  sheet.innerHTML = `
    <div class="quiz-box">
      <h2>${s.title} Quiz</h2>
      <div id="quizQuestions"></div>
      <button onclick="submitQuiz()">Submit Quiz</button>
      <div id="scoreBox"></div>
    </div>
  `;

  const container = document.getElementById("quizQuestions");

  currentQuiz.forEach((q,i)=>{
    container.innerHTML += `
      <div class="quiz-q">
        <p>${i+1}. ${q.q}</p>
        ${q.a.map((opt,j)=>`
          <label>
            <input type="radio" name="q${i}" value="${j}">
            ${opt}
          </label>
        `).join("")}
      </div>
    `;
  });
}


//score

function submitQuiz(){
  let score = 0;

  currentQuiz.forEach((q,i)=>{
    const ans = document.querySelector(`input[name="q${i}"]:checked`);
    if(ans && parseInt(ans.value) === q.c) score++;
  });

  const percent = Math.round((score/currentQuiz.length)*100);

  document.getElementById("scoreBox").innerHTML =
    `<div class="score-text">Score: ${percent}%</div>`;

  window.lastScore = percent;
}



function downloadCertificate(){

  if(window.lastScore == null){
    alert("Please complete the quiz first!");
    return;
  }

  const name = prompt("Enter student name:");
  if(!name) return;

  let type = "";

  if(window.lastScore >= 80){
    type = "Completion Certificate";
  } else if(window.lastScore >= 50){
    type = "Participation Certificate";
  } else {
    alert("Score below 50. Try again!");
    return;
  }

  const cert = document.createElement("div");
  cert.className = "certificate";

  cert.innerHTML = `
    <h1>${type}</h1>
    <p>This is proudly awarded to</p>
    <div class="name">${name}</div>
    <p>for completing</p>
    <h2>${currentStoryTitle}</h2>
    <p>Score: ${window.lastScore}%</p>
    <p>Date: ${new Date().toLocaleDateString()}</p>
  `;

  document.body.appendChild(cert);

  window.print();

  setTimeout(()=> cert.remove(), 1000);
}