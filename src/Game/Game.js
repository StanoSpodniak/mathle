import "./Game.css";

const Game = () => {
    const math = require('mathjs');

    const getMathSign = (mathSign) => {
        let signs = ['+', '-', '*', '/'];

        if(mathSign) {
            signs = ['+', '-', '*'];
        }

        const randomIndex = Math.floor(Math.random() * signs.length);
        return signs[randomIndex];
    }
    const mathSign = getMathSign();
    const secondMathSign = getMathSign(mathSign);

    const getRandomNumber = (mathSign, firstRndNmb, secondMathSign) => {
        let rndNmb = 1;

        if (mathSign === "*" || secondMathSign === "*") {
            rndNmb = Math.ceil(Math.random() * 10); 
        } else if (mathSign === "+" || mathSign === "-") {
            rndNmb = Math.ceil(Math.random() * 100);
        } else {
            if (!firstRndNmb) {
                rndNmb = Math.ceil(Math.random() * 10);
            } else {
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
    const thirdRndNmb = getRandomNumber(mathSign, firstRndNmb, secondMathSign);

    const getResult = (mathSign, firstRndNmb, secondRndNmb) => {
        return math.evaluate(`${firstRndNmb} ${mathSign} ${secondRndNmb} ${secondMathSign} ${thirdRndNmb}`);
    }
    let result = getResult(mathSign, firstRndNmb, secondRndNmb);
    //push firstSign, secondSign, firstRndNmb, secondRndNmb, thirdRndNmb and result to localStorage with prompt - problemID
    //rename this file
    //the result of previous problems will be shown every session (8 hours)

    return (
        <div className="game-container">
            <p className="math-problem">{firstRndNmb} {mathSign} {secondRndNmb} {secondMathSign} {thirdRndNmb} = {result}</p>
        </div>
    )
}

export default Game;