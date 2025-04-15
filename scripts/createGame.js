const gameBoard = document.querySelector(".gameBoard")
const startPage = document.querySelector(".startPage") 
const foodElement = document.querySelector(".food");
const inputName = document.querySelector(".inputName")
const ranking = document.querySelector(".scoreHigh")
const score = document.querySelector(".score")
const scoreLabel = document.querySelector(".scoreLabel")
const rules = document.querySelector(".rules")
const gameOver = document.querySelector(".gameOver")

// global variables
const gridSize = 20;
let snake = [{x: 10, y:10}];
let food = generateFood();
let randomFood = generateFood()
let direction = ""
let gameInterval
let gameSpeed = 200
let gameStarted = false;
let changeDirection = true
let highScore = 0
let eatApple = 0
let eatGoldenApple = 0

function createElement(tag, className){
    let element = document.createElement(tag);
    element.className = className;
    return element;
}

function draw(){
    gameBoard.innerHTML = ``
    drawSnake()
    drawFood()
    updateScore()
}

function drawSnake(){
    snake.forEach((segment, index) => {
        const snakeElement = createElement("div", "snake");
    
        if (index === 0) {
            snakeElement.classList.add("snake-head");
        }
    
        setPosition(snakeElement, segment);
        gameBoard.appendChild(snakeElement);
    });
}

function drawRandomFood(){
    if (snake.length > 4 && snake.length % 2 != 0) {
        const randomFoodElement = createElement("div", "foodRandom")
        setPosition(randomFoodElement, randomFood)
        gameBoard.appendChild(randomFoodElement);
    }
}

function drawFood(){
    if(gameStarted){
        const foodElement = createElement("div", "food")
        setPosition(foodElement, food)
        gameBoard.appendChild(foodElement); 
        drawRandomFood()
    }
}

function generateFood() {
    let x, y;
    let valid = false;

    while (!valid) {
        x = Math.floor(Math.random() * gridSize) + 1; // ou o tamanho do grid que você usa
        y = Math.floor(Math.random() * gridSize) + 1;

        valid = !snake.some(segment => segment.x === x && segment.y === y);
    }

    return { x, y };
}

function setPosition(element, position){
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

function move(){
    changeDirection = true
    const head = {...snake[0]}

    const moves = {
        up: () => head.y--,
        down: () => head.y++,
        left: () => head.x--,
        right: () => head.x++
    }
    moves[direction]?.();

    snake.unshift(head)

    const eatFoodNormal = head.x === food.x && head.y === food.y;
    const eatFoodRandom = head.x === randomFood.x && head.y === randomFood.y && snake.length % 2 === 0 && snake.length > 5;

    if(eatFoodNormal || eatFoodRandom){
        if(eatFoodNormal){
            eatApple++
            food = generateFood()
        } else {
            eatGoldenApple++
            randomFood = generateFood()
            gameSpeed -= Math.floor(Math.random() * 10);
        }
        
        resetGameLoop()
    } else {
        snake.pop()
    }
}

function resetGameLoop() {
    clearInterval(gameInterval)
    gameInterval = setInterval(() => {
        move()
        checkCollision()
        draw()
        esterEgg()
    }, gameSpeed)
}

function startGame(){
    score.classList.toggle('disable', false)
    scoreLabel.classList.toggle('disable', false)
    inputName.classList.toggle('disable', true)
    startPage.classList.toggle('disable', true)
    ranking.classList.toggle('disable', true)
    rules.classList.toggle('disable', true)

    gameStarted = true
    resetGameLoop()
}

function handleKeyPress(event) {
    const name = document.querySelector(".inputName");
    if (!name.value) return name.focus();

    if (!gameStarted && (event.code === "Space" || event.key === "")) return startGame();

    const opposite = { ArrowUp: "down", ArrowDown: "up", ArrowRight: "left", ArrowLeft: "right" };
    const newDir = event.key;

    if (opposite[newDir] && direction !== opposite[newDir] && changeDirection) {
        direction = newDir.slice(5).toLowerCase();
        changeDirection = false;
    }
}

function activeKeyDown() {
    document.addEventListener("keydown", handleKeyPress);
}

function disableKeyDown() {
    document.removeEventListener("keydown", handleKeyPress);
}

document.addEventListener("DOMContentLoaded", () => {
    activeKeyDown();
});

function checkCollision(){
    const head = {...snake[0]}

    if(head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize){
        resetGame()
    }

    for(let i = 1; i < snake.length; i++){
        if(head.x === snake[i].x && head.y === snake[i].y){
            resetGame()    
        }
    }
}

function resetGame(){
    updateHighScore()
    stopGame();
    snake = [{x: 10, y: 10}];
    food = generateFood();
    direction = 'right';
    updateScore();
}

function updateScore(){
    const currentScore = snake.length - 1;    
    score.textContent = currentScore.toString().padStart(3, "0");
}

function stopGame(){    
    gameOver.classList.toggle("disable", false)
    disableKeyDown()

    setTimeout(() => {
        score.classList.toggle("rgb-text", false)

        gameOver.classList.toggle("disable", true)
        scoreLabel.classList.toggle('disable', true)
        score.classList.toggle('disable', true)
        inputName.classList.toggle('disable', false)
        startPage.classList.toggle('disable', false)
        ranking.classList.toggle('disable', false)
        rules.classList.toggle('disable', false)
        activeKeyDown()
    }, 3000);

    gameSpeed = 200
    clearInterval(gameInterval)
    gameStarted = false;
    countEsterEgg = 0
}

function updateHighScore(){
    let currentScore = snake.length - 1;
    let name = document.querySelector(".inputName").value
    document.querySelector(".gameOverTitle").innerText = `Score: ${currentScore}`

    if(currentScore > 1){
        addPlayerInScore(name, currentScore)
        showRanking()
    }
}

function addPlayerInScore(player, score){
    let ranking = loadLocalStorage();
    ranking.push({name: player, score})
    ranking.sort((a, b) => b.score - a.score);
    saveInLocalStorage(ranking)
}

function showRanking(){
    const table = document.querySelector(".scoreRankTable")
    table.innerHTML = `
                <tr>
                    <th id="rank"></th>
                    <th id="name">Name</th>
                    <th id="score">Score</th>
                </tr>
            
            `
    const ranking = loadLocalStorage();
    const top3 = ranking.slice(0, 5);
    top3.forEach((player, index) => {
        table.innerHTML += `
            <tr>
                <th id="rank">${index +1}</th>
                <th id="name">${player.name}</th>
                <th id="score">${player.score}</th>
            </tr>`
    });
}
showRanking()

function saveInLocalStorage(dados){
    localStorage.setItem("rankingSnake", JSON.stringify(dados))
}

function loadLocalStorage(){
    const data = localStorage.getItem("rankingSnake")
    return data ? JSON.parse(data) : []
}

function esterEgg() {
    // make esteregg later
}

function showModal(){
    const modal = document.querySelector(".modal")
    modal.classList.toggle("disable")
}