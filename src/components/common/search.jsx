import React from 'react';

function Search({searchQuery, onChange}) {
  return (
    <input
      type="text"
      className="form-control"
      value={searchQuery}
      onChange={(e) => onChange(e)}
      placeholder="Search..."
    />
  )
}

export default Search;
