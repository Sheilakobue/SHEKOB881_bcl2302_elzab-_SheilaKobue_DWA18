import React, { useState, useEffect } from 'react';
import './Cards.css';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

export default function Cards() {
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cardsToShow, setCardsToShow] = useState(8); // Initial number of cards to show
  const [selectedCardId, setSelectedCardId] = useState(null);

  useEffect(() => {
    fetch('https://podcast-api.netlify.app/shows')
      .then((response) => response.json())
      .then((data) => {
        setPreviews(data);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching previews:', error));
  }, []);

  // ShowMore
  const handleShowMore = () => {
    setCardsToShow((prevCardsToShow) => prevCardsToShow + 8); // Show 8 more cards on each click
  };

  const handleShowLess = () => {
    setCardsToShow(8); // Reset to the initial number of cards to show
  };

  const handleViewDetails = (cardId) => {
    setSelectedCardId(cardId);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {previews.slice(0, cardsToShow).map((preview) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={preview.id}>
            <div className="card">
              <img
                src={preview.image}
                className="card--image"
                alt={`Preview of ${preview.title}`}
              />
              <h3>{preview.title}</h3>
              <p>Seasons: {preview.seasons}</p>
              <p>Last Updated: {preview.lastUpdated}</p>
              <p>Genres: {preview.genres.join(', ')}</p>
              {selectedCardId === preview.id ? (
                <>
                  <p>{preview.description}</p>
                  <Button variant="outlined" onClick={() => setSelectedCardId(null)}>
                    Close
                  </Button>
                </>
              ) : (
                <Button className="ViewButton" variant="outlined" onClick={() => handleViewDetails(preview.id)}>
                  View Details
                </Button>
              )}
            </div>
          </Grid>
        ))}
      </Grid>

      {cardsToShow < previews.length && (
        <Button variant="contained" onClick={handleShowMore}>
          Show More
        </Button>
      )}
      {cardsToShow > 8 && (
        <Button variant="contained" onClick={handleShowLess}>
          Show Less
        </Button>
      )}
    </>
  );
}