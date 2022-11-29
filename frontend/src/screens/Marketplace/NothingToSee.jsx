import React from "react";
import nothingToSee from "../../assets/nothing--to-see-here.jpg";

function NothingToSee({ text, textSize, imgSrc, imgH, ...props }) {
  return (
    <div className="nothing-to-see flex justify-center items-center flex-col">
      <img
        src={imgSrc ? imgSrc : nothingToSee}
        className={`${imgH ? `h-[${imgH}]` : ""} object-contain`}
        alt=""
      />
      <span className={`${textSize ? `text-[${textSize}]` : " text-[2.5rem]"}`}>
        {text ? text : "None is selling anything yet!"}
      </span>
    </div>
  );
}

export default NothingToSee;
