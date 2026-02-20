import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCategories } from '../services/triviaService';
import SearchBar from './SearchBar';

function QuizSetup() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load categories. Please try again.');
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleSelectCategory = (category) => {
    if (category) {
      setSelectedCategory(category.id);
    } else {
      setSelectedCategory('');
    }
  };

  const handleStartQuiz = () => {
    if (!selectedCategory || !selectedDifficulty) {
      alert('Please select both category and difficulty');
      return;
    }

    navigate('/quiz', {
      state: {
        category: selectedCategory,
        difficulty: selectedDifficulty,
        amount: numberOfQuestions
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
        <div className="text-white text-2xl">Loading categories...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Setup Your Quiz
          </h1>
          <p className="text-xl text-purple-100">
            Choose your preferences to begin
          </p>
        </div>

        {/* Setup Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">

          {/* Search Bar */}
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-semibold mb-3">
              Search for a Topic
            </label>
            <SearchBar
              categories={categories}
              onSelectCategory={handleSelectCategory}
            />
            {selectedCategory && (
              <p className="mt-2 text-green-600 text-sm font-semibold">
                ✅ Category selected!
              </p>
            )}
          </div>

          {/* OR Divider */}
          <div className="flex items-center mb-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 font-semibold">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Category Dropdown */}
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-semibold mb-3">
              Browse Categories
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-gray-700"
            >
              <option value="">Choose a category...</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Selection */}
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-semibold mb-3">
              Select Difficulty
            </label>
            <div className="grid grid-cols-3 gap-4">
              {['easy', 'medium', 'hard'].map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={`py-3 rounded-lg font-semibold transition-all ${
                    selectedDifficulty === difficulty
                      ? 'bg-purple-600 text-white shadow-lg transform scale-105'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Number of Questions */}
          <div className="mb-8">
            <label className="block text-gray-700 text-lg font-semibold mb-3">
              Number of Questions: {numberOfQuestions}
            </label>
            <input
              type="range"
              min="5"
              max="15"
              step="5"
              value={numberOfQuestions}
              onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>5</span>
              <span>10</span>
              <span>15</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-3 rounded-lg transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleStartQuiz}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-colors"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizSetup;