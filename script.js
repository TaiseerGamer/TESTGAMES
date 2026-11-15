
// =====================================
// FOOD BOX SIMULATOR
// =====================================

let money = 0;
let boxesOpened = 0;
let inventory = {};
let clickValue = 1;

// =====================================
// BOX SETTINGS
// =====================================

const boxes = {
    basic: {
        name: "Basic Box",
        price: 25,
        luck: 1
    },

    premium: {
        name: "Premium Box",
        price: 100,
        luck: 1.7
    },

    legendary: {
        name: "Legendary Box",
        price: 300,
        luck: 2.6
    }
};

// =====================================
// FOOD DATABASE
// =====================================

const foods = [
    // COMMON
    { name: "Apple", emoji: "🍎", rarity: "Common" },
    { name: "Banana", emoji: "🍌", rarity: "Common" },
    { name: "Bread", emoji: "🍞", rarity: "Common" },
    { name: "Cookie", emoji: "🍪", rarity: "Common" },
    { name: "Carrot", emoji: "🥕", rarity: "Common" },
    { name: "Potato", emoji: "🥔", rarity: "Common" },
    { name: "Egg", emoji: "🥚", rarity: "Common" },
    { name: "Donut", emoji: "🍩", rarity: "Common" },

    // UNCOMMON
    { name: "Burger", emoji: "🍔", rarity: "Uncommon" },
    { name: "Pizza", emoji: "🍕", rarity: "Uncommon" },
    { name: "Sandwich", emoji: "🥪", rarity: "Uncommon" },
    { name: "Taco", emoji: "🌮", rarity: "Uncommon" },
    { name: "Popcorn", emoji: "🍿", rarity: "Uncommon" },
    { name: "Pancakes", emoji: "🥞", rarity: "Uncommon" },

    // RARE
    { name: "Sushi", emoji: "🍣", rarity: "Rare" },
    { name: "Ramen", emoji: "🍜", rarity: "Rare" },
    { name: "Steak", emoji: "🥩", rarity: "Rare" },
    { name: "Shrimp", emoji: "🍤", rarity: "Rare" },
    { name: "Ice Cream", emoji: "🍨", rarity: "Rare" },

    // EPIC
    { name: "Lobster", emoji: "🦞", rarity: "Epic" },
    { name: "Birthday Cake", emoji: "🎂", rarity: "Epic" },
    { name: "Chocolate Cake", emoji: "🍰", rarity: "Epic" },
    { name: "Golden Apple", emoji: "🍏", rarity: "Epic" },

    // LEGENDARY
    { name: "Golden Burger", emoji: "🍔✨", rarity: "Legendary" },
    { name: "Golden Pizza", emoji: "🍕✨", rarity: "Legendary" },
    { name: "Royal Cake", emoji: "🎂👑", rarity: "Legendary" },

    // MYTHIC
    { name: "Rainbow Donut", emoji: "🍩🌈", rarity: "Mythic" },
    { name: "Cosmic Burger", emoji: "🍔🌌", rarity: "Mythic" },
    { name: "Galaxy Pizza", emoji: "🍕🌌", rarity: "Mythic" }
];

// =====================================
// RARITY SETTINGS
// =====================================

// Higher rarity = higher index.
// Luck increases the weight of higher rarities.

const raritySettings = [
    { name: "Common", weight: 55 },
    { name: "Uncommon", weight: 25 },
    { name: "Rare", weight: 12 },
    { name: "Epic", weight: 5 },
    { name: "Legendary", weight: 2.5 },
    { name: "Mythic", weight: 0.5 }
];

// =====================================
// SAVE AND LOAD
// =====================================

function saveGame() {
    const saveData = {
        money,
        boxesOpened,
        inventory,
        clickValue
    };

    localStorage.setItem(
        "foodBoxSimulatorSave",
        JSON.stringify(saveData)
    );
}

function loadGame() {
    const saved = localStorage.getItem(
        "foodBoxSimulatorSave"
    );

    if (saved) {
        try {
            const data = JSON.parse(saved);

            money = Math.max(0, Number(data.money) || 0);
            boxesOpened = Math.max(0, Number(data.boxesOpened) || 0);
            clickValue = Math.max(1, Number(data.clickValue) || 1);

            if (
                data.inventory &&
                typeof data.inventory === "object" &&
                !Array.isArray(data.inventory)
            ) {
                inventory = data.inventory;
            }
        } catch (error) {
            console.error("Could not load save:", error);
        }
    }

    updateUI();
}

// =====================================
// MONEY SYSTEM
// =====================================

function earnMoney() {
    money += clickValue;

    updateUI();
    saveGame();
}

document.getElementById("coinButton").addEventListener(
    "click",
    earnMoney
);

// =====================================
// RANDOM RARITY SYSTEM
// =====================================

function getRandomRarity(luck) {

    let weightedRarities = raritySettings.map((rarity, index) => {

        // Apply luck more strongly to higher rarities.
        const boostedWeight =
            rarity.weight * Math.pow(luck, index * 0.85);

        return {
            name: rarity.name,
            weight: boostedWeight
        };
    });

    const totalWeight = weightedRarities.reduce(
        (sum, rarity) => sum + rarity.weight,
        0
    );

    let random = Math.random() * totalWeight;

    for (const rarity of weightedRarities) {
        random -= rarity.weight;

        if (random <= 0) {
            return rarity.name;
        }
    }

    return "Common";
}

// =====================================
// RANDOM FOOD SYSTEM
// =====================================

function getRandomFood(rarity) {

    const availableFoods = foods.filter(
        food => food.rarity === rarity
    );

    const randomIndex = Math.floor(
        Math.random() * availableFoods.length
    );

    return availableFoods[randomIndex];
}

// =====================================
// OPEN BOX SYSTEM
// =====================================

function openBox(boxType) {

    const box = boxes[boxType];

    if (!box) return;

    // Check money
    if (money < box.price) {

        showMessage(
            "❌ Not enough money!",
            `You need $${box.price} to open this box.`
        );

        return;
    }

    // Pay for the box
    money -= box.price;

    // Generate rarity and food
    const rarity = getRandomRarity(box.luck);
    const food = getRandomFood(rarity);

    // Add to inventory
    inventory[food.name] = (inventory[food.name] || 0) + 1;

    // Increase box count
    boxesOpened++;

    // Display result
    showFoodResult(food, box);

    // Update everything
    updateUI();
    updateCollection();
    saveGame();
}

// =====================================
// DISPLAY BOX RESULT
// =====================================

function showFoodResult(food, box) {

    const result = document.getElementById("result");

    const rarityClass = getRarityClass(food.rarity);

    result.innerHTML = `
        <p>🎉 You opened a ${box.name}!</p>

        <div class="result-food">
            ${food.emoji}
        </div>

        <div class="result-name">
            ${food.name}
        </div>

        <div class="result-rarity ${rarityClass}">
            ${food.rarity.toUpperCase()}
        </div>

        <p>You unlocked ${food.name}!</p>

        <p style="color:#f9cf54">
            You now have ${inventory[food.name]}!
        </p>
    `;

    // Restart reveal animation
    const icon = result.querySelector(".result-food");

    icon.style.animation = "none";
    void icon.offsetWidth;
    icon.style.animation = "reveal 0.5s ease";
}

// =====================================
// MESSAGE SYSTEM
// =====================================

function showMessage(title, message) {

    const result = document.getElementById("result");

    result.innerHTML = `
        <h3>${title}</h3>
        <p>${message}</p>
    `;
}

// =====================================
// RARITY CSS CLASSES
// =====================================

function getRarityClass(rarity) {

    const classes = {
        Common: "common",
        Uncommon: "uncommon",
        Rare: "rare",
        Epic: "epic",
        Legendary: "legendary-text",
        Mythic: "mythic"
    };

    return classes[rarity] || "common";
}

// =====================================
// UPDATE MAIN UI
// =====================================

function updateUI() {

    document.getElementById("money").textContent =
        "$" + money.toLocaleString();

    const unlockedCount = foods.filter(
        food => (inventory[food.name] || 0) > 0
    ).length;

    document.getElementById("foodCount").textContent =
        unlockedCount + " / " + foods.length;

    document.getElementById("boxCount").textContent =
        boxesOpened;

    document.getElementById("clickValue").textContent =
        clickValue;
}

// =====================================
// FOOD COLLECTION
// =====================================

function updateCollection() {

    const collection = document.getElementById(
        "foodCollection"
    );

    collection.innerHTML = "";

    foods.forEach(food => {

        const quantity = inventory[food.name] || 0;
        const unlocked = quantity > 0;

        const rarityClass = getRarityClass(food.rarity);

        const borderClass = {
            Common: "common-border",
            Uncommon: "uncommon-border",
            Rare: "rare-border",
            Epic: "epic-border",
            Legendary: "legendary-border",
            Mythic: "mythic-border"
        }[food.rarity];

        const card = document.createElement("div");

        card.className = `food-card ${borderClass}`;

        if (unlocked) {

            card.innerHTML = `
                <div class="food-icon">${food.emoji}</div>
                <h3>${food.name}</h3>
                <p class="${rarityClass}">
                    ${food.rarity}
                </p>
                <p class="quantity">
                    Owned: ${quantity}
                </p>
            `;

        } else {

            card.innerHTML = `
                <div class="food-icon">❓</div>
                <h3>???</h3>
                <p class="${rarityClass}">
                    ${food.rarity}
                </p>
                <p class="quantity">
                    Not unlocked
                </p>
            `;
        }

        collection.appendChild(card);
    });
}

// =====================================
// RESET GAME
// =====================================

document.getElementById("resetButton").addEventListener(
    "click",
    function() {

        const confirmReset = confirm(
            "Are you sure you want to reset your entire game?"
        );

        if (!confirmReset) return;

        money = 0;
        boxesOpened = 0;
        inventory = {};
        clickValue = 1;

        localStorage.removeItem("foodBoxSimulatorSave");

        updateUI();
        updateCollection();

        showMessage(
            "🔄 Game Reset!",
            "Your new food collection adventure starts now!"
        );
    }
);

// =====================================
// START GAME
// =====================================

loadGame();
updateCollection();
