import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

const SearchFilter = ({ searchTerm, onSearchChange, selectedGenre, onGenreChange }) => {
  const genreNames = ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Sci-Fi'];

  return (
    <div className="DropdownMenu">
      <select value={selectedGenre || ''} onChange={(e) => onGenreChange(e.target.value)}>
        <option value="">Select Genre</option>
        {genreNames.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
      <div className="SearchContainer">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <SearchIcon className="SearchIcon" />
      </div>
    </div>
  );
};

export default SearchFilter;