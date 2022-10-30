import React from "react";
import { Coronavirus } from "@mui/icons-material";
import { IoChatbubbleEllipses } from "react-icons/io5";
import CardPost from "../../components/Card/CardPost";
import LeftBar from "../../components/Layout/SideBar/LeftBar";
import RightBar from "../../components/Layout/SideBar/RightBar";
import { Avatar } from "@mui/material";
import FullWidthHr from "../../components/FullWidthHr/FullWidthHr";
import AvatarWithText from "../../components/Avatar/AvatarWithText";
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
                icon: <IoChatbubbleEllipses />,
              },
              middle: <h1>Messenger</h1>,
              navigate: "messenger",
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
