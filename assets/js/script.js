var containerDiv = document.querySelector(".container");
var startButton = document.querySelector("#start-btn");
var nextButton = document.querySelector("#next-btn");
var restartButton = document.querySelector("#restart");
var questionContainerEl = document.querySelector("#question-container");
var questionEl = document.querySelector("#question");
var answerButtonsEl = document.querySelector("#answer-buttons");
var scoreDivEl = document.querySelector("#score");
var scoreEl = document.querySelector(".score-number");
var highScoreEl = document.querySelector(".high-score");
var textHighScore = document.querySelector(".text-high-score");
var submitBtn = document.querySelector(".a1");
var timerEl = document.querySelector(".timer");
var userEl = document.querySelector(".user");
var backToStartLink = document.getElementById('back-to-start-link');
var viewHighScoresLink = document.getElementById('high-scores-link');

var shuffledQuestions;
var currentQuestionIndex;
var questionTimer;

var score = 0;

var seconds = 120; 

function countdown() {
    questionTimer = setInterval(function() {
        seconds--;
        timerEl.textContent = `Time left: ${seconds} s`;
        if(seconds <= 1) {
            timerEl.textContent = "Time left: 0";
            console.log("Time's up");
            clearInterval(questionTimer);
            containerDiv.classList.add("hide");
            restartButton.classList.remove("hide");
            scoreDivEl.classList.remove("hide");
            textHighScore.classList.remove("hide");
            scoreEl.innerText = score;
            HighScore();
        }
    }, 1000);
}


function startGame() {
    containerDiv.classList.remove("hide");
    restartButton.classList.add("hide");
    scoreDivEl.classList.add("hide");
    startButton.classList.add("hide");
    textHighScore.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    score = 0;
    seconds = 120;
    questionContainerEl.classList.remove("hide");
    countdown();
    setNextQuestion();
    HighScore();
}

function nextQuestionBtn() {
    currentQuestionIndex++;
    setNextQuestion();
}
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}
function showQuestion(q) {
    questionEl.innerText = q.question;
    q.answer.forEach(answer => {
        var button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsEl.appendChild(button);
    });
}
function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add("hide");
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild);
    }
}

function selectAnswer(e) {
    var selectedBtn = e.target;
    var correct = selectedBtn.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    });
    if (correct) {
        score++;
    } else if (correct != true) {
        timerEl.innerText = `Time left: ${seconds} -15 second`
        seconds -= 15;
    }
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide");
    } else {
        containerDiv.classList.add("hide");
        restartButton.classList.remove("hide");
        scoreDivEl.classList.remove("hide");
        textHighScore.classList.remove("hide");
        scoreEl.innerText = score;
        seconds = 0;
    }

}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}
function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}

function postQuiz() {
    localStorage.setItem("user", highScoreEl.value);
    localStorage.setItem("score", score);
    console.log(highScoreEl.value, score);
    alert("score submit!");
}

function HighScore() {
    document.querySelector("#user").innerHTML = localStorage.getItem("user") + "/" + localStorage.getItem("score");
    console.log(userEl);
}

restartButton.addEventListener("click", startGame);
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", nextQuestionBtn);
submitBtn.addEventListener("click", postQuiz);

var questions = [
    {
        question: "Which method would you use to find an ID element?",
        answer: [
            {text: "getElementbyId()", correct: true},
            {text: "getElementsById()", correct: false},
            {text: "getElementByID()", correct: false},
            {text: "getElementsById()", correct: false}
        ]
    },
    {
        question: "To see if two variables are equal in an if / else statement you would use ____.",
        answer: [
            {text: "'equals'", correct: false},
            {text: "!=", correct: false},
            {text: "=", correct: false},
            {text: "==", correct: true},
        ]
    },
    {
        question: "The appendChild() method places a node as the ____ child.",
        answer: [
            {text: "first", correct: false},
            {text: "last place you left off", correct: false},
            {text: "last", correct: true},
            {text: "random", correct: false}
        ]
    },
    {
        question: "Math.random() returns ____.",
        answer: [
            {text: "a number between 1 and 9", correct: false},
            {text: "a number between 0 and 99", correct: false},
            {text: "a number between 0 and 1", correct: true},
            {text: "a number between 0 and 9", correct: false}
        ]
    },
    {
        question: "The first index of an array is ____.",
        answer: [
            {text: "0", correct: true},
            {text: "1", correct: false},
            {text: "5", correct: false},
            {text: "custom", correct: false}
        ]
    }
];