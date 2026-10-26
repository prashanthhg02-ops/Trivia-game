const questions = [
  {
    category: "science",
    question: "What is the chemical symbol for gold?",
    answers: ["Go", "Gd", "Au", "Ag"],
    correct: 2
  },
  {
    category: "science",
    question: "Which planet has the most moons currently known?",
    answers: ["Jupiter", "Saturn", "Neptune", "Uranus"],
    correct: 1
  },
  {
    category: "science",
    question: "What is the largest organ in the human body?",
    answers: ["The liver", "The brain", "The lungs", "The skin"],
    correct: 3
  },
  {
    category: "science",
    question: "What is the closest star to Earth, other than the Sun?",
    answers: ["Sirius", "Proxima Centauri", "Betelgeuse", "Vega"],
    correct: 1
  },
  {
    category: "science",
    question: "Which gas do plants absorb from the atmosphere?",
    answers: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
    correct: 2
  },
  {
    category: "history",
    question: "The ancient city of Petra is located in which country?",
    answers: ["Egypt", "Jordan", "Greece", "Turkey"],
    correct: 1
  },
  {
    category: "history",
    question: "In which year did the first Moon landing take place?",
    answers: ["1965", "1967", "1969", "1971"],
    correct: 2
  },
  {
    category: "history",
    question: "Which civilization built Machu Picchu?",
    answers: ["Maya", "Aztec", "Roman", "Inca"],
    correct: 3
  },
  {
    category: "history",
    question: "Who was the first woman to win a Nobel Prize?",
    answers: ["Ada Lovelace", "Marie Curie", "Jane Addams", "Rosalind Franklin"],
    correct: 1
  },
  {
    category: "history",
    question: "Which ancient wonder stood in Alexandria, Egypt?",
    answers: ["The Colossus of Rhodes", "The Lighthouse of Alexandria", "The Hanging Gardens", "The Temple of Artemis"],
    correct: 1
  },
  {
    category: "pop culture",
    question: "What is the name of the coffee shop in the TV show Friends?",
    answers: ["Central Perk", "Monk's Café", "MacLaren's Pub", "The Peach Pit"],
    correct: 0
  },
  {
    category: "pop culture",
    question: "Which artist released the album 1989?",
    answers: ["Adele", "Beyoncé", "Taylor Swift", "Katy Perry"],
    correct: 2
  },
  {
    category: "pop culture",
    question: "What is the name of the kingdom in Disney's Frozen?",
    answers: ["Corona", "Arendelle", "Agrabah", "Genovia"],
    correct: 1
  },
  {
    category: "pop culture",
    question: "Which fictional detective lives at 221B Baker Street?",
    answers: ["Hercule Poirot", "Nancy Drew", "Sherlock Holmes", "Miss Marple"],
    correct: 2
  },
  {
    category: "pop culture",
    question: "In the Pokémon series, what type is Pikachu?",
    answers: ["Fire", "Electric", "Water", "Psychic"],
    correct: 1
  },
  {
    category: "geography",
    question: "What is the capital city of New Zealand?",
    answers: ["Auckland", "Christchurch", "Wellington", "Queenstown"],
    correct: 2
  },
  {
    category: "geography",
    question: "Which is the world's largest ocean?",
    answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correct: 3
  },
  {
    category: "geography",
    question: "The city of Marrakech is in which country?",
    answers: ["Tunisia", "Morocco", "Algeria", "Egypt"],
    correct: 1
  },
  {
    category: "geography",
    question: "Which river flows through the city of Paris?",
    answers: ["The Thames", "The Danube", "The Seine", "The Rhine"],
    correct: 2
  },
  {
    category: "geography",
    question: "Which country is home to the ancient city of Angkor Wat?",
    answers: ["Thailand", "Vietnam", "Cambodia", "Laos"],
    correct: 2
  },
  {
    category: "nature",
    question: "What is the only mammal capable of true flight?",
    answers: ["Flying squirrel", "Sugar glider", "Bat", "Colugo"],
    correct: 2
  },
  {
    category: "nature",
    question: "How many hearts does an octopus have?",
    answers: ["One", "Two", "Three", "Four"],
    correct: 2
  },
  {
    category: "nature",
    question: "What is the fastest land animal?",
    answers: ["Lion", "Cheetah", "Pronghorn", "Ostrich"],
    correct: 1
  },
  {
    category: "nature",
    question: "Which tree produces acorns?",
    answers: ["Maple", "Birch", "Oak", "Ash"],
    correct: 2
  },
  {
    category: "nature",
    question: "What is the name for a group of flamingos?",
    answers: ["A charm", "A flamboyance", "A parliament", "A murmuration"],
    correct: 1
  }
];

const ROUND_SIZE = 5;
const QUESTION_TIME = 15;
const categoryNames = {
  mixed: "Mixed bag",
  science: "Science",
  history: "History",
  "pop culture": "Pop culture",
  geography: "Geography",
  nature: "Nature"
};

const welcomeScreen = document.querySelector("#welcome-screen");
const gameScreen = document.querySelector("#game-screen");
const resultsScreen = document.querySelector("#results-screen");
const startButton = document.querySelector("#start-button");
const quitButton = document.querySelector("#quit-button");
const replayButton = document.querySelector("#replay-button");
const homeButton = document.querySelector("#home-button");
const answersContainer = document.querySelector("#answers");
const questionText = document.querySelector("#question-text");
const categoryTag = document.querySelector("#category-tag");
const timer = document.querySelector("#timer");
const timerValue = document.querySelector("#timer-value");
const scoreDisplay = document.querySelector("#score-display");
const roundLabel = document.querySelector("#round-label");
const progressFill = document.querySelector("#progress-fill");
const progressTrack = document.querySelector(".progress-track");
const feedback = document.querySelector("#feedback");
const nextButton = document.querySelector("#next-button");

let selectedCategory = "mixed";
let roundQuestions = [];
let currentQuestion = 0;
let score = 0;
let correctAnswers = 0;
let secondsLeft = QUESTION_TIME;
let timerId;
let answered = false;

document.querySelectorAll(".category-option").forEach((button) => {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.category;
    document.querySelectorAll(".category-option").forEach((option) => {
      const isSelected = option === button;
      option.classList.toggle("selected", isSelected);
      option.setAttribute("aria-pressed", String(isSelected));
    });
  });
});

startButton.addEventListener("click", startGame);
replayButton.addEventListener("click", startGame);
homeButton.addEventListener("click", showHome);
quitButton.addEventListener("click", showHome);
nextButton.addEventListener("click", advanceQuestion);

function shuffle(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  return shuffled;
}

function startGame() {
  const availableQuestions = selectedCategory === "mixed"
    ? questions
    : questions.filter((item) => item.category === selectedCategory);
  roundQuestions = shuffle(availableQuestions).slice(0, ROUND_SIZE);
  currentQuestion = 0;
  score = 0;
  correctAnswers = 0;
  scoreDisplay.textContent = "0";
  showScreen(gameScreen);
  renderQuestion();
}

function renderQuestion() {
  clearInterval(timerId);
  answered = false;
  secondsLeft = QUESTION_TIME;
  const item = roundQuestions[currentQuestion];
  const questionNumber = currentQuestion + 1;

  roundLabel.innerHTML = `QUESTION ${questionNumber} <span>OF ${roundQuestions.length}</span>`;
  progressFill.style.width = `${(questionNumber / roundQuestions.length) * 100}%`;
  progressTrack.setAttribute("aria-valuemax", String(roundQuestions.length));
  progressTrack.setAttribute("aria-valuenow", String(questionNumber));
  categoryTag.textContent = item.category.toUpperCase();
  questionText.textContent = item.question;
  timerValue.textContent = String(secondsLeft);
  timer.classList.remove("urgent");
  feedback.textContent = "";
  feedback.classList.remove("incorrect");
  nextButton.classList.add("hidden");

  answersContainer.replaceChildren();
  item.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.dataset.index = String(index);
    button.innerHTML = `<span class="answer-letter">${String.fromCharCode(65 + index)}</span><span></span>`;
    button.querySelector("span:last-child").textContent = answer;
    button.addEventListener("click", () => chooseAnswer(index));
    answersContainer.append(button);
  });

  timerId = window.setInterval(() => {
    secondsLeft -= 1;
    timerValue.textContent = String(secondsLeft);
    if (secondsLeft <= 5) timer.classList.add("urgent");
    if (secondsLeft <= 0) finishQuestion(null);
  }, 1000);
}

function chooseAnswer(answerIndex) {
  if (answered) return;
  finishQuestion(answerIndex);
}

function finishQuestion(answerIndex) {
  if (answered) return;
  answered = true;
  clearInterval(timerId);

  const item = roundQuestions[currentQuestion];
  const answerButtons = answersContainer.querySelectorAll(".answer-button");
  answerButtons.forEach((button) => {
    const index = Number(button.dataset.index);
    button.disabled = true;
    if (index === item.correct) button.classList.add("correct");
    if (index === answerIndex && answerIndex !== item.correct) button.classList.add("incorrect");
  });

  if (answerIndex === item.correct) {
    correctAnswers += 1;
    score += 10 + secondsLeft;
    scoreDisplay.textContent = String(score);
    feedback.textContent = secondsLeft > 0 ? "That’s right! Nice one. ✨" : "That’s right! Good save. ✨";
    feedback.classList.remove("incorrect");
  } else {
    feedback.textContent = answerIndex === null
      ? `Time’s up! The answer was ${item.answers[item.correct]}.`
      : `Not quite! The answer was ${item.answers[item.correct]}.`;
    feedback.classList.add("incorrect");
  }

  nextButton.textContent = currentQuestion === roundQuestions.length - 1 ? "See my results" : "Next question";
  nextButton.classList.remove("hidden");
  nextButton.focus();
}

function advanceQuestion() {
  if (currentQuestion < roundQuestions.length - 1) {
    currentQuestion += 1;
    renderQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  clearInterval(timerId);
  const totalCorrect = correctAnswers;
  const messages = [
    "Every great brain has to start somewhere. Fancy another round?",
    "A lovely little brain workout. You’re just getting warmed up!",
    "Not bad at all! Your trivia instincts are looking sharp.",
    "Brilliant work! Your brain was really on a roll.",
    "Absolutely outstanding. Is there anything you don’t know?"
  ];
  const messageIndex = totalCorrect === 0 ? 0 : totalCorrect < 2 ? 1 : totalCorrect < 4 ? 2 : totalCorrect < 5 ? 3 : 4;

  document.querySelector("#results-title").textContent = totalCorrect === 5 ? "Look at you, go!" : totalCorrect >= 3 ? "Nicely done!" : "Round complete!";
  document.querySelector("#results-message").textContent = messages[messageIndex];
  document.querySelector("#final-score").textContent = String(totalCorrect);
  document.querySelector("#result-points").textContent = String(score);
  document.querySelector("#result-category").textContent = categoryNames[selectedCategory];
  document.querySelector("#results-badge").textContent = totalCorrect >= 4 ? "🏆" : totalCorrect >= 2 ? "🌟" : "💪";
  showScreen(resultsScreen);
}

function showHome() {
  clearInterval(timerId);
  showScreen(welcomeScreen);
}

function showScreen(activeScreen) {
  [welcomeScreen, gameScreen, resultsScreen].forEach((screen) => {
    screen.classList.toggle("hidden", screen !== activeScreen);
  });
}
