import React from 'react';

const SearchBox = ({searchQuery, autoFocus=false, onChange}) => {
  return (
    <div className="form-group">
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        value={searchQuery}
        onChange={e => onChange(e.target.value)}
        autoFocus={autoFocus}
      />
    </div>
  );
}
 
export default SearchBox;