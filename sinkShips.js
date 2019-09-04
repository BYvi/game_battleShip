let ship1 = ["A4", "A1", "A3"];

function testshoot(){
    console.log("Hello");
}

class BattleShip {
    constructor (){
        this.hits = 0,
        this.guesses = 0,
        this.sunk = false,
        this.shipPosition = [],
        this.water = [],
        this.round = 0
    }
}

class Game {
    constructor() {
    this.player = [];
    this.coordinatemap = [[],[]];
    }

    start() {

    }

    shoot(event) {
        const square = event.target.id;
        console.log(event.target, event.target.id);
        if (ship1.includes(square)){
            event.target.innerText = "Hit!";
        } else {
            event.target.innerText =  "Water!"
        }
    }
}


let battleShip = new BattleShip ();
let game = new Game ();
Array.from(document.getElementsByClassName("cell")).forEach( cell => cell.onclick = game.shoot);



// Positions of ships
// Shuffle function for new positions of ships



