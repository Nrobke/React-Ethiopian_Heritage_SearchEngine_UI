import React from "react";

const ErrorDisplay = ({ error, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-red-500 text-white p-4 rounded-md shadow-md mt-16">
        <p className="text-lg">{error}</p>
        <button
          onClick={onClose}
          className="mt-2 bg-white text-red-500 px-4 py-2 rounded-md hover:bg-red-100"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorDisplay;
