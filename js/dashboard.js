// --- SELECTORS ---
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const fill = document.getElementById('progress-fill');
const percentText = document.getElementById('percent');
const plant = document.getElementById('plant-stage');
const syllabusStat = document.getElementById('syllabus-stat');

// --- INITIALIZE APP ---
document.addEventListener('DOMContentLoaded', () => {
    checkAndResetDay(); // 1. Archive yesterday's work if date changed
    updateClock();      // 2. Start the clock
    loadDailyTasks();   // 3. Load today's tasks
    updateGarden();     // 4. Sync the plant video and progress bar
});

// --- THE ARCHIVE & RESET LOGIC (History Fix) ---
function checkAndResetDay() {
    const today = new Date().toDateString(); // e.g., "Tue Dec 23 2025"
    const lastOpened = localStorage.getItem('last_opened_date');

    // If it's a brand new day
    if (lastOpened && lastOpened !== today) {
        archiveToHistory(lastOpened);
    }

    // Update the "last opened" tracker to today
    localStorage.setItem('last_opened_date', today);
}

function archiveToHistory(oldDate) {
    const dailyTasks = JSON.parse(localStorage.getItem('sayli_daily')) || [];
    
    if (dailyTasks.length > 0) {
        // Calculate the score for that day
        const total = dailyTasks.length;
        const done = dailyTasks.filter(t => t.completed).length;
        const score = Math.round((done / total) * 100);

        // Get existing history or start new list
        const history = JSON.parse(localStorage.getItem('study_history')) || [];
        
        // Add yesterday's data to the top of the list
        history.unshift({
            date: oldDate,
            score: score,
            tasks: dailyTasks
        });

        // Save history and CLEAR the daily list for the new day
        localStorage.setItem('study_history', JSON.stringify(history));
        localStorage.removeItem('sayli_daily');
    }
}

// --- TASK OPERATIONS ---
function loadDailyTasks() {
    const saved = JSON.parse(localStorage.getItem('sayli_daily')) || [];
    taskList.innerHTML = "";
    saved.forEach(t => renderTask(t.text, t.completed));
}

function addTask() {
    const val = taskInput.value.trim();
    if(!val) return;
    renderTask(val, false);
    saveData();
    taskInput.value = "";
    updateGarden();
}

function renderTask(text, isDone) {
    const div = document.createElement('div');
    div.className = 'task-item';
    div.innerHTML = `
        <input type="checkbox" class="checker" ${isDone ? 'checked' : ''} onchange="toggleTask(this)">
        <span class="${isDone ? 'done-text' : ''}">${text}</span>
        <button onclick="deleteTask(this)" style="margin-left:auto; border:none; background:none; cursor:pointer;">❌</button>
    `;
    taskList.appendChild(div);
}

function toggleTask(cb) {
    cb.nextElementSibling.classList.toggle('done-text');
    if (cb.checked) {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#7fb069', '#f2c6c2', '#a47e65'] // Using Sayli's app colors!
        });
    }
    saveData();
    updateGarden();
}

function deleteTask(btn) {
    btn.parentElement.remove();
    saveData();
    updateGarden();
}

function saveData() {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach(item => {
        tasks.push({ 
            text: item.querySelector('span').innerText, 
            completed: item.querySelector('.checker').checked 
        });
    });
    localStorage.setItem('sayli_daily', JSON.stringify(tasks));
}

// --- THE GARDEN (VIDEO & SYLLABUS LOGIC) ---
function updateGarden() {
    // 1. TODAY'S BAR (Based on Checkboxes)
    const all = document.querySelectorAll('.checker');
    const checked = document.querySelectorAll('.checker:checked');
    const dailyPercent = all.length ? Math.round((checked.length / all.length) * 100) : 0;
    
    if(fill) fill.style.width = dailyPercent + "%";
    if(percentText) percentText.innerText = dailyPercent;

    // 2. VIDEO SYLLABUS LOGIC
    const video = document.getElementById('plant-video');
    const sscProgress = parseInt(localStorage.getItem('total_ssc_progress')) || 0;
    
    if(syllabusStat) syllabusStat.innerText = sscProgress + "%";

    if (video) {
        if (video.readyState >= 1) {
            syncVideo(video, sscProgress);
        } else {
            video.onloadedmetadata = () => syncVideo(video, sscProgress);
        }
    }
}

function syncVideo(video, progress) {
    const duration = video.duration;
    if (!duration) return;
    const targetTime = (duration * progress) / 100;
    video.currentTime = targetTime;
}

// --- CLOCK ---
function updateClock() {
    const now = new Date();
    const dEl = document.getElementById('current-date');
    const tEl = document.getElementById('current-time');
    if(dEl) dEl.innerText = now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' });
    if(tEl) tEl.innerText = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
}

setInterval(updateClock, 1000);
taskInput.addEventListener("keypress", (e) => { if(e.key === "Enter") addTask(); });

const myMessages = [
    "Pdh lo 😓🤧YSL ki ksm tumhee ✨",
    "If you study well,🌝i'll bring you bareilly wala jhumka 🌸",
    "Pdhooooooooooo!!!💖",
    " well...🌝HR ki bio me tumhari post ka name kesa lgegaa✨",
    "Imagine lakho ki ghuus 😭😭🌷",
    "World tour v kr skte😓"
];

// FOR THE JAR SURPRISE
function showSurprise() {
    const modal = document.getElementById('surprise-overlay');
    const textEl = document.getElementById('surprise-text');
    const sound = document.getElementById('pop-sound');

    // Play your custom sound
    if (sound) {
        sound.currentTime = 0; 
        sound.play().catch(e => console.log("Sound play blocked until user interacts"));
    }

    // Fire Confetti
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#7fb069', '#f2c6c2', '#a47e65'],
        zIndex: 3000
    });

    const randomMsg = myMessages[Math.floor(Math.random() * myMessages.length)];
    textEl.innerText = randomMsg;
    modal.style.display = "flex";
}

// FOR TASK COMPLETION (Update your existing toggleTask)
function toggleTask(cb) {
    cb.nextElementSibling.classList.toggle('done-text');
    
    if (cb.checked) {
        const sound = document.getElementById('pop-sound');
        if (sound) { sound.currentTime = 0; sound.play(); }

        confetti({
            particleCount: 50,
            spread: 50,
            origin: { y: 0.8 },
            colors: ['#7fb069', '#f2c6c2']
        });
    }
    saveData();
    updateGarden();
};

// --- LOGIN & LOGOUT LOGIC ---
function logout() {
    // Optional: Only clear specific items like 'username' 
    // localStorage.removeItem('username'); 
    
    // Or clear everything to reset the app entirely:
    localStorage.clear(); 
    
    window.location.href = 'index.html';
}

// Check if user should be here (Optional Security)
// If you want to force them to login if they haven't:
/*
if (!localStorage.getItem('last_opened_date')) {
    window.location.href = 'index.html';
}
*/

function closeSurprise() {
    document.getElementById('surprise-overlay').style.display = "none";
};

