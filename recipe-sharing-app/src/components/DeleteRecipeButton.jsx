import { useNavigate } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const DeleteRecipeButton = ({ recipeId, onDelete }) => {
  const navigate = useNavigate();
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipe(recipeId);
      if (onDelete) {
        onDelete();
      } else {
        navigate('/');
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      style={{
        padding: '10px 20px',
        cursor: 'pointer',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '4px'
      }}
    >
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;
