// import * as React from "react";
import React from "react";
import './Icon.css'; // Import the CSS file

const Icon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={1478}
    height={305}
    fill="none"
    className="icon" // Apply the class
    {...props}
  >
    <path
      stroke="#58B0E0"
      d="M83.957 1h-58c-18.833 21-45.2 72.5 0 110.5H1455.46c16.33 37 39.2 127.3 0 192.5H25.957"
    />
  </svg>
);

export default Icon;
