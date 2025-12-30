/* =====================================================
   قهرمانان خوراکی - موتور بازی
   Food Heroes - Game Engine
   ===================================================== */

const GameState = {
    playerName: '',
    currentSceneIndex: 0,
    energy: 50,
    health: 70,
    maxEnergy: 100,
    maxHealth: 100,
    lessonsLearned: [],

    // Update methods
    updateEnergy(amount) {
        this.energy = Math.max(0, Math.min(this.maxEnergy, this.energy + amount));
        updateStatusBar();
    },

    updateHealth(amount) {
        this.health = Math.max(0, Math.min(this.maxHealth, this.health + amount));
        updateStatusBar();
    },

    addLesson(lesson) {
        if (!this.lessonsLearned.includes(lesson)) {
            this.lessonsLearned.push(lesson);
        }
    }
};

// Scene Definitions
const scenes = [
    {
        id: 'scene1',
        title: 'پرتاب صبحگاهی 🚀',
        description: 'کاپیتان! موتورها سرد هستند. برای شروع پرتاب به "انرژی صبحگاهی" نیاز داریم. چه چیزی باید در مخزن سوخت (معده) بریزیم؟',
        type: 'single-choice',
        roboText: 'یادت باشه صبحانه مهم‌ترین وعده غذاییه!',
        choices: [
            {
                id: 'A',
                text: 'یک لیوان شیر، نان و پنیر و گردو',
                emoji: '🥛🧀',
                energyChange: 40,
                healthChange: 10,
                isCorrect: true,
                feedback: 'عالی! انرژی بالا! سفینه به نرمی پرتاب شد. صبحانه کامل سوخت اصلی بدنه!',
                lesson: 'صبحانه کامل شامل لبنیات و نان انرژی لازم برای کل روز را تأمین می‌کند.'
            },
            {
                id: 'B',
                text: 'یک بسته چیپس و شکلات',
                emoji: '🍫🍿',
                energyChange: 10,
                healthChange: -10,
                isCorrect: false,
                feedback: 'هشدار! انرژی لحظه‌ای بالا رفت اما سریع افت کرد. موتورها ریپ می‌زنند!',
                lesson: 'تنقلات انرژی زودگذر می‌دهند و برای صبحانه مناسب نیستند.'
            },
            {
                id: 'C',
                text: 'فقط یک فنجان چای',
                emoji: '☕',
                energyChange: 5,
                healthChange: 0,
                isCorrect: false,
                feedback: 'قدرت کافی نیست! چراغ‌ها سوسو می‌زنند.',
                lesson: 'مایعات به تنهایی انرژی کافی برای فعالیت‌های روزانه ندارند.'
            }
        ]
    },
    {
        id: 'scene2',
        title: 'میدان تعمیرات 🛠️',
        description: 'سپر سفینه ترک برداشته! برای تعمیر بدنه و ساختار به **پروتئین** نیاز داریم. غذاهایی که به رشد و ترمیم کمک می‌کنند را انتخاب کن!',
        type: 'multi-select',
        roboText: 'پروتئین‌ها آجرهای سازنده بدن (و سفینه) هستند!',
        requiredSelections: ['chicken', 'egg', 'beans'],
        options: [
            { id: 'chicken', text: 'مرغ', emoji: '🍗', isTarget: true },
            { id: 'apple', text: 'سیب', emoji: '🍎', isTarget: false },
            { id: 'egg', text: 'تخم‌مرغ', emoji: '🥚', isTarget: true },
            { id: 'rice', text: 'برنج', emoji: '🍚', isTarget: false },
            { id: 'beans', text: 'لوبیا', emoji: '🫘', isTarget: true },
            { id: 'cake', text: 'کیک', emoji: '🍰', isTarget: false }
        ],
        successFeedback: 'بدنه تعمیر شد! پروتئین‌ها ماهیچه‌ها را می‌سازند و بافت‌ها را ترمیم می‌کنند.',
        failFeedback: 'تعمیرات شکست خورد! مواد انتخاب شده برای ساخت و ساز مناسب نبودند.',
        lesson: 'پروتئین‌ها (گوشت، حبوبات، تخم‌مرغ) برای رشد و ترمیم بدن ضروری هستند.'
    },
    {
        id: 'scene3',
        title: 'مه بیماری 🦠',
        description: 'هشدار ویروسی! سپرهای سیستم ایمنی ضعیف شده‌اند. ما برای مبارزه با بیماری به **ویتامین و مواد معدنی** نیاز داریم!',
        type: 'single-choice',
        roboText: 'میوه‌ها و سبزیجات سربازهای سیستم ایمنی هستند!',
        choices: [
            {
                id: 'A',
                text: 'مرغ سوخاری و نوشابه',
                emoji: '🍗🥤',
                energyChange: 10,
                healthChange: -15,
                isCorrect: false,
                feedback: 'سیستم ایمنی ضعیف‌تر شد! چربی و قند زیاد دشمن سلامتی است.',
                lesson: 'غذاهای چرب و نوشابه سیستم ایمنی بدن را ضعیف می‌کنند.'
            },
            {
                id: 'B',
                text: 'سالاد تازه، پرتقال و هویج',
                emoji: '🥗🍊🥕',
                energyChange: 20,
                healthChange: 30,
                isCorrect: true,
                feedback: 'سپرها ۱۰۰٪ شدند! ویتامین‌ها ما را سالم نگه می‌دارند و با بیماری می‌جنگند.',
                lesson: 'میوه‌ها و سبزیجات سرشار از ویتامین برای مبارزه با بیماری‌ها هستند.'
            },
            {
                id: 'C',
                text: 'بیسکویت و چای',
                emoji: '🍪☕',
                energyChange: 10,
                healthChange: 0,
                isCorrect: false,
                feedback: 'تأثیر کمی داشت. ویتامین کافی دریافت نشد.',
                lesson: 'میان‌وعده‌های ساده ویتامین کافی برای بدن ندارند.'
            }
        ]
    },
    {
        id: 'scene4',
        title: 'مسابقه انرژی 🏎️',
        description: 'برای فرار از سیاهچاله به سرعت بالا نیاز داریم! سوخت **کربوهیدرات** (انرژی‌زا) را بارگیری کن. کدام سوخت انرژی طولانی‌مدت می‌دهد؟',
        type: 'single-choice',
        roboText: 'کربوهیدرات‌های پیچیده مثل چوب دیرسوز هستند، انرژی طولانی می‌دهند!',
        choices: [
            {
                id: 'A',
                text: 'نان سبوس‌دار و ماکارونی',
                emoji: '🍞🍝',
                energyChange: 50,
                healthChange: 5,
                isCorrect: true,
                feedback: 'موتورها با قدرت کار می‌کنند! نشاسته انرژی پایداری برای سفر فراهم کرد.',
                lesson: 'نان و غلات انرژی لازم برای فعالیت‌های طولانی را تأمین می‌کنند.'
            },
            {
                id: 'B',
                text: 'آبنبات و پاستیل',
                emoji: '🍬🍭',
                energyChange: 20,
                healthChange: -5,
                isCorrect: false,
                feedback: 'انرژی ناگهان قطع شد! قندهای ساده زود تمام می‌شوند.',
                lesson: 'شیرینی‌ها انرژی فوری ولی بسیار کوتاهی دارند و زود گرسنه می‌شوید.'
            }
        ]
    },
    {
        id: 'scene5',
        title: 'بررسی نهایی 🧐',
        description: 'قبل از فرود، یک کنسرو غذای فضایی در انبار پیدا کردیم. قوطی کمی باد کرده است و تاریخ آن گذشته. چه کنیم؟',
        type: 'single-choice',
        roboText: 'بهداشت مواد غذایی برای جلوگیری از مسمومیت حیاتیه!',
        choices: [
            {
                id: 'A',
                text: 'بخوریمش، حیف است!',
                emoji: '🤢',
                energyChange: -20,
                healthChange: -40,
                isCorrect: false,
                feedback: 'اوه نه! مسمومیت غذایی! خدمه بیمار شدند.',
                lesson: 'هرگز نباید غذای تاریخ گذشته یا کنسرو باد کرده را مصرف کرد.'
            },
            {
                id: 'B',
                text: 'دور بریزیم، فاسد است.',
                emoji: '🗑️',
                energyChange: 0,
                healthChange: 10,
                isCorrect: true,
                feedback: 'فرود ایمن! خطر مسمومیت رفع شد.',
                lesson: 'توجه به تاریخ انقضا و ظاهر بسته بندی ضامن سلامتی است.'
            }
        ]
    }
];

// DOM Elements
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');
const endScreen = document.getElementById('end-screen');
const sceneContainer = document.getElementById('scene-container');
const resultContent = document.getElementById('result-content');
const nextBtn = document.getElementById('next-btn');

// Initialization
document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('restart-btn').addEventListener('click', resetGame);
nextBtn.addEventListener('click', nextScene);

function startGame() {
    const nameInput = document.getElementById('player-name');
    if (nameInput.value.trim() === '') {
        alert('لطفاً نام خود را وارد کنید!');
        return;
    }
    GameState.playerName = nameInput.value;
    GameState.energy = 50;
    GameState.health = 70;
    GameState.currentSceneIndex = 0;
    GameState.lessonsLearned = [];

    updateStatusBar();
    switchScreen(startScreen, gameScreen);
    loadScene(0);
}

// Improved loadScene - no side effects for end game here
function loadScene(index) {
    // Safety check
    if (index >= scenes.length) {
        return;
    }

    const scene = scenes[index];
    document.getElementById('scene-number').innerText = index + 1;
    document.getElementById('guide-text').innerText = scene.roboText;

    let html = `
        <h2 class="scene-title">${scene.title}</h2>
        <p class="scene-description">${scene.description}</p>
    `;

    if (scene.type === 'single-choice') {
        html += '<div class="choices-container">';
        scene.choices.forEach(choice => {
            html += `
                <div class="choice-card" onclick="makeChoice('${choice.id}')">
                    <span class="choice-emoji">${choice.emoji}</span>
                    <span class="choice-text">${choice.text}</span>
                </div>
            `;
        });
        html += '</div>';
    } else if (scene.type === 'multi-select') {
        html += '<div class="multi-select-container">';
        scene.options.forEach(opt => {
            html += `
                <div class="food-item" id="opt-${opt.id}" onclick="toggleOption('${opt.id}')">
                    <span class="food-emoji">${opt.emoji}</span>
                    <span class="food-name">${opt.text}</span>
                </div>
            `;
        });
        html += '</div>';
        html += `<button class="btn btn-primary submit-btn" onclick="submitMultiChoice()">تأیید انتخاب‌ها ✅</button>`;
    }

    sceneContainer.innerHTML = html;

    // Add entrance animation
    sceneContainer.style.opacity = '0';
    setTimeout(() => {
        sceneContainer.style.transition = 'opacity 0.5s';
        sceneContainer.style.opacity = '1';
    }, 50);
}

// Single Choice Logic
window.makeChoice = function (choiceId) {
    const scene = scenes[GameState.currentSceneIndex];
    const choice = scene.choices.find(c => c.id === choiceId);

    GameState.updateEnergy(choice.energyChange);
    GameState.updateHealth(choice.healthChange);

    if (choice.isCorrect) {
        GameState.addLesson(choice.lesson);
        showResult(true, choice.feedback, choice.lesson);
    } else {
        showResult(false, choice.feedback, choice.lesson);
    }
};

// Multi Choice Logic
let selectedOptions = [];

window.toggleOption = function (id) {
    const el = document.getElementById(`opt-${id}`);
    if (selectedOptions.includes(id)) {
        selectedOptions = selectedOptions.filter(item => item !== id);
        el.classList.remove('selected');
    } else {
        selectedOptions.push(id);
        el.classList.add('selected');
    }
};

window.submitMultiChoice = function () {
    const scene = scenes[GameState.currentSceneIndex];
    const targets = scene.requiredSelections;

    // Check if all targets are selected and no extras
    const correctSelected = selectedOptions.filter(id => targets.includes(id)).length;
    const wrongSelected = selectedOptions.filter(id => !targets.includes(id)).length;

    const isSuccess = (correctSelected === targets.length && wrongSelected === 0);

    if (isSuccess) {
        GameState.updateHealth(20);
        GameState.addLesson(scene.lesson);
        showResult(true, scene.successFeedback, scene.lesson);
    } else {
        GameState.updateHealth(-10);
        showResult(false, scene.failFeedback, scene.lesson);
    }
    selectedOptions = []; // Reset for next time if needed logic changes
};

function showResult(success, message, lesson) {
    const title = success ? 'آفرین! 🎉' : 'ای وای! ⚠️';
    const titleClass = success ? 'success' : 'danger';
    const icon = success ? '✅' : '❌';

    resultContent.innerHTML = `
        <div class="result-icon">${icon}</div>
        <h2 class="result-title ${titleClass}">${title}</h2>
        <p class="result-message">${message}</p>
        <div class="lesson-box">
            <h4>💡 نکته آموزشی:</h4>
            <p>${lesson}</p>
        </div>
    `;

    switchScreen(gameScreen, resultScreen);
}

function nextScene() {
    GameState.currentSceneIndex++;

    if (GameState.currentSceneIndex >= scenes.length) {
        // Game Over - Go straight from Result to End
        endGame(resultScreen); // Pass the current screen to transition from
    } else {
        // Next Scene - Go from Result to Game
        switchScreen(resultScreen, gameScreen);
        loadScene(GameState.currentSceneIndex);
    }
}

function endGame(fromScreen = gameScreen) {
    // Determine which screen we are coming from (default to gameScreen if direct call, but usually resultScreen)
    switchScreen(fromScreen, endScreen);

    document.getElementById('final-energy').innerText = GameState.energy + '%';
    document.getElementById('final-health').innerText = GameState.health + '%';

    const list = document.getElementById('lessons-list');
    list.innerHTML = '';
    GameState.lessonsLearned.forEach(lesson => {
        const li = document.createElement('li');
        li.innerText = lesson;
        list.appendChild(li);
    });

    const endMsg = document.getElementById('end-message');
    if (GameState.health > 80 && GameState.energy > 80) {
        document.getElementById('end-title').innerText = 'ماموریت موفق! 🏆';
        endMsg.innerText = `عالی بود کاپیتان ${GameState.playerName}! تو یک قهرمان واقعی سلامتی هستی.`;
    } else if (GameState.health > 40) {
        document.getElementById('end-title').innerText = 'ماموریت انجام شد 👍';
        endMsg.innerText = `خوب بود کاپیتان ${GameState.playerName}، اما هنوز می‌تونی سالم‌تر باشی!`;
    } else {
        document.getElementById('end-title').innerText = 'نیاز به تلاش بیشتر 🚑';
        endMsg.innerText = `کاپیتان ${GameState.playerName}، سفینه آسیب زیادی دید. باید بیشتر مراقب تغذیه‌ت باشی!`;
    }
}

function resetGame() {
    switchScreen(endScreen, startScreen);
}

// Utility
function switchScreen(from, to) {
    from.classList.remove('active');
    setTimeout(() => {
        to.classList.add('active');
    }, 100); // Small delay for smooth transition
}

function updateStatusBar() {
    document.getElementById('energy-bar').style.width = GameState.energy + '%';
    document.getElementById('health-bar').style.width = GameState.health + '%';
}
