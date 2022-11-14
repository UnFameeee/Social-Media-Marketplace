import { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getAllFriendRequests } from '../../../../redux/apiRequest';
import TwoColumns from '../../../../components/Layout/TwoColumns';
import LeftbarTitle from '../LeftbarTitle';
import LeftbarMiddleItem from '../LeftbarMiddleItem';
import UserProfile from '../../../UserProfile/UserProfile';
import { Helper } from '../../../../utils/Helper';
import {
  acceptSaga,
  denySaga,
} from '../../../../redux/friend/friendSlice';
import '../index.css';
import { getProfileSaga } from '../../../../redux/profile/profileSlice';

export default function FriendRequests() {
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state) => state.auth?.login?.currentUser?.access
  );
  const refreshToken = useSelector(
    (state) => state.auth?.login?.currentUser?.refresh
  );
  const friendRequests = useSelector(
    (state) => state.friends?.getRequests?.data
  );
  const profileData = useSelector(
    (state) => state.profile?.profileDetails?.data
  );
  const userData = useSelector(
    (state) => state.auth?.user?.userData?.profile
  );

  const [searchParams] = useSearchParams();
  const queryParams = Object.fromEntries([...searchParams]);

  const [profileClicked, setProfileClicked] = useState(false);
  useLayoutEffect(() => {
    let onDestroy = false;
    if (!onDestroy) {
      getAllFriendRequests(accessToken, refreshToken, dispatch);
    }
    return () => {
      onDestroy = true;
    };
  }, []);

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
              url: x.avatar,
              name: x.profile_name,
            },
            middle: (
              <LeftbarMiddleItem
                profileName={x.profile_name}
                firstButtonConfig={{
                  onClick: (e) => {
                    e.stopPropagation();
                    let id = x.profile_id;
                    dispatch(
                      acceptSaga({
                        accessToken,
                        refreshToken,
                        id,
                        dispatch,
                      })
                    );
                    setProfileClicked(false);
                  },
                }}
                secondButtonConfig={{
                  onClick: (e) => {
                    e.stopPropagation();
                    let id = x.profile_id;
                    dispatch(
                      denySaga({
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
      {(profileClicked || !Helper.isEmptyObject(queryParams)) && (
        <UserProfile setReRender={setProfileClicked} />
      )}
    </TwoColumns>
  );
}
