import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import TwoColumns from '../../../../components/Layout/TwoColumns';
import LeftbarTitle from '../LeftbarTitle';
import LeftbarMiddleItem from '../LeftbarMiddleItem';
import UserProfile from '../../../UserProfile/UserProfile';
import { Helper } from '../../../../utils/Helper';
import {
  addFriendSaga,
  getSentRequestSaga,
} from '../../../../redux/friend/friendSlice';
import { getProfileSaga } from '../../../../redux/profile/profileSlice';
import '../index.css';

export default function YourSentRequests() {
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
  const sentRequests = useSelector(
    (state) => state.friends?.getSentRequests?.data
  );
  const profileData = useSelector(
    (state) => state.profile?.profileDetails?.data
  );

  // call get all sent requests once
  useLayoutEffect(() => {
    let onDestroy = false;
    if (!onDestroy) {
      dispatch(
        getSentRequestSaga({
          accessToken,
          refreshToken,
          callRefreshSentRequest: true,
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
        dispatch(
          getProfileSaga({
            accessToken,
            refreshToken,
            id: queryParams,
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
          listClassname: 'friend-list suggestions',
        },
        before: (
          <LeftbarTitle
            title="Sent Requests"
            subTitle={Helper.isMultiple(
              'Sent Request',
              sentRequests?.page?.totalElement,
              'You Have Not Sent Any Request'
            )}
          />
        ),
        leftBarList: sentRequests?.data?.map((x) => {
          return {
            left: {
              url: x.avatar,
              name: x.profile_name,
            },
            middle: (
              <LeftbarMiddleItem
                profileName={x.profile_name}
                firstButtonConfig={{
                  name: 'Cancel',
                  onClick: (e) => {
                    e.stopPropagation();
                    dispatch(
                      addFriendSaga({
                        accessToken,
                        refreshToken,
                        id: x.profile_id,
                        callRefreshFriendSuggestion: false,
                        callRefreshSentRequest: true,
                        dispatch,
                      })
                    );
                    navigate('');
                  },
                }}
              />
            ),
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
