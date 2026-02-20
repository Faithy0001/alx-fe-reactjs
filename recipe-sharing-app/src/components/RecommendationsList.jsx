import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const RecommendationsList = () => {
  const recommendations = useRecipeStore((state) => state.recommendations);
  const generateRecommendations = useRecipeStore((state) => state.generateRecommendations);
  const favorites = useRecipeStore((state) => state.favorites);

  useEffect(() => {
    // Generate recommendations when favorites change
    if (favorites.length > 0) {
      generateRecommendations();
    }
  }, [favorites, generateRecommendations]);

  return (
    <div style={{ marginTop: '30px' }}>
      <h2>Recommended for You</h2>
      {recommendations.length === 0 ? (
        <p>Add some favorites to get personalized recommendations!</p>
      ) : (
        recommendations.map((recipe) => (
          <div key={recipe.id} style={{ border: '1px solid #28a745', padding: '10px', margin: '10px 0', backgroundColor: '#e8f5e9' }}>
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

export default RecommendationsList;
