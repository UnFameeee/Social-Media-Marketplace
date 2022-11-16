import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, TextareaAutosize, Button } from "@mui/material";
import { useState } from "react";
import MUI from "../MUI";
import { useEffect } from "react";
import { commentPostSaga } from "../../redux/comment/commentSlice";
function CommentForm({ formWidth, placeholder, formReply,post_id, ...props }) {
  const userData = useSelector((state) => state.auth.user.userData);
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser.access
  );
  const refreshToken = useSelector(
    (state) => state.auth.login.currentUser.refresh
  );

  const [replyInput, setReplyInput] = useState("");
  const handleOnChangeReplyInput = (e) => {
    setReplyInput(e.target.value);
  };
  const handleCreateComment = () =>{
    console.log("comment: ",replyInput," + ", "post id: ",post_id, " + ", " parent comment ",formReply?.parent_comment_id);
    let comment_text = replyInput;
    let parent_comment_id = formReply?.parent_comment_id ? formReply?.parent_comment_id : null;
    dispatch(commentPostSaga({accessToken,refreshToken,dispatch,comment_text,parent_comment_id,post_id}))
  }
  useEffect(() => {
    if (formReply?.text) setReplyInput("Reply to " + formReply?.text + " ");
  }, [formReply]);
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
        placeholder={placeholder ? placeholder : "write a reply..."}
        onFocus={(e) =>
          e.currentTarget.setSelectionRange(
            e.currentTarget.value.length,
            e.currentTarget.value.length
          )
        }
        className="w-full p-[1rem] resize-none outline-none rounded-3xl bg-gray-100 px-[1rem]"
      ></TextareaAutosize>
      <MUI.Button onClick={() =>handleCreateComment()} >Post</MUI.Button>
    </form>
  );
}

export default CommentForm;
