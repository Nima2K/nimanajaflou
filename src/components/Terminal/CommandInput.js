import React from "react";

const CommandInput = ({ value, onChange, onSubmit, onKeyDown, inputRef }) => {
  return (
    <form onSubmit={onSubmit} className="cmd-line command-input-container">
      <span className="prompt">&gt; </span>
      <input
        ref={inputRef}
        type="text"
        className="command-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Type 'help' to see available commands"
        autoFocus
      />
    </form>
  );
};

export default CommandInput;
