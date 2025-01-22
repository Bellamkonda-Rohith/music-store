
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/cartSlice'; // Adjust the path as necessary
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { songs } from '../data/songs';
const SongList = () => {
  const dispatch = useDispatch(); 

  const handleAddToCart = (song) => {
    dispatch(addToCart(song)); 
  };

  return (
    <Grid container spacing={1} justifyContent="flex-start">
      {songs.map((song) => (
        <Grid item xs={12} sm={6} md={4} key={song.id}>
          <Card sx={{ maxWidth: 345, margin: '20px', position: 'relative' }}>
            <CardMedia
              component="img"
              height="180"
              image={song.coverUrl}
              alt={song.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div" noWrap>
                {song.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {song.artist}
              </Typography>
            </CardContent>
            <IconButton 
              onClick={() => handleAddToCart(song)} 
              aria-label="add to cart" 
              sx={{ position: 'absolute', bottom: 16, right: 16 }}
            >
              <AddShoppingCartIcon />
            </IconButton>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SongList;