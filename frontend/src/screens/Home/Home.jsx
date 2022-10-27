import React from "react";
import {
  Coronavirus,
  SearchOutlined,
  PhotoCamera,
  School,
} from "@mui/icons-material";
import CardPost from "../../components/Card/CardPost";
import LeftBar from "../../components/Layout/SideBar/LeftBar";
import RightBar from "../../components/Layout/SideBar/RightBar";
import {
  Box,
  Avatar,
  Paper,
  TextField,
  IconButton,
  InputAdornment,
  Modal,
  Button,
} from "@mui/material";
import FullWidthHr from "../../components/FullWidthHr/FullWidthHr";
import HoverButton from "../UserProfile/HoverButton";
import AvatarWithText from "../../components/Avatar/AvatarWithText";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import PostModal from "./PostModal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost } from "../../redux/apiRequest";
import { useEffect } from "react";

function Home() {
  const dispatch = useDispatch();
  const [openCreatePost, setOpenCreatePost] = useState(false);
  const [postUpdateData, setPostUpdateData] = useState();
  const [reRender, setReRender] = useState(false);
  const posts = useSelector((state) => state.post.get.posts?.results?.data);
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser.access
  );
  const userData = useSelector((state) => state.auth.user.userData);

  const handleOpenPostModel = () => {
    setOpenCreatePost((prev) => !prev);
  };
  const handleGetPostUpdateData = (data) => {
    setPostUpdateData(data);
  };

  useEffect(() => {
    let onDestroy = false;
    if (!onDestroy) {
      getAllPost(accessToken, dispatch);
    }
    return () => {
      onDestroy = true;
    };
  }, [reRender]);
  return (
    <>
      {openCreatePost && (
        <PostModal
          showModal={openCreatePost}
          postUpdateData={postUpdateData}
          setPostUpdateData={setPostUpdateData}
          setShowModal={setOpenCreatePost}
          setReRender={setReRender}
          profile={userData.profile}
          avtUrl="https://source.unsplash.com/random/330×320"
        />
      )}
      <ToastContainer />
      <div className="pt-[6rem] flex w-full">
        <LeftBar
          leftBarList={[
            {
              left: <Coronavirus />,
              middle: "Thạch Dương Duy",
            },
            {
              left: {
                iconButton: true,
                icon: <Coronavirus />,
              },
              middle: <h1>adawdaw</h1>,
              navigate: "concac",
            },
            {
              left: {
                iconButton: true,
                icon: <Coronavirus />,
              },
              middle: "CUM lõ",
              navigate: "concac",
            },
          ]}
        />
        <div className="middleMainContent px-[30%] pt-6 bg-greyf1 w-screen"> 
          <div className="mb-[2rem] bg-white rounded-xl p-[1.5rem] shadow-md  ">
                <AvatarWithText
                  url="https://source.unsplash.com/random/180×180"
                  size={35}
                  haveInput={true}
                  alignCenter={true}
                  inputValue="What's on your mind?"
                  onClick={handleOpenPostModel}
                />
                <FullWidthHr className="mt-[1rem]" />
               {
              //   <HoverButton
              //   flex1={true}
              //   listButton={[
              //     { text: "photo", icon: <PhotoCamera /> },
              //     { text: "School", icon: <School /> },
              //     { text: "Home", icon: <Home /> },
              //   ]}
              // />
               } 
              </div>
          {posts &&
            posts.map((post) => (
              <CardPost
                postData={post}
                key={post.post_id}
                profile={userData.profile}
                setReRender={setReRender}
                handleOpenPostModel={handleOpenPostModel}
                handleGetPostUpdateData={handleGetPostUpdateData}
              />
            ))}
        </div>
        <RightBar />
      </div>
    </>
  );
}

export default Home;
