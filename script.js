/* Coin Kitchen v0.0.0 */
(() => {
  "use strict";

  const SAVE_VERSION = 1;
  const KEY = "coin-kitchen-v0";
  const BAK = "coin-kitchen-v0-bak";
  const HOLD_EVERY = 0.16;

  const RARITIES = [
    { id: "common", label: "Common" },
    { id: "uncommon", label: "Uncommon" },
    { id: "rare", label: "Rare" },
    { id: "epic", label: "Epic" },
    { id: "legendary", label: "Legendary" },
  ];

  const DUPE = { common: 2, uncommon: 8, rare: 22, epic: 60, legendary: 120 };

  const KICKER = {
    common: "New food!",
    uncommon: "Uncommon find!",
    rare: "Rare find!",
    epic: "Epic find!",
    legendary: "Legendary find!",
  };

  function sticker(inner) {
    return `<svg class="ico" viewBox="0 0 64 64" aria-hidden="true">${inner}</svg>`;
  }

  const INK = 'stroke="#3b2416" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"';

  const ICONS = {
    apple: sticker(
      `<path d="M34 16c2-6 9-8 13-5" fill="none" ${INK}/><ellipse cx="44" cy="14" rx="6" ry="3.2" fill="#3f7d46" ${INK} transform="rotate(-18 44 14)"/><path d="M32 22c10 0 16 8 16 16 0 12-8 20-16 20s-16-8-16-20c0-8 6-16 16-16z" fill="#e23d3d" ${INK}/><ellipse cx="26" cy="32" rx="3" ry="5" fill="#fff" opacity=".35"/>`,
    ),
    bread: sticker(
      `<path d="M12 34c0-10 8-16 20-16s20 6 20 16v10c0 4-4 8-10 8H22c-6 0-10-4-10-8z" fill="#f0c37a" ${INK}/><path d="M18 30h28M20 36h24" fill="none" ${INK}/>`,
    ),
    carrot: sticker(
      `<path d="M32 18c10 8 14 20 10 34-8 2-16 2-20 0C16 38 20 26 32 18z" fill="#f08a24" ${INK}/><path d="M24 14c4 4 6 6 8 8M32 12c2 6 2 8 0 12M40 16c-4 4-6 6-8 8" fill="none" stroke="#2f7d46" stroke-width="2.4" stroke-linecap="round"/>`,
    ),
    milk: sticker(
      `<path d="M24 14h16l4 8v28a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4V22z" fill="#fffaf3" ${INK}/><path d="M22 22h22" fill="none" ${INK}/><rect x="26" y="28" width="12" height="10" rx="2" fill="#d7ecf7" ${INK}/>`,
    ),
    banana: sticker(
      `<path d="M18 26c8-10 22-12 30-4 4 4 4 10-2 16-8 8-18 14-28 12 2-8 4-16 0-24z" fill="#ffe14a" ${INK}/><path d="M22 28c6 2 12 8 16 16" fill="none" stroke="#a86b09" stroke-width="2" stroke-linecap="round"/>`,
    ),
    cookie: sticker(
      `<circle cx="32" cy="34" r="16" fill="#e2b36a" ${INK}/><circle cx="26" cy="30" r="2" fill="#6a3b22"/><circle cx="36" cy="28" r="2.2" fill="#6a3b22"/><circle cx="34" cy="38" r="2" fill="#6a3b22"/><circle cx="26" cy="40" r="1.7" fill="#6a3b22"/>`,
    ),
    pizza: sticker(
      `<path d="M16 22h34L33 52z" fill="#f0c37a" ${INK}/><path d="M20 26l12 22" fill="none" stroke="#c23b28" stroke-width="6" stroke-linecap="round"/><circle cx="28" cy="32" r="2.3" fill="#c23b28"/><circle cx="34" cy="40" r="2.3" fill="#2f7d46"/>`,
    ),
    burger: sticker(
      `<path d="M16 28c0-6 6-10 16-10s16 4 16 10H16z" fill="#e2b36a" ${INK}/><rect x="16" y="30" width="32" height="5" rx="1" fill="#2f7d46" ${INK}/><rect x="16" y="36" width="32" height="6" fill="#8d4b2a" ${INK}/><path d="M16 44h32c0 5-6 8-16 8s-16-3-16-8z" fill="#f0c37a" ${INK}/>`,
    ),
    cone: sticker(
      `<path d="M26 30l6 24 6-24z" fill="#e2b36a" ${INK}/><circle cx="32" cy="26" r="10" fill="#f2a3c0" ${INK}/><circle cx="26" cy="24" r="6" fill="#fffaf3" ${INK}/>`,
    ),
    taco: sticker(
      `<path d="M10 26h44c-2 16-10 24-22 24S12 42 10 26z" fill="#f0c37a" ${INK}/><path d="M16 28c4 8 10 12 16 12s12-4 16-12" fill="#2f7d46" ${INK}/><path d="M20 30c2 4 6 6 12 6" fill="none" stroke="#c23b28" stroke-width="3" stroke-linecap="round"/>`,
    ),
    sushi: sticker(
      `<rect x="14" y="22" width="36" height="22" rx="11" fill="#2b2b2b" ${INK}/><rect x="18" y="26" width="28" height="14" rx="7" fill="#fffaf3"/><circle cx="32" cy="33" r="4" fill="#f08a24" stroke="#3b2416" stroke-width="1.6"/>`,
    ),
    donut: sticker(
      `<circle cx="32" cy="34" r="16" fill="#f2a3c0" ${INK}/><circle cx="32" cy="34" r="6" fill="#f4ead7" ${INK}/><path d="M24 24l2 3M36 22l1 3M42 32l3 1M22 38l3-1" stroke="#fff" stroke-width="2" stroke-linecap="round"/>`,
    ),
    ramen: sticker(
      `<path d="M12 30h40v4c0 12-8 20-20 20S12 46 12 34z" fill="#fffaf3" ${INK}/><path d="M18 34c4 3 6 3 10 0s6-3 10 0 6 3 8 0" fill="none" stroke="#e2a01a" stroke-width="2.4"/><circle cx="40" cy="40" r="4" fill="#f0c37a" ${INK}/><path d="M22 18v8M32 16v10M42 18v8" fill="none" ${INK}/>`,
    ),
    waffle: sticker(
      `<rect x="14" y="18" width="36" height="32" rx="6" fill="#e2b36a" ${INK}/><path d="M14 28h36M14 38h36M26 18v32M38 18v32" fill="none" ${INK}/><rect x="28" y="14" width="10" height="8" rx="2" fill="#ffe14a" ${INK}/>`,
    ),
    mac: sticker(
      `<path d="M12 28h40v6c0 12-8 18-20 18S12 46 12 34z" fill="#f0c37a" ${INK}/><path d="M20 34c4 4 8 4 12 0s8-4 12 0" fill="none" stroke="#e2a01a" stroke-width="3" stroke-linecap="round"/><path d="M18 26c2-6 6-8 8-4M30 24c2-6 6-8 8-2" fill="none" ${INK}/>`,
    ),
    cupcake: sticker(
      `<path d="M20 36h24l-3 14H23z" fill="#f2a3c0" ${INK}/><path d="M22 36c0-8 6-12 10-12 2-6 10-8 14-2 4 1 6 6 2 10" fill="#c23b28" ${INK}/><circle cx="30" cy="28" r="2" fill="#fff"/>`,
    ),
    parfait: sticker(
      `<path d="M24 16h16l-2 34H26z" fill="#fffaf3" ${INK}/><path d="M25 28h14l-1 8H26z" fill="#f2a3c0"/><path d="M25 40h13l-1 8H26z" fill="#e2a01a"/><circle cx="32" cy="14" r="4" fill="#c23b28" ${INK}/>`,
    ),
    croissant: sticker(
      `<path d="M12 40c8-18 32-22 42-8-8 2-12 6-14 12-6 2-16 2-22 0-2-2-4-3-6-4z" fill="#f0c37a" ${INK}/><path d="M22 34c6-6 14-8 22-4" fill="none" stroke="#a86b09" stroke-width="2"/>`,
    ),
    cake: sticker(
      `<rect x="14" y="36" width="36" height="12" fill="#f2a3c0" ${INK}/><rect x="16" y="28" width="32" height="10" fill="#fffaf3" ${INK}/><rect x="18" y="20" width="28" height="10" fill="#e2a01a" ${INK}/><path d="M32 12v6" ${INK} fill="none"/><circle cx="32" cy="11" r="2.4" fill="#c23b28"/>`,
    ),
    dragon: sticker(
      `<ellipse cx="32" cy="36" rx="14" ry="16" fill="#e85aa0" ${INK}/><path d="M24 22c2-8 6-10 8-10s6 2 8 10" fill="#2f7d46" ${INK}/><circle cx="27" cy="34" r="1.3" fill="#2b2b2b"/><circle cx="33" cy="40" r="1.3" fill="#2b2b2b"/><circle cx="30" cy="46" r="1.2" fill="#2b2b2b"/>`,
    ),
    sundae: sticker(
      `<path d="M22 28h20l-3 22H25z" fill="#fffaf3" ${INK}/><circle cx="32" cy="26" r="9" fill="#f2d2b0" ${INK}/><path d="M24 30c6 3 10 3 16 0" fill="none" stroke="#6a3b22" stroke-width="3"/><circle cx="40" cy="18" r="3.5" fill="#c23b28" ${INK}/>`,
    ),
    pie: sticker(
      `<path d="M10 30h44L32 54z" fill="#c23b28" ${INK}/><path d="M10 30c6-8 14-10 22-10s16 2 22 10" fill="#f0c37a" ${INK}/><path d="M32 24l2.2 4.6 5 .6-3.7 3.4.9 5L32 35.2 27.6 37.6l.9-5-3.7-3.4 5-.6z" fill="#ffe14a" stroke="#3b2416" stroke-width="1.4" stroke-linejoin="round"/>`,
    ),
    cotton: sticker(
      `<circle cx="24" cy="28" r="8" fill="#f2a3c0" ${INK}/><circle cx="36" cy="26" r="10" fill="#d7ecf7" ${INK}/><circle cx="32" cy="34" r="8" fill="#fffaf3" ${INK}/><path d="M32 40v14" ${INK} fill="none"/>`,
    ),
    melon: sticker(
      `<circle cx="32" cy="36" r="16" fill="#b7d97a" ${INK}/><path d="M20 30c8 4 16 4 24 0M20 38c8 4 16 4 24 0" fill="none" stroke="#2f7d46" stroke-width="2"/><path d="M26 16h12l-2 6H28z" fill="#e2a01a" ${INK}/><path d="M29 16v-4M35 16v-4M32 16v-6" fill="none" ${INK}/>`,
    ),
  };

  const BOX_ART = {
    sack: `<svg class="ico" viewBox="0 0 96 72" aria-hidden="true"><path d="M30 28h36l6 34H24z" fill="#e2b36a" stroke="#3b2416" stroke-width="2.4" stroke-linejoin="round"/><path d="M34 28c0-8 6-12 14-12s14 4 14 12" fill="#f0c37a" stroke="#3b2416" stroke-width="2.4"/><path d="M40 28c2 6 14 6 16 0" fill="none" stroke="#3b2416" stroke-width="2.2"/><circle cx="48" cy="46" r="6" fill="#c23b28" stroke="#3b2416" stroke-width="2"/></svg>`,
    picnic: `<svg class="ico" viewBox="0 0 96 72" aria-hidden="true"><path d="M22 32h52l-4 26H26z" fill="#c9843a" stroke="#3b2416" stroke-width="2.4"/><path d="M28 40v14M38 38v16M48 38v16M58 38v16M68 40v14" stroke="#e2b36a" stroke-width="2"/><path d="M30 32c4-12 32-12 36 0" fill="none" stroke="#3b2416" stroke-width="2.4"/><path d="M34 24h28v8H34z" fill="#2f7d46" stroke="#3b2416" stroke-width="2"/></svg>`,
    chest: `<svg class="ico" viewBox="0 0 96 72" aria-hidden="true"><path d="M18 30h60v28H18z" fill="#8d4b2a" stroke="#3b2416" stroke-width="2.4"/><path d="M18 30c0-10 12-16 30-16s30 6 30 16" fill="#a86b09" stroke="#3b2416" stroke-width="2.4"/><path d="M18 40h60" stroke="#e2a01a" stroke-width="4"/><rect x="42" y="36" width="12" height="10" rx="2" fill="#e2a01a" stroke="#3b2416" stroke-width="2"/><path d="M36 14h8l-2 6h-4zM52 14h8l-2 6h-4z" fill="#fffaf3" stroke="#3b2416" stroke-width="1.6"/></svg>`,
  };

  const FOODS = [
    { id: "apple", name: "Crisp Apple", rarity: "common", blurb: "Sweet, crunchy, and ready for lunch." },
    { id: "bread", name: "Soft Bread", rarity: "common", blurb: "A warm loaf with a golden crust." },
    { id: "carrot", name: "Garden Carrot", rarity: "common", blurb: "Crunchy and bright orange." },
    { id: "milk", name: "Milk Bottle", rarity: "common", blurb: "Cold and creamy." },
    { id: "banana", name: "Sunny Banana", rarity: "common", blurb: "A pocket snack that peels easy." },
    { id: "cookie", name: "Chip Cookie", rarity: "common", blurb: "Soft, with melty chips." },
    { id: "pizza", name: "Pizza Slice", rarity: "uncommon", blurb: "Cheesy, with a crisp edge." },
    { id: "burger", name: "Mini Burger", rarity: "uncommon", blurb: "A little stack with a sesame top." },
    { id: "cone", name: "Swirl Cone", rarity: "uncommon", blurb: "A cool swirl on a crunchy cone." },
    { id: "taco", name: "Crunchy Taco", rarity: "uncommon", blurb: "A folded shell full of filling." },
    { id: "sushi", name: "Sushi Roll", rarity: "uncommon", blurb: "Rice, nori, and a bright center." },
    { id: "donut", name: "Glazed Donut", rarity: "uncommon", blurb: "A ring with a shiny coat." },
    { id: "ramen", name: "Ramen Bowl", rarity: "rare", blurb: "Noodles, broth, and a soft egg." },
    { id: "waffle", name: "Waffle Stack", rarity: "rare", blurb: "Crisp squares with a pat of butter." },
    { id: "mac", name: "Mac and Cheese", rarity: "rare", blurb: "Noodles in a cozy cheese sauce." },
    { id: "cupcake", name: "Berry Cupcake", rarity: "rare", blurb: "A tall swirl on a paper cup." },
    { id: "parfait", name: "Fruit Parfait", rarity: "rare", blurb: "Layers of fruit and cream." },
    { id: "croissant", name: "Golden Croissant", rarity: "epic", blurb: "Flaky layers, baked gold." },
    { id: "cake", name: "Layer Cake", rarity: "epic", blurb: "Three soft layers with frosting." },
    { id: "dragon", name: "Dragon Fruit", rarity: "epic", blurb: "A pink jewel with tiny seeds." },
    { id: "sundae", name: "Cocoa Sundae", rarity: "epic", blurb: "Ice cream, sauce, and a cherry." },
    { id: "pie", name: "Starberry Pie", rarity: "legendary", blurb: "A pie crowned with a star." },
    { id: "cotton", name: "Cloud Candy", rarity: "legendary", blurb: "A puff of sweet color on a stick." },
    { id: "melon", name: "Crown Melon", rarity: "legendary", blurb: "A royal melon with a tiny crown." },
  ];

  const BOXES = [
    {
      id: "sack",
      name: "Snack Sack",
      price: 15,
      luck: "A little luck",
      tier: 1,
      odds: { common: 70, uncommon: 22, rare: 7, epic: 1, legendary: 0 },
    },
    {
      id: "picnic",
      name: "Picnic Hamper",
      price: 60,
      luck: "Better luck",
      tier: 2,
      odds: { common: 40, uncommon: 30, rare: 18, epic: 9, legendary: 3 },
    },
    {
      id: "chest",
      name: "Chef's Chest",
      price: 180,
      luck: "Best luck",
      tier: 3,
      odds: { common: 12, uncommon: 22, rare: 28, epic: 24, legendary: 14 },
    },
  ];

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const app = document.getElementById("app");
  const coin = document.getElementById("coin");
  const coinsEl = document.getElementById("coins");
  const wallet = document.getElementById("wallet");
  const floaters = document.getElementById("floaters");
  const hint = document.getElementById("hint");
  const toastEl = document.getElementById("toast");
  const boxesEl = document.getElementById("boxes");
  const pantryEl = document.getElementById("pantry");
  const progressLabel = document.getElementById("progress-label");
  const meter = document.getElementById("meter");
  const meterFill = document.getElementById("meter-fill");
  const completeEl = document.getElementById("complete");
  const muteBtn = document.getElementById("mute");
  const iconOn = document.getElementById("icon-on");
  const iconOff = document.getElementById("icon-off");
  const resetBtn = document.getElementById("reset");
  const reveal = document.getElementById("reveal");
  const revealCard = document.getElementById("reveal-card");
  const revealKicker = document.getElementById("reveal-kicker");
  const revealArt = document.getElementById("reveal-art");
  const revealName = document.getElementById("reveal-name");
  const revealRarity = document.getElementById("reveal-rarity");
  const revealBlurb = document.getElementById("reveal-blurb");
  const revealNote = document.getElementById("reveal-note");
  const revealOk = document.getElementById("reveal-ok");
  const revealAgain = document.getElementById("reveal-again");
  const confirmDlg = document.getElementById("confirm");
  const confirmYes = document.getElementById("confirm-yes");
  const confirmNo = document.getElementById("confirm-no");

  let state = load();
  let holding = false;
  let rafId = 0;
  let lastT = 0;
  let acc = 0;
  let holdTicks = 0;
  let audioCtx = null;
  let saveTimer = 0;
  let toastTimer = 0;
  let busy = false;
  let lastBoxId = null;
  let returnFocus = null;

  function clampInt(n, min, max) {
    n = Math.floor(Number(n));
    if (!Number.isFinite(n)) return min;
    return Math.min(max, Math.max(min, n));
  }

  function blankState() {
    return { version: SAVE_VERSION, coins: 0, owned: {}, muted: false };
  }

  function migrate(data) {
    const base = blankState();
    if (!data || typeof data !== "object") return base;
    const owned = {};
    if (data.owned && typeof data.owned === "object") {
      for (const food of FOODS) {
        const n = clampInt(data.owned[food.id], 0, 9999);
        if (n > 0) owned[food.id] = n;
      }
    }
    return {
      version: SAVE_VERSION,
      coins: clampInt(data.coins, 0, 1000000000),
      owned,
      muted: Boolean(data.muted),
    };
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return blankState();
      return migrate(JSON.parse(raw));
    } catch {
      return blankState();
    }
  }

  function persist() {
    clearTimeout(saveTimer);
    try {
      const prev = localStorage.getItem(KEY);
      if (prev) localStorage.setItem(BAK, prev);
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* storage off or full — keep playing in memory */
    }
  }

  function scheduleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(persist, 300);
  }

  function esc(value) {
    return String(value).replace(/[&<>"']/g, (ch) => {
      if (ch === "&") return "&" + "amp;";
      if (ch === "<") return "&" + "lt;";
      if (ch === ">") return "&" + "gt;";
      if (ch === '"') return "&" + "quot;";
      return "&" + "#39;";
    });
  }

  function foundCount() {
    return FOODS.filter((food) => (state.owned[food.id] || 0) > 0).length;
  }

  function rarityOf(id) {
    return RARITIES.find((rarity) => rarity.id === id);
  }

  function anyDialogOpen() {
    return Boolean(document.querySelector("dialog[open]"));
  }

  function toast(message) {
    toastEl.textContent = message;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.textContent = "";
    }, 2200);
  }

  function paintCoins() {
    coinsEl.textContent = state.coins.toLocaleString("en-US");
    wallet.setAttribute("aria-label", `${state.coins} coins`);
  }

  function paintMute() {
    muteBtn.setAttribute("aria-pressed", state.muted ? "true" : "false");
    muteBtn.setAttribute("aria-label", state.muted ? "Turn sound on" : "Mute sound");
    iconOn.hidden = state.muted;
    iconOff.hidden = !state.muted;
  }

  function paintHint() {
    const found = foundCount();
    hint.textContent =
      found === 0
        ? "Tap or hold the coin. Then open a box."
        : "Pricier boxes have better luck at fancy foods.";
  }

  function syncBoxes() {
    for (const box of BOXES) {
      const button = document.getElementById(`open-${box.id}`);
      const short = state.coins < box.price;
      const need = box.price - state.coins;
      button.setAttribute("aria-disabled", short ? "true" : "false");
      button.textContent = short ? `Need ${need} more` : "Open";
      button.setAttribute(
        "aria-label",
        short
          ? `Need ${need} more coins to open ${box.name}`
          : `Open ${box.name} for ${box.price} coins`,
      );
    }
  }

  function paintPantry() {
    const found = foundCount();
    progressLabel.textContent = `${found}/${FOODS.length}`;
    meter.setAttribute("aria-valuemax", String(FOODS.length));
    meter.setAttribute("aria-valuenow", String(found));
    meterFill.style.width = `${(found / FOODS.length) * 100}%`;
    completeEl.hidden = found !== FOODS.length;

    pantryEl.innerHTML = RARITIES.map((rarity) => {
      const group = FOODS.filter((food) => food.rarity === rarity.id);
      const have = group.filter((food) => (state.owned[food.id] || 0) > 0).length;
      const cards = group
        .map((food) => {
          const count = state.owned[food.id] || 0;
          if (!count) {
            return `<div class="food locked"><div class="mystery" aria-hidden="true">?</div><span class="food-name">Unknown</span></div>`;
          }
          const badge = count > 1 ? `<span class="badge">×${count}</span>` : "";
          return `<button type="button" class="food owned" data-food="${food.id}" data-owned="1">
            ${badge}
            ${ICONS[food.id]}
            <span class="food-name">${esc(food.name)}</span>
          </button>`;
        })
        .join("");
      return `<section class="rarity-block">
        <h3 class="rarity-h ${rarity.id}"><span class="swatch ${rarity.id}"></span>${esc(rarity.label)}<span class="frac">${have}/${group.length}</span></h3>
        <div class="foods">${cards}</div>
      </section>`;
    }).join("");
  }

  function renderBoxes() {
    boxesEl.innerHTML = BOXES.map((box) => {
      const bars = RARITIES.map(
        (rarity) =>
          `<span class="${rarity.id}" style="flex-grow:${box.odds[rarity.id] || 0}"></span>`,
      ).join("");
      const chances = RARITIES.map(
        (rarity) =>
          `<li><span class="swatch ${rarity.id}"></span>${esc(rarity.label)} ${box.odds[rarity.id] || 0}%</li>`,
      ).join("");
      const pips = [1, 2, 3]
        .map((n) => `<span class="pip${n <= box.tier ? " on" : ""}"></span>`)
        .join("");
      return `<article class="box tier-${box.tier}" data-box-card="${box.id}">
        <div class="box-art">${BOX_ART[box.id]}</div>
        <h3>${esc(box.name)}</h3>
        <p class="luck">${esc(box.luck)}</p>
        <div class="pips" aria-hidden="true">${pips}</div>
        <p class="price"><strong>${box.price}</strong> <span>coins</span></p>
        <div class="odds" aria-hidden="true">${bars}</div>
        <details>
          <summary>Chances</summary>
          <ul class="chances">${chances}</ul>
        </details>
        <button type="button" class="open" id="open-${box.id}" data-open="${box.id}">Open</button>
      </article>`;
    }).join("");
  }

  function paintAll() {
    paintCoins();
    paintMute();
    paintHint();
    syncBoxes();
    paintPantry();
  }

  function ensureAudio() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    if (!audioCtx) audioCtx = new AudioCtx();
    if (audioCtx.state === "suspended") audioCtx.resume();
    return audioCtx;
  }

  function blip(freq, dur, type, vol) {
    const ctx = audioCtx;
    if (!ctx || state.muted) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq * (0.97 + Math.random() * 0.06);
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + dur);
  }

  function coinSound(soft) {
    blip(soft ? 660 : 880, soft ? 0.04 : 0.07, "sine", soft ? 0.028 : 0.05);
  }

  function playRevealSound(rarity) {
    const notes = {
      common: [523],
      uncommon: [523, 659],
      rare: [523, 659, 784],
      epic: [523, 659, 784, 1046],
      legendary: [392, 523, 659, 784, 1046],
    }[rarity];
    notes.forEach((freq, index) => {
      setTimeout(() => blip(freq, 0.14, "triangle", 0.05), index * 90);
    });
  }

  function pulseCoin() {
    if (reduceMotion) return;
    coin.classList.remove("pulse");
    void coin.offsetWidth;
    coin.classList.add("pulse");
  }

  function spawnFloater(amount) {
    if (reduceMotion) return;
    if (floaters.childElementCount > 12) return;
    const el = document.createElement("span");
    el.className = "floater";
    el.textContent = `+${amount}`;
    el.style.left = `${42 + Math.random() * 16}%`;
    el.style.top = "22%";
    floaters.appendChild(el);
    setTimeout(() => el.remove(), 720);
  }

  function earn(amount, opts = {}) {
    state.coins += amount;
    paintCoins();
    syncBoxes();
    if (opts.float) spawnFloater(amount);
    if (opts.sound) coinSound(Boolean(opts.soft));
    if (opts.pulse) pulseCoin();
    scheduleSave();
  }

  function stopHold() {
    holding = false;
    coin.classList.remove("is-down");
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
    lastT = 0;
    acc = 0;
    holdTicks = 0;
  }

  function tick(t) {
    if (!holding) return;
    if (!lastT) lastT = t;
    const dt = Math.min(0.05, (t - lastT) / 1000);
    lastT = t;
    acc += dt;
    let guard = 0;
    while (acc >= HOLD_EVERY && guard < 3) {
      acc -= HOLD_EVERY;
      guard += 1;
      holdTicks += 1;
      earn(1, {
        float: holdTicks % 3 === 0,
        sound: true,
        soft: true,
        pulse: holdTicks % 2 === 0,
      });
    }
    rafId = requestAnimationFrame(tick);
  }

  function startHold() {
    if (holding || busy || anyDialogOpen()) return;
    ensureAudio();
    holding = true;
    coin.classList.add("is-down");
    earn(1, { float: true, sound: true, pulse: true });
    lastT = 0;
    acc = 0;
    holdTicks = 0;
    rafId = requestAnimationFrame(tick);
  }

  function roll(box) {
    const entries = RARITIES.map((rarity) => [rarity.id, box.odds[rarity.id] || 0]).filter(
      ([, weight]) => weight > 0,
    );
    let total = 0;
    for (const [, weight] of entries) total += weight;
    let pick = Math.random() * total;
    let rarity = entries[0][0];
    for (const [id, weight] of entries) {
      pick -= weight;
      if (pick < 0) {
        rarity = id;
        break;
      }
    }
    const pool = FOODS.filter((food) => food.rarity === rarity);
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function showReveal(food, opts) {
    const rarity = rarityOf(food.rarity);
    revealCard.className = `reveal-card r-${food.rarity}`;
    revealArt.innerHTML = ICONS[food.id];
    revealName.textContent = food.name;
    revealRarity.innerHTML = `<span class="swatch ${food.rarity}"></span>${esc(rarity.label)}`;
    revealBlurb.textContent = food.blurb;
    if (opts.inspect) {
      revealKicker.textContent = "In your pantry";
      const count = state.owned[food.id] || 0;
      revealNote.textContent = count > 1 ? `You have ${count}.` : "You have 1.";
      revealOk.textContent = "Close";
      revealAgain.hidden = true;
    } else if (opts.isNew) {
      revealKicker.textContent = KICKER[food.rarity];
      revealNote.textContent = "Added to your pantry.";
      revealOk.textContent = "Nice!";
      paintAgain();
    } else {
      revealKicker.textContent = "Already collected";
      revealNote.textContent = `You already had this. +${opts.bonus} coins back.`;
      revealOk.textContent = "Nice!";
      paintAgain();
    }
    returnFocus = document.activeElement;
    reveal.showModal();
  }

  function paintAgain() {
    const box = BOXES.find((item) => item.id === lastBoxId);
    if (!box || state.coins < box.price) {
      revealAgain.hidden = true;
      return;
    }
    revealAgain.hidden = false;
    revealAgain.textContent = `Open another · ${box.price}`;
  }

  function openBox(id) {
    if (busy) return;
    const box = BOXES.find((item) => item.id === id);
    if (!box) return;
    if (state.coins < box.price) {
      const card = document.querySelector(`[data-box-card="${id}"]`);
      card.classList.remove("nudge");
      void card.offsetWidth;
      card.classList.add("nudge");
      toast(`Keep tapping! You need ${box.price - state.coins} more coins.`);
      return;
    }
    stopHold();
    busy = true;
    ensureAudio();
    state.coins -= box.price;
    const food = roll(box);
    const prev = state.owned[food.id] || 0;
    const isNew = prev === 0;
    state.owned[food.id] = prev + 1;
    let bonus = 0;
    if (!isNew) {
      bonus = DUPE[food.rarity];
      state.coins += bonus;
    }
    lastBoxId = id;
    paintAll();
    persist();
    playRevealSound(food.rarity);
    if (!reduceMotion && (food.rarity === "epic" || food.rarity === "legendary")) {
      app.classList.remove("shake", "shake-lg");
      void app.offsetWidth;
      app.classList.add(food.rarity === "legendary" ? "shake-lg" : "shake");
    }
    const found = foundCount();
    toastEl.textContent = "";
    showReveal(food, { isNew, bonus });
    const label = rarityOf(food.rarity).label;
    toast(
      isNew
        ? `${food.name}, ${label}. New food. Pantry ${found} of ${FOODS.length}.`
        : `${food.name} again. Plus ${bonus} coins.`,
    );
  }

  function closeReveal() {
    if (reveal.open) reveal.close();
  }

  coin.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    event.preventDefault();
    try {
      coin.setPointerCapture(event.pointerId);
    } catch {
      /* already released, or a synthetic pointer */
    }
    startHold();
  });
  coin.addEventListener("pointerup", stopHold);
  coin.addEventListener("pointercancel", stopHold);
  coin.addEventListener("lostpointercapture", stopHold);
  coin.addEventListener("contextmenu", (event) => event.preventDefault());
  coin.addEventListener("animationend", () => coin.classList.remove("pulse"));

  document.addEventListener("keydown", (event) => {
    if (event.key !== " " && event.key !== "Enter") return;
    if (anyDialogOpen()) return;
    const active = document.activeElement;
    if (event.key === "Enter" && active !== coin) return;
    if (event.key === " " && active && active.tagName === "BUTTON" && active !== coin) return;
    if (event.key === " " && active && active.tagName === "SUMMARY") return;
    event.preventDefault();
    if (!holding) startHold();
  });
  document.addEventListener("keyup", (event) => {
    if (event.key === " " || event.key === "Enter") stopHold();
  });

  boxesEl.addEventListener("click", (event) => {
    const button = event.target.closest("[data-open]");
    if (!button) return;
    openBox(button.dataset.open);
  });

  pantryEl.addEventListener("click", (event) => {
    const button = event.target.closest("[data-food]");
    if (!button) return;
    const food = FOODS.find((item) => item.id === button.dataset.food);
    if (!food) return;
    showReveal(food, { inspect: true });
  });

  revealOk.addEventListener("click", closeReveal);
  revealAgain.addEventListener("click", () => {
    const id = lastBoxId;
    closeReveal();
    busy = false;
    if (id) openBox(id);
  });
  reveal.addEventListener("close", () => {
    busy = false;
    if (returnFocus && typeof returnFocus.focus === "function") {
      returnFocus.focus({ preventScroll: true });
    }
  });
  reveal.addEventListener("click", (event) => {
    if (event.target === reveal) closeReveal();
  });

  muteBtn.addEventListener("click", () => {
    ensureAudio();
    state.muted = !state.muted;
    paintMute();
    persist();
    if (!state.muted) coinSound(false);
  });

  resetBtn.addEventListener("click", () => {
    stopHold();
    returnFocus = resetBtn;
    confirmDlg.showModal();
  });
  confirmNo.addEventListener("click", () => confirmDlg.close());
  confirmYes.addEventListener("click", () => {
    state = { version: SAVE_VERSION, coins: 0, owned: {}, muted: state.muted };
    persist();
    paintAll();
    toast("Pantry cleared.");
    confirmDlg.close();
  });
  confirmDlg.addEventListener("click", (event) => {
    if (event.target === confirmDlg) confirmDlg.close();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      stopHold();
      persist();
    }
  });
  window.addEventListener("pagehide", persist);

  renderBoxes();
  paintAll();
})();
