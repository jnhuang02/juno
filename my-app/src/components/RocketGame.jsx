import React, { useEffect, useRef, useState } from "react";

const RocketGame = () => {
  const canvasRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false); // ✅ Game starts frozen
  const [score, setScore] = useState(0);
  const [restart, setRestart] = useState(false);

  const rocket = {
    width: 40,
    height: 60,
    x: 230,
    y: 420,
    speed: 5,
  };

  let asteroids = [];
  let keys = {};
  let animationFrameId;
  let asteroidInterval;
  let gameSpeed = 5;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Listen for keydown and keyup
    const handleKeyDown = (e) => (keys[e.key] = true);
    const handleKeyUp = (e) => (keys[e.key] = false);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Reset game state when restarting
    if (restart) {
      setGameOver(false);
      setGameStarted(false);
      setScore(0);
      asteroids = [];
      gameSpeed = 5;
      setRestart(false);
    }

    // Function to create asteroids (only when game starts)
    const createAsteroid = () => {
      if (!gameStarted) return;
      const size = Math.random() * 30 + 20;
      asteroids.push({
        x: Math.random() * (canvas.width - size),
        y: -size,
        width: size,
        height: size,
        speed: gameSpeed,
      });

      if (gameSpeed < 15) gameSpeed += 0.1;
    };

    if (gameStarted) {
      asteroidInterval = setInterval(createAsteroid, 800);
    }

    // Game Loop
    const update = () => {
      if (gameOver || !gameStarted) return; // ❌ Game doesn't move if not started

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Move Rocket
      if (keys["ArrowLeft"] && rocket.x > 0) {
        rocket.x -= rocket.speed;
      }
      if (keys["ArrowRight"] && rocket.x < canvas.width - rocket.width) {
        rocket.x += rocket.speed;
      }

      // Draw Rocket
      ctx.fillStyle = "white";
      ctx.fillRect(rocket.x, rocket.y, rocket.width, rocket.height);

      // Draw Asteroids
      ctx.fillStyle = "red";
      asteroids.forEach((asteroid, index) => {
        asteroid.y += asteroid.speed;
        ctx.fillRect(asteroid.x, asteroid.y, asteroid.width, asteroid.height);

        // Collision Detection
        if (
          asteroid.x < rocket.x + rocket.width &&
          asteroid.x + asteroid.width > rocket.x &&
          asteroid.y < rocket.y + rocket.height &&
          asteroid.y + asteroid.height > rocket.y
        ) {
          setGameOver(true);
          setGameStarted(false); // Freeze game
          return;
        }

        // Remove off-screen asteroids & increase score
        if (asteroid.y > canvas.height) {
          asteroids.splice(index, 1);
          setScore((prev) => prev + 1);
        }
      });

      animationFrameId = requestAnimationFrame(update);
    };

    if (gameStarted) {
      update();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(asteroidInterval);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [restart, gameStarted]); // ✅ Game only runs when started

  return (
    <div className="relative flex flex-col items-center justify-center text-white">
      <h1 className="text-2xl font-bold mb-4">🚀 Rocket Game - Avoid Asteroids!</h1>
      <p>Use <strong>Arrow Keys</strong> to move left & right</p>

      {/* Canvas Container */}
      <div className="relative">
        <canvas ref={canvasRef} width={500} height={500} className="border mt-4 bg-transparent"></canvas>

        {/* Start Game Button (Centered) */}
        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <button
              onClick={() => setGameStarted(true)}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white text-lg font-bold rounded-lg"
            >
              Start Game
            </button>
          </div>
        )}

        {/* Game Over Message (Centered) */}
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60">
            <h2 className="text-4xl text-red-500 font-bold mb-4">Game Over 💥</h2>
            <button
              onClick={() => setRestart(true)}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white text-lg font-bold rounded-lg"
            >
              Restart Game
            </button>
          </div>
        )}
      </div>

      <p className="text-lg mt-4">Score: {score}</p>
    </div>
  );
};

export default RocketGame;
