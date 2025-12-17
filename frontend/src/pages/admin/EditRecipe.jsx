import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API_BASE_URL from '../../config/api';

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: 'Easy',
    prepTime: '',
    cookTime: '',
    servings: '',
    image: '',
    ingredients: [''],
    instructions: ['']
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  const categories = [
    { id: 'Breakfast', name: 'Breakfast' },
    { id: 'Main Course', name: 'Main Course' },
    { id: 'Dessert', name: 'Dessert' },
    { id: 'Salad', name: 'Salad' },
    { id: 'Beverage', name: 'Beverage' }
  ];

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/recipes/${id}`);
      if (response.ok) {
        const recipe = await response.json();
        setFormData({
          title: recipe.title || '',
          description: recipe.description || '',
          category: recipe.category || '',
          difficulty: recipe.difficulty || 'Easy',
          prepTime: recipe.prepTime || '',
          cookTime: recipe.cookTime || '',
          servings: recipe.servings?.toString() || '',
          image: recipe.image || '',
          ingredients: recipe.ingredients?.length ? recipe.ingredients : [''],
          instructions: recipe.instructions?.length ? recipe.instructions : ['']
        });
      }
    } catch (error) {
      console.error('Error fetching recipe:', error);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (index, value, field) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeArrayItem = (index, field) => {
    if (formData[field].length > 1) {
      const newArray = formData[field].filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, [field]: newArray }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const recipeData = {
        ...formData,
        servings: parseInt(formData.servings),
        ingredients: formData.ingredients.filter(ing => ing.trim()),
        instructions: formData.instructions.filter(inst => inst.trim())
      };

      const response = await fetch(`${API_BASE_URL}/api/recipes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipeData)
      });

      if (response.ok) {
        alert('Recipe updated successfully!');
        navigate('/admin/manage-recipes');
      } else {
        alert('Failed to update recipe');
      }
    } catch (error) {
      alert('Error updating recipe');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
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
          <h1>Edit Recipe</h1>
          <p style={{ opacity: 0.9, margin: 0 }}>Update recipe details</p>
        </div>
      </section>

      <div className="container" style={{ padding: '2rem 1rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="card">
            <div className="card-body" style={{ padding: '2rem' }}>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Recipe Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-input"
                    rows="3"
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="form-input"
                      required
                    >
                      <option value="">Select category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Difficulty</label>
                    <select
                      name="difficulty"
                      value={formData.difficulty}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Servings *</label>
                    <input
                      type="number"
                      name="servings"
                      value={formData.servings}
                      onChange={handleChange}
                      className="form-input"
                      min="1"
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Prep Time *</label>
                    <input
                      type="text"
                      name="prepTime"
                      value={formData.prepTime}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="e.g., 20 mins"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Cook Time</label>
                    <input
                      type="text"
                      name="cookTime"
                      value={formData.cookTime}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="e.g., 30 mins"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Image URL *</label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Ingredients *</label>
                  {formData.ingredients.map((ingredient, index) => (
                    <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <input
                        type="text"
                        value={ingredient}
                        onChange={(e) => handleArrayChange(index, e.target.value, 'ingredients')}
                        className="form-input"
                        placeholder={`Ingredient ${index + 1}`}
                        style={{ flex: 1 }}
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem(index, 'ingredients')}
                        className="btn btn-outline btn-sm"
                        disabled={formData.ingredients.length === 1}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('ingredients')}
                    className="btn btn-outline btn-sm"
                  >
                    Add Ingredient
                  </button>
                </div>

                <div className="form-group">
                  <label className="form-label">Instructions *</label>
                  {formData.instructions.map((instruction, index) => (
                    <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <textarea
                        value={instruction}
                        onChange={(e) => handleArrayChange(index, e.target.value, 'instructions')}
                        className="form-input"
                        placeholder={`Step ${index + 1}`}
                        rows="2"
                        style={{ flex: 1 }}
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem(index, 'instructions')}
                        className="btn btn-outline btn-sm"
                        disabled={formData.instructions.length === 1}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('instructions')}
                    className="btn btn-outline btn-sm"
                  >
                    Add Step
                  </button>
                </div>

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
                    onClick={() => navigate('/admin/manage-recipes')}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Update Recipe'}
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

export default EditRecipe;