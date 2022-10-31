import React from "react";
import { Coronavirus } from "@mui/icons-material";
import CardPost from "../../components/Card/CardPost";
import LeftBar from "../../components/Layout/SideBar/LeftBar";
import RightBar from "../../components/Layout/SideBar/RightBar";
import { Avatar } from "@mui/material";
import PostStatus from "../../components/PostStatus/PostStatus";
import FullWidthHr from "../../components/FullWidthHr/FullWidthHr";
import AvatarWithText from "../../components/Avatar/AvatarWithText";
import { ToastContainer } from "react-toastify";
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
        />
      )}
      <ToastContainer />
      <div className="pt-[6rem] flex w-full">
        <LeftBar
          leftBarList={[
            {
              left: (
                <Avatar
                  style={{ width: "5rem", height: "5rem", fontSize: "2rem" }}
                  alt={userData.profile.profile_name}
                  src={
                    userData.profile?.picture
                      ? JSON.parse(userData.profile?.picture)
                      : null
                  }
                >
                  {userData.profile.profile_name?.at(0)}
                </Avatar>
              ),
              middle: userData.profile.profile_name,
              navigate: "userprofile",
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
            <PostStatus profile={userData.profile}  onClick={handleOpenPostModel}  />
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
