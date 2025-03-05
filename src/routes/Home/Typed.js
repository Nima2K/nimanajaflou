useEffect(() => {
  const options = {
    typeSpeed: 50,
    backSpeed: 50,
    backDelay: 1100,
    startDelay: 500,
    showCursor: true,
    cursorChar: "|",
    cursorClassName: "typed-cursor", // Specify the class for the cursor
    onComplete: onCompleted,
    loop: false,
    contentType: "html",
  };

  typed.current = new Typed(el.current, options);

  return () => {
    "> " + typed.current.destroy();
  };
}, [onCompleted]);
