import {useState, useEffect, useRef } from "react";
import Game from "../Game/Game";
import "./Main.css";
import Draggable from 'react-draggable';

const Main = () => {
    const [firstProblem, setFirstProblem] = useState([]);
    const [playNumbers, setPlayNumbers] = useState([]);
    const buttonRefs = useRef([]);

    const [clickedNumbers, setClickedNumbers] = useState([]);

    useEffect(() => {
        setFirstProblem(Game());
    }, []);

    useEffect(() => {
        if (firstProblem) {
            let numbers = [firstProblem.firstRndNmb];
            numbers = [...numbers, firstProblem.secondRndNmb];
            numbers = [...numbers, firstProblem.thirdRndNmb];
            setPlayNumbers(numbers);
        } else {
            console.log("no data");
        }
    }, [firstProblem]);

    const handleClick = (index) => {
        const button = buttonRefs.current[index];

        const currentPlayfield = [...clickedNumbers];
        for(let i = 0; i < 3; i++) {
            if(!currentPlayfield[i]) {
                currentPlayfield[i] = button.innerText;
                setClickedNumbers(currentPlayfield);
                break;
            }
        }
    }

    //add function to delete number from playfield with click, if it has a number; probably use useRef
    //maybe block numbers in inventory if it is currently used

    return (
        <div className="main">
            <div className="playfield">
                <div className="tile">
                    {clickedNumbers[0]}
                </div>
                <p>{firstProblem.mathSign}</p>
                <div className="tile">
                    {clickedNumbers[1]}
                </div>
                <p>{firstProblem.secondMathSign}</p>
                <div className="tile">
                    {clickedNumbers[2]}
                </div>
                <p>=</p>
                <p>{firstProblem.result}</p>
            </div>
            <button>Submit</button>
            <div className="inventory">
                {playNumbers.map((number, i) => (
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
