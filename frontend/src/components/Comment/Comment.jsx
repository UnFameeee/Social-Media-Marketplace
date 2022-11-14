import React from "react";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import CommentList from "./CommentList";
import MUI from "../MUI";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ReplyIcon from "@mui/icons-material/Reply";
import { useState } from "react";
import CommentForm from "./CommentForm";
import { useEffect } from "react";
function Comment({ id, message, user, createdAt, isShowChildComment }) {
  let childComments = [
    {
      id: 4,
      message: "test4",
      user: 1,
      createdAt: 2022,
    },
    {
      id: 5,
      message: "            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse excepturi a ratione hic rerum. Repellat enim iure eveniet officia minima sunt consectetur eos beatae dolores explicabo, alias rerum nostrum? Eveniet nisi cum ab incidunt repellat labore reprehenderit minus aspernatur voluptas, molestias, sequi doloribus? Quidem adipisci minus magnam, autem cumque architecto?",
      user: 2,
      createdAt: 2022,
    },
    // {
    //   id: 6,
    //   message: "test6",
    //   user: 3,
    //   createdAt: 2022,
    // },
  ];
  const userData = useSelector((state) => state.auth.user.userData);
  const [showFormComment, setShowFormComment] = useState(false);
  const [showChildComment, setShowChildComment] = useState(false);
  function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const [randomNum, setRandomNum] = useState(0);
  useEffect(() => {
    setRandomNum(randomNumberInRange(0, 1));
  }, []);
  console.log("showChildComment", isShowChildComment);
  return (
    <>
      <div className="comment">
        <div className="comment-info items-baseline flex gap-[0.5rem] mb-[1rem]">
          <Avatar
            style={{
              fontSize: "2rem",
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
          <div className="name-and-message flex flex-col ">
            <div className="bg-greyf1 rounded-xl p-[1rem]">
              <span className="line-clamp-1">Nguyễn Hoàng Hai Dụ</span>
              <div className="message">{message}</div>
            </div>
            <div className="footer flex gap-[0.2rem] items-center">
              <MUI.BetterIconButton>
                <ThumbUpIcon />
              </MUI.BetterIconButton>
              <MUI.BetterIconButton
                onClick={() => setShowFormComment((prev) => !prev)}
              >
                <ReplyIcon />
              </MUI.BetterIconButton>
              <span> 1 hour</span>
            </div>
          </div>
        </div>
        {showFormComment ? (
          <div className="ml-[4rem] mb-[1rem]">
            <CommentForm />
          </div>
        ) : null}
      </div>
      {showChildComment || isShowChildComment ? (
        randomNum ? (
          <div className="child-comment ml-[2rem] relative">
            <div
              className="collapse-line-btn h-full bg-[#bdbdbd] absolute text-[#bdbdbd] max-w-[2.5px] left-[-5px]"
            >
              <span className=" opacity-0">|</span>
            </div>
            <div className="nested-child-comment">
              <CommentList
                comments={randomNum ? childComments : []}
                isShowChildComment={true}
              />
            </div>
          </div>
        ) : null
      ) : randomNum ? (
        <MUI.Button onClick={() => setShowChildComment((prev) => !prev)}>
          Show reply comment
        </MUI.Button>
      ) : null
    }
    </>
  );
}

export default Comment;
