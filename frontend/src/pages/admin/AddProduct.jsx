import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ValidationRegex, validateField } from '../../utils/validation';
import API_BASE_URL from '../../config/api';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    originalPrice: '',
    image: '',
    inStock: true,
    featured: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  const navigate = useNavigate();

  const categories = [
    { id: 'fruits', name: 'Fresh Fruits' },
    { id: 'vegetables', name: 'Vegetables' },
    { id: 'dairy', name: 'Dairy & Eggs' },
    { id: 'bakery', name: 'Fresh Bakery' },
    { id: 'meat', name: 'Meat & Seafood' },
    { id: 'pantry', name: 'Pantry Essentials' }
  ];

  const validateForm = () => {
    const newErrors = {};

    // Name validation using regex
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    } else {
      const nameValidation = validateField('productName', formData.name.trim());
      if (!nameValidation.isValid) {
        newErrors.name = nameValidation.message;
      }
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Product description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    // Category validation
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    // Price validation using regex
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else {
      const priceValidation = validateField('price', formData.price);
      if (!priceValidation.isValid) {
        newErrors.price = priceValidation.message;
      }
    }

    // Original price validation using regex
    if (formData.originalPrice) {
      const originalPriceValidation = validateField('price', formData.originalPrice);
      if (!originalPriceValidation.isValid) {
        newErrors.originalPrice = originalPriceValidation.message;
      } else if (parseFloat(formData.originalPrice) < parseFloat(formData.price)) {
        newErrors.originalPrice = 'Original price should be higher than current price';
      }
    }

    // Image URL validation using regex
    if (!formData.image.trim()) {
      newErrors.image = 'Product image URL is required';
    } else {
      const urlValidation = validateField('url', formData.image);
      if (!urlValidation.isValid) {
        newErrors.image = urlValidation.message;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Update image preview
    if (name === 'image') {
      const urlValidation = validateField('url', value);
      if (urlValidation.isValid) {
        setImagePreview(value);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : parseFloat(formData.price),
        rating: 4.5,
        reviews: 0,
        discount: formData.originalPrice ? Math.round(((parseFloat(formData.originalPrice) - parseFloat(formData.price)) / parseFloat(formData.originalPrice)) * 100) : 0
      };

      const response = await fetch(`${API_BASE_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      alert('Product added successfully!');
      navigate('/admin/manage-products');
    } catch (error) {
      setErrors({ submit: 'Failed to add product. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      description: '',
      category: '',
      price: '',
      originalPrice: '',
      image: '',
      inStock: true,
      featured: false
    });
    setErrors({});
    setImagePreview('');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Header */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
        color: 'white',
        padding: '3rem 5% 2rem'
      }}>
        <div className="container">
          <h1 style={{ marginBottom: '0.5rem' }}>Add New Product</h1>
          <p style={{ opacity: 0.9, margin: 0 }}>
            Add a new product to your inventory
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '2rem 1rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="card">
            <div className="card-body" style={{ padding: '2rem' }}>
              <form onSubmit={handleSubmit}>
                {errors.submit && (
                  <div style={{
                    background: '#fef2f2',
                    color: 'var(--error)',
                    padding: '1rem',
                    borderRadius: 'var(--border-radius)',
                    marginBottom: '2rem'
                  }}>
                    {errors.submit}
                  </div>
                )}

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '2rem'
                }}>
                  {/* Left Column */}
                  <div>
                    <div className="form-group">
                      <label className="form-label">Product Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`form-input ${errors.name ? 'error' : ''}`}
                        placeholder="Enter product name"
                      />
                      {errors.name && <div className="form-error">{errors.name}</div>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Description *</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className={`form-input ${errors.description ? 'error' : ''}`}
                        placeholder="Enter product description"
                        rows="4"
                        style={{ resize: 'vertical' }}
                      />
                      {errors.description && <div className="form-error">{errors.description}</div>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Category *</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className={`form-input ${errors.category ? 'error' : ''}`}
                      >
                        <option value="">Select a category</option>
                        {categories.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      {errors.category && <div className="form-error">{errors.category}</div>}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="form-group">
                        <label className="form-label">Price (₹) *</label>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          className={`form-input ${errors.price ? 'error' : ''}`}
                          placeholder="0"
                          step="1"
                          min="0"
                        />
                        {errors.price && <div className="form-error">{errors.price}</div>}
                      </div>

                      <div className="form-group">
                        <label className="form-label">Original Price (₹)</label>
                        <input
                          type="number"
                          name="originalPrice"
                          value={formData.originalPrice}
                          onChange={handleChange}
                          className={`form-input ${errors.originalPrice ? 'error' : ''}`}
                          placeholder="0"
                          step="1"
                          min="0"
                        />
                        {errors.originalPrice && <div className="form-error">{errors.originalPrice}</div>}
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Image URL *</label>
                      <input
                        type="url"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className={`form-input ${errors.image ? 'error' : ''}`}
                        placeholder="https://example.com/image.jpg"
                      />
                      {errors.image && <div className="form-error">{errors.image}</div>}
                    </div>

                    <div style={{ display: 'flex', gap: '2rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                          type="checkbox"
                          name="inStock"
                          checked={formData.inStock}
                          onChange={handleChange}
                        />
                        In Stock
                      </label>

                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                          type="checkbox"
                          name="featured"
                          checked={formData.featured}
                          onChange={handleChange}
                        />
                        Featured Product
                      </label>
                    </div>
                  </div>

                  {/* Right Column - Image Preview */}
                  <div>
                    <div className="form-group">
                      <label className="form-label">Image Preview</label>
                      <div style={{
                        border: '2px dashed var(--gray-300)',
                        borderRadius: 'var(--border-radius)',
                        padding: '2rem',
                        textAlign: 'center',
                        minHeight: '300px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Product preview"
                            style={{
                              maxWidth: '100%',
                              maxHeight: '300px',
                              objectFit: 'cover',
                              borderRadius: 'var(--border-radius)'
                            }}
                            onError={() => setImagePreview('')}
                          />
                        ) : (
                          <div style={{ color: 'var(--gray-500)' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🖼️</div>
                            <p>Image preview will appear here</p>
                            <p style={{ fontSize: '0.875rem' }}>
                              Enter a valid image URL to see preview
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Product Preview Card */}
                    {formData.name && formData.price && (
                      <div className="form-group">
                        <label className="form-label">Product Card Preview</label>
                        <div className="product-card" style={{ maxWidth: '280px' }}>
                          {formData.originalPrice && parseFloat(formData.originalPrice) > parseFloat(formData.price) && (
                            <div style={{
                              position: 'absolute',
                              top: '15px',
                              right: '15px',
                              background: 'var(--error)',
                              color: 'white',
                              padding: '8px 12px',
                              borderRadius: '20px',
                              fontWeight: 'bold',
                              fontSize: '0.8rem',
                              zIndex: 1
                            }}>
                              {Math.round(((parseFloat(formData.originalPrice) - parseFloat(formData.price)) / parseFloat(formData.originalPrice)) * 100)}% OFF
                            </div>
                          )}
                          
                          {imagePreview ? (
                            <img 
                              src={imagePreview} 
                              alt={formData.name}
                              className="product-image"
                            />
                          ) : (
                            <div className="product-image" style={{
                              background: 'var(--gray-200)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'var(--gray-500)'
                            }}>
                              No Image
                            </div>
                          )}
                          
                          <div className="product-info">
                            <h3 style={{ fontSize: '1rem' }}>{formData.name}</h3>
                            {formData.description && (
                              <p style={{ 
                                fontSize: '0.875rem', 
                                color: 'var(--gray-600)',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                              }}>
                                {formData.description}
                              </p>
                            )}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                              <span className="product-price">₹{formData.price}</span>
                              {formData.originalPrice && parseFloat(formData.originalPrice) > parseFloat(formData.price) && (
                                <span style={{ 
                                  textDecoration: 'line-through', 
                                  color: 'var(--gray-400)',
                                  fontSize: '0.9rem'
                                }}>
                                  ₹{formData.originalPrice}
                                </span>
                              )}
                            </div>
                            <button className="btn btn-primary btn-sm w-full">
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Form Actions */}
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  justifyContent: 'flex-end',
                  marginTop: '2rem',
                  paddingTop: '2rem',
                  borderTop: '1px solid var(--gray-200)'
                }}>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="btn btn-ghost"
                  >
                    Reset Form
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/admin')}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div className="spinner" style={{ width: '20px', height: '20px' }}></div>
                        Adding Product...
                      </div>
                    ) : (
                      'Add Product'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;