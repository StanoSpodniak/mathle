import { useState, useEffect } from "react";
import './Nav.css';

const Nav = () => {
    const [displayWindow, setDisplayWindow] = useState(false);
    const [displayRules, setDisplayRules] = useState(false);
    const [displaySettings, setDisplaySettings] = useState(false);

    useEffect(() => {
        document.addEventListener('click', handleClickOutsidePanel);
    
        return () => {
          document.removeEventListener('click', handleClickOutsidePanel);
        };
      }, []);

    const handleClick = (event) => {
        const rulesButton = document.getElementById("question-icon");
        const settingsButton = document.getElementById("settings-icon");

        if (displayRules === false && displaySettings === false) {
            setDisplayWindow((displayWindow) => !displayWindow);
        }

        if(event.target === rulesButton) {
            if(displayRules === false) {
                setDisplaySettings(false);
                setDisplayRules(true);
            } else {
                setDisplayRules(false);
                setDisplayWindow(false);
            }
        }

        if(event.target === settingsButton) {
            if(displaySettings === false) {
                setDisplayRules(false);
                setDisplaySettings(true);
            } else {
                setDisplaySettings(false);
                setDisplayWindow(false);
            }
        }
    }

    const handleClickOutsidePanel = (event) => {
        const rulesButton = document.getElementById("question-icon");
        const settingsButton = document.getElementById("settings-icon");
        const panel = document.getElementById("panel");

        if (event.target !== rulesButton) {
            if (event.target !== settingsButton) {
                if (panel && !panel.contains(event.target)) {
                    setDisplayWindow(false);
                    setDisplaySettings(false);
                    setDisplayRules(false);
                }
            }
        }
    }

    const handleClose = () => {
        setDisplaySettings(false);
        setDisplayRules(false);
        setDisplayWindow(false);
    }

    return (
        <div className="nav-container">
            <div className="nav-bar">
                <h1 className="title">Numzzle</h1>
                <img id="question-icon" src="icons/question.png" alt="question mark" onClick={handleClick} />
                <img id="settings-icon" src="icons/settings.png" alt="settings" onClick={handleClick} />
            </div>
            {displayWindow && 
                <div id="panel">
                    {displayRules &&
                        <div id="rules-text">
                            <img id="close-icon" src="icons/close.png" alt="close" onClick={handleClose} />
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
                    }
                    {displaySettings &&
                        <div id="rules-text">
                            <img id="close-icon" src="icons/close.png" alt="close" onClick={handleClose} />
                            <h2>Options</h2>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

//Copy this link and paste it wherever it’s visible, close to where you’re using the image. If that’s not possible, place it at the footer of your website, blog or newsletter, or in the credits section.
//<a href="https://www.flaticon.com/free-icons/question" title="question icons">Question icons created by Freepik - Flaticon</a>
//<a href="https://www.flaticon.com/free-icons/plus" title="plus icons">Plus icons created by Freepik - Flaticon</a>
//<a href="https://www.flaticon.com/free-icons/close" title="close icons">Close icons created by Pixel perfect - Flaticon</a>
//<a href="https://www.flaticon.com/free-icons/settings" title="settings icons">Settings icons created by Freepik - Flaticon</a>

export default Nav;