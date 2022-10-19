import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FacebookOutlined, Close } from '@mui/icons-material';
import {
  Paper,
  Grid,
  IconButton,
  Avatar,
  Typography,
  ClickAwayListener,
} from '@mui/material';
import { IoLogOut } from 'react-icons/io5';
import MUI from '../../MUI';
import {
  middleNavIcons,
  rightNavIcons,
} from '../../../common/layout/navbar';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../redux/apiRequest';
import { revertAll } from '../../../redux/resetStore';
import '../Layout.css';

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const path = location.pathname;

  const [avatarMenu, setAvatarMenu] = useState(false);
  const [value, setValue] = useState('');

  const handleLogout = () => {
    // logOut(dispatch)
    dispatch(revertAll());
  };
  function handleSearch() {}

  function checkUrl(iconName) {
    return (
      path.slice(1) == iconName || (iconName == 'home' && path == '/')
    );
  }

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
        <Grid item xs sx={{ display: 'flex' }}>
          <IconButton
            sx={{ padding: 0 }}
            onClick={() => navigate('/')}
          >
            <FacebookOutlined
              sx={{
                fontSize: '4.4rem',
                color: 'var(--primary-color)',
              }}
            />
          </IconButton>

          <MUI.SearchBar
            placeHolder="Search FB"
            getData={(input) => setValue(input)}
            handleSearch={handleSearch}
            menuConfig={{
              classNameConfig: {
                menuClass: 'navbar-search',
                middleClass: 'navbar-search'
              },
              list: [
                {
                  left: {
                    url: 'https://source.unsplash.com/random/300×300',
                    name: 'Duy',
                  },
                  middle: 'Thạch Dương Duy',
                },
                {
                  left: {
                    url: 'https://source.unsplash.com/random/300×300',
                    name: 'Vũ',
                  },
                  middle: 'Nguyễn Hoàng Vũ',
                },
                {
                  left: {
                    url: 'https://source.unsplash.com/random/300×300',
                    name: 'Thắng',
                  },
                  middle: 'Nguyễn Phạm Quốc Thắng',
                },
              ],
              before: (
                <Typography sx={{ marginLeft: '1.6rem' }}>
                  Recent Searchs
                </Typography>
              ),
              right: (
                <IconButton className="right-menu">
                  <Close sx={{ fontSize: '1.6rem' }} />
                </IconButton>
              ),
            }}
          />
        </Grid>

        <Grid
          item
          xs={5}
          sx={{ display: 'flex', justifyContent: 'space-evenly' }}
        >
          {middleNavIcons.map((item, index) => (
            <MUI.ButtonWithIcon
              sx={{
                width: '14rem',
                padding: '1rem 0.8rem',
              }}
              key={index}
              tooltip={item.tooltip}
              style={
                checkUrl(item.tooltip?.toLowerCase())
                  ? {
                      marginBottom: '-3px',
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                      color: 'var(--primary-color)',
                      borderBottom: '4px solid var(--primary-color)',
                    }
                  : null
              }
              onClick={() => {
                if (item.tooltip === 'Home') navigate('/');
                else navigate(`/${item.tooltip?.toLowerCase()}`);
              }}
              disabled={checkUrl(item.tooltip?.toLowerCase())}
            >
              {checkUrl(item.tooltip?.toLowerCase())
                ? item.icon[1]
                : item.icon[0]}
            </MUI.ButtonWithIcon>
          ))}
        </Grid>

        <Grid
          item
          xs
          sx={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          {rightNavIcons.map((item, index) => (
            <div key={index} style={{ position: 'relative' }}>
              {item.icon ? (
                <MUI.BetterIconButton
                  hasBackground
                  tooltip={item.tooltip}
                  sx={{
                    '& .MuiSvgIcon-root': {
                      fontSize: '2.4rem',
                    },
                    marginRight: '0.8rem',
                  }}
                >
                  {item.icon}
                </MUI.BetterIconButton>
              ) : (
                <Avatar
                  src="https://source.unsplash.com/random/300×300"
                  onClick={() => setAvatarMenu(!avatarMenu)}
                />
              )}

              {avatarMenu && item.avatar && (
                <MUI.Menu
                  sx={{ right: '2px', minWidth: '20rem' }}
                  list={[
                    {
                      onClick: handleLogout,
                      left: {
                        icon: (
                          <IoLogOut
                            style={{
                              fontSize: '2.4rem',
                              color: 'black',
                            }}
                          />
                        ),
                        hasBackground: true,
                      },
                      middle: {
                        text: 'Log Out',
                        hasTooltip: false,
                      },
                    },
                  ]}
                />
              )}
            </div>
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
}
