import React from "react";
import { Avatar } from "@mui/material";
function PostStatus(props) {
    console.log("PostStatus",props.profile);
  return (
    <div className="flex items-center gap-[0.5rem]">
      <Avatar
        style={{fontSize: "2rem" }}
        alt={props.profile?.profile_name}
        src={
          props.profile?.picture
            ? JSON.parse(props.profile?.picture)
            : null
        }
      >
        {props.profile?.profile_name?.at(0)}
      </Avatar>
      <div className="w-full">
          <input
            onClick={props.onClick}
            type="text"
            placeholder="What's on your mind ?"
            className="bg-greyf1 outline-none py-[0.65rem] px-[1.5rem] rounded-[5rem] w-full"
          />
        </div>
    </div>
  );
}

export default PostStatus;
