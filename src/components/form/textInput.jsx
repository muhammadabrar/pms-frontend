import React from "react";

const TextInput = ({ size, label, placeholder, error, helper }) => {
  return (
    <>
      <label
        for="large-input"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        type="text"
        id="large-input"
        className={`input ${size? size: null} ${error? "err": null}`}
        placeholder={placeholder}
      />
      {helper? <p className="text-sm px-3 py-1">{helper}</p>: null}
    </>
  );
};

export default TextInput;
