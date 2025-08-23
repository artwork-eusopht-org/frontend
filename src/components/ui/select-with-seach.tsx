import React, { useState, useEffect, useRef } from "react";

const ComboBox = ({ options = [], value = "", onChange, placeholder = "Select..." }) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    // Update input if parent sets value
    if (value) {
      const selected = options.find((opt) => String(opt.value) === String(value));
      setInputValue(selected ? selected.label : "");
    }
  }, [value, options]);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="relative w-64" ref={wrapperRef}>
      {/* Input field (acts as select + search) */}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setOpen(true);
        }}
        onClick={() => setOpen(true)}
        placeholder={placeholder}
        className="w-full border rounded-md px-3 py-2 text-sm text-gray-700 bg-white shadow-sm outline-none"
      />

      {/* Dropdown */}
      {open && (
        <div className="absolute w-full mt-1 border rounded-md bg-white shadow-lg z-10">
          <ul className="max-h-40 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <li
                  key={opt.value}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setInputValue(opt.label);
                    onChange(opt.value);
                    setOpen(false);
                  }}
                >
                  {opt.label}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ComboBox;
