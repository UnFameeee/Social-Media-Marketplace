import React from "react";
import { useSelector } from "react-redux";
import LeftBar from "../../components/Layout/SideBar/LeftBar";
import { Avatar, Button } from "@mui/material";
import Message from "../../components/Message/Message";
import { useState } from "react";
import { useEffect } from "react";
function Messenger() {
  const userData = useSelector((state) => state.auth.user.userData);
  const mockConversation = [
    
    {
      sender: 2,
      receiver: 1,
      message: "oh hi",
    },
    {
      sender: 1,
      receiver: 2,
      message: "hello there",
    },
    {
      sender: 2,
      receiver: 1,
      message: "how are you?",
    },{
      sender: 2,
      receiver: 1,
      message: "every thing is doing good?",
    },
    {
      sender: 1,
      receiver: 2,
      message: "not really much :)",
    },
    {
      sender: 2,
      receiver: 1,
      message: "k",
    },
    {
      sender: 1,
      receiver: 2,
      message: "so how is your day?",
    },
  ];
  const sender = 1;
  console.log("mockConversation",mockConversation);


  return (
    <div className="pt-[6rem] flex h-screen ">
      <div className="chatMenu flex-[2] ">
        <div className="chatMenuWrapper">
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
                navigate: "/userprofile",
              },
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
            ]}
          />
        </div>
      </div>
      <div className="chatBox pt-[1rem] flex-[8] bg-white flex flex-col">
        <div className="chatBoxTop">
          <div className="flex pb-[1rem] px-[1.5rem] gap-[1rem] border-b-[1px] border-gray-200 items-center">
            <Avatar
              style={{ fontSize: "2rem" }}
              alt={userData.profile.profile_name}
              src={
                userData.profile?.picture
                  ? JSON.parse(userData.profile?.picture)
                  : null
              }
            >
              {userData.profile.profile_name?.at(0)}
            </Avatar>
            <span className=" font-semibold">duy duong</span>
          </div>
        </div>
        <div className=" px-[1.5rem] chatBoxMiddle pt-[1.5rem] overflow-y-scroll h-[100%] ">
          {
            mockConversation &&  mockConversation.map((item,index) =>
              <Message message={item.message} own={sender === item.sender} />
            )
          }
        </div>
        <div className="chatBoxBottom mb-[1rem] flex px-[1.5rem] gap-[1rem] ">
          <textarea className="w-[85%] p-[1rem] resize-none outline-none rounded-3xl bg-gray-100"></textarea>
          <div className="flex items-center">
            <button className=" bg-blue8f3 p-[1rem] rounded-xl text-white">
              send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messenger;
