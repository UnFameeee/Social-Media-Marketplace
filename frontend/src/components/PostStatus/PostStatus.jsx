import React from "react";
import { Avatar } from "@mui/material";
function PostStatus(props) {
  const { profile } = props;
  return (
    <div className="flex items-center gap-[0.5rem] w-full">
      <Avatar
        style={{ fontSize: "2rem" }}
        alt={profile?.profile_name}
        src={profile?.picture ? JSON.parse(profile?.picture) : null}
      >
        {profile?.profile_name?.at(0)}
      </Avatar>
      <div className="w-full ">
        <div
          onClick={props.onClick}
          className=" hover:bg-gray-300 cursor-pointer text-gray-500 bg-slate-100 outline-none py-[0.65rem] px-[1.5rem] rounded-[5rem] w-full "
        >What's on your mind ?</div>
      </div>
    </div>
  );
}

export default PostStatus;
