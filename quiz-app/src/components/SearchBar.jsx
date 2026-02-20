import { useState } from 'react';

function SearchBar({ categories, onSelectCategory }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Filter categories based on search term
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  const handleSelect = (category) => {
    onSelectCategory(category);
    setSearchTerm(category.name);
    setIsOpen(false);
  };

  const handleClear = () => {
    setSearchTerm('');
    setIsOpen(false);
    onSelectCategory(null);
  };

  return (
    <div className="relative w-full">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          onFocus={() => setIsOpen(true)}
          placeholder="Search for a quiz topic..."
          className="w-full px-4 py-3 pl-10 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 text-gray-700"
        />
        {/* Search Icon */}
        <span className="absolute left-3 top-3.5 text-gray-400">🔍</span>

        {/* Clear Button */}
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      {isOpen && searchTerm && (
        <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-xl mt-1 max-h-60 overflow-y-auto">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleSelect(category)}
                className="w-full text-left px-4 py-3 hover:bg-purple-50 hover:text-purple-700 transition-colors border-b border-gray-100 last:border-none"
              >
                {category.name}
              </button>
            ))
          ) : (
            <div className="px-4 py-6 text-center text-gray-500">
              <p className="text-lg">😕 No topics found</p>
              <p className="text-sm mt-1">Try searching for something else</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;