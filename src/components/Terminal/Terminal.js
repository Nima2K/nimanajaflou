import React, { useState, useRef, useEffect } from "react";
import "./Terminal.css";
import CommandInput from "./CommandInput";
import CommandHistory from "./CommandHistory";
import Suggestions from "./Suggestions";
import AVAILABLE_COMMANDS from "../../config/commands";

const Terminal = ({ initialCommand }) => {
  const [commandHistory, setCommandHistory] = useState([initialCommand]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [availableCommands, setAvailableCommands] =
    useState(AVAILABLE_COMMANDS);
  const inputRef = useRef(null);

  // Limit the number of commands in history to keep UI clean
  const MAX_COMMAND_HISTORY = 10;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Effect to limit command history length
  useEffect(() => {
    if (commandHistory.length > MAX_COMMAND_HISTORY) {
      // Keep the first entry (initial console.log) and most recent commands
      setCommandHistory((prev) => [
        prev[0],
        ...prev.slice(prev.length - MAX_COMMAND_HISTORY + 1),
      ]);
    }
  }, [commandHistory.length]);

  const handleCommandChange = (value) => {
    setCurrentCommand(value);

    // Filter suggestions from available commands
    const filteredSuggestions = availableCommands.filter(
      (cmd) =>
        cmd.name.toLowerCase().includes(value.toLowerCase()) ||
        cmd.command.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
    setActiveSuggestionIndex(-1);
  };

  const handleCommandSubmit = (e) => {
    e.preventDefault();

    if (!currentCommand.trim()) return;

    // Check if command exists in available commands
    const matchedCommandIndex = availableCommands.findIndex(
      (cmd) => cmd.command.toLowerCase() === currentCommand.toLowerCase()
    );

    const matchedCommand =
      matchedCommandIndex !== -1
        ? availableCommands[matchedCommandIndex]
        : null;

    if (currentCommand.toLowerCase() === "clear") {
      // Special handling for clear command
      // Keep only the first history item (the initial console.log)
      const initialCommand = commandHistory[0];
      setCommandHistory([initialCommand]);

      // Reset all available commands when clearing the terminal
      setAvailableCommands(AVAILABLE_COMMANDS);
    } else if (currentCommand.toLowerCase() === "help") {
      // Special handling for help command
      setCommandHistory((prev) => [
        ...prev,
        {
          command: `> ${currentCommand}`,
          response: (
            <div>
              <div style={{ marginBottom: "10px" }}>Available commands:</div>
              {availableCommands.map((cmd, index) => (
                <div
                  key={index}
                  style={{ marginLeft: "10px", marginBottom: "5px" }}
                >
                  <strong>{cmd.command}</strong> - {cmd.description}
                </div>
              ))}
            </div>
          ),
        },
      ]);
    } else if (matchedCommand) {
      // Add command to history with a placeholder response
      setCommandHistory((prev) => [
        ...prev,
        {
          command: `> ${currentCommand}`,
          response: <div>Executing {matchedCommand.name} command...</div>,
        },
      ]);

      // Remove the command from available commands (except 'clear' and 'help')
      if (
        matchedCommand.command.toLowerCase() !== "clear" &&
        matchedCommand.command.toLowerCase() !== "help"
      ) {
        setAvailableCommands((prev) =>
          prev.filter((_, index) => index !== matchedCommandIndex)
        );
      }
    } else {
      // Command not found
      setCommandHistory((prev) => [
        ...prev,
        {
          command: `> ${currentCommand}`,
          response: <div>command not found: {currentCommand}</div>,
        },
      ]);
    }

    // Reset input
    setCurrentCommand("");
    setSuggestions([]);
  };

  const handleSuggestionClick = (suggestion) => {
    setCurrentCommand(suggestion.command);
    setSuggestions([]);
    setActiveSuggestionIndex(-1);
    inputRef.current?.focus();

    // Small delay to allow state updates before potentially submitting
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 50);
  };

  const handleKeyDown = (e) => {
    // Handle arrow down
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (suggestions.length > 0) {
        setActiveSuggestionIndex((prev) => {
          const newIndex =
            prev === -1 ? 0 : Math.min(prev + 1, suggestions.length - 1);
          return newIndex;
        });
      }
    }
    // Handle arrow up
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (suggestions.length > 0) {
        setActiveSuggestionIndex((prev) => {
          const newIndex = Math.max(prev - 1, 0);
          return newIndex;
        });
      }
    }
    // Handle enter
    else if (e.key === "Enter") {
      // If a suggestion is actively selected
      if (activeSuggestionIndex !== -1 && suggestions.length > 0) {
        e.preventDefault();
        const selectedSuggestion = suggestions[activeSuggestionIndex];
        setCurrentCommand(selectedSuggestion.command);
        setSuggestions([]);
        setActiveSuggestionIndex(-1);
      }
      // Otherwise, treat as normal form submission
    }
    // Handle tab
    else if (e.key === "Tab" && suggestions.length > 0) {
      e.preventDefault();
      // Auto-complete with the first suggestion
      setCurrentCommand(suggestions[0].command);
      setSuggestions([]);
      setActiveSuggestionIndex(-1);
    }
    // Handle escape
    else if (e.key === "Escape") {
      e.preventDefault();
      setSuggestions([]);
      setActiveSuggestionIndex(-1);
    }
  };

  return (
    <div className="terminal">
      <CommandHistory commandHistory={commandHistory} />

      <div style={{ position: "relative", width: "100%" }}>
        <CommandInput
          value={currentCommand}
          onChange={handleCommandChange}
          onSubmit={handleCommandSubmit}
          onKeyDown={handleKeyDown}
          inputRef={inputRef}
        />

        {suggestions.length > 0 && (
          <Suggestions
            suggestions={suggestions}
            activeIndex={activeSuggestionIndex}
            onClick={handleSuggestionClick}
            onMouseEnter={setActiveSuggestionIndex}
          />
        )}

        {currentCommand && suggestions.length === 0 && (
          <div className="command-suggestions">
            <div className="suggestion-item">No matching prompts</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;
