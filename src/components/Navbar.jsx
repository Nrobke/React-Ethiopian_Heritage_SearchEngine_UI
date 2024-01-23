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
            <p className="text-2xl bg-blue-500 font-bold text-white py-1 px-2 rounded dark:bg-gray-50 dark:text-gray-900">
                🔎
            </p>
        </Link>
        <button type="button" onClick={() => setDarkTheme(!darkTheme)} className="text-xl dark:bg-gray-50 dark:text-gray-900 bg-white border rounded-full px-2 py-1 hover:shadow-lg">{darkTheme ? '💡 Light' : '🌙 Dark'}</button>
       </div>
       <div className={`flex items-center justify-center w-3/4 ${!hasResults ? 'mt-60 w-3/4 dark:border-gray-700 border-gray-200 shadow-sm' : ''}`}>
         <Search />
       </div>
    </div>
  )
}
