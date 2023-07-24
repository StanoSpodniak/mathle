import { useState, useEffect } from "react";
import './Nav.css';

//To suitable place, maybe footer, add credits section

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
        <div>
        <div className="nav-bar">
            <h1 className="title">Numzzle</h1>
            <img id="question-icon" src="icons/question.png" alt="question mark" onClick={handleClick} />
        </div>
            {displayRules && <div id="rules-panel">
                <h2>How To Play?</h2>
            </div>}
        </div>
    )
}

//Copy this link and paste it wherever it’s visible, close to where you’re using the image. If that’s not possible, place it at the footer of your website, blog or newsletter, or in the credits section.
//<a href="https://www.flaticon.com/free-icons/question" title="question icons">Question icons created by Freepik - Flaticon</a>
//<a href="https://www.flaticon.com/free-icons/plus" title="plus icons">Plus icons created by Freepik - Flaticon</a>

export default Nav;