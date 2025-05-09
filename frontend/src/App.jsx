import { useEffect } from 'react';
import Auth from './pages/Auth'
import  Home from './pages/Home'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";

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
        <Route path='/auth' element={<Auth/>}/>
      </Routes>

    </Router>
  );
}

export default App;
