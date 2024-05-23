import React from "react";
import { Rings } from "react-loader-spinner";
const Loading = () => {
  return (
    <div className="loading-container">
      <Rings
        height="100"
        width="100"
        color="#1877f2"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
      <div className="loading-text">Loading data ...</div>
    </div>
  );
};

export default Loading;
