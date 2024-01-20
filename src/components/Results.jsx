import React, { useEffect, useState } from 'react';
import { useStateContext } from '../contexts/StateContextProvider';
import { Loading } from './Loading';

export const Results = () => {
  const { results, loading, getResults, searchTerm } = useStateContext();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust as needed

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

  if (loading) return <Loading />;

  return (
    <div className="sm:px-56 flex flex-col space-y-6">
      {paginatedResults && paginatedResults.length > 0 ? (
        paginatedResults.map((item, index) => (
          <div key={index} className="md:w-3/5 w-full">
            <a href={item.link} target="_blank" rel="noreferrer">
              <p className="text-sm">
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
              <p className="text-base">
                {item.conceptDesc || 'No Concept Description'}
              </p>
            </a>
          </div>
        ))
      ) : (
        <p className="text-base">No search result</p>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="mx-2 px-3 py-1 bg-gray-300 rounded-md"
          >
            Prev
          </button>
          <span className="mx-2">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="mx-2 px-3 py-1 bg-gray-300 rounded-md"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
