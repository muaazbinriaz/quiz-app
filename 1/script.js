const questions = [
  {
    question: "What is the most abundant gas in the Earth's athmosphere?",
    answers: [
      { text: 'Oxygen', correct: false },
      { text: 'Carbon Dioxide', correct: false },
      { text: 'Nitrogen', correct: true },
      { text: 'Hydrogen', correct: false },
    ]
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: 'Atlantic Ocean', correct: false },
      { text: 'Indian Ocean', correct: false },
      { text: 'Arctic Ocean', correct: false },
      { text: 'Pacific Ocean', correct: true },
    ]
  },
  {
    question: "What is the hardest natural substance on Earth?",
    answers: [
      { text: 'Diamond', correct: true },
      { text: 'Gold', correct: false },
      { text: 'Iron', correct: false },
      { text: 'Quartz', correct: false },
    ]
  },
  {
    question: "What is the largest organ in the human body?",
    answers: [
      { text: 'Liver', correct: false },
      { text: 'Heart', correct: false },
      { text: 'Skin', correct: true },
      { text: 'Lungs', correct: false },
    ]
  },
  {
    question: "What is the largest planet in the solar system?",
    answers: [
      { text: 'Earth', correct: false },
      { text: 'Mars', correct: false },
      { text: 'Saturn', correct: false },
      { text: 'Jupiter', correct: true },
    ]
  },
  {
    question: "Which programming language is known as the 'language of the web'?",
    answers: [
      { text: 'Python', correct: false },
      { text: 'C++', correct: false },
      { text: 'Javascript', correct: true },
      { text: 'Java', correct: false },
    ]
  },
  {
    question: "In cybersecurity, what is a firewall?",
    answers: [
      { text: 'A device to increase internet speed', correct: false },
      { text: 'A software that blocks viruses', correct: false },
      { text: 'A network security system that monitors and controls incoming and outgoing traffic', correct: true },
      { text: 'A type of encryption', correct: false },
    ]
  }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = 'Next';
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;

  questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add('btn');
    answerButtons.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
  })
}

function resetState() {
  nextButton.style.display = 'none';
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === 'true';
  if (isCorrect) {
    selectedBtn.classList.add('correct');
    score++;
  } else {
    selectedBtn.classList.add('incorrect');
  }
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
    }
    button.disabled = true;
  });
  nextButton.style.display = 'block';
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = 'Play Again';
  nextButton.style.display = 'block';
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener('click', () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
})
startQuiz();