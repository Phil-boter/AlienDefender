import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");

export default function HighScore({ totalPoints }) {
	// console.log("totalpoints in SCore", totalPoints);

	const [name, setName] = useState("");
	// console.log("name", name);

	const [score, setData] = useState([]);
	// console.log("score", score);

	const [error, setError] = useState(false);
	console.log("error", error);
	const nameInput = (e, value) => {
		e.preventDefault();
		setName(value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		firebase
			.firestore()
			.collection("score")
			.add({
				name: name,
				score: totalPoints,
				creation: firebase.firestore.FieldValue.serverTimestamp(),
			})
			.then(() => {
				// console.log("score saved");
				setName("");
				getHighScore();
			})
			.catch((error) => {
				console.log("upload NOT succefull", error);
				setError(true);
			});
	};

	const getHighScore = async () => {
		console.log("get HighScore");

		const snapScore = await firebase
			.firestore()
			.collection("score")
			.orderBy("score", "desc")
			.limit(15)
			.get();
		console.log("snap", snapScore);
		if (snapScore) {
			const data = snapScore.docs.map((doc) => {
				let score = doc.data();
				return score;
			});
			setData(data);
		} else {
			console.log("no scores");
			setError(true);
		}
	};

	useEffect(() => {
		getHighScore();
	}, []);

	return (
		<div className="highscore-container">
			<h1 className="main-header">
				Alien
				<br />
				Defender
			</h1>

			<div className="score-container">
				<h3 className="score-header">Highscore</h3>
				<ul>
					{score &&
						score.map((item, index) => (
							<li key={index}>
								<span className="score-name">{item.name}</span>
								<span className="score-score">
									{item.score}
								</span>
							</li>
						))}
				</ul>
			</div>
			{error && (
				<div className="error-container">
					<h3 className="error">Ooops! Something is wrong....</h3>
				</div>
			)}
			<form className="score-form">
				<input
					type="text"
					name="name"
					placeholder="Enter your name"
					onChange={(e) => nameInput(e, e.target.value)}
				></input>
				<button
					disabled={!name || name.length < 1}
					className="button"
					onClick={(e) => handleSubmit(e, name, totalPoints)}
				>
					Save
				</button>
			</form>
			<button type="button" className="button back">
				<Link to="/">back</Link>
			</button>
		</div>
	);
}
