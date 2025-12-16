import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);

  // Mock products data
  const mockProducts = [
    {
      id: 1,
      name: 'Organic Red Apples',
      category: 'fruits',
      price: 125,
      originalPrice: 180,
      image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop',
      description: 'Fresh, crispy organic red apples from local farms',
      inStock: true,
      featured: true,
      createdAt: '2024-01-10'
    },
    {
      id: 2,
      name: 'Farm Fresh Milk',
      category: 'dairy',
      price: 48,
      originalPrice: 65,
      image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=400&h=400&fit=crop',
      description: 'Pure, fresh milk from grass-fed cows',
      inStock: true,
      featured: false,
      createdAt: '2024-01-12'
    },
    {
      id: 3,
      name: 'Whole Wheat Bread',
      category: 'bakery',
      price: 50,
      originalPrice: 85,
      image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=400&h=400&fit=crop',
      description: 'Freshly baked whole wheat bread with seeds',
      inStock: true,
      featured: true,
      createdAt: '2024-01-08'
    },
    {
      id: 4,
      name: 'Free Range Eggs',
      category: 'dairy',
      price: 175,
      originalPrice: 220,
      image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=400&h=400&fit=crop',
      description: 'Fresh eggs from free-range chickens',
      inStock: false,
      featured: false,
      createdAt: '2024-01-15'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'fruits', name: 'Fresh Fruits' },
    { id: 'vegetables', name: 'Vegetables' },
    { id: 'dairy', name: 'Dairy & Eggs' },
    { id: 'bakery', name: 'Fresh Bakery' }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchTerm]);

  const handleToggleStock = (productId) => {
    setProducts(prev => prev.map(product =>
      product.id === productId
        ? { ...product, inStock: !product.inStock }
        : product
    ));
  };

  const handleToggleFeatured = (productId) => {
    setProducts(prev => prev.map(product =>
      product.id === productId
        ? { ...product, featured: !product.featured }
        : product
    ));
  };

  const handleDeleteProduct = (productId) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
    setShowDeleteModal(null);
  };

  const handleEditProduct = (product) => {
    setEditingProduct({ ...product });
  };

  const handleSaveEdit = () => {
    setProducts(prev => prev.map(product =>
      product.id === editingProduct.id ? editingProduct : product
    ));
    setEditingProduct(null);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh'
      }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Header */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
        color: 'white',
        padding: '3rem 5% 2rem'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <h1 style={{ marginBottom: '0.5rem' }}>Manage Products</h1>
              <p style={{ opacity: 0.9, margin: 0 }}>
                View, edit, and manage your product inventory
              </p>
            </div>
            <Link to="/admin/add-product" className="btn" style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: '2px solid rgba(255,255,255,0.3)'
            }}>
              ➕ Add New Product
            </Link>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '2rem 1rem' }}>
        {/* Filters */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: 'var(--border-radius-lg)',
          boxShadow: 'var(--shadow)',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            {/* Search */}
            <div style={{ position: 'relative', minWidth: '300px', flex: 1 }}>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '3rem' }}
              />
              <span style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--gray-400)',
                fontSize: '1.2rem'
              }}>
                🔍
              </span>
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="form-input"
              style={{ width: 'auto', minWidth: '150px' }}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div style={{ marginBottom: '1rem', color: 'var(--gray-600)' }}>
          Showing {filteredProducts.length} of {products.length} products
        </div>

        {/* Products Table */}
        <div className="card">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--gray-50)' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid var(--gray-200)' }}>
                    Product
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid var(--gray-200)' }}>
                    Category
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid var(--gray-200)' }}>
                    Price
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '1px solid var(--gray-200)' }}>
                    Stock
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '1px solid var(--gray-200)' }}>
                    Featured
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'center', borderBottom: '1px solid var(--gray-200)' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <tr key={product.id} style={{ borderBottom: '1px solid var(--gray-200)' }}>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{
                            width: '60px',
                            height: '60px',
                            objectFit: 'cover',
                            borderRadius: 'var(--border-radius)',
                            flexShrink: 0
                          }}
                        />
                        <div>
                          <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                            {product.name}
                          </div>
                          <div style={{ 
                            fontSize: '0.875rem', 
                            color: 'var(--gray-600)',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            {product.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        background: 'var(--primary)20',
                        color: 'var(--primary)'
                      }}>
                        {categories.find(c => c.id === product.category)?.name}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: '600', color: 'var(--primary-dark)' }}>
                        ₹{product.price}
                      </div>
                      {product.originalPrice > product.price && (
                        <div style={{ 
                          fontSize: '0.875rem', 
                          color: 'var(--gray-400)',
                          textDecoration: 'line-through'
                        }}>
                          ₹{product.originalPrice}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <button
                        onClick={() => handleToggleStock(product.id)}
                        style={{
                          padding: '0.5rem 1rem',
                          borderRadius: '20px',
                          border: 'none',
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          background: product.inStock ? 'var(--success)20' : 'var(--error)20',
                          color: product.inStock ? 'var(--success)' : 'var(--error)'
                        }}
                      >
                        {product.inStock ? '✅ In Stock' : '❌ Out of Stock'}
                      </button>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <button
                        onClick={() => handleToggleFeatured(product.id)}
                        style={{
                          padding: '0.5rem',
                          borderRadius: '50%',
                          border: 'none',
                          fontSize: '1.2rem',
                          cursor: 'pointer',
                          background: product.featured ? 'var(--warning)20' : 'var(--gray-100)',
                          color: product.featured ? 'var(--warning)' : 'var(--gray-400)'
                        }}
                        title={product.featured ? 'Remove from featured' : 'Add to featured'}
                      >
                        ⭐
                      </button>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="btn btn-ghost btn-sm"
                          title="Edit product"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => setShowDeleteModal(product.id)}
                          className="btn btn-ghost btn-sm"
                          title="Delete product"
                          style={{ color: 'var(--error)' }}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              color: 'var(--gray-600)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
              <h3>No products found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="modal-overlay" onClick={handleCancelEdit}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="card-header">
              <h3 style={{ margin: 0 }}>Edit Product</h3>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label className="form-label">Product Name</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct(prev => ({ ...prev, name: e.target.value }))}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Price (₹)</label>
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                  className="form-input"
                  step="0.01"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct(prev => ({ ...prev, description: e.target.value }))}
                  className="form-input"
                  rows="3"
                />
              </div>
            </div>
            <div className="card-footer">
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button onClick={handleCancelEdit} className="btn btn-ghost">
                  Cancel
                </button>
                <button onClick={handleSaveEdit} className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="card-body" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
              <h3>Delete Product</h3>
              <p style={{ color: 'var(--gray-600)' }}>
                Are you sure you want to delete this product? This action cannot be undone.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
                <button 
                  onClick={() => setShowDeleteModal(null)} 
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleDeleteProduct(showDeleteModal)} 
                  className="btn btn-secondary"
                >
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;