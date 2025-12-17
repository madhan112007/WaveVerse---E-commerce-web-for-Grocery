import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import QuantityModal from '../components/QuantityModal';
import API_BASE_URL from '../config/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const { addToCart, toggleWishlist, isInWishlist, getItemQuantity, incrementQuantity, decrementQuantity, cartTotals } = useCart();

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
      rating: 4.8,
      reviews: 124,
      discount: 30
    },
    {
      id: 2,
      name: 'Farm Fresh Milk',
      category: 'dairy',
      price: 48,
      originalPrice: 65,
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop',
      description: 'Pure, fresh milk from grass-fed cows',
      inStock: true,
      rating: 4.9,
      reviews: 89,
      discount: 25
    },
    {
      id: 3,
      name: 'Whole Wheat Bread',
      category: 'bakery',
      price: 50,
      originalPrice: 85,
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop',
      description: 'Freshly baked whole wheat bread with seeds',
      inStock: true,
      rating: 4.6,
      reviews: 67,
      discount: 40
    },
    {
      id: 4,
      name: 'Free Range Eggs',
      category: 'dairy',
      price: 175,
      originalPrice: 220,
      image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop',
      description: 'Fresh eggs from free-range chickens',
      inStock: true,
      rating: 4.7,
      reviews: 156,
      discount: 20
    },
    {
      id: 5,
      name: 'Organic Spinach',
      category: 'vegetables',
      price: 35,
      originalPrice: 35,
      image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop',
      description: 'Fresh organic spinach leaves, perfect for salads',
      inStock: true,
      rating: 4.5,
      reviews: 43,
      discount: 0
    },
    {
      id: 6,
      name: 'Organic Bananas',
      category: 'fruits',
      price: 60,
      originalPrice: 60,
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop',
      description: 'Sweet, ripe organic bananas',
      inStock: true,
      rating: 4.4,
      reviews: 78,
      discount: 0
    },
    {
      id: 7,
      name: 'Greek Yogurt',
      category: 'dairy',
      price: 120,
      originalPrice: 120,
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop',
      description: 'Creamy Greek yogurt with probiotics',
      inStock: false,
      rating: 4.8,
      reviews: 92,
      discount: 0
    },
    {
      id: 8,
      name: 'Sourdough Bread',
      category: 'bakery',
      price: 150,
      originalPrice: 150,
      image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=400&fit=crop',
      description: 'Artisan sourdough bread with crispy crust',
      inStock: true,
      rating: 4.9,
      reviews: 134,
      discount: 0
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'fruits', name: 'Fresh Fruits' },
    { id: 'vegetables', name: 'Vegetables' },
    { id: 'dairy', name: 'Dairy & Eggs' },
    { id: 'bakery', name: 'Fresh Bakery' }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products`);
      const data = await response.json();
      if (data.length > 0) {
        const productsWithId = data.map(p => ({ ...p, id: p._id || p.id }));
        setProducts(productsWithId);
        setFilteredProducts(productsWithId);
      } else {
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
    } finally {
      setLoading(false);
    }
  };

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

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchTerm, sortBy]);

  const handleAddToCartClick = (product) => {
    setSelectedProduct(product);
    setShowQuantityModal(true);
  };

  const handleAddToCart = (product, quantity = 1) => {
    addToCart(product, quantity);
  };

  const handleIncrement = (productId) => {
    incrementQuantity(productId);
  };

  const handleDecrement = (productId) => {
    decrementQuantity(productId);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} style={{ color: '#ffc107' }}>★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" style={{ color: '#ffc107' }}>☆</span>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} style={{ color: '#e0e0e0' }}>★</span>);
    }

    return stars;
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
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
        color: 'white',
        padding: '4rem 5% 2rem',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ marginBottom: '1rem' }}>Fresh Products</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '2rem' }}>
            Discover our wide selection of fresh, organic products
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '2rem 1rem' }}>
        {/* Filters and Search */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: 'var(--border-radius-lg)',
          boxShadow: 'var(--shadow)',
          marginBottom: '2rem'
        }}>
          {/* Search Bar */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ position: 'relative', maxWidth: '400px' }}>
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
                ⌕
              </span>
            </div>
          </div>

          {/* Categories and Sort */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            {/* Categories */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`btn ${selectedCategory === category.id ? 'btn-primary' : 'btn-outline'} btn-sm`}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-input"
              style={{ width: 'auto', minWidth: '150px' }}
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div style={{ marginBottom: '1rem', color: 'var(--gray-600)' }}>
          Showing {filteredProducts.length} of {products.length} products
          {searchTerm && ` for "${searchTerm}"`}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: 'white',
            borderRadius: 'var(--border-radius-lg)',
            boxShadow: 'var(--shadow)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem', color: 'var(--gray-400)' }}>⌕</div>
            <h3>No products found</h3>
            <p style={{ color: 'var(--gray-600)' }}>
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="btn btn-primary"
              style={{ marginTop: '1rem' }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                {/* Discount Badge */}
                {product.discount > 0 && (
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
                    {product.discount}% OFF
                  </div>
                )}

                {/* Stock Status */}
                {!product.inStock && (
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    left: '15px',
                    background: 'var(--gray-600)',
                    color: 'white',
                    padding: '8px 12px',
                    borderRadius: '20px',
                    fontWeight: 'bold',
                    fontSize: '0.8rem',
                    zIndex: 1
                  }}>
                    Out of Stock
                  </div>
                )}

                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="product-image"
                  style={{ filter: !product.inStock ? 'grayscale(100%)' : 'none' }}
                />
                
                <div className="product-info">
                  <h3 style={{ 
                    fontSize: '1.1rem', 
                    marginBottom: '0.5rem',
                    color: !product.inStock ? 'var(--gray-500)' : 'inherit'
                  }}>
                    {product.name}
                  </h3>
                  
                  <p style={{ 
                    fontSize: '0.875rem', 
                    color: 'var(--gray-600)', 
                    marginBottom: '0.75rem',
                    lineHeight: '1.4'
                  }}>
                    {product.description}
                  </p>

                  {/* Rating */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.75rem'
                  }}>
                    <div style={{ display: 'flex' }}>
                      {renderStars(product.rating)}
                    </div>
                    <span style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.75rem', 
                    marginBottom: '1rem' 
                  }}>
                    <span className="product-price">₹{product.price}</span>
                    {product.originalPrice > product.price && (
                      <span style={{ 
                        textDecoration: 'line-through', 
                        color: 'var(--gray-400)',
                        fontSize: '0.9rem'
                      }}>
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>

                  {getItemQuantity(product.id) > 0 ? (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.5rem'
                    }}>
                      <button
                        onClick={() => handleDecrement(product.id)}
                        className="btn btn-outline btn-sm"
                        style={{ minWidth: '40px', padding: '0.5rem' }}
                      >
                        -
                      </button>
                      <span style={{
                        flex: 1,
                        textAlign: 'center',
                        fontWeight: '600',
                        padding: '0.5rem'
                      }}>
                        {getItemQuantity(product.id)}
                      </span>
                      <button
                        onClick={() => handleIncrement(product.id)}
                        className="btn btn-primary btn-sm"
                        style={{ minWidth: '40px', padding: '0.5rem' }}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAddToCartClick(product)}
                      className={`btn w-full ${product.inStock ? 'btn-primary' : 'btn-outline'}`}
                      disabled={!product.inStock}
                      style={{ marginBottom: '0.5rem' }}
                    >
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  )}

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`btn btn-ghost btn-sm w-full`}
                    style={{ color: isInWishlist(product.id) ? 'var(--error)' : 'var(--gray-600)' }}
                  >
                    {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cart Summary (if items in cart) */}
      {cartTotals.itemCount > 0 && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: 'var(--primary)',
          color: 'white',
          padding: '1rem',
          borderRadius: 'var(--border-radius-lg)',
          boxShadow: 'var(--shadow-xl)',
          zIndex: 1000,
          minWidth: '200px'
        }}>
          <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
            Cart: {cartTotals.itemCount} items
          </div>
          <div style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>
            Subtotal: ₹{cartTotals.subtotal}
          </div>
          {cartTotals.savings > 0 && (
            <div style={{ fontSize: '0.875rem', color: '#90EE90' }}>
              You save: ₹{cartTotals.savings}
            </div>
          )}
        </div>
      )}

      {/* Quantity Modal */}
      <QuantityModal
        product={selectedProduct}
        isOpen={showQuantityModal}
        onClose={() => setShowQuantityModal(false)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default Products;