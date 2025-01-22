import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import SongList from './components/SongList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderSummary from './components/OrderSummary';


const App = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<SongList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/OrderSummary" element={<OrderSummary />} />

      </Routes>
    </Router>
  );
};

export default App;
