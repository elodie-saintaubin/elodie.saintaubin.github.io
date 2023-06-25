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
  useEffect(() => {
    const interval = setInterval(() => {
      // Générer un nouvel index aléatoire différent de l'index actuel
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * solarSystemInfo.length);
      } while (newIndex === currentInfoIndex);
      setCurrentInfoIndex(newIndex);
    }, 1000); // Changer toutes les 10 secondes
    return () => {
      clearInterval(interval);
    };
  }, [currentInfoIndex]);
  const solarSystemInfo = [
    "Jupiter est la plus grande planète du système solaire, tandis que Mercure est la plus petite.",
    "Vénus est la planète la plus chaude du système solaire, avec une température de surface suffisante pour faire fondre du plomb.",
    "Les jours sur Vénus sont plus longs que ses années. Il faut environ 243 jours terrestres pour effectuer une rotation complète sur son axe, tandis qu'une année sur Vénus équivaut à environ 225 jours terrestres.",
    "La sonde Voyager 1, lancée en 1977, est le premier objet fabriqué par l'homme à quitter le système solaire et à entrer dans l'espace interstellaire.",
    "Uranus est la seule planète du système solaire à tourner sur un axe presque horizontal, donnant l'impression qu'elle roule sur le plan orbital.",
    "La plus grande tempête connue dans le système solaire est la Grande Tache Rouge de Jupiter, une tempête qui dure depuis au moins 400 ans.",
    "La lune de Saturne, Encelade, éjecte de l'eau sous forme de geysers dans l'espace, ce qui en fait l'un des endroits potentiels pour la recherche de vie extraterrestre.",
    "La planète naine Pluton a été découverte en 1930, mais a été rétrogradée au statut de planète naine en 2006, suscitant un débat sur la définition d'une planète.",
    "Jupiter est la plus grande planète du système solaire et possède plus de 79 lunes connues, dont les quatre plus grandes sont appelées les lunes galiléennes : Io, Europe, Ganymède et Callisto.",
    "La ceinture d'astéroïdes, située entre les orbites de Mars et Jupiter, est une région remplie de milliers de petits corps rocheux appelés astéroïdes.",
    "La comète la plus célèbre du système solaire est probablement la comète de Halley, qui revient près de la Terre tous les 76 ans.",
    "Neptune est la huitième et dernière planète du système solaire, et a été découverte en 1846 après des calculs mathématiques basés sur les perturbations gravitationnelles d'Uranus.",
    "Le Soleil représente plus de 99 % de la masse totale du système solaire et contient environ 74 % de l'hydrogène de tout le système solaire.",
    "Jupiter agit comme un véritable 'aspirateur spatial' en déviant les astéroïdes et les comètes potentiellement dangereux.",
    "Les nuages de Saturne ont une couleur jaune orangé en raison de la présence d'hydrocarbure polycyclique aromatique (HPA) dans son atmosphère.",
    "Uranus a un axe de rotation incliné de près de 98 degrés, lui donnant l'apparence de tourner pratiquement sur le côté.",
    "Neptune possède les vents les plus rapides de tout le système solaire, atteignant des vitesses supérieures à 2 100 kilomètres par heure.",
    "La ceinture d'astéroïdes, située entre Mars et Jupiter, est une région où se trouvent des milliers d'astéroïdes.",
    "Pluton a été reclassifiée en tant que 'planète naine' en 2006 et est membre de la ceinture de Kuiper, au-delà de l'orbite de Neptune.",
    "Jupiter est la plus grande planète du système solaire et possède plus de 79 lunes connues, dont les quatre plus grandes sont appelées les lunes galiléennes : Io, Europe, Ganymède et Callisto.",
    "La ceinture d'astéroïdes, située entre les orbites de Mars et Jupiter, est une région remplie de milliers de petits corps rocheux appelés astéroïdes.",
    "La comète la plus célèbre du système solaire est probablement la comète de Halley, qui revient près de la Terre tous les 76 ans.",
    "Neptune est la huitième et dernière planète du système solaire, et a été découverte en 1846 après des calculs mathématiques basés sur les perturbations gravitationnelles d'Uranus.",
    "Le Soleil représente plus de 99 % de la masse totale du système solaire et contient environ 74 % de l'hydrogène de tout le système solaire.",
    "Jupiter agit comme un véritable 'aspirateur spatial' en déviant les astéroïdes et les comètes potentiellement dangereux.",
    "Les nuages de Saturne ont une couleur jaune orangé en raison de la présence d'hydrocarbure polycyclique aromatique (HPA) dans son atmosphère.",
    "Uranus a un axe de rotation incliné de près de 98 degrés, lui donnant l'apparence de tourner pratiquement sur le côté.",
    "Neptune possède les vents les plus rapides de tout le système solaire, atteignant des vitesses supérieures à 2 100 kilomètres par heure.",
    "La ceinture d'astéroïdes, située entre Mars et Jupiter, est une région où se trouvent des milliers d'astéroïdes.",
    "Pluton a été reclassifiée en tant que 'planète naine' en 2006 et est membre de la ceinture de Kuiper, au-delà de l'orbite de Neptune.",
    "La Terre est la seule planète connue à abriter la vie, avec une grande diversité de formes de vie sur sa surface.",
    "Saturne est célèbre pour ses magnifiques anneaux composés de milliers de petits morceaux de glace et de roche en orbite autour de la planète.",
    "La gravité sur la Lune est environ six fois plus faible que sur Terre, ce qui permet aux astronautes de sauter plus haut et de se déplacer plus légèrement.",
    "La surface de Mercure est couverte de cratères causés par des impacts d'astéroïdes et de comètes au fil des milliards d'années.",
    "La température sur Pluton peut descendre jusqu'à environ -229 degrés Celsius, ce qui en fait l'un des endroits les plus froids du système solaire.",
    "Les anneaux de Neptune sont composés de petits morceaux de glace et de poussière, et sont beaucoup plus faibles et moins visibles que ceux de Saturne.",
    "La présence de méthane dans l'atmosphère de Titan, la plus grande lune de Saturne, lui confère une couleur orangée et une atmosphère dense.",
    "Le Soleil est une étoile de taille moyenne dans notre galaxie, la Voie lactée, et fournit la chaleur et la lumière nécessaires à la vie sur Terre.",
    "La planète Uranus a été découverte en 1781 par l'astronome William Herschel et est unique en raison de son axe de rotation incliné de près de 98 degrés.",
    "La gravité sur Jupiter est environ 24 fois plus forte que sur Terre, ce qui rendrait presque impossible pour les humains de marcher ou de rester debout à sa surface.",
    "La ceinture de Kuiper est une région située au-delà de l'orbite de Neptune et abrite de nombreux objets glacés, y compris la planète naine Pluton.",
    "Les aurores boréales et australes sont des phénomènes lumineux qui se produisent lorsque les particules chargées du vent solaire interagissent avec l'atmosphère de la Terre.",
    "Les comètes sont des corps glacés qui orbitent autour du Soleil et développent une queue brillante lorsqu'elles s'approchent de lui dans leur voyage elliptique.",
    "Les missions Voyager de la NASA ont exploré les planètes extérieures du système solaire, fournissant des données précieuses sur Jupiter, Saturne, Uranus et Neptune.",
    "La planète Mars est souvent considérée comme la meilleure candidate pour la colonisation humaine dans le système solaire en raison de sa proximité et de ses ressources potentielles.",
    "Les étoiles sont des boules de gaz chaud qui émettent de l'énergie et de la lumière par réaction nucléaire, et il existe des milliards d'étoiles dans notre galaxie.",
    "Les planètes du système solaire ont été formées à partir d'un disque de gaz et de poussière appelé nébuleuse solaire, il y a environ 4,6 milliards d'années.",
    "Le noyau de la Terre est principalement composé de fer et de nickel, et sa chaleur interne génère le champ magnétique qui protège notre planète des rayonnements solaires.",
    "La planète Vénus est souvent appelée la 'jumelle de la Terre' en raison de sa taille et de sa composition similaires, bien que son atmosphère soit extrêmement inhospitalière."
  ];
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
      const newIndex = Math.floor(Math.random() * solarSystemInfo.length);
      setRandomIndex(newIndex);
    };
    generateRandomIndex();
  }, []);
  useEffect(() => {
    // Display the text after a delay of 2 seconds (2000 milliseconds)
    setTimeout(() => {
      setShowText(true);
    }, 2000);
  }, []);
  
  return (
    <>
      <Navbar />
      <div className='central'>
        <div className="long-rectangle message-box" style={{ backgroundColor: '#f2f2f2', padding: '13px', borderRadius: '20px', width: '300px', display:'flex', justifyContent: 'center', color: "black", padding:"10px" }}>
        <p>Bienvenue sur le site météo de l'espace !  <br/> <br/> 
          Ce site offre une exploration approfondie des planètes, des étoiles et des autres corps célestes qui composent notre système solaire.<br/><br/>  
          Découvrez des informations captivantes sur chaque planète, de la plus grande Jupiter à la mystérieuse Neptune. <br/>
         <br/> D'autres choses sont à venir ;) </p>
        </div>

        {showText && (
        <div className="centered-text">
        <h2 className="white-text slow-appear">
          "{solarSystemInfo[randomIndex]}" 
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