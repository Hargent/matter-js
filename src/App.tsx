import "./App.css";

import React, { FC, useEffect, useRef } from "react";

import Matter from "matter-js";

const App: FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const Engine = Matter.use("Engine");
	useEffect(() => {
		// create a Matter.js engine
		const engine = Matter.Engine.create();
		// const engine = Matter.Engine.;

		// create a renderer
		const render = Matter.Render.create({
			canvas: canvasRef.current!,
			engine,
		});

		// create a runner
		const runner = Matter.Runner.create();

		// // add bodies to the world
		// const boxA = Matter.Bodies.rectangle(400, 200, 80, 80);
		// const boxB = Matter.Bodies.rectangle(450, 50, 80, 80);
		// const ground = Matter.Bodies.rectangle(400, 610, 810, 60, {
		// 	isStatic: true,
		// });
		// Matter.World.add(engine.world, [boxA, boxB, ground]);

		// run the engine, renderer and runner
		// create a grid of 8x8 squares
		const squareSize = 50;
		const numRows = 8;
		const numCols = 8;
		const gridOffset = { x: 100, y: 100 };
		const squares = [];
		for (let i = 0; i < numRows; i++) {
			for (let j = 0; j < numCols; j++) {
				const square = Matter.Bodies.rectangle(
					gridOffset.x + j * squareSize,
					gridOffset.y + i * squareSize,
					squareSize,
					squareSize
				);
				squares.push(square);
			}
		}
		Matter.World.add(engine.world, squares);

		// add walls around the edge of the world
		const wallThickness = 50;
		const walls = [
			Matter.Bodies.rectangle(
				400,
				-wallThickness / 2,
				800 + 2 * wallThickness,
				wallThickness,
				{ isStatic: true }
			), // top wall
			Matter.Bodies.rectangle(
				400,
				610 + wallThickness / 2,
				800 + 2 * wallThickness,
				wallThickness,
				{ isStatic: true }
			), // bottom wall
			Matter.Bodies.rectangle(
				-wallThickness / 2,
				305,
				wallThickness,
				610,
				{ isStatic: true }
			), // left wall
			Matter.Bodies.rectangle(
				800 + wallThickness / 2,
				305,
				wallThickness,
				610,
				{ isStatic: true }
			), // right wall
		];
		Matter.World.add(engine.world, walls);

		Matter.Engine.run(engine);
		Matter.Render.run(render);
		Matter.Runner.run(runner, engine);

		// cleanup
		return () => {
			Matter.Render.stop(render);
			Matter.Runner.stop(runner);
			Matter.World.clear(engine.world, false);
			Matter.Engine.clear(engine);
		};
	}, []);

	return <canvas ref={canvasRef} />;
};

export default App;
