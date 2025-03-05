import React from "react";

const CommandHistory = ({ commandHistory }) => {
  return (
    <>
      {commandHistory.map((item, index) => (
        <div key={index} className="command-response">
          <div className="cmd-line">
            <span>{item.command}</span>
          </div>
          {item.response && item.response}
        </div>
      ))}
    </>
  );
};

export default CommandHistory;
