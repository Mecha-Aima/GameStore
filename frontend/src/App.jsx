import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GamesProvider } from './GamesContext';
import Auth from './pages/Auth';
import Home from './pages/Home';
import OrderSummary from './pages/OrderSummary';
import ProductDetails from './pages/ProductDetails';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import GameList from './pages/GameList';
import { UserProvider } from './UserContext';
import './App.css';


function App() {

  return (
    <Router>
      <UserProvider>
        <GamesProvider>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/home" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/ordersummary" element={<OrderSummary />} />
            <Route path="/product" element={<ProductDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/games" element={<GameList />} />
          </Routes>
        </GamesProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
