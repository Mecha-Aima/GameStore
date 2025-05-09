// Home Page

//Header / NavBar: Logo, search bar, category dropdown, cart icon with item count
//Category Filter: Horizontal list or sidebar with “All”, Action, Adventure, Strategy, etc.
//Featured Games Grid: Responsive card grid showing each game’s cover image, title, price, “View Details” button
//Footer: Links (About, Contact, Terms), social icons 
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GameCard from '../components/GameCard';
import heroBg from '../assets/images/hero-bg.png';
import search from '../assets/icons/search.svg';
import Filter from '../components/Filter';
import './Home.css';
const Home = () => {
  return (
    <div>
      <Header />
      <main className='bg-dark-bg'>
        <section className='hero-section max-w-screen-xl mx-auto px-4 md:px-8 py-12 my-24'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
                <div className='col-span-1 flex flex-col gap-4 px-4'>
                    <h3 className='text-lg font-medium text-left text-teal-30'>WELCOME TO PLAYTRIX</h3>
                    <h1 className='text-3xl md:text-3xl font-bold text-white mb-6 font-myLodon text-left'>Find Your Next Gaming Adventure</h1>
                    <div className='flex flex-col sm:flex-row gap-2 items-left relative w-[80%]'>
                        <div className='relative w-[80%]'>
                            <input 
                                type='text' 
                                placeholder='Search for games...' 
                                className='w-full py-3 px-4 pr-10 rounded-lg bg-dark-bg-2 text-white border border-gray-700 focus:outline-none focus:border-primary'
                            />
                            <img 
                                src={search} 
                                alt='Search' 
                                className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5'
                            />
                        </div>
                        <button className='button-primary text-black font-medium py-3 px-6 rounded-lg hover:bg-teal-80 transition-all whitespace-nowrap'>
                            Search
                        </button>
                    </div>
                </div>
                <div className='col-span-1'>
                    <img 
                        src={heroBg} 
                        alt='Gaming Collection' 
                        className='w-full h-auto rounded-lg shadow-lg'
                    />
                </div>
            </div>
        </section>
        <section className='my-24'>
            <h2 className='text-4xl font-bold text-white mb-6 font-myLodon text-left mx-auto max-w-7xl'>Featured Games</h2>
            <p className='text-gray-400 mb-6 text-left mx-auto max-w-7xl'>Discover our latest and most popular games</p>
            <Filter />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto max-w-7xl'>
                <GameCard title="Punjab Warriors" price="1299.00" genre="Action" />
                <GameCard title="Truck Art Racer" price="799.00" genre="Racing" />
                <GameCard title="Cricket Champions" price="999.00" genre="Sports" />
                <GameCard title="Karachi Drift" price="1149.00" genre="Racing" />
                <GameCard title="Bazaar Tycoon" price="849.00" genre="Simulation" />
                <GameCard title="Ludo Pro" price="499.00" genre="Board" />
                <GameCard title="Pak Fighter X" price="1399.00" genre="Fighting" />
                <GameCard title="Ravi River Escape" price="749.00" genre="Adventure" />
                <GameCard title="Shehzadi Quest" price="1599.00" genre="RPG" />
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
