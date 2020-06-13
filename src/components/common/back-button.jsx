import React from 'react';

function BackButton({onChange}) {
  return (
    <button onClick={() => onChange()}>Back</button>
  )
}

export default BackButton;
