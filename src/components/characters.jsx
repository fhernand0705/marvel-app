import React, { useState, useEffect } from 'react';
import { getCharacters, getCharacterCount } from '../services/api-service';
import CharacterDetails from './character-details';

function Characters() {
  const [characters, setCharacters] = useState({
    characters: [],
    characterCount: null
  });
  const [isFetching, setIsFetching] = useState(false);
  const [idList, setIdList] = useState(20);

  useEffect(() => {
    fetchCharacters();
    //scrollListener();

    if (!isFetching) return;
    fetchMoreCharacters();
  },[isFetching])

  async function fetchCharacters() {
    const data = async () => {
      const arrOfPromises = [];
      const ids = [...Array(idList).keys()];

      arrOfPromises.push(getCharacters(ids))
      // RETURNED SERVER DATA
      return Promise.all(arrOfPromises);
    }

    const res1 = await data();
    const res2 = await getCharacterCount();
    const characterCount = res2.data.info.count;
    const characters = res1.map(character => character.data)

    // IF MARVEL API, CONCAT RESPONSE ARRAY TO EMPTY ARRAY
    console.log(characters[0])

    setCharacters({...characters, characters: characters[0], characterCount })
  }
  function fetchMoreCharacters() {
    if (idList > 820) return;
      fetchCharacters();
      setIsFetching(false);
  }
  function handleLoadMore() {
    setIdList((idList) => idList + 20);
    setIsFetching(true);
  }
  // function scrollListener() {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }
  // function handleScroll() {
  //   if (window.innerHeight + document.documentElement.scrollTop
  //     !== document.documentElement.offsetHeight) return;
  //
  //   setIdList((idList) => idList + 20);
  //   setIsFetching(true);
  // }

  return (
    <div>
      <h2>Characters: {characters.characterCount}</h2>
      <CharacterDetails
        characters={characters}
        onChange={handleLoadMore}
      />
    </div>
  )
}

export default Characters;
