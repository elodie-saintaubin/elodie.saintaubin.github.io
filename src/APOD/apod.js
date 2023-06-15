import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../General/Navbar';

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
      <Navbar/>
      {apodData ? (
      <div class="container">
      <h2>Image of the day from the NASA website : {apodData.title}</h2>
      <div>
      <img style={{width:"600px", height:"600px", marginRight:"50px", marginTop:"25px"}} src={apodData.url} alt={apodData.title} />
      <div><p>{apodData.explanation}</p></div>
      </div>
     
    </div>
    
      ) : (
        <p>Loading APOD data...</p>
      )}
    </div>
  );
};

export default Apod;
