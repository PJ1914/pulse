import React, { useEffect, useState } from "react";
import "./AboutUs.css";
import About1 from "../../../src/assets/Aboutpulse1.png";
import About2 from "../../../src/assets/About2.png";
import About3 from "../../../src/assets/About3.png";
import tree from "../../assets/main page/BLUE_TECHNOLOGY_TREE_Men_s_Perfect_Tee_By_pilipsjanuarius_-_Design_By_Humans-removebg-preview 1.png";

import MeetTheTeam from "../Team/MeetTheTeam";
const AboutUs = () => {
  const images = [About1, About2, About3];
  const [index, setIndex] = useState(0);

  const handleImage = (ind) => {
    setIndex(ind);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="about-wrapper">
      {/* Left */}
      <div className="about-section">
        <img className="tree" src={tree} alt="Decorative Tree" />
        <h1 className="about-h1">About Us</h1>
        <span className="arrow"></span>
        <p className="about-p">
          Pulse AI was created by Pranay Jumbarthi, a passionate full-stack
          developer and lifelong learner. His vision was to create a platform
          where AI could seamlessly blend with everyday tasks to make life
          easier and more productive. Our Mission: At Pulse AI, we aim to bring
          AI technology to everyone. We believe that artificial intelligence
          should be accessible, easy to use, and tailored to your needs. Our
          goal is to integrate AI into your daily routine, enhancing
          productivity and creativity with every interaction.
        </p>
      </div>
      {/* Right */}
      <div className="right">
        <img className="about-image" src={images[index]} alt="About Us" />
        <div className="dots">
          {images.map((img, ind) => (
            <div className="dot" key={ind} onClick={() => handleImage(ind)} role="button">•</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
