import { auth, db } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import {
    collection, addDoc, deleteDoc, doc,
    onSnapshot, query, orderBy, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

const noteForm = document.getElementById("note-form");
const noteTitleInput = document.getElementById("note-title");
const noteBodyInput = document.getElementById("note-body");
const notesList = document.getElementById("notes-list");

let currentUser = null;
let unsubscribe = null;

onAuthStateChanged(auth, (user) => {
    if (!user) return;
    currentUser = user;

    // Clean up any previous listener
    if (unsubscribe) unsubscribe();

    const notesRef = collection(db, "users", user.uid, "notes");
    const q = query(notesRef, orderBy("createdAt", "desc"));

    // Real-time listener — re-renders whenever Firestore data changes
    unsubscribe = onSnapshot(q, (snapshot) => {
        renderNotes(snapshot, user.uid);
    });
});

noteForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    const title = noteTitleInput.value.trim();
    const body = noteBodyInput.value.trim();
    if (!title || !body) return;

    const notesRef = collection(db, "users", currentUser.uid, "notes");
    await addDoc(notesRef, { title, body, createdAt: serverTimestamp() });

    noteTitleInput.value = "";
    noteBodyInput.value = "";
});

function renderNotes(snapshot, uid) {
    notesList.innerHTML = "";

    if (snapshot.empty) {
        const empty = document.createElement("p");
        empty.textContent = "No notes yet. Add one above.";
        notesList.appendChild(empty);
        return;
    }

    snapshot.forEach((docSnap) => {
        const note = docSnap.data();

        const card = document.createElement("div");
        card.classList.add("note-card");

        const title = document.createElement("h3");
        title.textContent = note.title;

        const timestamp = document.createElement("small");
        if (note.createdAt) {
            timestamp.textContent = note.createdAt.toDate().toLocaleDateString("en-US", {
                year: "numeric", month: "long", day: "numeric",
                hour: "2-digit", minute: "2-digit"
            });
        }

        const body = document.createElement("p");
        body.textContent = note.body;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", async () => {
            await deleteDoc(doc(db, "users", uid, "notes", docSnap.id));
        });

        card.appendChild(title);
        card.appendChild(timestamp);
        card.appendChild(body);
        card.appendChild(deleteBtn);
        notesList.appendChild(card);
    });
}
