import { useState, useEffect } from "react";
import './Nav.css';

const Nav = () => {
    const [displayRules, setDisplayRules] = useState(false);

    useEffect(() => {
        document.addEventListener('click', handleClickOutsidePanel);
    
        return () => {
          document.removeEventListener('click', handleClickOutsidePanel);
        };
      }, []);

    const handleClick = () => {
        setDisplayRules((displayRules) => !displayRules);
    }

    const handleClickOutsidePanel = (event) => {
        const rulesButton = document.getElementById("question-icon");
        const rules = document.getElementById("rules-panel");
        if (event.target !== rulesButton) {
            if (rules && !rules.contains(event.target)) {
                setDisplayRules(false);
            }
        }
    }

    return (
        <div className="nav-container">
            <div className="nav-bar">
                <h1 className="title">Numzzle</h1>
                <img id="question-icon" src="icons/question.png" alt="question mark" onClick={handleClick} />
            </div>
            {displayRules && 
                <div id="rules-panel">
                    <div id="rules-text">
                        <img id="close-icon" src="icons/close.png" alt="close" onClick={handleClick} />
                        <h2>How To Play?</h2>
                        <h3>Solve three mathematical equations.</h3>
                        <div id="rules">
                            <ol>
                                <li><span style={{ fontWeight: "600" }}>Click</span> on the numbers to complete the equation.</li>
                                <li>You can remove a number from the equation by clicking it.</li>
                                <li>Each number can only be used once.</li>
                                <li>After all equations have been completed. Submit your solution. If it is correct, the numbers will turn <span style={{ color: "#189a18" }}>green</span> and you can tackle a new problem. If not the numbers of the incorrect equations will be <span style={{ color: "#e60000" }}>red</span>.</li>
                                <li>There are no set attempts to solve. You can play <span style={{ fontWeight: "600" }}>without limits</span> and solve as many math problems as you want.</li>
                            </ol>
                        </div>
                    </div>
                </div>}
        </div>
    )
}

//Copy this link and paste it wherever it’s visible, close to where you’re using the image. If that’s not possible, place it at the footer of your website, blog or newsletter, or in the credits section.
//<a href="https://www.flaticon.com/free-icons/question" title="question icons">Question icons created by Freepik - Flaticon</a>
//<a href="https://www.flaticon.com/free-icons/plus" title="plus icons">Plus icons created by Freepik - Flaticon</a>
//<a href="https://www.flaticon.com/free-icons/close" title="close icons">Close icons created by Pixel perfect - Flaticon</a>

export default Nav;