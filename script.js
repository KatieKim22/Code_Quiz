// variables
const viewScore = document.getElementById('scoreboard')
const startButton = document.querySelector('#start')
const nextButton = document.querySelector('.next')
const quizTimer = document.querySelector('#timer')
const quizcontainerEl = document.querySelector('.quizcontainer')
const questionText = document.querySelector('.Question')
const answerEl = document.querySelector('.answers')
const seeScore = document.querySelector('.finish')
const questionContainerEl = document.querySelector('.questionContainer')
const initialsInputEl = document.querySelector('.initialsInput')
let submittedInital = document.getElementById('initial').value;
const submitbtn = document.querySelector('.submit')
const myForm = document.getElementById('myForm')
const seeScoreboard = document.querySelector('.scoreboard')
let showInitial = document.querySelector('.yourInitial')
let showScore = document.querySelector('.highScores')
let myScore = document.querySelector('.yourScore')
const reset_btn = document.querySelector('.reset')
const seeHighScore = document.querySelector('#highScoreboard')
let getId = document.querySelector('.myScore1')

let shuffledQuestions, currentQuestionIndex
// function to start timer and and question, when click the start button 


// function to start timer

startButton.addEventListener("click", gameTimer)

let timer = 50;

function gameTimer() {

    let startTimer = setInterval(function () {
        quizTimer.textContent = timer--;
        if (timer < 0) {
            // stop timer
            clearInterval(startTimer)
            quizTimer.textContent = "0"
            // notify function to alert"Game Over"
            endofQuestion()

        }
    }, 1000)
}



// click start, then hide start button, show quizcontainer, setting next question

startButton.addEventListener("click", startQuiz)

function startQuiz() {

    startButton.classList.add('hide')
    quizcontainerEl.classList.remove('hide')
    seeScore.classList.add('hide')
    initialsInputEl.classList.add('hide')
    showScore.classList.add('hide')

    // sort questions by random order

    shuffledQuestions = qandas.sort(() => Math.random() - 0.5)

    currentQuestionIndex = 0;
    setNextQuestion();

    console.log(shuffledQuestions)
}



// questions and answers variables

const qandas = [
    {
        question: "which one will console log 5?",
        answer: "1 + 4;",
        options:
            [
                `"One + Four";`,
                "1 + 4;",
                `"1" + \"4\";`,
                `"Five";`,
            ]
    }, {
        question: `What is name[2] in name array?
            var name = [Jane, Bob, John, Yuna]`,
        answer: "John",
        options:
            [
                "Jane",
                "Bob",
                "John",
                "Yuna",
            ]
    }, {
        question: `Which one will delete name property in the object below?
            var myDog = { 
                name: "Camper",
                legs: 4,
                tails: 1,
                friends: ["everything!"],
                bark: "bow-wow"
                    };`,
        answer: "delete myDog.name",
        options:
            [
                "delete name;",
                "delete myDog.name",
                "delete \"Camper\"",
                "delete \"name\":\"Camper\"",
            ]
    }, {
        question: "Which one is true?",
        answer: "1 !=  2",
        options:
            [
                "1 !=  2",
                "1 != \"1\"",
                "1 != \'1\'",
                "1 != true ",
            ]
    }, {
        question: "Which one will remove the first element of an array?",
        answer: ".shift()",
        options:
            [
                ".shift()",
                ".pop()",
                ".push()",
                ".unshift()",
            ]
    }

]


// display new question.
function setNextQuestion() {
    resetQuestion()
    showQuestion(shuffledQuestions[currentQuestionIndex])

}


// show new question
function showQuestion() {

    let questionTag = shuffledQuestions[currentQuestionIndex].question;
    let answerTag =
        '<button class="answer">' + shuffledQuestions[currentQuestionIndex].options[0] + '<span></span></div>'
        + '<button class="answer">' + shuffledQuestions[currentQuestionIndex].options[1] + '<span></span></div>'
        + '<button class="answer">' + shuffledQuestions[currentQuestionIndex].options[2] + '<span></span></div>'
        + '<button class="answer">' + shuffledQuestions[currentQuestionIndex].options[3] + '<span></span></div>'

    questionText.innerHTML = questionTag;
    answerEl.innerHTML = answerTag

    answerEl.addEventListener('click', selectAnswer)

}

// delete and reset previous questions
function resetQuestion() {
    clearStatus(document.body)
    nextButton.classList.add('hide')
    while (answerEl.firstChild) {
        answerEl.removeChild(answerEl.firstChild)
    }
}

let __score = 0;

//check the answers and calculate scores
answerEl.addEventListener("click", selectAnswer)

function selectAnswer(e) {

    let selectedAnswer = e.target.textContent;

    console.log(selectedAnswer)

    let correct = qandas[currentQuestionIndex].answer;

    if (selectedAnswer == correct) {
        __score += 20;
        document.body.style.backgroundColor = "green"
        console.log("correct!")
    } else {
        __score += 0;
        timer -= 5;
        document.body.style.backgroundColor = "red"
        console.log("wrong")
    }

    console.log(__score)

    // setStatus(document.body, correct)

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        endofQuestion()
    }
}


// clear previous status 
function clearStatus(element) {
    element.style.backgroundColor = 'white';
}

// to show next button
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
}
)

// when all 5 questions answered
function endofQuestion() {
    clearStatus(document.body)
    questionContainerEl.classList.add('hide')
    seeScore.classList.remove('hide')
    // clearInterval(startTimer)
}

//To see score 
seeScore.addEventListener("click", () => {
    seeScore.classList.add('hide')
    initialsInputEl.classList.remove('hide')
    seeScoreboard.classList.add('hide')

})

// submit initial to see score
myForm.addEventListener("submit", finalScore)

function finalScore(e) {
    e.preventDefault();
    submittedInital = document.getElementById('initial').value;
    localStorage.setItem("score", __score)
    localStorage.setItem("ID", JSON.stringify(submittedInital))
    let myName = localStorage.getItem('ID')
    console.log(submittedInital);
    showInitial.innerHTML = myName;
    myScore.textContent = __score;
    seeScoreboard.classList.remove('hide')
    myForm.classList.add('hide')
    reset_btn.classList.remove('hide')
}

// resetting the quiz
reset_btn.addEventListener("click", resettingQuiz)

function resettingQuiz() {
    window.location.reload()

}

// view score
seeHighScore.addEventListener("click", showboard)

function showboard() {
    showScore.classList.remove('hide')
    quizcontainerEl.classList.add('hide')

    let myId = JSON.parse(localStorage.getItem("ID"));
    let recordedScore = JSON.parse(localStorage.getItem("score"));

    getId.textContent = myId + " " + recordedScore

    console.log(getId)

}

