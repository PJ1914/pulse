import React, { useRef, useEffect, useState } from "react";
import "./Carousel.css";

const Carousel = ({ items }) => {
  const wrapperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToDev = (index) => {
    const wrapper = wrapperRef.current;
    const devWidth = 300 + 20; 
    wrapper.scrollTo({
      left: index * devWidth,
      behavior: "smooth",
    });
  };

  const updateIndex = (newIndex) => {
    const totalItems = items.length;
    const index = (newIndex + totalItems) % totalItems; 
    setActiveIndex(index);
    scrollToDev(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateIndex(activeIndex + 1);
    }, 3000); 

    return () => clearInterval(interval);
  }, [activeIndex]);

  // Determine which developers to show
  const visibleItems = items.slice(activeIndex, activeIndex + 3).concat(items.slice(0, Math.max(0, activeIndex + 3 - items.length)));

  return (
    <div className="carousel-main">
      <div className="carousel-wrapper" ref={wrapperRef}>
        {visibleItems.map((item, ind) => (
          <div
            className={`dev-container ${ind === 1 ? "active" : ""}`} 
            key={ind}
          >
            <img className="dev-img" src={item.img} alt={item.name} />
            <div className="description">
              <p className="name">{item.name}</p>
              <p className="role">{item.role}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="dev-dots">
        {items.map((_, ind) => (
          <div
            className={`dev-dot ${activeIndex === ind ? "active" : ""}`}
            key={ind}
            onClick={() => updateIndex(ind)}
          >
            .
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
