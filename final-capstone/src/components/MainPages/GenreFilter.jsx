import React from 'react';
import Button from '@mui/material/Button';

const GenreFilter = ({ genres, selectedGenre, onGenreChange }) => {
  return (
    <div>
      {genres.map((genre, index) => (
        <Button
          key={index}
          variant={selectedGenre === genre ? 'contained' : 'outlined'}
          onClick={() => onGenreChange(genre)}
          size="small"
          style={{
            margin: '5px',
            color: selectedGenre === genre ? '#fff' : '#000',
            backgroundColor: selectedGenre === genre ? '#000' : '#fff',
            borderColor: '#000',
          }}
        >
          {genre}
        </Button>
      ))}
    </div>
  );
};

export default GenreFilter;