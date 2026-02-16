import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import TestAPI from './components/TestAPI';
import QuizSetup from './components/QuizSetup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test-api" element={<TestAPI />} />
        <Route path="/quiz-setup" element={<QuizSetup />} />
      </Routes>
    </Router>
  );
}

export default App;