import { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import TwoColumns from '../../../../components/Layout/TwoColumns';
import LeftbarTitle from '../LeftbarTitle';
import { LeftbarFriendRequest } from '../LeftbarMiddleItem';
import UserProfile from '../../../UserProfile/UserProfile';
import { Helper } from '../../../../utils/Helper';
import {
  acceptSaga,
  denySaga,
} from '../../../../redux/friend/friendSlice';
import { getAllRequest } from '../../../../redux/friend/friendAPI';
import { getProfileSaga } from '../../../../redux/profile/profileSlice';
import '../index.css';

export default function FriendRequests() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = location.search.slice(1).replace(/id=/gi, ''); //remove all the "id=" with this regex

  const [listConfirm, setListConfirm] = useState([]);
  const [listDeny, setListDeny] = useState([]);

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
    (state) => state.friends?.getRequests?.data
  );

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
      if (!Helper.isNullOrEmpty(queryParams)) {
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
  }, [location]);

  return (
    <TwoColumns
      leftBarConfig={{
        classNameConfig: {
          listClassname: 'friend-list',
        },
        before: (
          <LeftbarTitle
            title="Friend Requests"
            subTitle={Helper.isMultiple(
              'Friend Request',
              friendRequests?.page?.totalElement,
              'You Have No Friend Requests'
            )}
          />
        ),
        leftBarList: friendRequests?.data?.map((x) => {
          var profileChecked =
            !Helper.isNullOrEmpty(queryParams) &&
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
                    dispatch(
                      acceptSaga({
                        accessToken,
                        refreshToken,
                        id: x.profile_id,
                        callRefreshProfile: profileChecked,
                        dispatch,
                      })
                    );
                    setListConfirm((old) => [...old, x.profile_id]);
                  },
                }}
                secondButtonConfig={{
                  onClick: (e) => {
                    e.stopPropagation();
                    dispatch(
                      denySaga({
                        accessToken,
                        refreshToken,
                        id: x.profile_id,
                        callRefreshProfile: profileChecked,
                        dispatch,
                      })
                    );
                    setListDeny((old) => [...old, x.profile_id]);
                  },
                }}
              />
            ),
            onClick: () => {
              navigate(`?id=${x.profile_id}`);
            },
            selected: profileChecked,
            disabled: profileChecked,
          };
        }),
        leftBarColor: 'white',
      }}
    >
      {!Helper.isNullOrEmpty(queryParams) &&
        friendRequests?.data.some(
          (e) => e.profile_id.toString() === queryParams.toString()
        ) && (
          <UserProfile
            action={[setListConfirm, setListDeny]}
            actionList={[listConfirm, listDeny]}
          />
        )}
    </TwoColumns>
  );
}
