import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FacebookOutlined, Close } from "@mui/icons-material";
import {
  Paper,
  Grid,
  IconButton,
  Avatar,
  Typography,
  ClickAwayListener,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { IoLogOut } from "react-icons/io5";
import MUI from "../../MUI";
import { useDispatch, useSelector } from "react-redux";
import { middleNavIcons, rightNavIcons } from "../../../common/layout/navbar";
import { revertAll } from "../../../redux/resetStore";
import { Helper } from "../../../utils/Helper";
import "../Layout.css";

export default function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [avatarMenu, setAvatarMenu] = useState(false);
  const [value, setValue] = useState("");
  const [rightGroup, setRightGroup] = useState("");
  const userData = useSelector((state) => state.auth.user.userData);
  
  function handleSearch() {}

  return (
    // #region oldCode
    // <div className="flex items-center px-5 py-1 bg-white fixed w-screen drop-shadow-md z-50">
    //   <div className="rightNav flex items-center w-[25%] gap-1 pt-3">
    //     <Facebook className=" text-blue8f3 Icon " style={{ fontSize: 40 }} />
    //     <div className="">
    //       <form action="">
    //         <div className="flex relative items-center">
    //           <Search className=" absolute left-2 text-slate-500 pointer-events-none rotate-90 " style={{ fontSize: 25 }}/>
    //           <input
    //             type="text"
    //             className="pl-[3.3rem] py-[0.75rem] rounded-xl outline-none bg-greyf1"
    //           />
    //         </div>
    //       </form>
    //     </div>
    //   </div>

    //   <div className="centerNav flex-1">
    //     <ul className="listNav flex justify-center gap-0">
    //       <li className="navBarLi group">
    //         <Home className="navBarIcon" style={{ fontSize: 40 }} />
    //         <hr className="navBarIconHr"/>
    //       </li>
    //       <li className="navBarLi group  ">
    //         <Storefront className="navBarIcon" style={{ fontSize: 40 }} />
    //         <hr className="navBarIconHr"/>
    //       </li>
    //       <li className="navBarLi group ">
    //         <LiveTv className="navBarIcon" style={{ fontSize: 40 }} />
    //         <hr className="navBarIconHr"/>
    //       </li>
    //       <li className="navBarLi group ">
    //         <Groups className="navBarIcon" style={{ fontSize: 40 }} />
    //         <hr className="navBarIconHr"/>
    //       </li>
    //       <li className="navBarLi group ">
    //         <SportsEsports className="navBarIcon" style={{ fontSize: 40 }} />
    //         <hr className="navBarIconHr"/>
    //       </li>
    //     </ul>

    //   </div>
    //   <div className="w-[25%] flex justify-end gap-3 items-center mr-5">
    //     <MarkEmailUnread className="Icon" style={{ fontSize: 25 }} />
    //     <Notifications className="Icon" style={{ fontSize: 25 }} />
    //     <div className="flex gap-2 items-center bg-greyf1 rounded-xl p-1">
    //       <img
    //         src="https://source.unsplash.com/random/300×300"
    //         className="w-[30px] h-[30px] rounded-[50%] border-2 border-blue-300"
    //         alt=""
    //       />
    //       <span>Hexa Pentania</span>
    //       <KeyboardArrowDown className="Icon" />
    //     </div>
    //   </div>
    // </div>
    // #endregion

    <Paper className="nav-bar drop-shadow-md">
      <Grid container className="nav-bar-wrapper">
        <Grid item xs sx={{ display: "flex" }}>
          <IconButton sx={{ padding: 0 }} onClick={() => navigate("/")}>
            <FacebookOutlined
              sx={{
                fontSize: "4.4rem",
                color: "var(--primary-color)",
              }}
            />
          </IconButton>

          <MUI.SearchBar
            placeHolder="Search FB"
            getData={(input) => setValue(input)}
            handleSearch={handleSearch}
            menuConfig={{
              classNameConfig: {
                menuClass: "navbar-search",
                middleClass: "navbar-search",
              },
              list: [
                {
                  left: {
                    url: "https://source.unsplash.com/random/300×300",
                    name: "Duy",
                  },
                  middle: "Thạch Dương Duy",
                },
                {
                  left: {
                    url: "https://source.unsplash.com/random/300×300",
                    name: "Vũ",
                  },
                  middle: "Nguyễn Hoàng Vũ",
                },
                {
                  left: {
                    url: "https://source.unsplash.com/random/300×300",
                    name: "Thắng",
                  },
                  middle: "Nguyễn Phạm Quốc Thắng",
                },
              ],
              before: (
                <Typography sx={{ marginLeft: "1.6rem" }}>
                  Recent Searchs
                </Typography>
              ),
              right: (
                <IconButton className="right-menu">
                  <Close sx={{ fontSize: "1.6rem" }} />
                </IconButton>
              ),
            }}
          />
        </Grid>

        <Grid
          item
          xs={5}
          sx={{ display: "flex", justifyContent: "space-evenly" }}
        >
          {middleNavIcons.map((item, index) => (
            <MUI.ButtonWithIcon
            className="w-[13rem]"
              sx={{
                padding: "1rem 0.8rem",
              }}
              key={index}
              tooltip={item.tooltip}
              style={
                Helper.checkURL(item.tooltip?.toLowerCase(), {
                  url: "home",
                  path: "",
                })
                  ? {
                      marginBottom: "-0.4rem",
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                      color: "var(--primary-color)",
                      borderBottom: "0.4rem solid var(--primary-color)",
                    }
                  : null
              }
              onClick={() => {
                if (item.tooltip === "Home") navigate("/");
                else navigate(`/${item.tooltip?.toLowerCase()}`);
              }}
              disabled={Helper.checkURL(item.tooltip?.toLowerCase(), {
                url: "home",
                path: "",
              })}
            >
              {Helper.checkURL(item.tooltip?.toLowerCase(), {
                url: "home",
                path: "",
              })
                ? item.icon[1]
                : item.icon[0]}
            </MUI.ButtonWithIcon>
          ))}
        </Grid>

        <Grid item xs sx={{ display: "flex", justifyContent: "flex-end" }}>
          <ToggleButtonGroup
            value={rightGroup}
            exclusive
            onChange={(e, x) => {
              setRightGroup(x);
            }}
            aria-label="right-button"
          >
            {rightNavIcons.map((item, index) => (
              <ToggleButton
                key={index}
                style={{
                  position: "relative",
                  border: 0,
                  padding: "4px",
                }}
                value={item.tooltip}
                sx={{textTransform: 'none'}}
              >
                {item.icon ? (
                  <MUI.BetterIconButton hasBackground tooltip={item.tooltip}>
                    {item.icon}
                  </MUI.BetterIconButton>
                ) : (
                  <div>
                    <Avatar
                      onClick={() => setAvatarMenu(!avatarMenu)}
                      className="relative"
                      style={{
                        fontSize: "1.5rem",
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

                    {avatarMenu && (
                      <MUI.Menu
                        sx={{ right: "2px", minWidth: "20rem" }}
                        list={[
                          {
                            onClick: () => dispatch(revertAll()),
                            left: {
                              icon: (
                                <IoLogOut
                                  style={{
                                    fontSize: "2.4rem",
                                    color: "black",
                                  }}
                                />
                              ),
                              hasBackground: true,
                            },
                            middle: "Log Out",
                          },
                        ]}
                      />
                    )}
                  </div>
                )}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Grid>
      </Grid>
    </Paper>
  );
}
