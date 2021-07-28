import $ from "jquery";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

import "./main.css";

export default function Main({ setVictoryPoints, totalPoints }) {
	const canvasRef = useRef(null);

	const [gameOver, setGameOver] = useState(false);

	console.log("game status", gameOver);

	const gameCode = () => {
		//startposition spaceship
		let x = 0;
		let y = 0;
		//counter victoryPoints
		let victoryPoints = 0;
		// startposition des planet
		let targetX = Math.floor(Math.random() * 28) * 20 + 20;
		let targetY = 460;
		//counter time
		let gameTime = 10;
		let remainingTime = 0;
		let startTime = new Date();
		//position enemy
		let enemyPosition = [1, 10, 60, 100, 150, 296, 324]; // how many enemies and positon
		//speed enemy
		let enemyMovement = [2, 3, -2, 4, 5, -3, 8]; // enemy speed

		const takt = window.setInterval(setInterval, 300);

		// var gameBoard = document.getElementById("canvas");
		const canvas = canvasRef.current;
		const gameField = canvas.getContext("2d");

		const spaceShip = new Image();
		spaceShip.src = "./images/ufo20.png";
		spaceShip.onload = function () {
			gameField.drawImage(spaceShip, x, y);
		};
		const drawTargetField = () => {
			let target = new Image();
			target.src = "/images/mond20.png";

			gameField.drawImage(target, targetX, targetY);
		};

		drawTargetField();
		function hitTarget() {
			// console.log("x: " + x + "|Ziel x:" + targetX);
			// console.log("y: " + y + "|Ziel y:" + targetY);
			if (x === targetX && y === targetY) {
				//target hit
				console.log("You win!!");
				// create new target
				if (targetY === 460) {
					targetY = 0;
				} else {
					targetY = 460;
				}
				targetX = Math.floor(Math.random() * 28) * 20 + 20;
				victoryPoints++;
				$("#points").html("Points: 0" + victoryPoints);
				startTime = new Date();
			}
		}
		function setInterval() {
			gameField.clearRect(0, 0, 600, 480);
			drawTargetField();
			gameField.drawImage(spaceShip, x, y);
			hitTarget();
			hitEnemy();
			setEnemy();
			let actualTime = new Date();
			remainingTime =
				gameTime -
				Math.floor((actualTime.getTime() - startTime.getTime()) / 1000);

			$("#gameTime").html("Remaining time: 0" + remainingTime);
			if (remainingTime <= 0) {
				gameEnd();
			}
		}

		function gameEnd() {
			clearInterval(takt);
			setGameOver(true);
			setVictoryPoints(victoryPoints);
		}
		function setEnemy() {
			//console.log(enemyPosition.length);
			for (let nr = 0; nr < enemyPosition.length; nr++) {
				enemyPosition[nr] += enemyMovement[nr] * 8; // set enemy speed
				if (enemyPosition[nr] > 580 || enemyPosition[nr] < 0) {
					enemyMovement[nr] *= -1;
				}
				drawEnemy(enemyPosition[nr], 280 + nr * 40);
			}
		}
		function drawEnemy(gx, gy) {
			let enemy = new Image();
			enemy.src = "./images/meteor1.png";

			gameField.drawImage(enemy, gx, gy);
		}
		function hitEnemy() {
			for (let nr = 0; nr < enemyPosition.length; nr++) {
				let ygeg = 280 + nr * 40;
				if (Math.abs(x - enemyPosition[nr]) < 20 && y === ygeg) {
					//collision
					collisionEnemy();
					console.log("Hit!!!");
					// console.log(Math.abs(x - enemyPosition[nr]));
					// console.log(" | y: " + y);
					// console.log(" | y; " + ygeg + "calculated");
				}
			}
		}
		function collisionEnemy() {
			clearInterval(takt);
			setGameOver(true);
			setVictoryPoints(victoryPoints);
		}
		$(document).on("keydown", function (evt) {
			//  console.log("keycode: " + evt.which);

			switch (evt.which) {
				case 40:
					y += 20;
					if (y >= 480) {
						y = 460;
					}
					break;

				case 38:
					y -= 20;
					if (y <= 0) {
						y = 0;
					}
					break;

				case 37:
					x -= 20;
					if (x <= 0) {
						x = 0;
					}
					break;

				case 39:
					x += 20;
					if (x >= 600) {
						x = 580;
					}
					break;
				default:
					console.log(`Sorry, we are out.`);
			}
		});
	};

	// const restart = () => {
	// 	setGameOver(false);
	// 	gameCode();
	// };
	return (
		<>
			<h1 className="main-header">Alien Defender</h1>
			<div id="spielbereich" className="main-container">
				<div className="game-container">
					<canvas
						ref={canvasRef}
						id="canvas"
						className="canvas"
						width="600"
						height="480"
					/>

					<div className="game-status-container">
						<div id="points" className="score">
							points:0
						</div>
						<div id="gameTime" className="score">
							Time: 0
						</div>
					</div>
					<div className="start">
						<button className="button" onClick={() => gameCode()}>
							Start
						</button>
					</div>
				</div>
				{gameOver && (
					<div id="gameover" className="game-status">
						<h1>Game over!!!</h1>
						<button
							type="button"
							className="button"
							onClick={() => window.location.reload(false)}
						>
							New game???
						</button>
						<button type="button" className="button back">
							<Link to="score">Save to Score Board</Link>
						</button>
					</div>
				)}
				<img
					className="ufo"
					src="/images/ufoClip.png"
					alt="spaceship"
				/>
				<img
					className="meteor"
					src="/images/meteorBig.png"
					alt="meteor"
				/>
			</div>
			<div className="highscore-link-container">
				<Link to="/score" className="highscore-link">
					<h3>View Highscore</h3>
				</Link>
				<Link to="/about" className="highscore-link">
					<h3>About</h3>
				</Link>
			</div>
		</>
	);
}
