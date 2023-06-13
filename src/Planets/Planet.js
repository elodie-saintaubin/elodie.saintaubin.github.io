import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../General/Navbar';

import mercury from './planets_img/mercury.jpg';
import venus from './planets_img/venus.jpg';
import earth from './planets_img/earth.jpg';
import mars from './planets_img/mars.jpg';
import jupiter from './planets_img/jupiter.jpg';
import saturn from './planets_img/saturn.jpg';
import uranus from './planets_img/uranus.jpg';
import neptune from './planets_img/neptune.jpg';

function Planet() {
  const { id } = useParams();
  const [planetData, setPlanetData] = useState(null);

  const planetImages = {
    Mercury: mercury,
    Venus: venus,
    Earth: earth,
    Mars: mars,
    Jupiter: jupiter,
    Saturn: saturn,
    Uranus: uranus,
    Neptune: neptune,
  };
  
  useEffect(() => {
    const fetchData = async () => {
      const apiKey = 'jo2eQTUD2Iok01fKLszYYQ==F17j9jnwS7F8jpvR';

      try {
        const response = await axios.get(`https://api.api-ninjas.com/v1/planets?name=${id}`, {
          headers: {
            'X-Api-Key': apiKey,
          },
        });

        setPlanetData(response.data[0]);
      } catch (error) {
        console.error('Request failed:', error);
      }
    };
    fetchData();
  }, [id]);

 

  if (!planetData) {
    return <div>Loading...</div>;
  }
  const planetImage = planetImages[planetData.name];

  return (
    <>
      <Navbar />

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: '0 0 auto', marginRight: '20px' }}>
              <img src={planetImage} alt={planetData.name} style={{ width: '200px' }} />
            </div>
            <div style={{ flex: '1 1 auto' }}>
              <h1 style={{ marginTop: '0' }}>{planetData.name}</h1>
              <div>
              <p><strong>Mass:</strong> {planetData.mass}</p>
              <p><strong>Radius:</strong> {planetData.radius}</p>
              <p><strong>Period:</strong> {planetData.period}</p>
              <p><strong>Semi-major Axis:</strong> {planetData.semi_major_axis}</p>
              <p><strong>Temperature:</strong> {planetData.temperature}</p>
              <p><strong>Distance (light year):</strong> {planetData.distance_light_year}</p>
              <p><strong>Host Star Mass:</strong> {planetData.host_star_mass}</p>
              <p><strong>Host Star Temperature:</strong> {planetData.host_star_temperature}</p>

              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default Planet;
