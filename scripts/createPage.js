function createStructure(){
    const containerGame = document.getElementById("game");

    const screenBorder = createElement("div", "screenBorder")
    
        const gameBoard = createElement("div", "gameBoard")
        screenBorder.appendChild(gameBoard);

    const startPage = createStartPage();

    containerGame.appendChild(screenBorder)
    containerGame.appendChild(startPage)
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

