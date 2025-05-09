import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import Home from './pages/Home';
import OrderSummary from './pages/OrderSummary';

function App() {
  useEffect(() => {
    fetch('/api/test')
      .then(res => res.json())
      .then(data => {
        console.log(data); 
      })
      .catch(err => console.error('Fetch error:', err));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/ordersummary" element={<OrderSummary />} />
      </Routes>
    </Router>
  );
}

export default App;
