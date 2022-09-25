import React from "react";
import AvatarWithText from "../Avatar/AvatarWithText";
import { ArrowDropDown } from "@mui/icons-material";
function UserComenting() {
  return (
    <>
      <div className="flex justify-end mb-[1rem] items-center px-[2rem]">
        <span>Most relate comment</span>
        <ArrowDropDown style={{ fontSize: "2.5rem" }} />
      </div>
      <div className="GroupUserCommenting px-[2rem] ">
        <AvatarWithText
          url="https://source.unsplash.com/random/100×100"
          size={35}
          border={false}
          userName="Duy duong"
          comment="shinra tensie"
        />
        <AvatarWithText
          url="https://source.unsplash.com/random/130×130"
          size={35}
          border={false}
          userName="naruto"
          comment="yamero"
        />
        <div className="flex">
          <span className="flex-1 hover:cursor-pointer">See more comments</span>
          <span>4/50</span>
        </div>
      </div>
    </>
  );
}

export default UserComenting;
