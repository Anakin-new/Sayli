// 1. SUBJECT DEFINITIONS (Same as before)
const subjects = [
    { name: "Maths", icon: "🔢", video: "#" },
    { name: "Reasoning", icon: "🧠", video: "https://youtube.com/playlist?list=PLXTyt_wUBqQ5Yn2X5yWYxvm5OM3umkvCV&si=3sPgyb30y65pPWkV" },
    { name: "English", icon: "📖", video: "https://youtube.com/playlist?list=PL7GXeqrUZGQKCpM2GeiNu5IrffdUhj-My&si=PI9S59R4GBP249oB" },
    { name: "GS", icon: "🌍", video: "#" },
    { name: "Computer Science", icon: "💻", video: "#" },
    { name: "Science", icon: "🧪", video: "#" }
];

// 2. DETAILED CHAPTER DATA WITH LINKS
const chapters = {
    "Maths": [
        { name: "Percentage Test 1", link: "https://drive.google.com/file/d/1BN66divrRai0WmuobaN4dkzPyyXbhze3/view?usp=drive_link" },
        // { name: "Profit & Loss", link: "https://drive.google.com/file/d/YOUR_LINK_HERE/view" },
        // { name: "Work & Wages", link: "#" }, // Use "#" if you don't have the link yet
        // { name: "Discount", link: "#" },
        // { name: "SI", link: "#" },
        // { name: "CI", link: "#" }
        // ... add the rest here
    ],
    // "English": [
    //     { name: "Grammar Foundation", link: "#" },
    //     { name: "Noun", link: "#" }
    // ],
    // "GS": [
    //     { name: "History Notes", link: "#" }
    // ],
    // Add other subjects here following the { name: "...", link: "..." } format
};

// 3. GENERATE SHELVES (Keep this the same as your current code)
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('shelf-container');
    subjects.forEach(sub => {
        const shelf = document.createElement('div');
        shelf.className = "shelf";
        shelf.innerHTML = `
            <h3 class="shelf-title">${sub.icon} ${sub.name}</h3>
            <div class="resource-grid">
                <a href="${sub.video}" target="_blank" class="resource-card">
                    <div class="res-icon">🎥</div>
                    <span>Video Section</span>
                </a>
                <div class="resource-card" onclick="openPDFs('${sub.name}')" style="cursor:pointer">
                    <div class="res-icon">📑</div>
                    <span>PDF Section</span>
                </div>
            </div>
        `;
        container.appendChild(shelf);
    });
});

// 4. UPDATED POPUP LOGIC (To use the links)
function openPDFs(subject) {
    const modal = document.getElementById('pdf-modal');
    const list = document.getElementById('chapter-pdf-list');
    const title = document.getElementById('modal-title');

    title.innerText = `${subject} Chapters`;
    list.innerHTML = "";

    const pdfList = chapters[subject] || [];
    
    if (pdfList.length === 0) {
        list.innerHTML = "<p style='text-align:center; padding:20px;'>Daal dunga kuch time me 😓 </p>";
    } else {
        pdfList.forEach(ch => {
            list.innerHTML += `
                <a href="${ch.link}" target="_blank" class="pdf-row">
                    <span>📄 ${ch.name}</span>
                    <span style="color:var(--sage)">Open ➔</span>
                </a>
            `;
        });
    }

    modal.style.display = "flex";
}

function closePDFs() {
    document.getElementById('pdf-modal').style.display = "none";
}