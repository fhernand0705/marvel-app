import React from 'react';

function BackButton({onChange}) {
  return (
    <button className="btn btn-primary" onClick={() => onChange()}>Back</button>
  )
}

export default BackButton;
