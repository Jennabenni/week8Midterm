import { auth, db } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import {
    collection, addDoc, deleteDoc, doc,
    onSnapshot, query, orderBy, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

const form = document.getElementById("custom-activity-form");
const nameInput = document.getElementById("custom-activity-name");
const itemInput = document.getElementById("checklist-item-input");
const addItemBtn = document.getElementById("add-item-btn");
const checklistPreview = document.getElementById("checklist-preview");
const activitiesList = document.getElementById("custom-activities-list");

let currentUser = null;
let pendingItems = []; // checklist items being built before saving

onAuthStateChanged(auth, (user) => {
    if (!user) return;
    currentUser = user;

    const ref = collection(db, "users", user.uid, "customActivities");
    const q = query(ref, orderBy("createdAt", "desc"));

    onSnapshot(q, (snapshot) => {
        renderActivities(snapshot, user.uid);
    });
});

// Add a checklist item to the pending list
addItemBtn.addEventListener("click", () => {
    const text = itemInput.value.trim();
    if (!text) return;

    pendingItems.push(text);
    itemInput.value = "";
    renderPreview();
});

// Allow Enter key to add items without submitting the form
itemInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        addItemBtn.click();
    }
});

function renderPreview() {
    checklistPreview.innerHTML = "";
    pendingItems.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = item;

        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", () => {
            pendingItems.splice(index, 1);
            renderPreview();
        });

        li.appendChild(removeBtn);
        checklistPreview.appendChild(li);
    });
}

// Save the activity to Firestore
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    const name = nameInput.value.trim();
    const category = document.querySelector("input[name='activity-cat']:checked");
    if (!name || !category) return;

    const ref = collection(db, "users", currentUser.uid, "customActivities");
    await addDoc(ref, {
        name,
        category: category.value,
        items: [...pendingItems],
        createdAt: serverTimestamp()
    });

    // Reset form
    nameInput.value = "";
    document.querySelectorAll("input[name='activity-cat']").forEach(r => r.checked = false);
    pendingItems = [];
    renderPreview();
});

function renderActivities(snapshot, uid) {
    activitiesList.innerHTML = "";

    if (snapshot.empty) return;

    snapshot.forEach((docSnap) => {
        const activity = docSnap.data();

        const card = document.createElement("div");
        card.classList.add("custom-activity-card");

        const title = document.createElement("h3");
        title.textContent = activity.name;

        const category = document.createElement("p");
        category.textContent = activity.category;

        card.appendChild(title);
        card.appendChild(category);

        if (activity.items && activity.items.length > 0) {
            const ul = document.createElement("ul");
            activity.items.forEach(item => {
                const li = document.createElement("li");

                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";

                const label = document.createElement("label");
                label.textContent = item;

                checkbox.addEventListener("change", () => {
                    label.classList.toggle("crossed-off", checkbox.checked);
                });

                li.appendChild(checkbox);
                li.appendChild(label);
                ul.appendChild(li);
            });
            card.appendChild(ul);
        } else {
            const none = document.createElement("p");
            none.textContent = "No checklist items.";
            card.appendChild(none);
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", async () => {
            await deleteDoc(doc(db, "users", uid, "customActivities", docSnap.id));
        });

        card.appendChild(deleteBtn);
        activitiesList.appendChild(card);
    });
}
