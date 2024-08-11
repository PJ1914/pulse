import React, { useRef } from "react";
import dev1 from "../../assets/Team/Pranay.png";
import dev2 from "../../assets/Team/Rajesh.png";
import dev3 from "../../assets/Team/TarikAli.png";
import dev4 from "../../assets/Team/Viswa.png";
import dev5 from "../../assets/Team/Amit.png";
import "./Team.css";

const MeetTheTeam = () => {
  const developers = [
    {
      name: "PRANAY JUMBARTI",
      img: dev1,
      role: "Full-stack Developer The mastermind behind Pulse Al, Pranay is a full-stack developer with a love for leaming and innovation.",
    },
    {
      name: "Rajesh Korlapati",
      img: dev2,
      role: "Frontend ReactJs Developer Helps to build a robust and scalable platform",
    },
    {
      name: "TARIK ALI",
      img: dev3,
      role: "Backend Expert Excels at solving complex problems and streamlining data management.",
    },
    {
      name: "Vishwa",
      img: dev4,
      role: "Full-stack Developer Ensures that Pulse Al delivers a seamless user experience.",
    },
    {
      name: "AMIT KUMAR RAM",
      img: dev5,
      role: "Passionate graphic designer with a strong focus on UI/UX, currently responsible for designing  the Pulse AI website.",
    },
  ];

  const wrapperRef = useRef(null);

  const scrollToDev = (index) => {
    const wrapper = wrapperRef.current;
    const devWidth = 300 + 20; // width of each dev-container + margin
    wrapper.scrollTo({
      left: index * devWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="devs-main">
      <div className="devs-wrapper" ref={wrapperRef}>
        {developers.map((dev, ind) => (
          <div className="dev-container" key={ind}>
            <img className="dev-img" src={dev.img} />
            <div className="description">
              <p className="name">{dev.name}</p>
              <p className="role">{dev.role}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="dev-dots">
        {developers.map((dev, ind) => (
          <div className="dev-dot" key={ind} onClick={() => scrollToDev(ind)}>
            •
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetTheTeam;
