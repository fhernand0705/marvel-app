import React, { useState, useEffect } from "react";
import { getCharacters } from '../services/api-service';

function Main() {
  const [state, setState] = useState({
    characters: []
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
        const randomId = Math.floor(Math.random() * 90)
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
    <div>
      { state.characters.map(char =>
          <div key={Math.random() + char.id}>
            <div>{char.name}</div>
            <div>{char.species}</div>
            <img src={char.image} alt=""/>
          </div>
      )}
    </div>
  )
}

export default Main;
