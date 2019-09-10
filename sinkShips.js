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
            const startRow = Math.floor(Math.random()* (rowLetters.length - this.shipHeight - 1));
            const column = Math.floor(Math.random() * (rowLetters.length)) + 1;
            for (let index = startRow; index < startRow + this.shipHeight; index++) {
                let row = rowLetters[index];
                this.shipPosition.push(`${row}${column}`);
            }
            console.log("Vertical ship: ", this.shipPosition );

        } else { //horizontal
            const row = rowLetters[Math.floor(Math.random() * (rowLetters.length))];
            const startColumn = Math.floor(Math.random() * (rowLetters.length - this.shipHeight - 1)) + 1;
            for (let column = startColumn; column < startColumn + this.shipHeight; column++) {
                this.shipPosition.push(`${row}${column}`);
            }
            console.log("Horizontal ship: ", this.shipPosition );
        }
    }

    checkCollision(otherShip) {
        for (let index = 0; index < this.shipPosition.length; index++) {
            if (this.shipPosition.includes(otherShip.shipPosition[index]))
                return true;
            else {
                return false;
            }

        }
    }
}

class Game {
    constructor() {
        this.player = [];
        this.coordinatemap = [];
        this.guesses = 0;
        this.round = 0;
        this.battleShips = [];
        this.shipsSunk = 0;

    }

    start(ship1, ship2) {
        ship1.setShipLocation();
        this.battleShips.push(ship1);
        ship2.setShipLocation();
        let luckyCounter = 0;
        while (ship1.checkCollision(ship2) && luckyCounter < 100) {
            luckyCounter++;
        }
        this.battleShips.push(ship2);
    }




    shoot(event) {
        const shotSquareId = event.target.id;

        this.battleShips.forEach(currentShip => {

            if (currentShip.shipPosition.includes(shotSquareId)) {
                currentShip.hits.push(`${shotSquareId}`);
                event.target.innerText = "Hit!";
            } else {
                event.target.innerText = "Water!"
            }
        })
                this.guesses++;
                const counting = document.getElementById("guess").innerText = (`Guesses: ${this.guesses}`);
    }
}


let ship1 = new BattleShip(4, "horizontal", "red");
let ship2 = new BattleShip(5, "vertical", "blue");

let game = new Game();
game.start(ship1, ship2);

document.getElementById("sea").onclick = () => game.shoot(event);