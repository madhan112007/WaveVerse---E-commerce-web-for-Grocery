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
                border: '2px solid rgba(255,255,255,0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <div style={{ width: '20px', height: '20px', background: '#10b981', borderRadius: '50%' }}></div>
                Add Product
              </Link>
              <Link to="/admin/manage-products" className="btn" style={{
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: '2px solid rgba(255,255,255,0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <div style={{ width: '20px', height: '20px', background: '#3b82f6', borderRadius: '4px' }}></div>
                Manage Products
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
              <div style={{ 
                width: '60px', 
                height: '60px', 
                background: '#3b82f6', 
                borderRadius: '12px', 
                margin: '0 auto 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ width: '30px', height: '30px', background: 'white', borderRadius: '4px' }}></div>
              </div>
              <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>
                {stats.totalProducts}
              </h3>
              <p style={{ color: 'var(--gray-600)', margin: 0 }}>Total Products</p>
            </div>
          </div>

          <div className="card">
            <div className="card-body" style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '60px', 
                height: '60px', 
                background: '#10b981', 
                borderRadius: '50%', 
                margin: '0 auto 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ width: '25px', height: '25px', background: 'white', borderRadius: '50%' }}></div>
              </div>
              <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>
                {stats.totalOrders.toLocaleString()}
              </h3>
              <p style={{ color: 'var(--gray-600)', margin: 0 }}>Total Orders</p>
            </div>
          </div>

          <div className="card">
            <div className="card-body" style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '60px', 
                height: '60px', 
                background: '#f59e0b', 
                borderRadius: '12px', 
                margin: '0 auto 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ width: '30px', height: '20px', background: 'white', borderRadius: '2px' }}></div>
              </div>
              <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>
                ₹{stats.totalRevenue.toLocaleString()}
              </h3>
              <p style={{ color: 'var(--gray-600)', margin: 0 }}>Total Revenue</p>
            </div>
          </div>

          <div className="card">
            <div className="card-body" style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '60px', 
                height: '60px', 
                background: '#8b5cf6', 
                borderRadius: '50%', 
                margin: '0 auto 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ width: '20px', height: '20px', background: 'white', borderRadius: '50%' }}></div>
                <div style={{ width: '15px', height: '15px', background: 'white', borderRadius: '50%', marginLeft: '-5px' }}></div>
              </div>
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
                      gap: '0.5rem',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      background: `${getStatusColor(order.status)}20`,
                      color: getStatusColor(order.status)
                    }}>
                      <div style={{ width: '8px', height: '8px', background: getStatusColor(order.status), borderRadius: '50%' }}></div>
                      {order.status}
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
                  <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '20px', height: '20px', background: 'white', borderRadius: '50%' }}></div>
                  </div>
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
                  <div style={{ width: '40px', height: '40px', background: '#3b82f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '20px', height: '20px', background: 'white', borderRadius: '4px' }}></div>
                  </div>
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
                  <div style={{ width: '40px', height: '40px', background: '#10b981', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '20px', height: '15px', background: 'white', borderRadius: '2px' }}></div>
                  </div>
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
                  <div style={{ width: '40px', height: '40px', background: '#f59e0b', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '20px', height: '15px', background: 'white', borderRadius: '2px' }}></div>
                  </div>
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
                  <div style={{ width: '40px', height: '40px', background: '#8b5cf6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '20px', height: '20px', background: 'white', borderRadius: '4px' }}></div>
                  </div>
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

        {/* Sales Performance Chart */}
        <div className="card" style={{ marginTop: '2rem' }}>
          <div className="card-header">
            <h3 style={{ margin: 0 }}>Sales Performance</h3>
          </div>
          <div className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10b981', marginBottom: '0.5rem' }}>+23%</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>Sales Growth</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#3b82f6', marginBottom: '0.5rem' }}>₹45,230</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>This Month</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#f59e0b', marginBottom: '0.5rem' }}>₹1,82,450</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>Total Sales</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#8b5cf6', marginBottom: '0.5rem' }}>342</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>Orders This Month</div>
              </div>
            </div>
            
            {/* Simple Bar Chart */}
            <div style={{ marginTop: '2rem' }}>
              <div style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>Monthly Sales Trend</div>
              <div style={{ display: 'flex', alignItems: 'end', gap: '1rem', height: '200px', padding: '1rem', background: 'var(--gray-50)', borderRadius: 'var(--border-radius)' }}>
                {[
                  { month: 'Jan', value: 65, color: '#3b82f6' },
                  { month: 'Feb', value: 78, color: '#10b981' },
                  { month: 'Mar', value: 52, color: '#f59e0b' },
                  { month: 'Apr', value: 89, color: '#8b5cf6' },
                  { month: 'May', value: 95, color: '#ef4444' },
                  { month: 'Jun', value: 73, color: '#06b6d4' }
                ].map((bar, index) => (
                  <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                    <div 
                      style={{ 
                        width: '100%', 
                        maxWidth: '40px',
                        height: `${bar.value * 1.5}px`, 
                        background: bar.color, 
                        borderRadius: '4px 4px 0 0',
                        marginBottom: '0.5rem'
                      }}
                    ></div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--gray-600)' }}>{bar.month}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;