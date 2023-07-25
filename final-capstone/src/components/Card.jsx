import React, { useState, useEffect } from 'react';
import "./Card.css"
import Grid from '@mui/material/Grid';

export default function Card() {
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://podcast-api.netlify.app/shows')
      .then((response) => response.json())
      .then((data) => {
        setPreviews(data);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching previews:', error));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {previews.map((preview) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={preview.id}>
          <div className="card">
            <img src={preview.image} className="card--image" alt={`Preview of ${preview.title}`} />
            <h3>{preview.title}</h3>
            <p>Seasons: {preview.seasons}</p>
            <p>Last Updated: {preview.lastUpdated}</p>
            <p>Genres: {preview.genres.join(', ')}</p>
            <p>{preview.description.substring(0,150)}</p>
            {/* Add link to view full details of the show */}
          </div>
        </Grid>
      ))}
    </Grid>
  );
}

