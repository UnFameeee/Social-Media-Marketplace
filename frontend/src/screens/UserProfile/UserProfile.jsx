import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useLayoutEffect, useState, useRef, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  PhotoCamera,
  Edit,
  AddCircle,
  // MoreHoriz,
  CloseOutlined,
} from '@mui/icons-material';
import { BiMessageRoundedDetail } from 'react-icons/bi';
import {
  FaUserCheck,
  FaUserPlus,
  FaUserMinus,
  FaUserTimes,
} from 'react-icons/fa';
import { MdWallpaper } from 'react-icons/md';
import {
  Avatar,
  CircularProgress,
  ClickAwayListener,
  Modal,
  Paper,
  Skeleton,
  TextareaAutosize,
} from '@mui/material';
import * as Yup from 'yup';
import SideBarButton from './SideBarButton';
import SideBarLi from './SideBarLi';
import CardPost from '../../components/Card/CardPost';
import GridSideInfo from './GridSideInfo';
import PostStatus from '../../components/PostStatus/PostStatus';
import { ValidateForm, FormChildren } from '../../components/Form';
import { cities } from '../../common/constants/listConstants';
import { Helper } from '../../utils/Helper';
import MUI from '../../components/MUI';
import {
  acceptFriendRequest,
  addFriendRequest,
  denyFriendRequest,
  unfriendRequest,
} from '../../redux/friend/friendSaga';
import {
  deleteAvtRequest,
  deleteWallRequest,
  updateAvtRequest,
  updateDetailRequest,
  updateProfileRequest,
  updateWallRequest,
} from '../../redux/profile/profileSaga';
import {
  getGalleryImg,
  getProfileDetail,
} from '../../redux/profile/profileAPI';
import { getPostByProfile } from '../../redux/apiRequest';
import { getAllFriend } from '../../redux/friend/friendAPI';
import './index.css';

function UserProfile(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openAvatarModal, setOpenAvatarModal] = useState(false); //toggle update avatar modal
  const [openDetailsModal, setOpenDetailsModal] = useState(false); //toggle update details modal
  const [editBio, setEditBio] = useState(false); //toggle edit bio

  const [searchParams] = useSearchParams();
  const queryParams = Object.fromEntries([...searchParams]);

  // #region data from redux
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser.access
  );
  const refreshToken = useSelector(
    (state) => state.auth.login.currentUser.refresh
  );
  const userData = useSelector(
    (state) => state.auth?.user?.userData?.profile
  );
  const posts = useSelector(
    (state) => state.post.getByProfile?.posts?.results?.data,
    shallowEqual
  );
  const profileData = useSelector(
    (state) => state.profile?.profileDetails?.data,
    shallowEqual
  );
  const allFriends = useSelector(
    (state) => state.friends.getAll?.data,
    shallowEqual
  );
  const galleryImgs = useSelector(
    (state) => state.profile.galleryImg?.data,
    shallowEqual
  );
  const isFetchingProfileDetail = useSelector(
    (state) => state.profile?.profileDetails?.isFetching
  );
  const isFetchingPostByProfile = useSelector(
    (state) => state.post.getByProfile?.isFetching
  );
  const isFetchingGallery = useSelector(
    (state) => state.profile.galleryImg?.isFetching
  );
  const isFetchingFriend = useSelector(
    (state) => state.friends.getAll?.isFetching
  );
  const isFetchingAvt = useSelector(
    (state) => state.profile?.updateAvt?.isFetching
  );
  const isFetchingWall = useSelector(
    (state) => state.profile?.updateWall?.isFetching
  );
  const isFetchingDetail = useSelector(
    (state) => state.profile?.updateDetail?.isFetching
  );
  const isFetchingProfile = useSelector(
    (state) => state.profile?.updateProfile?.isFetching
  );
  // #endregion

  // #region loading variables
  var isLoadingProfileDetail = useMemo(() => {
    var result = false;
    if (isFetchingProfileDetail) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }, [isFetchingProfileDetail]);

  var isLoadingPosts = useMemo(() => {
    var result = false;
    if (isFetchingPostByProfile) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }, [isFetchingPostByProfile]);

  var isLoadingGallery = useMemo(() => {
    var result = false;
    if (isFetchingGallery) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }, [isFetchingGallery]);

  var isLoadingFriends = useMemo(() => {
    var result = false;
    if (isFetchingFriend) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }, [isFetchingFriend]);

  var isLoadingAvt = useMemo(() => {
    var result = false;
    if (isFetchingAvt) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }, [isFetchingAvt]);

  var isLoadingWall = useMemo(() => {
    var result = false;
    if (isFetchingWall) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }, [isFetchingWall]);

  var isLoadingDetail = useMemo(() => {
    var result = false;
    if (isFetchingDetail) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }, [isFetchingDetail]);
  
  var isLoadingProfile = useMemo(() => {
    var result = false;
    if (isFetchingProfile) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }, [isFetchingProfile]);
  // #endregion

  var id =
    queryParams.id ?? profileData?.profile_id ?? userData?.profile_id;
  var profile_description =
    profileData?.profile_description ?? userData?.profile_description;
  var descriptionWithoutBio = {};
  if (profile_description) {
    var { description, ...descriptionWithoutBio } =
      profile_description;
  }

  // #region wallpaper section
  const [menuClicked, setMenuClicked] = useState(false);
  const [openConfirmRemove, setOpenConfirmRemove] = useState(false);
  const [wallpaper, setWallpaper] = useState();
  var wallpaperURL;
  if (wallpaper) {
    wallpaperURL = URL.createObjectURL(wallpaper);
  } else {
    wallpaperURL = '';
  }
  var listUploadWall = [
    {
      middle: 'Upload photo',
      onClick: () => {
        document.getElementById('wallpaperRef').click();
        setMenuClicked(false);
      },
    },
  ];

  const onImageChange = (e) => {
    const [file] = e.target.files;
    setWallpaper(file);
  };
  const clearWallpaper = () => {
    setWallpaper('');
  };
  // #endregion

  // #region handle friend actions
  var callRefreshProfile = true;
  const handleActions = (action) => {
    // accept friend requests
    if (action === 'accept') {
      acceptFriendRequest({
        accessToken,
        refreshToken,
        id,
        callRefreshProfile,
        dispatch,
      });

      if (Helper.checkURL('requests')) {
        props.action[0]((old) => [...old, parseInt(id)]);
      }
    }

    // deny friend request
    else if (action === 'deny') {
      denyFriendRequest({
        accessToken,
        refreshToken,
        id,
        callRefreshProfile,
        dispatch,
      });

      if (Helper.checkURL('requests')) {
        props.action[1]((old) => [...old, parseInt(id)]);
      }
    }

    // add friend/ cancel sent request
    else if (action === 'add' || action === 'cancel') {
      addFriendRequest({
        accessToken,
        refreshToken,
        id,
        callRefreshProfile,
        dispatch,
      });

      if (Helper.checkURL('suggestions') || Helper.checkURL('sent')) {
        // cancel sent request
        if (
          Helper.checkValueExistInArray(
            props.actionList,
            parseInt(id)
          )
        ) {
          var filterSuggestions = props.actionList.filter(
            (e) => e !== parseInt(id)
          );
          props.action(filterSuggestions);
        }
        // add friend
        else {
          props.action((old) => [...old, parseInt(id)]);
        }
      }

      // screen all friends
      else if (Helper.checkURL('all')) {
        if (
          Helper.checkValueExistInArray(
            props.actionList[1],
            parseInt(id)
          )
        ) {
          var filterAllFriend = props.actionList[1].filter(
            (e) => e !== parseInt(id)
          );
          props.action[1](filterAllFriend);
        }
        // add friend
        else {
          props.action[1]((old) => [...old, parseInt(id)]);
        }
      }
    }

    // unfriend
    else if (action === 'unfriend') {
      unfriendRequest({
        accessToken,
        refreshToken,
        id,
        callRefreshProfile,
        dispatch,
      });

      if (Helper.checkURL('all')) {
        props.action[0]((old) => [...old, parseInt(id)]);
      }
      // unfriend in request means deny
      else if (Helper.checkURL('requests')) {
        var filterRequest = props.actionList[0].filter(
          (e) => e !== parseInt(id)
        );
        props.action[0](filterRequest);
        props.action[1]((old) => [...old, parseInt(id)]);
      }
    }
  };
  // #endregion

  useLayoutEffect(() => {
    let onDestroy = false;
    if (!onDestroy) {
      if (Helper.checkURL('profile', {}, true)) {
        getProfileDetail(accessToken, refreshToken, id, dispatch);
        getPostByProfile(accessToken, refreshToken, id, dispatch);
        getGalleryImg(accessToken, refreshToken, id, dispatch);
        getAllFriend(accessToken, refreshToken, id, dispatch);
      }
    }
    return () => {
      onDestroy = true;
    };
  }, [id]);

  return (
    <>
      {/* save wallpaper or not */}
      {wallpaper && wallpaperURL && (
        <div id="updateWallpaper">
          <div id="leftSide">
            <MdWallpaper style={{ fontSize: '3.2rem' }} />
            <span className="leading-[1.8rem] text-[1.8rem]">
              Change your wallpaper
            </span>
          </div>
          <div id="rightSide">
            <MUI.Button onClick={clearWallpaper}>Cancel</MUI.Button>
            <MUI.Button
              onClick={() => {
                updateWallRequest({
                  accessToken,
                  refreshToken,
                  wallpaper,
                  id,
                  dispatch,
                });

                clearWallpaper();
              }}
            >
              Save changes
            </MUI.Button>
          </div>
        </div>
      )}

      <div id="profileTop" className="shadow-md">
        <div className="relative h-[46rem]">
          {/* wallpaper - not using img to avoid the img show when theres no src */}
          {isLoadingProfileDetail ? (
            <Skeleton
              id="wallpaper"
              variant="rounded"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.11)' }}
            />
          ) : (
            <div
              style={
                !isLoadingWall
                  ? wallpaperURL
                    ? { backgroundImage: `url(${wallpaperURL}` }
                    : {
                        backgroundImage: `url(${profileData?.wallpaper}`,
                      }
                  : null
              }
              id="wallpaper"
              className="shadow-lg"
            >
              {isLoadingWall && (
                <CircularProgress
                  style={{
                    color: 'var(--primary-color)',
                    width: '6rem',
                    height: '6rem',
                  }}
                />
              )}
            </div>
          )}

          {/* handle wallpaper actions */}
          {profileData?.profile_id === userData?.profile_id &&
            !isLoadingProfileDetail && (
              <ClickAwayListener
                onClickAway={() => {
                  setMenuClicked(false);
                }}
              >
                <div>
                  <button
                    id="editWallpaper"
                    className="shadow-inner"
                    onClick={() => {
                      setMenuClicked(!menuClicked);
                    }}
                  >
                    <PhotoCamera style={{ fontSize: '2.5rem' }} />
                    <span className="text-[1.8rem]">
                      Edit Wallpaper
                    </span>
                  </button>
                  <input
                    className="hidden"
                    type="file"
                    onChange={onImageChange}
                    accept="image/*"
                    id="wallpaperRef"
                  />
                  {menuClicked && (
                    <MUI.Menu
                      style={{
                        width: 'auto',
                        zIndex: 1,
                        right: '1rem',
                        bottom: profileData?.wallpaper
                          ? '2rem'
                          : '7.6rem',
                      }}
                      list={
                        profileData?.wallpaper
                          ? listUploadWall.concat({
                              middle: 'Remove',
                              onClick: () => {
                                setOpenConfirmRemove(true);
                                setMenuClicked(false);
                              },
                            })
                          : listUploadWall
                      }
                    />
                  )}

                  <MUI.ConfirmDialog
                    modalProps={[
                      openConfirmRemove,
                      setOpenConfirmRemove,
                    ]}
                    title="Remove wallpaper"
                    actionName="remove your wallpaper"
                    confirmAction={() => {
                      deleteWallRequest({
                        accessToken,
                        refreshToken,
                        id,
                        dispatch,
                      });

                      setOpenConfirmRemove(false);
                      setWallpaper('');
                    }}
                  />
                </div>
              </ClickAwayListener>
            )}

          <div>
            <div className="bigRoundAvt absolute left-[3.5rem] top-[26rem]">
              {/* avatar */}
              {isLoadingProfileDetail ? (
                <Skeleton
                  variant="circular"
                  style={{
                    width: '18rem',
                    height: '18rem',
                  }}
                />
              ) : isLoadingAvt ? (
                <Avatar
                  sx={{
                    width: '18rem',
                    height: '18rem',
                  }}
                >
                  <CircularProgress
                    style={{
                      color: 'var(--primary-color)',
                    }}
                  />
                </Avatar>
              ) : (
                <Avatar
                  sx={{
                    width: '18rem',
                    height: '18rem',
                    fontSize: '10rem',
                  }}
                  alt={profileData?.profile_name}
                  src={profileData?.avatar}
                >
                  {profileData?.profile_name?.at(0)}
                </Avatar>
              )}

              {/* handle Avatar */}
              {profileData?.profile_id === userData?.profile_id &&
                !isLoadingProfileDetail && (
                  <>
                    <button
                      className="bg-white absolute right-0 top-[12rem] z-1 p-[0.65rem] rounded-[50%] shadow-lg hover:cursor-pointer"
                      onClick={() => {
                        setOpenAvatarModal(true);
                      }}
                    >
                      <PhotoCamera
                        className=" bg-white right-0 top-[12rem] z-1"
                        style={{ fontSize: '2.5rem' }}
                      />
                    </button>

                    {/* edit avatar modal */}
                    <UpdateAvatar
                      modalProps={[
                        openAvatarModal,
                        setOpenAvatarModal,
                      ]}
                      profileData={profileData}
                      actionProps={{
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                        id: profileData?.profile_id,
                        dispatch: dispatch,
                      }}
                    />
                  </>
                )}
            </div>

            <div className="flex pl-[24rem] pr-[4rem] items-center justify-center py-[3.6rem]">
              {/* profile name and its friend count */}
              {isLoadingProfileDetail ? (
                <Skeleton
                  variant="rounded"
                  height={60}
                  width={'100%'}
                />
              ) : (
                <div className="flex-1 flex flex-col gap-[0.3rem] ">
                  <span className=" font-semibold text-[3rem]">
                    {profileData?.profile_name}
                  </span>

                  <span className="text-[1.8rem] leading-[2.4rem] font-bold text-gray-600">
                    {allFriends?.page?.totalElement > 0 &&
                      Helper.isMultiple(
                        'friend',
                        allFriends?.page?.totalElement,
                        ''
                      )}
                  </span>
                </div>
              )}

              {/* handle profile action - mainly for other profiles (not the person who is logged in) */}
              {!isLoadingProfileDetail && (
                <div className="flex items-end gap-[1rem]">
                  <ProfileAction
                    isMainUser={
                      profileData?.profile_id === userData?.profile_id
                    }
                    isFriend={profileData?.isFriend}
                    isSentFriendReq={profileData?.isSentFriendRequest}
                    action={handleActions}
                    actionProps={{
                      accessToken: accessToken,
                      refreshToken: refreshToken,
                      id: profileData?.profile_id,
                      dispatch: dispatch,
                    }}
                    profileData={profileData}
                    isLoadingProfile={isLoadingProfile}
                  />
                </div>
              )}
            </div>

            {/* tab in profile - dont delete 
            <hr className="mt-[1.5rem] h-[0.15rem] border-0 bg-slate-300 rounded-sm  w-full " />
            <div className="flex items-center py-[1.5rem] px-[1rem]">
              <HoverButton
                ulGap="1.5rem"
                listButton={[
                  { text: 'Post' },
                  { text: 'About' },
                  { text: 'Friends' },
                  { text: 'Photos' },
                  { text: 'Videos' },
                  { text: 'Check-ins' },
                ]}
              />
              <MoreHoriz
                className="Icon"
                style={{ fontSize: '2.2rem' }}
              />
            </div> */}
          </div>
        </div>
      </div>

      {/* handle when you visit someone profile and they had already send you a friend request */}
      {profileData?.isSentFriendRequest === 'TARGET' && (
        <div id="friendRequest">
          <span className="flex-1 font-medium">
            {profileData?.profile_name} sent you a friend request
          </span>
          <div className="flex items-end gap-[1rem]">
            <MUI.Button
              className="gap-[0.8rem]"
              style={{ minWidth: '14rem' }}
              onClick={() => {
                handleActions('accept');
              }}
            >
              <FaUserPlus style={{ fontSize: '2.2rem' }} />
              <span className=" text-[1.6rem] font-semibold">
                Confirm
              </span>
            </MUI.Button>
            <MUI.Button
              className="gap-[0.8rem]"
              style={{ minWidth: '14rem' }}
              onClick={() => {
                handleActions('deny');
              }}
            >
              <FaUserMinus style={{ fontSize: '2.2rem' }} />
              <span className=" text-[1.6rem] font-semibold">
                Deny
              </span>
            </MUI.Button>
          </div>
        </div>
      )}

      <div className="mt-[2rem] flex mx-auto w-[120rem] gap-[2rem]">
        <div className="leftSideInfo w-[45%] flex flex-col relative">
          <div className="sticky top-[-83.5rem]">
            {/* profile description */}
            {isLoadingProfileDetail ? (
              <div className="mb-[2rem]">
                <Skeleton
                  variant="rounded"
                  width={531}
                  height={100}
                />
              </div>
            ) : (
              <>
                {(!Helper.isEmptyObject(profile_description, true) ||
                  userData?.profile_id ===
                    profileData?.profile_id) && (
                  <div className="bg-white rounded-xl p-[1.5rem] shadow-md mb-[2rem]">
                    {isLoadingDetail ? (
                      <div className="text-center">
                        <CircularProgress
                          style={{ color: 'var(--primary-color)' }}
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <span className="font-bold text-[2.3rem]">
                          Intro
                        </span>
                        {!editBio ? (
                          <>
                            {profile_description?.description && (
                              <span id="profileBio">
                                {profile_description?.description}
                              </span>
                            )}
                            {userData?.profile_id ===
                              profileData?.profile_id && (
                              <SideBarButton
                                id="editBioBtn"
                                label="Edit bio"
                                onClick={() => {
                                  setEditBio(true);
                                }}
                              />
                            )}
                          </>
                        ) : (
                          <>
                            <TextareaAutosize
                              placeholder="Describe Yourself"
                              autoFocus
                              maxLength="200"
                              id="profileBioEditor"
                              defaultValue={
                                profile_description?.description
                              }
                            />
                            <div id="editBioAction">
                              <MUI.Button
                                onClick={() => {
                                  setEditBio(false);
                                }}
                              >
                                Cancel
                              </MUI.Button>
                              <MUI.Button
                                onClick={() => {
                                  let description = {
                                    description:
                                      document.getElementById(
                                        'profileBioEditor'
                                      )?.value,
                                  };
                                  updateDetailRequest({
                                    accessToken,
                                    refreshToken,
                                    description,
                                    id,
                                    dispatch,
                                  });

                                  setEditBio(false);
                                }}
                              >
                                Save
                              </MUI.Button>
                            </div>
                          </>
                        )}

                        {!Helper.isEmptyObject(
                          descriptionWithoutBio,
                          true
                        ) && (
                          <ul className="mt-[2rem] flex flex-col gap-[2rem] [&>li]:flex [&>li]:items-center [&>li]:gap-[1rem]">
                            {Object.entries(
                              descriptionWithoutBio
                            )?.map((x, index) => {
                              return (
                                <SideBarLi
                                  key={index}
                                  description={x}
                                />
                              );
                            })}
                          </ul>
                        )}
                        {userData?.profile_id ===
                          profileData?.profile_id && (
                          <SideBarButton
                            label="Edit details"
                            onClick={() => {
                              setOpenDetailsModal(true);
                            }}
                          />
                        )}
                        {/* <SideBarButton label="Add Hobbies" />
                      <SideBarButton label="Add Featured" /> */}

                        {/* edit details modal */}
                        <EditDetails
                          modalProps={[
                            openDetailsModal,
                            setOpenDetailsModal,
                          ]}
                          profileDescription={descriptionWithoutBio}
                          actionProps={{
                            accessToken: accessToken,
                            refreshToken: refreshToken,
                            id: profileData?.profile_id,
                            dispatch: dispatch,
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {/* gallery images section */}
            {isLoadingGallery ? (
              <div className="mb-[2rem]">
                <Skeleton
                  variant="rounded"
                  width={531}
                  height={100}
                />
              </div>
            ) : (
              <GridSideInfo
                type="photo"
                leftLabel="Photos"
                // rightLabel={{ text: 'See all Photos' }}
                listImg={galleryImgs?.data?.map((x) => {
                  return { url: x.link };
                })}
              />
            )}

            {/* friends section */}
            {isLoadingFriends ? (
              <div className="mb-[2rem]">
                <Skeleton
                  variant="rounded"
                  width={531}
                  height={100}
                />
              </div>
            ) : (
              <GridSideInfo
                type="friendPhoto"
                leftLabel="Friends"
                rightLabel={
                  userData?.profile_id === profileData?.profile_id
                    ? {
                        text: 'See all Friends',
                        onClick: () => {
                          if (parseInt(id) === userData?.profile_id) {
                            navigate('/friends/all');
                          }
                        },
                      }
                    : null
                }
                listImg={allFriends?.data?.map((x) => {
                  return {
                    id: x.profile_id,
                    url: x.avatar,
                    name: x.profile_name,
                  };
                })}
                totalFriends={Helper.isMultiple(
                  'friend',
                  allFriends?.page?.totalElement
                )}
                navigate={navigate}
              />
            )}
          </div>
        </div>

        <div className="rightSidePosts w-[55%]">
          {isLoadingPosts ? (
            <div className="flex flex-col gap-[1rem]">
              <div className="flex items-center gap-[1rem] pl-[1rem] w-[70rem]">
                <div>
                  <Skeleton
                    variant="circular"
                    width={40}
                    height={40}
                  />
                </div>
                <div className=" flex-1">
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '3rem' }}
                  />
                </div>
              </div>
              <Skeleton
                variant="rounded"
                sx={{ width: '70rem', height: '36.5rem' }}
              />
            </div>
          ) : (
            <>
              {profileData?.profile_id === userData?.profile_id && (
                <PostStatus profile={profileData} />
              )}
              {posts?.map((post) => (
                <CardPost
                  postData={post}
                  key={post.post_id}
                  profile={profileData}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}

function ProfileAction({
  isMainUser,
  isFriend,
  isSentFriendReq,
  action,
  actionProps,
  profileData,
  isLoadingProfile,
}) {
  const [menuClicked, setMenuClicked] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [valid, setValid] = useState(false);

  // #region edit profile modal
  const ref = useRef(null);
  var profileModel = {
    profile_name: profileData?.profile_name,
    email: profileData?.email,
    old_password: '',
    new_password: '',
  };
  const schemaEditProfile = Yup.object().shape({
    profile_name: Yup.string().required('Required'),
    email: Yup.string()
      .email('Your email is invalid')
      .required('Required'),
    old_password: Yup.string()
      .min(8, 'Your password length must between 8 - 50')
      .max(50, 'Your password length must between 8 - 50')
      .matches(
        /^.*((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        'Password must contain at least one uppercase, one lowercase, one number and one special case character'
      )
      .required('Required'),
  });
  // #endregion

  function handleFirstAction() {
    if (isMainUser) {
    } else {
      if (isFriend) {
        setMenuClicked(!menuClicked);
      } else {
        if (isSentFriendReq === 'TARGET') {
          setMenuClicked(!menuClicked);
        } else {
          action('add');
        }
      }
    }
  }

  function handleClose() {
    if (Helper.isDataChange(ref.current?.values, profileModel)) {
      setOpenConfirm(true);
    } else {
      setEditProfile(false);
    }
  }

  var actionList = [];
  if (isFriend) {
    actionList = [
      {
        middle: 'Unfriend',
        onClick: () => {
          action('unfriend');
          setMenuClicked(false);
        },
      },
    ];
  }
  if (isSentFriendReq === 'TARGET') {
    actionList = [
      {
        middle: 'Confirm',
        onClick: () => {
          action('accept');
          setMenuClicked(false);
        },
      },
      {
        middle: 'Deny',
        onClick: () => {
          action('deny');
          setMenuClicked(false);
        },
      },
    ];
  }

  return (
    <>
      <ClickAwayListener
        onClickAway={() => {
          setMenuClicked(false);
        }}
      >
        <div>
          {!isMainUser && (
            <MUI.Button
              className="gap-[0.8rem]"
              style={{ minWidth: '14rem' }}
              onClick={handleFirstAction}
            >
              {isFriend ? (
                <>
                  <FaUserCheck style={{ fontSize: '2.2rem' }} />
                  <span className=" text-[1.6rem] font-semibold">
                    Friends
                  </span>
                </>
              ) : isSentFriendReq === 'NONE' ? (
                <>
                  <FaUserPlus style={{ fontSize: '2.2rem' }} />
                  <span className=" text-[1.6rem] font-semibold">
                    Add Friend
                  </span>
                </>
              ) : isSentFriendReq === 'REQUEST' ? (
                <>
                  <FaUserTimes style={{ fontSize: '2.2rem' }} />
                  <span className=" text-[1.6rem] font-semibold">
                    Cancel
                  </span>
                </>
              ) : isSentFriendReq === 'TARGET' ? (
                <>
                  <FaUserCheck style={{ fontSize: '2.2rem' }} />
                  <span className=" text-[1.6rem] font-semibold">
                    Respond
                  </span>
                </>
              ) : null}
            </MUI.Button>
          )}
          {menuClicked && (
            <MUI.Menu
              style={{
                width: 'auto',
                zIndex: 1,
              }}
              list={actionList}
            />
          )}
        </div>
      </ClickAwayListener>

      {isMainUser && (
        <>
          <MUI.Button
            className="gap-[0.8rem]"
            style={{ minWidth: '14rem' }}
            onClick={() => {
              setEditProfile(true);
            }}
            disabled={isLoadingProfile}
          >
            {isLoadingProfile ? (
              <CircularProgress
                style={{
                  width: '2.2rem',
                  height: '2.2rem',
                  color: 'var(--primary-color)',
                }}
              />
            ) : (
              <Edit style={{ fontSize: '2.2rem' }} />
            )}
            <span className=" text-[1.6rem] font-semibold">
              Edit profile
            </span>
          </MUI.Button>

          <Modal
            open={editProfile}
            onClose={handleClose}
            closeAfterTransition
          >
            <Paper id="modal-wrapper">
              <div className="text-center">
                <span className="font-bold text-[2rem]">
                  Update profile
                </span>
                <MUI.BetterIconButton
                  onClick={handleClose}
                  className="[&>button>svg]:text-[2rem] [&>div]:w-[3.2rem] [&>div]:h-[3.2rem] absolute top-[1.2rem] right-[1.2rem]"
                >
                  <CloseOutlined />
                </MUI.BetterIconButton>
              </div>

              <ValidateForm
                innerRef={ref}
                initialValues={profileModel}
                validationSchema={schemaEditProfile}
                onSubmit={(values) => {
                  // turn empty to null
                  Object.keys(values).map((x) => {
                    if (values[x] === '') {
                      values[x] = null;
                    }
                    return x;
                  });
                  
                  updateProfileRequest({
                    ...actionProps,
                    profile: values,
                  });

                  setEditProfile(false);
                }}
                handleValid={(data) => {
                  setValid(data);
                }}
                style={{
                  width: '52rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <FormChildren.InputForm
                  name="profile_name"
                  label="Name"
                  required
                />
                <FormChildren.InputForm
                  name="email"
                  label="Email"
                  required
                />
                <FormChildren.InputForm
                  type="password"
                  name="old_password"
                  label="Old Password"
                  required
                />
                <FormChildren.InputForm
                  type="password"
                  name="new_password"
                  label="New Password"
                />
                <div className="w-[100%] flex justify-end gap-[1.2rem] mt-[1.2rem]">
                  <MUI.Button
                    type="button"
                    name="Cancel"
                    onClick={handleClose}
                  />
                  <MUI.Button
                    type="submit"
                    name="Save"
                    disabled={!valid}
                  />
                </div>
              </ValidateForm>

              <MUI.ConfirmDialog
                modalProps={[openConfirm, setOpenConfirm]}
                title="Discard change"
                actionName="discard change"
                confirmAction={() => {
                  setOpenConfirm(false);
                  setEditProfile(false);
                }}
              />
            </Paper>
          </Modal>
        </>
      )}
    </>
  );
}

function UpdateAvatar({ modalProps, profileData, actionProps }) {
  const { accessToken, refreshToken, id, dispatch } = actionProps;
  const [openConfirmDiscard, setOpenConfirmDiscard] = useState(false);
  const [openConfirmRemove, setOpenConfirmRemove] = useState(false);
  const [avatar, setAvatar] = useState('');
  var imageURL;
  if (avatar) {
    imageURL = URL.createObjectURL(avatar);
  } else {
    imageURL = '';
  }

  const onImageChange = (e) => {
    const [file] = e.target.files;
    setAvatar(file);
  };

  const handleClose = () => {
    if (imageURL) {
      setOpenConfirmDiscard(true);
    } else {
      modalProps[1](false);
    }
  };

  const handleReset = () => {
    modalProps[1](false);
    setAvatar('');
  };

  return (
    <Modal
      open={modalProps[0]}
      onClose={handleClose}
      closeAfterTransition
    >
      <Paper id="modal-wrapper" style={{ width: '44rem' }}>
        <div className="text-center">
          <span className="font-bold text-[2rem]">
            Update profile picture
          </span>
          <MUI.BetterIconButton
            onClick={handleClose}
            className="[&>button>svg]:text-[2rem] [&>div]:w-[3.2rem] [&>div]:h-[3.2rem] absolute top-[1.2rem] right-[1.2rem]"
          >
            <CloseOutlined />
          </MUI.BetterIconButton>
        </div>

        <div className="mt-[1.2rem] flex flex-col justify-center items-center gap-[2rem]">
          <div className="relative w-[80%]">
            <MUI.Button
              className="w-[100%]"
              onClick={() => {
                document.getElementById('avatarRef').click();
              }}
            >
              Upload photo
            </MUI.Button>
            {profileData?.avatar && (
              <MUI.Button
                className="w-[100%]"
                style={{ marginTop: '2rem' }}
                onClick={() => {
                  setOpenConfirmRemove(true);
                }}
              >
                Remove
              </MUI.Button>
            )}
            <input
              className="hidden"
              type="file"
              onChange={onImageChange}
              accept="image/*"
              id="avatarRef"
            />
          </div>
          <Avatar
            id="modal-avatar"
            alt={profileData?.profile_name}
            src={
              imageURL
                ? imageURL
                : profileData?.avatar
                ? profileData?.avatar
                : null
            }
            onClick={() => {
              document.getElementById('avatarRef').click();
            }}
          >
            {profileData?.profile_name?.at(0)}
          </Avatar>
        </div>

        <div className="mt-[2rem] text-right">
          <MUI.Button
            style={{ marginRight: '1.6rem' }}
            onClick={handleClose}
          >
            Cancel
          </MUI.Button>
          <MUI.Button
            disabled={Helper.isNullOrEmpty(imageURL)}
            onClick={() => {
              updateAvtRequest({
                accessToken,
                refreshToken,
                avatar,
                id,
                dispatch,
              });

              handleReset();
            }}
          >
            Save
          </MUI.Button>
        </div>

        <MUI.ConfirmDialog
          modalProps={[openConfirmDiscard, setOpenConfirmDiscard]}
          title="Discard change"
          actionName="discard change"
          confirmAction={() => {
            setOpenConfirmDiscard(false);
            handleReset();
          }}
        />

        <MUI.ConfirmDialog
          modalProps={[openConfirmRemove, setOpenConfirmRemove]}
          title="Remove avatar"
          actionName="remove your avatar"
          confirmAction={() => {
            deleteAvtRequest({
              accessToken,
              refreshToken,
              id,
              dispatch,
            });

            setOpenConfirmRemove(false);
            handleReset();
          }}
        />
      </Paper>
    </Modal>
  );
}

function EditDetails({
  modalProps,
  profileDescription,
  actionProps,
}) {
  const [openConfirm, setOpenConfirm] = useState(false);
  const ref = useRef(null);

  var descriptions = Helper.isEmptyObject(profileDescription, true)
    ? {
        career: '',
        location: '',
        school: '',
      }
    : Helper.convertArrayObjectToObject(
        Object.keys(profileDescription).map((x) => {
          return { [x]: profileDescription[x] };
        })
      );

  const handleClose = () => {
    if (Helper.isDataChange(ref.current?.values, descriptions)) {
      setOpenConfirm(true);
    } else {
      modalProps[1](false);
    }
  };

  return (
    <Modal
      open={modalProps[0]}
      onClose={handleClose}
      closeAfterTransition
    >
      <Paper id="modal-wrapper">
        <div className="text-center">
          <span className="font-bold text-[2rem]">
            Update details
          </span>
          <MUI.BetterIconButton
            onClick={handleClose}
            className="[&>button>svg]:text-[2rem] [&>div]:w-[3.2rem] [&>div]:h-[3.2rem] absolute top-[1.2rem] right-[1.2rem]"
          >
            <CloseOutlined />
          </MUI.BetterIconButton>
        </div>

        <ValidateForm
          innerRef={ref}
          initialValues={descriptions}
          onSubmit={(values) => {
            updateDetailRequest({
              description: values,
              ...actionProps,
            });

            modalProps[1](false);
          }}
          style={{
            width: '52rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <FormChildren.InputForm name="school" label="School" />
          <FormChildren.InputForm name="career" label="Career" />
          <FormChildren.SelectForm
            name="location"
            label="Location"
            options={cities}
            search
          />
          <div className="w-[100%] flex justify-end gap-[1.2rem] mt-[1.2rem]">
            <MUI.Button
              type="button"
              name="Cancel"
              onClick={handleClose}
            />
            <MUI.Button type="submit" name="Save" />
          </div>
        </ValidateForm>

        <MUI.ConfirmDialog
          modalProps={[openConfirm, setOpenConfirm]}
          title="Discard change"
          actionName="discard change"
          confirmAction={() => {
            setOpenConfirm(false);
            modalProps[1](false);
          }}
        />
      </Paper>
    </Modal>
  );
}

export default UserProfile;
