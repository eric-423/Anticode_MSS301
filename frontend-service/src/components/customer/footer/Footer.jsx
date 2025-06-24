import React from "react";
import LIST_FOOTER from "../../../utils/list-footer";
import IMAGES from "../../../utils/images";

const Footer = () => {
  return (
    <footer className="bg-[#333333] font-nunito-sans">
      <div className="px-[16px] w-[1280px] mx-auto">
        <div className="py-8">
          <div className="grid grid-cols-4">
            {LIST_FOOTER.map((item) => (
              <div>
                <h3 className="mb-6 font-bold text-white text-[14px] tracking-[1px]">
                  {item.title}
                </h3>
                <ul>
                  {item.sub.map((item) => (
                    <li className="h-[40px] tracking-[1px] text-[14px] text-[rgb(208,208,208)] hover:text-[#FD841F] cursor-pointer flex items-center">
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <div className="mb-5">
                <img src={IMAGES.galaxyFooter} />
              </div>
              <ul className="h-[35px] flex justify-start gap-[10px]">
                <li className="w-[28px]">
                  <svg
                    className="svg-inline--fa fa-square-facebook fa-2x "
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="#d0d0d0"
                      d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"
                    ></path>
                  </svg>
                </li>
                <li className="w-[36px]">
                  <svg
                    className="svg-inline--fa fa-youtube fa-2x "
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="#d0d0d0"
                      d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
                    ></path>
                  </svg>
                </li>
                <li className="w-[28px]">
                  <svg
                    className="svg-inline--fa fa-square-instagram fa-2x "
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="#d0d0d0"
                      d="M224,202.66A53.34,53.34,0,1,0,277.36,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.41-30.41c-21-8.29-71-6.43-94.3-6.43s-73.25-1.93-94.31,6.43a54,54,0,0,0-30.41,30.41c-8.28,21-6.43,71.05-6.43,94.33S91,329.26,99.32,350.33a54,54,0,0,0,30.41,30.41c21,8.29,71,6.43,94.31,6.43s73.24,1.93,94.3-6.43a54,54,0,0,0,30.41-30.41c8.35-21,6.43-71.05,6.43-94.33S357.1,182.74,348.75,161.67ZM224,338a82,82,0,1,1,82-82A81.9,81.9,0,0,1,224,338Zm85.38-148.3a19.14,19.14,0,1,1,19.13-19.14A19.1,19.1,0,0,1,309.42,189.74ZM400,32H48A48,48,0,0,0,0,80V432a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V80A48,48,0,0,0,400,32ZM382.88,322c-1.29,25.63-7.14,48.34-25.85,67s-41.4,24.63-67,25.85c-26.41,1.49-105.59,1.49-132,0-25.63-1.29-48.26-7.15-67-25.85s-24.63-41.42-25.85-67c-1.49-26.42-1.49-105.61,0-132,1.29-25.63,7.07-48.34,25.85-67s41.47-24.56,67-25.78c26.41-1.49,105.59-1.49,132,0,25.63,1.29,48.33,7.15,67,25.85s24.63,41.42,25.85,67.05C384.37,216.44,384.37,295.56,382.88,322Z"
                    ></path>
                  </svg>
                </li>
              </ul>
              <div class="connect__trade mt-5">
                <img className="w-[150px]" src={IMAGES.galaxyTrade} />
              </div>
            </div>
          </div>
        </div>
        <div className="py-[20px] border-t-2 border-[#d0d0d0]">
          <div className="flex justify-items-start justify-start items-center gap-5">
            <div className="">
              <img src={IMAGES.galaxyFooter} />
            </div>
            <div>
              <h3 className="text-[18px] font-nunito-san text-[#d0d0d0] font-medium">
                CÔNG TY CỔ PHẦN PHIM THIÊN NGÂN
              </h3>
              <p className="text-[#8d8d8d] text-[12px]">
                3/9 Võ Văn Tần, Phường Võ Thị Sáu, Quận 3, Tp. Hồ Chí Minh, Việt
                Nam
              </p>
              <p className="text-[12px] mt-[2px] mb-[4px] h-[12px] flex items-center text-[#8d8d8d]">
                <svg
                  className="w-[9px]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="#8d8d8d"
                    d="M80 0C44.7 0 16 28.7 16 64V448c0 35.3 28.7 64 64 64H304c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H80zm80 432h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H160c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
                  ></path>
                </svg>

                <span className="mr-[5px]">{`: 028.39.333.303 - `}</span>

                <svg
                  className="w-[12px]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#8d8d8d"
                    d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"
                  ></path>
                </svg>

                <span className="mr-[5px]">{`: 19002224 (9:00 - 22:00) - `}</span>

                <svg
                  className="w-[12px]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#8d8d8d"
                    d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"
                  ></path>
                </svg>

                <span>{`: hotro@galaxystudio.vn`}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
