import React from "react";

function Loader() {
  return (
    <div
      className="spinner-border"
      style={{ width: "5rem", height: "5rem" }}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}

export default Loader;
