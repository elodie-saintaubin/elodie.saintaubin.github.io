import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Navbar from './General/Navbar';

//images of weather
import fire from "./images/fire_weather.gif"
import normal from "./images/normal_weather.gif"
import ice from "./images/ice_weather.gif"
import tornado from "./images/tornado_weather.gif"

const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString();

const planetes = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
const staticPlanetData = [
  { planet: 'mercury', temperature: '167°C', image: fire },
  { planet: 'venus', temperature: '464°C', image: fire },
  { planet: 'earth', temperature: '15°C', image: normal },
  { planet: 'mars', temperature: '-65°C', image: ice },
  { planet: 'jupiter', temperature: '-110°C', image: tornado },
  { planet: 'saturn', temperature: '-140°C', image: tornado },
  { planet: 'uranus', temperature: '-195°C', image: ice },
  { planet: 'neptune', temperature: '-200°C', image: ice },
  { planet: 'dwarf planet pluto', temperature: '-225°C', image: ice }
];


function Home() {

  const [showText, setShowText] = useState(false);
  const [randomIndex, setRandomIndex] = useState(0);
  const [currentInfoIndex, setCurrentInfoIndex] = useState(0);
  const [facts, setFacts] = useState([]);

  //get facts of db
  useEffect(() => {
    axios.get("http://localhost:3001/api/get").then((response) => {
      const extractedFacts = response.data.map((fact) => fact.facts_lib);
      setFacts(extractedFacts);
      setShowText(true); 
      const newIndex = Math.floor(Math.random() * extractedFacts.length);
      setRandomIndex(newIndex);
    });
  }, []);
  

  useEffect(() => {
    const fetchData = async () => {
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

      } catch (error) {
        console.error('Request failed:', error);
      }
    };

    fetchData();

    const generateRandomIndex = () => {
      const newIndex = Math.floor(Math.random() * facts.length);
      setRandomIndex(newIndex);
    };
  
    generateRandomIndex();
  
    const interval = setInterval(() => {
      generateRandomIndex();
    }, 10000);
  
    return () => {
      clearInterval(interval);
    };
  }, []);
  
  return (
    <>
      <Navbar />
      <div className='central'>
        <div className="long-rectangle message-box" style={{ backgroundColor: '#f2f2f2', padding: '15px', borderRadius: '20px', width: '300px', display:'flex', justifyContent: 'center', color: "black", padding:"10px" }}>
        <p>Bienvenue sur le site météo de l'espace !  <br/> <br/> 
          Ce site offre une exploration approfondie des planètes, des étoiles et des autres corps célestes qui composent notre système solaire.<br/><br/>  
          Découvrez des informations captivantes sur chaque planète, de la plus grande Jupiter à la mystérieuse Neptune. <br/>
         <br/> D'autres choses sont à venir ;) </p>
        </div>

        {showText && (
        <div className="centered-text">
        <h2 className="white-text slow-appear">
          "{facts[randomIndex]}" 
        </h2>
          <h3 className="titre-meteo">Météo du {formattedDate}</h3>
          <div className="opaque-rectangle" style={{ overflowY: 'scroll', maxHeight: '200px' }}>
          {staticPlanetData.map((planet) => (
              <div className='carre-meteo' key={planet.planet}>
                <img className="logo" src={planet.image} alt={`${planet.planet} weather`} />
                <p>{planet.planet}</p>
                <p style={{ display: 'flex' }}><strong>Température:</strong> {planet.temperature}</p>
                <hr />
              </div>
            ))}
        </div>
      </div>
        )}
        <style>{`
            /* width */
            ::-webkit-scrollbar {
              width: 10px;
            }

            /* Track */
            ::-webkit-scrollbar-track {
              background: white; 
            }
            
            /* Handle */
            ::-webkit-scrollbar-thumb {
              background: #e2642e; 
            }

            /* Handle on hover */
            ::-webkit-scrollbar-thumb:hover {
              background: #9b4520; 

              @media screen and (max-width: 500px) {
                

              }

            }`}
          </style>
      </div>
    </>
  );
}

export default Home;