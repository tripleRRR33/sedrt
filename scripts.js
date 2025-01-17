function startQuiz() {
    currentQuestions = shuffleArray([...questions]).slice(0, 10);
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
    document.getElementById('quizContainer').style.display = 'block';
    document.getElementById('scoreContainer').style.display = 'none';
    document.getElementById('startContainer').style.display = 'none';
    updateProgress();
}

// Assurez-vous également que les fonctions suivantes sont définies quelque part dans votre script :
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function showQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    document.getElementById('question').textContent = question.question;
    const optionsElement = document.getElementById('options');
    optionsElement.innerHTML = '';
    question.options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => selectAnswer(option);
        optionsElement.appendChild(button);
    });
    document.getElementById('explanation').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'none';
    answeredQuestion = false;
}

function selectAnswer(selectedOption) {
    if (answeredQuestion) return;
    answeredQuestion = true;

    const question = currentQuestions[currentQuestionIndex];
    const buttons = document.getElementById('options').getElementsByClassName('option-btn');

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

    document.getElementById('explanation').textContent = question.explanation;
    document.getElementById('explanation').style.display = 'block';
    document.getElementById('nextBtn').style.display = 'block';
}

function updateProgress() {
    document.getElementById('progress').textContent = `Question ${currentQuestionIndex + 1} sur ${currentQuestions.length}`;
}
