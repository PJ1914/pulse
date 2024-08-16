import React from "react";
import "./OldChat.css"
import icon2 from "../../assets/Pulse-icons/Vector2.png"

const OldChat = ({theme}) => {
    
  return (
    <>
      <div className={`old-wrapper ${theme}`}>
       <p className="explore-old-p"><img height={15} style={{color:"white"}} src={icon2}/>Explore Intelligence</p>
      </div>
    </>
  );
};

export default OldChat;
