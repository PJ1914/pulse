import React from "react";
import "./TryPulse.css";
import styled from "styled-components";
import icon1 from "../../assets/Pulse-icons/Vector.png";
import icon2 from "../../assets/Pulse-icons/Vector2.png";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const TryPulse = () => {
  const Button = styled.button`
    margin-top: 30px;
    padding: 12px 30px;
    margin-bottom: 12px;
    background: #2978d1;
    color: white;
    border: none;
    border-radius: 15px;
    font-size: 16px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:hover {
      background-color: #6366f1;
    }
  `;

  return (
    <div className="main-wrapper">
      <div className="wrapper">
        <div className="pulse-container">
          <div>
            <span
              style={{
                color: "white",
                fontSize: 40,
                fontFamily: "MADE Tommy Soft",
                fontWeight: 700,
                lineHeight: "48px",
                wordWrap: "break-word",
              }}
            >
              PULSE AI
            </span>
            <span
              style={{
                color: "#999999",
                fontSize: 36,
                fontFamily: "MADE Tommy Soft",
                fontWeight: 700,
                lineHeight: "43.20px",
                wordWrap: "break-word",
              }}
            >
              {" "}
              Chat Bot
            </span>
          </div>
          <Link to="/messages" style={{ textDecoration: "none" }}>
            <Button>
              <img height={"15px"} src={icon1} alt="Chat Bot Icon" />
              {" "}Open Chat Bot
            </Button>
          </Link>
        </div>
        <div className="pulse-container">
          <div>
            <span
              style={{
                color: "white",
                fontSize: 40,
                fontFamily: "MADE Tommy Soft",
                fontWeight: 700,
                lineHeight: "48px",
                wordWrap: "break-word",
              }}
            >
              PULSE AI
            </span>

            <span
              style={{
                color: "#999999",
                fontSize: 36,
                fontFamily: "MADE Tommy Soft",
                fontWeight: 700,
                lineHeight: "43.20px",
                wordWrap: "break-word",
              }}
            >
              {" "}
              Intelligence
            </span>
          </div>
          <Link to="/voice" style={{ textDecoration: "none" }}>
            <Button>
              <img height={15} src={icon2} alt="Intelligence Icon" />
              {" "}Explore Intelligence
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TryPulse;