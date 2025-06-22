import React from 'react';
import { FaClock, FaMapMarkerAlt, FaLeaf, FaExclamationTriangle, FaCheck } from 'react-icons/fa';
import './FoodCard.css';

const FoodCard = ({ item, onClaim }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just posted';
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
  };

  const getFreshnessColor = (freshness) => {
    switch (freshness) {
      case 'fresh':
        return '#10b981';
      case 'frozen':
        return '#3b82f6';
      case 'preserved':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  const getDietaryIcon = (dietary) => {
    switch (dietary) {
      case 'vegan':
        return <FaLeaf style={{ color: '#10b981' }} />;
      case 'vegetarian':
        return <FaLeaf style={{ color: '#059669' }} />;
      default:
        return null;
    }
  };

  const getDietaryLabel = (dietary) => {
    switch (dietary) {
      case 'vegan':
        return 'Vegan';
      case 'vegetarian':
        return 'Vegetarian';
      case 'mixed':
        return 'Mixed';
      default:
        return dietary;
    }
  };

  return (
    <div className="food-card">
      <div className="food-image">
        <img src={item.image} alt={item.name} />
        <div className="food-badges">
          <span 
            className="freshness-badge"
            style={{ backgroundColor: getFreshnessColor(item.freshness) }}
          >
            {item.freshness.charAt(0).toUpperCase() + item.freshness.slice(1)}
          </span>
          {item.dietary !== 'mixed' && (
            <span className="dietary-badge">
              {getDietaryIcon(item.dietary)}
              {getDietaryLabel(item.dietary)}
            </span>
          )}
        </div>
      </div>
      
      <div className="food-content">
        <div className="food-header">
          <h3>{item.name}</h3>
          <p className="organization">{item.organization}</p>
        </div>
        
        <p className="description">{item.description}</p>
        
        <div className="food-details">
          <div className="detail-item">
            <FaMapMarkerAlt className="detail-icon" />
            <span>{item.location}</span>
          </div>
          
          <div className="detail-item">
            <FaClock className="detail-icon" />
            <span>{formatDate(item.datePosted)}</span>
          </div>
          
          <div className="quantity">
            <strong>Quantity:</strong> {item.quantity}
          </div>
        </div>
        
        {item.allergens.length > 0 && (
          <div className="allergens">
            <FaExclamationTriangle className="allergen-icon" />
            <span>Contains: {item.allergens.join(', ')}</span>
          </div>
        )}
        
        <button 
          className="claim-button"
          onClick={() => onClaim(item.id)}
        >
          <FaCheck />
          Claim Food
        </button>
      </div>
    </div>
  );
};

export default FoodCard; 