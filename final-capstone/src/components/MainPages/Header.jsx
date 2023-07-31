import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Link,
  Menu,
  MenuItem,
} from '@mui/material';
import { Search, Favorite, ExitToApp, LibraryBooks, Sort } from '@mui/icons-material';
import logo from '../Images/logo.png';

export default function Header() {
  const [hoveredButton, setHoveredButton] = useState('');
  const [anchorEl, setAnchorEl] = useState(null); // Anchor element for the menu
  const open = Boolean(anchorEl);
  const [sortByAZ, setSortByAZ] = useState(false); // New state variable for sorting

  const handleButtonHover = (buttonName) => {
    setHoveredButton(buttonName);
  };

  const handleSortToggle = () => {
    setSortByAZ((prevSortByAZ) => !prevSortByAZ); // Toggle the sorting order
    handleMenuClose(); // Close the menu after selecting an option
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" className="app-bar" style={{ backgroundColor: 'transparent' }}>
      <Toolbar>
        <Typography variant="h6">
          <img className="logo" src={logo} alt="Logo" />
        </Typography>

        <Typography variant="h6" className="nav-title">
          <h3>MMS Podcast</h3>
        </Typography>

        {/* Sort Dropdown Menu */}
        <div>
          <IconButton
            color="inherit"
            aria-label="Sort"
            onMouseOver={() => handleButtonHover('Sort')}
            onMouseOut={() => handleButtonHover('')}
            onClick={handleMenuOpen}
            className="nav-button"
          >
            <Tooltip title={`Sort ${sortByAZ ? 'Z-A' : 'A-Z'}`} placement="bottom">
              <Sort color={hoveredButton === 'Sort' ? 'primary' : 'inherit'} />
            </Tooltip>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            keepMounted
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            getContentAnchorEl={null}
          >
            <MenuItem onClick={handleSortToggle}>
              {sortByAZ ? 'Sort Z-A' : 'Sort A-Z'}
            </MenuItem>
          </Menu>
        </div>
      
         {/* Library Button */}
        <IconButton
          color="inherit"
          aria-label="Library"
          onMouseOver={() => handleButtonHover('Library')}
          onMouseOut={() => handleButtonHover('')}
          className="nav-button"
        >
          <Tooltip title="Library" placement="bottom">
            <LibraryBooks color={hoveredButton === 'Library' ? 'primary' : 'inherit'} />
          </Tooltip>
        </IconButton>

        {/* Search Button */}
        <IconButton
          color="inherit"
          aria-label="Search"
          onMouseOver={() => handleButtonHover('Search')}
          onMouseOut={() => handleButtonHover('')}
          className="nav-button"
        >
          <Tooltip title="Search" placement="bottom">
            <Search color={hoveredButton === 'Search' ? 'primary' : 'inherit'} />
          </Tooltip>
        </IconButton>

        {/* Favorite Button */}
        <IconButton
          color="inherit"
          aria-label="Favorite"
          onMouseOver={() => handleButtonHover('Favorite')}
          onMouseOut={() => handleButtonHover('')}
          className="nav-button"
        >
          <Tooltip title="Favorite" placement="bottom">
            <Favorite color={hoveredButton === 'Favorite' ? 'primary' : 'inherit'} />
          </Tooltip>
        </IconButton>

        {/* Sign Out Button */}
        <IconButton
          color="inherit"
          aria-label="Sign out"
          onMouseOver={() => handleButtonHover('SignOut')}
          onMouseOut={() => handleButtonHover('')}
          className="nav-button"
        >
          <Tooltip title="Sign Out" placement="bottom">
            <ExitToApp color={hoveredButton === 'SignOut' ? 'primary' : 'inherit'} />
          </Tooltip>
        </IconButton>

      </Toolbar>
    </AppBar>
  );
}