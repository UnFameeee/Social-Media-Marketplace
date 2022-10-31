import { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
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
  const allFriends = useSelector(
    (state) => state.friends.getAll?.data
  );
  const userData = useSelector(
    (state) => state.profile?.profileDetails?.data
  );

  useLayoutEffect(() => {
    let onDestroy = false;
    if (!onDestroy) {
      getAllFriends(accessToken, dispatch);
    }
    return () => {
      onDestroy = true;
    };
  }, []);

  var [profileClicked, setProfileClicked] = useState(false);

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
              getProfile(accessToken, x.profile_id, dispatch);
              getPostByProfile(accessToken, x.profile_id, dispatch);
              setProfileClicked(true);
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
