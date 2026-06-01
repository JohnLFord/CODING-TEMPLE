const newQuestion = document.getElementById("newQuestion");
const nextButton = document.getElementById("next-button");
const answerButtons = document.querySelectorAll(".answer");
const resetButton = document.getElementById("restart-button");

const questions = [
  {
    question: "What is the correct syntax for adding an event listener to an element?",
    answers: [
      {
        text: 'button.addeventlistener("click", () => { });',
        correct: false
      },
      {
        text: 'button.addEventListener("click", () => { });',
        correct: true
      },
      {
        text: 'button.addEventListener("click", () => [] });',
        correct: false
      },
      {
        text: 'button.addEventListener("click", {} => () });',
        correct: false
      }
    ]
  },

  {
    question: "Which is not one of the three types of data?",
    answers: [
      {
        text: 'Booleans',
        correct: false
      },
      {
        text: 'Numbers',
        correct: false
      },
      {
        text: 'Strings',
        correct: false
      },
      {
        text: 'Arrays',
        correct: true
      }
    ]
  },
  {
    question: "Every loop has three parts, which one is not one of the three parts?",
    answers: [
      {
        text: 'A starting point',
        correct: false
      },
      {
        text: 'The condition to be met',
        correct: true
      },
      {
        text: 'An action',
        correct: false
      },
      {
        text: 'A stopping point',
        correct: false
      }
    ]
  },
  {
    question: "A FOR loop has three parts, which one is not one of those parts?",
    answers: [
      {
        text: 'initialization',
        correct: false
      },
      {
        text: 'condition',
        correct: false
      },
      {
        text: 'update',
        correct: false
      },
      {
        text: 'termination',
        correct: true
      }
    ]
  },

  {
    question: "Which answer is not a reason why Javascript functions are used?",
    answers: [
      {
        text: 'Avoid repetition',
        correct: false
      },
      {
        text: 'Make your code easier to script',
        correct: true
      },
      {
        text: 'Make your code readable',
        correct: false
      },
      {
        text: 'Make your code reusable',
        correct: false
      }
    ]
  }
];

let currentQuestionIndex = 0;
let score = 0;

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  newQuestion.textContent = currentQuestion.question;

  answerButtons.forEach((button, index) => {
    button.textContent = currentQuestion.answers[index].text;
    button.dataset.correct = currentQuestion.answers[index].correct;
    button.style.display = "block";
  });
}
function resetState() {
  nextButton.style.display = "none";
  answerButtons.forEach((button) => {
    button.disabled = false;
    button.classList.remove("true", "false");
  });
}
function selectAnswer(event) {
  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";
  if (isCorrect) {
    selectedButton.classList.add("true");
    score++;
  } else {
    selectedButton.classList.add("false");
  }
  answerButtons.forEach((button) => {
    button.disabled = true;
    if (button.dataset.correct === "true") {
      button.classList.add("true");
    }
  });
  nextButton.style.display = "block";
}

function resetQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  resetButton.style.display = "none";

  answerButtons.forEach((button) => {
    button.style.display = "block";
  });
  showQuestion();
}
answerButtons.forEach((button) => {
  button.addEventListener("click", selectAnswer);
});

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    newQuestion.textContent = "Quiz complete! Final Score: " + score + " / " + questions.length;
    answerButtons.forEach((button) => {
      button.style.display = "none";
    });
    nextButton.style.display = "none";
    resetButton.style.display = "block";
  }
});
resetButton.addEventListener("click", resetQuiz);

resetButton.style.display = "none";
showQuestion();
  
