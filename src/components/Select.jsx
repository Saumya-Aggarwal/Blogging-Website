import React, { useId } from "react";

function Select({ options, label, className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="w-100">
      {label && <label htmlFor="id"> {label} </label>}
      <select
        name="Status"
        id="id"
        aria-label="Default select example"
        {...props}
        ref={ref}
        className={`form-select ${className}`}
      >
        {options?.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
