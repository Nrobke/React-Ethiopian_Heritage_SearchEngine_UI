import React, { useEffect, useState } from 'react';
import { useStateContext } from '../contexts/StateContextProvider';
import { Loading } from './Loading';
import { useResultsContext } from '../contexts/ResultsContext';

export const Results = () => {
  const { results, loading, getResults, searchTerm } = useStateContext();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 
  const { updateResults } = useResultsContext(); 

  useEffect(() => {
    if(searchTerm){
      getResults(`?query=${searchTerm}`);
    }    
  }, [searchTerm]);

  const totalPages = Math.ceil(results.length / itemsPerPage);

  const paginatedResults = results.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleExplorePopular = () => {
    // Logic to handle exploring popular queries
    // For example, redirect to a page with popular queries or update the search term
  };

  if (loading) return <Loading />;

  updateResults(results);

  return (
    <div className="sm:px-56 flex flex-col space-y-6">
      {paginatedResults && paginatedResults.length > 0 ? (
        paginatedResults.map((item, index) => (
          <div key={index} className="md:w-3/5 w-full">
            <a href={item.link} target="_blank" rel="noreferrer">
              <p className="text-sm text-green-700 dark:text-green-400">
                {item.link
                  ? item.link.length > 30
                    ? item.link.substring(0, 30)
                    : item.link
                  : 'Can not find the link'}
              </p>
              <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                {item.title || 'No search result'}
              </p>
              <p className="text-base">{item.description || 'No Description'}</p>
            </a>
            {/* <p className="text-base text-gray-500 mt-1">
                {item.conceptDesc || 'No Concept Description'}
            </p> */}
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center mt-8">
          <p className="text-lg text-base mb-4">
            {searchTerm
              ? "No matching results found. Try refining your search."
              : ""}
          </p>
          {searchTerm && (
            <p className="text-md text-gray-500">
              You can try different keywords or check your spelling.
            </p>
          )}
          {/* <button
            onClick={handleExplorePopular}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600"
          >
            Explore popular queries
          </button> */}
          {/* You can add more interactive elements or tips based on your application's context */}
        </div>

      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="mx-2 px-3 py-1 bg-gray-300 rounded-md dark:text-black"
          >
            Prev
          </button>
          <span className="mx-2">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="mx-2 px-3 py-1 bg-gray-300 rounded-md dark:text-black"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
