import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../General/Navbar';
import './apod.css';

const Apod = () => {
  const [apodData, setApodData] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const fetchApodData = async () => {
      const apiKey = 'bb21DkALWX8HoGKkQoBtkmaBVq66PuWgahrHNqFl';

      try {
        const response = await axios.get(
          `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
        );

        setApodData(response.data);
      } catch (error) {
        console.error('Error fetching APOD data:', error);
      }
    };

    fetchApodData();
  }, []);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div>
      <Navbar />
      {apodData ? (
        <div className="container">
          <h2>Image of the day from the NASA website: {apodData.title}</h2>
          <div className={`content ${isFullscreen ? 'fullscreen' : ''}`}>
            <div className="image-container">
              <img
                className={`apod-pic ${isFullscreen ? 'fullscreen' : ''}`}
                src={apodData.url}
                alt={apodData.title}
                onClick={toggleFullscreen}
              />
            </div>
            <div>
              <p className={`${isFullscreen ? 'text-en-fullscreen' : ''}`}>{apodData.explanation}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading APOD data...</p>
      )}

      <style>
        {`
        .container {
          /* Styles for desktop */
          margin: 0 auto;
          max-width: 800px;
        }

        .apod-pic {
          width: 500px;
          height: 500px;
          margin-right: 50px;
          margin-top: 25px;
        }

        .fullscreen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 9999;
        }

        .fullscreen .apod-pic {
          display: flex;
          justify-content: center;
          width: 100%;
          height: 100%;
          object-fit: contain;
          margin-right: 0;
          margin-bottom: 0;
        }

        .text-en-fullscreen {
          display: none;
        }

        @media (max-width: 600px) {
          /* Styles for mobile */
          .container {
            max-width: 400px;
          }

          .apod-pic {
            width: 200px;
            height: 200px;
            margin-right: 0;
            margin-bottom: 10px;
   
          }

          .fullscreen .apod-pic {
            display: flex;
            justify-content: center;
            width: 100%;
            height: auto;
            margin: 0 auto;
            margin-top: 50%;
          }

          .text-en-fullscreen {
            display: none;
          }
        }
      `}
      </style>
    </div>
  );
};

export default Apod;
