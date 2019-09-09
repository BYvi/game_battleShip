class BattleShip {
    constructor(shipHeight, direction) {
        this.hits = [];
        this.sunk = false;
        this.direction = direction; 
        this.shipHeight = shipHeight;
        this.shipPosition = [];
    }

    

    setShipLocation() {
        const rowLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];
        if (this.direction == "horizontal") {
            const row = rowLetters[Math.floor(Math.random() * (10 - this.shipHeight + 1))];
            const startColumn = Math.floor(Math.random() * (10 + 1));
            for (let column = startColumn; column < startColumn + this.shipHeight; column++) {
                this.shipPosition.push(`${row}${column}`);
            }
        } else { //vertical
            const startRow = Math.floor(Math.random() * (10 + 1));
            const column = Math.floor(Math.random() * (10 - this.shipHeight + 1));
            for (let index = startRow; index < startRow + this.shipHeight; index++) {
                let row = rowLetters[index]
                this.shipPosition.push(`${row}${column}`);
            }

        }
    }
    checkCollision(otherShip){
        for (let index = 0; index < this.shipPosition.length; index++){
            if (this.shipPosition.includes(otherShip.shipPosition [index]))
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

    }

    start(ship1, ship2) {
        ship1.setShipLocation();
        this.battleShips.push(ship1);
        ship2.setShipLocation();
        let luckyCounter = 0;
        while(ship1.checkCollision(ship2) && luckyCounter < 100){
            luckyCounter++;
        }
        this.battleShips.push(ship2);
        
        

    }

    shoot(event) {
        const shotSquareId = event.target.id;

        this.battleShips.forEach( currentShip => {

        if (currentShip.shipPosition.includes(shotSquareId)) {
            currentShip.hits.push(`${shotSquareId}`);
            event.target.innerText = "Hit!";
            const message = document.getElementById(shotSquareId).style.backgroundColor = "red";
        
        } else {
            event.target.innerText = "Water!"
        }
    })
    }
}


let ship1 = new BattleShip(4, "horizontal");
let ship2 = new BattleShip(5, "vertical");

let game = new Game();
game.start(ship1, ship2);
//Array.from(document.getElementsByClassName("cell")).forEach(cell => cell.onclick = game.shoot);

document.getElementById("sea").onclick = () => game.shoot(event);