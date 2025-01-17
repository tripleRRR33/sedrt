const questions = {
    cinema: [
        {
            question: "Quel est le film le plus rentable de tous les temps, ajusté pour l'inflation ?",
            options: ["Autant en emporte le vent", "Avatar", "Titanic", "Star Wars"],
            answer: "Autant en emporte le vent",
            explanation: "Bien qu'il ait été dépassé par Avatar en termes de recettes brutes, Autant en emporte le vent reste le plus rentable si l'on ajuste les recettes à l'inflation."
        },
        {
            question: "Quel film a introduit le personnage de Thanos dans l'univers cinématographique Marvel ?",
            options: ["Les Avengers", "Iron Man", "Thor", "Guardians of the Galaxy"],
            answer: "Les Avengers",
            explanation: "Bien que Thanos apparaisse brièvement dans la scène post-générique, c'est dans Avengers que le personnage commence à prendre une place importante dans l'univers cinématographique Marvel."
        }
        // Ajoutez plus de questions ici
    ],
    musique: [
        {
            question: "Quel est le groupe légendaire qui a écrit Bohemian Rhapsody ?",
            options: ["Queen", "The Beatles", "Pink Floyd", "Led Zeppelin"],
            answer: "Queen",
            explanation: "Cette chanson, écrite par Freddie Mercury, est l'une des compositions les plus célèbres et les plus originales du groupe, connue pour sa structure complexe et ses performances vocales impressionnantes."
        }
        // Ajoutez plus de questions ici
    ],
    // Ajoutez plus de catégories ici
};

let currentCategory = '';
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let answeredQuestion = false;

const categorySelect = document.getElementById('categorySelect');
const quizContainer = document.getElementById('quizContainer');
const scoreContainer = document.getElementById('scoreContainer');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const explanationElement = document.getElementById('explanation');
const nextBtn = document.getElementById('nextBtn');
const currentCategoryElement = document.getElementById('currentCategory');
const progressElement = document.getElementById('progress');

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startQuiz(category) {
    currentCategory = category;
    currentQuestions = shuffleArray([...questions[category]]);
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
    quizContainer.style.display = 'block';
    scoreContainer.style.display = 'none';
    updateProgress();
}

function showQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    currentCategoryElement.textContent = categorySelect.options[categorySelect.selectedIndex].text;
    questionElement.textContent = question.question;
    optionsElement.innerHTML = '';
    explanationElement.style.display = 'none';
    nextBtn.style.display = 'none';
    answeredQuestion = false;

    question.options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => selectAnswer(option);
        optionsElement.appendChild(button);
    });
}

function selectAnswer(selectedOption) {
    if (answeredQuestion) return;
    answeredQuestion = true;

    const question = currentQuestions[currentQuestionIndex];
    const buttons = optionsElement.getElementsByClassName('option-btn');

    Array.from(buttons).forEach(button => {
        button.classList.add('disabled');
        if (button.textContent === question.answer) {
            button.classList.add('correct');
        } else if (button.textContent === selectedOption) {
            button.classList.add('incorrect');
        }
    });

    if (selectedOption === question.answer) {
        score++;
    }

    explanationElement.textContent = question.explanation;
    explanationElement.style.display = 'block';
    nextBtn.style.display = 'block';
}

function updateProgress() {
    progressElement.textContent = `Question ${currentQuestionIndex + 1} sur ${currentQuestions.length}`;
}

function showScore() {
    quizContainer.style.display = 'none';
    scoreContainer.style.display = 'block';
    const scoreElement = document.getElementById('score');
    const percentage = (score / currentQuestions.length) * 100;
    scoreElement.textContent = `Score: ${score}/${currentQuestions.length} (${percentage}%)`;
}

categorySelect.onchange = (e) => {
    if (e.target.value) {
        startQuiz(e.target.value);
    }
};

nextBtn.onclick = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
        showQuestion();
        updateProgress();
    } else {
        showScore();
    }
};

document.getElementById('restartBtn').onclick = () => {
    categorySelect.value = '';
    quizContainer.style.display = 'none';
    scoreContainer.style.display = 'none';
};
