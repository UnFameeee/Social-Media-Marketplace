import { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFriendSuggestion } from '../../../../redux/apiRequest';
import TwoColumns from '../../../../components/Layout/TwoColumns';
import LeftbarTitle from '../LeftbarTitle';
import LeftbarMiddleItem from '../LeftbarMiddleItem';
import UserProfile from '../../../UserProfile/UserProfile';
import { addFriendSaga } from '../../../../redux/friend/friendSlice';
import '../index.css';
import { getProfileSaga } from '../../../../redux/profile/profileSlice';

export default function FriendSuggestions() {
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state) => state.auth?.login?.currentUser?.access
  );
  const refreshToken = useSelector(
    (state) => state.auth?.login?.currentUser?.refresh
  );
  const friendSuggestions = useSelector(
    (state) => state.friends?.getSuggestion?.data
  );
  const profileData = useSelector(
    (state) => state.profile?.profileDetails?.data
  );
  const userData = useSelector(
    (state) => state.auth?.user?.userData?.profile
  );

  const [profileClicked, setProfileClicked] = useState(false);
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
        leftBarList: friendSuggestions?.data?.map((x) => {
          return {
            left: {
              url: x.avatar,
              name: x.profile_name,
            },
            middle: (
              <LeftbarMiddleItem
                profileName={x.profile_name}
                firstButtonConfig={{
                  name:
                    x.isSentFriendRequest != 'REQUEST'
                      ? 'Add Friend'
                      : 'Cancel Your Request',
                  onClick: (e) => {
                    e.stopPropagation();
                    let id = x.profile_id;
                    dispatch(
                      addFriendSaga({
                        accessToken,
                        refreshToken,
                        id,
                        dispatch,
                      })
                    );
                    setProfileClicked(false);
                  },
                }}
              />
            ),
            onClick: () => {
              let id = x.profile_id;
              let mainId = userData.profile_id;
              dispatch(
                getProfileSaga({
                  accessToken,
                  refreshToken,
                  id,
                  mainId,
                  dispatch,
                })
              );
              if (profileClicked == false) {
                setProfileClicked(true);
              }
            },
            selected:
              profileClicked &&
              x.profile_id === profileData?.profile_id,
            disabled:
              profileClicked &&
              x.profile_id === profileData?.profile_id,
          };
        }),
        leftBarColor: 'white',
      }}
    >
      {profileClicked && (
        <UserProfile setReRender={setProfileClicked} />
      )}
    </TwoColumns>
  );
}
