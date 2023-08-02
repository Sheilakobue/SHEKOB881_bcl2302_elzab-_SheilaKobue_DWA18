import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';


const SignInButton = ({ isLoggedIn, setIsLoggedIn }) => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [resetUsername, setResetUsername] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleForgotPasswordOpen = () => {
    setForgotPasswordOpen(true);
  };

  const handleForgotPasswordClose = () => {
    setForgotPasswordOpen(false);
  };

  const handleSignIn = () => {
    // Here, you would typically make an API call to authenticate the user
    // For the sake of the example, let's assume the username is 'admin' and password is 'password'
    if (username === 'admin' && password === 'password') {
      setIsSignedIn(true);
      handleClose();
    } else {
      alert('Invalid username or password');
    }
  };

  const handleResetPassword = () => {
    // Here, you would typically make an API call to reset the password for the given username
    // For the sake of the example, let's just log the username to the console
    console.log('Reset password for user:', resetUsername);
    handleForgotPasswordClose();
  };

  return (
    <div>
      {isSignedIn ? (
        <p>Welcome, {username}!</p>
      ) : (
        <div>
          <Button variant="outlined" onClick={handleOpen}>
            Sign In
          </Button>
          <Button variant="outlined" onClick={handleForgotPasswordOpen}>
            Forgot Password
          </Button>
        </div>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Sign In</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSignIn} color="primary">
            Sign In
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={forgotPasswordOpen} onClose={handleForgotPasswordClose}>
        <DialogTitle>Forgot Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            value={resetUsername}
            onChange={(e) => setResetUsername(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleForgotPasswordClose}>Cancel</Button>
          <Button onClick={handleResetPassword} color="primary">
            Reset Password
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    
  );
};

export default SignInButton;