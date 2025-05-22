import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const GamesContext = createContext();

export function GamesProvider({ children }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGamesAndStock = async () => {
      try {
        setLoading(true);
        // Fetch all games
        const gamesResponse = await axios.get('http://localhost:3000/api/games');
        const gamesData = gamesResponse.data;

        // Fetch stock for each game
        const gamesWithStock = await Promise.all(
          gamesData.map(async (game) => {
            const stockResponse = await axios.get('http://localhost:3000/api/games/stock', {
              params: { game_id: game.game_id }
            });
            return { ...game, stock: stockResponse.data.stock };
          })
        );

        setGames(gamesWithStock);
        console.log("Games with stock:", gamesWithStock);
        setError(null);
      } catch (err) {
        setError('Failed to fetch games or stock');
        console.error('Error fetching games or stock:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGamesAndStock();
  }, []);

  const getGamesByGenre = (genre) => {
    return games.filter(game => game.genre === genre);
  };

  const getGameById = (gameId) => { 
    const game = games.find(game => game.game_id === gameId);
    return game;
  };

  const value = {
    games,
    loading,
    error,
    getGamesByGenre,
    getGameById,
  };

  return (
    <GamesContext.Provider value={value}>
      {children}
    </GamesContext.Provider>
  );
}

export function useGames() {
  const context = useContext(GamesContext);
  if (context === undefined) {
    throw new Error('useGames must be used within a GamesProvider');
  }
  return context;
}