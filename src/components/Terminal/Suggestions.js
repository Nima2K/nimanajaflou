import React from "react";

const Suggestions = ({ suggestions, activeIndex, onClick, onMouseEnter }) => {
  return (
    <div className="command-suggestions">
      {suggestions.map((suggestion, index) => (
        <div
          key={suggestion.name}
          className={`suggestion-item ${index === activeIndex ? "active" : ""}`}
          onClick={() => onClick(suggestion)}
          onMouseEnter={() => onMouseEnter(index)}
        >
          {suggestion.name} - {suggestion.command}
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
