import React, { useRef, useEffect } from "react";
import Typed from "typed.js";

const Introduction = ({ onCompleted }) => {
  const el = useRef(null);
  const typed = useRef(null);

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
      cursorChar: "_",
      smartBackspace: false,
      onComplete: onCompleted,
      loop: false,
      contentType: "html",
    };

    typed.current = new Typed(el.current, options);

    return () => {
      typed.current.destroy();
    };
  }, [onCompleted]);

  return (
    <div className="cmd-line">
      <span className="prompt">&gt; </span>
      <span className="typed-text" ref={el}></span>
    </div>
  );
};

export default Introduction;
