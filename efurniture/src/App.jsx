import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <h1>First test</h1> */}
      <div className="App" style={{ overflowX: "hidden" }}>
        
        {/* <Router>
          <Navbar />
          <Switch>
            <Route to="/" component={Home} />
          </Switch>
        </Router> */}
        <Navbar />
        <Home />
      </div>
    </>
  );
}

export default App;
