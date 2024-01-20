import React, { createContext, useContext, useState } from "react";
import  ErrorDisplay  from "../components/ErrorDispaly";

const StateContext = createContext();
const baseUrl = 'https://localhost:7195/api/Query/query-processor';

export const StateContextProvider = ({ children }) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);


    const getResults = async (term) => {
      setLoading(true);

      try {
          const response = await fetch(`${baseUrl}${term}`, {
              method: 'GET'
          });

          const resObj = await response.json();

          if (resObj.success === false) {
              throw new Error(`Error: ${resObj.message}`);
          }

          setResults(resObj.data);
          setError(null);
      } catch (error) {
          setError(`${error}`);
      } finally {
          setLoading(false);
      }
  }

  const closeError = () => {
      setError(null);
  };

    return (
      <div>
          {error && <ErrorDisplay error={error} onClose={closeError} />}
          <StateContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, loading, error }}>
              {children}
          </StateContext.Provider>
      </div>
  );
}

export const useStateContext = () => useContext(StateContext);