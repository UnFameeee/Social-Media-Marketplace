import React from "react";
import RoundedAvatar from "../../components/Avatar/RoundedAvatar";
import { PhotoCamera, Edit, AddCircle, MoreHoriz } from "@mui/icons-material";
function UserProfile() {
  return (
    <>
      <div className="flex justify-center mx-auto pt-[2%] bg-white shadow-md">
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
              <RoundedAvatar
                url="https://source.unsplash.com/random/190×190"
                size="18rem"
                border={true}
                className="relative"
              />
              <div className="bg-white absolute right-0 top-[12rem] z-10 p-[0.65rem] rounded-[50%] shadow-lg">
                <PhotoCamera
                  className=" bg-white  right-0 top-[12rem] z-10"
                  style={{ fontSize: "2.5rem" }}
                />
              </div>
            </div>
            <div className="flex pl-[24rem] pr-[4rem] items-center justify-center pt-[1.5rem] pb-[5rem] ">
              <div className="flex-1  flex flex-col gap-[0.3rem] ">
                <span className=" font-semibold text-[3rem]">
                  Lorem, ipsum dolor.
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
              <ul className="flex-1 flex gap-[3rem] [&>*]: text-slate-900 text-[2rem]   ">
                <li>Post</li>
                <li>About</li>
                <li>Friends</li>
                <li>Photos</li>
                <li>Videos</li>
                <li>Check-ins</li>
              </ul>
              <MoreHoriz className="Icon" style={{ fontSize: "2.2rem" }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
