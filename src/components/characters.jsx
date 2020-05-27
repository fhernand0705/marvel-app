import React, { useState, useEffect } from 'react';
import { getCharacters, getCharacterCount } from '../services/api-service';
import CharacterDetails from './character-details';

function Characters() {
  const [characters, setCharacters] = useState({
    chars: [],
    charsCount: null
  });
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [idList, setIdList] = useState(21);
  const [userQuery, setUserQuery] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetchCharacters();

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
    const charsCount = res2.data.info.count;
    const characters = res1.map(character => character.data)

    // IF MARVEL API, CONCAT RESPONSE ARRAY TO EMPTY ARRAY
    setCharacters({...characters, chars: characters[0], charsCount })
    setFilteredCharacters(characters[0]);
  }
  function fetchMoreCharacters() {
    if (idList > 820) return;
      fetchCharacters();
      setIsFetching(false);
  }
  function handleLoadMoreData() {
    setIdList((idList) => idList + 20);
    setIsFetching(true);
  }
  function handleSearch({target}) {
    setUserQuery(target.value);
    filterCharacters();
  }
  function filterCharacters() {
    let filtered = characters.chars;
    if (userQuery) {
      filtered = filtered.filter(char => {
        return char.name.toLowerCase().includes(userQuery.toLowerCase().trim());
      })
      setFilteredCharacters(filtered);
    } else {
      setFilteredCharacters(filtered);
    }
  }

  return (
    <div>
      <h2>Characters: {characters.charsCount}</h2>
      <h4>Characters Found: {filteredCharacters.length}</h4>
      <input
        type="text"
        className="form-control"
        value={userQuery}
        onChange={(e) => handleSearch(e)}
        placeholder="Search..."
      />
      <CharacterDetails
        characters={characters}
        onChange={handleLoadMoreData}
        filtered={filteredCharacters}
      />
    </div>
  )
}

export default Characters;
