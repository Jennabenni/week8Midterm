// Load saved activities from localStorage, or start with empty array
let activities = JSON.parse(localStorage.getItem("scheduledActivities")) || [];

// Track which month/year the calendar is showing
const today = new Date();
let viewYear = today.getFullYear();
let viewMonth = today.getMonth(); // 0-indexed

const monthLabel = document.getElementById("month-label");
const calendarGrid = document.getElementById("calendar-grid");
const scheduleForm = document.getElementById("schedule-form");
const activityInput = document.getElementById("activity-input");
const dateInput = document.getElementById("date-input");

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function saveActivities() {
    localStorage.setItem("scheduledActivities", JSON.stringify(activities));
}

function getActivitiesForDate(dateString) {
    return activities.filter(entry => entry.date === dateString);
}

function formatDateKey(year, month, day) {
    // Returns YYYY-MM-DD to match the date input value format
    const mm = String(month + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    return `${year}-${mm}-${dd}`;
}

function renderCalendar() {
    // Remove all day cells (keep the 7 day-name headers)
    const dayCells = calendarGrid.querySelectorAll(".day-cell");
    dayCells.forEach(cell => cell.remove());

    monthLabel.textContent = `${monthNames[viewMonth]} ${viewYear}`;

    const firstDay = new Date(viewYear, viewMonth, 1).getDay(); // 0 = Sunday
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    // Leading empty cells
    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement("div");
        empty.classList.add("day-cell", "empty");
        calendarGrid.appendChild(empty);
    }

    // Day cells
    for (let day = 1; day <= daysInMonth; day++) {
        const dateKey = formatDateKey(viewYear, viewMonth, day);
        const cell = document.createElement("div");
        cell.classList.add("day-cell");

        // Highlight today
        const todayKey = formatDateKey(today.getFullYear(), today.getMonth(), today.getDate());
        if (dateKey === todayKey) {
            cell.classList.add("today");
        }

        const dayNumber = document.createElement("span");
        dayNumber.classList.add("day-number");
        dayNumber.textContent = day;
        cell.appendChild(dayNumber);

        // Add any activities scheduled for this day
        const dayActivities = getActivitiesForDate(dateKey);
        dayActivities.forEach(entry => {
            const flag = document.createElement("div");
            flag.classList.add("activity-flag");
            flag.textContent = entry.activity;

            const removeBtn = document.createElement("button");
            removeBtn.classList.add("remove-btn");
            removeBtn.textContent = "x";
            removeBtn.addEventListener("click", () => {
                activities = activities.filter(a => a !== entry);
                saveActivities();
                renderCalendar();
            });

            flag.appendChild(removeBtn);
            cell.appendChild(flag);
        });

        calendarGrid.appendChild(cell);
    }
}

scheduleForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const activity = activityInput.value.trim();
    const date = dateInput.value;

    if (!activity || !date) return;

    activities.push({ activity, date });
    saveActivities();

    // Navigate calendar to the month of the added activity
    const [year, month] = date.split("-").map(Number);
    viewYear = year;
    viewMonth = month - 1;

    renderCalendar();

    activityInput.value = "";
    dateInput.value = "";
});

document.getElementById("prev-month").addEventListener("click", () => {
    viewMonth--;
    if (viewMonth < 0) {
        viewMonth = 11;
        viewYear--;
    }
    renderCalendar();
});

document.getElementById("next-month").addEventListener("click", () => {
    viewMonth++;
    if (viewMonth > 11) {
        viewMonth = 0;
        viewYear++;
    }
    renderCalendar();
});

// Initialize
renderCalendar();
