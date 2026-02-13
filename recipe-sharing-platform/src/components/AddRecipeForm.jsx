import { useState } from 'react';

function AddRecipeForm() {
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    steps: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validate = () => {
    const newErrors = {};

    // Validate title
    if (!formData.title.trim()) {
      newErrors.title = 'Recipe title is required';
    }

    // Validate ingredients
    if (!formData.ingredients.trim()) {
      newErrors.ingredients = 'Ingredients are required';
    } else {
      const ingredientsList = formData.ingredients.split('\n').filter(item => item.trim());
      if (ingredientsList.length < 2) {
        newErrors.ingredients = 'Please add at least 2 ingredients';
      }
    }

    // Validate preparation steps
    if (!formData.steps.trim()) {
      newErrors.steps = 'Preparation steps are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      // Form is valid - process the data
      console.log('Form submitted:', formData);
      
      // Show success message
      setSubmitted(true);
      
      // Reset form
      setFormData({
        title: '',
        ingredients: '',
        steps: ''
      });

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-2">
            Add New Recipe
          </h1>
          <p className="text-center text-gray-600">
            Share your culinary masterpiece with the community
          </p>
        </div>

        {/* Success Message */}
        {submitted && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> Your recipe has been added successfully.</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 md:p-8">
          
          {/* Recipe Title */}
          <div className="mb-6">
            <label 
              htmlFor="title" 
              className="block text-gray-700 text-lg font-semibold mb-2"
            >
              Recipe Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                errors.title 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="e.g., Grandma's Apple Pie"
            />
            {errors.title && (
              <p className="mt-2 text-red-600 text-sm">{errors.title}</p>
            )}
          </div>

          {/* Ingredients */}
          <div className="mb-6">
            <label 
              htmlFor="ingredients" 
              className="block text-gray-700 text-lg font-semibold mb-2"
            >
              Ingredients
            </label>
            <p className="text-sm text-gray-500 mb-2">
              Enter each ingredient on a new line (minimum 2 ingredients)
            </p>
            <textarea
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              rows="6"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                errors.ingredients 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="2 cups flour&#10;1 cup sugar&#10;3 eggs&#10;1 tsp vanilla extract"
            />
            {errors.ingredients && (
              <p className="mt-2 text-red-600 text-sm">{errors.ingredients}</p>
            )}
          </div>

          {/* Preparation Steps */}
          <div className="mb-6">
            <label 
              htmlFor="steps" 
              className="block text-gray-700 text-lg font-semibold mb-2"
            >
              Preparation Steps
            </label>
            <p className="text-sm text-gray-500 mb-2">
              Describe the cooking process step by step
            </p>
            <textarea
              id="steps"
              name="steps"
              value={formData.steps}
              onChange={handleChange}
              rows="8"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                errors.steps 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="1. Preheat oven to 350°F&#10;2. Mix dry ingredients...&#10;3. Add wet ingredients..."
            />
            {errors.steps && (
              <p className="mt-2 text-red-600 text-sm">{errors.steps}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit Recipe
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData({ title: '', ingredients: '', steps: '' });
                setErrors({});
              }}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-3 px-6 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Clear Form
            </button>
          </div>
        </form>

        {/* Helpful Tips */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            Tips for a Great Recipe
          </h3>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Be specific with measurements and cooking times</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>List ingredients in the order they're used</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Break down complex steps into simple instructions</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Include cooking temperature and time when relevant</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AddRecipeForm;