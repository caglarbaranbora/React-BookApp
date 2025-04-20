import React from "react";
import "../styles/LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="cyber-spinner">
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
      </div>
      <p className="loading-text">Yükleniyor...</p>
    </div>
  );
};

export default LoadingSpinner;
