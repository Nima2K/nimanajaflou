import React, { useState } from "react";
import "./Home.css";
import Introduction from "./Introduction";
import Bio from "../../components/Bio";
import ProfilePicture from "../../components/ProfilePicture";
import Terminal from "../../components/Terminal/Terminal";

function Home() {
  const [showContent, setShowContent] = useState(false);

  const handleIntroductionComplete = () => {
    setTimeout(() => {
      setShowContent(true);
    }, 1000);
  };

  // Initial command to show the bio and profile picture
  const initialCommand = {
    command: "> console.log(<NimaNajaflou />);",
    response: (
      <div className="shareline">
        <Bio className="bio-text" />
        <ProfilePicture className="profile-picture" />
      </div>
    ),
  };

  return (
    <div className="portfolio-container">
      {!showContent ? (
        <Introduction onCompleted={handleIntroductionComplete} />
      ) : (
        <Terminal initialCommand={initialCommand} />
      )}
    </div>
  );
}

export default Home;
