import { useEffect } from 'react';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Contact from './pages/Contact';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';


function App() {
  useEffect(() => {
    fetch('/api/test')
      .then(res => res.json())
      .then(data => {
        console.log(data); // Should log: { message: "CORS is working!" }
      })
      .catch(err => console.error('Fetch error:', err));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
