document.addEventListener('DOMContentLoaded', function () {
    let questions = [];

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
    }

    function startQuiz() {
        currentQuestions = shuffleArray([...questions]).slice(0, 10);
        currentQuestionIndex = 0;
        score = 0;
        showQuestion();
        quizContainer.style.display = 'block';
        scoreContainer.style.display = 'none';
        document.getElementById('startContainer').style.display = 'none';
        updateProgress();
    }

    function showQuestion() {
        const question = currentQuestions[currentQuestionIndex];
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

        questionElement.parentElement.style.opacity = '0';
        questionElement.parentElement.style.transform = 'translateY(20px)';
        setTimeout(() => {
            questionElement.parentElement.style.animation = 'fadeInUp 0.5s forwards';
        }, 0);
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

        explanationElement.style.opacity = '0';
        explanationElement.style.transform = 'translateY(20px)';
        setTimeout(() => {
            explanationElement.style.animation = 'fadeInUp 0.5s forwards';
        }, 0);

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
});
