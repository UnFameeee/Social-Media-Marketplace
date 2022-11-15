import React from "react";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import MUI from "../MUI";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ReplyIcon from "@mui/icons-material/Reply";
import { useState } from "react";
import { useEffect } from "react";
function NodeComment({ id, message, user, createdAt, isShowChildComment,setShowFormComment,setFormReply, ...props }) {
  const userData = useSelector((state) => state.auth.user.userData);
  function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return (
    <>
      <div className="node-comment">
        <div className="comment-info items-baseline flex gap-[0.5rem] mb-[1rem]">
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
          <div className="name-and-message flex flex-col ">
            <div className="bg-greyf1 rounded-xl p-[1rem]">
              <span className="line-clamp-1">{user}</span>
              <div className="message">{message}</div>
            </div>
            <div className="footer flex gap-[0.2rem] items-center">
              <MUI.BetterIconButton>
                <ThumbUpIcon />
              </MUI.BetterIconButton>
              <MUI.BetterIconButton
                onClick={() =>{
                   setFormReply({isShow:true,text:user})
                }}
              >
                <ReplyIcon />
              </MUI.BetterIconButton>
              <span> 1 hour</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NodeComment;
