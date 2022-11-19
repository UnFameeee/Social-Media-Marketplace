import { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { searchProfile } from '../../redux/apiRequest';
import TwoColumns from '../../components/Layout/TwoColumns';
import { Helper } from '../../utils/Helper';
import LeftbarTitle from '../Friends/DynamicLeftbar/LeftbarTitle';
import LeftbarMiddleItem from '../Friends/DynamicLeftbar/LeftbarMiddleItem';
import UserProfile from '../UserProfile/UserProfile';
import { getProfileSaga } from '../../redux/profile/profileSlice';
import { localStorageService } from '../../services/localStorageService';
import {
  acceptSaga,
  denySaga,
  addFriendSaga,
  unfriendSaga,
} from '../../redux/friend/friendSlice';

export default function SearchPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const queryParams = Object.fromEntries([...searchParams]);
  const [reRender, setReRender] = useState(false);

  const accessToken = useSelector(
    (state) => state.auth?.login?.currentUser?.access
  );
  const refreshToken = useSelector(
    (state) => state.auth?.login?.currentUser?.refresh
  );
  const profiles = useSelector(
    (state) => state.profile?.profileSearch?.data
  );
  const profileData = useSelector(
    (state) => state.profile?.profileDetails?.data
  );
  const userData = useSelector(
    (state) => state.auth?.user?.userData?.profile
  );
  var mainId = userData?.profile_id;
  var callRefreshFriend = false;

  function handleAction(isFriend, requestType, id) {
    if (isFriend) {
      dispatch(
        unfriendSaga({
          accessToken,
          refreshToken,
          id,
          mainId,
          callRefreshFriend,
          dispatch,
        })
      );
    } else {
      if (requestType == 'TARGET') {
        dispatch(
          acceptSaga({
            accessToken,
            refreshToken,
            id,
            callRefreshFriend,
            dispatch,
          })
        );
      } else {
        dispatch(
          addFriendSaga({
            accessToken,
            refreshToken,
            id,
            callRefreshFriendSuggestion: false,
            dispatch,
          })
        );
      }
    }
    setReRender(!reRender);
  }

  useLayoutEffect(() => {
    let onDestroy = false;
    if (!onDestroy) {
      if (!Helper.isNullOrEmpty(queryParams.value)) {
        searchProfile(
          accessToken,
          refreshToken,
          queryParams.value,
          dispatch
        );
      }
    }
    return () => {
      onDestroy = true;
    };
  }, [queryParams.value, reRender]);

  useLayoutEffect(() => {
    let onDestroy = false;
    if (!onDestroy) {
      if (!Helper.isNullOrEmpty(queryParams.id)) {
        dispatch(
          getProfileSaga({
            accessToken,
            refreshToken,
            id: queryParams.id,            
            callRefreshProfile: true,
            dispatch,
          })
        );
      }
      // window.scroll(0, 0);
    }
    return () => {
      onDestroy = true;
    };
  }, [queryParams.id]);

  return (
    <TwoColumns
      leftBarConfig={{
        classNameConfig: {
          listClassname: 'friend-list',
        },
        before: (
          <LeftbarTitle
            title="Search results"
            subTitle={
              !Helper.isEmptyObject(queryParams, true)
                ? Helper.isMultiple(
                    'Result',
                    profiles?.page?.totalElement,
                    `Can't find profile ${queryParams.value}`
                  )
                : `Can't find any profile`
            }
            backTo="/"
          />
        ),
        leftBarList: !Helper.isEmptyObject(queryParams, true)
          ? profiles?.data?.map((x) => {
              return {
                left: {
                  url: x.avatar,
                  name: x.profile_name,
                },
                middle: (
                  <LeftbarMiddleItem
                    profileName={x.profile_name}
                    firstButtonConfig={{
                      name: x.isFriend
                        ? 'Unfriend'
                        : x.isSentFriendRequest == 'NONE'
                        ? 'Add Friend'
                        : x.isSentFriendRequest == 'REQUEST'
                        ? 'Cancel'
                        : '',
                      onClick: (e) => {
                        e.stopPropagation();
                        handleAction(
                          x.isFriend,
                          x.isSentFriendRequest,
                          x.profile_id
                        );
                      },
                      style:
                        x.isSentFriendRequest != 'TARGET'
                          ? { width: '92%' }
                          : {},
                    }}
                    secondButtonConfig={
                      !x.isFriend && x.isSentFriendRequest == 'TARGET'
                        ? {
                            name: '',
                            onClick: async (e) => {
                              e.stopPropagation();
                              dispatch(
                                denySaga({
                                  accessToken,
                                  refreshToken,
                                  id: x.profile_id,
                                  dispatch,
                                })
                              );
                            },
                          }
                        : null
                    }
                  />
                ),
                onClick: () => {
                  localStorageService.addToArray('recentSearch', x);
                  navigate(
                    `?value=${queryParams.value}&id=${x.profile_id}`
                  );
                },
                selected:
                  !Helper.isNullOrEmpty(queryParams.id) &&
                  x.profile_id === profileData?.profile_id,
                disabled:
                  !Helper.isNullOrEmpty(queryParams.id) &&
                  x.profile_id === profileData?.profile_id,
              };
            })
          : null,
        leftBarColor: 'white',
      }}
    >
      {!Helper.isNullOrEmpty(queryParams.id) && (
        <UserProfile setReRender={setReRender} />
      )}
    </TwoColumns>
  );
}
