import { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllFriendRequests,
  acceptFriendRequest,
  getProfile,
  denyFriendRequest,
  getPostByProfile,
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
      getAllFriendRequests(accessToken, dispatch);
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
                  onClick: (e) => {
                    e.stopPropagation();
                    acceptFriendRequest(
                      accessToken,
                      x.profile_id,
                      dispatch
                    );
                    setTimeout(() => {
                      setProfileClicked(false);
                      setReRender(!reRender);
                    }, 100);
                  },
                }}
                secondButtonConfig={{
                  onClick: (e) => {
                    e.stopPropagation();
                    denyFriendRequest(
                      accessToken,
                      x.profile_id,
                      dispatch
                    );
                    setTimeout(() => {
                      setProfileClicked(false);
                      setReRender(!reRender);
                    }, 100);
                  },
                }}
              />
            ),
            onClick: () => {
              getProfile(accessToken, x.profile_id, dispatch);
              getPostByProfile(accessToken, x.profile_id, dispatch);
              setTimeout(() => {
                setProfileClicked(true);
              }, 100);
            },
            selected:
              profileClicked && x.profile_id === userData.profile_id,
            disabled:
              profileClicked && x.profile_id === userData.profile_id,
          };
        }),
        leftBarColor: 'white',
      }}
    >
      {profileClicked && <UserProfile />}
    </TwoColumns>
  );
}
