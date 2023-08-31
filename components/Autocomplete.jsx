import React, { useState } from "react";

const Autocomplete = ({ values }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  // console.log("suggestions", suggestions);
  // console.log("selectedCountries", selectedCountries);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);

    const filteredSuggestions = values.filter((value) =>
      value.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    // Add the suggestion to the top of the search component
    if (!selectedCountries.includes(suggestion)) {
      const updatedSelectedCountries = [...selectedCountries, suggestion];
      setSelectedCountries(updatedSelectedCountries);
    }

    setInputValue("");
    setSuggestions([]);
  };

  const removeCountry = (country) => {
    if (selectedCountries.includes(country)) {
      const filteredCountries = selectedCountries.filter(
        (item) => item !== country
      );
      setSelectedCountries(filteredCountries);
    }
  };

  return (
    <div className="mb-20">
      <h1 className="text-3xl">Countries filter</h1>
      <div className="mb-4">
        {selectedCountries.map((country) => (
          <span className="p-1 rounded-md border-[1px] mr-1">
            {country} <span onClick={() => removeCountry(country)}>x</span>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type to search..."
        className="border rounded px-2 py-1"
      />
      <ul className="border border-gray-300 rounded mt-1 p-2">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            className="cursor-pointer hover:bg-gray-100 p-1"
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion}
          </li>
        ))}
      </ul>
      <div className="h-[20vh]"></div>
    </div>
  );
};

export default Autocomplete;
