import React from 'react';
import './SearchBar.scss';

const SearchBar = (props) => {
  return (
    <div className="search-bar">
      <div className="input-group">
        <input type="text" required className="has-full-width" />
        <span className="input-text-highlight"></span>
        <span className="input-text-bar"></span>
        <label className="input-text-label">Search</label>
        <span className="input-text-icon search-bar-search-icon">
          <i className="fas fa-search"></i>
        </span>
      </div>
    </div>
  );
};

export default SearchBar;
