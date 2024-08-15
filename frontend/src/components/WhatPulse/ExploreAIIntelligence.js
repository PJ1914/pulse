import React from "react";
import Icon from "./Icon";
import "./ExploreAIIntelligence.css"; // Import the CSS file

const ExploreAIIntelligence = () => {
  return (
    <>
      <div className="explore-ai-container">
        <span className="explore-ai-text gray">Explore</span>
        <span className="explore-ai-text"> PULSE AI</span>
        <span className="explore-ai-text" style={{ fontSize: "3vw" }}> </span>
        <span className="explore-ai-text gray" style={{ fontSize: "3vw" }}>
          Intelligence
        </span>
      </div>
      <Icon />
      <div className="explore-ai-intro">
        Scroll down to explore the technology behind Pulse AI and meet the team
        making it happen. Along the way, you'll find our AI chatbot ready to
        assist you and a deeper look into Pulse AI Intelligence where innovation
        and interaction come together.
      </div>
    </>
  );
};

export default ExploreAIIntelligence;
