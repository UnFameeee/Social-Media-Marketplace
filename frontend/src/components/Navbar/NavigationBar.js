import React from "react";
import {
  Home,
  Storefront,
  LiveTv,
  Groups,
  SportsEsports,
  Facebook,
  Search,
  MarkEmailUnread,
  Notifications,
  KeyboardArrowDown,
} from "@mui/icons-material";
function NavigationBar() {
  return (
    <div className="flex items-center px-5 pb-2 bg-white fixed w-screen">
      <div className="rightNav flex items-center w-[25%] gap-1 pt-3">
        <Facebook className=" text-blue8f3 Icon " style={{ fontSize: 40 }} />
        <div className="">
          <form action="">
            <div className="flex relative items-center">
              <Search className=" absolute left-2 text-slate-500 pointer-events-none rotate-90 " />
              <input
                type="text"
                className="pl-[33px] py-1 rounded-xl outline-none bg-greyf1"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="centerNav flex-1">
        <ul className="listNav flex gap-[10px] justify-center gap-0">
          <li className="navBarLi group">
            <Home className="navBarIcon" style={{ fontSize: 40 }} />
            <hr className="navBarIconHr"/>
          </li>
          <li className="navBarLi group  ">
            <Storefront className="navBarIcon" style={{ fontSize: 40 }} />
            <hr className="navBarIconHr"/>
          </li>
          <li className="navBarLi group ">
            <LiveTv className="navBarIcon" style={{ fontSize: 40 }} />
            <hr className="navBarIconHr"/>
          </li>
          <li className="navBarLi group ">
            <Groups className="navBarIcon" style={{ fontSize: 40 }} />
            <hr className="navBarIconHr"/>
          </li>
          <li className="navBarLi group ">
            <SportsEsports className="navBarIcon" style={{ fontSize: 40 }} />
            <hr className="navBarIconHr"/>
          </li>
        </ul>
      </div>
      <div className="w-[25%] flex justify-end gap-3 pt-3 items-center mr-5">
        <MarkEmailUnread className="Icon" style={{ fontSize: 25 }} />
        <Notifications className="Icon" style={{ fontSize: 25 }} />
        <div className="flex gap-2 items-center bg-greyf1 rounded-xl p-1">
          <img
            src="https://source.unsplash.com/random/300×300"
            className="w-[30px] h-[30px] rounded-[50%] border-2 border-blue-300"
            alt=""
          />
          <span>Hexa Pentania</span>
          <KeyboardArrowDown className="Icon" />
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
