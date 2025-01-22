import { useSelector } from 'react-redux';
import { Box, Typography, Grid, Card, CardContent, Divider, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
const OrderSummary = () => {
  const cartItems = useSelector((state) => state.cart.cart);

  const total = useSelector((state) => state.cart.total);

  // Calculate the original price based on item quantity
  const originalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
 
   
  // Assuming discount is 100% for the example, set it to original price
  const discount = originalPrice;
  const discountedTotal = 0; // Since it's 100% discount, total price becomes 0

  const navigate = useNavigate(); // Initialize useNavigate

  // Function to navigate to the home page
  const handleContinueShopping = () => {
    navigate('/'); // Navigate to the home page (index page)
  };

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
        Thank You!
      </Typography>
      <Typography variant="h6" gutterBottom>
        Your order has been successfully processed.
      </Typography>
      <Box sx={{ maxWidth: 600, width: '100%', marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          Order Details{}
        </Typography>
        <Grid container spacing={2}>
          {cartItems.map((item) => (
            <Grid item xs={12} key={item.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body1">{item.title}</Typography>
                    {/* Show the price based on quantity */}
                    <Typography variant="body1">
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  
                  </Box>
                 
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box  sx={{ display: 'flex', justifyContent: 'center',margin:"3px"}}> <Typography variant="h6">Total Price:{total}</Typography></Box>
        <Box sx={{ marginTop: 4 }}>
          <Divider sx={{ marginBottom: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
            <Typography variant="body1">Original Price:</Typography>
            <Typography variant="body1">${originalPrice.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
            <Typography variant="body1">Discount Applied:</Typography>
            <Typography variant="body1">-${discount.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
           
            <Typography variant="h6">${discountedTotal.toFixed(2)}</Typography>
          </Box>
          <Divider sx={{ marginTop: 2 }} />
        </Box>
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="body1">
            Enjoy free listening to your purchased items!
          </Typography>
        </Box>
      </Box>

      {/* Continue Shopping Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleContinueShopping}
        sx={{ marginTop: 4 }}
      >
        Continue Shopping
      </Button>
    </Box>
  );
};

export default OrderSummary;
