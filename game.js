cat > game.js << 'EOF'
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let streak = 0;
let achievements = { perfect: false, speedrun: false, perfect3: false };
let startTime;

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Game Started');
    
    const questionElement = document.getElementById('question');
    const optionsContainer = document.getElementById('optionsContainer');
    const feedbackContainer = document.getElementById('feedbackContainer');
    const feedbackMessage = document.getElementById('feedbackMessage');
    const explanation = document.getElementById('explanation');
    const nextBtn = document.getElementById('nextBtn');
    const resultsContainer = document.getElementById('resultsContainer');
    const finalScore = document.getElementById('finalScore');
    const restartBtn = document.getElementById('restartBtn');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const unitTitle = document.getElementById('unitTitle');
    const scoreDisplay = document.getElementById('scoreDisplay');
    const streakDisplay = document.getElementById('streakDisplay');
    const questionNum = document.getElementById('questionNum');
    const totalQuestions = document.getElementById('totalQuestions');

    function startGame() {
        currentQuestionIndex = 0;
        score = 0;
        selectedAnswer = null;
        streak = 0;
        startTime = Date.now();
        resultsContainer.classList.add('hidden');
        feedbackContainer.classList.add('hidden');
        totalQuestions.textContent = questions.length;
        scoreDisplay.textContent = '0';
        streakDisplay.textContent = '0';
        loadQuestion();
    }

    function loadQuestion() {
        if (!questions || currentQuestionIndex >= questions.length) return;
        const question = questions[currentQuestionIndex];
        unitTitle.textContent = question.unit;
        questionElement.textContent = question.question;
        questionNum.textContent = currentQuestionIndex + 1;
        
        optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'option';
            btn.textContent = option;
            btn.onclick = () => selectOption(index);
            optionsContainer.appendChild(btn);
        });
        
        selectedAnswer = null;
        feedbackContainer.classList.add('hidden');
        updateProgress();
    }

    function selectOption(index) {
        selectedAnswer = index;
        const options = document.querySelectorAll('.option');
        options.forEach((opt, i) => {
            if (i === index) opt.classList.add('selected');
        });
        showFeedback();
    }

    function showFeedback() {
        const question = questions[currentQuestionIndex];
        const isCorrect = selectedAnswer === question.correctAnswer;
        
        if (isCorrect) {
            score++;
            streak++;
            scoreDisplay.textContent = score;
            streakDisplay.textContent = streak;
            feedbackMessage.textContent = '✅ إجابة صحيحة!';
            feedbackMessage.className = 'feedback-message correct';
        } else {
            streak = 0;
            streakDisplay.textContent = '0';
            feedbackMessage.textContent = '❌ إجابة خاطئة!';
            feedbackMessage.className = 'feedback-message incorrect';
        }
        
        explanation.innerHTML = `<strong>الشرح:</strong><br>${question.explanation}`;
        feedbackContainer.classList.remove('hidden');
        document.querySelectorAll('.option').forEach(opt => opt.style.pointerEvents = 'none');
    }

    nextBtn.onclick = () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            document.querySelectorAll('.option').forEach(opt => opt.style.pointerEvents = 'auto');
            loadQuestion();
        } else {
            showResults();
        }
    };

    function showResults() {
        feedbackContainer.classList.add('hidden');
        resultsContainer.classList.remove('hidden');
        const percentage = Math.round((score / questions.length) * 100);
        const timeTaken = Math.round((Date.now() - startTime) / 1000);
        finalScore.innerHTML = `🎉 لقد حصلت على ${score} من ${questions.length} (${percentage}%)<br>⏱️ الوقت: ${timeTaken} ثانية`;
    }

    restartBtn.onclick = startGame;
    startGame();
});
EOF