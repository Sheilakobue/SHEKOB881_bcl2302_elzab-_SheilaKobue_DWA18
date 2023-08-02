import React from 'react';

const SearchFilter = ({ searchTerm, handleSearch }) => {
  return (
    <input type="text" placeholder="Search shows..." value={searchTerm} onChange={handleSearch} />
  );
};

export default SearchFilter;