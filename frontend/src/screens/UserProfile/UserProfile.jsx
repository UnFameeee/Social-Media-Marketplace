import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import AvatarWithText from "../../components/Avatar/AvatarWithText";
import {
  PhotoCamera,
  Edit,
  AddCircle,
  MoreHoriz,
  School,
  Home,
  Favorite,
  AccessTimeFilled,
  RssFeed,
} from "@mui/icons-material";
import SideBarButton from "./SideBarButton";
import { style } from "@mui/system";
import SideBarLi from "./SideBarLi";
import FullWidthHr from "../../components/FullWidthHr/FullWidthHr";
import HoverButton from "./HoverButton";
import CardPost from "../../components/Card/CardPost";
import GridSideInfo from "./GridSideInfo";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost } from "../../redux/apiRequest";
function UserProfile() {
  const dispatch = useDispatch();
  const [reRender, setReRender] = useState(false);
  const SideBarList = [
    { text: "Went to Truong THCS Long Duc", icon: <School /> },
    { text: "Lives in Tra Vinh", icon: <Home /> },
    { text: "Single", icon: <Favorite /> },
    { text: "Joined on October 2014", icon: <AccessTimeFilled /> },
    { text: "Followed by 52 people", icon: <RssFeed /> },
  ];
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser.access
  );
  const posts = useSelector((state) => state.post.get.posts?.results?.data);
  const [openCreatePost, setOpenCreatePost] = useState(false);
  const [postUpdateData, setPostUpdateData] = useState();
  const handleOpenPostModel = () => {
    setOpenCreatePost((prev) => !prev);
  };
  const handleGetPostUpdateData = (data) => {
    setPostUpdateData(data);
  };
  const userData = useSelector((state) => state.auth.user.userData);
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
      <div className="flex justify-center pt-[2%] bg-white shadow-md">
        <div className="relative">
          <img
            src="https://source.unsplash.com/random/100×100"
            className="w-[120rem] h-[30rem] object-cover rounded-bl-xl rounded-br-xl shadow-lg"
            alt=""
          />
          <div className="hover:cursor-pointer flex items-center absolute right-[1rem] top-[25rem] bg-white p-[0.65rem] rounded-lg gap-[0.75rem]">
            <PhotoCamera className="" style={{ fontSize: "2.5rem" }} />
            <span className="text-[1.8rem]">Edit Cover Photo</span>
          </div>
          <div className="">
            <div className="bigRoundAvt absolute  left-[3.5rem] top-[26rem]">
              <AvatarWithText
                url={userData.profile?.picture ?? ""} 
                size="18rem"
                border={true}
                className="relative"
              />
              <div className="bg-white absolute right-0 top-[12rem] z-1 p-[0.65rem] rounded-[50%] shadow-lg hover:cursor-pointer">
                <PhotoCamera
                  className=" bg-white  right-0 top-[12rem] z-1"
                  style={{ fontSize: "2.5rem" }}
                />
              </div>
            </div>
            <div className="flex pl-[24rem] pr-[4rem] items-center justify-center py-[3.5rem] ">
              <div className="flex-1  flex flex-col gap-[0.3rem] ">
                <span className=" font-semibold text-[3rem]">
                  {userData.profile.profile_name}
                </span>
                <span className="text-[1.8rem] font-bold text-gray-600">
                  45 friends
                </span>
              </div>
              <div className="flex items-end gap-[1rem] [&>*]:hover:cursor-pointer">
                <div className=" bg-blue8f3 [&>*]:text-white p-[0.75rem] rounded-[0.75rem] flex items-center gap-[0.3rem]">
                  <AddCircle style={{ fontSize: "2.2rem" }} />
                  <span className=" text-[1.6rem] font-semibold">
                    Add to story
                  </span>
                </div>
                <div className=" bg-slate-300 [&>*]:text-black p-[0.75rem] rounded-[0.75rem] flex items-center gap-[0.3rem]">
                  <Edit style={{ fontSize: "2.2rem" }} />
                  <span className=" text-[1.6rem] font-semibold">
                    Edit profile
                  </span>
                </div>
              </div>
            </div>
            <hr className="mt-[1.5rem] h-[0.15rem] border-0 bg-slate-300 rounded-sm  w-full " />
            <div className="flex items-center py-[1.5rem] px-[1rem]">
              <HoverButton
                ulGap="1.5rem"
                listButton={[
                  { text: "Post" },
                  { text: "About" },
                  { text: "Friends" },
                  { text: "Photos" },
                  { text: "Videos" },
                  { text: "Check-ins" },
                ]}
              />
              <MoreHoriz className="Icon" style={{ fontSize: "2.2rem" }} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[2rem] flex mx-auto w-[120rem] gap-[2rem]">
        <div className="leftSideInfo w-[45%]  flex flex-col relative">
          <div className="sticky top-[-83.5rem] ">
            <div className="bg-white rounded-xl p-[1.5rem] shadow-md mb-[2rem] ">
              <div className="flex flex-col">
                <span className="font-bold text-[2.3rem]">Intro</span>
                <span className=" text-center mt-[2rem]">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Delectus, sunt? Lorem ipsum dolor sit amet consectetur
                  adipisicing
                </span>
                <SideBarButton label="Edit bio" />
                <ul className="mt-[2rem] flex flex-col gap-[2rem] [&>li]:flex [&>li]:items-center [&>li]:gap-[1rem]">
                  {SideBarList &&
                    SideBarList.map((li, index) => {
                      return (
                        <SideBarLi key={index} text={li.text} icon={li.icon} />
                      );
                    })}
                </ul>
                <SideBarButton label="Edit details" />
                <SideBarButton label="Add Hobbies" />
                <SideBarButton label="Add Featured" />
              </div>
            </div>
            <GridSideInfo
              type="photo"
              leftLabel="Photo"
              rightLabel="See all Photos"
              listImg={[
                { url: "https://source.unsplash.com/random/211×212" },
                { url: "https://source.unsplash.com/random/211×211" },
                { url: "https://source.unsplash.com/random/211×213" },
                { url: "https://source.unsplash.com/random/211×214" },
                { url: "https://source.unsplash.com/random/211×215" },
                { url: "https://source.unsplash.com/random/211×216" },
                { url: "https://source.unsplash.com/random/211×218" },
                { url: "https://source.unsplash.com/random/211×217" },
                { url: "https://source.unsplash.com/random/211×219" },
              ]}
            />
            <GridSideInfo
              type="friendPhoto"
              leftLabel="Friends"
              rightLabel="See all Friends"
              listImg={[
                {
                  url: "https://source.unsplash.com/random/211×202",
                  name: "madara",
                },
                {
                  url: "https://source.unsplash.com/random/211×201",
                  name: "naruto",
                },
                {
                  url: "https://source.unsplash.com/random/211×203",
                  name: "pain",
                },
                {
                  url: "https://source.unsplash.com/random/211×204",
                  name: "sasuke",
                },
                {
                  url: "https://source.unsplash.com/random/211×205",
                  name: "obito",
                },
                {
                  url: "https://source.unsplash.com/random/211×206",
                  name: "kakashi",
                },
                {
                  url: "https://source.unsplash.com/random/211×208",
                  name: "minato",
                },
                {
                  url: "https://source.unsplash.com/random/211×207",
                  name: "itatchi",
                },
                {
                  url: "https://source.unsplash.com/random/211×209",
                  name: "sisui",
                },
              ]}
            />
          </div>
        </div>
        <div className="rightSidePosts w-[55%]">
          <div className="mb-[2rem] bg-white rounded-xl p-[1.5rem] shadow-md  ">
            <AvatarWithText
              url="https://source.unsplash.com/random/180×180"
              size={35}
              haveInput={true}
              alignCenter={true}
              inputValue="What's on your mind?"
            />
            <FullWidthHr className="mt-[1rem]" />
            <HoverButton
              flex1={true}
              listButton={[
                { text: "photo", icon: <PhotoCamera /> },
                { text: "School", icon: <School /> },
                { text: "Home", icon: <Home /> },
              ]}
            />
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
      </div>
    </>
  );
}

export default UserProfile;
