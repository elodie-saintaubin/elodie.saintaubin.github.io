import React, { useState, useEffect } from 'react';
import './Game.css';
import Navbar from '../General/Navbar';
import rocket from '../images/rocket.png';
import asteroid1 from '../images/asteroid1.png';
import asteroid2 from '../images/asteroid2.png';
import asteroid3 from '../images/asteroid3.png';
import gameOverImage from '../images/game_over_sign.png';
import restartButtonImage from '../images/restart_button.png';

const asteroidImages = [asteroid1, asteroid2, asteroid3];
const gameContainerWidth = 600; 
const gameContainerHeight = 400; 


function Game() {
  const [rocketPosition, setRocketPosition] = useState({ x: 0, y: 0 });
  const [obstacles, setObstacles] = useState([]);
  const [points, setPoints] = useState(0);
  const [isCollided, setIsCollided] = useState(false);
  const [lastScore, setLastScore] = useState(0);

  useEffect(() => {
    const lastScore = localStorage.getItem('lastScore');
    if (lastScore) {
      setLastScore(parseInt(lastScore) || 0);
    }
  }, []);
  
  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;
      const containerWidth = 600;
      const containerHeight = 600;
  
      const maxX = innerWidth - containerWidth;
      const maxY = innerHeight - containerHeight;
      const minX = 0;
      const minY = 0;
  
      const newX = Math.max(minX, Math.min(clientX - containerWidth / 2, maxX));
      const newY = Math.max(minY, Math.min(clientY - containerHeight / 2, maxY));
  
      setRocketPosition({ x: newX, y: newY });
    };
  
    window.addEventListener('mousemove', handleMouseMove);
  
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  

  useEffect(() => {
    const generateRandomPosition = () => {
      const gameContainer = document.querySelector('.game-container');
      const gameContainerWidth = gameContainer.offsetWidth;
      const minX = 0;
      const maxX = gameContainerWidth - 100;
      const minY = -100;
  
      const randomX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
  
      return { x: randomX, y: minY };
    };

    const generateObstacle = () => {
      const newObstacle = {
        ...generateRandomPosition(),
        image: asteroidImages[Math.floor(Math.random() * asteroidImages.length)],
        passed: false, 
      };

      setObstacles((prevObstacles) => {
        if (prevObstacles.length >= 5) {
          return prevObstacles.slice(1);
        } else {
          return [...prevObstacles, newObstacle];
        }
      });
    };

    const intervalId = setInterval(generateObstacle, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const moveObstacles = () => {
    setObstacles((prevObstacles) =>
      prevObstacles.map((obstacle) => ({
        ...obstacle,
        y: obstacle.y + 5,
      }))
    );
  };

  const handleCollision = () => {
    setIsCollided(true);
  };

  const handleRestart = () => {
    localStorage.setItem('lastScore', points);
    setPoints(0);
    setIsCollided(false);
  };

  useEffect(() => {
    const animationId = requestAnimationFrame(moveObstacles);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [obstacles]);

  useEffect(() => {
    const checkCollision = () => {
      const rocketWidth = 90;
      const rocketHeight = 90;

      const obstacleWidth = 100;
      const obstacleHeight = 100;

      obstacles.forEach((obstacle, index) => {
        const rocketTop = rocketPosition.y;
        const rocketBottom = rocketPosition.y + rocketHeight;
        const rocketLeft = rocketPosition.x;
        const rocketRight = rocketPosition.x + rocketWidth;

        const obstacleTop = obstacle.y;
        const obstacleBottom = obstacle.y + obstacleHeight;
        const obstacleLeft = obstacle.x;
        const obstacleRight = obstacle.x + obstacleWidth;

        if (
          rocketBottom > obstacleTop &&
          rocketTop < obstacleBottom &&
          rocketRight > obstacleLeft &&
          rocketLeft < obstacleRight
        ) {
          handleCollision();
        } else {
          if (rocketPosition.y < obstacleBottom && !obstacle.passed) {
            obstacle.passed = true;
            setPoints((prevPoints) => prevPoints + 1);
          }
        }
      });
    };

    checkCollision();
  }, [rocketPosition, obstacles]);

  return (
    <>
      <Navbar />
      <div className="game-container">
        {isCollided ? (
          <div className="game-over">
              <div className="game-over">
                <div className="lastscore">
                  <h1 style={{ fontSize: "30px", color: "yellow" }}>Score: {lastScore}</h1>
                </div>
                <img src={gameOverImage} alt="Game Over" />
              </div>

            <img
              style={{
                width: '70px',
                height: '70px',
                marginTop: '290px',
                animationName: 'spin',
                animationDuration: '5000ms',
                animationIterationCount: 'infinite',
                animationTimingFunction: 'linear',
                transition: 'transform 0.3s ease',
              }}
              className="restart-button"
              src={restartButtonImage}
              alt="Restart"
              onClick={handleRestart}
              onMouseEnter={(e) => (e.target.style.transform = 'scale(1.2)')}
              onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
            />
          </div>
        ) : (
          <>
            <div className="rocket" style={{ left: rocketPosition.x, top: rocketPosition.y }}>
              <img style={{ width: '90px', height: '90px' }} src={rocket} alt="Rocket" />
            </div>

            {obstacles.map((obstacle, index) => (
              <div key={index} className="obstacle" style={{ left: obstacle.x, top: obstacle.y }}>
                <img style={{ width: '100px', height: '100px' }} src={obstacle.image} alt="Asteroid" />
              </div>
            ))}

            <div className="points">{points} points</div>
          </>
        )}
      </div>

      <style>
        {`
        /* Vos styles CSS ici */

        .rocket img {
          width: 90px;
          height: 90px;
        }

        .obstacle img {
          width: 100px;
          height: 100px;
        }

        .restart-button {
          /* Vos autres styles pour la flèche de retour */
          animation-name: spin;
          animation-duration: 5000ms;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .points-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
        }

        .game-over {
          position: relative;
          text-align: center;
        }

        .game-over img {
          width: 200px;
          height: auto;
          margin-bottom: 20px;
        }
        `}
      </style>
    </>
  );
}

export default Game;
