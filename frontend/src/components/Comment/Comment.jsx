import { useMemo } from "react";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import CommentList from "./CommentList";
import MUI from "../MUI";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ReplyIcon from "@mui/icons-material/Reply";
import { useState } from "react";
import CommentForm from "./CommentForm";
import NodeComment from "./NodeComment";
import { useEffect } from "react";
import { format } from "timeago.js";
function Comment({
  post_comment_id,
  comment_text,
  profile_name,
  createdAt,
  all_child_comment,
  isShowChildComment,
  post_id,
  ...props
}) {

  const userData = useSelector((state) => state.auth.user.userData);
  const [formReply, setFormReply] = useState({
    isShow: false,
    text: "",
    parent_comment_id: null,
  });
  const [showChildComment, setShowChildComment] = useState(true);
  useEffect(() => {
    if (all_child_comment && all_child_comment.length > 1) {
      setShowChildComment(false);
    }
  }, []);
  // console.log("showChildComment", isShowChildComment);
  return (
    <>
      <div className="comment">
        <div className="comment-info items-baseline flex gap-[0.5rem] mb-[1rem]">
          <Avatar
            style={{
              fontSize: "2rem",
            }}
            alt={userData.profile.profile_name}
            src={
              userData.profile?.avatar
                ? userData.profile?.avatar
                : null
            }
          >
            {userData.profile.profile_name?.at(0)}
          </Avatar>
          <div className="name-and-message flex flex-col ">
            <div className="bg-greyf1 rounded-xl p-[1rem]">
              <span className="line-clamp-1">{profile_name}</span>
              <div className="message">{comment_text}</div>
            </div>
            <div className="footer flex gap-[0.2rem] items-center">
              <MUI.BetterIconButton>
                <ThumbUpIcon />
              </MUI.BetterIconButton>
              <MUI.BetterIconButton
                onClick={() => {
                  setFormReply({
                    isShow: true,
                    text: profile_name,
                    parent_comment_id: post_comment_id,
                  });
                  setShowChildComment(true);
                }}
              >
                <ReplyIcon />
              </MUI.BetterIconButton>
              <span>{format(createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
      {showChildComment && all_child_comment && all_child_comment.length > 1 && (
        <a
          className="ml-[4rem] cursor-pointer underline "
          onClick={() => setShowChildComment(false)}
        >
          Hide {all_child_comment.length} replies
        </a>
      )}
      <div className="node-comment mt-[1rem]">
        {showChildComment ? (
          all_child_comment &&
          all_child_comment.map((comment) => (
            <div
              key={comment.post_comment_id}
              className="node-comment-wrapper ml-[4rem]"
            >
              <NodeComment
                {...comment}
                parent_comment_id={post_comment_id}
                setFormReply={setFormReply}
                isShowChildComment={isShowChildComment}
              />
            </div>
          ))
        ) : all_child_comment && all_child_comment.length > 0 ? (
          <a
            className="ml-[4rem] cursor-pointer underline"
            onClick={() => setShowChildComment(true)}
          >
            Show {all_child_comment.length} more replies
          </a>
        ) : null}
      </div>
      {formReply.isShow ? (
        <div className="ml-[4rem] mb-[1rem]">
          <CommentForm formReply={formReply} post_id={post_id} />
        </div>
      ) : null}
    </>
  );
}

export default Comment;
