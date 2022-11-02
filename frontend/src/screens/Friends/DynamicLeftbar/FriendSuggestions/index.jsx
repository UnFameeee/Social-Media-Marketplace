import { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFriend,
  getFriendSuggestion,
  getProfile,
} from '../../../../redux/apiRequest';
import TwoColumns from '../../../../components/Layout/TwoColumns';
import LeftbarTitle from '../LeftbarTitle';
import LeftbarMiddleItem from '../LeftbarMiddleItem';
import UserProfile from '../../../UserProfile/UserProfile';
import '../index.css';

export default function FriendSuggestions() {
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser.access
  );
  const refreshToken = useSelector(
    (state) => state.auth.login.currentUser.refresh
  );
  const allFriendSuggestions = useSelector(
    (state) => state.profile.getFriendSuggestion?.data
  );
  const addFriendStatus = useSelector(
    (state) => state.friends.addFriend?.data
  );
  const userData = useSelector(
    (state) => state.profile?.profileDetails?.data
  );
  console.log(addFriendStatus)

  const [profileClicked, setProfileClicked] = useState(false);
  const [reRender, setReRender] = useState(false);
  useLayoutEffect(() => {
    let onDestroy = false;
    if (!onDestroy) {
      getFriendSuggestion(accessToken,refreshToken, dispatch);
    }
    return () => {
      onDestroy = true;
    };
  }, [reRender]);

  return (
    <TwoColumns
      leftBarConfig={{
        classNameConfig: {
          listClassname: 'friend-list suggestions',
        },
        before: (
          <LeftbarTitle
            title="Friend Suggestions"
            subTitle="People You May Know"
          />
        ),
        leftBarList: allFriendSuggestions?.data?.map((x) => {
          return {
            left: {
              url: x.picture,
              name: x.profile_name,
            },
            middle: (
              <LeftbarMiddleItem
                profileName={x.profile_name}
                firstButtonConfig={{
                  name: 'Add Friend',
                  onClick: () => {
                    addFriend(accessToken,refreshToken, x.profile_id, dispatch);
                    setTimeout(() => {
                      setReRender(!reRender);
                    }, 100);
                  },
                }}
              />
            ),
            onClick: () => {
              getProfile(accessToken, x.profile_id, dispatch);
              setProfileClicked(true);
            },
            selected: profileClicked && x.profile_id === userData.profile_id,
          };
        }),
        leftBarColor: 'white',
      }}
    >
      {profileClicked && <UserProfile />}
    </TwoColumns>
  );
}
