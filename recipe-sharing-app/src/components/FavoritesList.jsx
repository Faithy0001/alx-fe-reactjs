import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const FavoritesList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const favorites = useRecipeStore((state) => state.favorites);

  const favoriteRecipes = favorites.map((id) =>
    recipes.find((recipe) => recipe.id === id)
  ).filter(Boolean); // Filter out any undefined values

  return (
    <div style={{ marginTop: '30px' }}>
      <h2>My Favorites</h2>
      {favoriteRecipes.length === 0 ? (
        <p>No favorite recipes yet. Start adding some!</p>
      ) : (
        favoriteRecipes.map((recipe) => (
          <div key={recipe.id} style={{ border: '1px solid #ffc107', padding: '10px', margin: '10px 0', backgroundColor: '#fff9e6' }}>
            <h3>
              <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
            </h3>
            <p>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default FavoritesList;
