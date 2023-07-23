import { useState } from "react";
import { useCookies } from 'react-cookie';
import "./CookiePanel.css";

const CookiePanel = () => {
    const [cookies, setCookie] = useCookies(['agr']);
    const [isVisible, setIsVisible] = useState(true);

    const saveCookieSettings = (value) => {
      setCookie("agr", value, { path: '/', maxAge: 31536000 });
    };
  
    const getCookieSettings = () => {
      return cookies.cookieName || "unchecked";
    };
  
    const handleChange = () => {
      const value = "checked";
      setIsVisible(false);

      setTimeout(() => {
        saveCookieSettings(value);
      }, 1000);
    };
  
    const value = getCookieSettings() === "unchecked";
  
    return (
        <div>
          {cookies.agr === undefined && <div className={`cookie-panel ${isVisible ? '' : 'slide-out'}`}>
            <p>
              We use cookies to collect information to improve your experience on our website. By using our website, you consent to the use of cookies.
            </p>
            <button checked={value} onClick={handleChange}>OK</button>
          </div>}
        </div>
    );
}

export default CookiePanel;