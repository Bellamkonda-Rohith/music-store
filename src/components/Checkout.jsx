import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cart); // Assuming cartItems includes quantity
 
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isEmailSelected, setIsEmailSelected] = useState(false);
  const [isPhoneSelected, setIsPhoneSelected] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [contactInfo, setContactInfo] = useState(null);

  // Validation Functions
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

  const handleCheckout = () => {
    let isValid = true;

    if (isEmailSelected && !validateEmail(email)) {
      setEmailError(true);
      isValid = false;
    } else {
      setEmailError(false);
    }

    if (isPhoneSelected && !validatePhone(phone)) {
      setPhoneError(true);
      isValid = false;
    } else {
      setPhoneError(false);
    }

    if (!isEmailSelected && !isPhoneSelected) {
      alert('Please select either email or phone number to proceed.');
      return;
    }

    if (isValid) {
      setContactInfo({
        type: isEmailSelected ? 'email' : 'phone',
        value: isEmailSelected ? email : phone,
      });
      setIsSubmitted(true); // Navigate to order summary view
    }
  };

  if (isSubmitted && contactInfo) {
   
    navigate('/OrderSummary');
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      <Grid container spacing={2} sx={{ maxWidth: 600 }}>
        {cartItems.map((item) => (
          <Grid item xs={12} key={item.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">{item.title} * {item.quantity}</Typography>
                  <Typography variant="body2">Price: ${item.price.toFixed(2)}</Typography>
                  {/* Calculate total price based on quantity */}
                  <Typography variant="body2">Total: ${(item.price * item.quantity).toFixed(2)}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Calculate total for all items */}
      <Typography variant="h5" sx={{ marginTop: 2 }}>
        Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
      </Typography>
      <Box sx={{ marginTop: 3, width: '100%', maxWidth: 400 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isEmailSelected}
              onChange={(e) => {
                setIsEmailSelected(e.target.checked);
                if (e.target.checked) {
                  setIsPhoneSelected(false);
                }
              }}
            />
          }
          label="Use Email"
        />
        {isEmailSelected && (
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            helperText={emailError ? 'Please enter a valid email address.' : ''}
            sx={{ marginBottom: 2 }}
          />
        )}
        <FormControlLabel
          control={
            <Checkbox
              checked={isPhoneSelected}
              onChange={(e) => {
                setIsPhoneSelected(e.target.checked);
                if (e.target.checked) {
                  setIsEmailSelected(false);
                }
              }}
            />
          }
          label="Use Phone Number"
        />
        {isPhoneSelected && (
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={phoneError}
            helperText={phoneError ? 'Please enter a valid 10-digit phone number.' : ''}
            sx={{ marginBottom: 2 }}
          />
        )}
        <Button variant="contained" color="primary" onClick={handleCheckout} fullWidth>
          Proceed to Payment
        </Button>
      </Box>
    </Box>
  );
};

export default Checkout;
