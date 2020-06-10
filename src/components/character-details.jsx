import React from 'react';
import { NavLink } from 'react-router-dom';

function CharacterDetails({characters, onChange, filtered}) {
  const charsLength = filtered.length;
  return (
    <div>
      { filtered.map((char,i) =>
          <div key={i}>
            <NavLink to={`/character/${char.id}`}>{char.name}</NavLink> 
            <div>{char.species}</div>
            <img src={char.image} alt=""/>
          </div>
      )}
      {charsLength > 0 && charsLength < characters.charsCount ?
        <button onClick={() => onChange()}>Load more</button> : null
      }
      {!charsLength && <div>Characters not found</div>}
    </div>
  )
}

export default CharacterDetails;
