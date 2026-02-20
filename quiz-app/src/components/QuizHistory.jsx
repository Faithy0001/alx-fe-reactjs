import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function QuizHistory() {
  const [quizHistory, setQuizHistory] = useState([]);

  useEffect(() => {
    // Load quiz history from localStorage
    const savedHistory = localStorage.getItem('quizHistory');
    if (savedHistory) {
      setQuizHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all quiz history?')) {
      localStorage.removeItem('quizHistory');
      setQuizHistory([]);
    }
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600 bg-green-50';
    if (percentage >= 60) return 'text-blue-600 bg-blue-50';
    if (percentage >= 40) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  if (quizHistory.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Quiz History</h1>
            <div className="my-12">
              <p className="text-6xl mb-4">📝</p>
              <p className="text-xl text-gray-600 mb-8">No quiz history yet!</p>
              <p className="text-gray-500 mb-8">Take a quiz to see your results here</p>
              <Link
                to="/quiz-setup"
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
              >
                Take Your First Quiz
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Quiz History</h1>
              <p className="text-gray-600">You've completed {quizHistory.length} quiz{quizHistory.length !== 1 ? 'zes' : ''}</p>
            </div>
            <button
              onClick={handleClearHistory}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              Clear History
            </button>
          </div>
        </div>

        {/* Quiz Cards */}
        <div className="space-y-4">
          {quizHistory.map((quiz) => {
            const percentage = Math.round((quiz.score / quiz.totalQuestions) * 100);
            const scoreColorClass = getScoreColor(percentage);

            return (
              <div
                key={quiz.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  
                  {/* Quiz Info */}
                  <div className="flex-1 mb-4 md:mb-0">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{quiz.category}</h3>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-semibold">
                        {quiz.difficulty}
                      </span>
                      <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
                        {quiz.totalQuestions} questions
                      </span>
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                        {quiz.date}
                      </span>
                    </div>
                  </div>

                  {/* Score Display */}
                  <div className={`${scoreColorClass} rounded-lg p-4 text-center min-w-[120px]`}>
                    <p className="text-3xl font-bold">{percentage}%</p>
                    <p className="text-sm font-semibold">{quiz.score}/{quiz.totalQuestions}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-block bg-white hover:bg-gray-100 text-purple-600 font-bold py-3 px-8 rounded-lg transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default QuizHistory;