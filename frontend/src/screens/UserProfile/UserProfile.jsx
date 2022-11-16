import { useDispatch, useSelector } from 'react-redux';
import { useLayoutEffect, useState, useRef } from 'react';
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
  ClickAwayListener,
  Modal,
  Paper,
  TextareaAutosize,
} from '@mui/material';
import SideBarButton from './SideBarButton';
import SideBarLi from './SideBarLi';
import FullWidthHr from '../../components/FullWidthHr/FullWidthHr';
import HoverButton from './HoverButton';
import CardPost from '../../components/Card/CardPost';
import GridSideInfo from './GridSideInfo';
import PostModal from '../Home/PostModal';
import { Helper } from '../../utils/Helper';
import MUI from '../../components/MUI';
import {
  acceptSaga,
  addFriendSaga,
  denySaga,
  unfriendSaga,
} from '../../redux/friend/friendSlice';
import {
  deleteAvtSaga,
  deleteWallpaperSaga,
  getProfileSaga,
  updateAvtSaga,
  updateDetailSaga,
  updateWallpaperSaga,
} from '../../redux/profile/profileSlice';
import PostStatus from '../../components/PostStatus/PostStatus';
import { ValidateForm, FormChildren } from '../../components/Form';
import { cities } from '../../common/constants/listConstants';
import './index.css';

function UserProfile(props) {
  const dispatch = useDispatch();
  const [reRender, setReRender] = useState(false);
  const [openAvatarModal, setOpenAvatarModal] = useState(false); //toggle update avatar modal
  const [openDetailsModal, setOpenDetailsModal] = useState(false); //toggle update details modal
  const [editBio, setEditBio] = useState(false); //toggle edit bio

  const [searchParams] = useSearchParams();
  const queryParams = Object.fromEntries([...searchParams]);

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

  var id = profileData?.profile_id ?? userData?.profile_id;
  var profile_description =
    profileData?.profile_description ?? userData?.profile_description;
  var descriptionWithoutBio = {};
  if (profile_description) {
    var { description, ...descriptionWithoutBio } =
      profile_description;
  }

  const handleActions = async (action) => {
    action();
    if (Helper.checkURL('profile', {}, true)) {
      setReRender(!reRender);
    } else {
      props.setReRender('');
    }
  };

  const [menuClicked, setMenuClicked] = useState(false);
  const [openConfirmRemove, setOpenConfirmRemove] = useState(false);
  const [wallpaper, setWallpaper] = useState();
  var wallpaperURL;
  if (wallpaper) {
    wallpaperURL = URL.createObjectURL(wallpaper);
  }
  const onImageChange = (e) => {
    const [file] = e.target.files;
    setWallpaper(file);
  };
  const clearWallpaper = () => {
    setWallpaper('');
  };

  useLayoutEffect(() => {
    let onDestroy = false;
    if (!onDestroy) {
      if (Helper.checkURL('profile', {}, true)) {
        var id = queryParams.id ?? profileData?.profile_id ?? userData?.profile_id;
        dispatch(
          getProfileSaga({
            accessToken,
            refreshToken,
            id,
            dispatch,
          })
        );
      }
    }
    return () => {
      onDestroy = true;
    };
  }, [reRender]);

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
                dispatch(
                  updateWallpaperSaga({
                    accessToken,
                    refreshToken,
                    wallpaper,
                    id,
                    dispatch,
                  })
                );
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
          <div
            style={
              wallpaperURL
                ? { backgroundImage: `url(${wallpaperURL}` }
                : profileData?.wallpaper
                ? { backgroundImage: `url(${profileData?.wallpaper}` }
                : null
            }
            id="wallpaper"
            className="shadow-lg"
          ></div>

          {/* handle wallpaper actions */}
          {profileData?.profile_id == userData?.profile_id && (
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
                    setMenuClicked(true);
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
                  id="wallpaperRef"
                />
                {menuClicked && (
                  <MUI.Menu
                    style={{
                      width: 'auto',
                      zIndex: 1,
                      right: '1rem',
                      bottom: '2rem',
                    }}
                    list={[
                      {
                        middle: 'Upload photo',
                        onClick: () => {
                          document
                            .getElementById('wallpaperRef')
                            .click();

                          setMenuClicked(false);
                        },
                      },
                      {
                        middle: 'Remove',
                        onClick: () => {
                          setOpenConfirmRemove(true);
                          setMenuClicked(false);
                        },
                      },
                    ]}
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
                    dispatch(
                      deleteWallpaperSaga({
                        accessToken,
                        refreshToken,
                        id,
                        dispatch,
                      })
                    );
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

              {/* handle Avatar */}
              {profileData?.profile_id == userData?.profile_id && (
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
              )}
            </div>

            <div className="flex pl-[24rem] pr-[4rem] items-center justify-center py-[3.6rem]">
              {/* profile name and its friend count */}
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

              {/* handle profile action - mainly for other profiles (not the person who is logged in) */}
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
      {profileData?.isSentFriendRequest == 'TARGET' && (
        <div id="friendRequest">
          <span className="flex-1 font-medium">
            {profileData?.profile_name} sent you a friend request
          </span>
          <div className="flex items-end gap-[1rem]">
            <MUI.Button
              className="gap-[0.8rem]"
              style={{ minWidth: '14rem' }}
              onClick={() => {
                handleActions(() => {
                  dispatch(
                    acceptSaga({
                      accessToken,
                      refreshToken,
                      id,
                      callRefresh: false,
                      dispatch,
                    })
                  );
                });
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
                handleActions(() => {
                  dispatch(
                    denySaga({
                      accessToken,
                      refreshToken,
                      id,
                      callRefresh: false,
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

      <div className="mt-[2rem] flex mx-auto w-[120rem] gap-[2rem]">
        <div className="leftSideInfo w-[45%]  flex flex-col relative">
          <div className="sticky top-[-83.5rem] ">
            {/* profile description */}
            {(!Helper.isEmptyObject(profile_description, true) ||
              userData?.profile_id == profileData?.profile_id) && (
              <div className="bg-white rounded-xl p-[1.5rem] shadow-md mb-[2rem] ">
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
                      {userData?.profile_id ==
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
                              description: document.getElementById(
                                'profileBioEditor'
                              )?.value,
                            };
                            dispatch(
                              updateDetailSaga({
                                accessToken,
                                refreshToken,
                                description,
                                id,
                                dispatch,
                              })
                            );
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
                      {Object.entries(descriptionWithoutBio)?.map(
                        (x, index) => {
                          return (
                            <SideBarLi key={index} description={x} />
                          );
                        }
                      )}
                    </ul>
                  )}
                  {userData?.profile_id ==
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
              </div>
            )}

            <GridSideInfo
              type="photo"
              leftLabel="Photo"
              rightLabel={{ text: 'See all Photos' }}
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

            {/* friend sections */}
            {allFriends?.page?.totalElement > 0 && (
              <GridSideInfo
                type="friendPhoto"
                leftLabel="Friends"
                rightLabel={{ text: 'See all Friends' }}
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
            <PostStatus
              profile={profileData}
            />
          )}
          {posts?.map((post) => (
            <CardPost
              postData={post}
              key={post.post_id}
              profile={profileData}
              // setReRender={setReRender}
            />
          ))}
        </div>
      </div>
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
                callRefresh: false,
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
                callRefresh: false,
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
                forMainUser: Helper.checkURL('friends'),
                callRefresh: Helper.checkURL('friends'),
                dispatch,
              })
            );
          });
          setMenuClicked(false);
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
                callRefresh: false,
                dispatch,
              })
            );
          });
          setMenuClicked(false);
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
                callRefresh: false,
                dispatch,
              })
            );
          });
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
  const [openConfirmDiscard, setOpenConfirmDiscard] = useState(false);
  const [openConfirmRemove, setOpenConfirmRemove] = useState(false);
  const [avatar, setAvatar] = useState();
  var imageURL;
  if (avatar) {
    imageURL = URL.createObjectURL(avatar);
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
            <MUI.Button
              className="w-[100%]"
              style={{ marginTop: '2rem' }}
              onClick={() => {
                setOpenConfirmRemove(true);
              }}
            >
              Remove
            </MUI.Button>
            <input
              className="hidden"
              type="file"
              onChange={onImageChange}
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
          modalProps={[openConfirmDiscard, setOpenConfirmDiscard]}
          title="Discard change"
          actionName="discard change"
          confirmAction={() => {
            setOpenConfirmDiscard(false);
            modalProps[1](false);
            setAvatar('');
          }}
        />

        <MUI.ConfirmDialog
          modalProps={[openConfirmRemove, setOpenConfirmRemove]}
          title="Remove avatar"
          actionName="remove your avatar"
          confirmAction={() => {
            dispatch(
              deleteAvtSaga({
                accessToken,
                refreshToken,
                id,
                dispatch,
              })
            );
            setOpenConfirmRemove(false);
            modalProps[1](false);
            setAvatar('');
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
  const { accessToken, refreshToken, id, dispatch } = actionProps;
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
            var description = values;
            dispatch(
              updateDetailSaga({
                accessToken,
                refreshToken,
                description,
                id,
                dispatch,
              })
            );
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
