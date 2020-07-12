import React from 'react';
import '../../assets/main.scss';

function Search({searchQuery, onChange}) {
  return (
    <div className="search-box-wrapper">
      <input
      type="text"
      className="form-control search-box"
      value={searchQuery}
      onChange={(e) => onChange(e)}
      placeholder="Search..."
      />
    </div>
  )
}

export default Search;
