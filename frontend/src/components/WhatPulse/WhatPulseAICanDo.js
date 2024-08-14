import React from "react";
import BackgroundImg from "../../assets/main page/background.png";
import Icon from "./Icon";
import "./WhatPulseAICanDo.css";

const WhatPulseAiCanDo = () => {
  return (
    <div
      className="WhatPulseAiCanDo"
      style={{
        backgroundImage: `url(${BackgroundImg})`,
      }}
    >
      <div className="title">
        <span style={{ color: "#999999" }}>WHAT</span>
        <span style={{ color: "white" }}> PULSE AI</span>
        <span style={{ color: "white" }}> </span>
        <span style={{ color: "#999999" }}> CAN DO</span>
      </div>
      <Icon />
      <div className="content">
        AI Chatbot: Engage with our AI chatbot for real-time answers, assistance, and information. It's like having a personal assistant at your fingertips. Custom Widgets: Tailor your Pulse AI dashboard with widgets that suit your needs, from weather updates to news feeds and more. Easy Integration: Seamlessly connect Pulse AI with your existing systems and platforms for a cohesive, unified experience.
      </div>
      <div className="title">
        <span style={{ color: "#999999" }}>Discover</span>
        <span style={{ color: "white" }}> PULSE AI</span>
        <span style={{ color: "white" }}> </span>
        <span style={{ color: "#999999" }}> Intelligence</span>
      </div>
      <Icon />
      <div className="content" style={{ top: "65%" }}>
        Dive into Pulse Al Intelligence for advanced data analysis and smart technology solutions. Personalize your experience with interactive buttons and icons, making it easy to get exactly what you need from the platform.
      </div>
    </div>
  );
};

export default WhatPulseAiCanDo;
