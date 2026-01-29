import Search from './components/Search';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          GitHub User Search Application
        </h1>
        <Search />
      </div>
    </div>
  );
}

export default App;