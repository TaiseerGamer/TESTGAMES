// Game State
let money = 0;
let clickValue = 1;
const unlockedFoods = new Set();

// Food Database with Rarities and Click Power Bonuses
const foods = [
    { id: 'apple', name: 'Crisp Apple', emoji: '🍎', rarity: 'Common', bonus: 1 },
    { id: 'bread', name: 'Fresh Bread', emoji: '🍞', rarity: 'Common', bonus: 1 },
    { id: 'banana', name: 'Ripe Banana', emoji: '🍌', rarity: 'Common', bonus: 1 },
    { id: 'cheese', name: 'Cheddar Wedge', emoji: '🧀', rarity: 'Common', bonus: 2 },
    
    { id: 'burger', name: 'Double Burger', emoji: '🍔', rarity: 'Rare', bonus: 4 },
    { id: 'pizza', name: 'Pepperoni Pizza', emoji: '🍕', rarity: 'Rare', bonus: 5 },
    { id: 'taco', name: 'Spicy Taco', emoji: '🌮', rarity: 'Rare', bonus: 5 },
    
    { id: 'sushi', name: 'Dragon Roll', emoji: '🍣', rarity: 'Epic', bonus: 12 },
    { id: 'ramen', name: 'Tonkotsu Ramen', emoji: '🍜', rarity: 'Epic', bonus: 15 },
    { id: 'steak', name: 'Wagyu Steak', emoji: '🥩', rarity: 'Epic', bonus: 18 },
    
    { id: 'cake', name: 'Golden Cake', emoji: '🎂', rarity: 'Legendary', bonus: 40 },
    { id: 'ambrosia', name: 'Royal Feast', emoji: '👑', rarity: 'Legendary', bonus: 75 }
];

// Loot Box Rarity Probabilities (Must add up to 100)
const boxOdds = {
    basic:  { Common: 70, Rare: 25, Epic: 4,  Legendary: 1 },
    silver: { Common: 35, Rare: 45, Epic: 15, Legendary: 5 },
    golden: { Common: 5,  Rare: 35, Epic: 40, Legendary: 20 }
};

// DOM Elements
const moneyEl = document.getElementById('money');
const clickValueEl = document.getElementById('click-value');
const coinBtn = document.getElementById('coin-btn');
const buyBtns = document.querySelectorAll('.buy-btn');
const unboxResultEl = document.getElementById('unbox-result');
const foodGridEl = document.getElementById('food-grid');
const unlockedCountEl = document.getElementById('unlocked-count');
const totalCountEl = document.getElementById('total-count');

// Initialize Game
function init() {
    totalCountEl.textContent = foods.length;
    renderInventory();
    updateUI();
}

// Click the Coin
coinBtn.addEventListener('click', () => {
    money += clickValue;
    updateUI();
});

// Buy a Box
buyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const boxType = btn.dataset.box;
        const cost = parseInt(btn.dataset.cost, 10);

        if (money >= cost) {
            money -= cost;
            openBox(boxType);
            updateUI();
        }
    });
});

// Roll Rarity and Select Food
function openBox(boxType) {
    const odds = boxOdds[boxType];
    const roll = Math.random() * 100;
    let cumulative = 0;
    let chosenRarity = 'Common';

    for (const [rarity, chance] of Object.entries(odds)) {
        cumulative += chance;
        if (roll < cumulative) {
            chosenRarity = rarity;
            break;
        }
    }

    // Filter foods matching the rolled rarity
    const possibleFoods = foods.filter(f => f.rarity === chosenRarity);
    const wonFood = possibleFoods[Math.floor(Math.random() * possibleFoods.length)];

    const isNew = !unlockedFoods.has(wonFood.id);
    if (isNew) {
        unlockedFoods.add(wonFood.id);
        recalculateClickPower();
        renderInventory();
    }

    showResult(wonFood, isNew);
}

// Recalculate Total Click Value
function recalculateClickPower() {
    let total = 1; // Base click value
    unlockedFoods.forEach(id => {
        const food = foods.find(f => f.id === id);
        if (food) total += food.bonus;
    });
    clickValue = total;
}

// Display Unboxing Result
function showResult(food, isNew) {
    unboxResultEl.className = `unbox-result rarity-${food.rarity}`;
    
    // Trigger reflow to restart CSS animation
    void unboxResultEl.offsetWidth; 

    if (isNew) {
        unboxResultEl.innerHTML = `🎉 NEW UNLOCK! You got ${food.emoji} <strong>${food.name}</strong> (${food.rarity})! (+$${food.bonus}/click)`;
    } else {
        const refund = Math.max(1, Math.floor(food.bonus / 2));
        money += refund;
        unboxResultEl.innerHTML = `You got a duplicate ${food.emoji} <strong>${food.name}</strong> (${food.rarity}). Converted to +$${refund}!`;
    }
}

// Render Food Collection Grid
function renderInventory() {
    foodGridEl.innerHTML = '';
    unlockedCountEl.textContent = unlockedFoods.size;

    foods.forEach(food => {
        const isUnlocked = unlockedFoods.has(food.id);
        const card = document.createElement('div');
        card.className = `food-card ${isUnlocked ? `rarity-${food.rarity}` : 'locked'}`;

        card.innerHTML = `
            <div class="food-emoji">${isUnlocked ? food.emoji : '❓'}</div>
            <div class="food-name">${isUnlocked ? food.name : 'Locked'}</div>
            <div class="food-rarity">${food.rarity}</div>
            <div class="food-bonus">${isUnlocked ? `+$${food.bonus}/click` : '???'}</div>
        `;
        foodGridEl.appendChild(card);
    });
}

// Update Numbers & Button States
function updateUI() {
    moneyEl.textContent = money;
    clickValueEl.textContent = clickValue;
    coinBtn.textContent = `+$${clickValue}`;

    buyBtns.forEach(btn => {
        const cost = parseInt(btn.dataset.cost, 10);
        btn.disabled = money < cost;
    });
}

init();