import { useState, useReducer, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FacebookOutlined, Close } from '@mui/icons-material';
import {
  Paper,
  Grid,
  Avatar,
  ClickAwayListener,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import { IoLogOut } from 'react-icons/io5';
import { RiMoreFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import {
  middleNavIcons,
  rightNavIcons,
} from '../../../common/layoutConfigs/navbar';
import { revertAll } from '../../../redux/resetStore';
import { Helper } from '../../../utils/Helper';
import { logOut } from '../../../redux/apiRequest';
import { localStorageService } from '../../../services/localStorageService';
import socket from '../../../socket/socket';
import { SOCKET_EVENT } from '../../../socket/socket.constant';
import MUI from '../../MUI';
import { NOTIFICATION_TYPE } from '../../../socket/notification.constant';
import '../Layout.css';

export default function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const [value, setValue] = useState('');
  const [openSearch, setOpenSearch] = useState(false);
  const [rightGroup, setRightGroup] = useState(''); //right nav bar
  const [notificationType, setNotificationType] = useState('all'); //notification type default is all

  var recentSearch = localStorageService.getItem('recentSearch');

  const accessToken = useSelector(
    (state) => state.auth?.login?.currentUser?.access
  );
  const refreshToken = useSelector(
    (state) => state.auth?.login?.currentUser?.refresh
  );
  const userData = useSelector(
    (state) => state.auth?.user?.userData?.profile
  );
  const profileData = useSelector(
    (state) => state.profile?.profileDetails?.data
  );
  const allNotifications = useSelector(
    (state) => state.notification?.getAll?.data
  );
  const allFriendNotifications = useSelector(
    (state) => state.notification?.getAllFriend?.data
  );
  const allUnreadNotifications = useSelector(
    (state) => state.notification?.getAllUnread?.data
  );

  const handleLogOut = () => {
    logOut(dispatch, accessToken, refreshToken);
    dispatch(revertAll());

    socket.off(SOCKET_EVENT.JOIN_ROOM);
    socket.off(SOCKET_EVENT.RECEIVE_NOTIFICATION);
    socket.disconnect();
  };

  function handleSearch() {
    if (value) {
      navigate(`/search?value=${value}`);
      document.getElementById('searchBar').blur();
    }
    setOpenSearch(false);
  }

  function listNotifications(list) {
    return list?.map((item) => {
      return {
        left: {
          url: item.profile_sender_avatar,
          name: item.profile_sender_name,
        },
        middle: item.content,
        onClick: () => {
          handleNotifications(
            item.notification_type,
            item.post_id,
            item.profile_sender_id
          );
        },
      };
    });
  }
  function handleNotifications(type, postId, profileId) {
    if (type === NOTIFICATION_TYPE.FRIEND_REQUEST) {
      navigate(`/profile?id=${profileId}`);
    } else {
      navigate(`/post?id=${postId}`);
    }
  }

  return (
    <Paper className="nav-bar drop-shadow-md">
      <Grid container className="nav-bar-wrapper">
        <Grid item xs sx={{ display: 'flex' }}>
          <MUI.BetterIconButton
            sx={{ padding: 0 }}
            onClick={() => {
              if (value) {
                setValue(''); //reset the search bar input
              }

              navigate('/');
            }}
          >
            <FacebookOutlined
              sx={{
                fontSize: '4.4rem',
                color: 'var(--primary-color)',
              }}
            />
          </MUI.BetterIconButton>

          <MUI.SearchBar
            placeHolder="Search FB"
            value={value}
            getData={(input) => setValue(input)}
            handleSearch={handleSearch}
            toggleProps={[openSearch, setOpenSearch]}
            menuConfig={{
              classNameConfig: {
                menuClass: 'navbar-search',
                middleClass: 'navbar-search',
              },
              before: (
                <div
                  style={{ marginLeft: '1.6rem', fontWeight: '500' }}
                >
                  Recent Searchs
                </div>
              ),
              list: recentSearch?.map((x) => {
                return {
                  left: {
                    url: x.avatar,
                    name: x.profile_name,
                  },
                  middle: x.profile_name,
                  right: (
                    <MUI.BetterIconButton
                      className="right-menu"
                      onClick={(e) => {
                        e.stopPropagation();
                        localStorageService.deleteFromArray(
                          'recentSearch',
                          x
                        );
                        forceUpdate();
                      }}
                    >
                      <Close sx={{ fontSize: '1.6rem' }} />
                    </MUI.BetterIconButton>
                  ),
                  onClick: () => {
                    localStorageService.addToArray('recentSearch', x);
                    navigate(`/profile?id=${x.profile_id}`);
                    setOpenSearch(false);
                  },
                };
              }),
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
              className="w-[22rem]"
              sx={{
                padding: '1rem 0.8rem',
              }}
              key={index}
              tooltip={item.tooltip}
              style={
                Helper.checkURL(item.tooltip?.toLowerCase(), {
                  url: 'home',
                  path: '',
                })
                  ? {
                      marginBottom: '-0.4rem',
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                      color: 'var(--primary-color)',
                      borderBottom:
                        '0.4rem solid var(--primary-color)',
                    }
                  : null
              }
              onClick={() => {
                if (value) {
                  setValue(''); //reset the search bar input
                }

                if (item.navigate) {
                  navigate(`/${item.navigate?.toLowerCase()}`);
                } else {
                  if (item.tooltip) {
                    if (item.tooltip === 'Home') navigate('/');
                    else navigate(`/${item.tooltip?.toLowerCase()}`);
                  }
                }
              }}
              disabled={Helper.checkURL(item.tooltip?.toLowerCase(), {
                url: 'home',
                path: '',
              })}
            >
              {Helper.checkURL(item.tooltip?.toLowerCase(), {
                url: 'home',
                path: '',
              })
                ? item.icon[1]
                : item.icon[0]}
            </MUI.ButtonWithIcon>
          ))}
        </Grid>

        <ClickAwayListener
          onClickAway={() => {
            if (rightGroup) {
              setRightGroup('');
            }
          }}
        >
          <Grid
            item
            xs
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <ToggleButtonGroup
              value={rightGroup}
              exclusive
              onChange={(e, value) => {
                setRightGroup(value);
              }}
            >
              {rightNavIcons.map((item, index) => (
                <ToggleButton
                  key={index}
                  value={item.tooltip?.toLowerCase() ?? 'avatar'}
                  className="right"
                >
                  {item.avatar ? (
                    <Avatar
                      className="relative"
                      style={{
                        fontSize: '2rem',
                        cursor: 'pointer',
                        textTransform: 'none',
                      }}
                      alt={userData.profile_name}
                      src={
                        userData?.profile_id ===
                        profileData?.profile_id
                          ? profileData?.avatar
                          : userData?.avatar
                      }
                    >
                      {userData?.profile_name?.at(0)}
                    </Avatar>
                  ) : (
                    <MUI.BetterIconButton
                      hasBackground
                      tooltip={item.tooltip}
                      className="right-nav-icon"
                    >
                      {item.icon}
                    </MUI.BetterIconButton>
                  )}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>

            {rightGroup && (
              <div className="relative top-[4rem]">
                {rightGroup === 'avatar' && (
                  <MUI.Menu
                    sx={{ right: '0.2rem', minWidth: '20rem' }}
                    list={[
                      {
                        onClick: (e) => {
                          e.preventDefault();
                          setRightGroup('');
                          navigate(
                            `/profile?id=${userData?.profile_id}`
                          );
                        },
                        left: {
                          url: userData?.avatar,
                          name: userData?.profile_name,
                        },
                        middle: userData?.profile_name,
                      },
                      {
                        onClick: handleLogOut,
                        left: {
                          icon: (
                            <IoLogOut
                              style={{ fontSize: '2.4rem' }}
                            />
                          ),
                          hasBackground: true,
                        },
                        middle: 'Log Out',
                      },
                    ]}
                  />
                )}

                {rightGroup === 'notifications' && (
                  <MUI.Menu
                    classNameConfig={{
                      menuItemClass: 'nav-notification',
                      middleClass: 'nav-notification',
                    }}
                    sx={{ right: '4.8rem', minWidth: '40rem' }}
                    before={
                      <div style={{ padding: '0.4rem 1.6rem 0' }}>
                        <div className="flex items-center justify-between">
                          <span
                            style={{
                              fontSize: '2rem',
                              fontWeight: '600',
                              letterSpacing: '0.4px',
                            }}
                          >
                            Notifications
                          </span>
                          <MUI.BetterIconButton>
                            <RiMoreFill
                              style={{ fontSize: '1.8rem' }}
                            />
                          </MUI.BetterIconButton>
                        </div>

                        <ToggleButtonGroup
                          value={notificationType}
                          exclusive
                          onChange={(e, value) => {
                            e.preventDefault();
                            setNotificationType(value);
                          }}
                          className="notification-type-wrapper"
                        >
                          <ToggleButton value="all" className="type">
                            All
                          </ToggleButton>

                          <ToggleButton
                            value="unread"
                            className="type"
                          >
                            Unread
                          </ToggleButton>

                          <ToggleButton
                            value="friends"
                            className="type"
                          >
                            Friends
                          </ToggleButton>
                        </ToggleButtonGroup>
                      </div>
                    }
                    list={
                      notificationType === 'all'
                        ? listNotifications(allNotifications)
                        : notificationType === 'unread'
                        ? listNotifications(allUnreadNotifications)
                        : listNotifications(allFriendNotifications)
                    }
                  />
                )}
              </div>
            )}
          </Grid>
        </ClickAwayListener>
      </Grid>
    </Paper>
  );
}
