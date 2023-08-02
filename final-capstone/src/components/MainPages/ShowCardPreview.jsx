//import React from 'react';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const ShowCardPreview = ({ show, isSelected, onToggleFavorite, onViewDetails }) => {
  return (
    <div className="card">
      <img src={show.image} className="card--image" alt={`Preview of ${show.title}`} />
      <h3>{show.title}</h3>
      <p>Seasons: {show.seasons}</p>
      <p>Last Updated: {show.lastUpdated}</p>
      <p>Genres: {show.genres.join(', ')}</p>
      <Button className="FavoriteButton" onClick={() => onToggleFavorite(show.id)} size="small">
        {show.isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
      </Button>
      {isSelected ? (
        <>
          <p>{show.description}</p>
          <Button variant="outlined" onClick={() => onViewDetails(null)} style={{ backgroundColor: 'grey', color: 'darkblue' }} size="small">
            Close
          </Button>
        </>
      ) : (
        <Button className="ViewButton" variant="outlined" onClick={() => onViewDetails(show.id)} style={{ backgroundColor: 'grey', color: 'darkblue' }} size="small">
          View Details
        </Button>
      )}
    </div>
  );
};

export default ShowCardPreview;