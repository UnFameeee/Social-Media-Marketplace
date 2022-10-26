import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AvatarWithText from "../../components/Avatar/AvatarWithText";
import FullWidthHr from "../../components/FullWidthHr/FullWidthHr";
import { createPost, updatePost, uploadImages } from "../../redux/apiRequest";
import styled from "styled-components";
import { PhotoLibrary, HighlightOff, Close } from "@mui/icons-material";
import { resetUploadImagePostState } from "../../redux/uploadImageSlice";
function PostModal(props) {
  //Declare variables
  const dispatch = useDispatch();
  let flagAction = "post";
  const [postData, setPostData] = useState({
    written_text: props.postUpdateData?.written_text
      ? props.postUpdateData.written_text
      : "",
    media_type: props.postUpdateData?.media_type
      ? props.postUpdateData.media_type
      : "",
    media_location: props.postUpdateData?.media_location
      ? JSON.parse(props.postUpdateData.media_location)
      : "",
  });
  let uploadImageLinkLst = useSelector(
    (state) => state.uploadImage?.uploadImagePost?.data
  );
  if (props.postUpdateData) {
    flagAction = "update";
  }
  const { written_text, media_type, media_location } = postData;
  const imgElement = React.useRef(null);
  const [imgArray, setImgArray] = useState([]);
  const [uploadFlag, setUpLoadFlag] = useState(false);
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser.access
  );
  const isPosting = useSelector((state) => state.post.create.isFetching);

  //Function
  const closeModal = () => {
    props.setShowModal(false);
    props.setPostUpdateData(null);
    setPostData({ written_text: "", media_type: "", media_location: [] });
    dispatch(resetUploadImagePostState());
    setImgArray([]);
    props.setReRender((prev) => !prev);
  };
  const handlePost = (e) => {
    e.preventDefault();
    postData.media_location = JSON.stringify(uploadImageLinkLst);
    createPost(accessToken, postData, dispatch);
    closeModal();
  };
  const handleUpdatePost = (e) => {
    var tempUpdatePost = {
      post_id: props.postUpdateData.post_id,
      profile_id: props.postUpdateData.profile_id,
      written_text: postData.written_text,
      media_type: postData.media_type,
      media_location: JSON.stringify(postData.media_location),
    };
    updatePost(accessToken, tempUpdatePost, dispatch);
    closeModal();
  };
  const handleOnChangePostData = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handlePreviewUploadImage = async (e) => {
    const files = e.target.files;
    var temp = [];
    for (let i = 0; i < files.length; i++) {
      temp.push({ files: files[i] });
    }
    await uploadImages(accessToken, temp, dispatch);
    setUpLoadFlag((prev) => !prev);
    e.target.value = null;
  };
  const addToUploadImgArray = (height, url) => {
    setImgArray([...imgArray, { height: height, url: url }]);
  };
  useEffect(() => {
    let onDestroy = false;
    if (!onDestroy && uploadImageLinkLst.length > 0) {
      if (flagAction == "post") {
        setPostData({
          ...postData,
          media_location: [...uploadImageLinkLst],
        });
      } else if (flagAction == "update") {
        dispatch(resetUploadImagePostState());
        setPostData({
          ...postData,
          media_location: [...postData.media_location, ...uploadImageLinkLst],
        });
      }
    }
    return () => {
      onDestroy = true;
    };
  }, [uploadFlag]);
  // useEffect(() => {
  //   console.log("imgArray", imgArray);
  // }, [imgArray]);
  // useEffect(() => {
  //   if (isPosting === true) {
  //     closeModal();
  //   }
  // });
  return (
    <>
      {props.showModal ? (
        <div
          className="w-[100%] h-[100%] fixed left-0 top-0 z-20 "
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <div className="mainContent rounded-xl fixed overflow-hidden py-[2rem] top-[50%] left-[50%] w-[70rem]  bg-white translate-x-[-50%] translate-y-[-50%]">
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
                <AvatarWithText
                  url={
                    props.postUpdateData
                      ? props.postUpdateData.avtUrl
                      : props.profile.picture
                  }
                  size="5rem"
                />
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
                value={written_text}
              ></textarea>
              {!media_location.length > 0 && (
                <div className="h-[20rem] rounded-[1rem] p-[0.8rem] border-[0.1rem] border-gray-300 cursor-pointer">
                  <div className="rounded-[1rem] bg-gray-100 flex justify-center items-center h-full hover:bg-gray-200 relative">
                    <div className="bg-gray-300 p-[1rem] rounded-[50%]">
                      <PhotoLibrary
                        className=" "
                        style={{ fontSize: "3rem" }}
                      />
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
              )}
              {media_location && media_location.length > 0 && (
                <div className="relative bg-slate-100 rounded-xl p-[0.2rem] h-[300px] overflow-y-scroll  ">
                  <ul className="flex flex-wrap gap-[1rem]  ">
                    {media_location.map((item) => (
                      <li key={item} className=" w-full ">
                        <img
                          src={item}
                          alt=""
                          className=" w-[100%] object-fill rounded-xl "
                          style={{ cursor: "default" }}
                          ref={imgElement}
                          onLoad={() =>
                            addToUploadImgArray(
                              imgElement.current.naturalHeight,
                              item
                            )
                          }
                        />
                      </li>
                    ))}
                  </ul>
                  <div className=" bg-slate-300 inline-block p-[1rem] rounded-lg cursor-pointer absolute top-0 right-0">
                    <span>Add Photos</span>
                    <input
                      type="file"
                      id="upload_input"
                      multiple
                      name="upload"
                      title=" "
                      className="text-[1rem] w-full h-full opacity-0 absolute top-0 left-0 "
                      onChange={handlePreviewUploadImage}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
              )}
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
