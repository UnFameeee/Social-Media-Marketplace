import React from "react";

function SideBarButton(props) {
  return (
    <button className=" bg-gray-200 rounded-lg py-[0.5rem] mt-[2rem] font-semibold">
      {props.label}
    </button>
  );
}

export default SideBarButton;
