import React from 'react';
import CardPost from '../../components/Card/CardPost';
import { Avatar } from '@mui/material';
import PostStatus from '../../components/PostStatus/PostStatus';
import PostModal from './PostModal';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPost } from '../../redux/apiRequest';
import { useEffect } from 'react';
import ThreeColumns from '../../components/Layout/ThreeColumns';
import { homeLeftbar } from '../../common/layout/homeLeftbar';
function Home() {
  //#region Declare variables
  const dispatch = useDispatch();
  const [openCreatePost, setOpenCreatePost] = useState(false);
  const [postUpdateData, setPostUpdateData] = useState();
  const [reRender, setReRender] = useState(false);
  const posts = useSelector(
    (state) => state.post.get.posts?.results?.data
  );
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser.access
  );
  const refreshToken = useSelector(
    (state) => state.auth.login.currentUser.refresh
  );
  const userData = useSelector((state) => state.auth.user.userData);
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
      <ThreeColumns
        className="px-[30%] pt-6"
        leftBarConfig={{
          leftBarList: [
            {
              left: (
                <Avatar
                  style={{
                    width: '3.6rem',
                    height: '3.6rem',
                    fontSize: '2rem',
                  }}
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
              navigate: `profile?id=${userData.profile.profile_id}`,
            },
          ].concat(homeLeftbar),
        }}
      >
        <div className="mb-[2rem] bg-white rounded-xl p-[1.5rem] shadow-md  ">
          <PostStatus
            profile={userData.profile}
            onClick={handleOpenPostModel}
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
      </ThreeColumns>
    </>
  );
}

export default Home;
