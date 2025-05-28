import React, { useEffect, useRef, useState } from "react";
import IMAGES from "../../../../utils/images";

const DownloadApp = () => {
  const [images, setImages] = useState([
    IMAGES.splashFramePhone,
    IMAGES.sliderFramePhone,
    IMAGES.profileFramePhone,
    IMAGES.movieDetailFramePhone,
  ]);
  const containerSwipper = useRef(null);

  const [autoRunToggle, setAutoRunToggle] = useState(true);

  const handleScrollNext = async () => {
    let imagesNew = [...images, ...images.slice(0, 1)];
    setImages(imagesNew);
    await new Promise((resolve) => setTimeout(resolve, 500));
    await containerSwipper.current.scrollTo({
      left: 200,
      behavior: "smooth",
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setImages([...imagesNew.splice(1)]);
    await containerSwipper.current.scrollTo({
      left: 0,
      behavior: "auto",
    });
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      handleScrollNext();
      setAutoRunToggle((prev) => !prev);
    }, 2000);
    return () => {
      clearTimeout(timerId);
    };
  }, [autoRunToggle, handleScrollNext]);

  return (
    <div className="h-[505px] bg-[url(src/assets/bg-icon-iphone.svg)] font-nunito-sans">
      <div className="w-[1280px] mx-auto h-full grid grid-cols-2 justify-center items-center gap-6">
        <div className=" relative flex justify-center items-center rounded-[50px]">
          <img className="relative z-50" src={IMAGES.framePhone} />
          <div className="absolute z-40 w-[188px] items-center justify-center px-[3px] overflow-hidden">
            <div
              ref={containerSwipper}
              className=" flex overflow-x-auto snap-x snap-mandatory h-full scroll scroll-bar-hidden"
            >
              {images.map((item) => (
                <div className="w-full h-full snap-center flex-shrink-0 flex justify-center">
                  <img src={item} alt="" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="px-7">
          <h1 class="text-3xl text-white mb-4">
            Đặt Vé Online - Không Lo Trễ Nải
          </h1>
          <p class="text-sm text-white mb-5">
            Ghét đông đúc ồn ào? Lười xếp hàng mua vé? Hãy quên đi cách mua vé
            giấy truyền thống tốn thời gian hay xếp hàng lấy vé online phiền
            toái.
          </p>
          <div class="flex items-end">
            <span class="">
              <img width="150" height="150" src={IMAGES.qrGalaxy} />
            </span>
            <span class="text-white text-sm m-4  font-light">
              <i>OR</i>
            </span>
            <ul class="list-none">
              <li class="inline-block">
                <img
                  alt="Icon App Store"
                  width="140"
                  height="120"
                  className="w-auto h-auto"
                  src={IMAGES.iosApp}
                />
              </li>
              <li class="inline-block ml-1">
                <img
                  alt="Icon Google App Store"
                  width="150"
                  height="140"
                  className="w-auto h-auto"
                  src={IMAGES.googleApp}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadApp;
