import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../config/api';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const mockRecipes = [
    {
      id: 1,
      title: 'Fresh Garden Salad',
      category: 'salads',
      difficulty: 'easy',
      prepTime: 15,
      servings: 4,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=400&fit=crop',
      description: 'A vibrant mix of fresh vegetables with a light vinaigrette',
      ingredients: [
        '2 cups mixed greens',
        '1 cucumber, diced',
        '2 tomatoes, chopped',
        '1/4 red onion, sliced',
        '2 tbsp olive oil',
        '1 tbsp balsamic vinegar',
        'Salt and pepper to taste'
      ],
      instructions: [
        'Wash and dry all vegetables thoroughly',
        'Chop vegetables into bite-sized pieces',
        'Mix olive oil and balsamic vinegar in a small bowl',
        'Combine all vegetables in a large bowl',
        'Drizzle with dressing and toss gently',
        'Season with salt and pepper to taste'
      ],
      tags: ['healthy', 'vegetarian', 'quick', 'fresh']
    },
    {
      id: 2,
      title: 'Creamy Mushroom Risotto',
      category: 'main-dishes',
      difficulty: 'medium',
      prepTime: 45,
      servings: 6,
      image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500&h=400&fit=crop',
      description: 'Rich and creamy risotto with fresh mushrooms and herbs',
      ingredients: [
        '1 1/2 cups Arborio rice',
        '4 cups vegetable broth',
        '1 lb mixed mushrooms, sliced',
        '1 onion, finely chopped',
        '3 cloves garlic, minced',
        '1/2 cup white wine',
        '1/2 cup Parmesan cheese',
        '2 tbsp butter',
        'Fresh thyme and parsley'
      ],
      instructions: [
        'Heat broth in a separate pot and keep warm',
        'Sauté mushrooms until golden, set aside',
        'Cook onion and garlic until translucent',
        'Add rice and stir for 2 minutes',
        'Add wine and stir until absorbed',
        'Add broth one ladle at a time, stirring constantly',
        'Fold in mushrooms, cheese, and herbs',
        'Serve immediately while hot'
      ],
      tags: ['comfort-food', 'vegetarian', 'creamy', 'italian']
    },
    {
      id: 3,
      title: 'Berry Smoothie Bowl',
      category: 'breakfast',
      difficulty: 'easy',
      prepTime: 10,
      servings: 2,
      image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=500&h=400&fit=crop',
      description: 'Nutritious smoothie bowl topped with fresh fruits and granola',
      ingredients: [
        '1 cup frozen mixed berries',
        '1 banana',
        '1/2 cup Greek yogurt',
        '1/4 cup almond milk',
        '1 tbsp honey',
        'Granola for topping',
        'Fresh berries for topping',
        'Coconut flakes'
      ],
      instructions: [
        'Blend frozen berries, banana, yogurt, and almond milk',
        'Add honey and blend until smooth',
        'Pour into bowls',
        'Top with granola, fresh berries, and coconut',
        'Serve immediately'
      ],
      tags: ['healthy', 'breakfast', 'smoothie', 'antioxidants']
    },
    {
      id: 4,
      title: 'Grilled Vegetable Pasta',
      category: 'main-dishes',
      difficulty: 'medium',
      prepTime: 30,
      servings: 4,
      image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500&h=400&fit=crop',
      description: 'Colorful grilled vegetables tossed with pasta and herbs',
      ingredients: [
        '12 oz pasta of choice',
        '2 zucchini, sliced',
        '1 eggplant, cubed',
        '2 bell peppers, strips',
        '1 red onion, sliced',
        '3 tbsp olive oil',
        'Fresh basil and oregano',
        'Parmesan cheese',
        'Balsamic glaze'
      ],
      instructions: [
        'Cook pasta according to package directions',
        'Preheat grill or grill pan',
        'Brush vegetables with olive oil',
        'Grill vegetables until tender and charred',
        'Toss hot pasta with grilled vegetables',
        'Add fresh herbs and cheese',
        'Drizzle with balsamic glaze before serving'
      ],
      tags: ['vegetarian', 'grilled', 'mediterranean', 'colorful']
    },
    {
      id: 5,
      title: 'Chocolate Avocado Mousse',
      category: 'desserts',
      difficulty: 'easy',
      prepTime: 20,
      servings: 4,
      image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=500&h=400&fit=crop',
      description: 'Rich and creamy chocolate mousse made with healthy avocados',
      ingredients: [
        '2 ripe avocados',
        '1/4 cup cocoa powder',
        '1/4 cup maple syrup',
        '2 tbsp almond butter',
        '1 tsp vanilla extract',
        'Pinch of salt',
        'Fresh berries for garnish',
        'Mint leaves'
      ],
      instructions: [
        'Scoop avocado flesh into a food processor',
        'Add cocoa powder, maple syrup, and almond butter',
        'Process until smooth and creamy',
        'Add vanilla and salt, pulse to combine',
        'Chill for at least 2 hours',
        'Serve in glasses with berries and mint'
      ],
      tags: ['healthy', 'vegan', 'chocolate', 'no-bake']
    },
    {
      id: 6,
      title: 'Asian Stir-Fry Bowl',
      category: 'main-dishes',
      difficulty: 'easy',
      prepTime: 25,
      servings: 3,
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&h=400&fit=crop',
      description: 'Quick and flavorful stir-fry with fresh vegetables and sauce',
      ingredients: [
        '2 cups cooked rice',
        '1 broccoli head, florets',
        '1 bell pepper, strips',
        '1 carrot, julienned',
        '1 cup snap peas',
        '2 tbsp soy sauce',
        '1 tbsp sesame oil',
        '1 tsp ginger, grated',
        'Sesame seeds for garnish'
      ],
      instructions: [
        'Heat oil in a large wok or pan',
        'Add ginger and cook for 30 seconds',
        'Add harder vegetables first (broccoli, carrots)',
        'Stir-fry for 3-4 minutes',
        'Add remaining vegetables',
        'Add soy sauce and sesame oil',
        'Serve over rice with sesame seeds'
      ],
      tags: ['asian', 'quick', 'colorful', 'healthy']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Recipes', icon: '🍽️' },
    { id: 'breakfast', name: 'Breakfast', icon: '🌅' },
    { id: 'salads', name: 'Salads', icon: '🥗' },
    { id: 'main-dishes', name: 'Main Dishes', icon: '🍝' },
    { id: 'desserts', name: 'Desserts', icon: '🍰' }
  ];

  const difficulties = [
    { id: 'all', name: 'All Levels' },
    { id: 'easy', name: 'Easy' },
    { id: 'medium', name: 'Medium' },
    { id: 'hard', name: 'Hard' }
  ];

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/recipes`);
      const data = await response.json();
      if (data.length > 0) {
        setRecipes(data);
        setFilteredRecipes(data);
      } else {
        // Fallback to mock data if no recipes in DB
        setRecipes(mockRecipes);
        setFilteredRecipes(mockRecipes);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
      // Fallback to mock data on error
      setRecipes(mockRecipes);
      setFilteredRecipes(mockRecipes);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = recipes;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(recipe => recipe.category === selectedCategory);
    }

    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(recipe => recipe.difficulty === selectedDifficulty);
    }

    if (searchTerm) {
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredRecipes(filtered);
  }, [recipes, selectedCategory, selectedDifficulty, searchTerm]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'var(--success)';
      case 'medium': return 'var(--warning)';
      case 'hard': return 'var(--error)';
      default: return 'var(--gray-500)';
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
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)',
        color: 'white',
        padding: '4rem 5% 2rem',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ marginBottom: '1rem' }}>Fresh Recipes</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '2rem' }}>
            Delicious recipes using fresh ingredients from our store
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '2rem 1rem' }}>
        {/* Filters */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: 'var(--border-radius-lg)',
          boxShadow: 'var(--shadow)',
          marginBottom: '2rem'
        }}>
          {/* Search */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ position: 'relative', maxWidth: '400px' }}>
              <input
                type="text"
                placeholder="Search recipes..."
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
          </div>

          {/* Categories */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`btn ${selectedCategory === category.id ? 'btn-primary' : 'btn-outline'} btn-sm`}
                >
                  {category.icon} {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="form-input"
              style={{ width: 'auto', minWidth: '150px' }}
            >
              {difficulties.map(difficulty => (
                <option key={difficulty.id} value={difficulty.id}>
                  {difficulty.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div style={{ marginBottom: '1rem', color: 'var(--gray-600)' }}>
          Showing {filteredRecipes.length} of {recipes.length} recipes
        </div>

        {/* Recipes Grid */}
        {filteredRecipes.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: 'white',
            borderRadius: 'var(--border-radius-lg)',
            boxShadow: 'var(--shadow)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👨‍🍳</div>
            <h3>No recipes found</h3>
            <p style={{ color: 'var(--gray-600)' }}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {filteredRecipes.map(recipe => (
              <div key={recipe.id} className="card" style={{ height: '100%' }}>
                <div style={{ position: 'relative' }}>
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    background: getDifficultyColor(recipe.difficulty),
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    textTransform: 'capitalize'
                  }}>
                    {recipe.difficulty}
                  </div>
                </div>

                <div className="card-body">
                  <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>
                    {recipe.title}
                  </h3>
                  
                  <p style={{ 
                    color: 'var(--gray-600)', 
                    marginBottom: '1rem',
                    fontSize: '0.875rem',
                    lineHeight: '1.5'
                  }}>
                    {recipe.description}
                  </p>

                  {/* Recipe Info */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '1rem',
                    fontSize: '0.875rem',
                    color: 'var(--gray-600)'
                  }}>
                    <span>⏱️ {recipe.prepTime} min</span>
                    <span>👥 {recipe.servings} servings</span>
                  </div>

                  {/* Tags */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    {recipe.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        style={{
                          background: 'var(--primary)20',
                          color: 'var(--primary)',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: '500'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Ingredients Preview */}
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ 
                      fontWeight: '600', 
                      marginBottom: '0.5rem',
                      fontSize: '0.875rem'
                    }}>
                      Key Ingredients:
                    </div>
                    <div style={{ 
                      fontSize: '0.875rem', 
                      color: 'var(--gray-600)',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {recipe.ingredients.slice(0, 3).join(', ')}
                      {recipe.ingredients.length > 3 && '...'}
                    </div>
                  </div>

                  <button 
                    className="btn btn-primary w-full"
                    onClick={() => setSelectedRecipe(recipe)}
                  >
                    View Full Recipe
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recipe Modal */}
      {selectedRecipe && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{
            background: 'white',
            borderRadius: 'var(--border-radius-lg)',
            maxWidth: '800px',
            maxHeight: '90vh',
            overflow: 'auto',
            position: 'relative'
          }}>
            {/* Close Button */}
            <button
              onClick={() => setSelectedRecipe(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'var(--gray-800)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                fontSize: '1.5rem',
                cursor: 'pointer',
                zIndex: 1001
              }}
            >
              ×
            </button>

            {/* Recipe Header */}
            <div style={{ position: 'relative' }}>
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.title}
                style={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                  borderRadius: 'var(--border-radius-lg) var(--border-radius-lg) 0 0'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: '1rem',
                left: '1rem',
                background: 'rgba(0,0,0,0.8)',
                color: 'white',
                padding: '1rem',
                borderRadius: 'var(--border-radius)'
              }}>
                <h1 style={{ margin: 0, marginBottom: '0.5rem' }}>{selectedRecipe.title}</h1>
                <p style={{ margin: 0, opacity: 0.9 }}>{selectedRecipe.description}</p>
              </div>
            </div>

            <div style={{ padding: '2rem' }}>
              {/* Recipe Info */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '1rem',
                marginBottom: '2rem',
                padding: '1rem',
                background: 'var(--gray-50)',
                borderRadius: 'var(--border-radius)'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⏱️</div>
                  <div style={{ fontWeight: '600' }}>{selectedRecipe.prepTime} min</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>Prep Time</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>👥</div>
                  <div style={{ fontWeight: '600' }}>{selectedRecipe.servings}</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>Servings</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📊</div>
                  <div style={{ 
                    fontWeight: '600',
                    color: getDifficultyColor(selectedRecipe.difficulty),
                    textTransform: 'capitalize'
                  }}>
                    {selectedRecipe.difficulty}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>Difficulty</div>
                </div>
              </div>

              {/* Tags */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem' }}>Tags</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {selectedRecipe.tags.map((tag, index) => (
                    <span
                      key={index}
                      style={{
                        background: 'var(--primary)20',
                        color: 'var(--primary)',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Ingredients */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem' }}>Ingredients</h3>
                <ul style={{ paddingLeft: '1.5rem' }}>
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <li key={index} style={{ marginBottom: '0.5rem', lineHeight: '1.5' }}>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div>
                <h3 style={{ marginBottom: '1rem' }}>Instructions</h3>
                <ol style={{ paddingLeft: '1.5rem' }}>
                  {selectedRecipe.instructions.map((instruction, index) => (
                    <li key={index} style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
                      {instruction}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipes;