import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AvatarWithText from "../../components/Avatar/AvatarWithText";
import FullWidthHr from "../../components/FullWidthHr/FullWidthHr";
import { createPost, updatePost } from "../../redux/apiRequest";
import { toast } from "react-toastify";

function PostModal(props) {
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser.access
  );
  const notify = (message) =>
    toast.info(message, {
      autoClose: 1000,
      hideProgressBar: true,
      position: toast.POSITION.BOTTOM_RIGHT,
      pauseOnHover: false,
      theme: "dark",
    });
  const [newPost, setNewPost] = useState({
    written_text: "",
    media_type: "",
    media_location: "",
  });
  const { written_text, media_type, media_location } = newPost;
  const closeModal = () => {
    props.setShowModal(false);
    props.setPostUpdateData(null);
  };
  const handlePost = (e) => {
    e.preventDefault();
    newPost.media_location = "test";
    createPost(accessToken, newPost, dispatch);
    setNewPost({ written_text: "", media_type: "", media_location: "" });
    props.setReRender((prev) => !prev);
    notify("Post Created");
  };
  const handleUpdatePost = (e) => {
    var tempUpdatePost = {
      post_id: props.postUpdateData.post_id,
      profile_id: props.postUpdateData.profile_id,
      written_text: props.postUpdateData.written_text,
      media_type: props.postUpdateData.media_type,
      media_location: props.postUpdateData.media_location,
    };
    updatePost(accessToken, tempUpdatePost, dispatch);
    props.setReRender((prev) => !prev);
    closeModal();
    notify("Post Updated");
  };
  const handleOnChangeUpdatePost = (event) => {
    props.setPostUpdateData({
      ...props.postUpdateData,
      [event.target.name]: event.target.value,
    });
  };
  const handleOnChangeNewPost = (event) => {
    setNewPost({
      ...newPost,
      [event.target.name]: event.target.value,
    });
  };
  const isPosting = useSelector((state) => state.post.create.isFetching);
  useEffect(() => {
    if (isPosting === true) {
      closeModal();
    }
  });
  return (
    <>
      {props.showModal ? (
        <div
          className="w-[100%] h-[100%] fixed left-0 top-0 z-20 "
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <div className="mainContent rounded-xl fixed overflow-hidden py-[2rem] top-[50%] left-[50%] w-[50rem]  bg-white translate-x-[-50%] translate-y-[-50%]">
            <div className="flex items-center relative">
              <button
                className="absolute right-[2rem] top-[0rem] bg-slate-200 p-[0.5rem] rounded-md"
                onClick={closeModal}
              >
                Close
              </button>
              <span className="  text-center w-full px-[2rem] text-[2.4rem] font-semibold">
                {props.postUpdateData ? "Update Post" : "Create Post"}
              </span>
            </div>
            <FullWidthHr />
            <div className="px-[2rem]">
              <div className="flex items-center gap-[1rem] mb-[1rem]">
                <AvatarWithText url={props.avtUrl} size="5rem" />
                <span className="font-bold">Hai Du</span>
              </div>
              <textarea
                placeholder="What's on your mind, Hai Du?"
                className="w-full outline-none text-[2.4rem] mb-[2rem] resize-none h-[15rem]"
                cols="30"
                rows="10"
                value={
                  props.postUpdateData
                    ? props.postUpdateData.written_text
                    : written_text
                }
                name="written_text"
                onChange={
                  props.postUpdateData
                    ? handleOnChangeUpdatePost
                    : handleOnChangeNewPost
                }
              ></textarea>
              <input
                className="w-full outline-none text-[2.4rem] mb-[2rem]"
                type="text"
                placeholder="Add Image link"
                value={
                  props.postUpdateData
                    ? props.postUpdateData.media_type
                    : media_type
                }
                name="media_type"
                onChange={
                  props.postUpdateData
                    ? handleOnChangeUpdatePost
                    : handleOnChangeNewPost
                }
              />
              <button
                onClick={props.postUpdateData ? handleUpdatePost : handlePost}
                className="w-full bg-blue8f3 text-white rounded-[0.5rem] py-[0.75rem]"
                // disabled={written_text.length === 0 || props.postUpdateData.written_text.length ===0}
              >
                {props.postUpdateData ? "Update" : "Post"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default PostModal;
