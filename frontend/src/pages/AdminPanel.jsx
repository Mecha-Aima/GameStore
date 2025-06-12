import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './AdminPanel.css';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('games');
  const [games, setGames] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch data based on active tab
  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'games') {
        await fetchGamesWithStock();
      } else if (activeTab === 'orders') {
        await fetchOrders();
      } else if (activeTab === 'customers') {
        await fetchCustomers();
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const fetchGamesWithStock = async () => {
    try {
      // First fetch games
      const gamesResponse = await fetch('/api/games');
      const gamesData = await gamesResponse.json();
      
      // Then fetch stock for each game
      const stockPromises = gamesData.map(async (game) => {
        try {
          const stockResponse = await fetch(`/api/games/stock?game_id=${game.game_id}`);
          const stockData = await stockResponse.json();
          return { ...game, stock: stockData.stock || 0 };
        } catch (error) {
          console.error(`Error fetching stock for game ${game.game_id}:`, error);
          return { ...game, stock: 0 };
        }
      });
      
      const gamesWithStock = await Promise.all(stockPromises);
      setGames(gamesWithStock);
    } catch (error) {
      console.error('Error fetching games:', error);
      setGames([]);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      const ordersData = await response.json();
      setOrders(ordersData);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await fetch('/api/customers');
      const customersData = await response.json();
      setCustomers(customersData);
    } catch (error) {
      console.error('Error fetching customers:', error);
      setCustomers([]);
    }
  };

  const renderGamesTab = () => (
    <div className="admin-content">
      <div className="admin-header">
        <h2 className="text-2xl font-bold text-white">Games Management</h2>
        <button 
          className="add-game-btn bg-teal-50 text-white font-medium py-2 px-4 rounded-lg hover:bg-teal-60 transition-colors duration-200"
          onClick={() => navigate('/add-game')}
        >
          <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Game
        </button>
      </div>
      
      {games.length === 0 ? (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <p className="text-gray-400">No games found</p>
        </div>
      ) : (
        <div className="games-grid">
          {games.map((game) => (
            <div key={game.game_id} className="game-card bg-dark-bg border border-dark-bg-3 rounded-lg">
              <div className="game-image">
                <img src={game.image_url} alt={game.title} className="w-full h-96 object-cover rounded-m object-top" />
              </div>
              <div className="game-details mt-3">
                <h3 className="text-white font-semibold text-lg">{game.title}</h3>
                <p className="text-gray-400 text-sm mt-1 line-clamp-2">{game.description}</p>
                <div className="game-info mt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <svg className="w-4 h-4 text-teal-50" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                    <span className="text-gray-300 text-sm">{game.platforms}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <svg className="w-4 h-4 text-teal-50" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-300 text-sm">{game.genre}</span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-teal-50 font-semibold">Rs. {game.price}</span>
                    <span className="text-sm text-gray-400">Stock: {game.stock || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderOrdersTab = () => {
    const completedOrders = orders.filter(order => order.order_status === 'Completed');
    const pendingOrders = orders.filter(order => order.order_status !== 'Completed');

    return (
      <div className="admin-content">
        <h2 className="text-2xl font-bold text-white mb-6">Orders Management</h2>
        
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-gray-400">No orders found</p>
          </div>
        ) : (
          <div className="orders-sections">
            <div className="order-section mb-8">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Completed Orders ({completedOrders.length})
              </h3>
              {completedOrders.length === 0 ? (
                <p className="text-gray-400">No completed orders</p>
              ) : (
                <div className="orders-grid">
                  {completedOrders.map((order) => (
                    <div key={order.order_id} className="order-card bg-dark-bg border border-green-600 rounded-lg p-4">
                      <div className="order-header flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-white font-semibold">Order #{order.order_id}</h4>
                          <p className="text-gray-400 text-sm">{new Date(order.order_date).toLocaleDateString()}</p>
                        </div>
                        <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">{order.order_status}</span>
                      </div>
                      <div className="order-details">
                        <p className="text-gray-300"><span className="text-gray-400">Customer:</span> {order.customer_name}</p>
                        <p className="text-gray-300"><span className="text-gray-400">Phone:</span> {order.customer_phone}</p>
                        <p className="text-gray-300"><span className="text-gray-400">Payment:</span> {order.payment_method} ({order.payment_status})</p>
                        <p className="text-teal-50 font-semibold mt-2">Rs. {order.total_amount}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="order-section">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Pending Orders ({pendingOrders.length})
              </h3>
              {pendingOrders.length === 0 ? (
                <p className="text-gray-400">No pending orders</p>
              ) : (
                <div className="orders-grid">
                  {pendingOrders.map((order) => (
                    <div key={order.order_id} className="order-card bg-dark-bg border border-yellow-600 rounded-lg p-4">
                      <div className="order-header flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-white font-semibold">Order #{order.order_id}</h4>
                          <p className="text-gray-400 text-sm">{new Date(order.order_date).toLocaleDateString()}</p>
                        </div>
                        <span className="bg-yellow-600 text-white text-xs px-2 py-1 rounded">{order.order_status}</span>
                      </div>
                      <div className="order-details">
                        <p className="text-gray-300"><span className="text-gray-400">Customer:</span> {order.customer_name}</p>
                        <p className="text-gray-300"><span className="text-gray-400">Phone:</span> {order.customer_phone}</p>
                        <p className="text-gray-300"><span className="text-gray-400">Payment:</span> {order.payment_method} ({order.payment_status})</p>
                        <p className="text-teal-50 font-semibold mt-2">Rs. {order.total_amount}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderCustomersTab = () => (
    <div className="admin-content">
      <h2 className="text-2xl font-bold text-white mb-6">Customers Management</h2>
      
      {customers.length === 0 ? (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
          <p className="text-gray-400">No customers found</p>
        </div>
      ) : (
        <div className="customers-list">
          {customers.map((customer) => (
            <div key={customer.user_id} className="customer-card bg-dark-bg border border-dark-bg-3 rounded-lg p-4 mb-4">
              <div className="customer-info flex items-center justify-between">
                <div className="customer-details flex items-center">
                  <div className="customer-avatar bg-teal-50 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex flex-col justify-start align-start">
                    <h3 className="text-white font-semibold">{customer.full_name}</h3>
                    <div className="flex items-center justify-end gap-2 align-center">
                        <p className="text-gray-400 text-sm">@{customer.username}</p>
                        <p className="text-gray-300 flex text-sm items-center justify-end mb-1">
                        <svg className="w-4 h-4 mr-2 text-teal-50" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        {customer.email}
                    </p>
                    </div>
                  </div>
                </div>
                <div className="customer-contact text-right">
                  
                  <p className="text-gray-300 flex items-center justify-end mb-1">
                    <svg className="w-4 h-4 mr-2 text-teal-50" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    {customer.phone}
                  </p>
                  <p className="text-gray-300 flex items-center justify-end">
                    <svg className="w-4 h-4 mr-2 text-teal-50" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {customer.address}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-dark-bg min-h-screen">
      <Header />
      
      <div className="admin-panel-container max-w-7xl mx-auto px-4 py-8 mt-20">
        <div className="admin-header mb-8">
          <h1 className="text-4xl font-bold font-myLodon text-white">Admin Panel</h1>
          <p className="text-gray-400 mt-2">Manage your game store efficiently</p>
        </div>

        {/* Tab Navigation */}
        <div className="tabs-container mb-8">
          <div className="tabs-nav flex space-x-1 bg-dark-bg-2 p-1 rounded-lg">
            <button
              className={`tab-button flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${
                activeTab === 'games' 
                  ? 'bg-teal-50 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-dark-bg-3'
              }`}
              onClick={() => setActiveTab('games')}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
              </svg>
              Games
            </button>
            <button
              className={`tab-button flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${
                activeTab === 'orders' 
                  ? 'bg-teal-50 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-dark-bg-3'
              }`}
              onClick={() => setActiveTab('orders')}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              Orders
            </button>
            <button
              className={`tab-button flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${
                activeTab === 'customers' 
                  ? 'bg-teal-50 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-dark-bg-3'
              }`}
              onClick={() => setActiveTab('customers')}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
              Customers
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {loading ? (
            <div className="loading-container flex items-center justify-center py-12">
              <div className="loading-spinner w-8 h-8 border-4 border-gray-600 border-t-teal-50 rounded-full animate-spin"></div>
              <span className="text-gray-400 ml-3">Loading...</span>
            </div>
          ) : (
            <>
              {activeTab === 'games' && renderGamesTab()}
              {activeTab === 'orders' && renderOrdersTab()}
              {activeTab === 'customers' && renderCustomersTab()}
            </>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminPanel;
