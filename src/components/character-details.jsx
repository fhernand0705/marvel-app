import React from 'react';

function CharacterDetails({characters, onChange}) {
  const charsLength = characters.characters.length;
  const charsTotalCount = characters.characterCount;
  return (
    <div>
      { characters.characters.map((char,i) =>
          <div key={i}>
            <div>{char.name}</div>
            <div>{char.species}</div>
            <img src={char.image} alt=""/>
          </div>
      )}
      {charsLength > 0 && charsLength < charsTotalCount ?
        <button onClick={() => onChange()}>Load more</button> : null
      }
    </div>
  )
}

export default CharacterDetails;
