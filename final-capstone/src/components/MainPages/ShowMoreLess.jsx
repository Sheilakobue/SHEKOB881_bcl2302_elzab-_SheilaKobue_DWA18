import React, { useState, useEffect, Fragment } from 'react';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import InfoIcon from '@mui/icons-material/Info';

const ShowMoreLess = ({ show, handleViewDetails, handleSeasonClick }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      {!expanded ? (
        <div>
          <IconButton
            className="ViewButton"
            onClick={() => handleViewDetails(show.id)}
            style={{ color: 'lightBlue' }}
          >
            <InfoIcon />
          </IconButton>
          <IconButton
            variant="outlined"
            onClick={() => handleSeasonClick(show.id)}
            style={{ backgroundColor: 'lightblue', color: 'darkblue' }}
            size="small"
          >
            Seasons
          </IconButton>
        </div>
      ) : (
        <div>
          <p>{show.description}</p>
          <IconButton
            variant="outlined"
            onClick={() => handleViewDetails(null)}
            style={{ backgroundColor: 'lightblue', color: 'darkblue' }}
            size="small"
          >
            Close
          </IconButton>
        </div>
      )}
    </div>
  );
};