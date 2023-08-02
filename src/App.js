import Nav from "./Nav/Nav";
import Main from "./Main/Main";
import CookiePanel from "./Cookies/CookiePanel";
import ReactGA from "react-ga4";

function App() {

  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_KEY);

  return (
    <div className="App">
      <Nav />
      <Main />
      <CookiePanel />
    </div>
  );
}

export default App;
