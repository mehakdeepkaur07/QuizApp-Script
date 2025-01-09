const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true},
            { text: "High Text Markup Language", correct: false},
            { text: "Hyperlink and Text Markup Language", correct: false},
            { text: "Hyper Text Markup Link", correct: false}
        ]
    },
    {
        question: "Which of the following is used to style a web page?",
        answers: [
            { text: "HTML", correct: false},
            { text: "CSS", correct: true},
            { text: "JavaScript", correct: false},
            { text: "PHP", correct: false}
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Creative Style Sheets", correct: false},
            { text: "Cascading Style Sheets", correct: true},
            { text: "Colorful Style Sheets", correct: false},
            { text: "Computer Style Sheets", correct: false}
        ]
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        answers: [
            { text: "`&lt;link&gt;`", correct: false},
            { text: "`&lt;a&gt;`", correct: true},
            { text: "`&lt;href&gt;`", correct: false},
            { text: "`&lt;url&gt;`", correct: false}
        ]
    },
    {
        question: "What is the purpose of the &lt;head&gt; tag in HTML?",
        answers: [
            { text: "To define the main content of the page", correct: false},
            { text: "To create a footer for the page", correct: false},
            { text: "To include metadata and links to stylesheets and scripts", correct: true},
            { text: "To display images", correct: false}
        ]
    },
    {
        question: "Which of the following is a JavaScript framework?",
        answers: [
            { text: "Django", correct: false},
            { text: "React", correct: true},
            { text: "Ruby on Rails", correct: false},
            { text: "Laravel", correct: false}
        ]
    },
    {
        question: "What does the console.log() function do in JavaScript?",
        answers: [
            { text: "Displays an alert box", correct: false},
            { text: "Logs information to the web console", correct: true},
            { text: "Writes to a file", correct: false},
            { text: "Sends data to a server", correct: false}
        ]
    },
    {
        question: "Which of the following is a valid CSS selector?",
        answers: [
            { text: "#header", correct: false},
            { text: ".className", correct: false},
            { text: "element", correct: false},
            { text: "All of the above", correct: true}
        ]
    },
    {
        question: "What is the purpose of the &lt;form&gt; tag in HTML?",
        answers: [
            { text: "To collect user input", correct: true},
            { text: "To create a table", correct: false},
            { text: "To display images", correct: false},
            { text: "To create a list", correct: false}
        ]
    },
    {
        question: "Which of the following is a backend programming language?",
        answers: [
            { text: "HTML", correct: false},
            { text: "CSS", correct: false},
            { text: "PHP", correct: true},
            { text: "JavaScript", correct: false}
        ]
    },
];

const questionElement   = document.getElementById("question");
const answerButtons     = document.getElementById("answer-buttons");
const nextButton        = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz()
{
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion()
{
    resetState();
    let currentQuestion         = questions[currentQuestionIndex];
    let questionNo              = currentQuestionIndex + 1;
    questionElement.innerHTML   = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button        = document.createElement("button");
        button.innerHTML    = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if(answer.correct)
        {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState()
{
    nextButton.style.display = "none";
    while(answerButtons.firstChild)
    {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e)
{
    const selectedBtn   = e.target;
    const isCorrect     = selectedBtn.dataset.correct === "true";
    if(isCorrect)
    {
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true")
        {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore()
{
    resetState();
    questionElement.innerHTML   = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML        = "Play Again";
    nextButton.style.display    = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length)
    {
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length)
    {
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz();
