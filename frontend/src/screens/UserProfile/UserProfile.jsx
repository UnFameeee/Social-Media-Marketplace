import { useDispatch, useSelector } from 'react-redux';
import React, { useLayoutEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AvatarWithText from '../../components/Avatar/AvatarWithText';
import {
  PhotoCamera,
  Edit,
  AddCircle,
  MoreHoriz,
  School,
  Home,
  Favorite,
  AccessTimeFilled,
  RssFeed,
  CloseOutlined,
} from '@mui/icons-material';
import { BiMessageRoundedDetail } from 'react-icons/bi';
import {
  FaUserCheck,
  FaUserPlus,
  FaUserMinus,
  FaUserTimes,
} from 'react-icons/fa';
import {
  Avatar,
  ClickAwayListener,
  Modal,
  Paper,
} from '@mui/material';
import SideBarButton from './SideBarButton';
import SideBarLi from './SideBarLi';
import FullWidthHr from '../../components/FullWidthHr/FullWidthHr';
import HoverButton from './HoverButton';
import CardPost from '../../components/Card/CardPost';
import GridSideInfo from './GridSideInfo';
import PostModal from '../Home/PostModal';
import {
  getAllFriends,
  getPostByProfile,
  getProfile,
} from '../../redux/apiRequest';
import { Helper } from '../../utils/Helper';
import MUI from '../../components/MUI';
import {
  acceptSaga,
  addFriendSaga,
  denySaga,
  unfriendSaga,
} from '../../redux/friend/friendSlice';
import { useRef } from 'react';
import { updateAvtSaga } from '../../redux/profile/profileSlice';

function UserProfile(props) {
  const dispatch = useDispatch();
  const [reRender, setReRender] = useState(false);
  const SideBarList = [
    { text: 'Went to Truong THCS Long Duc', icon: <School /> },
    { text: 'Lives in Tra Vinh', icon: <Home /> },
    { text: 'Single', icon: <Favorite /> },
    { text: 'Joined on October 2014', icon: <AccessTimeFilled /> },
    { text: 'Followed by 52 people', icon: <RssFeed /> },
  ];
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser.access
  );
  const refreshToken = useSelector(
    (state) => state.auth.login.currentUser.refresh
  );
  const posts = useSelector(
    (state) => state.post.getByProfile?.posts?.results?.data
  );
  const profileData = useSelector(
    (state) => state.profile?.profileDetails?.data
  );
  const userData = useSelector(
    (state) => state.auth?.user?.userData?.profile
  );
  const allFriends = useSelector(
    (state) => state.friends.getAll?.data
  );

  const [searchParams] = useSearchParams();
  const queryParams = Object.fromEntries([...searchParams]);

  const [openCreatePost, setOpenCreatePost] = useState(false);
  const [postUpdateData, setPostUpdateData] = useState();
  const handleOpenPostModel = () => {
    setOpenCreatePost((prev) => !prev);
  };
  const handleGetPostUpdateData = (data) => {
    setPostUpdateData(data);
  };
  const handleActions = (action) => {
    action();
    if (Helper.checkURL('profile', {}, true)) {
      setReRender(!reRender);
    } else {
      props.setReRender(false);
    }
  };

  const [openAvatarModal, setOpenAvatarModal] = useState(false);

  useLayoutEffect(() => {
    let onDestroy = false;
    if (!onDestroy) {
      if (Helper.checkURL('profile', {}, true)) {
        getProfile(
          accessToken,
          refreshToken,
          queryParams.id,
          dispatch
        );
        getPostByProfile(
          accessToken,
          refreshToken,
          queryParams.id,
          dispatch
        );
        getAllFriends(
          accessToken,
          refreshToken,
          queryParams.id,
          dispatch,
          false
        );
      }
    }
    return () => {
      onDestroy = true;
    };
  }, [reRender]);

  return (
    <>
      {openCreatePost && (
        <PostModal
          showModal={openCreatePost}
          postUpdateData={postUpdateData}
          setPostUpdateData={setPostUpdateData}
          setShowModal={setOpenCreatePost}
          setReRender={setReRender}
          profile={profileData}
          avtUrl="https://source.unsplash.com/random/330×320"
        />
      )}
      <div className="flex justify-center pt-[2%] bg-white shadow-md">
        <div className="relative">
          <img
            src=""
            className="w-[120rem] h-[30rem] object-cover rounded-bl-xl rounded-br-xl shadow-lg bg-[#f0f2f5]"
            alt="wallpaper"
          />
          {profileData?.profile_id == userData?.profile_id && (
            <button
              className="flex items-center absolute right-[1rem] top-[25rem] bg-white p-[0.65rem] rounded-lg gap-[0.75rem]"
              style={{ border: '1px #bdbdbd solid' }}
            >
              <PhotoCamera
                className=""
                style={{ fontSize: '2.5rem' }}
              />
              <span className="text-[1.8rem]">Edit Cover Photo</span>
            </button>
          )}
          <div className="">
            <div className="bigRoundAvt absolute  left-[3.5rem] top-[26rem]">
              <Avatar
                style={{
                  width: '18rem',
                  height: '18rem',
                  fontSize: '10rem',
                }}
                alt={profileData?.profile_name}
                src={profileData?.avatar ? profileData?.avatar : null}
              >
                {profileData?.profile_name?.at(0)}
              </Avatar>
              {profileData?.profile_id == userData?.profile_id && (
                <button
                  className="bg-white absolute right-0 top-[12rem] z-1 p-[0.65rem] rounded-[50%] shadow-lg hover:cursor-pointer"
                  onClick={() => {
                    setOpenAvatarModal(true);
                  }}
                >
                  <PhotoCamera
                    className=" bg-white  right-0 top-[12rem] z-1"
                    style={{ fontSize: '2.5rem' }}
                  />
                </button>
              )}
            </div>
            <div className="flex pl-[24rem] pr-[4rem] items-center justify-center py-[3.5rem] ">
              <div className="flex-1  flex flex-col gap-[0.3rem] ">
                <span className=" font-semibold text-[3rem]">
                  {profileData?.profile_name}
                </span>
                <span className="text-[1.8rem] font-bold text-gray-600">
                  {allFriends?.page?.totalElement > 0 &&
                    Helper.isMultiple(
                      'friend',
                      allFriends?.page?.totalElement,
                      ''
                    )}
                </span>
              </div>
              <div className="flex items-end gap-[1rem]">
                <ProfileAction
                  isMainUser={
                    profileData?.profile_id == userData?.profile_id
                  }
                  isFriend={profileData?.isFriend}
                  isSentFriendReq={profileData?.isSentFriendRequest}
                  actionProps={{
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    id: profileData?.profile_id,
                    mainId: userData?.profile_id,
                    dispatch: dispatch,
                  }}
                  action={handleActions}
                />
              </div>
            </div>
            {profileData?.isSentFriendRequest == 'TARGET' && (
              <div className="text-[2rem] flex pl-[24rem] pr-[4rem] py-[2rem] mt-[3.5rem] items-center justify-end bg-[#f7f8fa] rounded-[0.75rem]">
                <span className="flex-1 font-medium">
                  {profileData?.profile_name} sent you a friend
                  request
                </span>
                <div className="flex items-end gap-[1rem]">
                  <MUI.Button
                    className="gap-[0.8rem]"
                    style={{ minWidth: '14rem' }}
                    onClick={() => {
                      let id = profileData?.profile_id;
                      handleActions(
                        dispatch(
                          acceptSaga({
                            accessToken,
                            refreshToken,
                            id,
                            dispatch,
                          })
                        )
                      );
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
                      let id = profileData?.profile_id;
                      handleActions(() => {
                        dispatch(
                          denySaga({
                            accessToken,
                            refreshToken,
                            id,
                            dispatch,
                          })
                        );
                      });
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
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[2rem] flex mx-auto w-[120rem] gap-[2rem]">
        <div className="leftSideInfo w-[45%]  flex flex-col relative">
          <div className="sticky top-[-83.5rem] ">
            <div className="bg-white rounded-xl p-[1.5rem] shadow-md mb-[2rem] ">
              <div className="flex flex-col">
                <span className="font-bold text-[2.3rem]">Intro</span>
                <span className=" text-center mt-[2rem]">
                  Lorem ipsum dolor sit, amet consectetur adipisicing
                  elit. Delectus, sunt? Lorem ipsum dolor sit amet
                  consectetur adipisicing
                </span>
                <SideBarButton label="Edit bio" />
                <ul className="mt-[2rem] flex flex-col gap-[2rem] [&>li]:flex [&>li]:items-center [&>li]:gap-[1rem]">
                  {SideBarList &&
                    SideBarList.map((li, index) => {
                      return (
                        <SideBarLi
                          key={index}
                          text={li.text}
                          icon={li.icon}
                        />
                      );
                    })}
                </ul>
                <SideBarButton label="Edit details" />
                <SideBarButton label="Add Hobbies" />
                <SideBarButton label="Add Featured" />
              </div>
            </div>
            <GridSideInfo
              type="photo"
              leftLabel="Photo"
              rightLabel="See all Photos"
              listImg={[
                { url: 'https://source.unsplash.com/random/211×212' },
                { url: 'https://source.unsplash.com/random/211×211' },
                { url: 'https://source.unsplash.com/random/211×213' },
                { url: 'https://source.unsplash.com/random/211×214' },
                { url: 'https://source.unsplash.com/random/211×215' },
                { url: 'https://source.unsplash.com/random/211×216' },
                { url: 'https://source.unsplash.com/random/211×218' },
                { url: 'https://source.unsplash.com/random/211×217' },
                { url: 'https://source.unsplash.com/random/211×219' },
              ]}
            />
            {allFriends?.page?.totalElement > 0 && (
              <GridSideInfo
                type="friendPhoto"
                leftLabel="Friends"
                rightLabel="See all Friends"
                listImg={allFriends?.data?.map((x) => {
                  return {
                    url: x.avatar,
                    name: x.profile_name,
                  };
                })}
                total={allFriends?.page?.totalElement}
              />
            )}
          </div>
        </div>
        <div className="rightSidePosts w-[55%]">
          {profileData?.profile_id == userData?.profile_id && (
            <div className="mb-[2rem] bg-white rounded-xl p-[1.5rem] shadow-md  ">
              <AvatarWithText
                url="https://source.unsplash.com/random/180×180"
                size={35}
                haveInput={true}
                alignCenter={true}
                inputValue="What's on your mind?"
                onClick={handleOpenPostModel}
              />
              <FullWidthHr className="mt-[1rem]" />
              <HoverButton
                flex1={true}
                listButton={[
                  { text: 'photo', icon: <PhotoCamera /> },
                  { text: 'School', icon: <School /> },
                  { text: 'Home', icon: <Home /> },
                ]}
              />
            </div>
          )}
          {posts &&
            posts.map((post) => (
              <CardPost
                postData={post}
                key={post.post_id}
                profile={profileData}
                setReRender={setReRender}
                handleOpenPostModel={handleOpenPostModel}
                handleGetPostUpdateData={handleGetPostUpdateData}
              />
            ))}
        </div>
      </div>
      <UpdateAvatar
        modalProps={[openAvatarModal, setOpenAvatarModal]}
        profileData={profileData}
        actionProps={{
          accessToken: accessToken,
          refreshToken: refreshToken,
          id: profileData?.profile_id,
          dispatch: dispatch,
        }}
      />
    </>
  );
}

function ProfileAction({
  isMainUser,
  isFriend,
  isSentFriendReq,
  actionProps,
  action,
}) {
  const { accessToken, refreshToken, id, mainId, dispatch } =
    actionProps;
  const navigate = useNavigate();
  const [menuClicked, setMenuClicked] = useState(false);

  function handleFirstAction() {
    if (isMainUser) {
    } else {
      if (isFriend) {
        setMenuClicked(!menuClicked);
      } else {
        if (isSentFriendReq == 'NONE') {
          action(() => {
            dispatch(
              addFriendSaga({
                accessToken,
                refreshToken,
                id,
                dispatch,
              })
            );
          });
        } else if (isSentFriendReq == 'REQUEST') {
          action(() => {
            dispatch(
              addFriendSaga({
                accessToken,
                refreshToken,
                id,
                dispatch,
              })
            );
          });
        } else if (isSentFriendReq == 'TARGET') {
          setMenuClicked(!menuClicked);
        }
      }
    }
  }

  function handleSecondAction() {
    if (isMainUser) {
    } else {
      navigate('/messenger');
    }
  }

  var actionList = [];
  if (isFriend) {
    actionList = [
      {
        middle: 'Unfriend',
        onClick: () => {
          action(() => {
            dispatch(
              unfriendSaga({
                accessToken,
                refreshToken,
                id,
                mainId,
                dispatch,
              })
            );
          });
        },
      },
    ];
  }
  if (isSentFriendReq == 'TARGET') {
    actionList = [
      {
        middle: 'Confirm',
        onClick: () => {
          action(() => {
            dispatch(
              acceptSaga({
                accessToken,
                refreshToken,
                id,
                dispatch,
              })
            );
          });
        },
      },
      {
        middle: 'Deny',
        onClick: () => {
          action(() => {
            dispatch(
              denySaga({
                accessToken,
                refreshToken,
                id,
                dispatch,
              })
            );
          });
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
          <MUI.Button
            className="gap-[0.8rem]"
            style={{ minWidth: '14rem' }}
            onClick={handleFirstAction}
          >
            {isMainUser ? (
              <>
                <AddCircle style={{ fontSize: '2.2rem' }} />
                <span className=" text-[1.6rem] font-semibold">
                  Add to story
                </span>
              </>
            ) : isFriend ? (
              <>
                <FaUserCheck style={{ fontSize: '2.2rem' }} />
                <span className=" text-[1.6rem] font-semibold">
                  Friends
                </span>
              </>
            ) : isSentFriendReq == 'NONE' ? (
              <>
                <FaUserPlus style={{ fontSize: '2.2rem' }} />
                <span className=" text-[1.6rem] font-semibold">
                  Add Friend
                </span>
              </>
            ) : isSentFriendReq == 'REQUEST' ? (
              <>
                <FaUserTimes style={{ fontSize: '2.2rem' }} />
                <span className=" text-[1.6rem] font-semibold">
                  Cancel
                </span>
              </>
            ) : isSentFriendReq == 'TARGET' ? (
              <>
                <FaUserCheck style={{ fontSize: '2.2rem' }} />
                <span className=" text-[1.6rem] font-semibold">
                  Respond
                </span>
              </>
            ) : null}
          </MUI.Button>

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

      <MUI.Button
        className="gap-[0.8rem]"
        style={{ minWidth: '14rem' }}
        onClick={handleSecondAction}
      >
        {isMainUser ? (
          <>
            <Edit style={{ fontSize: '2.2rem' }} />
            <span className=" text-[1.6rem] font-semibold">
              Edit profile
            </span>
          </>
        ) : (
          <>
            <BiMessageRoundedDetail style={{ fontSize: '2.2rem' }} />
            <span className=" text-[1.6rem] font-semibold">
              Message
            </span>
          </>
        )}
      </MUI.Button>
    </>
  );
}

function UpdateAvatar({ modalProps, profileData, actionProps }) {
  const { accessToken, refreshToken, id, dispatch } = actionProps;
  const inputRef = useRef(null);
  const [avatar, setAvatar] = useState();
  const [imageURL, setImageURL] = useState();
  const [openConfirm, setOpenConfirm] = useState(false);

  const onImageChange = (e) => {
    const [file] = e.target.files;
    setAvatar(file);
    setImageURL(URL.createObjectURL(file));
  };

  const handleClose = () => {
    if (imageURL) {
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
      <Paper
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '44rem',
          boxShadow: 24,
          p: '1.6rem 1.6rem 2rem 1.6rem',
        }}
      >
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
                inputRef.current.click();
              }}
            >
              Upload photo
            </MUI.Button>
            <input
              className="hidden"
              type="file"
              onChange={onImageChange}
              ref={inputRef}
            />
          </div>
          <Avatar
            sx={{
              borderRadius: 0,
              width: '80%',
              height: '32rem',
              fontSize: '16rem',
              cursor: 'pointer',
            }}
            alt={profileData?.profile_name}
            src={
              imageURL
                ? imageURL
                : profileData?.avatar
                ? profileData?.avatar
                : null
            }
            onClick={() => {
              inputRef.current.click();
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
            onClick={() => {
              dispatch(
                updateAvtSaga({
                  accessToken,
                  refreshToken,
                  avatar,
                  id,
                  dispatch,
                })
              );
              modalProps[1](false);
            }}
          >
            Save
          </MUI.Button>
        </div>

        <MUI.ConfirmDialog
          modalProps={[openConfirm, setOpenConfirm]}
          title="Discard change"
          actionName="discard change"
          confirmAction={() => {
            setOpenConfirm(false);
            modalProps[1](false);
            setImageURL('');
          }}
        />
      </Paper>
    </Modal>
  );
}

export default UserProfile;
