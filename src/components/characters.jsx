import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';

import { BsFillPersonFill } from 'react-icons/bs';
import { filterByName, filterBySpecies } from '../utils/filter-methods';
import { sortAlpha } from '../utils/sort';

import CharacterDetails from './character-details';
import LoadMoreDataButton from './common/load-more-data-button';
import Search from './common/search';
import CheckboxWrapper from './common/checkbox-wrapper';
import Switch from './common/switch';
import BackToTopBtn from './back-to-top-button';


function Characters() { 
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [checkedItems, setCheckItems] = useState(new Map());
  const [isAscending, setIsAscending] = useState(true);
  const [error, setError] = useState('');
  const [isHidden, setIsHidden] = useState(true); 
  
  const defaultEndpoint = 'https://rickandmortyapi.com/api/character'; 
  
  useEffect(() => {
    fetchCharacters();
  }, []);
  
  const { currentPage } = page; 
  
  useEffect(() => {
    if (currentPage === defaultEndpoint) return;
    fetchMoreCharacters();
  },[currentPage]);

  async function fetchCharacters() {
    const data = await axios.get(defaultEndpoint);
    const { info, results: characters = [] } = data.data;

    const sortedCharacters = _.sortBy(characters, 'name'); 
    
    setCharacters(sortedCharacters);
    setPage({...page, ...info, currentPage: defaultEndpoint});
  }

  async function fetchMoreCharacters() {
    try {
      // const storedCharacters = localStorage.getItem('characters');
      // const storedCharsCount = localStorage.getItem('charactersCount');
      
      // if (storedCharacters && storedCharsCount) {
      //   setCharacters({ 
      //     ...characters, 
      //     chars: JSON.parse(storedCharacters),
      //     charsTotalCount: JSON.parse(storedCharsCount) }); 
      //   setFilteredCharacters(JSON.parse(storedCharacters));
      // } else {
        
        //localStorage.setItem('characters', JSON.stringify(characters[0]));
        //localStorage.setItem('charactersCount', JSON.stringify(charsTotalCount));

        const res = await axios.get(currentPage);
        const { info, results } = res.data; 
        
        setPage({currentPage, ...info});

        if (!info.prev) {
          setCharacters(results);
          return; 
        }
        setCharacters(prev => {
          return [...prev, ...results];
        })
      
    } catch(e) {
      if (e) console.log(e.message);
    }
  }

  function handleLoadMore() {
    setPage(prev => {
      return {...prev, currentPage: page.next}
    })
  }

  function handleSearch({target}) {
    setSearchQuery(target.value);
  }

  function handleFilter({target}) {
    const checkboxName = target.name;
    const isChecked = target.checked;
    const chars = [...characters];

    setCheckItems(checkedItems => checkedItems.set(checkboxName, isChecked));
    const filteredChars = filterBySpecies(checkboxName, chars);

    console.log(chars)
    console.log(isChecked)
    console.log(checkboxName)
    return isChecked ? setCharacters(filteredChars) : setCharacters(chars => [...chars]);
  }

  function handleSort() {
    setIsAscending((prevState) => prevState = !prevState);
    const chars = [...characters];
    const sortedChars = sortAlpha(chars, isAscending);

    setCharacters(sortedChars);
  }

  function handleToggleDropdown() {
    setIsHidden((isHidden) => isHidden = !isHidden); 
  }

  function getFilteredCharacters() {
    const chars = [...characters];
    return filterByName(searchQuery, chars);
  }

  const charsLength = characters.length;

  return (
    <div>
      <Search searchQuery={searchQuery} onChange={handleSearch} />
      
      <div className="character-wrapper">
        {error && <h4>{error}</h4>}

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
          <div className="char-section">
            <div className="char-list-wrapper">
            { getFilteredCharacters().map((char,i) =>
                <div key={i} className="card-wrapper">
                  <div className="card-content">
                    <img src={char.image} className="char-img" alt="character_image"/>
                    <div className="card-text">
                      <NavLink to={`/character/${char.id}`}>
                        <h3 className="char-name">{char.name}</h3>
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
                        <span className="char-origin-header">Original Location:</span>
                        <p>{char.origin.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
            )}
            </div>
              {
                charsLength > 0 &&
                <LoadMoreDataButton onClick={handleLoadMore}/> 
              }
          </div>
          </CharacterDetails>
          <BackToTopBtn />
        </div>
        <div className="not-found-msg">
          {!charsLength && <div>No Characters Found...</div>}
        </div>
    </div>      
  )
}

export default Characters;
