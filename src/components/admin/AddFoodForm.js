import React, { useState, useEffect } from 'react';
import { FaTimes, FaMapMarkerAlt, FaUpload } from 'react-icons/fa';
import './AddFoodForm.css';

const AddFoodForm = ({ onAdd, onEdit, onCancel, editingItem }) => {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    description: '',
    quantity: '',
    location: '',
    coordinates: [40.7128, -74.0060], // Default to NYC
    freshness: 'fresh',
    dietary: 'vegetarian',
    allergens: [],
    image: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const allergenOptions = [
    'gluten', 'dairy', 'nuts', 'eggs', 'soy', 'fish', 'shellfish', 'wheat'
  ];

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem);
    }
  }, [editingItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleAllergenChange = (allergen) => {
    setFormData(prev => ({
      ...prev,
      allergens: prev.allergens.includes(allergen)
        ? prev.allergens.filter(a => a !== allergen)
        : [...prev.allergens, allergen]
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Food name is required';
    }

    if (!formData.organization.trim()) {
      newErrors.organization = 'Organization name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.quantity.trim()) {
      newErrors.quantity = 'Quantity is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      if (editingItem) {
        await onEdit(formData);
      } else {
        await onAdd(formData);
      }
    } catch (error) {
      console.error('Error saving food item:', error);
      alert('Failed to save food item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload to Firebase Storage and get a URL
      // For demo purposes, we'll use a placeholder
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          image: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="add-food-form">
      <div className="form-header">
        <h2>{editingItem ? 'Edit Food Listing' : 'Add New Food Listing'}</h2>
        <button onClick={onCancel} className="close-btn">
          <FaTimes />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Basic Information */}
          <div className="form-section">
            <h3>Basic Information</h3>
            
            <div className="form-group">
              <label htmlFor="name">Food Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Fresh Bread & Pastries"
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="organization">Organization *</label>
              <input
                type="text"
                id="organization"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder="e.g., Local Bakery"
                className={errors.organization ? 'error' : ''}
              />
              {errors.organization && <span className="error-message">{errors.organization}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the food items, ingredients, etc."
                rows="3"
                className={errors.description ? 'error' : ''}
              />
              {errors.description && <span className="error-message">{errors.description}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Quantity *</label>
              <input
                type="text"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="e.g., 20 items, 15 kg, 50 cans"
                className={errors.quantity ? 'error' : ''}
              />
              {errors.quantity && <span className="error-message">{errors.quantity}</span>}
            </div>
          </div>

          {/* Location and Image */}
          <div className="form-section">
            <h3>Location & Image</h3>
            
            <div className="form-group">
              <label htmlFor="location">Location *</label>
              <div className="location-input">
                <FaMapMarkerAlt className="location-icon" />
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., Downtown Bakery, 123 Main St"
                  className={errors.location ? 'error' : ''}
                />
              </div>
              {errors.location && <span className="error-message">{errors.location}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="image">Image URL *</label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className={errors.image ? 'error' : ''}
              />
              {errors.image && <span className="error-message">{errors.image}</span>}
              
              <div className="image-upload">
                <label htmlFor="image-file" className="upload-btn">
                  <FaUpload />
                  Upload Image
                </label>
                <input
                  type="file"
                  id="image-file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </div>
            </div>

            {formData.image && (
              <div className="image-preview">
                <img src={formData.image} alt="Preview" />
              </div>
            )}
          </div>

          {/* Dietary Information */}
          <div className="form-section">
            <h3>Dietary Information</h3>
            
            <div className="form-group">
              <label htmlFor="freshness">Freshness</label>
              <select
                id="freshness"
                name="freshness"
                value={formData.freshness}
                onChange={handleChange}
              >
                <option value="fresh">Fresh</option>
                <option value="frozen">Frozen</option>
                <option value="preserved">Preserved</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="dietary">Dietary Type</label>
              <select
                id="dietary"
                name="dietary"
                value={formData.dietary}
                onChange={handleChange}
              >
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="mixed">Mixed</option>
              </select>
            </div>

            <div className="form-group">
              <label>Allergens</label>
              <div className="allergen-checkboxes">
                {allergenOptions.map(allergen => (
                  <label key={allergen} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.allergens.includes(allergen)}
                      onChange={() => handleAllergenChange(allergen)}
                    />
                    <span>{allergen.charAt(0).toUpperCase() + allergen.slice(1)}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Saving...' : (editingItem ? 'Update Listing' : 'Add Listing')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFoodForm; 