import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../config/api';

const ManageRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'Breakfast', name: 'Breakfast' },
    { id: 'Main Course', name: 'Main Course' },
    { id: 'Dessert', name: 'Dessert' },
    { id: 'Salad', name: 'Salad' },
    { id: 'Beverage', name: 'Beverage' }
  ];

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/recipes`);
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/recipes/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setRecipes(recipes.filter(recipe => recipe._id !== id));
        alert('Recipe deleted successfully!');
      }
    } catch (error) {
      alert('Failed to delete recipe');
    }
  };

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1>Manage Recipes</h1>
              <p style={{ opacity: 0.9, margin: 0 }}>Manage your recipe collection</p>
            </div>
            <button
              onClick={() => navigate('/admin/add-recipe')}
              className="btn"
              style={{ background: 'white', color: 'var(--primary)' }}
            >
              Add New Recipe
            </button>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '2rem 1rem' }}>
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: 'var(--border-radius-lg)',
          boxShadow: 'var(--shadow)',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ flex: 1, minWidth: '200px' }}
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="form-input"
              style={{ width: 'auto' }}
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ marginBottom: '1rem', color: 'var(--gray-600)' }}>
          Showing {filteredRecipes.length} of {recipes.length} recipes
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '2rem'
        }}>
          {filteredRecipes.map(recipe => (
            <div key={recipe._id} className="card">
              <img
                src={recipe.image}
                alt={recipe.title}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h3 style={{ marginBottom: '0.5rem' }}>{recipe.title}</h3>
                <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  {recipe.description}
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.875rem',
                  color: 'var(--gray-600)',
                  marginBottom: '1rem'
                }}>
                  <span>{recipe.category}</span>
                  <span>{recipe.difficulty}</span>
                  <span>{recipe.servings} servings</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleDelete(recipe._id)}
                    className="btn btn-outline btn-sm"
                    style={{ color: 'var(--error)', borderColor: 'var(--error)' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: 'white',
            borderRadius: 'var(--border-radius-lg)',
            boxShadow: 'var(--shadow)'
          }}>
            <h3>No recipes found</h3>
            <p style={{ color: 'var(--gray-600)' }}>
              {searchTerm || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Start by adding your first recipe'
              }
            </p>
            <button
              onClick={() => navigate('/admin/add-recipe')}
              className="btn btn-primary"
              style={{ marginTop: '1rem' }}
            >
              Add New Recipe
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageRecipes;