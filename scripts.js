document.addEventListener('DOMContentLoaded', function () {
    fetch('all_categories_questions.json')
        .then(response => response.json())
        .then(data => {
            for (const category in data) {
                if (data.hasOwnProperty(category)) {
                    questions = questions.concat(data[category]);
                }
            }
            initializeQuiz();
        })
        .catch(error => console.error('Error loading questions:', error));

    let currentQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let answeredQuestion = false;

    const quizContainer = document.getElementById('quizContainer');
    const scoreContainer = document.getElementById('scoreContainer');
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const explanationElement = document.getElementById('explanation');
    const nextBtn = document.getElementById('nextBtn');
    const progressElement = document.getElementById('progress');

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function initializeQuiz() {
        document.getElementById('startBtn').onclick = () => {
            startQuiz();
        };
    }

    function startQuiz() {
        currentQuestions = shuffleArray([...questions]).slice(0, 10);
        currentQuestionIndex = 0;
        score = 0;
        quizContainer.style.display = 'block';
        scoreContainer.style.display = 'none';
        document.getElementById('startContainer').style.display = 'none';
        showQuestion();
        updateProgress();
    }

    function showQuestion() {
        const question = currentQuestions[currentQuestionIndex];
        questionElement.textContent = question.question;
        optionsElement.innerHTML = '';
        explanationElement.style.display = 'none';
        nextBtn.style.display = 'none';
        // Ajoutez le code pour afficher les options ici
    }

    function updateProgress() {
        progressElement.textContent = `Question ${currentQuestionIndex + 1} sur ${currentQuestions.length}`;
    }

    function showScore() {
        quizContainer.style.display = 'none';
        scoreContainer.style.display = 'block';
        // Ajoutez le code pour afficher le score ici
    }

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
        quizContainer.style.display = 'none';
        scoreContainer.style.display = 'none';
        document.getElementById('startContainer').style.display = 'block';
    };
});
