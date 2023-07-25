import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {AppBar, Toolbar, Typography, IconButton,Tooltip,} from '@mui/material';
import { Home, Search, Person, LibraryBooks, Menu } from '@mui/icons-material';
import logo from '../Images/logo.png';

const NavBar = () => {
  const [hoveredButton, setHoveredButton] = useState('');

  const handleButtonHover = (buttonName) => {
    setHoveredButton(buttonName);
  };

  return (
    <AppBar position="static">
      <Toolbar>

        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <img
            className="logo"
            src={logo}
            alt="Logo"
            style={{ height: '60px', width: '90px', marginRight: '5px' }}
          />
        </Typography>

        <IconButton 
            edge="start" 
            color="inherit" 
            className="menu">
          <Menu />
        </IconButton>

        <IconButton
          color="inherit"
          component={Link}
          to="/"
          onMouseOver={() => handleButtonHover('Home')}
          onMouseOut={() => handleButtonHover('')}
        >
          <Tooltip title="Home" placement="bottom">
            <Home color={hoveredButton === 'Home' ? 'primary' : 'inherit'} />
          </Tooltip>
        </IconButton>

        <IconButton
          color="inherit"
          component={Link}
          to="/search"
          onMouseOver={() => handleButtonHover('Search')}
          onMouseOut={() => handleButtonHover('')}
        >
          <Tooltip title="Search" placement="bottom">
            <Search color={hoveredButton === 'Search' ? 'primary' : 'inherit'} />
          </Tooltip>
        </IconButton>

        <IconButton
          color="inherit"
          component={Link}
          to="/signup"
          onMouseOver={() => handleButtonHover('Signup')}
          onMouseOut={() => handleButtonHover('')}
        >
          <Tooltip title="Signup" placement="bottom">
            <Person color={hoveredButton === 'Signup' ? 'primary' : 'inherit'} />
          </Tooltip>
        </IconButton>

        <IconButton
          color="inherit"
          component={Link}
          to="/library"
          onMouseOver={() => handleButtonHover('Library')}
          onMouseOut={() => handleButtonHover('')}
        >
          <Tooltip title="Library" placement="bottom">
            <LibraryBooks color={hoveredButton === 'Library' ? 'primary' : 'inherit'} />
          </Tooltip>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;