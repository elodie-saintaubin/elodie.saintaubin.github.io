import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../General/Navbar';
import './apod.css';

const Apod = () => {
  const [apodData, setApodData] = useState(null);

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

  return (
    <div>
      <Navbar />
      {apodData ? (
        <div className="container">
          <h2>Image of the day from the NASA website: {apodData.title}</h2>
          <div className="content">
            <div className="image-container">
              <img
                className="apod-pic"
                src={apodData.url}
                alt={apodData.title}
              />
            </div>
            <div>
              <p>{apodData.explanation}</p>
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

        @media (max-width: 600px) {
          /* Styles for mobile */
          .container {
            max-width: 420px;
          }

          .apod-pic {
            width: 300px;
            height: 300px;
            margin-right: 0;
            margin-bottom: 10px;
          }
        }
      `}
      </style>
    </div>
  );
};

export default Apod;
