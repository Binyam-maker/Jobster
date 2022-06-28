import React from "react";

const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        type={type}
        className="form-input"
      />
    </div>
  );
};

export default FormRow;
