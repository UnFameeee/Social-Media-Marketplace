import React from "react";
import { useSelector } from "react-redux";
import { Avatar, TextareaAutosize, Button } from "@mui/material";
import { useState } from "react";
import MUI from "../MUI";
function CommentForm({ formWidth,placeholder, ...props }) {
  const userData = useSelector((state) => state.auth.user.userData);
  const [replyInput, setReplyInput] = useState("");
  const handleOnChangeReplyInput = (e) => {
    setReplyInput(e.target.value);
  };
  return (
    <form
      className={`flex gap-[1rem]  ${
        formWidth ? `w-[${formWidth}]` : "w-[100%]"
      }    `}
    >
      <Avatar
        style={{
          fontSize: "2rem",
        }}
        alt={userData.profile.profile_name}
        src={
          userData.profile?.picture
            ? JSON.parse(userData.profile?.picture)
            : null
        }
      >
        {userData.profile.profile_name?.at(0)}
      </Avatar>
      <TextareaAutosize
        autoFocus
        value={replyInput}
        onChange={handleOnChangeReplyInput}
        maxRows={5}
        placeholder={placeholder? placeholder :"write a reply" }
        className="w-full p-[1rem] resize-none outline-none rounded-3xl bg-gray-100 px-[1rem]"
      ></TextareaAutosize>
      <MUI.Button>
        Post
      </MUI.Button>
    </form>
  );
}

export default CommentForm;
