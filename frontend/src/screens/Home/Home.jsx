import React from "react";
import {
  Coronavirus,
  People,
  Diversity2,
  Storefront,
  LiveTv,
  EmergencyRecording,
  Search,
  MoreHoriz,
  SearchOutlined,
} from "@mui/icons-material";
import AvatarWithText from "../../components/Avatar/AvatarWithText";
import CreatePostModal from "./CreatePostModal";
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
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost } from "../../redux/apiRequest";
import { useEffect } from "react";

function Home() {
  const dispatch = useDispatch();
  const [openCreatePost, setOpenCreatePost] = useState(false);
  const handleOpenCreatePost = () => {
    setOpenCreatePost((prev) => !prev);
  };
  const posts = useSelector((state) => state.post.get.posts?.results?.data);
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser.access
  );
  useEffect(() => {
    getAllPost(accessToken, dispatch);
  }, [accessToken]);
  useEffect(() => {}, [posts]);
  return (
    <>
      <CreatePostModal
        showModal={openCreatePost}
        setShowModal={setOpenCreatePost}
        avtUrl="https://source.unsplash.com/random/330×320"
      />
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
                onClick={handleOpenCreatePost}
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
            posts.map((post) => 
              <CardPost
                key={post.post_id}
                userName="duy duongss"
                postTime="1 hour"
                content={post.written_text}
                url={post.media_type}
                imgUrl={post.media_type}
              />
            )}
        </div>
        <RightBar />
      </div>
    </>
  );
}

export default Home;
