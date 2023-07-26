import React, { useState, useEffect } from 'react';
import Card from './Card'; // Importing the Card component
import { Grid } from '@mui/material';

export default function CardData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/shows")
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch((error) => console.error('Error fetching previews:', error));
  }, []);

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {data.map((dataMapping) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={dataMapping.id}>
          <Card
            id={dataMapping.id}
            titles={dataMapping.title}
            descriptions={dataMapping.description}
            seasons={dataMapping.season}
            images={dataMapping.image}
          />
        </Grid>
      ))}
    </Grid>
  );
}