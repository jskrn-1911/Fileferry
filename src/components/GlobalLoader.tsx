import React from "react";

const GlobalLoader: React.FC = () => {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        {/* <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white border-solid"></div> */}
      <div className="loading-wave">
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
      </div>
      </div>
    </>
  );
};

export default GlobalLoader;
