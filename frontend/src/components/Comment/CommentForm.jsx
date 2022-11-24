import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  TextareaAutosize,
  Button,
  CircularProgress,
} from "@mui/material";
import { useState, useMemo, useEffect } from "react";
import MUI from "../MUI";
import { commentPostSaga } from "../../redux/comment/commentSlice";
function CommentForm({
  formWidth,
  placeholder,
  formReply,
  post_id,
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
  const isLoadingCreateComment = useSelector((state) => state.comment?.create);
  const isLoadingGetComment = useSelector((state) => state.comment?.get);
  const [replyInput, setReplyInput] = useState("");
  let isLoading = useMemo(() => {
    var result = false;
    if (isLoadingCreateComment?.isFetching) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }, [isLoadingCreateComment]);
  console.log("isLoading", isLoading);
  const handleOnChangeReplyInput = (e) => {
    setReplyInput(e.target.value);
  };
  const handleCreateComment = (e) => {
    let comment_text = replyInput;
    let parent_comment_id = formReply?.parent_comment_id
      ? formReply?.parent_comment_id
      : null;
    if (seeAllComment) {
      let paging = {
        page: 0, // commentPaging.page + 1,
        pageSize: totalElement + 1, // commentPaging.pageSize,
      };
      dispatch(
        commentPostSaga({
          accessToken,
          refreshToken,
          dispatch,
          comment_text,
          parent_comment_id,
          post_id,
          paging,
        })
      );
    } else {
      dispatch(
        commentPostSaga({
          accessToken,
          refreshToken,
          dispatch,
          comment_text,
          parent_comment_id,
          post_id,
        })
      );
    }
    setReplyInput("");
  };
  const commentEnterSubmit = (e) => {
    if (
      e.key === "Enter" &&
      e.shiftKey == false &&
      e.target.value.trim() != ""
    ) {
      e.preventDefault();
      return handleCreateComment();
    }
  };
  useEffect(() => {
    if (formReply?.text) setReplyInput("Reply to " + formReply?.text + "\n");
  }, [formReply]);
  return (
    <>
      {isLoading ? (
        <div className="loading-spinner text-center">
          <CircularProgress />
        </div>
      ) : (
        <form
          className={`flex gap-[0.5rem]  ${
            formWidth ? `w-[${formWidth}]` : "w-[100%]"
          }    `}
        >
          <Avatar
            style={{
              fontSize: "2rem",
            }}
            alt={userData.profile.profile_name}
            src={userData.profile?.avatar ? userData.profile?.avatar : null}
          >
            {userData.profile.profile_name?.at(0)}
          </Avatar>

          <TextareaAutosize
            autoFocus
            value={replyInput}
            maxRows={5}
            placeholder={placeholder ? placeholder : "write a reply..."}
            onKeyPress={commentEnterSubmit}
            onChange={handleOnChangeReplyInput}
            onFocus={(e) =>
              e.currentTarget.setSelectionRange(
                e.currentTarget.value.length,
                e.currentTarget.value.length
              )
            }
            className="w-full p-[1rem] whitespace-pre-wrap resize-none outline-none rounded-xl bg-gray-100 px-[1rem]"
          ></TextareaAutosize>
        </form>
      )}
    </>
  );
}

export default CommentForm;
