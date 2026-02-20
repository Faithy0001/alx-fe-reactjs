import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import TestAPI from './components/TestAPI';
import QuizSetup from './components/QuizSetup';
import QuizPage from './components/QuizPage';
import ScoreSummary from './components/ScoreSummary';
import QuizHistory from './components/QuizHistory';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test-api" element={<TestAPI />} />
        <Route path="/quiz-setup" element={<QuizSetup />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/results" element={<ScoreSummary />} />
        <Route path="/history" element={<QuizHistory />} />
      </Routes>
    </Router>
  );
}

export default App;