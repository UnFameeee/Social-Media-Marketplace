import React from "react";
import { useSelector } from "react-redux";
import LeftBar from "../../components/Layout/SideBar/LeftBar";
import { Avatar } from "@mui/material";
function Messenger() {
  const userData = useSelector((state) => state.auth.user.userData);

  return (
    <div className="pt-[7rem] flex h-screen">
      <div className="chatMenu flex-[3.5]">
        <div className="chatMenuWrapper bg-red-200">
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
      <div className="chatBox flex-[5]">
        <div className="chatBoxWrapper">Box</div>
      </div>
      <div className="chatOnline flex-[3]">
        <div className="chatOnlineWrapper">Online</div>
      </div>
    </div>
  );
}

export default Messenger;
