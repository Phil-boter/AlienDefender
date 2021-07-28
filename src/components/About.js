import { Link } from "react-router-dom";

import "./about.css";
export default function About() {
	return (
		<>
			<div className="highscore-container">
				<h1 className="main-header">
					Alien
					<br />
					Defender
				</h1>
				<div className="about-article-container">
					<h2 className="article-header">About</h2>
					<article>
						The aim of the game is to reach the small planet on the
						opposite side of the game field with your little
						spaceship.
						<br></br>
						But be careful! You are not allowed to touch the
						crossing meteors, otherwise the game is over. The game
						is also over when time runs out.
						<br></br>
						Once the small, saving planet has been reached, the
						player receives a point and an other planet appears on
						the opposite side and they are given another ten seconds
						to reach it. This continues until a meteor hits or the
						time runs out. At the end of the game, you have the
						option of saving your score in the scoreboard.
						<br></br>
						You can control the spaceship with the arrow keys on
						your keyboard.
					</article>
				</div>
				<button type="button" className="button back">
					<Link to="/">back</Link>
				</button>
			</div>
		</>
	);
}
