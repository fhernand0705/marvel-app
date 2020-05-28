import React, { useState, useEffect } from 'react';
import { getCharacters, getCharacterCount } from '../services/api-service';
import CharacterDetails from './character-details';
import Search from './common/search';

function Characters() {
  const [characters, setCharacters] = useState({
    chars: [],
    charsCount: null
  });
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [idList, setIdList] = useState(21);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterQuery, setFilterQuery] = useState("alien")
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCharacters();

    if (!isFetching) return;
    fetchMoreCharacters();
  },[isFetching]);

  async function fetchCharacters() {
    try {
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
    } catch(e) {
      if (e) setError('Oops, there was an error with your request.');
    }
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
    setSearchQuery(target.value);
    filterCharacters();
  }
  function filterCharacters() {
    let filtered = characters.chars;
    if (searchQuery) {
      filtered = filtered.filter(char => {
        return char.name.toLowerCase().includes(searchQuery.toLowerCase().trim());
      })
      setFilteredCharacters(filtered);
    } else {
      setFilteredCharacters(filtered);
    }
  }
  function handleFilter({target}) {
    console.log(target.checked, target.value, target.name)
    setFilterQuery(target.value)

    let filtered = characters.chars;
    filtered = filtered.filter(char => {
      return char.species.toLowerCase() === target.value;
      console.log(char.species)
    })
    console.log(filtered)
    setFilteredCharacters(filtered);
  }

  return (
    <div>
      {characters.charsCount && <h2>Characters: {characters.charsCount}</h2>}
      {filterCharacters && <h4>Characters Found: {filteredCharacters.length}</h4>}
      {error && <h4>{error}</h4>}

      <Search searchQuery={searchQuery} onChange={handleSearch}/>

      <div>
        <h4>Filter By:</h4>
        <label htmlFor="alien">Alien</label>
        <input
          type="checkbox"
          name="alien"
          checked={false}
          value={filterQuery}
          onChange={(e) => handleFilter(e)}
        />
      <label htmlFor="human">Human</label>
        <input
          type="checkbox"
          name="human"
          checked={false}
          value={filterQuery}
          onChange={(e) => handleFilter(e)}
        />
      </div>

      <CharacterDetails
        characters={characters}
        onChange={handleLoadMoreData}
        filtered={filteredCharacters}
      />
    </div>
  )
}

export default Characters;
