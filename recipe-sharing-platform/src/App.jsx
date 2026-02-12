function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl">
        <h1 className="text-5xl font-bold text-blue-600 mb-4">
          Recipe Sharing Platform 🍳
        </h1>
        <p className="text-xl text-gray-700 mb-6">
          Tailwind CSS is working perfectly!
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default App;