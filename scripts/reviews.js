import { auth, db } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import {
    collection, addDoc, onSnapshot,
    query, orderBy, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

let currentUser = null;

const reviewFormSection = document.getElementById("review-form-section");
const reviewLoginPrompt = document.getElementById("review-login-prompt");
const reviewsList = document.getElementById("reviews-list");

// Track which reviews have already loaded their comment listeners
const commentListenersLoaded = new Set();

onAuthStateChanged(auth, (user) => {
    currentUser = user;
    if (user) {
        reviewFormSection.style.display = "block";
        reviewLoginPrompt.style.display = "none";
    } else {
        reviewFormSection.style.display = "none";
        reviewLoginPrompt.style.display = "block";
    }
});

// Load all reviews in real time, newest first
const reviewsRef = collection(db, "reviews");
const reviewsQuery = query(reviewsRef, orderBy("createdAt", "desc"));

onSnapshot(reviewsQuery, (snapshot) => {
    reviewsList.innerHTML = "";
    commentListenersLoaded.clear();

    if (snapshot.empty) {
        const empty = document.createElement("p");
        empty.textContent = "No reviews yet. Be the first to post one!";
        reviewsList.appendChild(empty);
        return;
    }

    snapshot.forEach(docSnap => {
        const card = buildReviewCard(docSnap.id, docSnap.data());
        reviewsList.appendChild(card);
    });
});

// Post a review
document.getElementById("review-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    const activityName = document.getElementById("review-activity").value.trim();
    const rating = Number(document.getElementById("review-rating").value);
    const reviewText = document.getElementById("review-text").value.trim();
    if (!activityName || !rating || !reviewText) return;

    await addDoc(collection(db, "reviews"), {
        activityName,
        rating,
        reviewText,
        authorEmail: currentUser.email,
        authorUsername: currentUser.displayName || currentUser.email,
        authorUid: currentUser.uid,
        createdAt: serverTimestamp()
    });

    document.getElementById("review-activity").value = "";
    document.getElementById("review-rating").value = "";
    document.getElementById("review-text").value = "";
});

function buildReviewCard(reviewId, review) {
    const card = document.createElement("div");
    card.classList.add("review-card");

    const activity = document.createElement("h3");
    activity.textContent = review.activityName;

    const meta = document.createElement("p");
    meta.classList.add("review-meta");
    const stars = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);
    let dateStr = "";
    if (review.createdAt) {
        dateStr = " · " + review.createdAt.toDate().toLocaleDateString("en-US", {
            year: "numeric", month: "long", day: "numeric"
        });
    }
    const displayName = review.authorUsername || review.authorEmail;
    meta.textContent = `${displayName} · ${stars}${dateStr}`;

    const text = document.createElement("p");
    text.textContent = review.reviewText;

    const toggleBtn = document.createElement("button");
    toggleBtn.classList.add("toggle-comments-btn");
    toggleBtn.textContent = "Show Comments";

    const commentsSection = document.createElement("div");
    commentsSection.classList.add("comments-section");
    commentsSection.style.display = "none";

    toggleBtn.addEventListener("click", () => {
        const isOpen = commentsSection.style.display !== "none";
        commentsSection.style.display = isOpen ? "none" : "block";
        toggleBtn.textContent = isOpen ? "Show Comments" : "Hide Comments";

        // Set up the comment listener only the first time this review is expanded
        if (!isOpen && !commentListenersLoaded.has(reviewId)) {
            commentListenersLoaded.add(reviewId);
            loadComments(reviewId, commentsSection);
        }
    });

    card.appendChild(activity);
    card.appendChild(meta);
    card.appendChild(text);
    card.appendChild(toggleBtn);
    card.appendChild(commentsSection);

    return card;
}

function loadComments(reviewId, container) {
    const commentsRef = collection(db, "reviews", reviewId, "comments");
    const commentsQuery = query(commentsRef, orderBy("createdAt", "asc"));

    // Comment list — updated in real time
    const commentList = document.createElement("div");
    commentList.classList.add("comment-list");
    container.appendChild(commentList);

    onSnapshot(commentsQuery, (snapshot) => {
        commentList.innerHTML = "";

        if (snapshot.empty) {
            const empty = document.createElement("p");
            empty.textContent = "No comments yet.";
            commentList.appendChild(empty);
        } else {
            snapshot.forEach(docSnap => {
                const comment = docSnap.data();
                const p = document.createElement("p");
                p.classList.add("comment");
                const commenterName = comment.authorUsername || comment.authorEmail;
                p.innerHTML = `<strong>${commenterName}:</strong> ${comment.text}`;
                commentList.appendChild(p);
            });
        }
    });

    // Comment form — only shown when logged in
    if (currentUser) {
        const form = document.createElement("form");
        form.classList.add("comment-form");

        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Add a comment...";
        input.required = true;

        const submitBtn = document.createElement("button");
        submitBtn.type = "submit";
        submitBtn.textContent = "Post";

        form.appendChild(input);
        form.appendChild(submitBtn);

        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const text = input.value.trim();
            if (!text || !currentUser) return;

            await addDoc(collection(db, "reviews", reviewId, "comments"), {
                text,
                authorEmail: currentUser.email,
                authorUsername: currentUser.displayName || currentUser.email,
                authorUid: currentUser.uid,
                createdAt: serverTimestamp()
            });

            input.value = "";
        });

        container.appendChild(form);
    } else {
        const prompt = document.createElement("p");
        prompt.innerHTML = `<a href="auth.html">Log in</a> to leave a comment.`;
        container.appendChild(prompt);
    }
}
