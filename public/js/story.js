const urlParams = new URLSearchParams(window.location.search);
const storyId = urlParams.get("id");

const bgMusic = document.getElementById("bgMusic");
const clickSound = document.getElementById("clickSound");
const yesSound = document.getElementById("yesSound");
const noSound = document.getElementById("noSound");

bgMusic.volume = 0.2;
bgMusic.play().catch(() => {}); // ignore autoplay error

let story;

const storyText = document.getElementById("storyText");
const storyImage = document.getElementById("storyImage");

const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const stopBtn = document.getElementById("stopBtn");
const speedRange = document.getElementById("speedRange");

let speech = null;
let voices = [];
let isPaused = false;
/* Load voices */
function loadVoices() {
  voices = speechSynthesis.getVoices();
}
speechSynthesis.onvoiceschanged = loadVoices;
/* Choose kid-like voice */
function getChildVoice() {
  return voices.find(v =>
    v.name.toLowerCase().includes("female") ||
    v.name.toLowerCase().includes("zira") ||
    v.name.toLowerCase().includes("google uk english female")
  );
}
/* PLAY */
function playSpeech() {
  const text = storyText.innerText;
  if (!text) return;
  // resume if paused
  if (isPaused) {
    speechSynthesis.resume();
    isPaused = false;
    return;
  }
  // stop previous
  speechSynthesis.cancel();

  speech = new SpeechSynthesisUtterance(text);

  speech.pitch = 1.8;              // child voice
  speech.rate = speedRange.value;  // slider speed
  speech.volume = 1;

  const voice = getChildVoice();
  if (voice) speech.voice = voice;

  speechSynthesis.speak(speech);
}
/* PAUSE */
function pauseSpeech() {
  speechSynthesis.pause();
  isPaused = true;
}
/* STOP */
function stopSpeech() {
  speechSynthesis.cancel();
  isPaused = false;
}
/* Speed control */
speedRange.oninput = () => {
  if (speech) speech.rate = speedRange.value;
};
/* Buttons */
playBtn.onclick = playSpeech;
pauseBtn.onclick = pauseSpeech;
stopBtn.onclick = stopSpeech;
//fetch
fetch(`/api/stories/${storyId}`)
  .then(res => res.json())
  .then(data => {
    story = data;
    document.getElementById("storyTitle").textContent = story.title;
    showPage(1);
  })
  .catch(err => console.error(err));

function changeScene(newImg, newText) {
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

function showPage(pageNumber) {

  const page = story.pages.find(p => p.pageNumber === pageNumber);
  if (!page) return;

  const questionBox = document.getElementById("questionBox");
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const returnHomeBtn = document.getElementById("returnHomeBtn");
  /* Change scene */
    stopSpeech();
  changeScene(page.image, page.text);
  /*  Auto narration */
  // setTimeout(playSpeech, 400);
  /* QUESTION PAGE */
  if (page.question) {

    questionBox.textContent = page.question;

    yesBtn.style.display = "inline-block";
    noBtn.style.display = "inline-block";
    returnHomeBtn.style.display = "none";

    yesBtn.onclick = () => {
      clickSound.play();
      yesSound.play();
      showPage(page.yesNext);
    };

    noBtn.onclick = () => {
      clickSound.play();
      noSound.play();
      showPage(page.noNext);
    };

  }

  else {

    questionBox.textContent = "The End!";

    yesBtn.style.display = "none";
    noBtn.style.display = "none";
    returnHomeBtn.style.display = "inline-block";

    returnHomeBtn.onclick = () => {
      window.location.href = "/";
    };
  }
}
