import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API calls
    setTimeout(() => {
      setStats({
        totalProducts: 156,
        totalOrders: 1247,
        totalRevenue: 1825000,
        totalUsers: 892
      });

      setRecentOrders([
        {
          id: 'ORD-001',
          customer: 'John Doe',
          items: 3,
          total: 1825,
          status: 'delivered',
          date: '2024-01-15'
        },
        {
          id: 'ORD-002',
          customer: 'Jane Smith',
          items: 2,
          total: 940,
          status: 'processing',
          date: '2024-01-15'
        },
        {
          id: 'ORD-003',
          customer: 'Mike Johnson',
          items: 5,
          total: 3150,
          status: 'shipped',
          date: '2024-01-14'
        },
        {
          id: 'ORD-004',
          customer: 'Sarah Wilson',
          items: 1,
          total: 520,
          status: 'pending',
          date: '2024-01-14'
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'var(--success)';
      case 'shipped': return 'var(--primary)';
      case 'processing': return 'var(--warning)';
      case 'pending': return 'var(--gray-500)';
      default: return 'var(--gray-500)';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return '✅';
      case 'shipped': return '🚚';
      case 'processing': return '⏳';
      case 'pending': return '📋';
      default: return '❓';
    }
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
              <h1 style={{ marginBottom: '0.5rem' }}>Admin Dashboard</h1>
              <p style={{ opacity: 0.9, margin: 0 }}>
                Welcome back, {user?.name}! Here's what's happening with your store.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/admin/add-product" className="btn" style={{
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: '2px solid rgba(255,255,255,0.3)'
              }}>
                ➕ Add Product
              </Link>
              <Link to="/admin/manage-products" className="btn" style={{
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: '2px solid rgba(255,255,255,0.3)'
              }}>
                📦 Manage Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '2rem 1rem' }}>
        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div className="card">
            <div className="card-body" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
              <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>
                {stats.totalProducts}
              </h3>
              <p style={{ color: 'var(--gray-600)', margin: 0 }}>Total Products</p>
            </div>
          </div>

          <div className="card">
            <div className="card-body" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
              <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>
                {stats.totalOrders.toLocaleString()}
              </h3>
              <p style={{ color: 'var(--gray-600)', margin: 0 }}>Total Orders</p>
            </div>
          </div>

          <div className="card">
            <div className="card-body" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💰</div>
              <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>
                ₹{stats.totalRevenue.toLocaleString()}
              </h3>
              <p style={{ color: 'var(--gray-600)', margin: 0 }}>Total Revenue</p>
            </div>
          </div>

          <div className="card">
            <div className="card-body" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
              <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>
                {stats.totalUsers.toLocaleString()}
              </h3>
              <p style={{ color: 'var(--gray-600)', margin: 0 }}>Total Users</p>
            </div>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem'
        }}>
          {/* Recent Orders */}
          <div className="card">
            <div className="card-header">
              <h3 style={{ margin: 0 }}>Recent Orders</h3>
            </div>
            <div className="card-body" style={{ padding: 0 }}>
              {recentOrders.map((order, index) => (
                <div key={order.id} style={{
                  padding: '1rem 1.5rem',
                  borderBottom: index < recentOrders.length - 1 ? '1px solid var(--gray-200)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                      {order.id}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                      {order.customer} • {order.items} items
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>
                      {order.date}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                      ₹{order.total}
                    </div>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      background: `${getStatusColor(order.status)}20`,
                      color: getStatusColor(order.status)
                    }}>
                      {getStatusIcon(order.status)} {order.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="card-footer">
              <Link 
                to="/admin/orders" 
                style={{ 
                  color: 'var(--primary)', 
                  textDecoration: 'none',
                  fontWeight: '600'
                }}
              >
                View All Orders →
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <div className="card-header">
              <h3 style={{ margin: 0 }}>Quick Actions</h3>
            </div>
            <div className="card-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Link 
                  to="/admin/add-product" 
                  className="btn btn-primary"
                  style={{ justifyContent: 'flex-start', gap: '1rem' }}
                >
                  <span style={{ fontSize: '1.5rem' }}>➕</span>
                  <div>
                    <div style={{ fontWeight: '600' }}>Add New Product</div>
                    <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                      Add products to your inventory
                    </div>
                  </div>
                </Link>

                <Link 
                  to="/admin/manage-products" 
                  className="btn btn-outline"
                  style={{ justifyContent: 'flex-start', gap: '1rem' }}
                >
                  <span style={{ fontSize: '1.5rem' }}>📦</span>
                  <div>
                    <div style={{ fontWeight: '600' }}>Manage Products</div>
                    <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                      Edit, delete, or update products
                    </div>
                  </div>
                </Link>

                <Link 
                  to="/admin/add-recipe" 
                  className="btn btn-outline"
                  style={{ justifyContent: 'flex-start', gap: '1rem' }}
                >
                  <span style={{ fontSize: '1.5rem' }}>🍳</span>
                  <div>
                    <div style={{ fontWeight: '600' }}>Add New Recipe</div>
                    <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                      Add recipes to your collection
                    </div>
                  </div>
                </Link>

                <Link 
                  to="/admin/manage-recipes" 
                  className="btn btn-outline"
                  style={{ justifyContent: 'flex-start', gap: '1rem' }}
                >
                  <span style={{ fontSize: '1.5rem' }}>📖</span>
                  <div>
                    <div style={{ fontWeight: '600' }}>Manage Recipes</div>
                    <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                      Edit or delete recipes
                    </div>
                  </div>
                </Link>

                <Link 
                  to="/admin/orders" 
                  className="btn btn-outline"
                  style={{ justifyContent: 'flex-start', gap: '1rem' }}
                >
                  <span style={{ fontSize: '1.5rem' }}>📦</span>
                  <div>
                    <div style={{ fontWeight: '600' }}>Manage Orders</div>
                    <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                      View and manage customer orders
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Chart Placeholder */}
        <div className="card" style={{ marginTop: '2rem' }}>
          <div className="card-header">
            <h3 style={{ margin: 0 }}>Sales Performance</h3>
          </div>
          <div className="card-body" style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📈</div>
            <h4>Chart Coming Soon</h4>
            <p style={{ color: 'var(--gray-600)' }}>
              Sales analytics and performance charts will be available here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;