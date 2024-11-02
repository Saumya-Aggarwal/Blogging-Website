import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className, ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-100">
      {label && (
        <label className=" form-label" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`form-control ${className}`}
        id={id}
        ref={ref}
        {...props}
      />
    </div>
  );
});

export default Input;
