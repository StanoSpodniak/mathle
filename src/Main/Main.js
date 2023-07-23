import {useState, useEffect, useRef } from "react";
import Game from "../Game/Game";
import "./Main.css";
//import Draggable from 'react-draggable';

//improve mobile responsitivity
//avoid reloading with new game
//create rules section
//create about section
//craete favicon
//save problem to params - if there are params load problem from them - give send to friend option
//enable drag numbers
//create options panel and timer
//create default daily challenge - with backend

//change nameservers

const Main = () => {
    const math = require('mathjs');

    const [firstProblem, setFirstProblem] = useState([]);
    const [secondProblem, setSecondProblem] = useState([]);
    const [thirdProblem, setThirdProblem] = useState([]);

    const [clickedNumbers, setClickedNumbers] = useState([""]);
    const [playNumbers, setPlayNumbers] = useState([]);
    const tileRefs = useRef([]);
    const buttonRefs = useRef([]);

    const [submitButtonText, setSubmitButtonText] = useState("Submit");
    const [displaySumbitButton, setDisplaySubmitButton] = useState(false);
    const [gameIsOver, setGameIsOver] = useState(false);

    useEffect(() => {
        setFirstProblem(Game());
        setSecondProblem(Game());
        setThirdProblem(Game());
    }, []);

    useEffect(() => {
        if (firstProblem && secondProblem && thirdProblem) {
            let numbers = [firstProblem.firstRndNmb];
            numbers = [...numbers, firstProblem.secondRndNmb];
            numbers = [...numbers, firstProblem.thirdRndNmb];
            numbers = [...numbers, secondProblem.firstRndNmb];
            numbers = [...numbers, secondProblem.secondRndNmb];
            numbers = [...numbers, secondProblem.thirdRndNmb];
            numbers = [...numbers, thirdProblem.firstRndNmb];
            numbers = [...numbers, thirdProblem.secondRndNmb];
            numbers = [...numbers, thirdProblem.thirdRndNmb];

            for (let i = numbers.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
            }
            setPlayNumbers(numbers);
        } else {
            console.log("no data");
        }
    }, [firstProblem, secondProblem, thirdProblem]);

    useEffect(() => {
        if(clickedNumbers.includes("") || clickedNumbers.length !== playNumbers.length) {
            setDisplaySubmitButton(false);
        } else {
            setDisplaySubmitButton(true);
        }
    }, [clickedNumbers, playNumbers]);

    const handleClick = (index) => {
        const button = buttonRefs.current[index];
        button.disabled = true;

        const currentPlayfield = [...clickedNumbers];
        for(let i = 0; i < 9; i++) {
            if(!currentPlayfield[i]) {
                currentPlayfield[i] = button.innerText;
                setClickedNumbers(currentPlayfield);
                break;
            }
        }
    }

    const handleDelete = (index) => {
        if(!gameIsOver) {
            const currentPlayfield = [...clickedNumbers];
        
            for(let i = 0; i < playNumbers.length; i++) {
                if(buttonRefs.current[i].innerText === currentPlayfield[index] && buttonRefs.current[i].disabled === true) {
                    buttonRefs.current[i].disabled = false;
                    break;
                }
            }
    
            currentPlayfield[index] = "";
            setClickedNumbers(currentPlayfield);
        }
    }

    const handleSubmit = () => {
        let canSubmit = true;

        for(let i = 0; i < playNumbers.length; i++) {
            if(clickedNumbers[i] === undefined) {
                canSubmit = false;
            }
        }

        if(canSubmit) {
            if((math.evaluate(`${clickedNumbers[0]} ${firstProblem.mathSign} ${clickedNumbers[1]} ${firstProblem.secondMathSign} ${clickedNumbers[2]}`) === firstProblem.result) &&
            (math.evaluate(`${clickedNumbers[3]} ${secondProblem.mathSign} ${clickedNumbers[4]} ${secondProblem.secondMathSign} ${clickedNumbers[5]}`) === secondProblem.result) &&  
            (math.evaluate(`${clickedNumbers[6]} ${thirdProblem.mathSign} ${clickedNumbers[7]} ${thirdProblem.secondMathSign} ${clickedNumbers[8]}`) === thirdProblem.result)) {
                setGameIsOver(true);
                setSubmitButtonText("Play Again");
                for(let i = 0; i < 9; i++) {
                    tileRefs.current[i].style.border = "2px solid #bdf5bd";
                    tileRefs.current[i].style.color = "#189a18";
                }
            } else {
                if(math.evaluate(`${clickedNumbers[0]} ${firstProblem.mathSign} ${clickedNumbers[1]} ${firstProblem.secondMathSign} ${clickedNumbers[2]}`) !== firstProblem.result) {
                    changeStyleToWrong(0);
                }
    
                if(math.evaluate(`${clickedNumbers[3]} ${secondProblem.mathSign} ${clickedNumbers[4]} ${secondProblem.secondMathSign} ${clickedNumbers[5]}`) !== secondProblem.result) {
                    changeStyleToWrong(3);
                }
    
                if(math.evaluate(`${clickedNumbers[6]} ${thirdProblem.mathSign} ${clickedNumbers[7]} ${thirdProblem.secondMathSign} ${clickedNumbers[8]}`) !== thirdProblem.result) {
                    changeStyleToWrong(6);
                }
            }
    
            if(submitButtonText === "Play Again") {
                window.location.reload();
            }
        }
    }

    const changeStyleToWrong = (index) => {
        for(let i = index; i < index + 3; i++) {
            tileRefs.current[i].style.border = "2px solid #ff8080";
            tileRefs.current[i].style.color = "#e60000";
            setTimeout(() => {
                tileRefs.current[i].style.border = "2px solid gainsboro";
                tileRefs.current[i].style.color = "black";
            }, "2000");
        }
    }

    return (
        <div className="main">
            <div className="playfield">
                <button 
                    className="item tile"
                    ref={ref => (tileRefs.current[0] = ref)} 
                    onClick={() => handleDelete(0)}>
                    {clickedNumbers[0]}
                </button>
                <p className="item">{firstProblem.mathSign}</p>
                <button className="item tile"
                    ref={ref => (tileRefs.current[1] = ref)} 
                    onClick={() => handleDelete(1)}>
                    {clickedNumbers[1]}
                </button>
                <p className="item">{firstProblem.secondMathSign}</p>
                <button className="item tile"
                    ref={ref => (tileRefs.current[2] = ref)} 
                    onClick={() => handleDelete(2)}>
                    {clickedNumbers[2]}
                </button>
                <p className="item">=</p>
                <p className="item result">{firstProblem.result}</p>
            </div>
            <div className="playfield">
                <button 
                    className="item tile"
                    ref={ref => (tileRefs.current[3] = ref)} 
                    onClick={() => handleDelete(3)}>
                    {clickedNumbers[3]}
                </button>
                <p className="item">{secondProblem.mathSign}</p>
                <button className="item tile"
                    ref={ref => (tileRefs.current[4] = ref)} 
                    onClick={() => handleDelete(4)}>
                    {clickedNumbers[4]}
                </button>
                <p className="item">{secondProblem.secondMathSign}</p>
                <button className="item tile"
                    ref={ref => (tileRefs.current[5] = ref)} 
                    onClick={() => handleDelete(5)}>
                    {clickedNumbers[5]}
                </button>
                <p className="item">=</p>
                <p className="item result">{secondProblem.result}</p>
            </div>
            <div className="playfield">
                <button 
                    className="item tile"
                    ref={ref => (tileRefs.current[6] = ref)} 
                    onClick={() => handleDelete(6)}>
                    {clickedNumbers[6]}
                </button>
                <p className="item">{thirdProblem.mathSign}</p>
                <button className="item tile"
                    ref={ref => (tileRefs.current[7] = ref)} 
                    onClick={() => handleDelete(7)}>
                    {clickedNumbers[7]}
                </button>
                <p className="item">{thirdProblem.secondMathSign}</p>
                <button className="item tile"
                    ref={ref => (tileRefs.current[8] = ref)} 
                    onClick={() => handleDelete(8)}>
                    {clickedNumbers[8]}
                </button>
                <p className="item">=</p>
                <p className="item result">{thirdProblem.result}</p>
            </div>
            <div className="submit-field">
                {displaySumbitButton && <button id="submit-button" onClick={handleSubmit}>{submitButtonText}</button>}
            </div>
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
