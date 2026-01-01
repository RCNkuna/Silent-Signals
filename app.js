const signals = [
  "You feel tired even after resting.",
  "You stay busy so you don’t have to slow down.",
  "Things you once enjoyed feel distant.",
  "You feel pressure even during rest.",
  "You struggle to name what’s wrong."
];

let index = 0;
let tone = 0;
let buttons = [];
let focusedIndex = 0;

const intro = document.getElementById("intro");
const card = document.getElementById("card");
const end = document.getElementById("end");
const signalText = document.getElementById("signalText");
const closingText = document.getElementById("closingText");

document.getElementById("startBtn").onclick = () => {
  intro.classList.remove("active");
  card.classList.add("active");
  showSignal();
};

function showSignal() {
  signalText.textContent = signals[index];
}

document.querySelectorAll(".choices button").forEach(btn => {
  btn.addEventListener("click", () => {
    tone += Number(btn.dataset.value);
    index++;

    updateMood();

    if (index < signals.length) {
      showSignal();
    } else {
      finish();
    }
  });
});

function updateMood() {
  document.body.style.background =
    tone > 6 ? "#020617" :
    tone > 3 ? "#020617cc" :
    "#0f172a";
}

function finish() {
  card.classList.remove("active");
  end.classList.add("active");

  closingText.textContent =
    tone > 6
      ? "You’ve been carrying more than you admit."
      : tone > 3
      ? "You still have space — protect it."
      : "Not everything needs fixing right now.";
}

function enableKeyboardNav() {
  buttons = Array.from(document.querySelectorAll(".choices button"));
  focusedIndex = 0;
  buttons[focusedIndex].focus();

  document.addEventListener("keydown", handleKeyNav);
}

function handleKeyNav(e) {
  if (!buttons.length) return;

  if (e.key === "ArrowDown") {
    focusedIndex = (focusedIndex + 1) % buttons.length;
    buttons[focusedIndex].focus();
  }

  if (e.key === "ArrowUp") {
    focusedIndex =
      (focusedIndex - 1 + buttons.length) % buttons.length;
    buttons[focusedIndex].focus();
  }

  if (e.key === "Enter") {
    buttons[focusedIndex].click();
  }
}