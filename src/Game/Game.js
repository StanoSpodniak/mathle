import "./Game.css";

const Game = () => {
    const math = require('mathjs');

    const getMathSign = () => {
        const signs = ['+', '-', '*', '/'];
        const randomIndex = Math.floor(Math.random() * signs.length);
        return signs[randomIndex];
    }
    const mathSign = getMathSign();

    const getRandomNumber = (mathSign, firstRndNmb) => {
        let rndNmb = 0;

        if (mathSign === "*") {
            rndNmb = Math.floor(Math.random() * 10); 
        } else if (mathSign === "+" || mathSign === "-") {
            rndNmb = Math.floor(Math.random() * 100);
        } else {
            if (!firstRndNmb) {
                rndNmb = Math.floor(Math.random() * 100);
            } else {
                rndNmb = 1;
                let rnd = Math.floor(Math.random() * firstRndNmb);
                for (let i = 1; i <= rnd; i++) {
                    if (firstRndNmb % i === 0) {
                        rndNmb = i;
                    }
                }
            }
        }

        return rndNmb;
    }
    const firstRndNmb = getRandomNumber(mathSign);
    const secondRndNmb = getRandomNumber(mathSign, firstRndNmb);

    const getResult = (mathSign, firstRndNmb, secondRndNmb) => {
        return math.evaluate(`${firstRndNmb} ${mathSign} ${secondRndNmb}`);
    }
    let result = getResult(mathSign, firstRndNmb, secondRndNmb);

    return (
        <div className="game-container">
            <p className="math-problem">{firstRndNmb} {mathSign} {secondRndNmb} = {result}</p>
        </div>
    )
}

export default Game;