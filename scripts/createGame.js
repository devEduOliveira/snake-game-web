const gameBoard = document.querySelector(".gameBoard")

const gridSize = 20;
let snake = [{x: 10, y:10}];

function createElement(tag, className){
    let element = document.createElement(tag);
    element.className = className;
    return element;
}

function draw(){
    gameBoard.innerHTML = ``
    drawSnake()
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

function setPosition(element, position){
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}