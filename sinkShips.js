class BattleShip {
    constructor() {
        this.hits =[];
        this.sunk = false;
        this.direction = true; // true = horizontal, false = vertical
        this.shipHeight = 3;
        this.shipPosition = [];


    }

    setShipLocation() {
        const columnLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];
        if (this.direction) { // horizontal
            const startHorizontal = Math.floor(Math.random() * (10 - this.shipHeight + 1));
            const startVertical = Math.floor(Math.random() * (10 + 1));
            for (let i = startHorizontal; i < this.shipHeight; i++) {
                let horizontalId = columnLetters[startHorizontal + i]
                this.shipPosition.push(`${horizontalId}${startVertical}`);
            }
        } else { //vertical
            const startHorizontal = Math.floor(Math.random() * (10 + 1));
            const startVertical = Math.floor(Math.random() * (10 - this.shipHeight + 1));
            for (let i = startVertical; i < this.shipHeight; i++) {
                let verticalId = columnLetters[startVertical + i]
                this.shipPosition.push(`${startHorizontal}${verticalId}`);
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
        this.battleShip = new BattleShip();

    }

    start() {
        this.battleShip.setShipLocation();
    }

    shoot(event) {
        const shotSquareId = event.target.id;

        if (this.battleShip.shipPosition.includes(shotSquareId)) {
            this.hits.push(`${shotSquareId}`);
            event.target.innerText = "Hit!";
        } else {
            event.target.innerText = "Water!"
        }
    }
    

}

let game = new Game();
game.start();
//Array.from(document.getElementsByClassName("cell")).forEach(cell => cell.onclick = game.shoot);

document.getElementById("sea").onclick = () => game.shoot(event);