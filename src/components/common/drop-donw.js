import React from "react";

const Dropdown = ({
  name,
  label,
  selectedItemKey,
  data,
  keyProperty,
  valueProperty,
  error,
  onChange
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        className="form-control"
        name={name}
        id={name}
        value={selectedItemKey}
        onChange={onChange}
      >
        <option key="empty" value="">- Select -</option>
        {data.map(item => (
          <option key={item[keyProperty]} value={item[keyProperty]}>
            {item[valueProperty]}
          </option>
        ))}
      </select>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
