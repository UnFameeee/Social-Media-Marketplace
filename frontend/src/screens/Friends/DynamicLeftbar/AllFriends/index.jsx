import { useLayoutEffect, useState, useMemo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { CircularProgress, ClickAwayListener, Skeleton } from '@mui/material';
import TwoColumns from '../../../../components/Layout/TwoColumns';
import LeftbarTitle from '../LeftbarTitle';
import UserProfile from '../../../UserProfile/UserProfile';
import { Helper } from '../../../../utils/Helper';
import { LeftbarAllFriend } from '../LeftbarMiddleItem';
import { getProfileSaga } from '../../../../redux/profile/profileSlice';
import { getAllFriendForMainUser } from '../../../../redux/friend/friendAPI';
import {
  addFriendRequest,
  unfriendRequest,
} from '../../../../redux/friend/friendSaga';
import '../index.css';

export default function AllFriends() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = location.search.slice(1).replace(/id=/gi, ''); //remove all the "id=" with this regex

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
  const allFriends = useSelector(
    (state) => state.friends?.getAllForMainUser?.data,
    shallowEqual
  );
  const isFetchingAllFriend = useSelector(
    (state) => state.friends?.getAllForMainUser?.isFetching
  );
  const isFetchingProfileDetail = useSelector(
    (state) => state.profile?.profileDetails?.isFetching
  );

  var mainId = userData?.profile_id;

  const [openOptions, setOpenOptions] = useState('');
  const [listRemoved, setListRemoved] = useState([]);
  const [listAdded, setListAdded] = useState([]);

  var allFriendList = useMemo(() => {
    return allFriends;
  }, [allFriends]);

  var isLoadingAllFriend = useMemo(() => {
    var result = false;
    if (isFetchingAllFriend) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }, [isFetchingAllFriend]);

  var checkId = useMemo(() => {
    return allFriendList?.data?.some(
      (e) => e.profile_id.toString() === queryParams.toString()
    );
  }, [queryParams]);

  var checkQueryParam = useMemo(() => {
    return Helper.isNullOrEmpty(queryParams);
  }, [queryParams]);

  var isLoadingProfileDetail = useMemo(() => {
    var result = false;
    if (isFetchingProfileDetail) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }, [isFetchingProfileDetail]);

  // call get all friend once
  useLayoutEffect(() => {
    let onDestroy = false;
    if (!onDestroy) {
      getAllFriendForMainUser(
        accessToken,
        refreshToken,
        mainId,
        dispatch
      );
    }
    return () => {
      onDestroy = true;
    };
  }, []);

  // view profile details
  useLayoutEffect(() => {
    let onDestroy = false;
    if (!onDestroy) {
      if (!checkQueryParam) {
        var id = queryParams;
        dispatch(
          getProfileSaga({
            accessToken,
            refreshToken,
            id,
            callRefreshProfile: true,
            dispatch,
          })
        );
      }
    }
    return () => {
      onDestroy = true;
    };
  }, [location]);

  return (
    <TwoColumns
      leftBarConfig={{
        classNameConfig: {
          listClassname: 'friend-list all-friend',
        },
        before: (
          <LeftbarTitle
            title="All Friends"
            subTitle={
              isLoadingAllFriend
                ? null
                : Helper.isMultiple(
                    'Friend',
                    allFriendList?.page?.totalElement,
                    'You need to get some friends!'
                  )
            }
          />
        ),
        after: isLoadingAllFriend && (
          <div className="friend-left-bar-skeleton">
            {[...Array(8)].map((item, index) => (
              <Skeleton
                key={index}
                variant="rounded"
                width={360}
                height={96}
              />
            ))}
          </div>
        ),
        leftBarList: isLoadingAllFriend
          ? null
          : allFriendList?.data?.map((x) => {
              var profileChecked =
                !checkQueryParam &&
                x.profile_id === profileData?.profile_id;

              return {
                left: {
                  url: x.avatar,
                  name: x.profile_name,
                },
                middle: (
                  <ClickAwayListener
                    onClickAway={(e) => {
                      e.stopPropagation();
                      if (openOptions) {
                        setOpenOptions('');
                      }
                    }}
                  >
                    <div>
                      <LeftbarAllFriend
                        profile={x}
                        openOptions={[openOptions, setOpenOptions]}
                        listUnfriend={listRemoved}
                        listAdded={listAdded}
                        handleUnfriend={() => {
                          unfriendRequest({
                            accessToken,
                            refreshToken,
                            id: x.profile_id,
                            callRefreshProfile: profileChecked,
                            dispatch,
                          });

                          setListRemoved((old) => [
                            ...old,
                            x.profile_id,
                          ]);
                        }}
                        handleAddFriend={() => {
                          addFriendRequest({
                            accessToken,
                            refreshToken,
                            id: x.profile_id,
                            callRefreshProfile: profileChecked,
                            dispatch,
                          });

                          setListAdded((old) => [
                            ...old,
                            x.profile_id,
                          ]);
                        }}
                        handleCancelRequest={() => {
                          addFriendRequest({
                            accessToken,
                            refreshToken,
                            id: x.profile_id,
                            callRefreshProfile: profileChecked,
                            dispatch,
                          });

                          var filter = listAdded.filter(
                            (e) => e !== x.profile_id
                          );
                          setListAdded(filter);
                        }}
                      />
                    </div>
                  </ClickAwayListener>
                ),
                onClick: () => {
                  navigate(`?id=${x.profile_id}`);
                },
                selected: !isLoadingProfileDetail && profileChecked,
                disabled: isLoadingProfileDetail
                  ? true
                  : profileChecked,
              };
            }),
        leftBarColor: 'white',
      }}
    >
      {!checkQueryParam && checkId && (
        <UserProfile
          action={[setListRemoved, setListAdded]}
          actionList={[listRemoved, listAdded]}
        />
      )}
    </TwoColumns>
  );
}
