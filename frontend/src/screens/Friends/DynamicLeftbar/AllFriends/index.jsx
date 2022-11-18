import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import TwoColumns from '../../../../components/Layout/TwoColumns';
import LeftbarTitle from '../LeftbarTitle';
import UserProfile from '../../../UserProfile/UserProfile';
import { Helper } from '../../../../utils/Helper';
import { getProfileSaga } from '../../../../redux/profile/profileSlice';
import { getAllFriendForMainUserSaga } from '../../../../redux/friend/friendSlice';
import '../index.css';

export default function AllFriends() {
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
  const allFriends = useSelector(
    (state) => state.friends?.getAllForMainUser?.data
  );
  const userData = useSelector(
    (state) => state.auth?.user?.userData?.profile
  );
  const profileData = useSelector(
    (state) => state.profile?.profileDetails?.data
  );
  var mainId = userData?.profile_id;
  var callRefreshFriend = true;

  // call get all friend once
  useLayoutEffect(() => {
    let onDestroy = false;
    if (!onDestroy) {
      dispatch(
        getAllFriendForMainUserSaga({
          accessToken,
          refreshToken,
          mainId,
          callRefreshFriend,
          dispatch,
        })
      );
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
            callRefreshFriend,
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
          listClassname: 'friend-list all-friend',
        },
        before: (
          <LeftbarTitle
            title="All Friends"
            subTitle={Helper.isMultiple(
              'Friend',
              allFriends?.page?.totalElement,
              'You need to get some friends!'
            )}
          />
        ),
        leftBarList: allFriends?.data?.map((x) => {
          return {
            left: {
              url: x.avatar,
              name: x.profile_name,
            },
            middle: x.profile_name,
            onClick: () => {
              navigate(`?id=${x.profile_id}`);
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
