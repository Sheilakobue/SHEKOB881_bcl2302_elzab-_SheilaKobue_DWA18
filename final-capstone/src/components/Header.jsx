import { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Tooltip, Link } from '@mui/material';
import { LockOpen, PersonAdd } from '@mui/icons-material';
import logo from "../Images/logo.png";

export default function Header() {
  const [hoveredButton, setHoveredButton] = useState("");
  const handleButtonHover = (buttonName) => {
    setHoveredButton(buttonName);
  };
  return (
    <AppBar position="fixed" color="default">
    <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <img
            className="logo"
            src={logo}
            alt="Logo"
            style={{ height: "70px", width: "90px", marginRight: "5px" }}
          />
        </Typography>
      
        <Typography variant="h6" style={{ 
            flexGrow: 1,
            textAlign: 'center', 
            color:"blue"}}>
          <h3>MMS Podcast</h3>
        </Typography>

        <IconButton 
          color="inherit" 
          aria-label="Sign up"
          component={Link}
          to="/signup"
          onMouseOver={() => handleButtonHover("Signup")}
          onMouseOut={() => handleButtonHover("")}
        >
          <Tooltip title="Sign Up" placement="bottom">
            <PersonAdd
              color={hoveredButton === "Signup" ? "primary" : "inherit"}
            />
          </Tooltip>
        </IconButton>

        <IconButton 
          color="inherit" 
          aria-label="Sign in"
          component={Link}
          to="/sign in"
          onMouseOver={() => handleButtonHover("Sign in")}
          onMouseOut={() => handleButtonHover("")}
        >
          <Tooltip title="Sign In" placement="bottom">
            <LockOpen
              color={hoveredButton === "Sign in" ? "primary" : "inherit" }
            />
          </Tooltip>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}