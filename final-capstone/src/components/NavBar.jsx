import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Home, Search, Person, LibraryBooks, Menu } from '@mui/icons-material';
import logo from '../Images/logo.png'

const NavBar = () => {
  return (
    <AppBar position="static">
    
      <Toolbar>
      <Typography variant="h6" style={{ flexGrow: 1 }}>
      
          <img className="logo" src={logo} alt="Logo" style={{ height: '50px', marginRight: '5px' }}
          />
          
        </Typography>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <Menu />
        </IconButton>
        
        <IconButton color="inherit" component={Link} to="/">
          <Home />
        </IconButton>
        <IconButton color="inherit" component={Link} to="/search">
          <Search />
        </IconButton>
        <IconButton color="inherit" component={Link} to="/signup">
          <Person />
        </IconButton>
        <IconButton color="inherit" component={Link} to="/library">
          <LibraryBooks />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;