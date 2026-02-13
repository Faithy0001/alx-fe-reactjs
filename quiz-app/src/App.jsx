import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import TestAPI from './components/TestAPI';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test-api" element={<TestAPI />} />
      </Routes>
    </Router>
  );
}

export default App;