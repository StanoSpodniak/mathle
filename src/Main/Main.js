import {useState, useRef } from "react";
import Game from "../Game/Game";
import "./Main.css";
import Draggable from 'react-draggable';

const Main = () => {
    /* Maybe get this values in useEffect - to prevent refresh with click */
    const firstProblem = Game();
    const secondProblem = Game();
    const numbers = [firstProblem.firstRndNmb, firstProblem.secondRndNmb, firstProblem.thirdRndNmb];

    const buttonRefs = useRef([]);
    const [clickedNumber, setClickedNumber] = useState("");

    const handleClick = (i) => {
        const button = buttonRefs.current[i];
        setClickedNumber(button.innerText);
    }

    return (
        <div className="main">
            <div className="playfield">
                <div className="tile">
                    {clickedNumber}
                </div>
                <p>{firstProblem.mathSign}</p>
                <div className="tile"></div>
                <p>{firstProblem.secondMathSign}</p>
                <div className="tile"></div>
                <p>=</p>
                <p>{firstProblem.result}</p>
            </div>
            <button>Submit</button>
            <div className="inventory">
                {numbers.map((number, i) => (
                    <button
                        key={i} 
                        className="number-tile"
                        ref={ref => (buttonRefs.current[i] = ref)} 
                        onClick={() => handleClick(i)}
                        >{number}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Main;
