import { useMemo } from "react";
import { Avatar, Button, ClickAwayListener } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CommentList from "./CommentList";
import MUI from "../MUI";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { ThumbUpOutlined, ThumbUpAlt } from "@mui/icons-material";
import ReplyIcon from "@mui/icons-material/Reply";
import { useState } from "react";
import CommentForm from "./CommentForm";
import { useEffect } from "react";
import { format } from "timeago.js";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ShowMoreText from "react-show-more-text";


import {
  deleteCommentPostSaga,
  likeCommentPostSaga,
  updateCommentPostSaga,
} from "../../redux/comment/commentSlice";
function Comment({
  post_comment_id,
  comment_text,
  profile_name,
  createdAt,
  all_child_comment,
  isShowChildComment,
  post_id,
  profile_id,
  parent_comment_id,
  isNodeComment,
  setFormReplyFromParent,
  isLiked,
  totalLike,
  seeAllComment,
  totalElement,
  ...props
}) {
  const userData = useSelector((state) => state.auth.user.userData);
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser.access
  );
  const refreshToken = useSelector(
    (state) => state.auth.login.currentUser.refresh
  );
  const [formReply, setFormReply] = useState({
    isShow: false,
    text: "",
    parent_comment_id: null,
  });
  const [showChildComment, setShowChildComment] = useState(true);
  const [showAction, setShowAction] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [inputUpdate, setInputUpdate] = useState(
    comment_text ? comment_text : ""
  );
  const handleDeleteComment = () => {
    if (seeAllComment) {
      let paging = {
        page: 0, // commentPaging.page + 1,
        pageSize: totalElement, // commentPaging.pageSize,
      };
      dispatch(
        deleteCommentPostSaga({
          accessToken,
          refreshToken,
          dispatch,
          post_comment_id,
          post_id,
          paging,
        })
      );
    } else {
      dispatch(
        deleteCommentPostSaga({
          accessToken,
          refreshToken,
          dispatch,
          post_comment_id,
          post_id,
        })
      );
    }
  };
  const handleUpdateComment = () => {
    let comment_text = inputUpdate;
    if (seeAllComment) {
      let paging = {
        page: 0, // commentPaging.page + 1,
        pageSize: totalElement, // commentPaging.pageSize,
      };
      dispatch(
        updateCommentPostSaga({
          accessToken,
          refreshToken,
          dispatch,
          comment_text,
          post_comment_id,
          post_id,
          paging,
        })
      );
    } else {
      dispatch(
        updateCommentPostSaga({
          accessToken,
          refreshToken,
          dispatch,
          comment_text,
          post_comment_id,
          post_id,
        })
      );
    }
    setShowUpdate(false);
  };
  const handleOnchangeUpdateInput = (e) => {
    setInputUpdate(e.target.value);
  };
  const commentEnterSubmit = (e) => {
    if (e.key === "Enter" && e.shiftKey == false) {
      e.preventDefault();
      return handleUpdateComment();
    }
  };
  const handleLikeComment = () => {
    if (seeAllComment) {
      let paging = {
        page: 0, // commentPaging.page + 1,
        pageSize: totalElement, // commentPaging.pageSize,
      };
      dispatch(
        likeCommentPostSaga({
          accessToken,
          refreshToken,
          dispatch,
          post_comment_id,
          post_id,
          paging,
        })
      );
    } else {
      dispatch(
        likeCommentPostSaga({
          accessToken,
          refreshToken,
          dispatch,
          post_comment_id,
          post_id,
        })
      );
    }
  };
  useEffect(() => {
    if (all_child_comment && all_child_comment.length > 1) {
      setShowChildComment(false);
    }
  }, []);
  return (
    <div className="w-full">
      <div className="comment flex items-baseline w-full">
        <div className="comment-info flex gap-[0.5rem] w-full">
          <Avatar
            style={{
              fontSize: "2rem",
            }}
            alt={userData.profile.profile_name}
            src={userData.profile?.avatar ? userData.profile?.avatar : null}
          >
            {userData.profile.profile_name?.at(0)}
          </Avatar>
          {!showUpdate ? (
            <div className="name-and-message flex flex-col ">
              <div className="flex items-center ">
                <div className="bg-greyf1 rounded-xl p-[1rem] inline-block">
                  <span className="line-clamp-1 font-[500]">
                    {profile_name}
                  </span>
                  <div className="message ">
                       <ShowMoreText
                        lines={8}
                        more="Show more"
                        less="Show less"
                        anchorClass="show-more-less-clickable"
                        expanded={false}
                        width={0}
                        truncatedEndingComponent={"... "}
                      >
                        {comment_text}
                      </ShowMoreText>
                  </div>
                </div>
                {profile_id === userData.profile?.profile_id && (
                  <MUI.BetterIconButton
                    onClick={() => setShowAction(true)}
                    className=" relative"
                  >
                    <MoreHorizIcon />
                    {showAction && (
                      <ClickAwayListener
                        onClickAway={(e) => setShowAction(false)}
                      >
                        <div className="floatingAction bg-white absolute z-10 right-0 shadow-md rounded-xl border-[0.1rem] w-[10rem] left-[3rem] ">
                          <ul className="flex flex-col ">
                            <li className="rounded-md p-[0.5rem] cursor-pointer">
                              <Button
                                style={{
                                  color: "var(--primary-color)",
                                  border: "1px solid var(--primary-color) ",
                                }}
                                onClick={(e) => {
                                  setShowAction(false);
                                  setShowUpdate(true);
                                }}
                              >
                                Update
                              </Button>
                            </li>
                            <li className=" rounded-md p-[0.5rem] cursor-pointer">
                              <Button
                                style={{
                                  color: "var(--primary-color)",
                                  border: "1px solid var(--primary-color) ",
                                }}
                                onClick={(e) => {
                                  {
                                    setShowAction(false);
                                    handleDeleteComment();
                                  }
                                }}
                              >
                                Delete
                              </Button>
                            </li>
                          </ul>
                        </div>
                      </ClickAwayListener>
                    )}
                  </MUI.BetterIconButton>
                )}
              </div>
              <div className="footer flex gap-[0.2rem] items-center">
                <MUI.BetterIconButton onClick={handleLikeComment}>
                  {isLiked ? (
                    <ThumbUpAlt
                      style={{
                        color: "var(--primary-color)",
                      }}
                    />
                  ) : (
                    <ThumbUpOutlined />
                  )}
                </MUI.BetterIconButton>
                <span>{totalLike > 0 ? totalLike : ""}</span>
                {isNodeComment ? (
                  <MUI.BetterIconButton
                    onClick={() => {
                      setFormReplyFromParent({
                        isShow: true,
                        text: profile_name,
                        parent_comment_id: parent_comment_id,
                      });
                      setShowChildComment(true);
                    }}
                  >
                    <ReplyIcon />
                  </MUI.BetterIconButton>
                ) : (
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
                )}
                <span>{format(createdAt)}</span>
              </div>
            </div>
          ) : (
            <div className="update-message-section w-full">
              <div className="input-wrapper bg-gray-100 rounded-xl p-[1rem] ">
                <input
                  className=" outline-none bg-transparent w-full"
                  type="text"
                  value={inputUpdate}
                  onKeyPress={commentEnterSubmit}
                  onChange={(e) => handleOnchangeUpdateInput(e)}
                />
              </div>
              <div className="input-action flex gap-[1rem] cursor-pointer underline">
                <span
                  onClick={(e) => {
                    setInputUpdate(comment_text);
                    setShowUpdate(false);
                  }}
                >
                  Cancel
                </span>
                <span
                  onClick={(e) => {
                    handleUpdateComment();
                    setShowUpdate(false);
                  }}
                >
                  Update
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      {!isNodeComment &&
        showChildComment &&
        all_child_comment &&
        all_child_comment.length > 1 && (
          <a
            className="ml-[4rem] cursor-pointer underline "
            onClick={() => {
              setShowChildComment(false);
              setFormReply({
                isShow: false,
                text: "",
                parent_comment_id: null,
              });
            }}
          >
            Hide {all_child_comment.length} replies
          </a>
        )}
      {!isNodeComment && (
        <div className="node-comment mt-[1rem]">
          {showChildComment ? (
            all_child_comment &&
            all_child_comment.map((comment) => (
              <div
                key={comment.post_comment_id}
                className="node-comment-wrapper ml-[4rem]"
              >
                <Comment
                  {...comment}
                  isNodeComment={true}
                  parent_comment_id={post_comment_id}
                  setFormReplyFromParent={setFormReply}
                  seeAllComment={seeAllComment}
                  totalElement={totalElement}
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
      )}
      {formReply.isShow ? (
        <div className={` ${!isNodeComment ? "ml-[4rem]" : "ml-0"} mb-[1rem]`}>
          <CommentForm
            formReply={formReply}
            post_id={post_id}
            seeAllComment={seeAllComment}
            totalElement={totalElement}
          />
        </div>
      ) : null}
    </div>
  );
}

export default Comment;
