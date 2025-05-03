import { useEffect } from 'react';
import Home from './pages/Home';
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
    <div>
      <Home />
    </div>
  );
}

export default App;
