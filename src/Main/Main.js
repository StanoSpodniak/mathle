import {useState, useEffect, useRef } from "react";
import Game from "../Game/Game";
import "./Main.css";
import Draggable from 'react-draggable';

const Main = () => {
    const math = require('mathjs');

    const [firstProblem, setFirstProblem] = useState([]);
    const [secondProblem, setSecondProblem] = useState([]);
    const [playNumbers, setPlayNumbers] = useState([]);
    const buttonRefs = useRef([]);
    const tileRefs = useRef([]);

    const [clickedNumbers, setClickedNumbers] = useState([""]);
    const [submitButtonText, setSubmitButtonText] = useState("Submit");
    const [announcement, setAnnouncement] = useState("");

    const [displaySumbitButton, setDisplaySubmitButton] = useState(false);
    const [announcementColor, setAnnouncementColor] = useState("black");

    useEffect(() => {
        setFirstProblem(Game());
        setSecondProblem(Game());
    }, []);

    useEffect(() => {
        if (firstProblem && secondProblem) {
            let numbers = [firstProblem.firstRndNmb];
            numbers = [...numbers, firstProblem.secondRndNmb];
            numbers = [...numbers, firstProblem.thirdRndNmb];
            numbers = [...numbers, secondProblem.firstRndNmb];
            numbers = [...numbers, secondProblem.secondRndNmb];
            numbers = [...numbers, secondProblem.thirdRndNmb];

            for (let i = numbers.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
            }
            setPlayNumbers(numbers);
        } else {
            console.log("no data");
        }
    }, [firstProblem, secondProblem]);

    useEffect(() => {
        if(clickedNumbers.includes("") || clickedNumbers.length !== playNumbers.length) {
            setDisplaySubmitButton(false);
            setAnnouncement("");
        } else {
            setDisplaySubmitButton(true);
        }
    }, [clickedNumbers, playNumbers]);

    const handleClick = (index) => {
        //delete number from inventory when clicked or marked inventory tile as used
        const button = buttonRefs.current[index];

        const currentPlayfield = [...clickedNumbers];
        for(let i = 0; i < 6; i++) {
            if(!currentPlayfield[i]) {
                currentPlayfield[i] = button.innerText;
                setClickedNumbers(currentPlayfield);
                break;
            }
        }
    }

    const handleDelete = (index) => {
        const currentPlayfield = [...clickedNumbers];
        currentPlayfield[index] = "";
        setClickedNumbers(currentPlayfield);
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
            (math.evaluate(`${clickedNumbers[3]} ${secondProblem.mathSign} ${clickedNumbers[4]} ${secondProblem.secondMathSign} ${clickedNumbers[5]}`))) {
                setSubmitButtonText("New Game");
                setAnnouncementColor("green");
                setAnnouncement("Correct");
            } else {
                setAnnouncementColor("red");
                setAnnouncement("Wrong");
                setTimeout(() => {
                    setAnnouncement("");
                }, "2000");
            }
    
            if(submitButtonText === "New Game") {
                window.location.reload();
            }
        } else {
            setAnnouncement("Please fill up all fields");
        }
    }

    return (
        <div className="main">
            <div className="announcement">
                <h2 style={{ color: announcementColor }}>{announcement}</h2>
            </div>
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
