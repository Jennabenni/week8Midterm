const questions = [
    {
        text: "When would you like this activity to take place?",
        options: ["Morning", "Afternoon", "Night"]
    },
    {
        text: "Would you like to do an activity outside or inside?",
        options: ["Outside", "Inside"]
    },
    {
        text: "Are you doing this activity alone or with others?",
        options: ["Alone", "With others"]
    },
    {
        text: "If you are with others, are you familiar with them?",
        options: ["N/A", "Yes, I'm familiar with them", "No, I'm not familiar with them"]
    },
    {
        text: "Would you consider yourself more of an introvert or an extrovert?",
        options: ["Introvert", "Extrovert", "Somewhere in between"]
    },
    {
        text: "Do you like high-intensity activities, or do you prefer something more laid-back?",
        options: ["High-intensity", "Laid-back"]
    },
    {
        text: "Would you like food or drinks to be incorporated into the activity?",
        options: ["Yes", "No", "No preference"]
    },
    {
        text: "How long would you like to do this activity?",
        options: ["30 min - 1 hour", "2-3 hours", "4+ hours"]
    },
    {
        text: "Are you okay with needing to bring items for this activity?",
        options: ["Yes, I don't mind bringing items", "I'd prefer to bring as few items as possible"]
    },
    {
        text: "Would you prefer to spend money with this activity?",
        options: ["Free", "Some money", "Will spend money", "No preference"]
    }
];

const results = {
    1: {
        title: "Cozy Solo Activity",
        description: "A relaxing activity you can enjoy on your own.",
        activities: ["Read a book", "Play a video game", "Draw or paint", "Try another art form"]
    },
    2: {
        title: "Laid-Back Social Outing",
        description: "A chill activity to enjoy with others.",
        activities: ["Visit a coffee shop", "Browse a bookstore", "Try an art studio", "Walk through a park", "Go hiking", "Visit a farmer's market", "Explore a museum", "Visit a zoo or aquarium", "Try a friendly escape room"]
    },
    3: {
        title: "High-Energy Solo Adventure",
        description: "An exciting activity to get your adrenaline going on your own.",
        activities: ["Go skateboarding", "Try rock climbing or bouldering", "Visit a nightclub"]
    },
    4: {
        title: "High-Energy Group Experience",
        description: "An exciting activity to share with a group.",
        activities: ["Go to a concert", "Try a bar crawl", "Visit a nightclub", "Spend a day at an amusement park", "Try a horror escape room"]
    },
    5: {
        title: "Cozy Indoor Hangout",
        description: "A laid-back indoor activity to enjoy with friends.",
        activities: ["Play a video game together", "Play a board game", "Have a movie marathon", "Bake something together"]
    }
};

let currentQuestion = 0;
const answers = [];

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const questionCounter = document.getElementById("question-counter");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const resultTitle = document.getElementById("result-title");
const resultDescription = document.getElementById("result-description");
const resultList = document.getElementById("result-list");
const restartBtn = document.getElementById("restart-btn");

function loadQuestion(index) {
    const question = questions[index];
    questionText.textContent = question.text;
    questionCounter.textContent = `Question ${index + 1} of ${questions.length}`;
    optionsContainer.innerHTML = "";
    nextBtn.disabled = true;

    question.options.forEach(option => {
        const label = document.createElement("label");
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "answer";
        input.value = option;

        input.addEventListener("change", () => {
            nextBtn.disabled = false;
        });

        label.appendChild(input);
        label.appendChild(document.createTextNode(" " + option));
        optionsContainer.appendChild(label);
        optionsContainer.appendChild(document.createElement("br"));
    });
}

function getResult() {
    // Primary drivers: Q6 (index 5) intensity, Q3 (index 2) alone/with others, Q2 (index 1) inside/outside
    const intensity = answers[5];
    const group = answers[2];
    const location = answers[1];

    if (intensity === "Laid-back" && group === "Alone") return results[1];
    if (intensity === "Laid-back" && group === "With others" && location === "Inside") return results[5];
    if (intensity === "Laid-back" && group === "With others") return results[2];
    if (intensity === "High-intensity" && group === "Alone") return results[3];
    if (intensity === "High-intensity" && group === "With others") return results[4];

    // Fallback (shouldn't normally be reached)
    return results[1];
}

function showResult() {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";

    const result = getResult();
    resultTitle.textContent = result.title;
    resultDescription.textContent = result.description;
    resultList.innerHTML = "";
    result.activities.forEach(activity => {
        const li = document.createElement("li");
        li.textContent = activity;
        resultList.appendChild(li);
    });
}

function restartQuiz() {
    currentQuestion = 0;
    answers.length = 0;
    quizContainer.style.display = "block";
    resultContainer.style.display = "none";
    loadQuestion(0);
}

nextBtn.addEventListener("click", () => {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) return;

    answers[currentQuestion] = selected.value;
    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion(currentQuestion);
    } else {
        showResult();
    }
});

restartBtn.addEventListener("click", restartQuiz);

// Initialize
loadQuestion(0);
