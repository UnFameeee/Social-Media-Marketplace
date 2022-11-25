import React, { useState, useEffect, useMemo, useRef, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import FullWidthHr from "../../components/FullWidthHr/FullWidthHr";
import { Avatar, TextareaAutosize, Button, Modal } from "@mui/material";
import { Close, PhotoLibrary } from "@mui/icons-material";
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
  const [postData, setPostData] = useState({
    written_text: "",
    post_image: [],
  });
  const { written_text, post_image } = postData;
  
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser.access
  );
  const refreshToken = useSelector(
    (state) => state.auth.login.currentUser.refresh
  );
  const [images, setImages] = useState([]);
  const [removeImages, setRemoveImages] = useState([]);
  const maxNumber = useMemo(() => {
    const result = 69;
    return result;
  }, []);
  //#endregion
  //#region Function
  const closeModal = () => {
    props.setShowPostModal(false);
    setImages([])
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
        callRefreshGallery: uploadImage.length > 0,
        dispatch,
      })
    );
    closeModal();
  };
  const handleUpdatePost = (e) => {
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
        callRefreshGallery: uploadImage.length > 0,
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
  const handleRemoveUploadedImage = (imageKey) => {
    let filter_post_image = post_image.filter((x) => x.link !== imageKey);
    setPostData({
      ...postData,
      post_image: [...filter_post_image],
    });
    setRemoveImages([...removeImages, imageKey]);
  };
  const onChange = (imageList) => {
    setImages(imageList);
  };

  //#endregion

  //#region UseEffect
  useEffect(() => {
    setRemoveImages([]);
    setPostData({
      written_text: props.postUpdateData?.written_text
        ? props.postUpdateData.written_text
        : "",
      post_image: props.postUpdateData?.post_image
        ? props.postUpdateData.post_image
        : "",
    });
  }, [props.showModal]);
  //#endregion
  return (
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
                alt={props.profile?.profile_name}
                src={
                  props.profile?.picture
                    ? JSON.parse(props.profile?.picture)
                    : null
                }
              >
                {props.profile?.profile_name?.at(0)}
              </Avatar>
              <span className="font-bold">{props.profile?.profile_name}</span>
            </div>
            <TextareaAutosize
              onChange={handleOnChangePostData}
              name="written_text"
              maxRows={5}
              className=" resize-none w-full outline-none text-[1.8rem] max-h-[25rem] overflow-y-scroll mb-[2rem]"
              placeholder={
                props.postUpdateData
                  ? ""
                  : `What's on your mind, ${props.profile?.profile_name}?`
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
                onImageRemove,
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
                            <li key={image.link} className=" w-full relative ">
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
                                  className="[&>svg]:text-[2.4rem]"
                                >
                                  <Close />
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
            <Button
              onClick={props.postUpdateData ? handleUpdatePost : handlePost}
              style={{
                color: postData.written_text ? "white" : "var(--primary-color)",
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
  );
}

export default PostModal;
