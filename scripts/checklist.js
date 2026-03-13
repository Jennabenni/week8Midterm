const checklists = {
    // Result 1 - Cozy Solo Activity
    "Read a book": [
        "A book of your choice",
        "Comfortable seating",
        "Reading light",
        "Bookmark",
        "Snack or drink"
    ],
    "Play a video game": [
        "Gaming console or PC",
        "Controller (charged)",
        "TV or monitor",
        "Game of your choice",
        "Snacks"
    ],
    "Draw or paint": [
        "Sketchbook or canvas",
        "Pencils, pens, or brushes",
        "Paint or markers",
        "Eraser",
        "Reference image (optional)"
    ],
    "Try another art form": [],

    // Result 2 - Laid-Back Social Outing
    "Walk through a park": [
        "Comfortable shoes",
        "Water bottle",
        "Sunscreen",
        "Weather-appropriate clothing"
    ],
    "Go hiking": [
        "Hiking shoes",
        "Backpack",
        "Water bottle",
        "Snacks",
        "Sunscreen",
        "Phone or map"
    ],
    "Visit a farmer's market": [
        "Reusable bag",
        "Cash or card",
        "Comfortable shoes",
        "List of what you want to buy"
    ],
    "Visit a zoo or aquarium": [
        "Tickets or reservation",
        "Comfortable shoes",
        "Water bottle",
        "Snack",
        "Camera or phone"
    ],
    "Try a friendly escape room": [
        "Reservation or tickets",
        "Valid ID",
        "Cash or card"
    ],

    // Result 3 - High-Energy Solo Adventure
    "Go skateboarding": [
        "Skateboard",
        "Helmet",
        "Knee pads",
        "Comfortable shoes",
        "Water bottle"
    ],
    "Try rock climbing or bouldering": [
        "Climbing shoes",
        "Chalk bag",
        "Water bottle",
        "Comfortable athletic clothes"
    ],
    "Visit a nightclub": [
        "Valid ID",
        "Comfortable shoes",
        "Cash or card",
        "Earplugs (optional)"
    ],

    // Result 4 - High-Energy Group Experience
    "Go to a concert": [
        "Tickets",
        "Valid ID",
        "Cash or card",
        "Comfortable shoes",
        "Earplugs"
    ],
    "Try a bar crawl": [
        "Valid ID",
        "Cash or card",
        "Comfortable shoes",
        "Fully charged phone",
        "Water bottle"
    ],
    "Spend a day at an amusement park": [
        "Tickets",
        "Comfortable shoes",
        "Sunscreen",
        "Water bottle",
        "Cash or card",
        "Camera or phone"
    ],
    "Try a horror escape room": [
        "Reservation or tickets",
        "Valid ID",
        "Cash or card"
    ],

    // Result 5 - Cozy Indoor Hangout
    "Play a video game together": [
        "Gaming console or PC",
        "Extra controllers (charged)",
        "TV or monitor",
        "Game of your choice",
        "Snacks"
    ],
    "Play a board game": [
        "Board game",
        "Snacks",
        "Drinks",
        "Table with enough space for all players"
    ],
    "Have a movie marathon": [
        "Streaming service or movies",
        "Snacks",
        "Drinks",
        "Blankets",
        "Comfortable seating"
    ],
    "Bake something together": [
        "Recipe",
        "Ingredients",
        "Mixing bowls and utensils",
        "Baking pans",
        "Oven mitts"
    ]
};

const params = new URLSearchParams(window.location.search);
const activity = params.get("activity");

const title = document.getElementById("checklist-title");
const container = document.getElementById("checklist-container");

if (!activity) {
    title.textContent = "No activity selected";
    container.textContent = "Please go back to the quiz and select an activity.";
} else {
    title.textContent = activity;

    const items = checklists[activity];

    if (items === undefined || items === null) {
        // Activity exists but has no matching checklist data
        const msg = document.createElement("p");
        msg.textContent = "No specific items are needed for this activity. Just show up and have fun!";
        container.appendChild(msg);
    } else if (items.length === 0) {
        const msg = document.createElement("p");
        msg.textContent = "No specific items are needed for this activity. Just show up and have fun!";
        container.appendChild(msg);
    } else {
        const list = document.createElement("ul");
        list.id = "checklist-items";

        items.forEach(item => {
            const li = document.createElement("li");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = item;

            checkbox.addEventListener("change", () => {
                label.classList.toggle("crossed-off", checkbox.checked);
            });

            const label = document.createElement("label");
            label.htmlFor = item;
            label.textContent = item;

            li.appendChild(checkbox);
            li.appendChild(label);
            list.appendChild(li);
        });

        container.appendChild(list);
    }
}
