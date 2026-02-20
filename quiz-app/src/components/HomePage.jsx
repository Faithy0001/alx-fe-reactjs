import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl w-full text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
          🎯 Trivia Quiz App
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Test your knowledge across various topics!
        </p>
        
        <div className="bg-purple-50 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">Features</h2>
          <ul className="text-left text-gray-700 space-y-2">
            <li>✅ Multiple quiz categories</li>
            <li>✅ Choose your difficulty level</li>
            <li>✅ Track your progress</li>
            <li>✅ View quiz history</li>
            <li>✅ Search for topics</li>
          </ul>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            to="/quiz-setup"
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xl py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Start Quiz
          </Link>
          <Link 
            to="/history"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            View History
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;