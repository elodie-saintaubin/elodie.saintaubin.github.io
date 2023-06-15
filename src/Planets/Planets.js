import React, { useEffect, useState } from 'react';
import './Planets.css';
import axios from 'axios';
import Navbar from '../General/Navbar';
import { useNavigate } from 'react-router-dom';
import galaxy from './planets_img/solar_system_rotating.gif'

// Images of planets
import mercury from './planets_img/mercury.jpg';
import venus from './planets_img/venus.jpg';
import earth from './planets_img/earth.jpg';
import mars from './planets_img/mars.jpg';
import jupiter from './planets_img/jupiter.jpg';
import saturn from './planets_img/saturn.jpg';
import uranus from './planets_img/uranus.jpg';
import neptune from './planets_img/neptune.jpg';

function Planets() {
  const [planetData, setPlanetData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const planetes = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
      const apiKey = 'jo2eQTUD2Iok01fKLszYYQ==F17j9jnwS7F8jpvR';

      try {
        const responses = await Promise.all(
          planetes.map((planet) =>
            axios.get(`https://api.api-ninjas.com/v1/planets?name=${planet}`, {
              headers: {
                'X-Api-Key': apiKey,
              },
            })
          )
        );

        const planetData = responses.map((response) => response.data);
        setPlanetData(planetData);
      } catch (error) {
        console.error('Request failed:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchPlanetData = async () => {
      try {
        const response = await axios.get('https://api.le-systeme-solaire.net/rest/bodies/');
        const planetes = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
        const planetData = response.data.bodies.filter((body) => planetes.includes(body.englishName));
        setPlanetData((prevData) => [...prevData, ...planetData]);
      } catch (error) {
        console.error('Request failed:', error);
      }
    };

    fetchPlanetData();
  }, []);


  function handleImageClick(planetName) {
    navigate(`/planet/${planetName.toLowerCase()}`);
  }

  return (
    <>
      <Navbar />

      <div className="container">
        <h1 className="title">Les planètes du système solaire</h1>

        <div className="planet-container">
         
         <div className="planet-item">
         <div className="planet-photo">
           <img
             src={mercury}
             alt="mercury"
             data-planet="Mercury"
             onClick={() => handleImageClick('Mercury')}
             onMouseEnter={(e) => e.target.classList.add('hovered')}
             onMouseLeave={(e) => e.target.classList.remove('hovered')}
           />
           <img
             src={venus}
             alt="venus"
             onClick={() => handleImageClick('Venus')}
             onMouseEnter={(e) => e.target.classList.add('hovered')}
             onMouseLeave={(e) => e.target.classList.remove('hovered')}
           />
             <img
             src={earth}
             alt="earth"
             onClick={() => handleImageClick('Earth')}
             onMouseEnter={(e) => e.target.classList.add('hovered')}
             onMouseLeave={(e) => e.target.classList.remove('hovered')}
           />
             <img
             src={mars}
             alt="mars"
             onClick={() => handleImageClick('Mars')}
             onMouseEnter={(e) => e.target.classList.add('hovered')}
             onMouseLeave={(e) => e.target.classList.remove('hovered')}
           />
                   <img
             src={jupiter}
             alt="jupiter"
             onClick={() => handleImageClick('Jupiter')}
             onMouseEnter={(e) => e.target.classList.add('hovered')}
             onMouseLeave={(e) => e.target.classList.remove('hovered')}
           />
                         <img
             src={saturn}
             alt="saturn"
             onClick={() => handleImageClick('Saturn')}
             onMouseEnter={(e) => e.target.classList.add('hovered')}
             onMouseLeave={(e) => e.target.classList.remove('hovered')}
           />
                         <img
             src={uranus}
             alt="uranus"
             onClick={() => handleImageClick('Uranus')}
             onMouseEnter={(e) => e.target.classList.add('hovered')}
             onMouseLeave={(e) => e.target.classList.remove('hovered')}
           />
                         <img
             src={neptune}
             alt="neptune"
             onClick={() => handleImageClick('Neptune')}
             onMouseEnter={(e) => e.target.classList.add('hovered')}
             onMouseLeave={(e) => e.target.classList.remove('hovered')}
           />
       </div>
 </div>
 </div>

 <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center' }}>
 <div className="text-container">
          <h1>Déplacement des planètes du système solaire</h1>
          <p>
            Les planètes du système solaire se déplacent autour du soleil dans des orbites elliptiques.
            Elles suivent des trajectoires spécifiques dictées par les lois de la gravité.
            Chaque planète a une vitesse et une période de révolution distinctes, ce qui crée un ballet
            cosmique fascinant dans l'espace.
          </p>
          <p>
            L'espace est rempli de mystères et d'objets célestes en mouvement constant.
            Les étoiles, les galaxies et d'autres corps célestes se déplacent également à travers l'univers,
            formant un panorama infini de beauté cosmique.
          </p>
        </div>
        <img style={{width: "300px", height: "300px"}} src={galaxy} />  
      </div>

 </div>
</>
);
}

export default Planets;
