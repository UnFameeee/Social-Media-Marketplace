import { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getFriendSuggestion } from '../../../../redux/apiRequest';
import TwoColumns from '../../../../components/Layout/TwoColumns';
import LeftbarTitle from '../LeftbarTitle';
import LeftbarMiddleItem from '../LeftbarMiddleItem';
import UserProfile from '../../../UserProfile/UserProfile';
import { Helper } from '../../../../utils/Helper';
import { addFriendSaga } from '../../../../redux/friend/friendSlice';
import { getProfileSaga } from '../../../../redux/profile/profileSlice';
import '../index.css';

export default function FriendSuggestions() {
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
  const friendSuggestions = useSelector(
    (state) => state.friends?.getSuggestion?.data
  );
  const profileData = useSelector(
    (state) => state.profile?.profileDetails?.data
  );
  const userData = useSelector(
    (state) => state.auth?.user?.userData?.profile
  );
  var mainId = userData?.profile_id;

  // call get all friend requests once
  useLayoutEffect(() => {
    let onDestroy = false;
    if (!onDestroy) {
      getFriendSuggestion(accessToken, refreshToken, dispatch);
    }
    return () => {
      onDestroy = true;
    };
  }, []);

  // view profile details
  useLayoutEffect(() => {
    let onDestroy = false;
    if (!onDestroy) {
      window.scroll(0, 0);
      if (!Helper.isNullOrEmpty(queryParams)) {
        var id = queryParams;
        dispatch(
          getProfileSaga({
            accessToken,
            refreshToken,
            id,
            mainId,
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
          listClassname: 'friend-list suggestions',
        },
        before: (
          <LeftbarTitle
            title="Friend Suggestions"
            subTitle="People You May Know"
          />
        ),
        leftBarList: friendSuggestions?.data?.map((x) => {
          let id = x.profile_id;
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
                    dispatch(
                      addFriendSaga({
                        accessToken,
                        refreshToken,
                        id,
                        dispatch,
                      })
                    );
                    navigate('');
                  },
                }}
              />
            ),
            onClick: () => {
              navigate(`?id=${id}`);
            },
            selected:
              !Helper.isNullOrEmpty(queryParams) &&
              x.profile_id === profileData?.profile_id,
            disabled:
              !Helper.isNullOrEmpty(queryParams) &&
              x.profile_id === profileData?.profile_id,
          };
        }),
        leftBarColor: 'white',
      }}
    >
      {!Helper.isNullOrEmpty(queryParams) && (
        <UserProfile setReRender={navigate} />
      )}
    </TwoColumns>
  );
}
