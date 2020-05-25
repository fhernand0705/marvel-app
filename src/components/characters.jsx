import React, { useState, useEffect } from 'react';
import { getCharacters } from '../services/api-service';
import CharacterDetails from './character-details';

function Characters() {
  const [characters, setCharacters] = useState({
    characters: []
  });

  useEffect(() => {
    fetchCharacters();
  },[])

  const fetchCharacters = async () => {
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

    setCharacters({...characters, characters })
  }

  return (
    <CharacterDetails characters={characters.characters} />
  )
}

export default Characters;
