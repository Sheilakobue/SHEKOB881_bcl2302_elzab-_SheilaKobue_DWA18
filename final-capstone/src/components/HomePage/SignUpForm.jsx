import { useState } from 'react';
import { Button, TextField, Container } from '@mui/material';
import './HomePage.css'; // Import the Styling.css file

const SignUpForm = () => {
  const [isVisible, setIsVisible] = useState(false); // State variable to control the visibility of the form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSignUp = () => {
    // Reset previous error messages
    setEmailError('');
    setPasswordError('');

    // Simple email and password validation
    if (!email) {
      setEmailError('Email is required');
    } else if (!isValidEmail(email)) {
      setEmailError('Wrong email format');
    }

    if (!password) {
      setPasswordError('Password is required');
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
    }

    // If there are no errors, proceed with sign-up logic
    if (!emailError && !passwordError) {
      // Implement your sign-up logic here
      // For simplicity, we'll just log the email and password for now
      console.log('Email:', email);
      console.log('Password:', password);
    }
  };

  const isValidEmail = (value) => {
    // Simple email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  return (
    <Container maxWidth="xs" className="signup-form-container" isVisible={isVisible}>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        error={!!emailError}
        helperText={emailError}
        className="signup-input"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        error={!!passwordError}
        helperText={passwordError}
        className="signup-input"
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSignUp}
        className="signup-button"
      >
        Sign Up
      </Button>
    </Container>
  );
};

export default SignUpForm;