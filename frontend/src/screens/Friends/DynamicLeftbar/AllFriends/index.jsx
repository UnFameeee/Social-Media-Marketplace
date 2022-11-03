import { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllFriendsForMainUser,
  getAllFriends,
  getPostByProfile,
  getProfile,
} from '../../../../redux/apiRequest';
import TwoColumns from '../../../../components/Layout/TwoColumns';
import LeftbarTitle from '../LeftbarTitle';
import UserProfile from '../../../UserProfile/UserProfile';
import { Helper } from '../../../../utils/Helper';
import '../index.css';

export default function AllFriends() {
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser.access
  );
  const refreshToken = useSelector(
    (state) => state.auth.login.currentUser.refresh
  );
  const allFriends = useSelector(
    (state) => state.friends.getAllForMainUser?.data
  );
  const userData = useSelector(
    (state) => state.auth?.user?.userData?.profile
  );
  const profileData = useSelector(
    (state) => state.profile?.profileDetails?.data
  );

  const [profileClicked, setProfileClicked] = useState(false);
  useLayoutEffect(() => {
    let onDestroy = false;
    if (!onDestroy) {
      getAllFriends(accessToken,refreshToken,userData?.profile_id, dispatch);
    }
    return () => {
      onDestroy = true;
    };
  }, []);

  return (
    <TwoColumns
      leftBarConfig={{
        classNameConfig: {
          listClassname: 'friend-list all-friend',
        },
        before: (
          <LeftbarTitle
            title="All Friends"
            subTitle={Helper.isMultiple(
              'Friend',
              allFriends?.page?.totalElement,
              'You are CUMLOX'
            )}
          />
        ),
        leftBarList: allFriends?.data?.map((x) => {
          return {
            left: {
              url: x.picture,
              name: x.profile_name,
            },
            middle: x.profile_name,
            onClick: () => {
              getProfile(accessToken,refreshToken, x.profile_id, dispatch);
              getPostByProfile(accessToken,refreshToken, x.profile_id, dispatch);
              getAllFriends(accessToken,refreshToken, x.profile_id, dispatch);
              setProfileClicked(true);
            },
            selected:
              profileClicked && x.profile_id === profileData?.profile_id,
            disabled:
              profileClicked && x.profile_id === profileData?.profile_id,
          };
        }),
        leftBarColor: 'white',
      }}
    >
      {profileClicked && <UserProfile />}
    </TwoColumns>
  );
}
