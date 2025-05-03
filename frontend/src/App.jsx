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

  return (
    <div className="bg-teal-20 text-navy-80 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold underline mb-4">Hello world!</h1>
      <p className=" text-xl">
        This is a custom themed component.
      </p>
    </div>
  );
}

export default App;
