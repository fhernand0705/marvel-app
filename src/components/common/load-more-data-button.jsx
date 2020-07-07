import React from 'react';

function LoadMoreDataButton({onClick}) {
  return (
    <div className="load-btn-wrapper">
      <button 
        className="btn btn-primary load-btn" 
        onClick={() => onClick()}>
        Load More
      </button>
    </div>
  )
}

export default LoadMoreDataButton;
