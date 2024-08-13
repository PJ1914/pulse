import React, { useRef, useEffect, useState } from "react";
import "./Carousel.css"; 

const Carousel = ({ items }) => {
  const wrapperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateIndex = (newIndex) => {
    setActiveIndex(newIndex);
    const devWidth = wrapperRef.current.firstChild.offsetWidth + 20; // 20 is margin
    wrapperRef.current.scrollTo({
      left: newIndex * devWidth,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateIndex((activeIndex + 1) % items.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [activeIndex, items.length]);

  return (
    <div className="carousel-main">
      <div className="carousel-wrapper" ref={wrapperRef}>
        {items.map((item, index) => (
          <div
            className={`dev-container ${index === activeIndex ? "active" : ""}`}
            key={index}
            onClick={() => updateIndex(index)}>
            <img className="dev-img" src={item.img} alt={item.name} />
            <div className="description">
              <p className="name">{item.name}</p>
              <p className="role">{item.role}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="dev-dots">
        {items.map((_, index) => (
          <div
            className={`dev-dot ${index === activeIndex ? "active" : ""}`}
            key={index}
            onClick={() => updateIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
