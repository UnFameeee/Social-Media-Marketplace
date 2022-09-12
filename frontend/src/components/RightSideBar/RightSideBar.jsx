import React from "react";
import AvatarWithText from "../Avatar/AvatarWithText";
import { EmergencyRecording, Search, MoreHoriz } from "@mui/icons-material";
function RightSideBar() {
  return (
    <>
    
      <div className="flex items-center [&>*]:text-slate-500 py-[1rem]">
        <span className="flex-1 text-[2rem] font-semibold ">Contacts</span>
        <div className="flex gap-[1rem] ">
          <EmergencyRecording className="Icon" style={{ fontSize: "2.5rem" }} />
          <Search className="Icon" style={{ fontSize: "2.5rem" }} />
          <MoreHoriz className="Icon" style={{ fontSize: "2.5rem" }} />
        </div>
      </div>
      <ul className="[&>*]:hoverChangeBg [&>*]:mb-0 [&>*]:px-[1rem]">
        <li>
          <AvatarWithText
            url="https://source.unsplash.com/random/10×10"
            size={35}
            border={false}
            userName="naruto"
          />
        </li>
        <li>
          <AvatarWithText
            url="https://source.unsplash.com/random/750×750"
            size={35}
            border={false}
            userName="naruto"
          />
        </li>
        <li>
          <AvatarWithText
            url="https://source.unsplash.com/random/1101×1101"
            size={35}
            border={false}
            userName="naruto"
          />
        </li>
        <li>
          <AvatarWithText
            url="https://source.unsplash.com/random/13"
            size={35}
            border={false}
            userName="naruto"
          />
        </li>
        <li>
          <AvatarWithText
            url="https://source.unsplash.com/random/12"
            size={35}
            border={false}
            userName="naruto"
          />
        </li>
        <li>
          <AvatarWithText
            url="https://source.unsplash.com/random/136"
            size={35}
            border={false}
            userName="naruto"
          />
        </li>
        <li>
          <AvatarWithText
            url="https://source.unsplash.com/random/146"
            size={35}
            border={false}
            userName="naruto"
          />
        </li>
        <li>
          <AvatarWithText
            url="https://source.unsplash.com/random/132"
            size={35}
            border={false}
            userName="naruto"
          />
        </li>
        <li>
          <AvatarWithText
            url="https://source.unsplash.com/random/17"
            size={35}
            border={false}
            userName="naruto"
          />
        </li>
        <li>
          <AvatarWithText
            url="https://source.unsplash.com/random/80"
            size={35}
            border={false}
            userName="naruto"
          />
        </li>
        <li>
          <AvatarWithText
            url="https://source.unsplash.com/random/1030"
            size={35}
            border={false}
            userName="naruto"
          />
        </li>
        <li>
          <AvatarWithText
            url="https://source.unsplash.com/random/1323"
            size={35}
            border={false}
            userName="naruto"
          />
        </li>
        <li>
          <AvatarWithText
            url="https://source.unsplash.com/random/13012"
            size={35}
            border={false}
            userName="naruto"
          />
        </li>
        <li>
          <AvatarWithText
            url="https://source.unsplash.com/random/1390"
            size={35}
            border={false}
            userName="naruto"
          />
        </li>
        <li>
          <AvatarWithText
            url="https://source.unsplash.com/random/34130"
            size={35}
            border={false}
            userName="naruto"
          />
        </li>
      </ul>
      <hr className="text-greyf1" />
    </>
  );
}

export default RightSideBar;
