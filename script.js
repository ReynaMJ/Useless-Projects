// --- Coconut type probabilities ---
const coconutTypes = {
  ordinary: { perfect: 0.5, imperfect: 0.3, bounce: 0.15, coin: 0.05 },
  golden: { perfect: 1.0 },
  frozen: { bounce: 0.95, perfect: 0.05 },
  cracked: { perfect: 0.95, bounce: 0.05 },
  overripe: { bounce: 0.85, perfect: 0.15 },
  rotten: { bounce: 1.0 },
  soap: { fake: 1.0 },
  pinata: { chocolate: 1.0 },
};

// --- DOM Elements ---
const coconutTypeLine = document.getElementById("coconut-type");
const blessingForm = document.getElementById("blessing-form");
const blessingInput = document.getElementById("blessing-input");
const coconutImage = document.getElementById("coconut-image");
const coconutSection = document.getElementById("coconut-section");
const coconutName = document.getElementById("coconut-name");
const resultText = document.getElementById("result");
const resetBtn = document.getElementById("reset-btn");
const coconutVideo = document.getElementById("coconut-video");
const coconutVideoSource = coconutVideo.querySelector("source");

let currentCoconutType = "";

// --- Form Submit: Generate Coconut ---
blessingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const types = Object.keys(coconutTypes);
  const randomType = types[Math.floor(Math.random() * types.length)];
  currentCoconutType = randomType;

  coconutImage.src = `images/${randomType}.png`;
  coconutImage.alt = `${randomType} coconut`;

  coconutSection.classList.remove("hidden");
  resultText.textContent = "Click the coconut to break it!";
  resetBtn.classList.add("hidden");

  coconutImage.classList.remove("hidden");
  coconutVideo.classList.add("hidden");
});

// --- Coconut Click: Break It ---
coconutImage.addEventListener("click", () => {
  if (!currentCoconutType) return;

  coconutImage.classList.add("hidden");

  const result = rollCoconut(currentCoconutType);
  showResult(result);
});

// --- Reset Button ---
resetBtn.addEventListener("click", () => {
  coconutSection.classList.add("hidden");
  resultText.textContent = "";
  currentCoconutType = "";
  blessingInput.value = "";
  resetBtn.classList.add("hidden");

  coconutImage.classList.remove("hidden");
  coconutVideo.classList.add("hidden");
  coconutTypeLine.classList.add("hidden");
});

// --- Coconut Outcome Logic ---
function rollCoconut(type) {
  const outcomes = coconutTypes[type];
  const rand = Math.random();
  let cumulative = 0;

  for (const outcome in outcomes) {
    cumulative += outcomes[outcome];
    if (rand <= cumulative) return outcome;
  }

  return "bounce";
}

// --- Show Result: Video, Sound, Text ---
function showResult(outcome) {
  const videoPath = `images/after/${currentCoconutType}_${outcome}.mp4`;

  // Set video source and play
  coconutVideoSource.src = videoPath;
  coconutVideo.load();
  coconutVideo.classList.remove("hidden");
  coconutVideo.play();

  coconutVideo.onended = () => {
  coconutTypeLine.textContent = `That was a ${currentCoconutType} coconut!`;
  coconutTypeLine.classList.remove("hidden");
};

  // Set result message
  resultText.textContent = getResultMessage(outcome);

  // Play corresponding sound
  const soundMap = {
    perfect: "crack.mp3",
    imperfect: "crack.mp3",
    bounce: "fail.mp3",
    coin: "coin.mp3",
    chocolate: "chocolate.mp3",
    fake: "thunk.mp3"
  };

  if (soundMap[outcome]) {
    playSound(soundMap[outcome]);
  }

  resetBtn.classList.remove("hidden");
}

// --- Audio Helper ---
function playSound(filename) {
  const audio = new Audio(`sounds/${filename}`);
  audio.play().catch((err) => {
    console.warn("Audio play blocked or failed:", err);
  });
}

// --- Result Message Helper ---
function getResultMessage(result) {
  switch (result) {
    case "perfect":
      return "Perfect break! The stars smile on your goal.";
    case "imperfect":
      return "It cracked! A little luck is better than none.";
    case "bounce":
      return "It bounced off. Try again when the stars align.";
    case "coin":
      return "It cracked and revealed a lucky coin!";
    case "chocolate":
      return "It cracked and gave chocolate!";
    case "fake":
      return "It was just soap. A fake coconut!";
    default:
      return "Nothing happened.";
  }
}

// --- Random Coconut Fact ---
const coconutFacts = [
  "Coconuts are actually seeds, not nuts!",
  "Coconut water was used as emergency IV fluid during WWII.",
  "The word 'coconut' comes from the Portuguese 'coco', meaning head or skull.",
  "Coconuts can float across oceans to grow on distant shores.",
  "In the Philippines, coconuts are called the 'Tree of Life'.",
  "A coconut tree can live up to 80 years.",
  "Coconut oil is naturally antibacterial and antifungal!",
  "Monkeys are trained in some countries to harvest coconuts!"
];

function displayRandomFact() {
  const randomIndex = Math.floor(Math.random() * coconutFacts.length);
  const factElement = document.getElementById('coconut-fact');
  factElement.textContent = coconutFacts[randomIndex];
}

window.onload = displayRandomFact;
