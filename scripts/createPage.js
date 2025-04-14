function createStructure(){
    const containerGame = document.getElementById("game");

    const screenBorder = createElement("div", "screenBorder")
    
        const gameBoard = createElement("div", "gameBoard")
        screenBorder.appendChild(gameBoard);

    const startPage = createStartPage();
    const gameOverPage = createGameOverPage();
    const scoreContainer = createScore();

    containerGame.appendChild(screenBorder)
    containerGame.appendChild(startPage)
    containerGame.appendChild(gameOverPage)
    containerGame.appendChild(scoreContainer)
}

createStructure()

function createElement(element, className){
    const elementCard = document.createElement(element);
    elementCard.className = className;
    return elementCard;
}

function createStartPage(){
    const startPage = createElement("div", "startPage")
        const image = createElement("img", "logo")

        const title = createElement("h4", "title elemento-animado")
        title.innerText = "Press 'space' to start"
    
    startPage.appendChild(image)
    startPage.appendChild(title)
    return startPage;
}

function createGameOverPage(){
    const gameOverPage = createElement("div", "gameOver disable")

    const image = createElement("img", "logoGameOver")
    const gameOverTitle = createElement("h4", "gameOverTitle")
    gameOverTitle.innerText = `Score: `

    gameOverPage.appendChild(gameOverTitle)
    gameOverPage.appendChild(image)
    return gameOverPage;
}

function createScore(){
    const scoreContainer = createElement("div", "scoreContainer")
        const score = createElement("div", "score disable")
        score.innerText = "000"

        const scoreLabel = createElement("div", "scoreLabel disable")
        scoreLabel.innerText = "SCORE"

        const rules = createElement("div", "rules")
        rules.setAttribute("onclick", "showModal()")
        rules.innerText = "RULES"
        
        const scoreHigh = createElement("div", "scoreHigh")
        scoreHigh.innerText = "RANKING"

        const inputName = createElement("input", "inputName")
        inputName.setAttribute("placeholder", "insert username")

        const scoreRank = createElement("div", "scoreRank")
            const scoreTable = createElement("table", "scoreRankTable") 
            scoreTable.innerHTML = `
                <tr>
                    <th id="rank"></th>
                    <th id="name">Name</th>
                    <th id="score">Score</th>
                </tr>
            
            `
        scoreRank.appendChild(scoreTable)
         
    scoreContainer.appendChild(rules)        
    scoreContainer.appendChild(score)
    scoreContainer.appendChild(scoreLabel)
    scoreContainer.appendChild(inputName)
    scoreContainer.appendChild(scoreHigh)
    scoreContainer.appendChild(scoreRank)
    return scoreContainer;
}

function showScores(evenet){
    const scoreRank = document.querySelector(".scoreRank")
    if(evenet.type == "mouseover"){
        scoreRank.style.display = 'block';
        scoreRank.style.opacity = '1';
    } else {
        scoreRank.style.display = 'none';
        scoreRank.style.opacity = '0';
    } 
}

