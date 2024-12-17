import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import GameHubProvider from "./Context/GameHubContext";
import Game from "./Pages/game";
import Home from "./Pages/home";

function App() {
	return (
		<GameHubProvider>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/game" element={<Game />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</Router>
		</GameHubProvider>
	);
}

export default App;
