import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FullWidthHr from "../../components/FullWidthHr/FullWidthHr";
import { removeUploadImages, uploadImages } from "../../redux/apiRequest";
import {
  Avatar,
  TextareaAutosize,
  Button,
  Box,
  Modal,
  Typography,
} from "@mui/material";
import { PhotoLibrary } from "@mui/icons-material";
import {
  removeSingleUploadImagePost,
  resetUploadImagePostState,
} from "../../redux/uploadImage/uploadImageSlice";
import { createPostSaga, updatePostSaga } from "../../redux/post/postSlice";
import notFoundImage from "../../assets/noimage_1.png";
import ImageUploading from "react-images-uploading";
import styled from "styled-components";
const ResponSiveDiv = styled.div`
  @media only screen and (max-width: 700px) {
    .mainContent {
      width: 100%;
    }
  }
`;
function PostModal(props) {
  //#region Declare variables
  const dispatch = useDispatch();
  let flagAction = "post";
  const [postData, setPostData] = useState({
    written_text: props.postUpdateData?.written_text
      ? props.postUpdateData.written_text
      : "",
    post_image: props.postUpdateData?.post_image
      ? props.postUpdateData.post_image
      : "",
  });
  let uploadImageLinkLst = useSelector(
    (state) => state.uploadImage?.uploadImagePost?.data
  );
  if (props.postUpdateData) {
    flagAction = "update";
  }
  const { written_text, post_image } = postData;
  console.log("post_image", post_image);
  const imgElement = useRef(null);
  const [imgArray, setImgArray] = useState([]);
  const [uploadFlag, setUpLoadFlag] = useState(false);
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser.access
  );
  const refreshToken = useSelector(
    (state) => state.auth.login.currentUser.refresh
  );
  const isPosting = useSelector((state) => state.post.create.isFetching);
  const [images, setImages] = useState([]);
  const [removeImages, setRemoveImages] = useState([]);
  const maxNumber = 69;
  //#endregion

  //#region Function
  const closeModal = () => {
    props.setShowModal(false);
    props.setPostUpdateData(null);
    setPostData({ written_text: "", post_image: [] });
    dispatch(resetUploadImagePostState());
    setImgArray([]);
    props.setReRender((prev) => !prev);
  };
  const handlePost = (e) => {
    e.preventDefault();
    var uploadImage = [];
    for (let i = 0; i < images.length; i++) {
      uploadImage.push({ files: images[i].file });
    }
    let postData_written_text = { written_text: written_text };
    dispatch(
      createPostSaga({
        accessToken,
        refreshToken,
        postData_written_text,
        uploadImage,
        dispatch,
      })
    );
    closeModal();
  };
  const handleUpdatePost = (e) => {
    debugger
    var updatePost = {
      post_id: props.postUpdateData.post_id,
      written_text: written_text,
    };
    var uploadImage = [];
    for (let i = 0; i < images.length; i++) {
      uploadImage.push({ files: images[i].file });
    }
    dispatch(
      updatePostSaga({
        accessToken,
        refreshToken,
        updatePost,
        uploadImage,
        removeImages,
        dispatch,
      })
    );
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
    await uploadImages(accessToken, refreshToken, temp, dispatch);
    setUpLoadFlag((prev) => !prev);
    e.target.value = null;
  };
  const handleRemoveUploadedImage = (imageKey) => {
    let filter_post_image = post_image.filter((x) => x.link !== imageKey);
    setPostData({
      ...postData,
      post_image: [...filter_post_image],
    });
    setRemoveImages([...removeImages, imageKey]);
    let post_id = props.postUpdateData.post_id;
    console.log("uploadImagesRemoveLink", removeImages);
  };
  const addToUploadImgArray = (height, width, url) => {
    setImgArray([...imgArray, { height: height, width: width, url: url }]);
  };

  const onChange = (imageList) => {
    setImages(imageList);
  };
  console.log("imageList", images, "post_image", post_image);
  //#endregion

  //#region UseEffect
  useEffect(() => {
    // let onDestroy = false;
    // if (!onDestroy && uploadImageLinkLst.length > 0) {
    //   if (flagAction === "post") {
    //     setPostData({
    //       ...postData,
    //       media_location: [...uploadImageLinkLst],
    //     });
    //   } else if (flagAction === "update") {
    //     dispatch(resetUploadImagePostState());
    //     setPostData({
    //       ...postData,
    //       media_location: [...postData.media_location, ...uploadImageLinkLst],
    //     });
    //   }
    // }
    // return () => {
    //   onDestroy = true;
    // };
  }, [uploadFlag]);
  useEffect(() => {
    // console.log("imgArray", imgArray);
  }, [imgArray]);

  // useEffect(() => {
  //   if (isPosting === true) {
  //     closeModal();
  //   }
  // });

  // useEffect(() => {
  //  if(post_image){
  //   setImages(post_image)
  //  }
  // }, []);

  //#endregion
  return (
    <>
      <Modal className="modal" open={props.showModal} onClose={closeModal}>
        <ResponSiveDiv>
          <div className="mainContent rounded-xl fixed overflow-hidden py-[2rem] top-[50%] left-[50%] w-[70rem]  bg-white translate-x-[-50%] translate-y-[-50%]">
            <div className="flex items-center relative">
              <Button
                style={{
                  position: "absolute",
                  right: "2rem",
                  top: "-0.5rem",
                  padding: "0.5rem",
                  borderRadius: "0.375rem",
                  color: "var(--primary-color)",
                  border: "1px solid var(--primary-color) ",
                }}
                onClick={closeModal}
              >
                Close
              </Button>
              <span className="  text-center w-full px-[2rem] text-[2.4rem] font-semibold">
                {props.postUpdateData ? "Update Post" : "Create Post"}
              </span>
            </div>
            <FullWidthHr />
            <div className="px-[2rem] py-[1rem]">
              <div className="flex items-center gap-[1rem] mb-[1rem]">
                <Avatar
                  style={{
                    fontSize: "2rem",
                  }}
                  alt={props.profile.profile_name}
                  src={
                    props.profile?.picture
                      ? JSON.parse(props.profile?.picture)
                      : null
                  }
                >
                  {props.profile.profile_name?.at(0)}
                </Avatar>
                <span className="font-bold">{props.profile.profile_name}</span>
              </div>
              <TextareaAutosize
                onChange={handleOnChangePostData}
                name="written_text"
                maxRows={5}
                className=" resize-none w-full outline-none text-[1.8rem] max-h-[25rem] overflow-y-scroll mb-[2rem]"
                placeholder={
                  props.postUpdateData
                    ? ""
                    : `What's on your mind, ${props.profile.profile_name}?`
                }
                value={written_text}
              ></TextareaAutosize>
              <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemoveAll,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
                  // write your building UI
                  <div className="upload__image-wrapper">
                    {!imageList.length > 0 && !post_image.length > 0 && (
                      <div
                        onClick={onImageUpload}
                        className="h-[20rem] rounded-[1rem] p-[0.8rem] border-[0.1rem] border-gray-300 cursor-pointer mb-[2rem]"
                      >
                        <div className="rounded-[1rem] bg-gray-100 flex justify-center items-center h-full hover:bg-gray-200 relative">
                          <div className="bg-gray-300 p-[1rem] rounded-[50%]">
                            <PhotoLibrary
                              className=" "
                              style={{ fontSize: "3rem" }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    {((imageList && imageList.length > 0) ||
                      (post_image && post_image.length > 0)) && (
                      <div className="relative shadow-lg bg-slate-100 border-[0.1rem] border-gray-300  rounded-xl p-[0.2rem] h-[250px] overflow-y-scroll mb-[2rem]  ">
                        <ul className="flex flex-wrap gap-[1rem]  ">
                          {post_image &&
                            post_image.map((image) => (
                              <li
                                key={image.link}
                                className=" w-full relative "
                              >
                                <a href={image.link}>
                                  <img
                                    src={image.link}
                                    alt="not found"
                                    onError={({ currentTarget }) => {
                                      currentTarget.onerror = null; // prevents looping
                                      currentTarget.src = notFoundImage;
                                    }}
                                    className=" w-[100%] object-fill rounded-xl "
                                    style={{ cursor: "default" }}
                                  />
                                </a>
                                <div
                                  onClick={() =>
                                    handleRemoveUploadedImage(image.link)
                                  }
                                  className="Remove-Photo-button absolute cursor-pointer top-0"
                                >
                                  <Button
                                    style={{
                                      color: "white",
                                      background: "var(--primary-color)",
                                    }}
                                  >
                                    x
                                  </Button>
                                </div>
                              </li>
                            ))}
                          {imageList.map((image, index) => (
                            <li key={index} className=" w-full relative ">
                              <a href={image["data_url"]}>
                                <img
                                  src={image["data_url"]}
                                  alt="not found"
                                  onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = notFoundImage;
                                  }}
                                  className=" w-[100%] object-fill rounded-xl "
                                  style={{ cursor: "default" }}
                                />
                              </a>
                              <div
                                onClick={() => onImageRemove(index)}
                                className="Remove-Photo-button absolute cursor-pointer top-0"
                              >
                                <Button
                                  style={{
                                    color: "white",
                                    background: "var(--primary-color)",
                                  }}
                                >
                                  x
                                </Button>
                              </div>
                            </li>
                          ))}
                        </ul>
                        <div className="Add-Photo-button absolute top-0 right-0">
                          <Button
                            style={{
                              color: "white",
                              background: "var(--primary-color)",
                            }}
                            onClick={onImageUpload}
                          >
                            Add Photos
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </ImageUploading>
              {
                //   !post_image.length > 0 && (
                //   <div className="h-[20rem] rounded-[1rem] p-[0.8rem] border-[0.1rem] border-gray-300 cursor-pointer mb-[2rem]">
                //     <div className="rounded-[1rem] bg-gray-100 flex justify-center items-center h-full hover:bg-gray-200 relative">
                //       <div className="bg-gray-300 p-[1rem] rounded-[50%]">
                //         <PhotoLibrary
                //           className=" "
                //           style={{ fontSize: "3rem" }}
                //         />
                //       </div>
                //       <input
                //         type="file"
                //         id="upload_input"
                //         multiple
                //         name="upload"
                //         title=" "
                //         className="text-[1rem] w-full h-full opacity-0 absolute top-0 left-0 cursor-pointer border-[1px] border-t-gray-200 "
                //         onChange={handlePreviewUploadImage}
                //       />
                //     </div>
                //   </div>
                // )
              }
              {
                //   post_image && post_image.length > 0 && (
                //   <div className="relative shadow-lg bg-slate-100 border-[0.1rem] border-gray-300  rounded-xl p-[0.2rem] h-[250px] overflow-y-scroll mb-[2rem]  ">
                //     <ul className="flex flex-wrap gap-[1rem]  ">
                //       {post_image.map((image, index) => (
                //         <li key={index} className=" w-full relative ">
                //           <a href={image.link}>
                //             <img
                //               src={image.link}
                //               alt="not found"
                //               onError={({ currentTarget }) => {
                //                 currentTarget.onerror = null; // prevents looping
                //                 currentTarget.src = notFoundImage;
                //               }}
                //               className=" w-[100%] object-fill rounded-xl "
                //               style={{ cursor: "default" }}
                //               ref={imgElement}
                //               onLoad={() =>
                //                 addToUploadImgArray(
                //                   imgElement.current.naturalHeight,
                //                   imgElement.current.naturalWidth,
                //                   image
                //                 )
                //               }
                //             />
                //           </a>
                //           <div
                //             onClick={() => handleRemoveUploadImage(image)}
                //             className="Remove-Photo-button absolute cursor-pointer top-0"
                //           >
                //             <Button
                //               style={{
                //                 color: "white",
                //                 background: "var(--primary-color)",
                //               }}
                //             >
                //               x
                //             </Button>
                //           </div>
                //         </li>
                //       ))}
                //     </ul>
                //     <div className="Add-Photo-button absolute top-0 right-0">
                //       <Button
                //         style={{
                //           color: "white",
                //           background: "var(--primary-color)",
                //         }}
                //       >
                //         Add Photos
                //       </Button>
                //       <input
                //         type="file"
                //         id="upload_input"
                //         multiple
                //         name="upload"
                //         accept="image/png, image/jpeg"
                //         className="text-[1rem] w-full h-full opacity-0 absolute top-0 left-0 "
                //         onChange={handlePreviewUploadImage}
                //         style={{ cursor: "pointer" }}
                //       />
                //     </div>
                //   </div>
                // )
              }
              <Button
                onClick={props.postUpdateData ? handleUpdatePost : handlePost}
                style={{
                  color: postData.written_text
                    ? "white"
                    : "var(--primary-color)",
                  background: postData.written_text
                    ? "var(--primary-color)"
                    : "#e4e6eb",
                }}
                className="w-full bg-blue8f3 text-white rounded-[0.5rem] py-[0.75rem] mt-[2rem] "
                disabled={!postData.written_text}
              >
                {props.postUpdateData ? "Update" : "Post"}
              </Button>
            </div>
          </div>
        </ResponSiveDiv>
      </Modal>
    </>
  );
}

export default PostModal;
