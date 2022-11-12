import React from "react";
import { Avatar } from "@mui/material";
import styled from "styled-components";
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
  const { profile } = props;
  return (
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
              onClick={props.onClick}
              className=" hover:bg-gray-300 cursor-pointer text-gray-500 bg-slate-100 outline-none py-[0.65rem] px-[1.5rem] rounded-[5rem] w-full "
            >
              What's on your mind ?
            </div>
          </div>
        </div>
      </div>
    </ResponSiveDiv>
  );
}

export default PostStatus;
