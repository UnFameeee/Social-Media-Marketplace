import React from "react";
import { Avatar } from "@mui/material";
import { Tooltip } from "@mui/material";
function Message(props) {
  const {message ,own} = props
  return (
    <div className="message">
      {!own && (
        <div className="messageTop flex gap-2 rounded-xl p-1 items-end mr-auto max-w-[30%] mb-[2rem]">
          <Tooltip title="tester" placement="left">
            <Avatar
              style={{ fontSize: "2rem" }}
              alt="https://source.unsplash.com/random/130×130"
              src={props?.url ? props?.url : null}
            >
              {"test"?.at(0)}
            </Avatar>
          </Tooltip>
          <Tooltip title="1min ago" placement="left">
            <div className="flex flex-col relative ">
              <p className="px-[1.5rem] py-[0.5rem] bg-gray-200 rounded-3xl inline-block ">
                {message
                  ? message
                  : `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea,
                omnis?`}
              </p>
            </div>
          </Tooltip>
        </div>
      )}
      {own && (
        <div className="flex justify-end  mb-[2rem]">
          <Tooltip title="1min ago" placement="left">
            <p className=" inline-block selection:bg-blue-600  px-[1.5rem] py-[0.5rem] ml-auto bg-blue8f3 text-white rounded-3xl max-w-[30%]">
              {message
                ? message
                : `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea,
            omnis?`}
            </p>
          </Tooltip>
        </div>
      )}
    </div>
  );
}

export default Message;
