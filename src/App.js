import React from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.css'
import Home from './Home';
import Planets from './Planets/Planets'
import Planet from './Planets/Planet';
import Game from './Game/Game'
import Apod from './APOD/apod'
function App() {
  return (
   <div>
    <>
      <Routes>
        <Route path="/la-meteore" element={<Home/> }></Route>
        <Route path="/planets" element={<Planets/> }></Route>
        <Route path="/planet/:id" element={<Planet />} />
        <Route path="/game" element={<Game />} />
        <Route path="/apod" element={<Apod />} />
      </Routes> 
    </>
   </div>
  );
}

export default App;
