import { useState } from 'react';
import PostsComponent from './components/PostsComponent';

function App() {
  const [showPosts, setShowPosts] = useState(true);

  return (
    <div className="App">
      <h1>React Query Demo</h1>
      <button onClick={() => setShowPosts(!showPosts)}>
        {showPosts ? 'Hide Posts' : 'Show Posts'}
      </button>
      {showPosts && <PostsComponent />}
    </div>
  );
}

export default App;