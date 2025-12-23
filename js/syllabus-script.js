const mathsData = [
    {n: "Percentage", m: 21}, {n: "Profit & Loss", m: 16}, {n: "Work & Wages", m: 3},
    {n: "Discount", m: 9}, {n: "SI", m: 16}, {n: "CI", m: 19}, {n: "TSD", m: 12},
    {n: "Time & Work", m: 14}, {n: "Pipe & Cistern", m: 4}, {n: "Train", m: 6},
    {n: "Race", m: 3}, {n: "Circular Motion", m: 1}, {n: "Boat & Stream", m: 5},
    {n: "Ratio", m: 10}, {n: "Proportion", m: 3}, {n: "Ages", m: 2}, {n: "Partnership", m: 6},
    {n: "Mixture", m: 7}, {n: "Alligation", m: 7}, {n: "Average", m: 19}, {n: "Simplification", m: 11},
    {n: "Surds & Indices", m: 14}, {n: "Number System", m: 20}, {n: "AP", m: 2}, {n: "HCF LCM", m: 10},
    {n: "Algebra", m: 21}, {n: "Quadratic Eq", m: 2}, {n: "Trigonometry", m: 19}, {n: "Max Min", m: 2},
    {n: "Height & Distance", m: 7}, {n: "Geometry", m: 48}, {n: "Mensuration 2D", m: 12},
    {n: "Mensuration 3D", m: 21}, {n: "Coordinate Geo", m: 7}, {n: "Probability", m: 9},
    {n: "DI", m: 16}, {n: "Statistics", m: 5}
];

const totals = { maths: 395, reasoning: 40, english: 89, gk: 188, grand: 584 };

document.addEventListener('DOMContentLoaded', () => {
    const mathsList = document.getElementById('maths-list');
    
    // 1. Inject Mathematics Chapters
    if(mathsList) {
        mathsList.innerHTML = "";
        mathsData.forEach((item, index) => {
            const id = `math_ch_${index}`;
            mathsList.innerHTML += `
                <div class="topic-row">
                    <span>${item.n} (${item.m})</span>
                    <input type="number" id="${id}" class="num-input sub-maths" min="0" max="${item.m}" value="0">
                </div>
            `;
        });
    }

    // 2. Add Event Listeners to ALL inputs
    document.querySelectorAll('.num-input').forEach(input => {
        // Load saved value from memory
        input.value = localStorage.getItem(input.id) || 0;
        
        // When you type...
        input.addEventListener('input', () => {
            // Correct the number if it's too high or low
            let val = parseInt(input.value) || 0;
            let max = parseInt(input.max);
            if(val > max) input.value = max;
            if(val < 0) input.value = 0;
            
            // Save it
            localStorage.setItem(input.id, input.value);
            // Calculate bars
            calculateProgress();
        });
    });

    // Run once at start
    calculateProgress();
});

function calculateProgress() {
    const subjects = ['maths', 'reasoning', 'english', 'gk'];
    let grandTotalDone = 0;

    subjects.forEach(sub => {
        let subDone = 0;
        // Select all inputs for this subject
        document.querySelectorAll(`.sub-${sub}`).forEach(input => {
            subDone += parseInt(input.value) || 0;
        });
        
        grandTotalDone += subDone;
        let subPercent = Math.round((subDone / totals[sub]) * 100) || 0;
        
        // Update subject UI
        const percentText = document.getElementById(`${sub}-percent`);
        const fillBar = document.getElementById(`${sub}-fill`);
        
        if(percentText) percentText.innerText = subPercent + "%";
        if(fillBar) fillBar.style.width = subPercent + "%";
    });

    // Grand Total calculation
    const grandPercent = Math.round((grandTotalDone / totals.grand) * 100) || 0;
    
    // SAVE to share with Dashboard
    localStorage.setItem('total_ssc_progress', grandPercent);
    
    // Update Header UI
    const overallFill = document.getElementById('overall-fill');
    const statText = document.getElementById('stat-text');
    
    if(overallFill) overallFill.style.width = grandPercent + "%";
    if(statText) statText.innerText = `${grandTotalDone} / ${totals.grand} Lectures Completed (${grandPercent}%)`;
}