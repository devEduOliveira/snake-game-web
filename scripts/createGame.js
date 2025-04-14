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

function createElement(tag, className){
    let element = document.createElement(tag);
    element.className = className;
    return element;
}

function draw(){
    gameBoard.innerHTML = ``
    drawSnake()
    drawFood()
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
        x = Math.floor(Math.random() * gridSize) + 1; 
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
    const head = {...snake[0]}
    switch (direction) {
        case 'up':
            head.y--
            break;

        case 'down':
            head.y++
            break;

        case 'left':
            head.x--
            break;

        case 'right':
            head.x++
            break;                           
    }
    snake.unshift(head)

    if(head.x === food.x && head.y === food.y){
        eatApple++
        food = generateFood()
        clearInterval(gameInterval);
        gameInterval = setInterval(() => {
            move()
            checkCollision()
            draw()
            esterEgg()
        }, gameSpeed);
    } else if (head.x === randomFood.x && head.y === randomFood.y && snake.length % 2 === 0 && snake.length > 5){
        eatGoldenApple++
        randomFood = generateFood()
        clearInterval(gameInterval);
        gameSpeed -= Math.floor(Math.random() * 10)
        gameInterval = setInterval(() => {
            move()
            checkCollision()
            draw()
            esterEgg()
        }, gameSpeed);  
    } else {
        snake.pop();
    }
}

function startGame(){
    score.classList.toggle('disable', false)
    scoreLabel.classList.toggle('disable', false)
    inputName.classList.toggle('disable', true)
    startPage.classList.toggle('disable', true)
    ranking.classList.toggle('disable', true)
    rules.classList.toggle('disable', true)

    gameStarted = true
    gameInterval = setInterval(() => {
        draw()
        checkCollision()
        move()
    }, gameSpeed);
}

function handleKeyPress(event){
    let name = document.querySelector(".inputName")
    if(name.value == ""){
        name.focus()
    } else {
        if (!gameStarted && event.code === 'Space'||
            !gameStarted && event.key === ""
        ) {
            startGame()    
        } else {
            switch (event.key) {
                case "ArrowUp":
                    if(direction != "down"){ 
                        direction = "up" 
                    }
                    break;
                case "ArrowDown":
                    if(direction != "up"){ 
                        direction = "down" 
                    }
                    break;
                case "ArrowRight":
                    if(direction != "left"){
                        direction = "right"
                    }
                    break;
                case "ArrowLeft":
                    if(direction != "right"){
                        direction = "left"
                    }
                    break;
            }
        }
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
    console.log(eatApple);
    
}