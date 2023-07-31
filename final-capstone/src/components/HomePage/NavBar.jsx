import { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Tooltip, Link } from '@mui/material';
import { LockOpen, PersonAdd } from '@mui/icons-material';
import logo from '../Images/logo.png';


export default function NavBar() {
  const [hoveredButton, setHoveredButton] = useState('');
  const handleButtonHover = (buttonName) => {
    setHoveredButton(buttonName);
  };
  return (
    <AppBar position="fixed" className="app-bar">
      <Toolbar>
        <Typography variant="h6">
          <img className="logo" src={logo} alt="Logo" />
        </Typography>

        <Typography variant="h6" className="nav-title">
          <h3>MMS Podcast</h3>
        </Typography>

        <IconButton
          color="inherit"
          aria-label="Sign up"
          component={Link}
          to="/signup"
          onMouseOver={() => handleButtonHover('Signup')}
          onMouseOut={() => handleButtonHover('')}
          className="nav-button"
        >
          <Tooltip title="Sign Up" placement="bottom">
            <PersonAdd color={hoveredButton === 'Signup' ? 'primary' : 'inherit'} />
          </Tooltip>
        </IconButton>

        <IconButton
          color="inherit"
          aria-label="Sign in"
          component={Link}
          to="/sign in"
          onMouseOver={() => handleButtonHover('Sign in')}
          onMouseOut={() => handleButtonHover('')}
          className="nav-button"
        >
          <Tooltip title="Sign In" placement="bottom">
            <LockOpen color={hoveredButton === 'Sign in' ? 'primary' : 'inherit'} />
          </Tooltip>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}