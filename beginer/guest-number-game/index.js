const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
const secretNum = Math.floor(Math.random() * 100) + 1;
let changes = 0;
let attempts = 0;
rl.question(`Welcome to the Number Guessing Game!
Im thinking of a number between 1 and 100.
You have 5 chances to guess the correct number.
Please select the difficulty level: 
1. Easy (10 chances)
2. Medium (5 chances)
3. Hard (3 chances)
`, (level) => { selectDifficult(level) });
const selectDifficult = (level) => {
    console.log('Enter your choice: ', level);
    let lv = '';
    switch (Number(level)) {
        case 1:
            changes = 10;
            lv = 'easy'
            break;
        case 2:
            changes = 5;
            lv = 'medium'
            break;
        case 3:
            changes = 3;
            lv = 'hard';
            break;
    }
    console.log(`Great! You have selected the ${lv} level.
                 Let's start the game!
                 `)
    guestNumber();
}
const guestNumber = () => {
    rl.question('Enter your guest: ', (ans) => {
        const number = Number(ans);
        if (changes <= 0) {
            console.log('You lose, the secret num is: ', secretNum);
            rl.close();
        }
        if (changes > 0) {
            checkValidSecret(number);
        }
    });
}
const checkValidSecret = (number) => {
    if (number == secretNum) {
        console.log(`Congratulations! You guessed the correct number in ${attempts} attempts.`);
        rl.close();
    }
    else {
        number < secretNum ? console.log(`Incorrect! The number is greater than ${number}`)
            : console.log(`Incorrect! The number is less than ${number}`);
        changes--;
        attempts++;
        guestNumber();
    }
}