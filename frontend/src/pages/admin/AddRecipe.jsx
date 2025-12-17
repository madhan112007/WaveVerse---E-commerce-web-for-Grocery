import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../config/api';

const AddRecipe = () => {
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
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const categories = [
    { id: 'Breakfast', name: 'Breakfast' },
    { id: 'Main Course', name: 'Main Course' },
    { id: 'Dessert', name: 'Dessert' },
    { id: 'Salad', name: 'Salad' },
    { id: 'Beverage', name: 'Beverage' }
  ];

  const difficulties = ['Easy', 'Medium', 'Hard'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.prepTime.trim()) newErrors.prepTime = 'Prep time is required';
    if (!formData.servings) newErrors.servings = 'Servings is required';
    if (!formData.image.trim()) newErrors.image = 'Image URL is required';
    if (formData.ingredients.some(ing => !ing.trim())) newErrors.ingredients = 'All ingredients must be filled';
    if (formData.instructions.some(inst => !inst.trim())) newErrors.instructions = 'All instructions must be filled';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const recipeData = {
        ...formData,
        servings: parseInt(formData.servings),
        rating: 4.5,
        reviews: 0,
        ingredients: formData.ingredients.filter(ing => ing.trim()),
        instructions: formData.instructions.filter(inst => inst.trim())
      };

      const response = await fetch(`${API_BASE_URL}/api/recipes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipeData)
      });

      if (!response.ok) throw new Error('Failed to add recipe');

      alert('Recipe added successfully!');
      navigate('/admin/manage-recipes');
    } catch (error) {
      setErrors({ submit: 'Failed to add recipe. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <section style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
        color: 'white',
        padding: '3rem 5% 2rem'
      }}>
        <div className="container">
          <h1>Add New Recipe</h1>
          <p style={{ opacity: 0.9, margin: 0 }}>Create a new recipe for your collection</p>
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

                <div className="form-group">
                  <label className="form-label">Recipe Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`form-input ${errors.title ? 'error' : ''}`}
                    placeholder="Enter recipe title"
                  />
                  {errors.title && <div className="form-error">{errors.title}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className={`form-input ${errors.description ? 'error' : ''}`}
                    placeholder="Enter recipe description"
                    rows="3"
                  />
                  {errors.description && <div className="form-error">{errors.description}</div>}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className={`form-input ${errors.category ? 'error' : ''}`}
                    >
                      <option value="">Select category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                    {errors.category && <div className="form-error">{errors.category}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Difficulty</label>
                    <select
                      name="difficulty"
                      value={formData.difficulty}
                      onChange={handleChange}
                      className="form-input"
                    >
                      {difficulties.map(diff => (
                        <option key={diff} value={diff}>{diff}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Servings *</label>
                    <input
                      type="number"
                      name="servings"
                      value={formData.servings}
                      onChange={handleChange}
                      className={`form-input ${errors.servings ? 'error' : ''}`}
                      min="1"
                    />
                    {errors.servings && <div className="form-error">{errors.servings}</div>}
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
                      className={`form-input ${errors.prepTime ? 'error' : ''}`}
                      placeholder="e.g., 20 mins"
                    />
                    {errors.prepTime && <div className="form-error">{errors.prepTime}</div>}
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
                    className={`form-input ${errors.image ? 'error' : ''}`}
                    placeholder="https://example.com/image.jpg"
                  />
                  {errors.image && <div className="form-error">{errors.image}</div>}
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
                  {errors.ingredients && <div className="form-error">{errors.ingredients}</div>}
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
                  {errors.instructions && <div className="form-error">{errors.instructions}</div>}
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
                    {loading ? 'Adding Recipe...' : 'Add Recipe'}
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

export default AddRecipe;