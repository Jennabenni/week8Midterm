let notes = JSON.parse(localStorage.getItem("userNotes")) || [];

const noteForm = document.getElementById("note-form");
const noteTitleInput = document.getElementById("note-title");
const noteBodyInput = document.getElementById("note-body");
const notesList = document.getElementById("notes-list");

function saveNotes() {
    localStorage.setItem("userNotes", JSON.stringify(notes));
}

function renderNotes() {
    notesList.innerHTML = "";

    if (notes.length === 0) {
        const empty = document.createElement("p");
        empty.textContent = "No notes yet. Add one above.";
        notesList.appendChild(empty);
        return;
    }

    notes.forEach((note, index) => {
        const card = document.createElement("div");
        card.classList.add("note-card");

        const title = document.createElement("h3");
        title.textContent = note.title;

        const timestamp = document.createElement("small");
        timestamp.textContent = note.timestamp;

        const body = document.createElement("p");
        body.textContent = note.body;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
            notes.splice(index, 1);
            saveNotes();
            renderNotes();
        });

        card.appendChild(title);
        card.appendChild(timestamp);
        card.appendChild(body);
        card.appendChild(deleteBtn);
        notesList.appendChild(card);
    });
}

noteForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = noteTitleInput.value.trim();
    const body = noteBodyInput.value.trim();

    if (!title || !body) return;

    const now = new Date();
    const timestamp = now.toLocaleDateString("en-US", {
        year: "numeric", month: "long", day: "numeric",
        hour: "2-digit", minute: "2-digit"
    });

    notes.unshift({ title, body, timestamp });
    saveNotes();
    renderNotes();

    noteTitleInput.value = "";
    noteBodyInput.value = "";
});

// Initialize
renderNotes();
