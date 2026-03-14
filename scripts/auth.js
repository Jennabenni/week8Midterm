import { auth } from './firebase-config.js';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

// If already logged in, go straight to home
onAuthStateChanged(auth, (user) => {
    if (user) window.location.href = "index.html";
});

const loginFormSection = document.getElementById("login-form-section");
const signupFormSection = document.getElementById("signup-form-section");
const loginError = document.getElementById("login-error");
const signupError = document.getElementById("signup-error");

// Toggle between log in and sign up views
document.getElementById("show-signup").addEventListener("click", (e) => {
    e.preventDefault();
    loginFormSection.style.display = "none";
    signupFormSection.style.display = "block";
});

document.getElementById("show-login").addEventListener("click", (e) => {
    e.preventDefault();
    signupFormSection.style.display = "none";
    loginFormSection.style.display = "block";
});

// Log in
document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    loginError.textContent = "";

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            window.location.href = "index.html";
        })
        .catch((error) => {
            loginError.textContent = friendlyError(error.code);
        });
});

// Sign up
document.getElementById("signup-form").addEventListener("submit", (e) => {
    e.preventDefault();
    signupError.textContent = "";

    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            window.location.href = "index.html";
        })
        .catch((error) => {
            signupError.textContent = friendlyError(error.code);
        });
});

function friendlyError(code) {
    switch (code) {
        case "auth/invalid-email":
            return "Please enter a valid email address.";
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-credential":
            return "Incorrect email or password.";
        case "auth/email-already-in-use":
            return "An account with this email already exists.";
        case "auth/weak-password":
            return "Password must be at least 6 characters.";
        default:
            return "Something went wrong. Please try again.";
    }
}
