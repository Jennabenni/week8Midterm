import { auth } from './firebase-config.js';
import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

const requireAuth = document.body.dataset.authRequired === "true";

onAuthStateChanged(auth, (user) => {
    const authLink = document.getElementById("nav-auth-link");

    if (user) {
        if (authLink) {
            authLink.textContent = "Log Out";
            authLink.href = "#";
            authLink.addEventListener("click", (e) => {
                e.preventDefault();
                signOut(auth).then(() => {
                    window.location.href = "auth.html";
                });
            });
        }

        const profileLink = document.getElementById("nav-profile-link");
        if (profileLink) profileLink.style.display = "block";
    } else {
        // Not logged in
        if (requireAuth) {
            window.location.href = "auth.html";
        }
        // If no auth required (e.g. index), the Log In link stays as-is
    }
});
