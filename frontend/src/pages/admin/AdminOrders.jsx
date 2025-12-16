import React, { useState, useEffect } from 'react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders([
        {
          id: 'ORD-001',
          customer: 'John Doe',
          email: 'john@example.com',
          items: 3,
          total: 1825,
          status: 'delivered',
          date: '2024-01-15',
          address: 'No. 45, Avinashi Road, Coimbatore'
        },
        {
          id: 'ORD-002',
          customer: 'Jane Smith',
          email: 'jane@example.com',
          items: 2,
          total: 940,
          status: 'processing',
          date: '2024-01-15',
          address: 'No. 12, RS Puram, Coimbatore'
        },
        {
          id: 'ORD-003',
          customer: 'Mike Johnson',
          email: 'mike@example.com',
          items: 5,
          total: 3150,
          status: 'shipped',
          date: '2024-01-14',
          address: 'No. 78, Peelamedu, Coimbatore'
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

  const filteredOrders = orders.filter(order => 
    filter === 'all' || order.status === filter
  );

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
      <section style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
        color: 'white',
        padding: '3rem 5% 2rem'
      }}>
        <div className="container">
          <h1>All Orders</h1>
          <p style={{ opacity: 0.9 }}>Manage and track all customer orders</p>
        </div>
      </section>

      <div className="container" style={{ padding: '2rem 1rem' }}>
        {/* Filters */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {['all', 'pending', 'processing', 'shipped', 'delivered'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`btn ${filter === status ? 'btn-primary' : 'btn-outline'} btn-sm`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="card">
          <div className="card-body" style={{ padding: 0 }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--gray-50)' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid var(--gray-200)' }}>Order ID</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid var(--gray-200)' }}>Customer</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid var(--gray-200)' }}>Items</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid var(--gray-200)' }}>Total</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid var(--gray-200)' }}>Status</th>
                    <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid var(--gray-200)' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => (
                    <tr key={order.id}>
                      <td style={{ padding: '1rem', borderBottom: '1px solid var(--gray-200)' }}>
                        <strong>{order.id}</strong>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid var(--gray-200)' }}>
                        <div>{order.customer}</div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>{order.email}</div>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid var(--gray-200)' }}>
                        {order.items}
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid var(--gray-200)' }}>
                        <strong>₹{order.total}</strong>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid var(--gray-200)' }}>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '12px',
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          background: `${getStatusColor(order.status)}20`,
                          color: getStatusColor(order.status)
                        }}>
                          {order.status}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid var(--gray-200)' }}>
                        {order.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;