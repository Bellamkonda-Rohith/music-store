import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, addToCart, resetCart } from '../Redux/cartSlice'; // Adjust the path as necessary
import {
  Box,
  Typography,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const cartItems = useSelector((state) => state.cart.cart);
  const total = useSelector((state) => state.cart.total);

  const handleRemove = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleIncreaseQuantity = (item) => {
    dispatch(addToCart(item)); // Increase quantity by adding the item again
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(removeFromCart(item.id)); // Remove one item from the cart
    }
  };

  const handleResetCart = () => {
    dispatch(resetCart()); // Reset the cart
  };

  const handleProceedToCheckout = () => {
    navigate('/checkout'); // Navigate to the checkout page
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="h6">Your cart is empty.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Total</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell align="center">${item.price.toFixed(2)}</TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <IconButton
                        onClick={() => handleDecreaseQuantity(item)}
                        disabled={item.quantity === 1}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography variant="body2" sx={{ marginX: 1 }}>
                        {item.quantity}
                      </Typography>
                      <IconButton onClick={() => handleIncreaseQuantity(item)}>
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell align="center">${(item.price * item.quantity).toFixed(2)}</TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => handleRemove(item.id)}
                      color="error"
                      size="small"
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
        <Typography variant="h5">Total: ${total.toFixed(2)}</Typography>
      </Box>

      <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" color="error" onClick={handleResetCart}>
          Clear Cart
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleProceedToCheckout}
          sx={{ marginLeft: 2 }}
        >
          Proceed to Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default Cart;
