import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import BlogPost from './components/BlogPost';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link> | 
          <Link to="/profile">Profile</Link> | 
          <Link to="/blog/1">Blog Post 1</Link> | 
          <Link to="/blog/2">Blog Post 2</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route 
            path="/profile/*" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="/blog/:id" element={<BlogPost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;