import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { FaCheck, FaMapMarkerAlt } from 'react-icons/fa';
import './MapView.css';

const MapView = ({ foodItems, onClaim }) => {
  // Default center (New York City)
  const defaultCenter = [40.7128, -74.0060];

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
    <div className="map-container">
      <MapContainer 
        center={defaultCenter} 
        zoom={13} 
        style={{ height: '600px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {foodItems.map((item) => (
          <Marker 
            key={item.id} 
            position={item.coordinates}
          >
            <Popup>
              <div className="map-popup">
                <div className="popup-header">
                  <h4>{item.name}</h4>
                  <p className="organization">{item.organization}</p>
                </div>
                
                <div className="popup-badges">
                  <span 
                    className="freshness-badge"
                    style={{ backgroundColor: getFreshnessColor(item.freshness) }}
                  >
                    {item.freshness.charAt(0).toUpperCase() + item.freshness.slice(1)}
                  </span>
                  <span className="dietary-badge">
                    {getDietaryLabel(item.dietary)}
                  </span>
                </div>
                
                <p className="description">{item.description}</p>
                
                <div className="popup-details">
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                  <p><strong>Posted:</strong> {formatDate(item.datePosted)}</p>
                  <p><strong>Location:</strong> {item.location}</p>
                </div>
                
                {item.allergens && item.allergens.length > 0 && (
                  <div className="allergens">
                    <p><strong>Allergens:</strong> {item.allergens.join(', ')}</p>
                  </div>
                )}
                
                <button 
                  className="claim-button"
                  onClick={() => {
                    onClaim(item.id);
                  }}
                >
                  <FaCheck />
                  Claim Food
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {foodItems.length === 0 && (
        <div className="no-items-message">
          <FaMapMarkerAlt />
          <p>No food items available in this area</p>
        </div>
      )}
    </div>
  );
};

export default MapView; 