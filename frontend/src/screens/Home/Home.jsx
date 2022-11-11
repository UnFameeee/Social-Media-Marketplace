import React from "react";
import CardPost from "../../components/Card/CardPost";
import { Avatar } from "@mui/material";
import PostStatus from "../../components/PostStatus/PostStatus";
import PostModal from "./PostModal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost } from "../../redux/apiRequest";
import { useEffect } from "react";
import ThreeColumns from "../../components/Layout/ThreeColumns";
import { homeLeftbar } from "../../common/layoutConfigs/homeLeftbar";
import styled from "styled-components";

const ResponSiveDiv = styled.div`
  @media screen and (max-width: 1620px) {
    .threeColumn-wrapper {
      padding-left: 20%;
    }
    .left-bar {
      width: 25rem;
    }
  }
  @media screen and (max-width: 1400px) {
    .threeColumn-wrapper {
      padding-left: 15%;
    }
    .left-bar {
      width: 80px;
    }
    .threeColumn-wrapper .left-bar-text {
      display: none;
    }
  }
  @media screen and (max-width: 1312px) {
    .threeColumn-wrapper {
      padding-left: 10%;
    }
  }
  @media only screen and (max-width: 1124px) {
    .threeColumn-wrapper {
      padding-left: 5%;
    }
    .left-bar {
      display: none;
    }
  }
  @media only screen and (max-width: 956px) {
    .right-bar {
      display: none;
    }
    .threeColumn-wrapper {
      padding-left: 11%;
    }
    .post-status-wrapper{
      width:65rem;
    }
    .cardPost {
      width: 65rem;
    }
  }
  @media only screen and (max-width: 808px) {
    .threeColumn-wrapper {
      padding-left: 0;
      padding-right: 0;
    }
    .cardPost {
      width: 100%;
    }
    .post-status-wrapper{
      width: 100%;
    }
  }
`;
function Home() {
  //#region Declare variables
  const dispatch = useDispatch();
  const [openCreatePost, setOpenCreatePost] = useState(false);
  const [postUpdateData, setPostUpdateData] = useState();
  const [reRender, setReRender] = useState(false);
  const posts = useSelector((state) => state.post.get.posts?.results?.data);
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser.access
  );
  const refreshToken = useSelector(
    (state) => state.auth.login.currentUser.refresh
  );
  const userData = useSelector((state) => state.auth.user.userData);
  const profileData = useSelector(
    (state) => state.profile?.profileDetails?.data
  );
  //#endregion

  //#region Function
  const handleOpenPostModel = () => {
    setOpenCreatePost((prev) => !prev);
  };
  const handleGetPostUpdateData = (data) => {
    setPostUpdateData(data);
  };
  //#endregion

  //#region UseEffect
  useEffect(() => {
    let onDestroy = false;
    if (!onDestroy) {
      getAllPost(accessToken, refreshToken, dispatch);
    }
    return () => {
      onDestroy = true;
    };
  }, []);
  //#endregion
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
        />
      )}
      <ResponSiveDiv>
        <ThreeColumns
          className="threeColumn-wrapper px-[30%] pt-6"
          leftBarConfig={{
            leftBarList: [
              {
                left: (
                  <Avatar
                    style={{
                      width: "3.6rem",
                      height: "3.6rem",
                      fontSize: "2rem",
                    }}
                    alt={userData.profile.profile_name}
                    src={
                        userData.profile?.profile_id == profileData?.profile_id
                          ? profileData?.avatar
                          : userData.profile?.avatar
                    }
                  >
                    {userData.profile.profile_name?.at(0)}
                  </Avatar>
                ),
                middle: userData.profile.profile_name,
                navigate: `profile?id=${userData.profile.profile_id}`,
              },
            ].concat(homeLeftbar),
          }}
        >
          <PostStatus
            profile={
              userData.profile?.profile_id == profileData?.profile_id
                ? profileData
                : userData.profile
            }
            onClick={handleOpenPostModel}
          />
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
        </ThreeColumns>
      </ResponSiveDiv>
    </>
  );
}

export default Home;
