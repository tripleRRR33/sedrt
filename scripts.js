document.addEventListener('DOMContentLoaded', function () {
    fetch('all_categories_questions.json')
        .then(response => response.json())
        .then(data => {
            questions = [];
            for (const category in data) {
                if (data.hasOwnProperty(category)) {
                    questions = questions.concat(data[category]);
                }
            }
            console.log('Questions loaded:', questions); // Verify questions are loaded
            initializeQuiz(); // Ensure this is called
        })
        .catch(error => console.error('Error loading questions:', error));
});

function initializeQuiz() {
    document.getElementById('startBtn').onclick = () => {
        console.log('Start button clicked'); // Verify button click
        startQuiz();
    };

    document.getElementById('nextBtn').onclick = () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuestions.length) {
            showQuestion();
        } else {
            showScore();
        }
    };

    document.getElementById('restartBtn').onclick = () => {
        document.getElementById('quizContainer').style.display = 'none';
        document.getElementById('scoreContainer').style.display = 'none';
        document.getElementById('startContainer').style.display = 'block';
    };
}
