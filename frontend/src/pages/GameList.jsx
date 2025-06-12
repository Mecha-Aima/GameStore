import axios from 'axios';
import { useEffect, useState } from 'react';

function GameList() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/games')
      .then(res => setGames(res.data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>Game List</h2>
      <ul>
        {games.map(game => (
          <li key={game.game_id}>
            {game.title} ({game.genre}) - Rs.{game.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GameList;
