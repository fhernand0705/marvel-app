import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import CharacterDetails from './character-details';
import LoadMoreDataButton from './common/load-more-data-button';
import Search from './common/search';
import CheckboxWrapper from './common/checkbox-wrapper';
import { getCharacters, getCharacterCount } from '../services/api-service';
import { filterByName, filterBySpecies } from '../utils/filter-methods';
import { sortAlpha } from '../utils/sort';

function Characters() {
  const [characters, setCharacters] = useState({
    chars: [],
    charsCount: null
  });
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [idList, setIdList] = useState(21);
  const [searchQuery, setSearchQuery] = useState('');
  const [checkedItems, setCheckItems] = useState(new Map());
  const [isFetching, setIsFetching] = useState(false);
  const [isAscending, setIsAscending] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCharacters();

    if (!isFetching) return;
    fetchMoreCharacters();
  },[isFetching]);

  async function fetchCharacters() {
    try {
      const data = async () => {
        const promises = [];
        const ids = [...Array(idList).keys()];

        promises.push(getCharacters(ids))
        // RETURNED SERVER DATA
        return Promise.all(promises);
      }

      const res1 = await data();
      const res2 = await getCharacterCount();
      const charsCount = res2.data.info.count;
      const characters = res1.map(character => character.data)

      // IF MARVEL API, CONCAT RESPONSE ARRAY TO EMPTY ARRAY
      setCharacters({...characters, chars: characters[0], charsCount });
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
    const chars = [...characters.chars];

    return searchQuery ? setFilteredCharacters(filterByName(searchQuery, chars)) : setFilteredCharacters(chars);
  }
  function handleFilter({target}) {
    const checkboxName = target.name;
    const isChecked = target.checked;
    const chars = [...characters.chars];

    setCheckItems(checkedItems => checkedItems.set(checkboxName, isChecked));

    return isChecked ? setFilteredCharacters(filterBySpecies(checkboxName, chars)) : setFilteredCharacters(chars);
  }
  function handleSort() {
    setIsAscending((prevState) => prevState = !prevState);
    const characters = filteredCharacters;
    const sortedChars = sortAlpha(characters, isAscending);

    setFilteredCharacters(sortedChars);
  }

  const charsLength = filteredCharacters.length;

  return (
    <div>
      {characters.charsCount && <h2>Characters: {characters.charsCount}</h2>}
      {filteredCharacters && <h4>Characters Found: {filteredCharacters.length}</h4>}
      {error && <h4>{error}</h4>}
      <input type="checkbox" name="sort" onChange={handleSort}/>
      <Search searchQuery={searchQuery} onChange={handleSearch} />

      <CheckboxWrapper checkedItems={checkedItems} onChange={handleFilter} />

      <CharacterDetails>
        {
          filteredCharacters.map((char,i) =>
            <div key={i}>
              <NavLink to={`/character/${char.id}`}>{char.name}</NavLink>
              <div>{char.species}</div>
              <img src={char.image} alt=""/>
            </div>
        )}
      </CharacterDetails>
      {
        charsLength > 0 && charsLength < characters.charsCount ?
        <LoadMoreDataButton onClick={handleLoadMoreData}/> : null
      }
      {!charsLength && <div>Characters not found</div>}
    </div>
  )
}

export default Characters;
