import React from "react";
import {
  Home,
  Storefront,
  LiveTv,
  Groups,
  SportsEsports,
} from "@mui/icons-material";
function NavigationBar() {
  return (
    <div className="flex items-center px-5">
      <div className="rightNav">
        <span>Logo</span>
        <div className="dropDown"></div>
      </div>
      <div className="centerNav ">
        <ul className="listNav flex gap-[10px]">
          <li>
            <Home className="navBarIcon" style={{ fontSize: 40 }} />
          </li>
          <li>
            <Storefront className="navBarIcon" style={{ fontSize: 40 }} />{" "}
          </li>
          <li>
            <LiveTv className="navBarIcon" style={{ fontSize: 40 }} />
          </li>
          <li>
            <Groups className="navBarIcon" style={{ fontSize: 40 }} />
          </li>
          <li>
            <SportsEsports className="navBarIcon" style={{ fontSize: 40 }} />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavigationBar;
