import { useLayoutEffect, useMemo, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import TwoColumns from '../../../../components/Layout/TwoColumns';
import LeftbarTitle from '../LeftbarTitle';
import { LeftbarFriendRequest } from '../LeftbarMiddleItem';
import UserProfile from '../../../UserProfile/UserProfile';
import { Helper } from '../../../../utils/Helper';
import { getAllRequest } from '../../../../redux/friend/friendAPI';
import { getProfileSaga } from '../../../../redux/profile/profileSlice';
import {
  acceptFriendRequest,
  denyFriendRequest,
} from '../../../../redux/friend/friendSaga';
import '../index.css';

export default function FriendRequests() {
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
  const profileData = useSelector(
    (state) => state.profile?.profileDetails?.data
  );
  const friendRequests = useSelector(
    (state) => state.friends?.getRequests?.data,
    shallowEqual
  );
  const isFetchingRequest = useSelector(
    (state) => state.friends?.getRequests?.isFetching
  );
  const isFetchingProfileDetail = useSelector(
    (state) => state.profile?.profileDetails?.isFetching
  );

  const [listConfirm, setListConfirm] = useState([]);
  const [listDeny, setListDeny] = useState([]);

  var requestList = useMemo(() => {
    return friendRequests;
  }, [friendRequests]);

  var isLoadingRequest = useMemo(() => {
    var result = false;
    if (isFetchingRequest) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }, [isFetchingRequest]);

  var checkId = useMemo(() => {
    return requestList?.data?.some(
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

  // call get all friend requests once
  useLayoutEffect(() => {
    let onDestroy = false;
    if (!onDestroy) {
      getAllRequest(accessToken, refreshToken, dispatch);
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
        dispatch(
          getProfileSaga({
            accessToken,
            refreshToken,
            id: queryParams,
            callRefreshProfile: true,
            dispatch,
          })
        );
      }
    }
    return () => {
      onDestroy = true;
    };
  }, [queryParams]);

  return (
    <TwoColumns
      leftBarConfig={{
        classNameConfig: {
          listClassname: 'friend-list',
        },
        before: (
          <LeftbarTitle
            title="Friend Requests"
            subTitle={
              isLoadingRequest
                ? null
                : Helper.isMultiple(
                    'Friend Request',
                    requestList?.page?.totalElement,
                    'You Have No Friend Requests'
                  )
            }
          />
        ),
        after: isLoadingRequest && (
          <div className="text-center pt-[4rem]">
            <CircularProgress
              style={{ color: 'var(--primary-color)' }}
            />
          </div>
        ),
        leftBarList: isLoadingRequest
          ? null
          : requestList?.data?.map((x) => {
              var profileChecked =
                !checkQueryParam &&
                x.profile_id === profileData?.profile_id;

              return {
                left: {
                  url: x.avatar,
                  name: x.profile_name,
                },
                middle: (
                  <LeftbarFriendRequest
                    profile={x}
                    listAction={[listConfirm, listDeny]}
                    firstButtonConfig={{
                      onClick: (e) => {
                        e.stopPropagation();
                        acceptFriendRequest({
                          accessToken,
                          refreshToken,
                          id: x.profile_id,
                          callRefreshProfile: profileChecked,
                          dispatch,
                        });

                        setListConfirm((old) => [
                          ...old,
                          x.profile_id,
                        ]);
                      },
                    }}
                    secondButtonConfig={{
                      onClick: (e) => {
                        e.stopPropagation();
                        denyFriendRequest({
                          accessToken,
                          refreshToken,
                          id: x.profile_id,
                          callRefreshProfile: profileChecked,
                          dispatch,
                        });

                        setListDeny((old) => [...old, x.profile_id]);
                      },
                    }}
                  />
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
          action={[setListConfirm, setListDeny]}
          actionList={[listConfirm, listDeny]}
        />
      )}
    </TwoColumns>
  );
}
