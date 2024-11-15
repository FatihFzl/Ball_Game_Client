import {
  Link,
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Game from "./Pages/game";
import "./App.css";
import Home from "./Pages/home";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* This route is for home component 
        with exact path "/", in component props 
        we passes the imported component*/}
          <Route path="/" element={<Home />} />

          {/* This route is for about component 
        with exact path "/about", in component 
        props we passes the imported component*/}
          <Route path="/game" element={<Game />} />

          {/* This route is for contactus component
        with exact path "/contactus", in 
        component props we passes the imported component*/}

          {/* If any route mismatches the upper 
        route endpoints then, redirect triggers 
        and redirects app to home component with to="/" */}
          {/* <Redirect to="/" /> */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
