import { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, IconButton, CircularProgress } from '@mui/material';
import { AccountCircle, LockOpen } from '@mui/icons-material';
import './HomePage.css';
import SignInButton from './SignInButton'
const HeroBanner = () => {
  const [loading, setLoading] = useState(true);
  const [previews, setPreviews] = useState([]);
  const [mostWatchedShows, setMostWatchedShows] = useState([]);

  useEffect(() => {
     setLoading(true);
    fetch('https://podcast-api.netlify.app/shows')
      .then((response) => response.json())
      .then((data) => {
        setPreviewData(data);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching previews:', error));
  }, []);


  useEffect(() => {
    // Function to start the scrolling animation
    const startScrollAnimation = () => {
      // Interval for smooth movement
      const interval = 10;
      // Step size for each movement
      const stepSize = 1;
      // Initial position of the images
      let position = 0;

      // Animation function
      const scrollImages = () => {
        position += stepSize;
        if (position >= 300) {
          // Set the threshold value (300 in this example) to stop the animation
          clearInterval(intervalId);
        } else {
          // Move the images to the right using the transform property
          const showImages = document.querySelectorAll('.ShowImages');
          showImages.forEach((img) => {
            img.style.transform = `translateX(${position}px)`;
          });
        }
      };

      // Start the animation
      const intervalId = setInterval(scrollImages, interval);

      // Clean up the interval when the component is unmounted
      return () => clearInterval(intervalId);
    };

    // Start the animation after the previews have loaded
    if (!loading) {
      startScrollAnimation();
    }
  }, [loading]);

  return (
   
    <Box className="banner-box" sx={{ height: '400px', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
       <SignInButton/>
    <Typography variant="h3" gutterBottom>
        Play your favorite episodes from MMS Podcast
      </Typography>
      <Button variant="contained" color="primary" size="large">
        Get Started
      </Button>

      {loading ? (
        <CircularProgress sx={{ mt: 3 }} color="primary" />
      ) : (
        <Grid container spacing={2} sx={{ marginTop: '20px' }}>
          {/* Map through the mostWatchedShows and display each show */}
          {mostWatchedShows.map((show) => (
            <Grid item key={show.id}>
              <div>
                <img className="ShowImages" src={show.image} alt={show.name} />
                <Typography variant="subtitle1" align="center">
                  {show.name}
                </Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add Signup and Login IconButton with hover titles */}
      <Box sx={{ marginTop: '20px' }}>
        <IconButton color="primary" aria-label="Signup" title="Signup">
          <AccountCircle />
        </IconButton>
        <IconButton color="primary" aria-label="Login" title="Login">
          <LockOpen />
        </IconButton>
      </Box>
    </Box>
  );
};

export default HeroBanner;