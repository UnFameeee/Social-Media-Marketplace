import { useState, useReducer, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FacebookOutlined,
  Close,
  ThumbUpAlt,
  Comment,
  PersonAdd,
} from '@mui/icons-material';
import {
  Paper,
  Grid,
  Avatar,
  ClickAwayListener,
  ToggleButtonGroup,
  ToggleButton,
  CircularProgress,
  Skeleton,
} from '@mui/material';
import { IoLogOut } from 'react-icons/io5';
import { RiMoreFill } from 'react-icons/ri';
import { GoPrimitiveDot } from 'react-icons/go';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import SMM_Logo from '../../../assets/SMM_Logo.jpg';
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
import {
  getAllFriendNotification,
  getAllNotification,
  getAllUnreadNotification,
} from '../../../redux/notifications/notificationAPI';
import {
  acceptFriendRequest,
  denyFriendRequest,
} from '../../../redux/friend/friendSaga';
import { LeftbarFriendRequest } from '../../../screens/Friends/DynamicLeftbar/LeftbarMiddleItem';
import { seenNotificaton } from '../../../redux/notifications/notificationSaga';
import '../Layout.css';

export default function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  var recentSearch = localStorageService.getItem('recentSearch');
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const [value, setValue] = useState('');
  const [openSearch, setOpenSearch] = useState(false);
  const [rightGroup, setRightGroup] = useState(''); //right nav bar

  // #region notifications variables
  const [notificationType, setNotificationType] = useState('all'); //notification type default is all
  const [listConfirm, setListConfirm] = useState([]);
  const [listDeny, setListDeny] = useState([]);
  // #endregion

  // #region redux variables
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
    (state) => state.notification?.getAll?.data,
    shallowEqual
  );
  const allFriendNotifications = useSelector(
    (state) => state.notification?.getAllFriend?.data,
    shallowEqual
  );
  const allUnreadNotifications = useSelector(
    (state) => state.notification?.getAllUnread?.data,
    shallowEqual
  );
  const isFetchingAllNotification = useSelector(
    (state) => state.notification?.getAll?.isFetching
  );
  const isFetchingUnreadNotification = useSelector(
    (state) => state.notification?.getAllUnread?.isFetching
  );
  const isFetchingFriendNotification = useSelector(
    (state) => state.notification?.getAllFriend?.isFetching
  );
  const isFetchingSeenNotification = useSelector(
    (state) => state.notification?.seen?.isFetching
  );
  const isFetchingAcceptFriend = useSelector(
    (state) => state.friends?.acceptFriend?.isFetching
  );
  const isFetchingDenyFriend = useSelector(
    (state) => state.friends?.denyFriend?.isFetching
  );
  // #endregion

  const currentId = useRef(null);
  // #region loading variables
  var isLoadingAllNotifications = useMemo(() => {
    var result = false;
    if (isFetchingAllNotification) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }, [isFetchingAllNotification]);

  var isLoadingUnreadNotifications = useMemo(() => {
    var result = false;
    if (isFetchingUnreadNotification) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }, [isFetchingUnreadNotification]);

  var isLoadingFriendNotifications = useMemo(() => {
    var result = false;
    if (isFetchingFriendNotification) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }, [isFetchingFriendNotification]);

  var isLoadingSeenNotifications = useMemo(() => {
    var result = false;
    if (isFetchingSeenNotification) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }, [isFetchingSeenNotification]);

  var isLoadingAcceptFriend = useMemo(() => {
    var result = false;
    if (isFetchingAcceptFriend) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }, [isFetchingAcceptFriend]);

  var isLoadingDenyFriend = useMemo(() => {
    var result = false;
    if (isFetchingDenyFriend) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }, [isFetchingDenyFriend]);
  // #endregion

  const handleLogOut = () => {
    logOut(dispatch, accessToken, refreshToken);
    dispatch(revertAll());

    socket.off(SOCKET_EVENT.JOIN_ROOM);
    socket.off(SOCKET_EVENT.RERENDER_NOTIFICATION);
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

  // #region notification functions
  function handleNotificationType(type) {
    if (type === 'all') {
      getAllNotification(accessToken, refreshToken, dispatch);
    } else if (type === 'unread') {
      getAllUnreadNotification(accessToken, refreshToken, dispatch);
    } else {
      getAllFriendNotification(accessToken, refreshToken, dispatch);
    }
  }
  function listNotifications(list) {
    return list?.map((item) => {
      return {
        left: (
          <MUI.AvatarWithBadge
            avatarConfig={{
              src: item?.profile_sender_avatar,
              alt: item?.profile_sender_name,
              children: item?.profile_sender_name?.at(0),
              sx: {
                width: '6rem',
                height: '6rem',
                fontSize: '3rem',
              },
            }}
          >
            {item?.notification_type === NOTIFICATION_TYPE.LIKE ? (
              <ThumbUpAlt />
            ) : item?.notification_type ===
              NOTIFICATION_TYPE.COMMENT ? (
              <Comment />
            ) : (
              <PersonAdd />
            )}
          </MUI.AvatarWithBadge>
        ),
        middle:
          item?.notification_type ===
          NOTIFICATION_TYPE.FRIEND_REQUEST ? (
            <div className="w-[100%]">
              <LeftbarFriendRequest
                profile={{
                  profile_name: item?.content,
                  profile_id: item?.profile_sender_id,
                }}
                listAction={[listConfirm, listDeny]}
                isLoading={
                  isLoadingAcceptFriend || isLoadingDenyFriend
                }
                currentId={currentId.current}
                firstButtonConfig={{
                  onClick: (e) => {
                    e.stopPropagation();
                    acceptFriendRequest({
                      accessToken,
                      refreshToken,
                      id: item?.profile_sender_id,
                      callRefreshProfile: Helper.checkURL('profile'),
                      dispatch,
                    });

                    setListConfirm((old) => [
                      ...old,
                      item?.profile_sender_id,
                    ]);
                    
                    currentId.current = item?.profile_sender_id;
                  },
                }}
                secondButtonConfig={{
                  onClick: (e) => {
                    e.stopPropagation();
                    denyFriendRequest({
                      accessToken,
                      refreshToken,
                      id: item?.profile_sender_id,
                      callRefreshProfile: Helper.checkURL('profile'),
                      dispatch,
                    });

                    setListDeny((old) => [
                      ...old,
                      item?.profile_sender_id,
                    ]);

                    currentId.current = item?.profile_sender_id;
                  },
                }}
              />
            </div>
          ) : (
            item?.content
          ),
        right: !item?.was_seen && (
          <GoPrimitiveDot
            style={{
              color: 'var(--primary-color)',
              fontSize: '2rem',
            }}
          />
        ),
        onClick: () => {
          handleNotificationClicked(
            item.was_seen,
            item.notification_type,
            item.post_id,
            item.profile_sender_id,
            item.notification_id
          );
        },
      };
    });
  }
  function handleNotificationClicked(
    seen,
    type,
    postId,
    profileId,
    notificationId
  ) {
    if (!seen) {
      seenNotificaton(
        accessToken,
        refreshToken,
        notificationId,
        dispatch
      );
    }

    if (type === NOTIFICATION_TYPE.FRIEND_REQUEST) {
      navigate(`/profile?id=${profileId}`);
    } else {
      navigate(`/post?id=${postId}`);
    }
  }
  // #endregion

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
            <img
              src={SMM_Logo}
              className=" w-[5rem] h-[5rem]"
              alt="logo"
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
                }) ||
                (item.tooltip === 'Marketplace' &&
                  Helper.checkURL('shopping')) ||
                (item.tooltip === 'Marketplace' &&
                  Helper.checkURL('selling')) ||
                (item.tooltip === 'Marketplace' &&
                  Helper.checkURL('orderpurchased')) ||
                (item.tooltip === 'Marketplace' &&
                  Helper.checkURL('ordersold'))
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
                e.preventDefault();

                if (value === 'notifications') {
                  getAllNotification(
                    accessToken,
                    refreshToken,
                    dispatch
                  );
                }

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
                  ) : item.tooltip === 'Notifications' ? (
                    <MUI.BadgeIconButton
                      iconButtonConfig={{
                        tooltip: item.tooltip,
                        className: 'right-nav-icon',
                      }}
                      badgeConfig={{
                        badgeContent: allUnreadNotifications.length,
                        max: 999,
                      }}
                    >
                      {item.icon}
                    </MUI.BadgeIconButton>
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
                      menuClass: 'nav-notification',
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
                          {/* <MUI.BetterIconButton>
                            <RiMoreFill
                              style={{ fontSize: '1.8rem' }}
                            />
                          </MUI.BetterIconButton> */}
                        </div>

                        <ToggleButtonGroup
                          value={notificationType}
                          exclusive
                          onChange={(e, value) => {
                            e.preventDefault();
                            if (value) {
                              handleNotificationType(value);
                              setNotificationType(value);
                            }
                          }}
                          className="notification-type-wrapper"
                        >
                          <ToggleButton
                            value="all"
                            className="type"
                            disabled={notificationType === 'all'}
                          >
                            Posts
                          </ToggleButton>

                          <ToggleButton
                            value="friends"
                            className="type"
                            disabled={notificationType === 'friends'}
                          >
                            Friends
                          </ToggleButton>

                          <ToggleButton
                            value="unread"
                            className="type"
                            disabled={notificationType === 'unread'}
                          >
                            Unread
                          </ToggleButton>
                        </ToggleButtonGroup>
                      </div>
                    }
                    after={
                      (isLoadingAllNotifications ||
                        isLoadingFriendNotifications ||
                        isLoadingUnreadNotifications) && (
                        <div className="friend-left-bar-skeleton">
                          {[...Array(2)].map((item, index) => (
                            <Skeleton
                              key={index}
                              variant="rounded"
                              width={370}
                              height={96}
                            />
                          ))}
                        </div>
                      )
                    }
                    list={
                      !(
                        isLoadingAllNotifications ||
                        isLoadingFriendNotifications ||
                        isLoadingUnreadNotifications
                      )
                        ? notificationType === 'all'
                          ? listNotifications(allNotifications)
                          : notificationType === 'unread'
                          ? listNotifications(allUnreadNotifications)
                          : listNotifications(allFriendNotifications)
                        : []
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
