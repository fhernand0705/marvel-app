import React from 'react';

function LoadMoreDataButton({onClick}) {
  return (
    <button onClick={() => onClick()}>Load more</button>
  )
}

export default LoadMoreDataButton;
