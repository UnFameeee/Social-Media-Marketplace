import React from "react";
import {
  ThumbUp,
  Send,
  ChatBubbleOutline,
  ArrowDropDown,
  MoreHoriz,
} from "@mui/icons-material";
import RoundedAvatar from "../Avatar/RoundedAvatar";
function CardPost(props) {
  return (
    <div className="cardPost bg-white pt-[1.5rem] pb-[1.5rem] mb-[2rem] drop-shadow-md rounded-lg border-2 w-full">
      <div className="w-full bg">
        <div className="header flex items-center gap-[0.8rem] w-full mb-[1rem] px-[2rem] relative">
          <img
            src={props.url}
            className="w-[4.5rem] h-[4.5rem] rounded-[50%] border-2 border-blue-300"
            alt=""
          />
          <div className="">
            <p>{props.userName}</p>
            <span className=" font-light text-[1.4rem]">
              {props.postTime} ago
            </span>
          </div>
          <MoreHoriz
            className="absolute right-[2rem] Icon"
            style={{ fontSize: "2.5rem" }}
          />
        </div>
        <div className="content ">
          <div className="paragraph px-[2rem] mb-[1rem]">
            <span className="text-grey1f">{props.content}</span>
          </div>
          <div className="px-[-1rem] mb-[0.5rem]">
            <img
              src={props.imgUrl}
              alt=""
              className="w-full min-w-[20rem] h-[45rem] object-cover"
            />
          </div>
          <div className="mb-[0.5rem] px-[2rem]">
            <ThumbUp
              className="Icon text-blue8f3"
              style={{ fontSize: "2rem" }}
            />{" "}
            <span className="text-grey1f">Eric and 45 more peoples</span>
          </div>
          <hr className="mb-[1rem]" />
          <div className="reactButton flex mb-[1rem] ">
            <button className="w-full flex justify-center gap-[0.5rem] ">
              <ThumbUp
                className="Icon text-blue8f3"
                style={{ fontSize: "2.5rem" }}
              />{" "}
              <span>Like</span>
            </button>
            <button className="w-full ">
              <ChatBubbleOutline
                className="Icon outline-none"
                style={{ fontSize: "2.5rem" }}
              />{" "}
              <span>Comment</span>
            </button>
            <button className="w-full">
              <Send className="Icon" style={{ fontSize: "2.5rem" }} />{" "}
              <span>Send</span>
            </button>
          </div>
          <hr className="mb-[0.5rem] " />
          <div className="flex justify-end mb-[0.5rem] items-center px-[2rem]">
            <span>Most relate comment</span>
            <ArrowDropDown style={{ fontSize: "2.5rem" }} />
          </div>
          <div className="GroupUserCommenting px-[2rem] [&>*]:mb-[1rem]">
            <RoundedAvatar
              url="https://source.unsplash.com/random/180×180"
              size={35}
              border={true}
              userName="Duy duong"
              haveInput={true}
            />
            <RoundedAvatar
              url="https://source.unsplash.com/random/100×100"
              size={35}
              border={false}
              userName="madara"
              comment="shinra tensie"
            />
            <RoundedAvatar
              url="https://source.unsplash.com/random/130×130"
              size={35}
              border={false}
              userName="naruto"
              comment="yamero"
            />
            <div className="flex">
              <span className="flex-1 hover:cursor-pointer">
                See more comments
              </span>
              <span>4/50</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardPost;
