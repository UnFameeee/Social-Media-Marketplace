import React from "react";
import {
  Coronavirus,
  People,
  Diversity2,
  Storefront,
  LiveTv,
  SearchOutlined,
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
  const [reRender, setReRender] = useState(false)
  const handleOpenPostModel = () => {
    setOpenCreatePost((prev) => !prev);
  };
  console.log(reRender)
  const handleGetPostUpdateData = (data) => {
    setPostUpdateData(data);
  };
  const posts = useSelector((state) => state.post.get.posts?.results?.data);
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser.access
  );
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
      <PostModal
        showModal={openCreatePost}
        postUpdateData={postUpdateData}
        setPostUpdateData={setPostUpdateData}
        setShowModal={setOpenCreatePost}
        setReRender={setReRender}
        avtUrl="https://source.unsplash.com/random/330×320"
      />
      <ToastContainer />
      <div className="pt-[6rem] flex w-full">
        <LeftBar
          leftBarList={[
            { text: "Covid- 19 infomation", iconName: <Coronavirus /> },
            { text: "Friends", iconName: <People /> },
            { text: "Groups", iconName: <Diversity2 /> },
            { text: "Marketplace", iconName: <Storefront /> },
            { text: "Watch", iconName: <LiveTv /> },
            { text: "Covid- 19 infomation", iconName: <Coronavirus /> },
            { text: "Friends", iconName: <People /> },
            { text: "Groups", iconName: <Diversity2 /> },
            { text: "Marketplace", iconName: <Storefront /> },
            { text: "Watch", iconName: <LiveTv /> },
            { text: "Covid- 19 infomation", iconName: <Coronavirus /> },
            { text: "Friends", iconName: <People /> },
            { text: "Groups", iconName: <Diversity2 /> },
            { text: "Marketplace", iconName: <Storefront /> },
            { text: "Watch", iconName: <LiveTv /> },
          ]}
        />
        <div className="middleMainContent px-[30%] pt-6 bg-greyf1 w-screen">
          <Paper sx={{ height: "15rem", marginBottom: "1.5rem" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar />
              <TextField
                onClick={handleOpenPostModel}
                placeholder="Search Facebook"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton>
                        <SearchOutlined sx={{ fontSize: "2.2rem" }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  marginLeft: "1.2rem",
                  "& .MuiOutlinedInput-root": {
                    "& > fieldset": { border: "none" },
                  },
                  "& .MuiInputBase-root": {
                    background: "#F0F2F5",
                    height: "4.4rem",
                    borderRadius: "5rem",
                  },
                }}
              />
            </Box>
          </Paper>
          {posts &&
            posts.map((post) => (
              <CardPost
                postData={post}
                key={post.post_id}
                postTime="1 hour"
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
