import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import Home from './pages/Home';
import './App.css';

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
    <div>
      <Home />
    </div>
  );
}

export default App;
