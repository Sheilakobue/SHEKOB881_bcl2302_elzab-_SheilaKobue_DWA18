// FavoriteList.js
import React from 'react';
import Button from '@mui/material/Button';

const FavoriteList = ({ favorites, onRemoveFavorite, onShowDetails }) => {
  return (
    <div>
      <h3>Favorite Episodes</h3>
      {favorites.map((favorite) => (
        <div key={favorite.episodeId}>
          <h5>{favorite.showTitle}</h5>
          <p>Season {favorite.seasonNumber}</p>
          <p>Episode Number: {favorite.episodeNumber}</p>
          <p>Duration: {favorite.duration}</p>
          <Button
            variant="outlined"
            onClick={() => onShowDetails(favorite.episodeId)}
            style={{ backgroundColor: 'grey', color: 'darkblue' }}
            size="small"
          >
            View Episode Details
          </Button>
          <Button
            variant="outlined"
            onClick={() => onRemoveFavorite(favorite.episodeId)}
            style={{ backgroundColor: 'red', color: 'white' }}
            size="small"
          >
            Remove from Favorites
          </Button>
        </div>
      ))}
    </div>
  );
};

export default FavoriteList;