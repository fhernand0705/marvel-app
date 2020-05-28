import React from 'react';

function CharacterDetails({characters, onChange, filtered}) {
  const charsLength = filtered.length;
  return (
    <div>
      { filtered.map((char,i) =>
          <div key={i}>
            <div>{char.name}</div>
            <div>{char.species}</div>
            <img src={char.image} alt=""/>
          </div>
      )}
      {charsLength > 0 && charsLength < characters.charsCount ?
        <button onClick={() => onChange()}>Load more</button> : null
      }
    </div>
  )
}

export default CharacterDetails;
