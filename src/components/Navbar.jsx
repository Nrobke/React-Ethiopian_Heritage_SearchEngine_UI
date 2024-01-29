import React from 'react'
import { Link } from 'react-router-dom';
import {Search } from './Search';
import { useResultsContext } from '../contexts/ResultsContext';

export const Navbar = ({ setDarkTheme, darkTheme }) => {
  const { hasResults } = useResultsContext();

  return (
    <div className="p-5 pb-0 box-border flex flex-wrap sm:justify-between justify-center items-center border-b dark:border-gray-700 border-gray-200 shadow-sm">
       <div className="flex justify-between items-center space-x-5 w-screen">
        <Link to="/">
          { hasResults && (
            <h3 className="text-2xl font-bold text-white py-1 px-2 rounded">
            <span className="text-blue-600">Cultural</span>
            <span className="text-green-600">Heritages</span>
            <span className="text-blue-500">Search</span>
            <span className="text-green-600">Engine</span> 
          </h3>
            )           
          } 
        </Link>
        <button type="button" onClick={() => setDarkTheme(!darkTheme)} className="text-xl dark:bg-gray-50 dark:text-gray-900 bg-white border rounded-full px-2 py-1 hover:shadow-lg">{darkTheme ? '💡 Light' : '🌙 Dark'}</button>
       </div>
       <div className={`flex items-center justify-center ${!hasResults ? 'mt-60 w-3/4 dark:border-gray-700 border-gray-200 shadow-sm' : 'w-2/4'}`}>
         <Search />
       </div>
    </div>
  )
}
