let currentQuestions = [];
let userAnswers = [];
let timerInterval;
let timeLeft = 600; 

function loadChapters() {
    const subSelect = document.getElementById('subject-select');
    const chapSelect = document.getElementById('chapter-select');
    const selectedSub = subSelect.value;

    chapSelect.innerHTML = '<option value="">-- Select Chapter --</option>';

    if (selectedSub && quizData[selectedSub]) {
        const chapters = Object.keys(quizData[selectedSub]);
        chapters.forEach(chap => {
            const option = document.createElement('option');
            option.value = chap;
            option.textContent = chap;
            chapSelect.appendChild(option);
        });
    }
}

function startTest() {
    const sub = document.getElementById('subject-select').value;
    const chap = document.getElementById('chapter-select').value;
    
    if (!sub || !chap) return alert("Please pick a subject and chapter!");

    currentQuestions = quizData[sub][chap];
    document.getElementById('test-info').innerText = `${sub}: ${chap}`;
    document.getElementById('selection-screen').style.display = 'none';
    document.getElementById('test-screen').style.display = 'block';

    renderQuestions();
    startTimer();
}

function renderQuestions() {
    const area = document.getElementById('questions-area');
    area.innerHTML = currentQuestions.map((q, i) => `
        <div class="q-card">
            <p style="font-weight: 700; color: var(--brown);">${i+1}. ${q.q}</p>
            ${q.options.map((opt, j) => `
                <label class="option">
                    <input type="radio" name="q${i}" value="${j}"> ${opt}
                </label>
            `).join('')}
        </div>
    `).join('');
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        let mins = Math.floor(timeLeft / 60);
        let secs = timeLeft % 60;
        document.getElementById('time-left').innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        if (timeLeft <= 0) finishTest();
    }, 1000);
}

function finishTest() {
    clearInterval(timerInterval);
    let score = 0;
    userAnswers = []; 

    currentQuestions.forEach((q, i) => {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        const val = selected ? parseInt(selected.value) : null;
        userAnswers.push(val); 

        if (val === q.correct) score++;
    });

    document.getElementById('result-score').innerText = `${score} / ${currentQuestions.length}`;
    document.getElementById('result-msg').innerText = score === currentQuestions.length ? "Perfect Score! You're a topper! 🏆" : "Keep learning! 💪";
    
    if (score === currentQuestions.length) confetti({ particleCount: 150, spread: 70 });
    document.getElementById('result-modal').style.display = 'flex';
}

function showReview() {
    const reviewArea = document.getElementById('review-area');
    reviewArea.style.display = 'block';
    reviewArea.innerHTML = '<hr style="margin: 20px 0; border: 1px solid #eee;">';

    currentQuestions.forEach((q, i) => {
        const isCorrect = userAnswers[i] === q.correct;
        const reviewItem = document.createElement('div');
        reviewItem.className = `review-item ${isCorrect ? 'correct-bg' : 'wrong-bg'}`;
        
        reviewItem.innerHTML = `
            <p style="font-weight: 700; font-size: 0.9rem;">${i+1}. ${q.q}</p>
            <p style="font-size: 0.8rem; margin-top: 5px;">
                <b>Your Answer:</b> ${userAnswers[i] !== null ? q.options[userAnswers[i]] : '<span style="color:orange">Not Answered</span>'}<br>
                ${!isCorrect ? `<b>Correct Answer:</b> <span style="color:green">${q.options[q.correct]}</span>` : '<span style="color:green">Well done!</span>'}
            </p>
        `;
        reviewArea.appendChild(reviewItem);
    });
}