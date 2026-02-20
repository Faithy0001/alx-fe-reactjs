import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { decodeHTML } from '../services/triviaService';

function ScoreSummary() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Save quiz result to localStorage
    if (location.state) {
      const { answers, totalQuestions } = location.state;
      const correctAnswers = answers.filter(answer => answer.isCorrect).length;

      // Get category and difficulty from first answer's question
      const quizResult = {
        id: Date.now(),
        category: answers[0]?.question ? 'Quiz' : 'General',
        difficulty: 'mixed',
        score: correctAnswers,
        totalQuestions: totalQuestions,
        date: new Date().toLocaleDateString()
      };

      // Get existing history
      const existingHistory = JSON.parse(localStorage.getItem('quizHistory') || '[]');
      
      // Add new result
      const updatedHistory = [quizResult, ...existingHistory];
      
      // Keep only last 20 results
      const limitedHistory = updatedHistory.slice(0, 20);
      
      // Save to localStorage
      localStorage.setItem('quizHistory', JSON.stringify(limitedHistory));
    }
  }, [location.state]);

  if (!location.state) {
    navigate('/');
    return null;
  }

  const { answers, totalQuestions } = location.state;
  const correctAnswers = answers.filter(answer => answer.isCorrect).length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  const getScoreMessage = () => {
    if (percentage >= 80) return { text: "Excellent! 🎉", color: "text-green-600" };
    if (percentage >= 60) return { text: "Good Job! 👍", color: "text-blue-600" };
    if (percentage >= 40) return { text: "Not Bad! 😊", color: "text-yellow-600" };
    return { text: "Keep Practicing! 💪", color: "text-red-600" };
  };

  const scoreMessage = getScoreMessage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Score Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Quiz Complete!</h1>
            <p className={`text-3xl font-bold ${scoreMessage.color}`}>{scoreMessage.text}</p>
          </div>

          {/* Score Display */}
          <div className="flex justify-center items-center mb-8">
            <div className="relative">
              <svg className="w-48 h-48 transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="#E5E7EB"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="#9333EA"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 88}`}
                  strokeDashoffset={`${2 * Math.PI * 88 * (1 - percentage / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold text-purple-600">{percentage}%</span>
                <span className="text-gray-600 text-lg">{correctAnswers}/{totalQuestions}</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-green-600">{correctAnswers}</p>
              <p className="text-sm text-gray-600">Correct</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-red-600">{totalQuestions - correctAnswers}</p>
              <p className="text-sm text-gray-600">Incorrect</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-blue-600">{totalQuestions}</p>
              <p className="text-sm text-gray-600">Total</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate('/quiz-setup')}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-colors"
            >
              Take Another Quiz
            </button>
            <button
              onClick={() => navigate('/history')}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors"
            >
              View History
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-3 rounded-lg transition-colors"
            >
              Home
            </button>
          </div>
        </div>

        {/* Answer Review */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Review Your Answers</h2>
          
          <div className="space-y-4">
            {answers.map((answer, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 ${
                  answer.isCorrect
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-800 flex-1">
                    {index + 1}. {decodeHTML(answer.question)}
                  </h3>
                  <span className={`ml-4 font-bold ${
                    answer.isCorrect ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {answer.isCorrect ? '✓ Correct' : '✗ Wrong'}
                  </span>
                </div>
                
                <div className="space-y-1 text-sm">
                  <p className="text-gray-700">
                    <span className="font-semibold">Your answer:</span>{' '}
                    <span className={answer.isCorrect ? 'text-green-600' : 'text-red-600'}>
                      {decodeHTML(answer.selectedAnswer)}
                    </span>
                  </p>
                  
                  {!answer.isCorrect && (
                    <p className="text-gray-700">
                      <span className="font-semibold">Correct answer:</span>{' '}
                      <span className="text-green-600">
                        {decodeHTML(answer.correctAnswer)}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScoreSummary;