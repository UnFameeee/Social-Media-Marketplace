import React from "react";

function SideBarButton(props) {
  return (
    <button className=" bg-gray-200 rounded-lg py-[0.3rem] mt-[2rem]">
      {props.label}
    </button>
  );
}

export default SideBarButton;
