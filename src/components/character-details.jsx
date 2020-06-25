import React from 'react';

function CharacterDetails(props) {
  return (
    <div className="char-list-wrapper">
      {props.children}
    </div>
  )
}

export default CharacterDetails;
