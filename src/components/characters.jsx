import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import CharacterDetails from './character-details';
import LoadMoreDataButton from './common/load-more-data-button';
import Search from './common/search';
import CheckboxWrapper from './common/checkbox-wrapper';
import Switch from './common/switch';
import withLoadData from './hoc/withLoadData';
import {BsFillPersonFill} from 'react-icons/bs'
import { getCharacters, getCharacterCount } from '../services/api-service';
import { filterByName, filterBySpecies } from '../utils/filter-methods';
import { sortAlpha } from '../utils/sort';

function Characters({isFetching, characterIdList, loadCharacterData, setFetching}) {
  const [characters, setCharacters] = useState({
    chars: [],
    charsTotalCount: null
  });
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [checkedItems, setCheckItems] = useState(new Map());
  const [isAscending, setIsAscending] = useState(false);
  const [error, setError] = useState('');
  const [isHidden, setIsHidden] = useState(true); 

  useEffect(() => {
    fetchCharacters();

    if (!isFetching) return;
    fetchMoreCharacters();
  },[isFetching, characterIdList]);

  async function fetchCharacters() {
    try {
      const data = async () => {
        const promises = [];
        const ids = [...Array(characterIdList).keys()];

        promises.push(getCharacters(ids))
        // RETURNED SERVER DATA
        return Promise.all(promises);
      }

      const characterData = await data();
      const characterCount= await getCharacterCount();
      const charsTotalCount = characterCount.data.info.count;
      const characters = characterData.map(character => character.data)

      // IF MARVEL API, CONCAT RESPONSE ARRAY TO EMPTY ARRAY
      setCharacters({...characters, chars: characters[0], charsTotalCount });
      setFilteredCharacters(characters[0]);
    } catch(e) {
      if (e) setError('Oops, there was an error with your request.');
    }
  }
  function fetchMoreCharacters() {
    if (characterIdList > 820) return;
    fetchCharacters();
    setFetching(prev => prev = !prev);
  }
  function handleSearch({target}) {
    setSearchQuery(target.value);
    const chars = [...characters.chars];

    return target.value ? setFilteredCharacters(filterByName(searchQuery, chars)) : setFilteredCharacters(chars);
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
  function handleToggleDropdown() {
    setIsHidden((isHidden) => isHidden = !isHidden); 
  }

  //console.log(characters)
  const charsLength = filteredCharacters.length;

  return (
    <div>
      {error && <h4>{error}</h4>}
      <Search searchQuery={searchQuery} onChange={handleSearch} />
      <div className="character-wrapper">
        <div className="menu-container">
          <div className="filter-sort-wrapper">
            <CheckboxWrapper 
              checkedItems={checkedItems} 
              isHidden={isHidden}
              onChange={handleFilter} 
              onClick={handleToggleDropdown}
            />
            <Switch onChange={handleSort}/>
          </div>
        </div>
      
        <CharacterDetails>
          <div className="char-list-wrapper">
          {
            filteredCharacters.map((char,i) =>
              <div key={i} className="card-wrapper">
                <div className="card-content">
                  <img src={char.image} className="char-img" alt="character_image"/>
                  <div className="card-text">
                  <NavLink to={`/character/${char.id}`}>
                    <h4>{char.name}</h4>
                  </NavLink>
                  <div>
                    <span>{char.species}</span>
                    <span className="status">
                      {char.status.charAt(0).toUpperCase() + char.status.slice(1)}
                    </span>
                    <span 
                      className={char.status === 'Alive' ? 'status-alive' : 'status-dead'
                    }>
                      <BsFillPersonFill/>
                    </span>
                  </div>
                  <div>
                    <span className="origin-header">Original Location:</span>
                    <p>{char.origin.name}</p>
                  </div>
                  </div>
                </div>
              </div>
          )}
          </div>
          </CharacterDetails>
      </div>
        {
          charsLength > 0 && charsLength < characters.charsTotalCount ?
          <LoadMoreDataButton onClick={loadCharacterData}/> : null
        }
        {!charsLength && <div>Characters not found</div>}
    </div>      
  )
}

export default withLoadData(Characters);
