import React from 'react';

function CharacterDetails({characters}) {
  return (
    <div>
      { characters.map(char =>
          <div key={Math.random() + char.id}>
            <div>{char.name}</div>
            <div>{char.species}</div>
            <img src={char.image} alt=""/>
          </div>
      )}
    </div>
  )
}

export default CharacterDetails;
