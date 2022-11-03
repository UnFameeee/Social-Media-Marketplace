import React, { useEffect, useState } from "react";
import {
  ThumbUpOutlined,
  ThumbUpAlt,
  Send,
  ChatBubbleOutline,
  ArrowDropDown,
  MoreHoriz,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import MUI from "../MUI";
import dayjs from "dayjs";
import "react-toastify/dist/ReactToastify.css";
import AvatarWithText from "../Avatar/AvatarWithText";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, likePost } from "../../redux/apiRequest";
import { format } from "timeago.js";
import ShowMoreText from "react-show-more-text";
import { Helper } from "../../utils/Helper";
import { deletePostSaga, likePostSaga } from "../../redux/post/postSlice";
function CardPost(props) {
  // Declare variables
  const dispatch = useDispatch();
  const [showAction, setShowAction] = useState();
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser.access
  );
  const refreshToken = useSelector(
    (state) => state.auth.login.currentUser.refresh
  );
  const arrayImgs = JSON.parse(props.postData.media_location);
  const { postData } = props;
  const {
    post_id,
    profile_id,
    written_text,
    media_type,
    media_location,
    picture,
    isLiked,
    totalLike,
  } = postData;
  const { profile } = props;
  // Function
  const handleOnClickShowAction = () => {
    setShowAction(!showAction);
  };
  const handleShowModal = () => {
    let tempPostData = {
      post_id: post_id,
      profile_id: profile_id,
      written_text: written_text,
      media_type: media_type,
      media_location: media_location,
      picture: picture,
    };
    props.handleGetPostUpdateData(tempPostData);
    props.handleOpenPostModel();
    handleOnClickShowAction();
  };
  const handleDeletePost = () => {
    try {
      var postId = post_id;
      // await deletePost(accessToken,refreshToken, props.postData.post_id, dispatch);
      dispatch(deletePostSaga({ accessToken, refreshToken, postId, dispatch }));
      props.setReRender((prev) => !prev);
      handleOnClickShowAction();
    } catch (error) {
      console.log(error);
    }
  };
  const handleLikePost = () => {
    // likePost(accessToken,refreshToken, props.postData.post_id, dispatch);
    let postId = post_id;
    dispatch(likePostSaga({ accessToken, refreshToken, postId, dispatch }));
    props.setReRender((prev) => !prev);
  };
  return (
    <>
      profile?.profile_id === postData.profile_id) && (
      <div className="cardPost bg-white pt-[1.5rem] pb-[1.5rem] mb-[2rem] drop-shadow-md rounded-xl border-2 w-full">
        <div className="w-full bg">
          <div className="header flex items-center gap-[0.8rem] w-full mb-[1rem] px-[2rem] relative">
            <div className="flex flex-1 gap-[1rem]">
              <Avatar
                style={{ fontSize: "2rem" }}
                alt={props.postData.profile_name}
                src={
                  props.postData?.picture
                    ? JSON.parse(props.postData?.picture)
                    : null
                }
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
            {profile?.profile_id === postData.profile_id && (
              <div className="relative">
                <MoreHoriz
                  className=" right-[2rem] Icon"
                  style={{ fontSize: "2.5rem" }}
                  onClick={handleOnClickShowAction}
                />
                {showAction && (
                  <div className="bg-white floatingAction absolute z-10  right-0  p-[1rem] drop-shadow-sm rounded-xl border-[0.1rem] ">
                    <ul className="flex gap-[1rem] flex-col ">
                      <li className="border-[0.1rem] border-red-100 rounded-md p-[0.5rem] cursor-pointer">
                        <button onClick={handleShowModal}>Update</button>
                      </li>
                      <li className="border-[0.1rem] border-red-100 rounded-md p-[0.5rem] cursor-pointer">
                        <button onClick={handleDeletePost}>Delete</button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="written_text ">
            <div
              className="paragraph px-[2rem] mb-[1rem] "
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
            {media_location && arrayImgs.length > 0 && (
              <div className="px-[-1rem] mb-[0.5rem] border-y-[0.1rem] border-gray-200">
                {arrayImgs.map((item) => (
                  <img
                    src={item}
                    key={item}
                    alt=""
                    className="w-full min-w-[20rem] h-[45rem] object-cover"
                  />
                ))}
              </div>
            )}
            <div className="mb-[0.5rem] px-[2rem] flex gap-[0.5rem]">
              <ThumbUpOutlined
                className="Icon text-blue8f3"
                style={{ fontSize: "2rem" }}
              />
              <span className="text-grey1f">{totalLike}</span>
            </div>
            <hr className="mb-[1rem]" />
            <div className="reactButton px-[1rem] flex mb-[1rem]">
              <MUI.ButtonWithIcon
                onClick={handleLikePost}
                className="button-with-icon flex gap-[0.5rem] w-full "
              >
                {isLiked ? (
                  <ThumbUpAlt className=" " style={{ fontSize: "2.5rem" }} />
                ) : (
                  <ThumbUpOutlined style={{ fontSize: "2.5rem" }} />
                )}
                <span className=" leading-[1.3rem]">Like</span>
              </MUI.ButtonWithIcon>
              <MUI.ButtonWithIcon className="button-with-icon flex gap-[0.5rem] w-full">
                <ChatBubbleOutline
                  className=" outline-none"
                  style={{ fontSize: "2.5rem" }}
                />
                <span className=" leading-[1.3rem]">Comment</span>
              </MUI.ButtonWithIcon>
              <MUI.ButtonWithIcon className="button-with-icon flex gap-[0.5rem] w-full">
                <Send className="" style={{ fontSize: "2.5rem" }} />
                <span className=" leading-[1.3rem]">Send</span>
              </MUI.ButtonWithIcon>
            </div>
            <hr className="mb-[0.5rem] " />
            <div className="flex justify-end mb-[0.5rem] items-center px-[2rem]">
              <span>Most relate comment</span>
              <ArrowDropDown style={{ fontSize: "2.5rem" }} />
            </div>
            <div className="GroupUserCommenting px-[2rem] [&>*]:mb-[1rem]">
              <AvatarWithText
                url="https://source.unsplash.com/random/180×180"
                size={35}
                haveInput={true}
                inputValue="write your comment"
                alignCenter={true}
              />
              <AvatarWithText
                url="https://source.unsplash.com/random/100×100"
                size={35}
                border={false}
                profile_name="madara"
                comment="shinra tensie"
              />
              <AvatarWithText
                url="https://source.unsplash.com/random/130×130"
                size={35}
                border={false}
                profile_name="naruto"
                comment="yamero"
              />
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
