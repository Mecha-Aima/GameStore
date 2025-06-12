import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AddGame = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    stock: '',
    releaseDate: '',
    genre: '',
    platforms: [],
    image: null
  });

  // Available options
  const genres = ['Action', 'Sports', 'Racing', 'Fighting', 'Board', 'Adventure', 'RPG', 'Shooter', 'Arcade'];
  const platforms = ['PC', 'Mobile', 'PlayStation', 'Xbox'];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle genre selection
  const handleGenreChange = (genre) => {
    setFormData(prev => ({
      ...prev,
      genre: genre
    }));
  };

  // Handle platform selection
  const handlePlatformChange = (platform) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      image: file
    }));
  };

  // Check if form is valid (all required fields filled)
  const isFormValid = () => {
    return formData.title && 
           formData.price && 
           formData.stock && 
           formData.releaseDate && 
           formData.genre && 
           formData.platforms.length > 0 && 
           formData.image;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data: ", formData);

    try {
      // Extract and process image
      let imageName = '';
      if (formData.image) {
        // Get original filename and remove spaces
        const originalName = formData.image.name;
        const fileExtension = originalName.substring(originalName.lastIndexOf('.'));
        const nameWithoutExtension = originalName.substring(0, originalName.lastIndexOf('.'));
        imageName = nameWithoutExtension.replace(/\s+/g, '') + fileExtension;
        
        // Create FormData to save image
        const imageFormData = new FormData();
        imageFormData.append('image', formData.image, imageName);
        
        // Save image to public/game-covers folder
        const response = await fetch('/api/upload-image', {
          method: 'POST',
          body: imageFormData
        });
        
        if (!response.ok) {
          // If upload API doesn't exist, manually save to public folder
          // For now, we'll proceed with just the filename
          console.warn('Image upload API not available, using filename only');
        }
      }

      // Extract form data mapped to API expected keys
      const title = formData.title;
      const description = formData.description || '';
      const price = parseFloat(formData.price);
      const stock = parseInt(formData.stock);
      const release_date = formData.releaseDate;
      const genre = formData.genre;
      const platforms = formData.platforms.join(', '); // Convert array to comma-separated string
      const image_url = imageName; // Only pass the filename

      // Prepare data for API
      const gameData = {
        title,
        description,
        price,
        stock,
        release_date,
        genre,
        platforms,
        image_url
      };

      // Send data to backend API
      const apiResponse = await fetch('/api/games/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(gameData)
      });

      if (apiResponse.ok) {
        const result = await apiResponse.json();
        alert('Game created successfully!');
        console.log('Game created:', result);
        
        // Reset form
        setFormData({
          title: '',
          description: '',
          price: '',
          stock: '',
          releaseDate: '',
          genre: '',
          platforms: [],
          image: null
        });
        
        // Navigate back to admin panel
        navigate('/admin');
      } else {
        const error = await apiResponse.json();
        alert(`Error creating game: ${error.error || 'Unknown error'}`);
        console.error('API Error:', error);
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error creating game. Please try again.');
    }
  };

  return (
    <div className="bg-dark-bg min-h-screen">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8 mt-20">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <button 
              onClick={() => navigate('/admin')}
              className="mr-4 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-4xl font-bold font-myLodon text-white">Add Product</h1>
          </div>
          
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Product Information */}
            <div className="bg-dark-bg-2 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Product information</h2>
              
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-left text-sm font-medium text-white mb-2">
                    Name 
                    <span className="text-gray-400 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter game title"
                    className="w-full px-3 py-2 bg-dark-bg-3 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-50"
                    required
                  />
                </div>

                {/* Price and Stock */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-left text-sm font-medium text-white mb-2">
                      Price 
                      <span className="text-gray-400 ml-1">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-400">Rs.</span>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        min="50"
                        className="w-full pl-12 pr-3 py-2 bg-dark-bg-3 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-50"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-left text-sm font-medium text-white mb-2">
                      Initial Stock 
                      <span className="text-gray-400 ml-1">*</span>
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      placeholder="0"
                      min="0"
                      className="w-full px-3 py-2 bg-dark-bg-3 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-50"
                      required
                    />
                  </div>
                </div>

                {/* Release Date */}
                <div>
                  <label className="block text-left text-sm font-medium text-white mb-2">
                    Release Date 
                    <span className="text-gray-400 ml-1">*</span>
                  </label>
                  <input
                    type="date"
                    name="releaseDate"
                    value={formData.releaseDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-dark-bg-3 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-50"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-left text-sm font-medium text-white mb-2">
                    Description 
                    <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Type your description..."
                    rows={4}
                    className="w-full px-3 py-2 bg-dark-bg-3 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-50 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Media Section */}
            <div className="bg-dark-bg-2 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Media</h2>
              
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                {formData.image ? (
                  <div className="space-y-4">
                    <img 
                      src={URL.createObjectURL(formData.image)} 
                      alt="Preview" 
                      className="mx-auto max-h-32 rounded-lg"
                    />
                    <p className="text-sm text-gray-400">{formData.image.name}</p>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, image: null }))}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex flex-col items-center space-y-2">
                      <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <div className="text-center">
                        <p className="text-lg font-medium text-white">Drag and drop your file here</p>
                        <p className="text-gray-400">or</p>
                      </div>
                    </div>
                    <label className="cursor-pointer">
                      <span className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-colors duration-200">
                        Browse files
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        required
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Genre Selection */}
            <div className="bg-dark-bg-2 rounded-lg p-6">
              <h3 className="text-left text-lg font-semibold text-white mb-4">
                Genre 
                <span className="text-gray-400 ml-1">*</span>
              </h3>
              <div className="space-y-2">
                {genres.map((genre) => (
                  <label key={genre} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="genre"
                      value={genre}
                      checked={formData.genre === genre}
                      onChange={() => handleGenreChange(genre)}
                      className="text-teal-50 bg-dark-bg-3 border-gray-600 focus:ring-teal-50 focus:ring-2"
                    />
                    <span className="ml-2 text-white">{genre}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Platform Selection */}
            <div className="bg-dark-bg-2 rounded-lg p-6">
              <h3 className="text-left text-lg font-semibold text-white mb-4">
                Platforms 
                <span className="text-gray-400 ml-1">*</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {platforms.map((platform) => (
                  <button
                    key={platform}
                    type="button"
                    onClick={() => handlePlatformChange(platform)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                      formData.platforms.includes(platform)
                        ? 'bg-teal-50 text-white'
                        : 'bg-dark-bg-3 text-gray-300 hover:bg-gray-500'
                    }`}
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </form>

        {/* Create Game Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={!isFormValid()}
            className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
              isFormValid()
                ? 'bg-teal-50 text-white hover:bg-teal-60'
                : 'bg-teal-70 text-white cursor-not-allowed opacity-50'
            }`}
          >
            Create Game
          </button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AddGame;
