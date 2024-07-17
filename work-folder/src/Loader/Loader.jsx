import React from "react";

const Loader = () => {
  return (
    <>
    <div className="Loader-container">
      <svg className={"loader-svg"} viewBox="25 25 50 50">
        <circle className={"Page-Loader-circle"} r="20" cy="50" cx="50"></circle>
      </svg>
    </div>
    </>
  );
};

export default Loader;
