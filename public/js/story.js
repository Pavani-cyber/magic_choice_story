//  Get story ID from URL
const urlParams = new URLSearchParams(window.location.search);
const storyId = urlParams.get("id");

//  Audio elements
const bgMusic = document.getElementById("bgMusic");
const clickSound = document.getElementById("clickSound");
const yesSound = document.getElementById("yesSound");
const noSound = document.getElementById("noSound");

// Background music
if (bgMusic) {
  bgMusic.volume = 0.2;
  bgMusic.play().catch(() => {});
}

//  DOM elements
const storyText = document.getElementById("storyText");
const storyImage = document.getElementById("storyImage");

const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const stopBtn = document.getElementById("stopBtn");
const speedRange = document.getElementById("speedRange");

let story;
let speech = null;
let voices = [];
let isPaused = false;

// ==================  SPEECH ==================

// Load voices
function loadVoices() {
  voices = speechSynthesis.getVoices();
}
speechSynthesis.onvoiceschanged = loadVoices;

// Choose child-like voice
function getChildVoice() {
  return voices.find(v =>
    v.name.toLowerCase().includes("female") ||
    v.name.toLowerCase().includes("zira")
  );
}

// Play speech
function playSpeech() {
  const text = storyText.innerText;
  if (!text) return;

  if (isPaused) {
    speechSynthesis.resume();
    isPaused = false;
    return;
  }

  speechSynthesis.cancel();

  speech = new SpeechSynthesisUtterance(text);
  speech.pitch = 1.8;
  speech.rate = speedRange?.value || 1;
  speech.volume = 1;

  const voice = getChildVoice();
  if (voice) speech.voice = voice;

  speechSynthesis.speak(speech);
}

// Pause
function pauseSpeech() {
  speechSynthesis.pause();
  isPaused = true;
}

// Stop
function stopSpeech() {
  speechSynthesis.cancel();
  isPaused = false;
}

// Speed control
if (speedRange) {
  speedRange.oninput = () => {
    if (speech) speech.rate = speedRange.value;
  };
}

// Buttons
playBtn && (playBtn.onclick = playSpeech);
pauseBtn && (pauseBtn.onclick = pauseSpeech);
stopBtn && (stopBtn.onclick = stopSpeech);

// ==================  FETCH STORY ==================

fetch(`/api/stories/${storyId}`)
  .then(res => res.json())
  .then(data => {
    story = data;
    document.getElementById("storyTitle").textContent = story.title;
    showPage(1);
  })
  .catch(err => console.error(err));

// ==================  SCENE CHANGE ==================

function changeScene(newImg, newText) {
  if (!storyImage || !storyText) return;

  storyImage.classList.add("fade-out");

  setTimeout(() => {
    storyImage.src = newImg;
    storyText.textContent = newText;

    storyImage.classList.remove("fade-out");
    storyImage.classList.add("animate");

    setTimeout(() => {
      storyImage.classList.remove("animate");
    }, 500);
  }, 300);
}

// ==================  PAGE LOGIC ==================

function showPage(pageNumber) {
  if (!story) return;

  const page = story.pages.find(p => p.pageNumber === pageNumber);
  if (!page) return;

  const questionBox = document.getElementById("questionBox");
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const returnHomeBtn = document.getElementById("returnHomeBtn");

  // Stop narration before switching
  stopSpeech();

  // Change scene
  changeScene(page.image, page.text);

  // ==================  QUESTION ==================
  if (page.question) {

    questionBox.textContent = page.question;

    yesBtn.style.display = "inline-block";
    noBtn.style.display = "inline-block";
    returnHomeBtn.style.display = "none";

    yesBtn.onclick = () => {
      clickSound?.play();
      yesSound?.play();
      showPage(page.yesNext);
    };

    noBtn.onclick = () => {
      clickSound?.play();
      noSound?.play();
      showPage(page.noNext);
    };

  }

  // ==================  END ==================
  else {

    questionBox.textContent = "The End!";

    yesBtn.style.display = "none";
    noBtn.style.display = "none";
    returnHomeBtn.style.display = "inline-block";

    //  FIXED BUTTON
    returnHomeBtn.onclick = () => {
      window.location.href = "/index.html";
    };
  }
}