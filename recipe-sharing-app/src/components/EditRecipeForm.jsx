import { useState } from 'react';
import useRecipeStore from './recipeStore';

const EditRecipeForm = ({ recipe, onCancel }) => {
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title.trim() && description.trim()) {
      updateRecipe({ ...recipe, title, description });
      onCancel(); // Close the edit form after updating
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '20px 0' }}>
      <h2>Edit Recipe</h2>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Recipe Title"
          style={{ width: '100%', padding: '8px' }}
          required
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Recipe Description"
          style={{ width: '100%', padding: '8px', minHeight: '100px' }}
          required
        />
      </div>
      <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer', marginRight: '10px' }}>
        Update Recipe
      </button>
      <button type="button" onClick={onCancel} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Cancel
      </button>
    </form>
  );
};

export default EditRecipeForm;
