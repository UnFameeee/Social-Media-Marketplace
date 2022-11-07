import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FullWidthHr from "../../components/FullWidthHr/FullWidthHr";
import { createPost, uploadImages } from "../../redux/apiRequest";
import {
  Avatar,
  TextareaAutosize,
  Button,
  Box,
  Modal,
  Typography,
} from "@mui/material";
import { PhotoLibrary } from "@mui/icons-material";
import ImageUploading from "react-images-uploading";
import {
  removeSingleUploadImagePost,
  resetUploadImagePostState,
} from "../../redux/uploadImage/uploadImageSlice";
import { createPostSaga, updatePostSaga } from "../../redux/post/postSlice";
import notFoundImage from "../../assets/noimage_1.png";
function PostModal(props) {
  //#region Declare variables
  const dispatch = useDispatch();
  let flagAction = "post";
  const [postData, setPostData] = useState({
    written_text: props.postUpdateData?.written_text
      ? props.postUpdateData.written_text
      : "",
  });
  let uploadImageLinkLst = useSelector(
    (state) => state.uploadImage?.uploadImagePost?.data
  );
  if (props.postUpdateData) {
    flagAction = "update";
  }
  const { written_text } = postData;
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
  const maxNumber = 69;
  //#endregion

  //#region Function
  const closeModal = () => {
    props.setShowModal(false);
    props.setPostUpdateData(null);
    setPostData({ written_text: "" });
    dispatch(resetUploadImagePostState());
    setImgArray([]);
    props.setReRender((prev) => !prev);
  };
  const handlePost = async (e) => {
    e.preventDefault();
    // postData.media_location = JSON.stringify(uploadImageLinkLst);
    //dispatch(createPostSaga({ accessToken, refreshToken, postData, dispatch }));
    console.log("images", images);
    var imagesFormData = [];
    for (let i = 0; i < images.length; i++) {
      imagesFormData.push({ files: images[i].file });
    }
    const res = await createPost(accessToken, refreshToken, postData, dispatch);
    const res2 = await uploadImages(
      accessToken,
      refreshToken,
      res.results.post_id,
      imagesFormData,
      dispatch
    );
    console.log("lol createPost", res);
    console.log("lol upload image", res2);
    closeModal();
  };
  const handleUpdatePost = (e) => {
    var updatePost = {
      post_id: props.postUpdateData.post_id,
      profile_id: props.postUpdateData.profile_id,
      written_text: postData.written_text,
      media_type: postData.media_type,
      media_location: JSON.stringify(postData.media_location),
    };
    // updatePost(accessToken,refreshToken, updatePost, dispatch);
    dispatch(
      updatePostSaga({ accessToken, refreshToken, updatePost, dispatch })
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
  const handleRemoveUploadImage = (imageKey) => {
    // let filterMedia_Location = media_location.filter((x) => x !== imageKey);
    // setPostData({
    //   ...postData,
    //   media_location: [...filterMedia_Location],
    // });
    // dispatch(removeSingleUploadImagePost(imageKey));
  };
  const addToUploadImgArray = (height, width, url) => {
    setImgArray([...imgArray, { height: height, width: width, url: url }]);
  };

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  //#endregion

  //#region UseEffect
  useEffect(() => {
    let onDestroy = false;
    if (!onDestroy && uploadImageLinkLst.length > 0) {
      if (flagAction === "post") {
        setPostData({
          ...postData,
          media_location: [...uploadImageLinkLst],
        });
      } else if (flagAction === "update") {
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
  useEffect(() => {
    // console.log("imgArray", imgArray);
  }, [imgArray]);

  // useEffect(() => {
  //   if (isPosting === true) {
  //     closeModal();
  //   }
  // });
  //#endregion
  return (
    <>
      <Modal open={props.showModal} onClose={closeModal}>
        <div
          className="w-[100%] h-[100%] fixed left-0 top-0 z-20 "
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
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
                    {imageList && imageList.length == 0 && (
                      <div className="h-[20rem] rounded-[1rem] p-[0.8rem] border-[0.1rem] border-gray-300 cursor-pointer mb-[2rem]">
                        <div
                          onClick={onImageUpload}
                          className="rounded-[1rem] bg-gray-100 flex justify-center items-center h-full hover:bg-gray-200 relative"
                        >
                          <div className="bg-gray-300 p-[1rem] rounded-[50%]">
                            <PhotoLibrary
                              className=" "
                              style={{ fontSize: "3rem" }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    {imageList && imageList.length > 0 && (
                      <div className="relative shadow-lg bg-slate-100 border-[0.1rem] border-gray-300  rounded-xl p-[0.2rem] h-[250px] overflow-y-scroll mb-[2rem]  ">
                        <ul className="flex flex-wrap gap-[1rem]  ">
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
                            onClick={onImageUpload}
                            style={{
                              color: "white",
                              background: "var(--primary-color)",
                            }}
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
                //   !media_location.length > 0 && (
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
                //   media_location && media_location.length > 0 && (
                //   <div className="relative shadow-lg bg-slate-100 border-[0.1rem] border-gray-300  rounded-xl p-[0.2rem] h-[250px] overflow-y-scroll mb-[2rem]  ">
                //     <ul className="flex flex-wrap gap-[1rem]  ">
                //       {media_location.map((item) => (
                //         <li key={item} className=" w-full relative ">
                //           <a href={item}>
                //             <img
                //               src={item}
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
                //                   item
                //                 )
                //               }
                //             />
                //           </a>
                //           <div
                //             onClick={() => handleRemoveUploadImage(item)}
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
        </div>
      </Modal>
    </>
  );
}

export default PostModal;
