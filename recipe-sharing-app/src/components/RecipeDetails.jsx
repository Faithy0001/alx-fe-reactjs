import { useParams, useNavigate } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';
import { useState } from 'react';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = useRecipeStore((state) =>
    state.recipes.find((recipe) => recipe.id === parseInt(id))
  );
  const [isEditing, setIsEditing] = useState(false);
  const favorites = useRecipeStore((state) => state.favorites);
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);

  if (!recipe) {
    return (
      <div>
        <h2>Recipe Not Found</h2>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  const isFavorite = favorites.includes(recipe.id);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe.id);
    }
  };

  const handleDelete = () => {
    navigate('/');
  };

  return (
    <div style={{ padding: '20px' }}>
      {!isEditing ? (
        <>
          <h1>{recipe.title}</h1>
          <p>{recipe.description}</p>
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={() => setIsEditing(true)}
              style={{ marginRight: '10px', padding: '10px 20px', cursor: 'pointer' }}
            >
              Edit Recipe
            </button>
            <button
              onClick={handleFavoriteToggle}
              style={{ marginRight: '10px', padding: '10px 20px', cursor: 'pointer' }}
            >
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
            <DeleteRecipeButton recipeId={recipe.id} onDelete={handleDelete} />
            <button
              onClick={() => navigate('/')}
              style={{ marginLeft: '10px', padding: '10px 20px', cursor: 'pointer' }}
            >
              Back to Home
            </button>
          </div>
        </>
      ) : (
        <EditRecipeForm recipe={recipe} onCancel={() => setIsEditing(false)} />
      )}
    </div>
  );
};

export default RecipeDetails;
