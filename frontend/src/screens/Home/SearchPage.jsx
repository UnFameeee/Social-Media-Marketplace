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

  async function handleAction(isFriend, requestType, id) {
    if (isFriend) {
      await dispatch(
        unfriendSaga({
          accessToken,
          refreshToken,
          id,
          mainId,
          forMainUser: false,
          callRefresh: false,
          dispatch,
        })
      );
    } else {
      if (requestType == 'TARGET') {
        await dispatch(
          acceptSaga({
            accessToken,
            refreshToken,
            id,
            callRefresh: false,
            dispatch,
          })
        );
      } else {
        await dispatch(
          addFriendSaga({
            accessToken,
            refreshToken,
            id,
            callRefresh: false,
            dispatch,
          })
        );
      }
    }
    await setReRender(!reRender);
  }

  useLayoutEffect(() => {
    let onDestroy = false;
    if (!onDestroy) {
      window.scroll(0, 0);
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
      window.scroll(0, 0);
      if (!Helper.isNullOrEmpty(queryParams.id)) {
        var id = queryParams.id;
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
                      name: x.isFriend
                        ? 'Unfriend'
                        : x.isSentFriendRequest == 'NONE'
                        ? 'Add Friend'
                        : x.isSentFriendRequest == 'REQUEST'
                        ? 'Cancel'
                        : '',
                      onClick: async (e) => {
                        e.stopPropagation();
                        await handleAction(
                          x.isFriend,
                          x.isSentFriendRequest,
                          id
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
                              await dispatch(
                                denySaga({
                                  accessToken,
                                  refreshToken,
                                  id,
                                  callRefresh: false,
                                  dispatch,
                                })
                              );
                              await setReRender(!reRender);
                            },
                          }
                        : null
                    }
                  />
                ),
                onClick: () => {
                  localStorageService.addToArray('recentSearch', x);
                  navigate(`?value=${queryParams.value}&id=${id}`);
                },
                selected:
                  !Helper.isNullOrEmpty(queryParams.id) &&
                  id === profileData?.profile_id,
                disabled:
                  !Helper.isNullOrEmpty(queryParams.id) &&
                  id === profileData?.profile_id,
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
