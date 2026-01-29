import { useState } from 'react';
import { fetchAdvancedUserData } from '../services/githubService';

function Search() {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setUsers([]);

    try {
      const data = await fetchAdvancedUserData(username, location, minRepos);
      setUsers(data.items);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Advanced GitHub User Search</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
            Location
          </label>
          <input
            id="location"
            type="text"
            placeholder="e.g., San Francisco"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="minRepos">
            Minimum Repositories
          </label>
          <input
            id="minRepos"
            type="number"
            placeholder="e.g., 10"
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <button 
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center text-gray-600">Loading...</p>}
      
      {error && <p className="text-center text-red-600">Looks like we cant find the user</p>}
      
      {users.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div key={user.id} className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow">
              <img 
                src={user.avatar_url} 
                alt={user.login} 
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-center mb-2">{user.login}</h3>
              {user.location && (
                <p className="text-gray-600 text-center text-sm mb-2">📍 {user.location}</p>
              )}
              <a 
                href={user.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-center text-blue-500 hover:text-blue-700 font-medium"
              >
                View Profile
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;