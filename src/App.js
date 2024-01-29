import React, { useState } from 'react';
import { ResultsProvider } from './contexts/ResultsContext'
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { Routes } from './components/Routes';

const App = () => {
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <ResultsProvider>
      <div className={darkTheme ? 'dark' : ''}>
        <div className="dark:bg-gray-900 bg-gray-100 dark:text-gray-200 black min-h-screen">
          <Navbar setDarkTheme={setDarkTheme} darkTheme={darkTheme} />
          <Routes />
          <Footer />
        </div>
      </div>
    </ResultsProvider>
  );
};

export default App