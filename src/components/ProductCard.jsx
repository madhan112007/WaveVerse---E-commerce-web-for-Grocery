import React, { useState } from 'react';

const ProductCard = ({ 
  product, 
  onAddToCart, 
  onToggleWishlist, 
  isInWishlist = false,
  showAdminActions = false,
  onEdit,
  onDelete 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = async () => {
    if (!product.inStock) return;
    
    setIsLoading(true);
    try {
      await onAddToCart(product);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWishlistToggle = () => {
    if (onToggleWishlist) {
      onToggleWishlist(product);
    }
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

  const getDiscountPercentage = () => {
    if (!product.originalPrice || product.originalPrice <= product.price) return 0;
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  };

  const discountPercentage = getDiscountPercentage();

  return (
    <div className="product-card" style={{ position: 'relative' }}>
      {/* Badges */}
      <div style={{ position: 'absolute', top: '15px', left: '15px', zIndex: 2 }}>
        {!product.inStock && (
          <div style={{
            background: 'var(--gray-600)',
            color: 'white',
            padding: '0.5rem 0.75rem',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: '600',
            marginBottom: '0.5rem'
          }}>
            Out of Stock
          </div>
        )}
        
        {product.featured && (
          <div style={{
            background: 'var(--warning)',
            color: 'white',
            padding: '0.5rem 0.75rem',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: '600',
            marginBottom: '0.5rem'
          }}>
            ⭐ Featured
          </div>
        )}
      </div>

      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <div style={{
          position: 'absolute',
          top: '15px',
          right: '15px',
          background: 'var(--error)',
          color: 'white',
          padding: '0.5rem 0.75rem',
          borderRadius: '20px',
          fontSize: '0.75rem',
          fontWeight: '600',
          zIndex: 2
        }}>
          {discountPercentage}% OFF
        </div>
      )}

      {/* Wishlist Button */}
      {onToggleWishlist && (
        <button
          onClick={handleWishlistToggle}
          style={{
            position: 'absolute',
            top: discountPercentage > 0 ? '60px' : '15px',
            right: '15px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: 'none',
            background: 'rgba(255, 255, 255, 0.9)',
            color: isInWishlist ? 'var(--error)' : 'var(--gray-400)',
            fontSize: '1.2rem',
            cursor: 'pointer',
            transition: 'var(--transition)',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'white';
            e.target.style.transform = 'scale(1.1)';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.9)';
            e.target.style.transform = 'scale(1)';
          }}
        >
          {isInWishlist ? '❤️' : '🤍'}
        </button>
      )}

      {/* Product Image */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {imageError ? (
          <div 
            className="product-image"
            style={{
              background: 'var(--gray-200)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--gray-500)',
              fontSize: '3rem'
            }}
          >
            🖼️
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
            style={{
              filter: !product.inStock ? 'grayscale(100%) opacity(0.7)' : 'none',
              transition: 'var(--transition)'
            }}
            onError={() => setImageError(true)}
            onMouseOver={(e) => {
              if (product.inStock) {
                e.target.style.transform = 'scale(1.05)';
              }
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'scale(1)';
            }}
          />
        )}
      </div>

      <div className="product-info">
        {/* Product Name */}
        <h3 style={{
          fontSize: '1.1rem',
          marginBottom: '0.5rem',
          color: !product.inStock ? 'var(--gray-500)' : 'inherit',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {product.name}
        </h3>

        {/* Product Description */}
        {product.description && (
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--gray-600)',
            marginBottom: '0.75rem',
            lineHeight: '1.4',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {product.description}
          </p>
        )}

        {/* Rating */}
        {product.rating && (
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
              {product.rating}
              {product.reviews && ` (${product.reviews})`}
            </span>
          </div>
        )}

        {/* Price */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '1rem'
        }}>
          <span className="product-price">
            ₹{typeof product.price === 'number' ? product.price.toFixed(0) : product.price}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span style={{
              textDecoration: 'line-through',
              color: 'var(--gray-400)',
              fontSize: '0.9rem'
            }}>
              ₹{typeof product.originalPrice === 'number' ? product.originalPrice.toFixed(0) : product.originalPrice}
            </span>
          )}
        </div>

        {/* Category Tag */}
        {product.category && (
          <div style={{ marginBottom: '1rem' }}>
            <span style={{
              background: 'var(--primary)20',
              color: 'var(--primary)',
              padding: '0.25rem 0.75rem',
              borderRadius: '12px',
              fontSize: '0.75rem',
              fontWeight: '500',
              textTransform: 'capitalize'
            }}>
              {product.category.replace('-', ' ')}
            </span>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {showAdminActions ? (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => onEdit && onEdit(product)}
                className="btn btn-outline btn-sm"
                style={{ flex: 1 }}
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => onDelete && onDelete(product)}
                className="btn btn-secondary btn-sm"
                style={{ flex: 1 }}
              >
                🗑️ Delete
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className={`btn w-full ${product.inStock ? 'btn-primary' : 'btn-outline'}`}
              disabled={!product.inStock || isLoading}
            >
              {isLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div className="spinner" style={{ width: '16px', height: '16px' }}></div>
                  Adding...
                </div>
              ) : product.inStock ? (
                '🛒 Add to Cart'
              ) : (
                '❌ Out of Stock'
              )}
            </button>
          )}

          {/* Quick View Button */}
          {!showAdminActions && (
            <button
              className="btn btn-ghost btn-sm w-full"
              style={{ fontSize: '0.875rem' }}
            >
              👁️ Quick View
            </button>
          )}
        </div>

        {/* Stock Indicator */}
        {product.inStock && product.stock && product.stock <= 5 && (
          <div style={{
            marginTop: '0.75rem',
            padding: '0.5rem',
            background: 'var(--warning)20',
            color: 'var(--warning)',
            borderRadius: 'var(--border-radius)',
            fontSize: '0.875rem',
            textAlign: 'center',
            fontWeight: '500'
          }}>
            ⚠️ Only {product.stock} left in stock!
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;