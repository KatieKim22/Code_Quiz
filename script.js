// variables
const startButton = document.querySelector('#start')
const nextButton = document.querySelector('.next')
const quizTimer = document.querySelector('#timer')
const quizcontainerEl = document.querySelector('.quizcontainer')
const questionText = document.querySelector('.Question')
const answerEl = document.querySelector('.answers')
const seeScore = document.querySelector('.finish')
const questionContainerEl = document.querySelector('.questionContainer')
const initialsInputEl = document.querySelector('.initialsInput')
const submittedInital = document.getElementById('initial').value;
const submitbtn = document.querySelector('.submit')
const myForm = document.getElementById('myForm')
const seeScoreboard = document.querySelector('.scoreboard')
const showInitial = document.querySelector('yourInitial')
const showScore = document.querySelector('yourScore')

let shuffledQuestions, currentQuestionIndex
// function to start timer and and question, when click the start button 


// function to start timer

startButton.addEventListener("click", gameTimer)

let timer = 50;

function gameTimer() {

    let startTimer = setInterval(function () {
        quizTimer.textContent = timer--;
        if (timer === 0) {
            // stop timer
            clearInterval(startTimer)
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
    // sort questions by random order
    shuffledQuestions = qandas.sort(() => Math.random() - 0.5)
    currentQuestionIndex = 0;
    setNextQuestion();
}



// questions and answers variables

const qandas = [
    {
        question: "which one will console log 5?",
        answers:
            [{
                text: `"One + Four";`,
                correct: false
            }, {
                text: "1 + 4;",
                correct: true
            }, {
                text: `"1" + \"4\";`,
                correct: false
            }, {
                text: `"Five";`,
                correct: false
            },

            ]
    }, {
        question: `What is name[2] in name array?
            var name = [Jane, Bob, John, Yuna]`,
        answers:
            [{
                text: "Jane",
                correct: false
            }, {
                text: "Bob",
                correct: false
            }, {
                text: "John",
                correct: true
            }, {
                text: "Yuna",
                correct: false
            },

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
        answers:
            [{
                text: "delete name;",
                correct: false
            }, {
                text: "delete myDog.name",
                correct: true
            }, {
                text: "delete \"Camper\"",
                correct: false
            }, {
                text: "delete \"name\":\"Camper\"",
                correct: false
            },

            ]
    }, {
        question: "Which one is true?",
        answers:
            [{
                text: "1 !=  2",
                correct: true
            }, {
                text: "1 != \"1\"",
                correct: false
            }, {
                text: "1 != \'1\'",
                correct: false
            }, {
                text: "1 != true ",
                correct: false
            },

            ]
    }, {
        question: "Which one will remove the first element of an array?",
        answers:
            [{
                text: ".shift()",
                correct: true
            }, {
                text: ".pop()",
                correct: false
            }, {
                text: ".push()",
                correct: false
            }, {
                text: ".unshift()",
                correct: false
            },

            ]
    }

]


// display new question.
function setNextQuestion() {
    resetQuestion()
    showQuestion(shuffledQuestions[currentQuestionIndex])
    console.log(shuffledQuestions)
}



function showQuestion() {

    questionText.innerText = shuffledQuestions[currentQuestionIndex].question;

    shuffledQuestions[currentQuestionIndex].answers.forEach(answer => {
        let button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('answer')

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer)
        answerEl.appendChild(button)
    })

}
// delete and reset previous questions
function resetQuestion() {
    clearStatus(document.body)
    nextButton.classList.add('hide')
    while (answerEl.firstChild) {
        answerEl.removeChild(answerEl.firstChild)
    }
}

//check the answers and calculate scores
answerEl.addEventListener("click", selectAnswer)

let myScore = 0;

function selectAnswer(e) {

    let selectedAnswer = e.target;
    let correct = selectedAnswer.dataset.correct;


    Array.from(answerEl.children).forEach(answerEl => {
        if (correct) {
            scoreCalculation()
        }
    })
    setStatus(document.body, correct)
    Array.from(answerEl.children).forEach(button => {
        setStatus(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        endofQuestion()
    }
}



function setStatus(element, correct) {
    clearStatus(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        // setInterval(function () { 
        //     quizTimer.textContent = timer--; }, 5000)

        element.classList.add('wrong')
    }
}

function scoreCalculation() {
    myScore += 20
}

console.log(myScore)

function clearStatus(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
}
)


function endofQuestion() {
    questionContainerEl.classList.add('hide')
    seeScore.classList.remove('hide')

}

seeScore.addEventListener("click", () => {
    seeScore.classList.add('hide')
    initialsInputEl.classList.remove('hide')
    seeScoreboard.classList.add('hide')

})

myForm.addEventListener("submit", finalScore)

function finalScore(e) {
    e.preventDefault();
    localStorage.setItem("ID", submittedInital)
    let myName = localStorage.getItem("ID");
    console.log(submittedInital);
    showInitial.innerHTML = myName;
    showScore.textContent = myScore;
}





// GIVEN I am taking a code quiz

// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and my score