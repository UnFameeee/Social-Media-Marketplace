import React from "react";

function RoundedAvatar(props) {
  var classBorder;
  if (props.border) {
    classBorder = "border-2 border-blue-300";
  }
  var primaryBg = props.primaryBg ?? "bg-none";
  var secondaryBg = props.secondaryBg ?? "bg-greyf1";
  return (
    <div className={`flex gap-2 rounded-xl p-1 ${primaryBg} `}>
      {props.url && (
        <img
          src={props.url}
          className={`rounded-[50%] ${classBorder}`}
          alt=""
          style={{ width: props.size, height: props.size }}
        />
      )}
      {props.comment && props.userName && (
        <div className="flex flex-col">
          <div
            className={` ${secondaryBg} px-[1.5rem] py-[0.5rem] rounded-3xl`}
          >
            <span className=" font-bold hover:cursor-pointer">
              {props.userName}
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

      {props.userName && props.haveInput && (
        <div className="w-full">
          <input
            type="text"
            placeholder="write your comment"
            className="bg-greyf1 outline-none py-[1rem] px-[1.5rem] rounded-xl w-full"
          />
        </div>
      )}
      {props.userName && !props.comment && !props.haveInput && (
        <div className="px-[1rem] py-[0.5rem]">
          <span className="hover:cursor-pointer font-semibold">
            {props.userName}
          </span>
        </div>
      )}
    </div>
  );
}

export default RoundedAvatar;