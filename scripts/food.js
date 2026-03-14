const foodOptions = {
    "Hot Food": [
        "Pizza",
        "Ramen",
        "Pho",
        "Miso soup",
        "Hot sandwich",
        "Grilled cheese",
        "Tacos",
        "Stir fry",
        "Pasta",
        "Soup",
        "Fried rice",
        "Burrito",
        "Mac and cheese",
        "Dumplings",
        "Curry"
    ],
    "Cold Food": [
        "Sushi",
        "Cold sandwich",
        "Pie",
        "Ice cream",
        "Salad",
        "Fruit bowl",
        "Yogurt parfait",
        "Caprese salad",
        "Charcuterie board",
        "Overnight oats",
        "Gazpacho",
        "Spring rolls",
        "Poke bowl"
    ],
    "Hot Drink": [
        "Coffee",
        "Tea",
        "Hot chocolate",
        "Chai latte",
        "Matcha latte",
        "Apple cider",
        "Cappuccino",
        "Americano",
        "Herbal tea",
        "Bone broth"
    ],
    "Cold Drink": [
        "Iced coffee",
        "Iced tea",
        "Water",
        "Soda",
        "Lemonade",
        "Smoothie",
        "Juice",
        "Milkshake",
        "Sparkling water",
        "Horchata",
        "Bubble tea"
    ]
};

const generateBtn = document.getElementById("generate-food-btn");
const nextFoodBtn = document.getElementById("next-food-btn");
const foodResult = document.getElementById("food-result");
const foodSuggestion = document.getElementById("food-suggestion");

let shuffledList = [];
let currentIndex = 0;

// Enable generate button only when both questions are answered
document.querySelectorAll("input[name='temp'], input[name='type']").forEach(input => {
    input.addEventListener("change", () => {
        const tempSelected = document.querySelector("input[name='temp']:checked");
        const typeSelected = document.querySelector("input[name='type']:checked");
        generateBtn.disabled = !(tempSelected && typeSelected);
    });
});

function getCategory() {
    const temp = document.querySelector("input[name='temp']:checked").value;
    const type = document.querySelector("input[name='type']:checked").value;
    return `${temp} ${type}`;
}

function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

generateBtn.addEventListener("click", () => {
    const category = getCategory();
    shuffledList = shuffle(foodOptions[category]);
    currentIndex = 0;

    foodSuggestion.textContent = shuffledList[currentIndex];
    foodResult.style.display = "block";
    currentIndex++;
});

nextFoodBtn.addEventListener("click", () => {
    // Reshuffle when the full list has been cycled through
    if (currentIndex >= shuffledList.length) {
        const category = getCategory();
        shuffledList = shuffle(foodOptions[category]);
        currentIndex = 0;
    }

    foodSuggestion.textContent = shuffledList[currentIndex];
    currentIndex++;
});

// Reshuffle and restart when questions change after a result is shown
document.querySelectorAll("input[name='temp'], input[name='type']").forEach(input => {
    input.addEventListener("change", () => {
        foodResult.style.display = "none";
        foodSuggestion.textContent = "";
        shuffledList = [];
        currentIndex = 0;
    });
});
