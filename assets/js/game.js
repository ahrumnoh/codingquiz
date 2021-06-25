const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "Which program can software engineers push to or pull from coding with?",
        choice1: "Github",
        choice2: "Slack",
        choice3: "Visual Code",
        choice4: "Trilogy",
        answer: 1,    
    },
    {
        question: "Which program is at first used to make coding as a root?",
        choice1: "Java Script",
        choice2: "Css",
        choice3: "HTML",
        choice4: "URL",
        answer: 3,    
    },
    {
        question: "If you want to change the color of button that your cursor is pointing at, which function are you going to choose?",
        choice1: "html-H1",
        choice2: "CSS-Hover",
        choice3: "JS-getNewQuestion",
        choice4: "Html-div",
        answer: 2,    
    },
    {
        question: "What is (D.O.M) meaning?",
        choice1: "Dolphines of mountain",
        choice2: "Direct version of Metabolism",
        choice3: "Do open math.lenth",
        choice4: "Document Object Model",
        answer: 4,    
    },

]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

starGame = () => {
    questionsCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}



getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question
    

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']
    
        let classToApply = selectedAnswer == currentQuestion.answer ? 'corrent' : 
        'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})


incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()