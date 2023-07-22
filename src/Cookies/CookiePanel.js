import { useCookies } from 'react-cookie';

const CookiePanel = () => {
    const [cookies, setCookie] = useCookies(['agr']);

    const saveCookieSettings = (value) => {
      setCookie("agr", value, { path: '/' });
    };
  
    const getCookieSettings = () => {
      return cookies.cookieName || "unchecked";
    };
  
    const handleCheckboxChange = () => {
      const value = "checked";
      saveCookieSettings(value);
    };
  
    const checkboxValue = getCookieSettings() === "unchecked";
  
    return (
        <div>
            {!cookies.agr && <button checked={checkboxValue} onClick={handleCheckboxChange}>OK</button>}
        </div>
    );
}

export default CookiePanel;