import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, NavLink, Switch, Route } from 'react-router-dom';
import { getCharacters } from '../services/api-service';
import Characters from './characters';
import Locations from './locations';

function Main() {
  const [state, setState] = useState({
    characters: [],
    locations: []
  });

  useEffect(() => {
    fetchCharacters();
  },[])

  const fetchCharacters = async () => {
    // ADD REQUEST FOR LOCATIONS
    const data = async () => {
      const arrOfPromises = [];
      let i = 0;

      while (i < 6) {
        const randomId = Math.floor(Math.random() * 90 + 1)
        arrOfPromises.push(getCharacters(randomId));
        i++;
      }
      // REQUEST FOR CHARACTERS
      return Promise.all(arrOfPromises);
     }

    const response = await data();
    const characters = response.map(character => character.data)
    // IF MARVEL API, CONCAT RESPONSE ARRAY TO EMPTY ARRAY
    console.log(characters)

    setState({...state, characters })
  }

  return (
    <main>
      <h1>RICK AND MORTY</h1>
      <Router>
        <nav>
          <ul>
            <li><NavLink to='/characters'>Characters</NavLink></li>
            <li><NavLink to='/locations'>Locations</NavLink></li>
          </ul>
        </nav>

        <Route path="/characters"
          render={props =>
            <Characters {...props} characters={state.characters}/>}
          />
        <Route path="/locations" component={Locations}/>
      </Router>
    </main>
  )
}

export default Main;
