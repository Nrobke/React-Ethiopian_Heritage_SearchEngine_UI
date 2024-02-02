import React, { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useHistory } from 'react-router-dom';

import { useStateContext } from '../contexts/StateContextProvider';
import { useResultsContext } from '../contexts/ResultsContext';
import { Links } from './Links';

export const Search = () => {
  const { setSearchTerm } = useStateContext();
  const [text, setText] = useState('');
  const [isEnterPressed, setIsEnterPressed] = useState(false);
  const [debouncedValue] = useDebounce(text, 300);
  const history = useHistory();
  const { hasResults } = useResultsContext();

  useEffect(() => {
    if (isEnterPressed && debouncedValue) {
      setSearchTerm(debouncedValue);
    }
  }, [debouncedValue, setSearchTerm, isEnterPressed]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setIsEnterPressed(true);
      history.push('/');
    }
  };

  const handleOnClick = () => {
    setIsEnterPressed(true);
    history.push('/');
  };


  const clearSearch = () => {
    setText('');
    setSearchTerm(''); // Clear the search term as well
    setIsEnterPressed(false);
  };

  return (
    <div className="relative sm:ml-48 md:ml-72 sm:-mt-10 mt-3">
      {hasResults ? (
        <>
          <div className="inline-block">
            <input
              value={text}
              type="text"
              className="sm:w-96 w-80 h-10 dark:bg-gray-200 border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg ml-2"
              placeholder="Search cultural heritages"
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            {text !== '' && (
              <button type="button" className="relative right-10 text-2xl text-gray-500" onClick={clearSearch}>
                x
              </button>
            )}
            <button type="button" className="text-lg p-2 bg-gray-200 text-white rounded dark:bg-gray-800 hover:bg-blue-500 dark:hover:bg-blue-200" onClick={handleOnClick}>
             🔎
           </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-10 ml-6 font-serif">
            <span className="text-blue-600 dark:text-blue-500">Cultural</span>
            <span className="text-blue-600 dark:text-blue-500">Heritages</span>
            <span className="text-green-600 dark:text-green-500">Search</span>
            <span className="text-green-600 dark:text-green-500">Engine</span>
          </h1>
          <input
            value={text}
            type="text"
            className="sm:w-96 w-80 h-10 dark:bg-gray-200 border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg ml-12"
            placeholder="Search cultural heritages"
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          {text !== '' && (
            <button type="button" className="relative right-10 text-2xl text-gray-500" onClick={clearSearch}>
              x
            </button>
          )}
           <button type="button" className="text-lg p-2 bg-gray-200 text-white rounded dark:bg-gray-800 hover:bg-blue-500 dark:hover:bg-blue-200" onClick={handleOnClick}>
            🔎
           </button>
        </>
      )}
      <Links />
    </div>
  );
};
