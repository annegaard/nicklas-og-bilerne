// **** Global variables ****

const startBtn = document.querySelector(".start-btn")
const scoreDisplay = document.querySelector(".score")
const gameOverText = document.querySelector(".gameover-text")
const lightning = document.querySelector('lightning-animation')
const grid = document.querySelector(".grid")
const width = 10
const classes = ['car', 'car-front', 'car-nicklas']
let squares = []
let currentCar = [2,1,0]
let direction = 1
let directionText = ""
let nicklasIndex = 0
let nicklasIndexGl = 0
let score = 0
let intervalTime = 1000
let speed = 0.9
let timerId = 0

// **** Drawing variables ****

// Nicklas elements

const nicklasEyesEars = document.createElement('div')
nicklasEyesEars.classList.add('nicklas-eyes-ears')
    
const nicklasMouth = document.createElement('div')
nicklasMouth.classList.add('nicklas-mouth')
    
const nicklasHair = document.createElement('div')
nicklasHair.classList.add('nicklas-hair')

// Car elements

const carFrontTwo = document.createElement('div')
carFrontTwo.classList.add('car-front-two')

const carNicklasTwo = document.createElement('div')
carNicklasTwo.classList.add('car-nicklas-two')

const carNicklasThree = document.createElement('div')
carNicklasThree.classList.add('car-nicklas-three')

const carNicklasFour = document.createElement('div')
carNicklasFour.classList.add('car-nicklas-four')

const carNicklasFive = document.createElement('div')
carNicklasFive.classList.add('car-nicklas-five')

// **** Game functions ****

main() 

function main() {

    createGrid()

    // Make the car to begin with
    
    generateCarFront(2)
    squares[1].classList.add('car')
    squares[0].classList.add('car')

    // Make a Nicklas

    nicklasIndex = generateNicklasIndex()

    generateNicklas(nicklasIndex)

    // Event listeners
    
    startBtn.addEventListener('click', startGame)

    document.addEventListener('keydown', moveDirection)   
}

// **** Make the grid ****

function createGrid() {
    for (let i = 0; i < width*width; i++) {
        const square = document.createElement('div')
        square.classList.add('square')
        grid.appendChild(square)
        squares.push(square)
    }
}

// **** Make the car front ****

function generateCarFront(squareIndex) {
    checkThatSquareIsEmpty(squareIndex)

    squares[squareIndex].classList.add('car-front')
    squares[squareIndex].appendChild(carFrontTwo)
}

// **** Make the car with Nicklas ****

function generateCarNicklas(squareIndex) {
    checkThatSquareIsEmpty(squareIndex)

    squares[squareIndex].classList.add('car-nicklas')
    squares[squareIndex].appendChild(carNicklasTwo.cloneNode())
    squares[squareIndex].appendChild(carNicklasThree.cloneNode())
    squares[squareIndex].appendChild(carNicklasFour.cloneNode())
    squares[squareIndex].appendChild(carNicklasFive.cloneNode())
}

// **** Find new Nicklas position ****

function generateNicklasIndex() {
    let NicklasIndexNyt = 0

    do {
        NicklasIndexNyt = Math.floor(Math.random() * squares.length)

        if (
            squares[NicklasIndexNyt].classList.contains('car') ||
            squares[NicklasIndexNyt].classList.contains('car-front') ||
            squares[NicklasIndexNyt].classList.contains('car-nicklas')
            ) {
                console.log('Tried to make Nicklas in the car')
            }

        if (
            squares[NicklasIndexNyt].classList.contains('nicklas')
            ) {
                console.log('Tried to make Nicklas in previus Nicklas')
            }

    } while (
        squares[NicklasIndexNyt].classList.contains('car') ||
        squares[NicklasIndexNyt].classList.contains('car-front') ||
        squares[NicklasIndexNyt].classList.contains('car-nicklas') ||
        squares[NicklasIndexNyt].classList.contains('nicklas')
        )
               
    return NicklasIndexNyt
}

// **** Make Nicklas ****

function generateNicklas(squareIndex) {
    if (squareIndex < 3)
    {
        console.log('Niklas i start: ', squareIndex)       
    }

    clearSquare(squareIndex)

    squares[squareIndex].classList.add('nicklas')
    squares[squareIndex].appendChild(nicklasEyesEars)
    squares[squareIndex].appendChild(nicklasMouth)
    squares[squareIndex].appendChild(nicklasHair)

    squares[squareIndex].style.transform = "rotate(0deg)"
}

// **** Start and restart the game ****

function startGame() {

    // Clear squares

    squares.forEach(square => 
        {
            // Remove alle childNodes by removing firstChild until all has been removed

            while (square.hasChildNodes()) 
            {  
                square.removeChild(square.firstChild)
            }
            
            // Remove all classes

            square.classList.remove(...classes)
            square.classList.remove('nicklas')
        })
 
    // Remove the speech bubble

    gameOverText.innerHTML = ""
    gameOverText.classList.remove('gameover-bubble')

    // Reset the game

    clearInterval(timerId)
    currentCar = [2,1,0]
    intervalTime = 1000
    score = 0
    scoreDisplay.textContent = score
    direction = 1

    // Make the car again

    generateCarFront(2)
    squares[1].classList.add('car');
    squares[0].classList.add('car');

    // Rotate the front of the car to neutral position

    directionText = "right"
    squares[currentCar[0]].style.transform = "rotate(0deg)"
    squares[1].style.transform = "rotate(0deg)"
    squares[0].style.transform = "rotate(0deg)"

    // Make new Nicklas
    
    nicklasIndexGl = nicklasIndex

    nicklasIndex = generateNicklasIndex()

    // Remove Nicklas

    clearSquare(nicklasIndexGl)

    generateNicklas(nicklasIndex)

    // Make the car move again

    timerId = setInterval(move, intervalTime)
}

// **** Make the car move ****

function move() {

    // Stop the car if it hits the walls or itself

    if (
        (currentCar[0] + width >= width*width && direction === width) || //bottom
        (currentCar[0] - width <= -1 && direction === -width) || //top
        (currentCar[0] % width === width-1 && direction === 1) || //right
        (currentCar[0] % width === 0 && direction === -1) || //left
        squares[currentCar[0] + direction].classList.contains('car') ||
        squares[currentCar[0] + direction].classList.contains('car-nicklas')
    ) {

        // Make a comment when the game is over

        if (score >= 0 && score < 2) {
            gameOverText.innerHTML = `Ups, kom igen, min ven! Du har samlet ${score} Nicklas op.`
            } else if (score >= 2 && score <= 5) {
            gameOverText.innerHTML = `Ups, kom igen, min ven! Du har samlet ${score} Nicklas'er op.`
            } else if (score > 5 && score <= 15) {
            gameOverText.innerHTML = `Stærkt! Du er SÅ sej. Du har samlet ${score} Nicklas'er op.`
            } else if (score > 15 && score < 23) {
            gameOverText.innerHTML = `Hvor er du god! Du er så tæt på at slå faster Annes rekord på 23! Du har samlet ${score} Nicklas'er op.`
            } else if (score = 23) {
            gameOverText.innerHTML = `Vi er sgu lige gode. 23 er også faster Annes rekord :)`
            } else if (score > 23) {
            gameOverText.innerHTML = `Tillykke! Du har slået faster Annes rekord ved at samle ${score} Nicklas'er op!`
            }

        gameOverText.classList.add('gameover-bubble')

        return clearInterval(timerId)
    }
    
    // Make the car longer

    currentCar.unshift(currentCar[0] + direction);

    let carEnd1 = currentCar.length - 1
    let carEnd2 = currentCar.length - 2 
    let squareEnd1 = currentCar[carEnd1]
    let squareEnd2 = currentCar[carEnd2]
    
    // When the car drives into Nicklas

    if (squares[currentCar[0]].classList.contains('nicklas')) {

        // Make the car faster

        clearInterval(timerId)
        intervalTime = intervalTime * speed
        timerId = setInterval(move, intervalTime)

        // Generate new Nicklas

        nicklasIndexGl = nicklasIndex
        nicklasIndex = generateNicklasIndex()
        
        // Remove current Nicklas from squares

        clearSquare(nicklasIndexGl)

        // Make Nicklas in new place in squares

        generateNicklas(nicklasIndex)

        // Score plus one

        score = score + 1
        scoreDisplay.textContent = score

    } else {
        
        // Remove the back of the car from currentCar

        currentCar.pop()

        // Remove the back of the car from squares
       
        clearSquare(squareEnd1)
        clearSquare(squareEnd2)
    }

    // Making the back of the car

    carEnd1 = currentCar.length - 1
    carEnd2 = currentCar.length - 2
    squareEnd1 = currentCar[carEnd1]
    squareEnd2 = currentCar[carEnd2]

    clearSquare(squareEnd1)
    clearSquare(squareEnd2)
    squares[squareEnd1].classList.add('car')
    squares[squareEnd2].classList.add('car')

    // Making Nicklas in the car

    for (let i = 1; i <= score; i++) {
        clearSquare(currentCar[i])
        generateCarNicklas(currentCar[i])
    }

    // Making the front of the car

    generateCarFront(currentCar[0])

    if (directionText === "up") {
        squares[currentCar[0]].style.transform = "rotate(-90deg)"
    } else if (directionText === "down") {
        squares[currentCar[0]].style.transform = "rotate(90deg)"
    } else if (directionText === "right") {
        squares[currentCar[0]].style.transform = "rotate(0deg)"
    } else if (directionText === "left") {
        squares[currentCar[0]].style.transform = "scaleX(-1)"
    }
}

// **** Check the square for all classes and children ****

function checkThatSquareIsEmpty(squareIndex) {
    if (squares[squareIndex].hasChildNodes()) {
        console.log ('Fejl - indeholder ChildNodes')
        console.log ('Sørg for at clearSquare er kaldt')
    }

    if 
    (
    squares[squareIndex].classList.contains('car') ||
    squares[squareIndex].classList.contains('car-front') ||
    squares[squareIndex].classList.contains('car-nicklas') ||
    squares[squareIndex].classList.contains('nicklas')
    )
    {
        console.log ('Fejl - indeholder Class')
        console.log ('Sørg for at clearSquare er kaldt')
    }
}

// **** Clear the square for all classes and children ****

function clearSquare(squareIndex) {
    while (squares[squareIndex].hasChildNodes()) 
    {  
        squares[squareIndex].removeChild(squares[squareIndex].firstChild);
    }

    squares[squareIndex].classList.remove(...classes)
    squares[squareIndex].classList.remove('nicklas')
}

// **** Control the car ****

function moveDirection(e) {
    if (e.keyCode === 38) {
        direction = -width
        directionText = "up"
        squares[currentCar[0]].style.transform = "rotate(-90deg)"
    } else if (e.keyCode === 40) {
        direction = +width
        directionText = "down"
        squares[currentCar[0]].style.transform = "rotate(90deg)"
    } else if (e.keyCode === 39) {
        direction = 1
        directionText = "right"
        squares[currentCar[0]].style.transform = "rotate(0deg)"
    } else if (e.keyCode === 37) {
        direction = -1
        directionText = "left"
        squares[currentCar[0]].style.transform = "scaleX(-1)"
    }
}