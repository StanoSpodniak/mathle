import Nav from "./Nav/Nav";
import Main from "./Main/Main";
import ReactGA from "react-ga4";

function App() {

  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_KEY);

  return (
    <div className="App">
      <Nav />
      <Main />
    </div>
  );
}

export default App;
