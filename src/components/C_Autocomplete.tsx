import React, { useState } from 'react';

const C_Autocomplete: React.FC<{ options: string[] }> = ({ options }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);
    const filteredOptions = options.filter(option =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filteredOptions);
  };

  const handleOptionClick = (option: string) => {
    setInputValue(option);
    setFilteredOptions([]);
  };

  return (
    <div className="relative overflow-visible">
      <input
        type="text"
        className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type something..."
      />
      {filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1">
          {filteredOptions.map(option => (
            <li
              key={option}
              className="py-1 px-4 text-black cursor-pointer hover:bg-gray-100"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default C_Autocomplete;