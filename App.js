import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useState } from "react";

import Main from "./components/Main";
import HighScore from "./components/HighScore";

// -------------- setup firebase ---------------------

import firebase from "firebase/app";
import apiKeys from "./config/keys";
import "firebase/auth";

if (!firebase.apps.length) {
	console.log("Connected with Firebase");
	firebase.initializeApp(apiKeys.firebaseConfig);
}
// -------------- setup firebase/END ---------------------

function App() {
	const [totalPoints, setVictoryPoints] = useState(0);

	return (
		<div
			style={{
				backgroundImage: "url('/images/milkySmall.jpg')",
				width: "100vw",
				height: "100vh",
				zIndex: -2,
			}}
		>
			<BrowserRouter>
				<Switch>
					<Route
						exact
						path="/"
						render={() => (
							<Main
								setVictoryPoints={setVictoryPoints}
								totalPoints={totalPoints}
							/>
						)}
					/>
					<Route
						path="/score"
						render={() => <HighScore totalPoints={totalPoints} />}
					/>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
