import { useState, useMemo } from "react";
import {
  ThumbUpOutlined,
  ThumbUpAlt,
  Send,
  ChatBubbleOutline,
  ArrowDropDown,
  MoreHoriz,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  ClickAwayListener,
} from "@mui/material";
import MUI from "../MUI";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { format } from "timeago.js";
import ShowMoreText from "react-show-more-text";
import { deletePostSaga, likePostSaga } from "../../redux/post/postSlice";
import notFoundImage from "../../assets/noimage_1.png";
import styled from "styled-components";
import CommentList from "../Comment/CommentList";
import CommentForm from "../Comment/CommentForm";
import PostModal from "../../screens/Home/PostModal";
import { getCommentPostSaga } from "../../redux/comment/commentSlice";
import { useEffect } from "react";
function CardPost(props) {
  //#region Declare variables
  const dispatch = useDispatch();
  const [showAction, setShowAction] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const { postData } = props;
  const { post_id, profile_id, written_text, post_image, isLiked, totalLike } =
    postData;
  const { profile } = props;
  const postUpdateData = {
      post_id: post_id,
      profile_id: profile_id,
      written_text: written_text,
      post_image: post_image,
    }

  const accessToken = useSelector(
    (state) => state.auth.login.currentUser.access
  );
  const refreshToken = useSelector(
    (state) => state.auth.login.currentUser.refresh
  );
  const userData = useSelector((state) => state.auth?.user?.userData.profile);

 
  //#endregion

  //#region Function
  const handleShowModal = () => {
    setShowPostModal(true);
    setShowAction(false)
  };
  const handleDeletePost = () => {
    let postId = post_id;
    dispatch(deletePostSaga({ accessToken, refreshToken, postId, dispatch }));
    setShowAction(!showAction);
    props.setReRender(prev => !prev)
  };
  const handleLikePost = () => {
    let postId = post_id;
    dispatch(likePostSaga({ accessToken, refreshToken, postId, dispatch }));
    props.setReRender(prev => !prev)
  };
  const comments = useSelector((state) => state.comment?.get?.data?.results?.data)
  const handleShowComment = () => {
    dispatch(getCommentPostSaga({accessToken,refreshToken,dispatch,post_id}))
  };
  console.log("comments",comments);
 
  let rootComments = useMemo(() => {
    var result =[]
    comments.map((comment) =>{
      if(comment.post_id === post_id){
        debugger
        console.log("post_id",post_id);
         result.push(comment);
      }
    })
    return result;
  }, []);
  console.log("rootComments",rootComments);
  //#endregion

  return (
    <>
      <PostModal
        showModal={showPostModal}
        setShowPostModal={setShowPostModal}
        postUpdateData={postUpdateData}
        setReRender={props.setReRender}
        profile={userData}
      />
      {/* {(!Helper.checkURL("") || props.profile?.profile_id === props.postData.profile_id) && ( */}
      <div className="cardPost bg-white pt-[1.5rem] pb-[1.5rem] mb-[2rem] drop-shadow-md rounded-xl border-2 w-[70rem]">
        <div className="w-full bg">
          <div className="card-header flex items-center gap-[0.8rem] w-full mb-[1rem] px-[2rem] relative">
            <div className="flex flex-1 gap-[1rem]">
              <Avatar
                style={{ fontSize: "2rem" }}
                alt={props.postData.profile_name}
                src={props.postData?.avatar ? props.postData?.avatar : null}
              >
                {props.postData.profile_name?.at(0)}
              </Avatar>
              <div>
                <p>{props.postData.profile_name}</p>
                <span className=" font-light text-[1.4rem]">
                  {format(props.postData.createdAt)}
                </span>
              </div>
            </div>
            {userData?.profile_id === props.postData.profile_id && (
              <div className="relative">
                <MoreHoriz
                  className=" right-[2rem] Icon"
                  style={{ fontSize: "2.5rem" }}
                  onClick={() => setShowAction(prev => !prev)}
                />
                {showAction && (
                  <ClickAwayListener onClickAway={(e) => setShowAction(false)}>
                    <div className="bg-white floatingAction absolute z-10 right-0 shadow-md rounded-xl border-[0.1rem] ">
                      <ul className="flex flex-col ">
                        <li className="rounded-md p-[0.5rem] cursor-pointer">
                          <Button
                            style={{
                              color: "var(--primary-color)",
                              border: "1px solid var(--primary-color) ",
                            }}
                            onClick={handleShowModal}
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
                            onClick={handleDeletePost}
                          >
                            Delete
                          </Button>
                        </li>
                      </ul>
                    </div>
                  </ClickAwayListener>
                )}
              </div>
            )}
          </div>
        </div>
        <div>
          <div
            className="card-paragraph px-[2rem] mb-[1rem] "
            style={{ overflowWrap: "anywhere" }}
          >
            <ShowMoreText
              lines={3}
              more="Show more"
              less="Show less"
              anchorClass="show-more-less-clickable"
              expanded={false}
              width={0}
              truncatedEndingComponent={"... "}
            >
              {written_text}
            </ShowMoreText>
          </div>
          {post_image.length > 0 && (
            <div className="card-images px-[-1rem] mb-[0.5rem] border-y-[0.1rem] border-gray-200">
              {post_image.map((image, index) => {
                return (
                  <img
                    src={image.link}
                    key={index}
                    alt="not found"
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = notFoundImage;
                    }}
                    className={`w-full min-w-[20rem]  h-[45rem] object-contain border-[1px] border-t-gray-200 `}
                  />
                );
              })}
            </div>
          )}
          <div className="card-react-button mb-[0.5rem] px-[2rem] flex gap-[0.5rem]">
            <ThumbUpOutlined
              className="Icon"
              style={{ fontSize: "2rem", color: "var(--primary-color)" }}
            />
            <span className="text-grey1f">{totalLike}</span>
          </div>
          <hr className="mb-[1rem]" />
          <div className="reactButton px-[1rem] flex mb-[1rem] items-center">
            <MUI.ButtonWithIcon
              onClick={handleLikePost}
              className="button-with-icon flex gap-[1rem] w-full items-center"
            >
              {isLiked ? (
                <ThumbUpAlt
                  style={{
                    fontSize: "2.5rem",
                    marginRight: "0.5rem",
                    color: "var(--primary-color)",
                  }}
                />
              ) : (
                <ThumbUpOutlined
                  style={{ fontSize: "2.5rem", marginRight: "0.5rem" }}
                />
              )}
              <span className=" leading-[1.3rem]">Like</span>
            </MUI.ButtonWithIcon>
            <MUI.ButtonWithIcon
              onClick={() => handleShowComment()}
              className="button-with-icon flex gap-[0.5rem] w-full"
            >
              <ChatBubbleOutline
                className=" outline-none"
                style={{ fontSize: "2.5rem", marginRight: "0.5rem" }}
              />
              <span className=" leading-[1.3rem]">Comment</span>
            </MUI.ButtonWithIcon>
            <MUI.ButtonWithIcon className="button-with-icon flex gap-[0.5rem] w-full">
              <Send
                className=""
                style={{ fontSize: "2.5rem", marginRight: "0.5rem" }}
              />
              <span className=" leading-[1.3rem]">Send</span>
            </MUI.ButtonWithIcon>
          </div>
          <hr className="mb-[0.5rem] " />
          <div className="card-comment-section">
            <div className="flex justify-end mb-[0.5rem] items-center px-[2rem]">
              <span>Most relate comment</span>
              <ArrowDropDown style={{ fontSize: "2.5rem" }} />
            </div>
            <div className="GroupUserCommenting px-[2rem] [&>*]:mb-[1rem]">
              <CommentForm
                formWidth={"100%"}
                placeholder={"write a comment...."}
                post_id={post_id}
              />
              <CommentList comments={rootComments} post_id={post_id} />

              <div className="flex">
                <span className="flex-1 hover:cursor-pointer">
                  See more comments
                </span>
                <span>4/50</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardPost;
