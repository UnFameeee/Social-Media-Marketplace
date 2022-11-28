import { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import TwoColumns from '../../../../components/Layout/TwoColumns';
import LeftbarTitle from '../LeftbarTitle';
import { LeftbarSentRequest } from '../LeftbarMiddleItem';
import UserProfile from '../../../UserProfile/UserProfile';
import { Helper } from '../../../../utils/Helper';
import { getAllSentRequest } from '../../../../redux/friend/friendAPI';
import { getProfileSaga } from '../../../../redux/profile/profileSlice';
import { addFriendRequest } from '../../../../redux/friend/friendSaga';
import '../index.css';

export default function YourSentRequests() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = location.search.slice(1).replace(/id=/gi, ''); //remove all the "id=" with this regex

  const [listCancel, setListCancel] = useState([]);

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
      getAllSentRequest(accessToken, refreshToken, dispatch);
    }
    return () => {
      onDestroy = true;
    };
  }, []);

  // view profile details
  useLayoutEffect(() => {
    let onDestroy = false;
    if (!onDestroy) {
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
          var profileChecked =
            !Helper.isNullOrEmpty(queryParams) &&
            x.profile_id === profileData?.profile_id;

          return {
            left: {
              url: x.avatar,
              name: x.profile_name,
            },
            middle: (
              <LeftbarSentRequest
                profile={x}
                listCancel={listCancel}
                cancelButtonConfig={{
                  onClick: (e) => {
                    e.stopPropagation();
                    addFriendRequest({
                      accessToken,
                      refreshToken,
                      id: x.profile_id,
                      callRefreshProfile: profileChecked,
                      dispatch,
                    });

                    setListCancel((old) => [...old, x.profile_id]);
                  },
                }}
              />
            ),
            onClick: () => {
              navigate(`?id=${x.profile_id}`);
            },
            selected: profileChecked,
            disabled: profileChecked,
          };
        }),
        leftBarColor: 'white',
      }}
    >
      {!Helper.isNullOrEmpty(queryParams) &&
        sentRequests?.data.some(
          (e) => e.profile_id.toString() === queryParams.toString()
        ) && (
          <UserProfile
            action={setListCancel}
            actionList={listCancel}
          />
        )}
    </TwoColumns>
  );
}
