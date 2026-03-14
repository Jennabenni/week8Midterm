import { auth, db } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import {
    collection, addDoc, deleteDoc, doc, onSnapshot
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

let activities = [];
let currentUser = null;
let unsubscribe = null;

const today = new Date();
let viewYear = today.getFullYear();
let viewMonth = today.getMonth(); // 0-indexed

const monthLabel = document.getElementById("month-label");
const calendarBody = document.getElementById("calendar-body");
const scheduleForm = document.getElementById("schedule-form");
const activityInput = document.getElementById("activity-input");
const dateInput = document.getElementById("date-input");

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

onAuthStateChanged(auth, (user) => {
    if (!user) return;
    currentUser = user;

    // Clean up any previous listener
    if (unsubscribe) unsubscribe();

    const activitiesRef = collection(db, "users", user.uid, "scheduledActivities");

    // Real-time listener — re-renders calendar whenever Firestore data changes
    unsubscribe = onSnapshot(activitiesRef, (snapshot) => {
        activities = [];
        snapshot.forEach(docSnap => {
            activities.push({ id: docSnap.id, ...docSnap.data() });
        });
        renderCalendar();
    });
});

function getActivitiesForDate(dateString) {
    return activities.filter(entry => entry.date === dateString);
}

function formatDateKey(year, month, day) {
    const mm = String(month + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    return `${year}-${mm}-${dd}`;
}

function renderCalendar() {
    calendarBody.innerHTML = "";

    monthLabel.textContent = `${monthNames[viewMonth]} ${viewYear}`;

    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const todayKey = formatDateKey(today.getFullYear(), today.getMonth(), today.getDate());

    let day = 1;
    let row = document.createElement("tr");

    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement("td");
        empty.classList.add("empty");
        row.appendChild(empty);
    }

    for (let col = firstDay; day <= daysInMonth; col++) {
        if (col > 0 && col % 7 === 0) {
            calendarBody.appendChild(row);
            row = document.createElement("tr");
        }

        const dateKey = formatDateKey(viewYear, viewMonth, day);
        const cell = document.createElement("td");
        cell.classList.add("day-cell");

        if (dateKey === todayKey) {
            cell.classList.add("today");
        }

        const dayNumber = document.createElement("span");
        dayNumber.classList.add("day-number");
        dayNumber.textContent = day;
        cell.appendChild(dayNumber);

        const dayActivities = getActivitiesForDate(dateKey);
        dayActivities.forEach(entry => {
            const flag = document.createElement("div");
            flag.classList.add("activity-flag");
            flag.textContent = entry.activity;

            const removeBtn = document.createElement("button");
            removeBtn.classList.add("remove-btn");
            removeBtn.textContent = "x";
            removeBtn.addEventListener("click", async () => {
                await deleteDoc(doc(db, "users", currentUser.uid, "scheduledActivities", entry.id));
            });

            flag.appendChild(removeBtn);
            cell.appendChild(flag);
        });

        row.appendChild(cell);
        day++;
    }

    const lastCol = (firstDay + daysInMonth) % 7;
    if (lastCol !== 0) {
        for (let i = lastCol; i < 7; i++) {
            const empty = document.createElement("td");
            empty.classList.add("empty");
            row.appendChild(empty);
        }
    }

    calendarBody.appendChild(row);
}

scheduleForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    const activity = activityInput.value.trim();
    const date = dateInput.value;
    if (!activity || !date) return;

    const activitiesRef = collection(db, "users", currentUser.uid, "scheduledActivities");
    await addDoc(activitiesRef, { activity, date });

    // Navigate to the month of the added activity
    const [year, month] = date.split("-").map(Number);
    viewYear = year;
    viewMonth = month - 1;

    activityInput.value = "";
    dateInput.value = "";
});

document.getElementById("prev-month").addEventListener("click", () => {
    viewMonth--;
    if (viewMonth < 0) { viewMonth = 11; viewYear--; }
    renderCalendar();
});

document.getElementById("next-month").addEventListener("click", () => {
    viewMonth++;
    if (viewMonth > 11) { viewMonth = 0; viewYear++; }
    renderCalendar();
});
