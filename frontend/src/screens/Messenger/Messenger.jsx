import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Avatar, Button, TextareaAutosize } from "@mui/material";
import { BsEmojiLaughing } from "react-icons/bs";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { io } from "socket.io-client";
import LeftBar from "../../components/Layout/SideBar/LeftBar";
import Message from "../../components/Message/Message";

function Messenger() {
  const userData = useSelector((state) => state.auth.user.userData);
  const sender = 1;
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
  const [messageInput, setMessageInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const scrollRef = useRef();
  const socket = useRef()
  const handleOnChangeMessageInput = (e) => {
    setMessageInput(e.target.value);
  };
  const handleSelectEmoji = (e) => {
    let newMessage = messageInput + e.native;
    setMessageInput(newMessage);
  };
  const handleShowPickEmoji = () => {
    setShowEmojiPicker((prev) => !prev);
  };
  function randomNumberInRange(min, max) {
    // 👇️ get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  let randomId = randomNumberInRange(1,5000)
  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [scrollRef]);
  useEffect(() =>{
    socket.current = io("ws://localhost:8900");
  },[])
  useEffect(() =>{
    socket?.current.emit("addUser",randomId)
    socket?.current.on("getUsers",users=>{
      console.log(users);
    })
  },[randomId])
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
        <div className="chatBoxMiddle px-[1.5rem]  pt-[1.5rem] overflow-y-scroll h-[100%] ">
          {mockConversation &&
            mockConversation.map((item, index) => (
              <div ref={scrollRef}>
                <Message
                  message={item.message}
                  key={index}
                  own={sender === item.sender}
                />
              </div>
            ))}
        </div>
        <div className="chatBoxBottom mb-[1rem] flex px-[1.5rem] gap-[1rem] ">
          <div className="w-[100%] relative flex">
            <div className="absolute flex h-full ">
              <BsEmojiLaughing
                onClick={handleShowPickEmoji}
                className="ml-[3px] mt-[8px] text-[3rem] cursor-pointer top-[20px] left-[20px]"
              />
            </div>
            {showEmojiPicker && (
              <div style={{ position: "absolute", bottom: "60px" }}>
                <Picker data={data} onEmojiSelect={handleSelectEmoji} />
              </div>
            )}
            <TextareaAutosize
              value={messageInput}
              onChange={handleOnChangeMessageInput}
              onFocus={() => setShowEmojiPicker(false)}
              maxRows={3}
              className="w-full p-[1rem] resize-none outline-none rounded-3xl bg-gray-100 pl-[3.7rem]"
            ></TextareaAutosize>
          </div>
          <div className="flex items-center">
            <Button
              style={{
                background: "#1a78f3",
                color: "white",
                textTransform: "uppercase",
              }}
              className=" bg-blue8f3 p-[1rem] rounded-xl text-white"
            >
              send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messenger;
