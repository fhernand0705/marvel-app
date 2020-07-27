import React from 'react';
import '../../assets/main.scss';

function Search({searchQuery, onChange}) {

  return (
    <div className="search-box-wrapper">
      
      <div className="input-field inline bottom">
            <input 
              id="email_inline" 
              type="text"
              value={searchQuery}
              onChange={onChange}
              />
            <label HtmlFor="email_inline" className="active">Search</label>
      </div>

    </div>
  )
}

export default Search;
