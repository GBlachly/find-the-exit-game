const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this.field = field;
        this.index1 = 0;
        this.index2 = 0; 
        this.gameOver = false;
    }

    printField() {
        console.log('\n');

        for (let i = 0; i < this.field.length; i++) {
            console.log(`${this.field[i].join('')}`)
        };

        console.log('\nPick a direction to move\n> ');
    }

    movePlayer(move) {
        let movement;

        if (move === 'down' || move === 'd') {
            this.index1++;
            movement = true;
        } else if (move === 'up' || move === 'u') {
            this.index1--;
            movement = true;
        } else if (move === 'right' || move === 'r') {
            this.index2++;
            movement = true;
        } else if (move === 'left' || move === 'l') {
            this.index2--;
            movement = true;
        } else {
            movement = false;
        };

        return movement;
    }

    moveEffect() {
        //If player goes out of bounds
        if (this.index1 >= this.field.length || this.index1 === -1 || this.index2 >= this.field[0].length || this.index2 === -1) {
            console.log('Out of bounds. You lose. Please try again...\n');
            this.gameOver = true;
            return;
        };

        //If player is still in the field 
        let currentPosition = this.field[this.index1][this.index2];

        if (currentPosition === hole) {
            console.log('You fell in a hole. You lose. Please try again...\n');
            this.gameOver = true;
        };

        if (currentPosition === hat) {
            console.log('You found your hat. You win!\n');
            this.gameOver = true;
        };

        if (currentPosition === fieldCharacter) {
            this.field[this.index1][this.index2] = '*';
        };

        if (currentPosition === pathCharacter) {
            console.log('Hey! Why did you go backwards? It\'s easy to get lost that way!');
            return
        };
    }

    static generateField(height = 10, width = 10, percentage = 30) {
        //Define starter variables
        let randomField = [];
        const totalHoles = (percentage/100)*height*width;

        //Create field without holes/player/hat
        for (let i = 0; i < height; i++) {
            randomField.push(['']);
        };
        for (let j = 0; j < randomField.length; j++) {
            for (let k = 0; k < width; k++) {
                randomField[j][k] = '░';
            };
        };

        //Add player/hat
        randomField[0][0] = '*';
        randomField[height-1][width-1] = '^';

        //Add random holes
        let counter = 0;
        while (counter < totalHoles) {
            let randomIndex1 = Math.floor(Math.random()*height);
            let randomIndex2 = Math.floor(Math.random()*width);
            if (randomField[randomIndex1][randomIndex2] ==='░') {
                randomField[randomIndex1][randomIndex2] = 'O';
                counter++;
            }
        };

        return randomField;
    }
};


const handleInput = (userInput) => {
    const input = userInput.toString().trim().toLowerCase();

    let movement = field1.movePlayer(input);

    if(movement) {
        field1.moveEffect(); 
        if (field1.gameOver) {
            process.exit();
        }; 
    } else {
        console.log('Please pick a valid movement direction!')
    };
    
    field1.printField();
};


//Run Program

/* Test Field
const field1 = new Field([
    [ '*', '░', 'O', '░', '░'],
    [ 'O', '░', '░', '░', 'O'],
    [ '░', 'O', 'O', '░', '░'],
    [ '░', '░', '░', '░', 'O'],
    [ 'O', '░', 'O', '░', '░'],
    [ '░', 'O', '░', 'O', '░'],
    [ '░', '░', 'O', 'O', '^']
]);
*/

const randomField = Field.generateField();
const field1 = new Field(randomField);

field1.printField();
process.stdin.on('data', handleInput);
