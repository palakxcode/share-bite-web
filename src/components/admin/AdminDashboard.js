import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FaPlus, FaEdit, FaTrash, FaEye, FaSearch, FaDatabase } from 'react-icons/fa';
import AddFoodForm from './AddFoodForm';
import { 
  getAllFoodItemsForAdmin, 
  addFoodItem, 
  updateFoodItem, 
  deleteFoodItem 
} from '../../firebase/foodService';
import { addSampleData } from '../../firebase/sampleData';
import { testFirebaseConnection } from '../../firebase/testConnection';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [foodItems, setFoodItems] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addingSampleData, setAddingSampleData] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);

  useEffect(() => {
    loadFoodItems();
  }, []);

  const loadFoodItems = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Loading food items for admin...');
      const items = await getAllFoodItemsForAdmin();
      console.log('Loaded admin items:', items);
      setFoodItems(items);
    } catch (error) {
      console.error('Error loading food items for admin:', error);
      setError(error.message);
      
      // Show more specific error messages
      if (error.message.includes('permission-denied')) {
        setError('Access denied. Please check Firebase security rules in the Firebase Console.');
      } else if (error.message.includes('unavailable')) {
        setError('Firebase service unavailable. Please check your internet connection.');
      } else if (error.message.includes('not-found')) {
        setError('No food items found. Try adding some sample data using the button below.');
      } else {
        setError(`Failed to load food listings: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = foodItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddFood = async (newFood) => {
    try {
      await addFoodItem(newFood);
      await loadFoodItems(); // Reload data to get the new item
      setShowAddForm(false);
      alert('Food listing added successfully!');
    } catch (err) {
      console.error('Error adding food item:', err);
      alert('Failed to add food listing. Please try again.');
    }
  };

  const handleEditFood = async (updatedFood) => {
    try {
      await updateFoodItem(updatedFood.id, updatedFood);
      await loadFoodItems(); // Reload data to get updated item
      setEditingItem(null);
      alert('Food listing updated successfully!');
    } catch (err) {
      console.error('Error updating food item:', err);
      alert('Failed to update food listing. Please try again.');
    }
  };

  const handleDeleteFood = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this food listing?')) {
      try {
        await deleteFoodItem(itemId);
        await loadFoodItems(); // Reload data to reflect deletion
        alert('Food listing deleted successfully!');
      } catch (err) {
        console.error('Error deleting food item:', err);
        alert('Failed to delete food listing. Please try again.');
      }
    }
  };

  const handleAddSampleData = async () => {
    if (window.confirm('This will add sample food data to Firebase. Continue?')) {
      try {
        setAddingSampleData(true);
        await addSampleData();
        await loadFoodItems(); // Reload data to show new items
      } catch (err) {
        console.error('Error adding sample data:', err);
      } finally {
        setAddingSampleData(false);
      }
    }
  };

  const handleTestConnection = async () => {
    setTestingConnection(true);
    try {
      const result = await testFirebaseConnection();
      if (result.success) {
        alert(`✅ Firebase connection test passed!\n\n${result.message}\nFood items found: ${result.foodItemsCount}`);
      } else {
        alert(`❌ Firebase connection test failed!\n\n${result.message}`);
      }
    } catch (error) {
      alert(`❌ Test error: ${error.message}`);
    } finally {
      setTestingConnection(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = dateString instanceof Date ? dateString : new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return '#10b981';
      case 'claimed':
        return '#f59e0b';
      case 'expired':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading food listings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-container">
        <div className="error-container">
          <p>{error}</p>
          <button onClick={loadFoodItems} className="retry-btn">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      {/* Header */}
      <header className="admin-header">
        <div className="header-content">
          <div className="header-left">
            <h1>ShareBite Admin</h1>
            <p>Manage food listings and organizations</p>
          </div>
          <div className="header-right">
            <span className="user-info">Welcome, {user.name}</span>
            <button onClick={logout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="admin-content">
        {/* Search and Add Button */}
        <div className="admin-controls">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search food listings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="admin-buttons">
            <button 
              className="add-button"
              onClick={() => setShowAddForm(true)}
            >
              <FaPlus />
              Add New Listing
            </button>
            
            <button 
              className="sample-data-btn"
              onClick={handleAddSampleData}
              disabled={addingSampleData}
            >
              <FaDatabase />
              {addingSampleData ? 'Adding...' : 'Add Sample Data'}
            </button>
            
            <button 
              className="test-btn"
              onClick={handleTestConnection}
              disabled={testingConnection}
            >
              {testingConnection ? 'Testing...' : 'Test Firebase Connection'}
            </button>
          </div>
        </div>

        {/* Food Listings Table */}
        <div className="food-table-container">
          <table className="food-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Organization</th>
                <th>Quantity</th>
                <th>Location</th>
                <th>Posted</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan="8" className="no-data">
                    {searchTerm ? 'No food items found matching your search.' : 'No food items available. Try adding some sample data!'}
                  </td>
                </tr>
              ) : (
                filteredItems.map(item => (
                  <tr key={item.id}>
                    <td>
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="food-thumbnail"
                      />
                    </td>
                    <td>
                      <div className="food-info">
                        <strong>{item.name}</strong>
                        <span className="dietary-badge">{item.dietary}</span>
                      </div>
                    </td>
                    <td>{item.organization}</td>
                    <td>{item.quantity}</td>
                    <td>{item.location}</td>
                    <td>{formatDate(item.datePosted)}</td>
                    <td>
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(item.status) }}
                      >
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="action-btn view-btn"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        <button 
                          className="action-btn edit-btn"
                          title="Edit"
                          onClick={() => setEditingItem(item)}
                        >
                          <FaEdit />
                        </button>
                        <button 
                          className="action-btn delete-btn"
                          title="Delete"
                          onClick={() => handleDeleteFood(item.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Add/Edit Food Form Modal */}
      {(showAddForm || editingItem) && (
        <div className="modal-overlay">
          <div className="modal-content">
            <AddFoodForm
              onAdd={handleAddFood}
              onEdit={handleEditFood}
              onCancel={() => {
                setShowAddForm(false);
                setEditingItem(null);
              }}
              editingItem={editingItem}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard; 