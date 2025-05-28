import React, { useCallback, useEffect, useRef, useState } from "react";
import IMAGES from "../../../../../utils/images";

const Carousel = () => {
  const [images, setImages] = useState([
    IMAGES.chongGai,
    IMAGES.doraemonMovie,
    IMAGES.galaxy,
    IMAGES.theStone,
  ]);

  const [autoRunToggle, setAutoRunToggle] = useState(true);
  const [firstLoop, setFirstLoop] = useState(true);
  const containerSwipper = useRef(null);

  const handleScrollNext = () => {
    if (firstLoop) {
      setFirstLoop(false);
    } else {
      setImages([...images.splice(1, images.length), images[0]]);
      containerSwipper.current.scrollTo({
        left: 1520,
        behavior: "auto",
      });
    }
    containerSwipper.current.scrollTo({
      left: 2 * 1520,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    containerSwipper.current.scrollTo({
      left: 1520,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      handleScrollNext();
      setAutoRunToggle((prev) => !prev);
    }, 5000);
    return () => {
      clearTimeout(timerId);
    };
  }, [autoRunToggle, handleScrollNext]);
  return (
    <div className="relative">
      <div
        ref={containerSwipper}
        className="relative flex overflow-x-auto snap-x snap-mandatory w-full h-full scroll scroll-bar-hidden"
      >
        {images.map((item) => (
          <div className="w-[1520px] h-[490px] snap-center flex-shrink-0 px-[24px]">
            <img className="w-full h-full object-cover" src={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
