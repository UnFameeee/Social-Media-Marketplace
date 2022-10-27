import React from "react";

function AvatarWithText(props) {
  var classBorder;
  if (props.border) {
    classBorder = "border-2 border-blue-300";
  }
  var alignCenter =''
  if (props.alignCenter) {
    alignCenter = "items-center";
  }
  var primaryBg = props.primaryBg ?? "bg-none";
  var secondaryBg = props.secondaryBg ?? "bg-greyf1";

  return (
    <div onClick={props.onClick} className={`flex gap-2 rounded-xl p-1 ${primaryBg} ${alignCenter} `}>
      {props.url && (
        <img
          src={props.url}
          className={`rounded-[50%] ${classBorder} object-fit `}
          alt=""
          style={{ width: props.size, height: props.size }}
        />
      )}
      {props.comment && props.profile_name && (
        <div className="flex flex-col">
          <div
            className={` ${secondaryBg} px-[1.5rem] py-[0.5rem] rounded-3xl`}
          >
            <span className=" font-bold hover:cursor-pointer">
              {props.profile_name}
            </span>
            <p>{props.comment}</p>
          </div>
          <div className="px-[1rem] flex gap-[1rem]">
            <span className=" hover:cursor-pointer font-normal">Like</span>
            <span className=" hover:cursor-pointer font-normal ">Reply</span>
            <span className=" font-light">1 hour</span>
          </div>
        </div>
      )}

      {props.haveInput && (
        <div className="w-full">
          <input
            type="text"
            placeholder={props.inputValue}
            className="bg-greyf1 outline-none py-[0.65rem] px-[1.5rem] rounded-[5rem] w-full"
          />
        </div>
      )}
      {props.profile_name && !props.comment && !props.haveInput && (
        <div className="px-[1rem] py-[0.5rem]">
          <span className="hover:cursor-pointer font-semibold">
            {props.profile_name}
          </span>
        </div>
      )}
    </div>
  );
}

export default AvatarWithText;
