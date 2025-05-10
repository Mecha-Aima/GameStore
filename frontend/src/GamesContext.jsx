import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const GamesContext = createContext();

export function GamesProvider({ children }) {
  console.log('GamesProvider rendering');
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/api/games');
        setGames(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch games');
        console.error('Error fetching games:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const getGamesByGenre = (genre) => {
    return games.filter(game => game.genre === genre);
  };

  const value = {
    games,
    loading,
    error,
    getGamesByGenre
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