import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AvatarWithText from "../../components/Avatar/AvatarWithText";
import FullWidthHr from "../../components/FullWidthHr/FullWidthHr";
import { createPost, updatePost, uploadImages } from "../../redux/apiRequest";
import styled from "styled-components";
import { PhotoLibrary, HighlightOff, Close } from "@mui/icons-material";

const StyledContentEditableSpan = styled.div`
  span[contenteditable] {
    display: inline-block;
  }
  span[contenteditable]:empty::before {
    content: attr(data-placeholder);
    color: #a3a3af;
    cursor: auto;
    display: inline-block;
  }
`;
function PostModal(props) {
  //Declare variables
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser.access
  );
  const isPosting = useSelector((state) => state.post.create.isFetching);
  const [postData, setPostData] = useState({
    written_text: "",
    media_type: "",
    media_location: "",
  });
  const { written_text, media_type, media_location } = postData;

  //Function
  const closeModal = () => {
    props.setShowModal(false);
    props.setPostUpdateData(null);
    setPostData({ written_text: "", media_type: "", media_location: "" });
    setUpLoadImage([]);
  };
  const handlePost = (e) => {
    e.preventDefault();
    postData.media_location = "test";
    createPost(accessToken, postData, dispatch);
    setPostData({ written_text: "", media_type: "", media_location: "" });
    props.setReRender((prev) => !prev);
  };
  const handleUpdatePost = (e) => {
    var tempUpdatePost = {
      post_id: props.postUpdateData.post_id,
      profile_id: props.postUpdateData.profile_id,
      written_text: postData.written_text,
      media_type: postData.media_type,
      media_location: postData.media_location,
    };
    updatePost(accessToken, tempUpdatePost, dispatch);
    props.setReRender((prev) => !prev);
    closeModal();
  };
  const handleOnChangePostData = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };
  let written_text_span;
  const onFocus = (event) => {
    written_text_span = event.target.innerHTML;
  };
  const onBlur = (event) => {
    if (written_text_span !== event.target.innerHTML) {
      const html = event.target.innerHTML;
      setPostData({
        ...postData,
        written_text: html,
      });
    }
  };
  const [uploadImage, setUpLoadImage] = useState([]);
  const handlePreviewUploadImage = (e) => {
    const files = e.target.files;
    console.log(files);
    for (let i = 0; i < files.length; i++) {
      setUpLoadImage([...uploadImage, { files: files[i] }]);
    }
    // files.forEach(file => {
    //   setUpLoadImage([...uploadImage, {files: file}]);
    // });
    // console.log(URL.createObjectURL(files));
  };
  useEffect(() => {
    let onDestroy = false;
    if(!onDestroy){
      uploadImages(accessToken,uploadImage);
      console.log("uploadImage",uploadImage)
    }
    return () =>{
      onDestroy = true;
    }
  }, [uploadImage]);
  //UseEffect
  useEffect(() => {
    if (props.postUpdateData)
      setPostData({
        written_text: props.postUpdateData.written_text,
        media_type: props.postUpdateData.media_type,
        media_location: props.postUpdateData.media_location,
      });
  }, [props.postUpdateData]);
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
                <span className="font-bold">{props.profile.profile_name}</span>
              </div>
              <textarea
                onChange={handleOnChangePostData}
                name="written_text"
                rows="5"
                className=" resize-none w-full outline-none text-[1.8rem] max-h-[25rem] overflow-y-scroll mb-[2rem]"
                placeholder={
                  props.postUpdateData
                    ? ""
                    : `What's on your mind, ${props.profile.profile_name}?`
                }
              ></textarea>
              {/*<StyledContentEditableSpan>
                <span
                  name="written_text"
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onChange={handleOnChangePostData}
                  data-placeholder={
                    props.postUpdateData
                      ? ""
                      : `What's on your mind, ${props.profile.profile_name}?`
                  }
                  contentEditable="true"
                  className="w-full outline-none text-[1.8rem] max-h-[25rem] overflow-y-scroll mb-[2rem]"
                >
                  {written_text}
                </span>
                </StyledContentEditableSpan> */}
              <div className="h-[20rem] rounded-[1rem] p-[0.8rem] border-[0.1rem] border-gray-300 cursor-pointer">
                <div className="rounded-[1rem] bg-gray-100 flex justify-center items-center h-full hover:bg-gray-200 relative">
                  <div className="bg-gray-300 p-[1rem] rounded-[50%]">
                    <PhotoLibrary className=" " style={{ fontSize: "3rem" }} />
                  </div>
                  <input
                    type="file"
                    id="upload_input"
                    multiple
                    name="upload"
                    title=" "
                    className="text-[1rem] w-full h-full opacity-0 absolute top-0 left-0 cursor-pointer"
                    onChange={handlePreviewUploadImage}
                  />
                  {/* <div className="absolute right-[0.5rem] top-[0.5rem] text-gray-400 rounded-[50%] ">
                    <HighlightOff style={{ fontSize: "3rem" }} />
                  </div> */}
                </div>
              </div>
              <input
                className="w-full outline-none text-[2.4rem] mb-[2rem]"
                type="text"
                placeholder="Add Image link"
                value={media_type}
                name="media_type"
                onChange={handleOnChangePostData}
              />
              <button
                onClick={props.postUpdateData ? handleUpdatePost : handlePost}
                className="w-full bg-blue8f3 text-white rounded-[0.5rem] py-[0.75rem] "
                disabled={!postData.written_text}
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
