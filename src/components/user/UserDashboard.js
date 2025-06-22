import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FaMap, FaList, FaSearch } from 'react-icons/fa';
import FoodCard from './FoodCard';
import MapView from './MapView';
import { getAllFoodItems, claimFoodItem } from '../../firebase/foodService';
import './UserDashboard.css';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'
  const [foodItems, setFoodItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    dietary: 'all',
    freshness: 'all',
    distance: 'all'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadFoodItems();
  }, []);

  const loadFoodItems = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Loading food items...');
      const items = await getAllFoodItems();
      console.log('Loaded items:', items);
      
      // Filter out claimed items for user view
      const availableItems = items.filter(item => item.status === 'available');
      setFoodItems(availableItems);
      setFilteredItems(availableItems);
    } catch (error) {
      console.error('Error loading food items:', error);
      setError(error.message);
      
      // Show more specific error messages
      if (error.message.includes('permission-denied')) {
        setError('Access denied. Please check Firebase security rules in the Firebase Console.');
      } else if (error.message.includes('unavailable')) {
        setError('Firebase service unavailable. Please check your internet connection.');
      } else if (error.message.includes('not-found')) {
        setError('No food items found. Try adding some sample data from the admin dashboard.');
      } else {
        setError(`Failed to load food items: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Filter items based on search term and filters
    let filtered = foodItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDietary = selectedFilters.dietary === 'all' || item.dietary === selectedFilters.dietary;
      const matchesFreshness = selectedFilters.freshness === 'all' || item.freshness === selectedFilters.freshness;
      
      return matchesSearch && matchesDietary && matchesFreshness;
    });
    
    setFilteredItems(filtered);
  }, [searchTerm, selectedFilters, foodItems]);

  const handleClaim = async (itemId) => {
    try {
      await claimFoodItem(itemId);
      // Remove the claimed item from the local state
      setFoodItems(prev => prev.filter(item => item.id !== itemId));
      alert('Food item claimed successfully! Please pick it up within 2 hours.');
    } catch (err) {
      console.error('Error claiming food item:', err);
      alert('Failed to claim food item. Please try again.');
    }
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading available food...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-container">
          <p>{error}</p>
          <button onClick={loadFoodItems} className="retry-btn">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1>ShareBite</h1>
            <p>Find and claim surplus food near you</p>
          </div>
          <div className="header-right">
            <span className="user-info">Welcome, {user.name}</span>
            <button onClick={logout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="search-filters">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for food items, organizations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters">
          <div className="filter-group">
            <label>Dietary:</label>
            <select 
              value={selectedFilters.dietary} 
              onChange={(e) => handleFilterChange('dietary', e.target.value)}
            >
              <option value="all">All</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="mixed">Mixed</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Freshness:</label>
            <select 
              value={selectedFilters.freshness} 
              onChange={(e) => handleFilterChange('freshness', e.target.value)}
            >
              <option value="all">All</option>
              <option value="fresh">Fresh</option>
              <option value="frozen">Frozen</option>
              <option value="preserved">Preserved</option>
            </select>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="view-toggle">
        <button 
          className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
          onClick={() => setViewMode('list')}
        >
          <FaList /> List View
        </button>
        <button 
          className={`toggle-btn ${viewMode === 'map' ? 'active' : ''}`}
          onClick={() => setViewMode('map')}
        >
          <FaMap /> Map View
        </button>
      </div>

      {/* Content */}
      <main className="dashboard-content">
        {viewMode === 'list' ? (
          <div className="food-grid">
            {filteredItems.length === 0 ? (
              <div className="no-results">
                <p>No food items found matching your criteria.</p>
                <p>Try adjusting your search or filters.</p>
              </div>
            ) : (
              filteredItems.map(item => (
                <FoodCard 
                  key={item.id} 
                  item={item} 
                  onClaim={handleClaim}
                />
              ))
            )}
          </div>
        ) : (
          <MapView foodItems={filteredItems} onClaim={handleClaim} />
        )}
      </main>
    </div>
  );
};

export default UserDashboard; 