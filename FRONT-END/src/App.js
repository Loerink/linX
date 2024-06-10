import { useEffect, useState } from 'react';

function App() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100); // Delay to allow CSS to apply initial state
  }, []);

  return (
    <div className="text-white text-center p-4">
      <header className={`flex justify-between items-center p-6 fade-in ${show && 'show'}`}>
        <div className="text-2xl font-bold">linX</div>
        <nav>
          <a href="#features" className="text-lg mx-4">Features</a>
          <a href="#pricing" className="text-lg mx-4">Pricing</a>
          <a href="#contact" className="text-lg mx-4">Contact</a>
        </nav>
      </header>

      <main className={`mt-12 slide-up ${show && 'show'}`}>
        <h1 className="text-5xl font-bold mb-4">Welcome to linX</h1>
        <p className="text-2xl mb-8">A modern approach to your projects</p>
        <p className="text-xl leading-relaxed max-w-3xl mx-auto mb-12">
          Explore the capabilities of our platform to enhance your productivity and streamline your workflow.
        </p>
        <a href="/signup" className="text-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Get Started
        </a>
      </main>

      <section id="features" className={`mt-20 slide-up ${show && 'show'}`}>
        <h2 className="text-4xl font-bold mb-8">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-800 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Feature One</h3>
            <p className="text-lg">Description of feature one.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Feature Two</h3>
            <p className="text-lg">Description of feature two.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Feature Three</h3>
            <p className="text-lg">Description of feature three.</p>
          </div>
        </div>
      </section>

      <footer className={`mt-20 p-6 bg-gray-900 fade-in ${show && 'show'}`}>
        <p className="text-lg">&copy; 2024 linX. All rights reserved.</p>
        <nav className="mt-4">
          <a href="#features" className="text-lg mx-4">Features</a>
          <a href="#pricing" className="text-lg mx-4">Pricing</a>
          <a href="#contact" className="text-lg mx-4">Contact</a>
        </nav>
      </footer>
    </div>
  );
}

export default App;