import React from 'react';
import '../../assets/main.scss';

function Search({searchQuery, onChange}) {

  return (
    <div className="search-box-wrapper">
      
      <div className="input-field inline search-box">
            <input 
              className="search-input orange-text"
              id="email_inline" 
              type="text"
              value={searchQuery}
              onChange={onChange}
              />
            <label 
              htmlFor="email_inline" 
              className="active white-text search-label">
              Search
            </label>
      </div>

    </div>
  )
}

export default Search;
