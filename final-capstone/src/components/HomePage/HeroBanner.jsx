import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button, Grid } from '@mui/material';


const HeroBanner = () => {
  const [mostWatchedShows, setMostWatchedShows] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get('https://podcast-api.netlify.app/shows')
      .then((response) => {
        // Sort the shows by most watched (you may need to adjust the property name based on the API response)
        const sortedShows = response.data.sort((a, b) => b.views - a.views).slice(0, 10);
        setMostWatchedShows(sortedShows);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <Box sx={{ height: '400px', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <Typography variant="h3" gutterBottom>
        Play your favorite episodes from MMS Podcast
      </Typography>
      <Button variant="contained" color="primary" size="large">
        Get Started
      </Button>

      <Grid container spacing={2} sx={{ marginTop: '20px' }}>
        {/* Map through the mostWatchedShows and display each show */}
        {mostWatchedShows.map((show) => (
          <Grid item key={show.id}>
            <div>
              <img src={show.image} alt={show.name} style={{ width: '100px', height: '100px' }} />
              <Typography variant="subtitle1" align="center">
                {show.name}
              </Typography>
            </div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HeroBanner;