import { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFriend,
  getAllFriends,
  getFriendSuggestion,
  getPostByProfile,
  getProfile,
  isSentFriendReq,
} from '../../../../redux/apiRequest';
import TwoColumns from '../../../../components/Layout/TwoColumns';
import LeftbarTitle from '../LeftbarTitle';
import LeftbarMiddleItem from '../LeftbarMiddleItem';
import UserProfile from '../../../UserProfile/UserProfile';
import '../index.css';
import { addFriendSaga } from '../../../../redux/friend/friendSlice';

export default function FriendSuggestions() {
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser.access
  );
  const refreshToken = useSelector(
    (state) => state.auth.login.currentUser.refresh
  );
  const allFriendSuggestions = useSelector(
    (state) => state.profile?.getFriendSuggestion?.data
  );
  const userData = useSelector(
    (state) => state.profile?.profileDetails?.data
  );

  const [profileClicked, setProfileClicked] = useState(false);
  const [reRender, setReRender] = useState(false);
  useLayoutEffect(() => {
    let onDestroy = false;
    if (!onDestroy) {
      getFriendSuggestion(accessToken, refreshToken, dispatch);
    }
    return () => {
      onDestroy = true;
    };
  }, []);

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
                  onClick: (e) => {
                    e.stopPropagation();
                    let id = x.profile_id;
                    dispatch(addFriendSaga({ accessToken, refreshToken, id, dispatch }));
                    setProfileClicked(false);
                    setReRender(!reRender);
                  },
                }}
              />
            ),
            onClick: () => {
              getProfile(
                accessToken,
                refreshToken,
                x.profile_id,
                dispatch
              );
              getPostByProfile(
                accessToken,
                refreshToken,
                x.profile_id,
                dispatch
              );
              getAllFriends(
                accessToken,
                refreshToken,
                x.profile_id,
                dispatch,
                false
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
      {profileClicked && (
        <UserProfile setReRender={[setReRender, setProfileClicked]} />
      )}
    </TwoColumns>
  );
}
