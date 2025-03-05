import React, { useRef, useEffect } from "react";
import Typed from "typed.js";

const Introduction = ({ onCompleted }) => {
  const el = useRef(null);
  const typed = useRef(null);
  const str = `Najaflou />`;
  useEffect(() => {
    const options = {
      strings: [
        "&nbsp;hello world",
        "&nbsp;console.log(&lt;NimaNajaflou /&gt;);",
      ],
      typeSpeed: 50,
      backSpeed: 50,
      backDelay: 1100,
      startDelay: 500,
      showCursor: true,
      cursorChar: "|",
      smartBackspace: false, // Prevent smart backspacing
      onComplete: onCompleted,
      loop: false, // Make sure it does not loop
      contentType: "html",
    };

    typed.current = new Typed(el.current, options);

    return () => {
      typed.current.destroy();
    };
  }, [onCompleted]);

  return (
    <span>
      {" "}
      {/* Changed div to span to ensure inline nature */}
      <span className="typed-text" style={{ display: "inline-block" }}>
        {"> "}
      </span>
      <span
        className="typed-text"
        style={{ display: "inline-block" }}
        ref={el}
      ></span>
    </span>
  );
};

export default Introduction;
