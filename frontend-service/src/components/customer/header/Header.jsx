import React, { useState, useEffect } from "react";
import IMAGES from "../../../utils/images";
import LIST_NAVIGATION from "../../../utils/list-nav";
import Film from "./item-film/Film";
import Others from "./item-others/Others";
import { useNavigate } from "react-router-dom";
import LoginPopup from '../auth/login';
import UserProfileCard from "../../../components/customer/home/user-info/UserProfileCard";
import jwtDecode from 'jwt-decode';

const Header = () => {
  const [itemHover, setItemHover] = useState();
  const [loginPopUp, setLoginPopUp] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        setUser(jwtDecode(token));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  return (
    <header className="pt-3 pb-2 z-50" >
      <div className="mx-auto max-w-[1280px]">
        <nav className="flex justify-start justify-items-center items-center flex-row h-[94px]">
          <a className="mr-[20px] grow-0" href="/">
            <img
              className="max-w-min w-[77px] h-[40px] lg:w-[115px] lg:h-[60px] object-cover"
              src={IMAGES.galaxyLogo}
            />
          </a>
          <div className="relative flex grow justify-center px-[20px]">
            <a className="mr-[15px]">
              <img
                className="max-w-min w-[84px] h-[27px] lg:w-[112px] lg:h-[36px]"
                src={IMAGES.ticket}
              />
            </a>
            <ul className="flex items-center">
              {LIST_NAVIGATION.map((item) => (
                <li
                  className="px-[12px] relative font-nunito-sans text-[14px] justify-center items-center flex text-[#4a4a4a] gap-[4px] cursor-pointer hover:text-(--color-elevated-hover-button)"
                  onMouseEnter={() => setItemHover(item)}
                  onMouseLeave={() => setItemHover()}
                  onClick={() => item.path && navigate(item.path)}

                >
                  {item.name}
                  <div className="w-[14px] h-[14px]">
                    <img
                      src={
                        itemHover === item
                          ? IMAGES.arrowDownActive
                          : IMAGES.arrowDown
                      }
                    />
                  </div>
                  <div className="absolute w-[100%] h-[100%]  top-[100%]"></div>
                  {itemHover?.name !== "Phim" &&
                    itemHover?.name !== "Rạp/Giá Vé" &&
                    item === itemHover ? (
                    <Others item={item} />
                  ) : null}
                  {itemHover?.name === "Phim" && item === itemHover ? (
                    <Film />
                  ) : null}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex grow justify-end items-center">
            <div className="mr-[24px]">
              <img
                className="w-[14px] h-[14px] cursor-pointer"
                src={IMAGES.search}
              />
            </div>

            {
              user != null || user != undefined || user != '' ? (
                <UserProfileCard user={user} />
              ) : (
                <>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      setLoginPopUp(loginPopUp => !loginPopUp);
                    }}
                    className="text-[14px] font-nunito-sans text-[#777777] cursor-pointer hover:text-(--color-elevated-hover-button)">
                    Đăng Nhập
                  </a>

                  <div className="px-[12px] ">
                    <img
                      className="w-[100px] cursor-pointer"
                      src={IMAGES.joinMember}
                    />
                  </div>
                </>
              )
            }


          </div>
        </nav>
      </div >
      {loginPopUp && (
        <LoginPopup
          onClose={() => setLoginPopUp(false)}
          onLoginSuccess={(u) => {
            setUser(u);
            setLoginPopUp(false);
          }}
        />
      )}
    </header >



  );
};

export default Header;
