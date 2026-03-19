// ==========================================
// CONFIGURATION & DYNAMIC DATA GENERATOR
// ==========================================
const FRAME_WIDTH = 32; 
const FRAME_HEIGHT = 32;

// Hàm sinh số ngẫu nhiên có loại trừ
function getRandomInt(min, max, exclude = []) {
    let val;
    do { val = Math.floor(Math.random() * (max - min + 1)) + min; } while (exclude.includes(val));
    return val;
}

// Hàm format đa thức ax^2 + bx + c đẹp mắt
function formatQuadratic(a, b, c) {
    let str = "";
    if (a === 1) str += "x^2"; else if (a === -1) str += "-x^2"; else str += a + "x^2";
    if (b > 0) str += (b === 1 ? " + x" : " + " + b + "x"); else if (b < 0) str += (b === -1 ? " - x" : " - " + Math.abs(b) + "x");
    if (c > 0) str += " + " + c; else if (c < 0) str += " - " + Math.abs(c);
    return str;
}

// KHỞI TẠO BIẾN LEVELDATA RỖNG
let levelData = [];

// HÀM TẠO CÂU HỎI ĐỘNG (Sẽ gọi mỗi khi bấm nút Play)
function generateLevelData() {
    // Q1
    let a1 = getRandomInt(-5, 5, [0]);
    let b1 = getRandomInt(-5, 5); let c1 = getRandomInt(-5, 5);
    let eq1 = formatQuadratic(a1, b1, c1);
    let dir1 = a1 > 0 ? "up" : "down";
    let sign1 = a1 > 0 ? ">" : "<";
    let open1 = a1 > 0 ? "upwards" : "downwards";

    // Q3
    let a3 = getRandomInt(-3, 3, [0]);
    let vx3 = getRandomInt(-4, 4, [0]);
    let b3 = -2 * a3 * vx3; let c3 = getRandomInt(-5, 5);
    let eq3 = formatQuadratic(a3, b3, c3);

    // Q4
    let a4 = getRandomInt(-3, 3, [0, 1, -1]);
    let vx4 = getRandomInt(-3, 3, [0]); let vy4 = getRandomInt(-3, 3, [0]);
    let b4 = -2 * a4 * vx4; let c4 = a4 * vx4 * vx4 + vy4;
    let eq4 = formatQuadratic(a4, b4, c4);

    // Q5
    let a5 = getRandomInt(-3, 3, [0]);
    let vx5 = getRandomInt(-4, 4, [0]); let vy5 = getRandomInt(-5, 5);
    let b5 = -2 * a5 * vx5; let c5 = a5 * vx5 * vx5 + vy5;
    let eq5 = formatQuadratic(a5, b5, c5);
    let dir5 = a5 > 0 ? "increasing" : "decreasing";
    let sign5 = a5 > 0 ? ">" : "<";
    let conc5 = a5 > 0 ? "up" : "down";
    let flow5_1 = a5 > 0 ? "go down (decreasing) and then go up (increasing)" : "go up (increasing) and then go down (decreasing)";
    let flow5_2a = a5 > 0 ? "decreasing" : "increasing";
    let flow5_2b = a5 > 0 ? "increasing" : "decreasing";

    // Q6
    let a6 = getRandomInt(-2, 2, [0]);
    let vx6 = getRandomInt(-4, 4, [0]); let vy6 = getRandomInt(-4, 4, [0, vx6, -vx6]);
    let b6 = -2 * a6 * vx6; let c6 = a6 * vx6 * vx6 + vy6;
    let eq6 = formatQuadratic(a6, b6, c6);
    let sign6 = a6 > 0 ? ">" : "<";
    let conc6 = a6 > 0 ? "up" : "down";
    let vertexPos6 = a6 > 0 ? "lowest" : "highest";
    let ext6 = a6 > 0 ? "minimum" : "maximum";
    let ext6Cap = a6 > 0 ? "Minimum" : "Maximum";
    let oppExt6Cap = a6 > 0 ? "Maximum" : "Minimum";

    // Q7
    let a7 = getRandomInt(-3, 3, [0, 1, -1]);
    let vx7 = getRandomInt(-4, 4, [0]); let vy7 = getRandomInt(-4, 4, [0]);
    let b7 = -2 * a7 * vx7; let c7 = a7 * vx7 * vx7 + vy7;
    let eq7 = formatQuadratic(a7, b7, c7);
    let sign7 = a7 > 0 ? ">" : "<";
    let conc7 = a7 > 0 ? "up" : "down";
    let ext7 = a7 > 0 ? "minimum" : "maximum";
    let vertPos7 = a7 > 0 ? "lowest" : "highest";
    let falseDir7 = a7 > 0 ? "increasing" : "decreasing";
    let trueDir7_1 = a7 > 0 ? "decreasing" : "increasing";
    let trueDir7_2 = a7 > 0 ? "increasing" : "decreasing";

    return [
        { 
            id: "Q1", type: "multi_2", level: "Basic", 
            hint: "The concavity of the graph of the quadratic function \\(y=ax^2+bx+c\\) \\((a \\neq 0)\\) depends on the sign of the coefficient \\(a\\).", 
            hint_img: "assets/img/Q1_Hint.jpeg",
            question: `Given the quadratic function \\(y = ${eq1}\\). The statement 'The parabola of this function concaves ${dir1}' is true or false?`, 
            options: { A: "True", B: "False" }, correct: "A", 
            explain_1: "Look at the coefficient \\(a\\) (the number before \\(x^2\\)). Is it negative or positive?", 
            explain_2: `The coefficient \\(a = ${a1} ${sign1} 0\\). Recall the hint image: when \\(a ${sign1} 0\\), does the graph open downwards or upwards?`, 
            explain_3: `Since \\(a = ${a1} ${sign1} 0\\), the parabola concaves ${dir1} (opens ${open1}). Therefore, the statement is True.` 
        },
        { 
            id: "Q2", type: "multi_4", level: "Basic", 
            hint: "The next question is about the vertex of a parabola.", 
            question: "What is the general formula for the coordinates of the vertex of the parabola \\(y = ax^2 + bx + c\\) \\((a \\neq 0)\\)?", 
            options: { A: "\\((\\frac{b}{2a}, \\frac{-\\Delta}{4a})\\)", B: "\\((-\\frac{b}{2a}, -\\frac{\\Delta}{4a})\\)", C: "\\((-\\frac{b}{2a}, \\frac{\\Delta}{4a})\\)", D: "\\((\\frac{b}{2a}, \\frac{\\Delta}{4a})\\)" }, correct: "B", 
            explain_1: "The x-coordinate of the vertex always has a minus sign in front of the fraction.", 
            explain_2: "The y-coordinate of the vertex always has a minus sign in front of the fraction.", 
            explain_3: "The standard formula for the coordinates of the vertex of a parabola is \\((-\\frac{b}{2a}, -\\frac{\\Delta}{4a})\\). The correct answer is B." 
        },
        { 
            id: "Q3", type: "multi_4", level: "Comprehension", 
            hint: "The axis of symmetry of a parabola is a vertical line passing through its vertex.", 
            hint_img: "assets/img/Q3_Hint.png",
            question: `Determine the equation of the axis of symmetry of the graph of the function \\(y = ${eq3}\\).`, 
            options: { A: `\\(x = ${-vx3}\\)`, B: `\\(x = ${vx3}\\)`, C: `\\(y = ${vx3}\\)`, D: `\\(y = ${-vx3}\\)` }, correct: "B", 
            explain_1: "The axis of symmetry is a vertical line, so the equation must be in the form \\(x = ...\\) and not \\(y = ...\\).", 
            explain_2: "The axis of symmetry passes through the vertex, so it is exactly the x-coordinate of the vertex. Do you remember the formula \\(x = -\\frac{b}{2a}\\) from the previous question?", 
            explain_3: `Applying the formula: \\(x = -\\frac{${b3}}{2 \\cdot (${a3})} = ${vx3}\\). So the equation of the axis of symmetry is \\(x = ${vx3}\\).` 
        },
        { 
            id: "Q4", type: "multi_4", level: "Comprehension", 
            hint: "To find the y-coordinate of the vertex, you can substitute the x-coordinate of the vertex into the function's equation.", 
            question: `Determine the coordinates of the vertex of the graph of the function \\(y = ${eq4}\\).`, 
            options: { A: `\\((${vx4}, ${-vy4})\\)`, B: `\\((${-vx4}, ${vy4})\\)`, C: `\\((${vx4}, ${vy4})\\)`, D: `\\((${-vx4}, ${-vy4})\\)` }, correct: "C", 
            explain_1: "First, calculate the x-coordinate of the vertex \\(x = -\\frac{b}{2a}\\).", 
            explain_2: `The x-coordinate is \\(x = -\\frac{${b4}}{2 \\cdot (${a4})} = ${vx4}\\). Now, substitute \\(x = ${vx4}\\) into the original equation to find \\(y\\).`, 
            explain_3: `We have \\(x = ${vx4}\\). Substituting into the equation: \\(y = ${a4}(${vx4})^2 ${b4 >= 0 ? '+' : '-'} ${Math.abs(b4)}(${vx4}) ${c4 >= 0 ? '+' : '-'} ${Math.abs(c4)} = ${vy4}\\). So the vertex coordinates are \\((${vx4}, ${vy4})\\).` 
        },
        { 
            id: "Q5", type: "input", level: "Comprehension", 
            hint: "Increasing/decreasing intervals of a parabola are separated by its vertex. Rely on the concavity (coefficient \\(a\\)) to know if the graph goes up or down on each interval.", 
            hint_img: "assets/img/Q5_Hint.jpg",
            question: `Given the function \\(y = ${eq5}\\). This function is ${dir5} on the interval \\((..., +\\infty)\\). Fill in the appropriate number in the blank.`, 
            correct: [vx5.toString()], 
            explain_1: "The point that divides the increasing and decreasing intervals is the x-coordinate of the vertex \\(x = -\\frac{b}{2a}\\). Let's calculate this value.", 
            explain_2: `The x-coordinate of the vertex is \\(x = ${vx5}\\). Since the coefficient \\(a = ${a5} ${sign5} 0\\) (concaves ${conc5}), the graph will ${flow5_1}.`, 
            explain_3: `The x-coordinate of the vertex is \\(x = -\\frac{${b5}}{2 \\cdot (${a5})} = ${vx5}\\). Since \\(a ${sign5} 0\\), the function is ${flow5_2a} on \\((-\\infty, ${vx5})\\) and ${flow5_2b} on \\((${vx5}, +\\infty)\\). The number to fill in is ${vx5}.` 
        },
        { 
            id: "Q6", type: "multi_4", level: "Application", 
            hint: "If a parabola concaves down, the vertex is the highest point. If a parabola concaves up, the vertex is the lowest point.", 
            hint_img: "assets/img/Q5_Hint.jpg",
            question: `Does the function \\(y = ${eq6}\\) have a maximum or minimum value, and what is that value?`, 
            options: { A: `${oppExt6Cap} value is ${vy6}`, B: `${ext6Cap} value is ${vy6}`, C: `${ext6Cap} value is ${vx6}`, D: `${oppExt6Cap} value is ${vx6}` }, correct: "B", 
            explain_1: "Consider the coefficient \\(a\\) to know whether the vertex of this parabola is the highest point or the lowest point.", 
            explain_2: `Since \\(a = ${a6} ${sign6} 0\\), the parabola concaves ${conc6}, so the vertex is the ${vertexPos6} point. Therefore, the function has a ${ext6} value. This value is exactly the y-coordinate (\\(y\\)) of the vertex.`, 
            explain_3: `Since \\(a ${sign6} 0\\), the function has a ${ext6} value. The x-coordinate of the vertex is \\(x = -\\frac{${b6}}{2(${a6})} = ${vx6}\\). Substituting \\(x = ${vx6}\\) into the function, we get \\(y = ${a6}(${vx6})^2 ${b6 >= 0 ? '+' : '-'} ${Math.abs(b6)}(${vx6}) ${c6 >= 0 ? '+' : '-'} ${Math.abs(c6)} = ${vy6}\\). So the ${ext6} value is ${vy6}.` 
        },
        { 
            id: "Q7", type: "multi_4", level: "Application", 
            hint: "This is a comprehensive question. You can quickly sketch the graph on paper!", 
            question: `Given the quadratic function \\(y = ${eq7}\\). Which of the following statements is FALSE?`, 
            options: { A: `The graph of the function concaves ${conc7}.`, B: `The function reaches a ${ext7} value of ${vy7}.`, C: `The axis of symmetry of the graph is the line \\(x = ${vx7}\\).`, D: `The function is ${falseDir7} on the interval \\((-\\infty, ${vx7})\\).` }, correct: "D", 
            explain_1: `Since \\(a = ${a7} ${sign7} 0\\), the parabola concaves ${conc7}.`, 
            explain_2: `The x-coordinate of the vertex is \\(x = ${vx7}\\). Since \\(a = ${a7} ${sign7} 0\\), the parabola concaves ${conc7}. Therefore, the vertex is the ${vertPos7} point of the parabola.`, 
            explain_3: `The axis of symmetry of the graph is the line \\(x = -\\frac{${b7}}{2(${a7})} = ${vx7}\\).`, 
            explain_4: `Since \\(a ${sign7} 0\\), the parabola concaves ${conc7}. Therefore, the function is ${trueDir7_1} on the interval \\((-\\infty, ${vx7})\\) and ${trueDir7_2} on the interval \\((${vx7}, +\\infty)\\). Statement D saying the function is ${falseDir7} on \\((-\\infty, ${vx7})\\) is FALSE.` 
        }
    ];
}

const config = {
    type: Phaser.AUTO, 
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH, width: 1066, height: 600 },
    backgroundColor: '#87CEEB', parent: 'game-container',
    pixelArt: true, 
    physics: { default: 'arcade', arcade: { gravity: { y: 1000 }, debug: false } },
    scene: { preload: preload, create: create, update: update }
};

// ==========================================
// FIREBASE & GLOBAL VARIABLES
// ==========================================
const firebaseConfig = {

  apiKey: "AIzaSyBFudz97TIDFD7dUZuVIKB-IH0vcz6bA-M",

  authDomain: "the-meow-thematics-quest.firebaseapp.com",

  databaseURL: "https://the-meow-thematics-quest-default-rtdb.asia-southeast1.firebasedatabase.app",

  projectId: "the-meow-thematics-quest",

  storageBucket: "the-meow-thematics-quest.firebasestorage.app",

  messagingSenderId: "640229575133",

  appId: "1:640229575133:web:28c8533120bcdbe2b78e34"

};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
let userId = ""; 
let currentStatus = "none";

let game, player, cursors;
let isGameOver = false, isQuizTime = false, isCutscene = false, isKnockedBack = false, isAttacking = false, lives = 3;
let isPaused = false, isMuted = false;

let userInfo = { name: "", class: "", group: "N/A" }; 
let gameStartTime = 0, heartLostCount = 0, itemsCollectedCount = 0, correctAnswersCount = 0, currentStreak = 0; // <-- THÊM currentStreak

let questionStats = {};
for(let i = 1; i <= 9; i++) questionStats["Q" + i] = { wrongCount: 0, wrongAnswers: [] };

let fallingItems = [], trapPlatforms = [];
let globalRandomizedData = null;
let savedCheckpoint = null; 

let tutorialStates = { jumpWait: false, jumpDone: false, jumpText: null };
let currentTutorialEnemy = null;

// ==========================================
// REAL-TIME TRACKING LOGIC
// ==========================================
function sendLiveUpdate(status) {
    if (!userInfo.name) return;
    
    currentStatus = status;
    
    let durationStr = "N/A";
    if (gameStartTime > 0) {
        let duration = Math.floor((Date.now() - gameStartTime) / 1000);
        let minutes = Math.floor(duration / 60); 
        let seconds = duration % 60; 
        durationStr = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
    }

    let wrongList = [];
    for(let i=1; i<=7; i++) {
        let stats = questionStats["Q"+i];
        if(stats && stats.wrongCount > 0) {
            wrongList.push(`Q${i} (${stats.wrongCount}x)`);
        }
    }
    let wrongStr = wrongList.length > 0 ? wrongList.join(", ") : "None";
    
    let topicsArr = getReviewTopics();
    let topicsStr = topicsArr.length > 0 ? topicsArr.join(", ") : "Perfect Run (0 mistakes)";

    db.ref('sessions/' + userId).set({
        name: userInfo.name,
        class: userInfo.class,
        status: status,
        progress: correctAnswersCount,
        streak: currentStreak,
        duration: durationStr,
        wrongAnswers: wrongStr,
        reviewTopics: topicsStr,
        lastUpdated: firebase.database.ServerValue.TIMESTAMP
    });
}

window.addEventListener('beforeunload', function (e) {
    if (currentStatus === "playing") {
        sendLiveUpdate("none (disconnected)");
    }
});

function getReviewTopics() {
    let reviewTopics = new Set();
    for(let i=1; i<=7; i++) {
        let qID = "Q" + i; 
        let stats = questionStats[qID];
        
        if(stats && stats.wrongCount > 0) {
            stats.wrongAnswers.forEach(ans => {
                let ansUpper = ans.trim().toUpperCase();
                if (qID === "Q1" && ansUpper === "B") reviewTopics.add("Concavity");
                if (qID === "Q2") {
                    if (ansUpper === "A" || ansUpper === "D") reviewTopics.add("Formula for the x-coordinate of the vertex");
                    if (ansUpper === "C") reviewTopics.add("Formula for the y-coordinate of the vertex");
                }
                if (qID === "Q3") {
                    if (ansUpper === "C" || ansUpper === "D") reviewTopics.add("Equation format of the axis of symmetry");
                    if (ansUpper === "A") reviewTopics.add("Calculating the axis of symmetry");
                }
                if (qID === "Q4") {
                    if (ansUpper === "B" || ansUpper === "D") reviewTopics.add("Calculating the x-coordinate of the vertex");
                    if (ansUpper === "A") reviewTopics.add("Calculating the y-coordinate of the vertex");
                }
                if (qID === "Q5") {
                    reviewTopics.add("Increasing/decreasing intervals");
                }
                if (qID === "Q6") {
                    if (ansUpper === "A" || ansUpper === "D") reviewTopics.add("Identifying Maximum vs. Minimum based on concavity");
                    if (ansUpper === "C") reviewTopics.add("Calculating the Maximum/Minimum value");
                }
                if (qID === "Q7") {
                    if (ansUpper === "A") reviewTopics.add("Concavity");
                    if (ansUpper === "B") reviewTopics.add("Calculating the minimum value");
                    if (ansUpper === "C") reviewTopics.add("Calculating the axis of symmetry");
                }
            });
        }
    }
    return Array.from(reviewTopics);
}

// ==========================================
// HTML UI FUNCTIONS
// ==========================================
window.startGame = function() {
    let name = document.getElementById('info-name').value;
    let cls = document.getElementById('info-class').value;
    if(!name || !cls) { alert("Please enter all required information!"); return; }
    userInfo.name = name; userInfo.class = cls;
    
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('hud-top-left').style.display = 'block';
    document.getElementById('hud-progress').style.display = 'flex';
    document.getElementById('hud-controls').style.display = 'flex';
    
    // TẠO BỘ ĐỀ MỚI MỖI KHI BẤM PLAY
    levelData = generateLevelData();
    globalRandomizedData = null; // Ép game phải lấy data mới thay vì data cũ
    
    game = new Phaser.Game(config);
    gameStartTime = Date.now();
    setTimeout(alignUIToCanvas, 100);

    userId = userInfo.class + "_" + userInfo.name.replace(/\s+/g, '');
    db.ref('sessions/' + userId).onDisconnect().update({ status: "none (disconnected)" });
    sendLiveUpdate("playing");
}

window.toggleMute = function() {
    isMuted = !isMuted;
    if (game && game.sound) game.sound.mute = isMuted;
    let muteIcon = document.getElementById('mute-icon');
    if (muteIcon) muteIcon.src = isMuted ? "assets/img/speaker_mute.png" : "assets/img/speaker.png";
}

window.togglePause = function() {
    if (!game || !currentScene || isGameOver) return;
    if (isPaused) {
        document.getElementById('pause-menu').style.display = 'none';
        if(!isQuizTime && !isCutscene) currentScene.physics.resume();
        if(!isQuizTime && player && player.anims) player.anims.resume();
        isPaused = false;
    } else {
        document.getElementById('pause-menu').style.display = 'flex';
        currentScene.physics.pause();
        if(player && player.anims) player.anims.pause();
        isPaused = true;
    }
}

window.showTutorialInfo = function() { document.getElementById('tutorial-info').style.display = 'block'; }

window.restartFromBeginning = function() {
    isPaused = false; 
    document.getElementById('pause-menu').style.display = 'none'; 
    document.getElementById('tutorial-info').style.display = 'none';
    
    globalRandomizedData = null; savedCheckpoint = null; 
    correctAnswersCount = 0; lives = 3; heartLostCount = 0; itemsCollectedCount = 0;
    tutorialStates = { jumpWait: false, jumpDone: false, jumpText: null };
    
    // TẠO BỘ ĐỀ MỚI KHI BẤM RESTART TỪ ĐẦU
    levelData = generateLevelData();
    
    let tutLabel = document.getElementById('hud-tutorial-label');
    if (tutLabel) tutLabel.style.display = 'block';
    
    currentScene.scene.restart();
}

window.restartFromCheckpoint = function() {
    isPaused = false; document.getElementById('pause-menu').style.display = 'none'; document.getElementById('tutorial-info').style.display = 'none';
    lives = 3; 
    if (savedCheckpoint) currentScene.scene.restart({ isCheckpointRestart: true }); else restartFromBeginning();
}

window.updateProgressBar = function() {
    let pct = (correctAnswersCount / levelData.length) * 100;
    if (pct > 100) pct = 100;
    document.getElementById('progress-fill').style.width = pct + "%";
}

// ==========================================
// PHASER PRELOAD & CREATE
// ==========================================
function preload() {
    this.load.spritesheet('cat_idle', 'assets/img/character/1_Cat_Idle-Sheet.png', { frameWidth: FRAME_WIDTH, frameHeight: FRAME_HEIGHT });
    this.load.spritesheet('cat_run', 'assets/img/character/2_Cat_Run-Sheet.png', { frameWidth: FRAME_WIDTH, frameHeight: FRAME_HEIGHT });
    this.load.spritesheet('cat_jump', 'assets/img/character/3_Cat_Jump-Sheet.png', { frameWidth: FRAME_WIDTH, frameHeight: FRAME_HEIGHT });
    this.load.spritesheet('cat_fall', 'assets/img/character/4_Cat_Fall-Sheet.png', { frameWidth: FRAME_WIDTH, frameHeight: FRAME_HEIGHT });
    this.load.spritesheet('cat_attack', 'assets/img/character/cat_attack.png', { frameWidth: 64, frameHeight: 32 });

    this.load.image('ground', 'assets/img/ground.png');
    this.load.image('enemy', 'assets/img/enemy.png');
    this.load.image('spike', 'assets/img/spike.png');
    this.load.image('item', 'assets/img/item.png');
    this.load.image('pipe', 'assets/img/pipe.png');
    this.load.image('checkpoint', 'assets/img/checkpoint.png'); 

    this.load.image('bg_sky', 'assets/img/backgrounds/BACKGROUND.png');
    this.load.image('bg_woods1', 'assets/img/backgrounds/WOODS - First.png'); 
    this.load.image('bg_woods2', 'assets/img/backgrounds/WOODS - Second.png');
    this.load.image('bg_woods3', 'assets/img/backgrounds/WOODS - Third.png');
    this.load.image('bg_woods4', 'assets/img/backgrounds/WOODS - Fourth.png');
    this.load.image('bg_vines', 'assets/img/backgrounds/VINES - Second.png');
    this.load.image('bg_bush', 'assets/img/backgrounds/BUSH - BACKGROUND.png');

    this.load.image('smoke', 'assets/img/smoke.png');
    this.load.image('star', 'assets/img/star.png');
    this.load.image('heart', 'assets/img/heart.png');
    this.load.image('heart_empty', 'assets/img/heart_empty.png');
    
    this.load.audio('bg_music', 'assets/audio/bg_music.mp3');
    this.load.audio('collect', 'assets/audio/collect.mp3');
    this.load.audio('correct', 'assets/audio/correct.mp3');
    this.load.audio('explosion', 'assets/audio/explosion.mp3');
    this.load.audio('jump', 'assets/audio/jump.wav');
    this.load.audio('win', 'assets/audio/win.mp3');
    this.load.audio('wrong', 'assets/audio/wrong.mp3');
    this.load.audio('earthquake', 'assets/audio/earthquake.mp3'); 
    this.load.audio('cat_meow', 'assets/audio/cat_meow.mp3'); 
    this.load.audio('attack', 'assets/audio/attack.mp3');
}

function create(data) {
    currentScene = this;
    isGameOver = false; isQuizTime = false; isCutscene = false; isKnockedBack = false; isAttacking = false;
    fallingItems = []; trapPlatforms = [];

    if (!data || !data.keepLives) {
        lives = 3;
    }

    if (data && data.isCheckpointRestart && savedCheckpoint) {
        correctAnswersCount = savedCheckpoint.progress; 
        heartLostCount = savedCheckpoint.heartLostCount; 
        itemsCollectedCount = savedCheckpoint.itemsCollectedCount;
        currentStreak = savedCheckpoint.streak || 0; // <--- PHỤC HỒI STREAK TỪ CHECKPOINT

        tutorialStates.jumpDone = true; 
        let tutLabel = document.getElementById('hud-tutorial-label');
        if (tutLabel) tutLabel.style.display = 'none';
    } else {
        if (!data || !data.keepLives) correctAnswersCount = 0;
        currentStreak = 0; // <--- RESET STREAK NẾU CHƠI TỪ ĐẦU
        tutorialStates = { jumpWait: false, jumpDone: false, jumpText: null };
        let tutLabel = document.getElementById('hud-tutorial-label');
        if (tutLabel) tutLabel.style.display = 'block';
    }
    
    updateLivesUI(); updateProgressBar();

    if (this.bgMusic) this.bgMusic.stop(); 
    this.bgMusic = this.sound.add('bg_music', { loop: true, volume: 0.3 });
    this.bgMusic.play();

    // Lấy dữ liệu bài toán mới nhất mà không xáo trộn thứ tự
    if (!globalRandomizedData) globalRandomizedData = [...levelData];
    let randomizedData = globalRandomizedData;

    const mapLength = levelData.length * 2500 + 4000;
    this.physics.world.setBounds(0, 0, mapLength, 800);

    this.add.image(0, 0, 'bg_sky').setOrigin(0, 0).setScrollFactor(0).setDisplaySize(1066, 600);

    createParallaxLayer(this, 'bg_woods1', 0.1, mapLength, 0); 
    createParallaxLayer(this, 'bg_woods2', 0.2, mapLength, 0);
    createParallaxLayer(this, 'bg_woods3', 0.3, mapLength, 0); 
    createParallaxLayer(this, 'bg_woods4', 0.4, mapLength, 0); 
    createParallaxLayer(this, 'bg_vines', 0.5, mapLength, 0);   
    createParallaxLayer(this, 'bg_bush', 0.8, mapLength, 0);  

    const platforms = this.physics.add.staticGroup();
    const spikes = this.physics.add.staticGroup();
    const enemies = this.physics.add.staticGroup();
    const items = this.physics.add.staticGroup();
    const checkpointsGroup = this.physics.add.staticGroup();
    const triggers = this.physics.add.staticGroup();

    let currentRightEdge = 0;

    // --- TUTORIAL BLOCK ---
    let startPlatWidth = 800;
    createPlatform(platforms, this, startPlatWidth/2, 580, startPlatWidth);
    currentRightEdge = startPlatWidth;

    let jumpTrigger = this.add.rectangle(currentRightEdge - 50, 400, 20, 800);
    this.physics.add.existing(jumpTrigger, true); 
    jumpTrigger.isJumpTrigger = true; 
    triggers.add(jumpTrigger);

    let gapTut = 150;
    let tutPlatWidth = 1500;
    let tutPlatX = currentRightEdge + gapTut + tutPlatWidth/2;
    createPlatform(platforms, this, tutPlatX, 580, tutPlatWidth);
    currentRightEdge += gapTut + tutPlatWidth;

    // ĐÃ HẠ ĐỘ CAO XUỐNG (Từ 530, 540 thành 560, 570)
    let tItem = createItem(items, this, tutPlatX - 400, 560); tItem.isTutorial = true; tItem.tutMsg = "This is a hint for you to fight with your enemy.";
    createProximityTrigger(triggers, this, tItem.x - 150, tItem);

    let tEnemy = createEnemyWithWall(enemies, this, tutPlatX, 570); tEnemy.isTutorial = true;
    tEnemy.dataContent = { id: "T1", type: "multi_2", question: "TUTORIAL: 1 + 1 = ?", options: { A: "2", B: "3" }, correct: "A", explain_1: "Tutorial: 1 + 1 = 2" };
    createProximityTrigger(triggers, this, tEnemy.x - 150, tEnemy);

    let tCheck = createCheckpoint(checkpointsGroup, this, tutPlatX + 400, 570); tCheck.isTutorial = true; tCheck.tutMsg = "This is a checkpoint. If you lose, you will restart from the nearest checkpoint.";
    createProximityTrigger(triggers, this, tCheck.x - 150, tCheck);

    // --- MAIN GAME BLOCK ---
    randomizedData.forEach((data, i) => {
        let gap1 = 150 + Math.random() * 100;
        let itemPlatWidth = 191 * 2; 
        let itemPlatX = currentRightEdge + gap1 + itemPlatWidth / 2;
        let itemPlatY = 400 + Math.random() * 100;
        createPlatform(platforms, this, itemPlatX, itemPlatY, itemPlatWidth);
        currentRightEdge = itemPlatX + itemPlatWidth / 2;

        if (i === 2 || i === 6) {
            let item = this.add.image(itemPlatX, -100, 'item');
            // ĐÃ HẠ ĐỘ CAO XUỐNG (Từ -50 thành -20)
            this.physics.add.existing(item, true); item.body.enable = false; item.targetY = itemPlatY - 20; item.triggerX = itemPlatX - 350; item.hasFallen = false; item.dataContent = data;
            fallingItems.push(item); items.add(item);
        } else {
            // ĐÃ HẠ ĐỘ CAO XUỐNG (Từ -50 thành -20)
            let item = createItem(items, this, itemPlatX, itemPlatY - 20); item.dataContent = data;
        }

        let gap2 = 150 + Math.random() * 100;
        let enemyPlatWidth = 191 * 4; 
        let enemyPlatX = currentRightEdge + gap2 + enemyPlatWidth / 2;
        let enemyPlatY = itemPlatY + (Math.random() * 60 - 30); 
        createPlatform(platforms, this, enemyPlatX, enemyPlatY, enemyPlatWidth);
        currentRightEdge = enemyPlatX + enemyPlatWidth / 2;

        // ĐÃ HẠ ĐỘ CAO XUỐNG (Từ -40 thành -10)
        let enemy = createEnemyWithWall(enemies, this, enemyPlatX, enemyPlatY - 10);
        enemy.dataContent = data;
        
        if ((i + 1) % 2 === 0) {
            let cpWidth = 191 * 4;
            let cpX = currentRightEdge + 150 + cpWidth / 2;
            createPlatform(platforms, this, cpX, enemyPlatY, cpWidth);
            // ĐÃ HẠ ĐỘ CAO XUỐNG (Từ -40 thành -10)
            createCheckpoint(checkpointsGroup, this, cpX, enemyPlatY - 10);
            currentRightEdge = cpX + cpWidth / 2;
        }

        // ... phần trap giữ nguyên ...

        if (i === 4 || i === 6) {
            let runwayWidth = 191 * 3; let runwayX = currentRightEdge + runwayWidth / 2;
            createPlatform(platforms, this, runwayX, enemyPlatY, runwayWidth);
            currentRightEdge = runwayX + runwayWidth / 2;

            let trapWidth = 191 * 2; let trapX = currentRightEdge + trapWidth / 2; 
            let trapPlat = createPlatform(platforms, this, trapX, enemyPlatY, trapWidth);
            trapPlat.hasTriggered = false; trapPlat.triggerX = trapX - (trapWidth / 2) - 100; 
            trapPlatforms.push(trapPlat); currentRightEdge = trapX + trapWidth / 2;

            let safeWidth = 191 * 4; let safeX = currentRightEdge + safeWidth / 2;
            createPlatform(platforms, this, safeX, enemyPlatY, safeWidth);
            currentRightEdge = safeX + safeWidth / 2;
        }

        if (Math.random() > 0.4) createSpike(spikes, this, itemPlatX + gap2/2, 650);
    });

    let gapEnd = 200;
    let endPlatWidth = 191 * 5; 
    let endPlatX = currentRightEdge + gapEnd + endPlatWidth / 2;
    createPlatform(platforms, this, endPlatX, 580, endPlatWidth);
    
    let visualPipe = this.add.image(endPlatX + 250, 568, 'pipe'); 
    visualPipe.setOrigin(0.5, 1); 
    visualPipe.setScale(1.75); 
    let finishLine = this.add.rectangle(endPlatX + 250, 300, 60, 1000, 0x000000); 
    finishLine.setVisible(false); 
    this.physics.add.existing(finishLine, true);

    if(!this.anims.exists('idle')) {
        this.anims.create({ key: 'idle', frames: this.anims.generateFrameNumbers('cat_idle', { start: 0, end: 3 }), frameRate: 8, repeat: -1 });
        this.anims.create({ key: 'run', frames: this.anims.generateFrameNumbers('cat_run', { start: 0, end: 7 }), frameRate: 10, repeat: -1 });
        this.anims.create({ key: 'jump', frames: this.anims.generateFrameNumbers('cat_jump', { start: 0, end: 3 }), frameRate: 10, repeat: -1 });
        this.anims.create({ key: 'fall', frames: this.anims.generateFrameNumbers('cat_fall', { start: 0, end: 3 }), frameRate: 10, repeat: -1 });
        this.anims.create({ key: 'attack', frames: this.anims.generateFrameNumbers('cat_attack', { start: 0, end: 5 }), frameRate: 15, repeat: 0 });
    }

    player = this.physics.add.sprite(100, 450, 'cat_idle');
    player.setBounce(0); player.setCollideWorldBounds(true); player.setScale(2); 

    this.cameras.main.setBounds(0, 0, mapLength, 600);
    this.cameras.main.startFollow(player);
    this.cameras.main.setFollowOffset(-200, 0);

    if (data && data.isCheckpointRestart && savedCheckpoint) {
        player.x = savedCheckpoint.x; player.y = savedCheckpoint.y;
        this.cameras.main.scrollX = player.x - 200;
    }

    this.physics.add.collider(player, platforms);
    this.physics.add.overlap(player, spikes, (p, s) => takeEnvironmentalDamage(this, p));
    this.physics.add.overlap(player, items, (p, i) => collectItem(this, p, i));
    this.physics.add.overlap(player, enemies, (p, e) => meetEnemy(this, p, e));
    this.physics.add.overlap(player, finishLine, (p, f) => winGame(this, p, f));
    this.physics.add.overlap(player, checkpointsGroup, (p, cp) => reachCheckpoint(this, p, cp));
    this.physics.add.overlap(player, triggers, (p, t) => triggerOverlap(this, p, t));

    this.input.on('pointerdown', () => jump(this)); 
    cursors = this.input.keyboard.createCursorKeys();
}

// ==========================================
// UPDATE LOOP
// ==========================================
function update() {
    if (isQuizTime || isPaused) { 
        if (player.anims && !isAttacking && !isPaused) player.anims.pause(); 
        return; 
    }
    if (isGameOver) return;
    if (player.y > 650) takeEnvironmentalDamage(this, player);
    
    if (isCutscene) {
        player.setVelocityX(0); 
        if (player.body.touching.down) player.anims.play('idle', true); 
        
        if ((cursors.space.isDown || cursors.up.isDown) && player.body.touching.down) {
            jump(this);
        }
        return; 
    }

    if (isKnockedBack) {
        if (!player.body.touching.down) player.anims.play('fall', true); else player.anims.play('idle', true);
        return; 
    }

    player.setVelocityX(300);
    if (!player.body.touching.down) {
        if (player.body.velocity.y < 0) player.anims.play('jump', true); else player.anims.play('fall', true);
    } else { player.anims.play('run', true); }
    
    if ((cursors.space.isDown || cursors.up.isDown) && player.body.touching.down) jump(this);

    fallingItems.forEach(item => {
        if (!item.hasFallen && player.x >= item.triggerX) {
            item.hasFallen = true;
            this.tweens.add({ targets: item, y: item.targetY, duration: 800, ease: 'Bounce.easeOut', onComplete: () => {
                item.body.enable = true; item.body.updateFromGameObject();
                this.tweens.add({ targets: item, y: item.targetY - 15, duration: 1000, yoyo: true, repeat: -1 });
            }});
        }
    });

    trapPlatforms.forEach(trap => {
        if (!trap.hasTriggered && player.x >= trap.triggerX) {
            trap.hasTriggered = true; isCutscene = true; 
            let alertIcon = this.add.text(player.x, player.y - 50, '!', { fontSize: '50px', fill: '#ff0000', fontStyle: 'bold' }).setOrigin(0.5);
            this.tweens.add({ targets: alertIcon, y: player.y - 80, duration: 200, yoyo: true, onComplete: () => alertIcon.destroy() });
            this.sound.play('earthquake'); this.cameras.main.shake(1000, 0.015); 
            let leftEdge = trap.x - trap.width/2; let rightEdge = trap.x + trap.width/2;
            let emitter1 = this.add.particles(leftEdge, trap.y, 'smoke', { speed: { min: 50, max: 150 }, scale: { start: 1.5, end: 0 }, lifespan: 800, blendMode: 'ADD' });
            let emitter2 = this.add.particles(rightEdge, trap.y, 'smoke', { speed: { min: 50, max: 150 }, scale: { start: 1.5, end: 0 }, lifespan: 800, blendMode: 'ADD' });
            emitter1.explode(30); emitter2.explode(30);
            trap.body.enable = false; 
            this.tweens.add({ targets: trap, y: trap.y + 600, duration: 1000, ease: 'Cubic.easeIn', onComplete: () => { isCutscene = false; }});
        }
    });
}

// ==========================================
// HELPER FUNCTIONS & OVERLAPS
// ==========================================
function createParallaxLayer(scene, key, scrollFactor, mapWidth, yOffset = 0) { 
    let imgHeight = scene.textures.get(key).getSourceImage().height; 
    let scaleY = 600 / imgHeight; 
    let bg = scene.add.tileSprite(0, yOffset, mapWidth / scaleY, imgHeight, key); 
    bg.setOrigin(0, 0); 
    bg.setScrollFactor(scrollFactor); 
    bg.setScale(scaleY); 
}
function createPlatform(group, scene, x, y, width) { let plat = scene.add.tileSprite(x, y + 20, width, 64, 'ground'); scene.physics.add.existing(plat, true); plat.body.setSize(width, 64); plat.body.setOffset(0, 10); group.add(plat); return plat; }
function createSpike(group, scene, x, y) { let spike = scene.add.image(x, y - 25, 'spike'); spike.setScale(1.5); scene.physics.add.existing(spike, true); spike.body.setSize(spike.width * 0.8, spike.height * 0.8); group.add(spike); }
function createItem(group, scene, x, y) { let item = scene.add.image(x, y, 'item'); scene.physics.add.existing(item, true); scene.tweens.add({ targets: item, y: y - 15, duration: 1000, yoyo: true, repeat: -1 }); group.add(item); return item; }
function createEnemyWithWall(group, scene, x, y) { let enemyVisual = scene.add.image(x, y - 10, 'enemy'); let invisibleWall = scene.add.rectangle(x, y - 500, 60, 1000, 0x000000); invisibleWall.setVisible(false); scene.physics.add.existing(enemyVisual, true); scene.physics.add.existing(invisibleWall, true); group.add(enemyVisual); group.add(invisibleWall); enemyVisual.wall = invisibleWall; invisibleWall.visual = enemyVisual; return enemyVisual; }
function createCheckpoint(group, scene, x, y) { 
    let cp = scene.add.image(x, y - 10, 'checkpoint'); 
    cp.setScale(1.0); scene.physics.add.existing(cp, true); group.add(cp); return cp; 
}
function createProximityTrigger(group, scene, x, targetObj) { 
    let trig = scene.add.rectangle(x, 400, 20, 800); 
    scene.physics.add.existing(trig, true); 
    trig.isProximity = true; 
    trig.targetObj = targetObj; 
    group.add(trig); 
}

function jump(scene) { 
    if (isPaused || isGameOver || isQuizTime || isKnockedBack || isAttacking) return;
    
    if (tutorialStates.jumpWait && !tutorialStates.jumpDone) {
        tutorialStates.jumpDone = true; 
        isCutscene = false; 
        
        if (tutorialStates.jumpText) tutorialStates.jumpText.destroy(); 
        
        player.body.setVelocityY(-650); 
        scene.sound.play('jump');
        return;
    }
    
    if (player.body.touching.down && !isCutscene) { 
        player.body.setVelocityY(-650); 
        scene.sound.play('jump'); 
    } 
}

function triggerOverlap(scene, p, t) {
    if (t.isJumpTrigger && !tutorialStates.jumpWait) {
        tutorialStates.jumpWait = true;
        isCutscene = true; 
        
        p.setVelocityX(0);
        p.anims.play('idle', true);
        
        tutorialStates.jumpText = scene.add.text(t.x, 350, '👆 TAP TO JUMP', { 
            fontSize: '36px', 
            fill: '#FFD700', 
            fontStyle: 'bold', 
            backgroundColor: 'rgba(0,0,0,0.6)', 
            padding: {x: 15, y: 10} 
        }).setOrigin(0.5);
        
        scene.tweens.add({ 
            targets: tutorialStates.jumpText, 
            scaleX: 1.1, 
            scaleY: 1.1, 
            duration: 500, 
            yoyo: true, 
            repeat: -1 
        });
        
    } else if (t.isProximity && !t.triggered) {
        t.triggered = true;
        let arrow = scene.add.text(t.targetObj.x, t.targetObj.y - 70, '⬇️ Touch this', { fontSize: '20px', fill: '#ffff00', fontStyle: 'bold', backgroundColor: '#000', padding: {x:5,y:5} }).setOrigin(0.5);
        scene.tweens.add({ targets: arrow, y: t.targetObj.y - 90, duration: 500, yoyo: true, repeat: -1 });
        t.targetObj.attachedArrow = arrow;
    }
}

// ==========================================
// UI & QUIZ INTERACTION
// ==========================================
window.closeTutorialPopup = function() {
    document.getElementById('tutorial-overlay').style.display = 'none';
    if (currentTutorialEnemy) {
        showQuizUI(currentTutorialEnemy.data, currentTutorialEnemy.scene, currentTutorialEnemy.mainEnemy, currentTutorialEnemy.wall);
        currentTutorialEnemy = null;
    } else {
        isQuizTime = false; currentScene.physics.resume();
    }
}

function collectItem(scene, playerRef, item) { 
    if(isQuizTime) return; 
    if(item.attachedArrow) item.attachedArrow.destroy();
    
    if (item.isTutorial) {
        scene.physics.pause(); isQuizTime = true;
        document.getElementById('tutorial-title').innerText = "HINT";
        document.getElementById('tutorial-title').style.color = "#DAA520";
        document.getElementById('tutorial-overlay').style.borderColor = "#FFD700";
        document.getElementById('tutorial-text').innerText = item.tutMsg;
        document.getElementById('tutorial-overlay').style.display = 'block';
        item.destroy(); return;
    }

    itemsCollectedCount++; scene.physics.pause(); isQuizTime = true; playerRef.body.setVelocity(0, 0); scene.sound.play('collect'); 
    const emitter = scene.add.particles(item.x, item.y, 'star', { speed: { min: 50, max: 200 }, scale: { start: 1, end: 0 }, lifespan: 1000, gravityY: 300 }); emitter.explode(20); 
    
    let content = item.dataContent.hint; 
    if (item.dataContent.hint_img) {
        content += `<br><img src="${item.dataContent.hint_img}" style="max-width: 100%; max-height: 200px; margin-top: 15px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">`;
    }

    item.destroy(); currentScene = scene; 
    let overlay = document.getElementById('quiz-overlay'); overlay.style.borderColor = "#FFD700"; 
    document.getElementById('quiz-title').innerText = "HINT"; document.getElementById('quiz-title').style.color = "#DAA520"; 
    document.getElementById('quiz-content').innerHTML = content; document.getElementById('options-area').style.display = 'none'; document.getElementById('input-area').style.display = 'none'; document.getElementById('feedback-area').style.display = 'none'; document.getElementById('hint-area').style.display = 'block'; overlay.style.display = 'block'; 
    if (window.MathJax) MathJax.typesetPromise(); 
}

function meetEnemy(scene, playerRef, enemyOrWall) { 
    if(isQuizTime || isKnockedBack) return; 
    scene.physics.pause(); isQuizTime = true; playerRef.body.setVelocity(0, 0); 
    let mainEnemy = enemyOrWall.visual || enemyOrWall; let wall = enemyOrWall.wall || enemyOrWall; let data = mainEnemy.dataContent; 
    if(mainEnemy.attachedArrow) mainEnemy.attachedArrow.destroy();

    if (mainEnemy.isTutorial && !mainEnemy.tutShown) {
        mainEnemy.tutShown = true;
        document.getElementById('tutorial-title').innerText = "QUESTION";
        document.getElementById('tutorial-title').style.color = "#800080";
        document.getElementById('tutorial-overlay').style.borderColor = "#800080";
        document.getElementById('tutorial-text').innerText = "This is your enemy. Answer a question to defeat your enemy. Defeat all enemies to complete the game.";
        document.getElementById('tutorial-overlay').style.display = 'block';
        currentTutorialEnemy = { mainEnemy, wall, data, scene };
        return;
    }
    showQuizUI(data, scene, mainEnemy, wall); 
}

function reachCheckpoint(scene, playerRef, cp) {
    if(cp.attachedArrow) cp.attachedArrow.destroy();
    if (cp.isTutorial) {
        if (!cp.tutShown) {
            cp.tutShown = true; scene.physics.pause(); isQuizTime = true;
            document.getElementById('tutorial-title').innerText = "CHECKPOINT";
            document.getElementById('tutorial-title').style.color = "#28a745";
            document.getElementById('tutorial-overlay').style.borderColor = "#28a745";
            document.getElementById('tutorial-text').innerText = cp.tutMsg;
            document.getElementById('tutorial-overlay').style.display = 'block';
            
            let tutLabel = document.getElementById('hud-tutorial-label');
            if (tutLabel) tutLabel.style.display = 'none';

            savedCheckpoint = { x: cp.x, y: cp.y - 50, progress: correctAnswersCount, heartLostCount: heartLostCount, itemsCollectedCount: itemsCollectedCount, streak: currentStreak }; // <-- THÊM STREAK
        }
    } else {
        if (!cp.reached) {
            cp.reached = true; scene.sound.play('collect');
            let floatTxt = scene.add.text(cp.x, cp.y - 50, 'CHECKPOINT REACHED!', { fontSize: '20px', fill: '#00ff00', fontStyle: 'bold', backgroundColor: '#000', padding: {x:5,y:5} }).setOrigin(0.5);
            scene.tweens.add({ targets: floatTxt, y: cp.y - 100, alpha: 0, duration: 1500, onComplete: () => floatTxt.destroy() });
            
            savedCheckpoint = { x: cp.x, y: cp.y - 50, progress: correctAnswersCount, heartLostCount: heartLostCount, itemsCollectedCount: itemsCollectedCount, streak: currentStreak }; // <-- THÊM STREAK
        }
    }
}

function showQuizUI(data, scene, enemy, wall) { 
    currentScene = scene; currentEnemy = enemy; currentWall = wall; currentData = data; 
    let overlay = document.getElementById('quiz-overlay'); overlay.style.borderColor = "#800080"; 
    document.getElementById('quiz-title').innerText = "QUESTION"; document.getElementById('quiz-title').style.color = "#800080"; 
    
    let qContent = data.question;
    if (data.question_img) {
        qContent += `<br><img src="${data.question_img}" style="max-width: 100%; max-height: 200px; margin-top: 15px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">`;
    }
    document.getElementById('quiz-content').innerHTML = qContent;
    
    document.getElementById('hint-area').style.display = 'none'; document.getElementById('feedback-area').style.display = 'none'; 
    let optionsArea = document.getElementById('options-area'); let inputArea = document.getElementById('input-area'); let btns = document.getElementsByClassName('option-btn'); 
    optionsArea.style.display = 'none'; inputArea.style.display = 'none'; for(let btn of btns) btn.style.display = 'none'; 
    
    if (data.type === 'multi_4' || data.type === 'multi_2') { 
        optionsArea.style.display = 'block'; 
        
        // THUẬT TOÁN ĐẢO ĐÁP ÁN: Lấy danh sách các key gốc (VD: ["A", "B", "C", "D"])
        let keys = Object.keys(data.options);
        
        // Đảo vị trí ngẫu nhiên trong mảng keys
        for (let i = keys.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [keys[i], keys[j]] = [keys[j], keys[i]];
        }
        
        // Gán văn bản vào nút dựa trên mảng đã đảo
        for (let i = 0; i < keys.length; i++) {
            btns[i].style.display = 'block'; 
            let displayLetter = String.fromCharCode(65 + i); // Render lại thành "A.", "B." theo thứ tự mới
            btns[i].innerHTML = displayLetter + ". " + data.options[keys[i]]; 
            btns[i].dataset.val = keys[i]; // Gắn cái "nhãn" gốc vào để check logic sư phạm
        }
    } 
    else if (data.type === 'input') { 
        inputArea.style.display = 'block'; document.getElementById('answer-input').value = ""; 
    } 
    overlay.style.display = 'block'; if (window.MathJax) MathJax.typesetPromise(); 
}
window.closePopup = function() { 
    document.getElementById('quiz-overlay').style.display = 'none'; 
    isQuizTime = false; 
    currentScene.physics.resume(); 
}
window.checkAnswer = function(selectedOption) { processResult(selectedOption === currentData.correct, selectedOption); }
window.checkInputAnswer = function() { let userVal = document.getElementById('answer-input').value.trim(); let isCorrect = currentData.correct.some(ans => ans.toLowerCase() === userVal.toLowerCase()); processResult(isCorrect, userVal); }

let currentFeedbackState = null;
function showFeedbackPopup(isCorrect, message) { 
    let overlay = document.getElementById('quiz-overlay'); 
    let fbArea = document.getElementById('feedback-area'); 
    let fbMsg = document.getElementById('feedback-message'); 
    let contentDiv = document.getElementById('quiz-content'); 
    
    document.getElementById('options-area').style.display = 'none'; 
    document.getElementById('input-area').style.display = 'none'; 
    document.getElementById('hint-area').style.display = 'none'; 
    
    // Đảm bảo 2 nút review luôn ẨN đi trong lúc chơi bình thường
    document.getElementById('btn-knowledge-review').style.display = 'none';
    document.getElementById('btn-questions-review').style.display = 'none';

    fbArea.style.display = 'block'; 
    fbMsg.style.textShadow = "none";
    
    if (isCorrect) { 
        currentFeedbackState = 'CORRECT'; 
        overlay.style.borderColor = "#155724"; 
        document.getElementById('quiz-title').innerText = "CORRECT!"; 
        document.getElementById('quiz-title').style.color = "#155724"; 
        fbMsg.className = "correct-text"; 
        fbMsg.style.color = "#155724"; 
        fbMsg.innerText = message; 
        contentDiv.innerHTML = ""; 
        currentScene.sound.play('correct'); 
    } 
    else { 
        currentFeedbackState = 'WRONG'; 
        overlay.style.borderColor = "#dc3545"; 
        document.getElementById('quiz-title').innerText = "WRONG!"; 
        document.getElementById('quiz-title').style.color = "#dc3545"; 
        fbMsg.className = "wrong-text"; 
        fbMsg.style.color = "#dc3545"; 
        fbMsg.innerText = message; 
        currentScene.sound.play('wrong'); 
        currentScene.cameras.main.shake(200, 0.02); 
        currentScene.cameras.main.flash(200, 255, 0, 0); 
    } 
    if (window.MathJax) MathJax.typesetPromise(); 
}

window.closeFeedback = function() { 
    if (currentFeedbackState === 'CORRECT') { 
        document.getElementById('quiz-overlay').style.display = 'none'; 
        if(currentEnemy) { 
            isAttacking = true; if(player.anims) player.anims.resume(); player.anims.play('attack', true); currentScene.sound.play('attack'); 
            currentScene.tweens.add({ targets: player, x: player.x + 30, duration: 300, onComplete: () => {
                currentScene.sound.play('explosion'); 
                currentScene.tweens.add({ targets: currentEnemy, scaleX: 2.0, scaleY: 0.1, alpha: 0, y: currentEnemy.y + 20, duration: 200, onComplete: () => { 
                    const emitter = currentScene.add.particles(currentEnemy.x, currentEnemy.y, 'smoke', { speed: { min: 100, max: 300 }, scale: { start: 1.0, end: 0 }, lifespan: 500, blendMode: 'ADD' }); emitter.explode(30); 
                    currentEnemy.destroy(); if(currentWall) currentWall.destroy(); 
                    isAttacking = false; isQuizTime = false; currentScene.physics.resume(); 
                }}); 
            }});
        } else { if(currentWall) currentWall.destroy(); setTimeout(() => { isQuizTime = false; currentScene.physics.resume(); }, 300); }
    } else { 
        document.getElementById('quiz-overlay').style.display = 'none'; 
        
        if (lives <= 0) {
            doGameOver(currentScene, player, "Game Over (Too many wrong answers)");
        } else {
            resetQuizUIForRetry(); isQuizTime = false; currentScene.physics.resume(); 
            isKnockedBack = true; player.setTint(0xff0000); player.setVelocity(-200, -300); player.body.setDragX(1000); currentScene.sound.play('cat_meow'); 
            currentScene.tweens.add({ targets: currentEnemy, x: currentEnemy.x - 40, duration: 100, yoyo: true });
            currentScene.time.delayedCall(800, () => { isKnockedBack = false; player.clearTint(); player.body.setDragX(0); });
        }
    } 
}

function resetQuizUIForRetry() { 
    let data = currentData; let overlay = document.getElementById('quiz-overlay'); let fbArea = document.getElementById('feedback-area'); fbArea.style.display = 'none'; overlay.style.borderColor = "#800080"; document.getElementById('quiz-title').innerText = "QUESTION"; document.getElementById('quiz-title').style.color = "#800080"; 
    
    let qContent = data.question;
    if (data.question_img) {
        qContent += `<br><img src="${data.question_img}" style="max-width: 100%; max-height: 200px; margin-top: 15px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">`;
    }
    document.getElementById('quiz-content').innerHTML = qContent;
    
    if (data.type === 'multi_4' || data.type === 'multi_2') { document.getElementById('options-area').style.display = 'block'; } else { document.getElementById('input-area').style.display = 'block'; } if (window.MathJax) MathJax.typesetPromise(); 
}

// ==========================================
// GAMEOVER, LIVES & RESTART
// ==========================================
function processResult(isCorrect, userAnswer) { 
    if (isCorrect) {
        currentStreak++; // <--- CỘNG 1 VÀO CHUỖI THẮNG
        if (currentData.id !== "T1") { 
            correctAnswersCount++; 
            updateProgressBar(); 
            sendLiveUpdate("playing"); 
        }
        
        let extraMsg = "";
        if (currentData.id === "Q7" && userAnswer === "D") {
            extraMsg = "\n\n💡 Explain: " + currentData.explain_4;
        }
        showFeedbackPopup(true, "Excellent! The enemy has been defeated." + extraMsg); 
    } else { 
        currentStreak = 0; // <--- RESET CHUỖI THẮNG VỀ 0 VÌ TRẢ LỜI SAI
        handleWrongAnswer(currentData.id, userAnswer); 
    } 
}

function updateLivesUI() { 
    for(let i=1; i<=3; i++) {
        let heartImg = document.getElementById('life' + i);
        if (heartImg) {
            heartImg.src = (i <= lives) ? 'assets/img/heart.png' : 'assets/img/heart_empty.png';
        }
    }
}

function takeEnvironmentalDamage(scene, playerRef) { 
    if(isGameOver) return; 
    lives--; heartLostCount++; updateLivesUI(); 
    scene.sound.play('wrong'); scene.cameras.main.shake(300, 0.03); scene.cameras.main.flash(300, 255, 0, 0); 
    if (lives > 0) { 
        isGameOver = true; playerRef.setTint(0xff0000); 
        setTimeout(() => { scene.scene.restart(savedCheckpoint ? { isCheckpointRestart: true, keepLives: true } : { keepLives: true }); }, 800); 
    } else { doGameOver(scene, playerRef, "Game Over (Out of lives)"); } 
}

function handleWrongAnswer(questionId, wrongAnswerVal) { 
    // Dịch nhãn gốc (A, B, C...) thành câu văn hoàn chỉnh
    let ansText = currentData.options ? currentData.options[wrongAnswerVal] : wrongAnswerVal;

    if (questionId === "T1") return showFeedbackPopup(false, "You chose: " + ansText + "\n\n💡 Hint: Tutorial: 1 + 1 = 2");
    
    lives--; heartLostCount++; updateLivesUI(); 
    
    let qStats = questionStats[questionId];
    if (qStats) { qStats.wrongCount++; qStats.wrongAnswers.push(wrongAnswerVal); } 
    
    if (currentEnemy) {
        currentEnemy.localFails = (currentEnemy.localFails || 0) + 1;
        currentEnemy.localHistory = currentEnemy.localHistory || [];
        currentEnemy.localHistory.push(wrongAnswerVal);
    }
    
    let localFailCount = currentEnemy ? currentEnemy.localFails : 1;
    let localHistory = currentEnemy ? currentEnemy.localHistory : [wrongAnswerVal];

    let q = currentData;
    let explanation = "";
    let prefix = "Hint: ";
    
    if (q.id === "Q2") {
        if (wrongAnswerVal === "A" || wrongAnswerVal === "D") explanation = q.explain_1;
        else if (wrongAnswerVal === "C") explanation = q.explain_2;
        else explanation = q.explain_3;
    } else if (q.id === "Q3") {
        if (wrongAnswerVal === "C" || wrongAnswerVal === "D") explanation = q.explain_1;
        else if (wrongAnswerVal === "A") explanation = q.explain_2;
        else explanation = q.explain_3;
    } else if (q.id === "Q4") {
        if (wrongAnswerVal === "B" || wrongAnswerVal === "D") explanation = q.explain_1;
        else if (wrongAnswerVal === "A") explanation = q.explain_2;
        else explanation = q.explain_3;
    } else if (q.id === "Q6") {
        let pickedC = localHistory.includes("C");
        let pickedAD = localHistory.filter(ans => ans === "A" || ans === "D").length;

        if (wrongAnswerVal === "C") {
            if (localHistory.length === 1) explanation = q.explain_2; 
            else { explanation = q.explain_3; prefix = "Explain: "; } 
        } else {
            if (pickedC) { 
                explanation = q.explain_3; prefix = "Explain: ";
            } else {
                if (pickedAD === 1) explanation = q.explain_1;
                else if (pickedAD === 2) explanation = q.explain_2;
                else { explanation = q.explain_3; prefix = "Explain: "; }
            }
        }
    } else if (q.id === "Q7") {
        if (wrongAnswerVal === "A") explanation = q.explain_1;
        else if (wrongAnswerVal === "B") explanation = q.explain_2;
        else if (wrongAnswerVal === "C") { explanation = q.explain_3; prefix = "Explain: "; }
    } else {
        if (localFailCount === 1) explanation = q.explain_1;
        else if (localFailCount === 2) explanation = q.explain_2;
        else { explanation = q.explain_3; prefix = "Explain: "; }
    }

    if (lives <= 0 || localFailCount >= 3) {
        prefix = "Explain: ";
        if(q.explain_3) explanation = q.explain_3;
    }

    // Hiển thị nội dung hoàn chỉnh của đáp án người chơi đã bấm thay vì A,B,C
    let msg = "You chose: " + ansText + "\n\n💡 " + prefix + explanation; 
    
    showFeedbackPopup(false, msg); 
    if (lives > 0) sendLiveUpdate("playing");
}
function doGameOver(scene, playerRef, status) { 
    playerRef.setTint(0x000000); isGameOver = true; playerRef.body.setVelocity(0,0); 
    if (scene && scene.bgMusic) scene.bgMusic.stop(); 
    
    let goOverlay = document.getElementById('game-over-overlay');
    let goMsg = document.getElementById('game-over-msg');
    let goBtn = document.getElementById('game-over-btn');
    
    goOverlay.style.display = 'flex';
    goMsg.innerText = "Submitting your results...\nPlease wait.";
    goBtn.style.display = 'none';

    db.ref('sessions/' + userId).onDisconnect().cancel();
    sendLiveUpdate("finished (Game Over)");

    setTimeout(() => {
        goMsg.innerText = "Your results have been submitted!\nDon't give up, let's try again!";
        goBtn.style.display = 'block';
    }, 1500);
}

window.closeGameOverAndRestart = function() {
    document.getElementById('game-over-overlay').style.display = 'none';
    if (savedCheckpoint) currentScene.scene.restart({ isCheckpointRestart: true }); 
    else restartFromBeginning();
}

function showSummaryPopup() {
    let duration = Math.floor((Date.now() - gameStartTime) / 1000); let minutes = Math.floor(duration / 60); let seconds = duration % 60; let timeStr = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
    let summaryHTML = `<div style="text-align: left; display: inline-block; background: #f8f9fa; padding: 15px; border-radius: 10px; width: 100%; box-sizing: border-box; max-height: 350px; overflow-y: auto; text-shadow: none; color: #333;">`;
    summaryHTML += `<p style="margin-top:0; font-size: 24px; text-shadow: none; color: #000;"><b>⏱ Total Time:</b> <span style="color:#007bff">${timeStr}</span></p>`;
    let hasWrong = false; let wrongDetails = `<ul style="text-align: left; padding-left: 20px; font-size: 20px;">`;
    
    for(let i=1; i<=7; i++) {
        let qID = "Q" + i; let stats = questionStats[qID];
        if(stats && stats.wrongCount > 0) {
            hasWrong = true; let qData = levelData.find(q => q.id === qID); let qText = qData ? qData.question : ""; 
            
            let formattedAnswers = stats.wrongAnswers.map(ans => {
                if (qData && (qData.type === 'multi_4' || qData.type === 'multi_2')) return qData.options[ans];
                return ans.trim() === "" ? "[blank]" : ans;
            }).join(" | ");
            
           // Đã xóa số lần sai và thêm khoảng cách (margin-top: 10px) trước chữ Your answers
            wrongDetails += `<li style="margin-bottom: 12px; border-bottom: 1px solid #ddd; padding-bottom: 10px;"><b>Q${i}:</b> ${qText}<div style="margin-top: 10px; font-size: 18px; color: #dc3545;"><b>Your answers:</b> ${formattedAnswers}</div></li>`;
        }
    }
    wrongDetails += `</ul>`;
    
    let topicsArr = getReviewTopics();
    if(topicsArr.length > 0) {
        summaryHTML += `<p style="font-size: 24px; text-shadow: none; color: #000;"><b>📚 You should review:</b></p><ul style="text-align: left; padding-left: 20px; font-size: 20px; color: #dc3545; margin-top: 5px;">`;
        topicsArr.forEach(topic => { summaryHTML += `<li style="margin-bottom: 8px;">${topic}</li>`; });
        summaryHTML += `</ul>`;
    }
    
    if(hasWrong) summaryHTML += `<p style="font-size: 24px; text-shadow: none; color: #000;"><b>❌ Mistakes Summary:</b></p> ${wrongDetails}`; 
    else summaryHTML += `<p style="color:#28a745; font-size: 24px; text-shadow: none;"><b>🏆 Perfect Run! No mistakes made!</b></p>`;
    
    summaryHTML += `</div>`;
    let overlay = document.getElementById('quiz-overlay'); overlay.style.borderColor = "#28a745"; document.getElementById('quiz-title').innerText = "LEVEL CLEARED!"; document.getElementById('quiz-title').style.color = "#28a745"; document.getElementById('quiz-content').innerHTML = summaryHTML; 
    document.getElementById('options-area').style.display = 'none'; document.getElementById('input-area').style.display = 'none'; document.getElementById('hint-area').style.display = 'none'; 
    
    let fbArea = document.getElementById('feedback-area'); let fbMsg = document.getElementById('feedback-message'); fbMsg.innerText = "Results have been sent to your teacher."; fbMsg.className = "correct-text"; fbMsg.style.textShadow = "none"; fbMsg.style.color = "#000"; 
    
    // HIỆN 2 NÚT REVIEW LÊN
    document.getElementById('btn-knowledge-review').style.display = 'inline-block';
    document.getElementById('btn-questions-review').style.display = 'inline-block';

    let fbBtn = document.getElementById('feedback-btn'); fbBtn.innerText = "Finish & Restart"; fbBtn.onclick = function() { location.reload(); }; 
    fbArea.style.display = 'block'; overlay.style.display = 'block'; if (window.MathJax) MathJax.typesetPromise();
}

function winGame(scene, playerRef, finishLine) { 
    if(isGameOver) return; isGameOver = true; playerRef.body.setVelocity(0, 0); playerRef.body.allowGravity = false; if (scene.bgMusic) scene.bgMusic.stop(); 
    scene.tweens.add({ targets: playerRef, x: finishLine.x - 40, duration: 1000, onStart: () => playerRef.anims.play('run', true), onComplete: () => {
        playerRef.anims.play('idle', true);
        scene.tweens.add({ targets: playerRef, x: playerRef.x + 15, duration: 300, yoyo: true, repeat: 2, onStart: () => scene.sound.play('cat_meow'), onComplete: () => {
            const hearts = scene.add.particles(playerRef.x, playerRef.y - 20, 'heart', { speedY: { min: -50, max: -150 }, speedX: { min: -20, max: 20 }, scale: { start: 1, end: 0 }, lifespan: 2000, frequency: 200, gravityY: -50 });
            scene.sound.play('win'); scene.cameras.main.flash(500, 255, 255, 255); 
            const firework = scene.add.particles(scene.cameras.main.scrollX + 400, 600, 'star', { speed: { min: 200, max: 500 }, angle: { min: 220, max: 320 }, scale: { start: 1.5, end: 0 }, lifespan: 2000, gravityY: 400, frequency: 50, blendMode: 'ADD' }); 
            
            setTimeout(() => { 
                hearts.stop(); 
                db.ref('sessions/' + userId).onDisconnect().cancel();
                sendLiveUpdate("finished (Victory)");
                showSummaryPopup(); 
            }, 3000);
        }});
    }});
}

function alignUIToCanvas() {
    let canvas = document.querySelector('canvas');
    if (!canvas) return;
    
    let rect = canvas.getBoundingClientRect();
    
    let topLeft = document.getElementById('hud-top-left');
    let topRight = document.getElementById('hud-controls');
    let progress = document.getElementById('hud-progress');
    
    if (topLeft) {
        topLeft.style.left = (rect.left + 15) + 'px';
        topLeft.style.top = (rect.top + 15) + 'px';
    }
    if (topRight) {
        topRight.style.right = (window.innerWidth - rect.right + 15) + 'px';
        topRight.style.top = (rect.top + 15) + 'px';
    }
    if (progress) {
        progress.style.top = (rect.top + 15) + 'px';
    }
}
// ==========================================
// REVIEW POP-UPS LOGIC
// ==========================================
window.openKnowledgeReview = function() {
    document.getElementById('knowledge-review-overlay').style.display = 'block';
};

window.closeKnowledgeReview = function() {
    document.getElementById('knowledge-review-overlay').style.display = 'none';
};

window.openQuestionsReview = function() {
    let contentDiv = document.getElementById('questions-review-content');
    let html = "";
    
    levelData.forEach((q, index) => {
        html += `<div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px dashed #ccc; text-align: left;">`;
        
        // Ép font Roboto và bỏ bóng mờ cho câu hỏi
        html += `<p style="margin: 0 0 10px 0; font-size: 20px; font-family: 'Roboto', sans-serif; text-shadow: none; color: #333; text-align: left;"><b>Question ${index + 1}:</b> ${q.question}</p>`;
        
        let correctText = "";
        if (q.type === 'multi_4' || q.type === 'multi_2') {
            correctText = q.options[q.correct];
        } else if (q.type === 'input') {
            correctText = q.correct.join(" or ");
        }
        
        // Ép font Roboto và bỏ bóng mờ cho đáp án
        html += `<p style="margin: 0; color: #28a745; font-size: 18px; font-family: 'Roboto', sans-serif; text-shadow: none; text-align: left;"><b>✅ Correct Answer:</b> ${correctText}</p>`;
        html += `</div>`;
    });
    
    contentDiv.innerHTML = html;
    document.getElementById('questions-review-overlay').style.display = 'block';
    
    if (window.MathJax) MathJax.typesetPromise(); 
};

window.closeQuestionsReview = function() {
    document.getElementById('questions-review-overlay').style.display = 'none';
};
window.addEventListener('resize', alignUIToCanvas);