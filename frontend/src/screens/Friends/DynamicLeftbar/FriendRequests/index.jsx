import { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllFriendRequests,
  acceptFriendRequest,
  getProfile,
  denyFriendRequest,
  getPostByProfile,
  getAllFriends,
} from '../../../../redux/apiRequest';
import TwoColumns from '../../../../components/Layout/TwoColumns';
import LeftbarTitle from '../LeftbarTitle';
import LeftbarMiddleItem from '../LeftbarMiddleItem';
import UserProfile from '../../../UserProfile/UserProfile';
import '../index.css';
import { Helper } from '../../../../utils/Helper';

export default function FriendRequests() {
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser.access
  );
  const refreshToken = useSelector(
    (state) => state.auth.login.currentUser.refresh
  );
  const friendRequests = useSelector(
    (state) => state.friends.getFriendRequests?.data
  );
  const userData = useSelector(
    (state) => state.profile?.profileDetails?.data
  );

  const [profileClicked, setProfileClicked] = useState(false);
  const [reRender, setReRender] = useState(false);
  useLayoutEffect(() => {
    let onDestroy = false;
    if (!onDestroy) {
      getAllFriendRequests(accessToken,refreshToken, dispatch);
    }
    return () => {
      onDestroy = true;
    };
  }, [reRender]);

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
          return {
            left: {
              url: x.picture,
              name: x.profile_name,
            },
            middle: (
              <LeftbarMiddleItem
                profileName={x.profile_name}
                firstButtonConfig={{
                  onClick: () => {
                    acceptFriendRequest(
                      accessToken,refreshToken,
                      x.profile_id,
                      dispatch
                    );
                    setProfileClicked(false);
                    setReRender(!reRender);
                  },
                }}
                secondButtonConfig={{
                  onClick: () => {
                    denyFriendRequest(
                      accessToken,refreshToken,
                      x.profile_id,
                      dispatch
                    );
                    setProfileClicked(false);
                    setReRender(!reRender);
                  },
                }}
              />
            ),
            onClick: () => {
              getProfile(accessToken,refreshToken, x.profile_id, dispatch);
              getPostByProfile(accessToken,refreshToken, x.profile_id, dispatch);
              getAllFriends(
                accessToken,refreshToken,
                x.profile_id,
                dispatch
              );
              setProfileClicked(true);
            },
            selected:
              profileClicked && x.profile_id === userData?.profile_id,
            disabled:
              profileClicked && x.profile_id === userData?.profile_id,
          };
        }),
        leftBarColor: 'white',
      }}
    >
      {profileClicked && <UserProfile />}
    </TwoColumns>
  );
}
