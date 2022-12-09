import { useLayoutEffect, useMemo, useState, useRef } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { CircularProgress, Skeleton } from '@mui/material';
import TwoColumns from '../../../../components/Layout/TwoColumns';
import LeftbarTitle from '../LeftbarTitle';
import { LeftbarFriendSuggest } from '../LeftbarMiddleItem';
import UserProfile from '../../../UserProfile/UserProfile';
import { Helper } from '../../../../utils/Helper';
import { getProfileSaga } from '../../../../redux/profile/profileSlice';
import { getAllSuggestions } from '../../../../redux/friend/friendAPI';
import { addFriendRequest } from '../../../../redux/friend/friendSaga';
import '../index.css';

export default function FriendSuggestions() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = location.search.slice(1).replace(/id=/gi, ''); //remove all the "id=" with this regex

  // #region redux variables
  const accessToken = useSelector(
    (state) => state.auth?.login?.currentUser?.access
  );
  const refreshToken = useSelector(
    (state) => state.auth?.login?.currentUser?.refresh
  );
  const profileData = useSelector(
    (state) => state.profile?.profileDetails?.data
  );
  const friendSuggestions = useSelector(
    (state) => state.friends?.getSuggestion?.data?.data,
    shallowEqual
  );
  const isFetchingSuggestion = useSelector(
    (state) => state.friends?.getSuggestion?.isFetching
  );
  const isFetchingProfileDetail = useSelector(
    (state) => state.profile?.profileDetails?.isFetching
  );
  const isFetchingAddCancel = useSelector(
    (state) => state.friends?.addFriend?.isFetching
  );
  // #endregion

  const [listAdded, setListAdded] = useState([]);
  const [listRemoved, setListRemoved] = useState([]);
  const currentId = useRef(null);

  var suggestionList = useMemo(() => {
    return friendSuggestions;
  }, [friendSuggestions]);

  var checkId = useMemo(() => {
    return suggestionList?.some(
      (e) => e.profile_id.toString() === queryParams.toString()
    );
  }, [queryParams]);

  var checkQueryParam = useMemo(() => {
    return Helper.isNullOrEmpty(queryParams);
  }, [queryParams]);

  // #region loading variables
  var isLoadingSuggestion = useMemo(() => {
    var result = false;
    if (isFetchingSuggestion) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }, [isFetchingSuggestion]);

  var isLoadingProfileDetail = useMemo(() => {
    var result = false;
    if (isFetchingProfileDetail) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }, [isFetchingProfileDetail]);

  var isLoadingAddCancel = useMemo(() => {
    var result = false;
    if (isFetchingAddCancel) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }, [isFetchingAddCancel]);
  // #endregion

  // call get all friend suggestions once
  useLayoutEffect(() => {
    let onDestroy = false;
    if (!onDestroy) {
      getAllSuggestions(accessToken, refreshToken, dispatch);
    }
    return () => {
      onDestroy = true;
    };
  }, []);

  // view profile details
  useLayoutEffect(() => {
    let onDestroy = false;
    if (!onDestroy) {
      if (!checkQueryParam) {
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
  }, [queryParams]);

  return (
    <TwoColumns
      leftBarConfig={{
        classNameConfig: {
          listClassname: 'friend-list ', //suggestions - add this class when only have 1 button
        },
        before: (
          <LeftbarTitle
            title="Friend Suggestions"
            subTitle="People You May Know"
          />
        ),
        after: isLoadingSuggestion && (
          <div className="friend-left-bar-skeleton">
            {[...Array(8)].map((item, index) => (
              <Skeleton
                key={index}
                variant="rounded"
                width={360}
                height={96}
              />
            ))}
          </div>
        ),
        leftBarList: isLoadingSuggestion
          ? null
          : suggestionList?.map((x) => {
              var profileChecked =
                !checkQueryParam &&
                x.profile_id === profileData?.profile_id;

              return Helper.checkValueExistInArray(
                listRemoved,
                x.profile_id
              )
                ? {}
                : {
                    left: {
                      url: x.avatar,
                      name: x.profile_name,
                    },
                    middle: (
                      <LeftbarFriendSuggest
                        listAdded={listAdded}
                        profile={x}
                        isLoading={isLoadingAddCancel}
                        currentId={currentId.current}
                        firstButtonConfig={{
                          onClick: (e) => {
                            e.stopPropagation();
                            addFriendRequest({
                              accessToken,
                              refreshToken,
                              id: x.profile_id,
                              callRefreshProfile: profileChecked,
                              dispatch,
                            });

                            setListAdded((old) => [
                              ...old,
                              x.profile_id,
                            ]);

                            currentId.current = x.profile_id;
                          },
                        }}
                        secondButtonConfig={{
                          onClick: (e) => {
                            e.stopPropagation();
                            setListRemoved((old) => [
                              ...old,
                              x.profile_id,
                            ]);
                          },
                        }}
                        hiddenButtonConfig={{
                          onClick: (e) => {
                            e.stopPropagation();
                            addFriendRequest({
                              accessToken,
                              refreshToken,
                              id: x.profile_id,
                              callRefreshProfile: profileChecked,
                              dispatch,
                            });

                            var filter = listAdded.filter(
                              (e) => e !== x.profile_id
                            );
                            setListAdded(filter);
                            
                            currentId.current = x.profile_id;
                          },
                        }}
                      />
                    ),
                    onClick: () => {
                      navigate(`?id=${x.profile_id}`);
                    },
                    selected:
                      !isLoadingProfileDetail && profileChecked,
                    disabled: isLoadingProfileDetail
                      ? true
                      : profileChecked,
                  };
            }),
        leftBarColor: 'white',
      }}
    >
      {!checkQueryParam && checkId && (
        <UserProfile action={setListAdded} actionList={listAdded} />
      )}
    </TwoColumns>
  );
}
