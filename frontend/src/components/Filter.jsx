import { useState } from 'react';
import chevronDown from '../assets/icons/chevron-down.svg';

const Filter = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const genres = [
    "Action", "Racing", "Sports", "Simulation", "Board", 
    "Fighting", "Adventure", "RPG", "Shooter", "Arcade"
  ];

  const toggleGenre = (genre) => {
    const newSelectedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter(g => g !== genre)
      : [...selectedGenres, genre];
    
    setSelectedGenres(newSelectedGenres);
    onFilterChange(newSelectedGenres);
  };

  return (
    <div className="max-w-7xl mx-auto mb-8">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-white px-4 py-2 rounded-lg transition-colors"
        style={{ backgroundColor: 'var(--color-dark-bg-2)' }}
      >
        <span>Filter by Genre</span>
        <img 
          src={chevronDown} 
          alt="chevron" 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="mt-4 bg-zinc-800 p-4 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {genres.map((genre) => (
              <label 
                key={genre}
                className="flex items-center gap-2 text-white cursor-pointer hover:text-teal-50"
              >
                <input
                  type="checkbox"
                  checked={selectedGenres.includes(genre)}
                  onChange={() => toggleGenre(genre)}
                  className="w-4 h-4 rounded border-gray-600 bg-dark-bg-3 text-teal-50 focus:ring-teal-50"
                />
                {genre}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
