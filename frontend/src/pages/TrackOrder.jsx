import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../config/api';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => setMapLoaded(true);
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
      if (document.head.contains(script)) document.head.removeChild(script);
    };
  }, []);

  const orderStatuses = [
    { id: 'pending', name: 'Order Placed', icon: '📝', description: 'Your order has been received' },
    { id: 'confirmed', name: 'Confirmed', icon: '✅', description: 'Order confirmed and being prepared' },
    { id: 'preparing', name: 'Preparing', icon: '👨‍🍳', description: 'Your items are being packed' },
    { id: 'out-for-delivery', name: 'Out for Delivery', icon: '🚚', description: 'On the way to your location' },
    { id: 'delivered', name: 'Delivered', icon: '🎉', description: 'Order delivered successfully' }
  ];

  const mockOrder = {
    id: 'WV123456789',
    status: 'out-for-delivery',
    estimatedDelivery: '2:30 PM',
    items: [
      { name: 'Organic Red Apples', quantity: 2, price: 125 },
      { name: 'Farm Fresh Milk', quantity: 1, price: 48 }
    ],
    total: 298,
    address: 'No. 45, Avinashi Road, Peelamedu, Coimbatore - 641004',
    deliveryPerson: 'Raj Kumar',
    phone: '+91 9876543210'
  };

  const handleTrack = async () => {
    if (!orderId.trim()) {
      setError('Please enter your order ID');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/track/${orderId}`);
      const data = await response.json();
      
      if (response.ok) {
        setOrderData(data);
        if (mapLoaded) initializeMap(data);
      } else {
        setError(data.message || 'Order not found. Please check your order ID.');
      }
    } catch (err) {
      if (orderId.toLowerCase().includes('wv') || orderId.toLowerCase().includes('ord')) {
        setOrderData(mockOrder);
        if (mapLoaded) initializeMockMap();
      } else {
        setError('Order not found. Please check your order ID.');
      }
    } finally {
      setLoading(false);
    }
  };

  const getStatusIndex = (status) => {
    return orderStatuses.findIndex(s => s.id === status);
  };

  const initializeMap = (order) => {
    if (!window.L || !order.trackingInfo?.updates?.length) return;

    setTimeout(() => {
      const mapContainer = document.getElementById('tracking-map');
      if (!mapContainer) return;
      
      if (mapContainer._leaflet_id) {
        mapContainer._leaflet_id = null;
        mapContainer.innerHTML = '';
      }

      const updates = order.trackingInfo.updates;
      const currentUpdate = updates[updates.length - 1];
      const coords = currentUpdate.coordinates || { lat: 11.0168, lng: 76.9558 };

      const map = window.L.map('tracking-map').setView([coords.lat, coords.lng], 13);
      
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      updates.forEach((update) => {
        if (update.coordinates) {
          const marker = window.L.marker([update.coordinates.lat, update.coordinates.lng]).addTo(map);
          marker.bindPopup(`<b>${update.status}</b><br>${update.message}<br>${update.location}`);
        }
      });
    }, 100);
  };

  const initializeMockMap = () => {
    if (!window.L) return;

    setTimeout(() => {
      const mapContainer = document.getElementById('tracking-map');
      if (!mapContainer) return;
      
      if (mapContainer._leaflet_id) {
        mapContainer._leaflet_id = null;
        mapContainer.innerHTML = '';
      }

      const coords = { lat: 11.0168, lng: 76.9558 };
      const map = window.L.map('tracking-map').setView([coords.lat, coords.lng], 13);
      
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      const marker = window.L.marker([coords.lat, coords.lng]).addTo(map);
      marker.bindPopup('<b>Your Order</b><br>Out for delivery<br>Coimbatore, Tamil Nadu');
    }, 100);
  };

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
          <h1 style={{ marginBottom: '1rem' }}>Track Your Order</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
            Enter your order ID to see real-time delivery updates
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '2rem 1rem' }}>
        {/* Track Form */}
        <div className="card" style={{ maxWidth: '500px', margin: '0 auto 2rem' }}>
          <div className="card-body">
            <div className="form-group">
              <label className="form-label">Order ID</label>
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="form-input"
                placeholder="Enter your order ID (e.g., WV123456789)"
              />
              {error && <div className="form-error">{error}</div>}
            </div>
            
            <button
              onClick={handleTrack}
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div className="spinner" style={{ width: '20px', height: '20px' }}></div>
                  Tracking...
                </div>
              ) : (
                'Track Order'
              )}
            </button>
          </div>
        </div>

        {/* Order Details */}
        {orderData && (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Order Info */}
            <div className="card" style={{ marginBottom: '2rem' }}>
              <div className="card-header">
                <h3 style={{ margin: 0 }}>Order #{orderData.id}</h3>
              </div>
              <div className="card-body">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div>
                    <strong>Estimated Delivery:</strong><br />
                    {orderData.estimatedDelivery}
                  </div>
                  <div>
                    <strong>Delivery Person:</strong><br />
                    {orderData.deliveryPerson}
                  </div>
                  <div>
                    <strong>Contact:</strong><br />
                    <a href={`tel:${orderData.phone}`} style={{ color: 'var(--primary)' }}>
                      {orderData.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Status */}
            <div className="card" style={{ marginBottom: '2rem' }}>
              <div className="card-header">
                <h3 style={{ margin: 0 }}>Order Status</h3>
              </div>
              <div className="card-body">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {orderStatuses.map((status, index) => {
                    const currentIndex = getStatusIndex(orderData.status);
                    const isCompleted = index <= currentIndex;
                    const isCurrent = index === currentIndex;
                    
                    return (
                      <div
                        key={status.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          padding: '1rem',
                          borderRadius: 'var(--border-radius)',
                          background: isCurrent ? 'var(--primary)20' : isCompleted ? 'var(--success)10' : 'var(--gray-50)',
                          border: isCurrent ? '2px solid var(--primary)' : '1px solid var(--gray-200)'
                        }}
                      >
                        <div style={{
                          width: '50px',
                          height: '50px',
                          borderRadius: '50%',
                          background: isCompleted ? 'var(--success)' : 'var(--gray-300)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.5rem'
                        }}>
                          {isCompleted ? '✓' : status.icon}
                        </div>
                        <div>
                          <div style={{ fontWeight: '600', color: isCompleted ? 'var(--success)' : 'var(--gray-600)' }}>
                            {status.name}
                          </div>
                          <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                            {status.description}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Live Tracking Map */}
            <div className="card" style={{ marginBottom: '2rem' }}>
              <div className="card-header">
                <h3 style={{ margin: 0 }}>Live Tracking</h3>
              </div>
              <div className="card-body">
                <div 
                  id="tracking-map" 
                  style={{ 
                    height: '300px', 
                    width: '100%', 
                    borderRadius: 'var(--border-radius)',
                    background: '#f0f0f0'
                  }}
                ></div>
              </div>
            </div>

            {/* Order Items */}
            <div className="card">
              <div className="card-header">
                <h3 style={{ margin: 0 }}>Order Items</h3>
              </div>
              <div className="card-body">
                {orderData.items.map((item, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.5rem 0',
                    borderBottom: index < orderData.items.length - 1 ? '1px solid var(--gray-200)' : 'none'
                  }}>
                    <div>
                      <div style={{ fontWeight: '500' }}>{item.name}</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                        Qty: {item.quantity}
                      </div>
                    </div>
                    <div style={{ fontWeight: '600' }}>₹{item.price}</div>
                  </div>
                ))}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '1rem',
                  paddingTop: '1rem',
                  borderTop: '2px solid var(--gray-200)',
                  fontSize: '1.125rem',
                  fontWeight: '700'
                }}>
                  <span>Total</span>
                  <span>₹{orderData.total}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Demo Info */}
        {!orderData && (
          <div className="card" style={{ maxWidth: '500px', margin: '2rem auto', textAlign: 'center' }}>
            <div className="card-body">
              <h3>Demo Order ID</h3>
              <p>Try tracking with: <strong>WV123456789</strong></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;