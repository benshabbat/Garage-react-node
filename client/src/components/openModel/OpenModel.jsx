import "./openModel.css";
import React from "react";

const OpenModel = ({ comp = null, isOpen = false }) => {
  return (
    isOpen && (
      <div className="open-model-background">
        <div className="open-model-container">{comp} </div>
      </div>
    )
  );
};

export default OpenModel;
