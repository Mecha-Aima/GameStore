import { useEffect } from 'react';

function App() {
  useEffect(() => {
    fetch('/api/test')
      .then(res => res.json())
      .then(data => {
        console.log(data); // Should log: { message: "CORS is working!" }
      })
      .catch(err => console.error('Fetch error:', err));
  }, []);

  return <div>CORS is working!</div>;
}

export default App;
