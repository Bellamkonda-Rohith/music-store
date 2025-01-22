import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge'; // Import Badge
import { useSelector } from 'react-redux'; // Import useSelector
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export const Navbar = () => {
  // Access the cart state from the Redux store
  const totalItems = useSelector((state) => state.cart.totalItems);

  // Initialize useNavigate
  const navigate = useNavigate();

  // Handle cart icon click to navigate to the Cart page
  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Set the position to "fixed" to keep the navbar at the top */}
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SingBae Store
          </Typography>
          <IconButton 
            size="large" 
            edge="end" 
            color="inherit" 
            aria-label="cart" 
            onClick={handleCartClick} // Add onClick handler to navigate
          >
            <Badge badgeContent={totalItems} color="error"> {/* Display the count */}
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* Add margin-top to prevent the content from being covered by the fixed navbar */}
      <Box sx={{ marginTop: 8 }} />
    </Box>
  );
};
