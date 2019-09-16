class Game {
    constructor() {
        this.guesses = 0;
        this.battleShips = [];
        this.shipsSunk = 0;
    }
    
    displaySquareId(){
    const displaySquareId = document.getElementsByClassName("cell");

        Array.from(displaySquareId).forEach(node => {
           const squareId = node.getAttribute('id');
           node.innerText = squareId;     
     })   
    }

    start(ship1, ship2) {
        ship1.setShipLocation();
        this.battleShips.push(ship1);
        ship2.setShipLocation();
        let luckyCounter = 0;
        while (ship1.checkCollision(ship2) && luckyCounter < 100) {
            luckyCounter++;
            ship2.shipPosition = [];
            ship2.setShipLocation();
        }
        this.battleShips.push(ship2);
    }

    shoot(event) {
        const shotSquareId = event.target.id;
        let anyShipIsHit = false;

        this.battleShips.forEach(currentShip => {
            if (currentShip.shipPosition.includes(shotSquareId)) {
                currentShip.hits.push(`${shotSquareId}`);
                anyShipIsHit = true;
                document.getElementById(shotSquareId).style.color = currentShip.color;
                if (currentShip.isSunk()) {
                    this.shipsSunk++;
                }
            }
        })
        if (anyShipIsHit) event.target.innerText = "Hit!";
        else event.target.innerText = "Water!";
        event.target.style.textAlign = "center";
        event.target.style.verticalAlign = "middle";

        this.guesses++;
        document.getElementById("guess").innerText = (`Guesses: ${this.guesses}`);

        if (this.shipsSunk === this.battleShips.length) {
            const endGameNote = document.getElementById("endGame")
            endGameNote.innerText = `Sie haben mit ${this.guesses} Versuchen alle Schiffe versenkt.`;
            endGameNote.classList.toggle("hidden");
            endGameNote.style.color = "magenta";
            endGameNote.style.fontSize = "20px";
        }
    }
}

class BattleShip {
    constructor(shipHeight, direction, backgroundColor) {
        this.hits = [];
        this.sunk = [];
        this.direction = direction;
        this.shipHeight = shipHeight;
        this.shipPosition = [];
        this.color = backgroundColor;

    }

    setShipLocation() {
        const rowLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
        if (this.direction == "vertical") {
            const startRow = Math.floor(Math.random() * (rowLetters.length - this.shipHeight - 1));
            const column = Math.floor(Math.random() * (rowLetters.length)) + 1;
            for (let index = startRow; index < startRow + this.shipHeight; index++) {
                let row = rowLetters[index];
                this.shipPosition.push(`${row}${column}`);
            }
            console.log("Vertical ship: ", this.shipPosition);

        } else { //horizontal
            const row = rowLetters[Math.floor(Math.random() * (rowLetters.length))];
            const startColumn = Math.floor(Math.random() * (rowLetters.length - this.shipHeight - 1)) + 1;

            for (let column = startColumn; column < startColumn + this.shipHeight; column++) {
                this.shipPosition.push(`${row}${column}`);
            }
            console.log("Horizontal ship: ", this.shipPosition);
        }
    }

    checkCollision(otherShip) {
        for (let i = 0; i < otherShip.shipPosition.length; i++) {

            if (this.shipPosition.includes(otherShip.shipPosition[i]))
                return true;
            else {
                return false;
            }
        }
    }

    isSunk() {
        return this.hits.length == this.shipPosition.length;
    }
}

let ship1 = new BattleShip(4, "horizontal", "rosybrown");
let ship2 = new BattleShip(5, "vertical", "lime");

let game = new Game();
game.start(ship1, ship2);
game.displaySquareId();

document.getElementById("sea").onclick = () => game.shoot(event);