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
function Comment({
  post_comment_id,
  comment_text,
  profile_name,
  createdAt,
  isShowChildComment,
  post_id,
  ...props
}) {
  let childComments = useMemo(() => {
    const result = [
      {
        post_comment_id: 4,
        comment_text: "childComment",
        profile_name: "Nguyen hoang vu",
        createdAt: 2022,
      },
      {
        post_comment_id: 5,
        comment_text: "childComment2",
        profile_name: "Nguyen pham quoc thang",
        createdAt: 2022,
      },
    ];
    return result;
  }, []);

  const userData = useSelector((state) => state.auth.user.userData);
  const [formReply, setFormReply] = useState({
    isShow: false,
    text: "",
    parent_comment_id: null,
  });
  const [showChildComment, setShowChildComment] = useState(true);
  const [replyQuantity, setReplyQuantity] = useState(childComments.length);
  function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const [randomNum, setRandomNum] = useState(0);
  useEffect(() => {
    setRandomNum(randomNumberInRange(0, 1));
  }, []);
  useEffect(() => {
    if (childComments.length > 1) {
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
              userData.profile?.picture
                ? JSON.parse(userData.profile?.picture)
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
                }}
              >
                <ReplyIcon />
              </MUI.BetterIconButton>
              <span> 1 hour</span>
            </div>
          </div>
        </div>
      </div>
      <div className="node-comment">
        {showChildComment || isShowChildComment ? (
          randomNum ? (
            childComments &&
            childComments.map((comment) => (
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
          ) : null
        ) : randomNum ? (
          <a
            className="ml-[4rem] cursor-pointer underline"
            onClick={() => setShowChildComment((prev) => !prev)}
          >
            Show {replyQuantity} more replies
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
