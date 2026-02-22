import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate categories loading
    const timer = setTimeout(() => {
      setCategoriesLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4 page-animation`}>
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl w-full text-center card-animation">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          🎯 Trivia Quiz App
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Test your knowledge across various topics!
        </p>
        
        {!categoriesLoaded && (
          <div className="bg-purple-50 rounded-lg p-6 mb-8 flex justify-center">
            <div className="spinner"></div>
          </div>
        )}

        {categoriesLoaded && (
          <div className="bg-purple-50 rounded-lg p-6 mb-8 animate-fadeIn">
            <h2 className="text-2xl font-semibold text-purple-800 mb-4">Features</h2>
            <ul className="text-left text-gray-700 space-y-2">
              <li>✅ Multiple quiz categories</li>
              <li>✅ Choose your difficulty level</li>
              <li>✅ Track your progress</li>
              <li>✅ View quiz history</li>
              <li>✅ Search for topics</li>
            </ul>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            to="/quiz-setup"
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg py-3 px-6 md:py-4 md:px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg active:scale-95"
          >
            Start Quiz
          </Link>
          <Link 
            to="/history"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-3 px-6 md:py-4 md:px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg active:scale-95"
          >
            View History
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;