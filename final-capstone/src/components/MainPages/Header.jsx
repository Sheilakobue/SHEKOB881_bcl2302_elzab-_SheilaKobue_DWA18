import { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Tooltip } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import logo from '../Images/logo.png';

export default function Header() {
  const [hoveredButton, setHoveredButton] = useState('');

  return (
    <AppBar className="app-bar" style={{ background: 'transparent' }}>
      <Toolbar>
        <Typography variant="h6">
          <img className="logo" src={logo} alt="Logo" />
        </Typography>

        <Typography variant="h6" className="nav-title">
          MMS Podcast
        </Typography>

        {/* Sign Out Button */}
        <IconButton
          color="inherit"
          aria-label="Sign out"
          onMouseOver={() => setHoveredButton('SignOut')}
          onMouseOut={() => setHoveredButton('')}
          className="nav-button"
          style={{ color: hoveredButton === 'SignOut' && 'grey' }}
        >
          <Tooltip title="Sign Out" placement="bottom">
            <ExitToApp />
          </Tooltip>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}