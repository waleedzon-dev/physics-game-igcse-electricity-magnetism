cat > game.js << 'EOF'
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let streak = 0;
let achievements = {
    perfect: false,
    speedrun: false,
    perfect3: false
};

let startTime;

// الانتظار حتى تحمل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM Loaded - Initializing game...');
    
    // عناصر DOM
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

    // بدء اللعبة
    function startGame() {
        currentQuestionIndex = 0;
        score = 0;
        selectedAnswer = null;
        streak = 0;
        startTime = Date.now();
        achievements = {
            perfect: false,
            speedrun: false,
            perfect3: false
        };
        
        resultsContainer.classList.add('hidden');
        feedbackContainer.classList.add('hidden');
        
        totalQuestions.textContent = questions.length;
        scoreDisplay.textContent = '0';
        streakDisplay.textContent = '0';
        
        loadQuestion();
    }

    // تحميل السؤال
    function loadQuestion() {
        if (!questions || currentQuestionIndex >= questions.length) {
            console.error('❌ لا توجد أسئلة');
            return;
        }

        const question = questions[currentQuestionIndex];
        
        unitTitle.textContent = question.unit;
        questionElement.textContent = question.question;
        questionNum.textContent = currentQuestionIndex + 1;
        
        optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const optionBtn = document.createElement('button');
            optionBtn.className = 'option';
            optionBtn.innerHTML = `<span>${option}</span>`;
            optionBtn.addEventListener('click', () => selectOption(index));
            optionsContainer.appendChild(optionBtn);
        });
        
        selectedAnswer = null;
        feedbackContainer.classList.add('hidden');
        
        updateProgress();
        
        // رسم الرسومات إذا كانت الدالة موجودة
        if(typeof drawPhysicsIllustration === 'function') {
            drawPhysicsIllustration(currentQuestionIndex);
        }
    }

    // اختيار إجابة
    function selectOption(index) {
        selectedAnswer = index;
        
        const options = document.querySelectorAll('.option');
        options.forEach((opt, i) => {
            if (i === index) {
                opt.classList.add('selected');
            }
        });
        
        showFeedback();
    }

    // عرض التصحيح
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
            
            playSound('correctSound');
        } else {
            streak = 0;
            streakDisplay.textContent = '0';
            
            feedbackMessage.textContent = '❌ إجابة خاطئة!';
            feedbackMessage.className = 'feedback-message incorrect';
            
            playSound('incorrectSound');
        }
        
        explanation.innerHTML = `<strong>الشرح:</strong><br>${question.explanation}`;
        feedbackContainer.classList.remove('hidden');
        
        const options = document.querySelectorAll('.option');
        options.forEach(opt => opt.style.pointerEvents = 'none');
    }

    // تشغيل الأصوات
    function playSound(soundId) {
        const sound = document.getElementById(soundId);
        if(sound) {
            sound.play().catch(e => console.log('صوت لم يتم تشغيله'));
        }
    }

    // الانتقال للسؤال التالي
    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < questions.length) {
            const options = document.querySelectorAll('.option');
            options.forEach(opt => opt.style.pointerEvents = 'auto');
            loadQuestion();
        } else {
            showResults();
        }
    });

    // عرض النتائج
    function showResults() {
        feedbackContainer.classList.add('hidden');
        resultsContainer.classList.remove('hidden');
        
        const percentage = Math.round((score / questions.length) * 100);
        const timeTaken = Math.round((Date.now() - startTime) / 1000);
        
        if(percentage === 100) achievements.perfect = true;
        if(timeTaken < 60) achievements.speedrun = true;
        if(streak >= 3) achievements.perfect3 = true;
        
        let message = '';
        if (percentage === 100) {
            message = `🌟 ممتاز جداً! لقد حصلت على ${score} من ${questions.length} (${percentage}%)`;
        } else if (percentage >= 80) {
            message = `⭐ عمل رائع! لقد حصلت على ${score} من ${questions.length} (${percentage}%)`;
        } else if (percentage >= 60) {
            message = `👍 جيد! لقد حصلت على ${score} من ${questions.length} (${percentage}%)`;
        } else {
            message = `💪 حاول مرة أخرى! لقد حصلت على ${score} من ${questions.length} (${percentage}%)`;
        }
        
        finalScore.innerHTML = `
            <div>${message}</div>
            <div style="margin-top: 15px; font-size: 0.9em; opacity: 0.9;">
                ⏱️ الوقت المستغرق: ${timeTaken} ثانية
            </div>
        `;
        
        displayAchievements();
    }

    // عرض الإنجازات
    function displayAchievements() {
        const achievementsList = document.getElementById('achievementsList');
        achievementsList.innerHTML = '';
        
        const achievementsData = [
            {
                id: 'perfect',
                icon: '⭐',
                name: 'مثالي!',
                description: 'أجب على جميع الأسئلة بشكل صحيح'
            },
            {
                id: 'speedrun',
                icon: '⚡',
                name: 'سريع البرق',
                description: 'أنهِ اللعبة في أقل من دقيقة'
            },
            {
                id: 'perfect3',
                icon: '🔥',
                name: 'نار!',
                description: 'ثلاث إجابات صحيحة متتالية'
            }
        ];
        
        achievementsData.forEach(achievement => {
            const div = document.createElement('div');
            div.className = 'achievement';
            if(achievements[achievement.id]) {
                div.classList.add('unlocked');
            }
            div.innerHTML = `
                <i class="fas fa-trophy"></i>
                <p><strong>${achievement.icon} ${achievement.name}</strong></p>
                <p>${achievement.description}</p>
            `;
            achievementsList.appendChild(div);
        });
    }

    // تحديث التقدم
    function updateProgress() {
        const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
        progressFill.style.width = progress + '%';
        progressText.textContent = `السؤال ${currentQuestionIndex + 1} من ${questions.length}`;
    }

    // إعادة التشغيل
    restartBtn.addEventListener('click', startGame);

    // البدء الفعلي للعبة
    startGame();
});
EOF