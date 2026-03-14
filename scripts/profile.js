import { auth } from './firebase-config.js';
import {
    onAuthStateChanged,
    updateProfile,
    updateEmail
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

const profileForm = document.getElementById("profile-form");
const usernameInput = document.getElementById("profile-username");
const emailInput = document.getElementById("profile-email");
const successMsg = document.getElementById("profile-success");
const errorMsg = document.getElementById("profile-error");

let currentUser = null;

onAuthStateChanged(auth, (user) => {
    if (!user) return;
    currentUser = user;

    // Pre-fill form with current values
    usernameInput.value = user.displayName || "";
    emailInput.value = user.email || "";
});

profileForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    successMsg.style.display = "none";
    errorMsg.textContent = "";

    const newUsername = usernameInput.value.trim();
    const newEmail = emailInput.value.trim();

    try {
        // Update username (stored as Firebase Auth displayName)
        if (newUsername !== currentUser.displayName) {
            await updateProfile(currentUser, { displayName: newUsername });
        }

        // Update email only if it changed
        if (newEmail !== currentUser.email) {
            await updateEmail(currentUser, newEmail);
        }

        successMsg.style.display = "block";
    } catch (error) {
        if (error.code === "auth/requires-recent-login") {
            errorMsg.textContent = "For security, please log out and log back in before changing your email.";
        } else if (error.code === "auth/email-already-in-use") {
            errorMsg.textContent = "That email is already in use by another account.";
        } else if (error.code === "auth/invalid-email") {
            errorMsg.textContent = "Please enter a valid email address.";
        } else {
            errorMsg.textContent = "Something went wrong. Please try again.";
        }
    }
});
