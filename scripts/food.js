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
const foodResult = document.getElementById("food-result");
const foodSuggestion = document.getElementById("food-suggestion");

let shuffledList = [];
let currentIndex = 0;

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

// Enable/disable generate button and reset cycle when questions change
document.querySelectorAll("input[name='temp'], input[name='type']").forEach(input => {
    input.addEventListener("change", () => {
        const tempSelected = document.querySelector("input[name='temp']:checked");
        const typeSelected = document.querySelector("input[name='type']:checked");
        generateBtn.disabled = !(tempSelected && typeSelected);
        shuffledList = [];
        currentIndex = 0;
        foodResult.style.display = "none";
        foodSuggestion.textContent = "";
    });
});

// Generate cycles through the shuffled list, reshuffling when exhausted
generateBtn.addEventListener("click", () => {
    if (shuffledList.length === 0 || currentIndex >= shuffledList.length) {
        shuffledList = shuffle(foodOptions[getCategory()]);
        currentIndex = 0;
    }

    foodSuggestion.textContent = shuffledList[currentIndex];
    foodResult.style.display = "block";
    currentIndex++;
});
