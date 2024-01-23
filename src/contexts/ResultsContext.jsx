import React, { createContext, useContext, useState } from 'react';

const ResultsContext = createContext();

export const ResultsProvider = ({ children }) => {
    const [hasResults, setHasResults] = useState(false);

    const updateResults = (newResults) => {
        setHasResults(newResults && newResults.length > 0);
    };

    return (
        <ResultsContext.Provider value={{ hasResults, updateResults }}>
            {children}
        </ResultsContext.Provider>
    );
};

export const useResultsContext = () => useContext(ResultsContext);