let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

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
const questionContainer = document.getElementById('questionContainer');

// بدء اللعبة
function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    resultsContainer.classList.add('hidden');
    questionContainer.classList.remove('hidden');
    feedbackContainer.classList.add('hidden');
    loadQuestion();
}

// تحميل السؤال الحالي
function loadQuestion() {
    const question = questions[currentQuestionIndex];
    
    // تحديث عنوان الوحدة
    unitTitle.textContent = question.unit;
    
    // تحديث السؤال
    questionElement.textContent = question.question;
    
    // تحديث الخيارات
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionBtn = document.createElement('button');
        optionBtn.className = 'option';
        optionBtn.textContent = option;
        optionBtn.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionBtn);
    });
    
    // إعادة تعيين
    selectedAnswer = null;
    feedbackContainer.classList.add('hidden');
    
    // تحديث شريط التقدم
    updateProgress();
}

// اختيار إجابة
function selectOption(index) {
    selectedAnswer = index;
    
    // تحديث الواجهة
    const options = document.querySelectorAll('.option');
    options.forEach((opt, i) => {
        if (i === index) {
            opt.classList.add('selected');
        } else {
            opt.classList.remove('selected');
        }
    });
    
    // عرض التصحيح الفوري
    showFeedback();
}

// عرض التصحيح والشرح
function showFeedback() {
    const question = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === question.correctAnswer;
    
    if (isCorrect) {
        score++;
        feedbackMessage.textContent = '✅ إجابة صحيحة!';
        feedbackMessage.className = 'correct';
    } else {
        feedbackMessage.textContent = '❌ إجابة خاطئة!';
        feedbackMessage.className = 'incorrect';
    }
    
    explanation.textContent = question.explanation;
    feedbackContainer.classList.remove('hidden');
    
    // تعطيل الخيارات
    const options = document.querySelectorAll('.option');
    options.forEach(opt => opt.style.pointerEvents = 'none');
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

// عرض النتائج النهائية
function showResults() {
    questionContainer.classList.add('hidden');
    feedbackContainer.classList.add('hidden');
    resultsContainer.classList.remove('hidden');
    
    const percentage = Math.round((score / questions.length) * 100);
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
    
    finalScore.textContent = message;
}

// تحديث شريط التقدم
function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressFill.style.width = progress + '%';
    progressText.textContent = `السؤال ${currentQuestionIndex + 1} من ${questions.length}`;
}

// إعادة تشغيل اللعبة
restartBtn.addEventListener('click', startGame);

// بدء اللعبة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', startGame);