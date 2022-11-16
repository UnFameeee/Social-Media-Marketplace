import React, { useState } from "react";
import { Avatar } from "@mui/material";
import styled from "styled-components";
import { useSelector } from "react-redux";
import PostModal from "../../screens/Home/PostModal";
const ResponSiveDiv = styled.div`
  @media only screen and (max-width: 1240px) {
    .post-status-wrapper {
      width: 60rem;
    }
  }
  @media only screen and (max-width: 1068px) {
    .post-status-wrapper {
      width: 50rem;
    }
  }
`;
function PostStatus(props) {
  const [showPostModal, setShowPostModal] = useState(false);
  const userData = useSelector((state) => state.auth?.user?.userData.profile);
  const { profile } = props;
  const handleClickShowPostModal = () => {
    setShowPostModal(true)
  }
  return (
    <>
      <PostModal
        showModal={showPostModal}
        setReRender={props.setReRender}
        setShowPostModal={setShowPostModal}
        profile={userData}
      />
      <ResponSiveDiv>
        <div className="post-status-wrapper mb-[2rem] bg-white rounded-xl p-[2rem] shadow-md w-[70rem] border-2">
          <div className="post-status-main-content flex items-center gap-[0.5rem] w-full">
            <Avatar
              style={{ fontSize: "2rem" }}
              alt={profile?.profile_name}
              src={profile?.avatar ? profile?.avatar : null}
            >
              {profile?.profile_name?.at(0)}
            </Avatar>
            <div className="w-full ">
              <div
                onClick={handleClickShowPostModal}
                className=" hover:bg-gray-300 cursor-pointer text-gray-500 bg-slate-100 outline-none py-[0.65rem] px-[1.5rem] rounded-[5rem] w-full "
              >
                What's on your mind ?
              </div>
            </div>
          </div>
        </div>
      </ResponSiveDiv>
    </>
  );
}

export default PostStatus;
