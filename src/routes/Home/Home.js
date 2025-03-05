import React, { useState } from "react";
import "./Home.css";
import Introduction from "./Introduction"; // Ensure Introduction is imported

const Bio = () => (
  <p>
    Dynamic Full Stack Developer specializing in transforming ideas into
    seamless web applications using ReactJS, NodeJS, and Python. Notable
    achievements include delivering optimized user experiences and eﬃciently
    tackling complex projects. Holds a B.S. in Computer Engineering from Tabriz
    University and completed a Software Engineering Bootcamp through
    Springboard. Committed to continuous learning and leveraging cutting-edge
    technologies to drive innovative solutions.
  </p>
);

const ProfilePicture = () => (
  <div className="profile-picture">
    <img src="./pfp.jpg" alt="Nima Najaflou" />
  </div>
);

function Home() {
  const [showContent, setShowContent] = useState(false);

  return (
    <>
      <div
        className="portfolio-container"
        onScroll={() => setShowContent(true)}
      >
        {showContent ? (
          <>
            <div className="typed-text">
              {" "}
              {"> console.log(<NimaNajaflou />);"}
            </div>
            <div className="shareline">
              <Bio className="shareline-content" />
              <ProfilePicture className="shareline-content" />
            </div>

            <div className="scroll-prompt">v Scroll Down v</div>
          </>
        ) : (
          <Introduction
            onCompleted={() => {
              setTimeout(() => setShowContent(true), 1000);
            }}
          />
        )}
      </div>
    </>
  );
}

export default Home;
