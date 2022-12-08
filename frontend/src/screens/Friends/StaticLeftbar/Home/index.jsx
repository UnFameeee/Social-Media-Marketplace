import { useLayoutEffect, useMemo, useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Skeleton, CircularProgress } from '@mui/material';
import FriendCard from './FriendCard';
import { Helper } from '../../../../utils/Helper';
import {
  getAllRequest,
  getAllSuggestions,
} from '../../../../redux/friend/friendAPI';
import {
  acceptFriendRequest,
  addFriendRequest,
  denyFriendRequest,
} from '../../../../redux/friend/friendSaga';
import '../index.css';

const FriendHome = () => {
  // const reRenderLayout = useOutletContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // #region variables from redux
  const accessToken = useSelector(
    (state) => state.auth?.login?.currentUser?.access
  );
  const refreshToken = useSelector(
    (state) => state.auth?.login?.currentUser?.refresh
  );
  const friendRequests = useSelector(
    (state) => state.friends?.getRequests?.data?.data,
    shallowEqual
  );
  const friendSuggestions = useSelector(
    (state) => state.friends?.getSuggestion?.data?.data,
    shallowEqual
  );
  const isFetchingRequest = useSelector(
    (state) => state.friends?.getRequests?.isFetching
  );
  const isFetchingSuggestion = useSelector(
    (state) => state.friends?.getSuggestion?.isFetching
  );
  const isFetchingAddFriend = useSelector(
    (state) => state.friends?.addFriend?.isFetching,
    shallowEqual
  );
  // #endregion

  // #region suggestion section
  const [listAdded, setListAdded] = useState([]);
  const [listRemoved, setListRemoved] = useState([]);

  var suggestionList = useMemo(() => {
    return friendSuggestions;
  }, [friendSuggestions]);

  var isLoadingSuggestion = useMemo(() => {
    var result = false;
    if (isFetchingSuggestion) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }, [isFetchingSuggestion]);

  var isLoadingAddFriend = useMemo(() => {
    var result = false;
    if (isFetchingAddFriend) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }, [isFetchingAddFriend]);
  // #endregion

  // #region request section
  const [listConfirm, setListConfirm] = useState([]);
  const [listDeny, setListDeny] = useState([]);

  var requestList = useMemo(() => {
    return friendRequests;
  }, [friendRequests]);

  var isLoadingRequest = useMemo(() => {
    var result = false;
    if (isFetchingRequest) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }, [isFetchingRequest]);
  // #endregion

  useLayoutEffect(() => {
    let onDestroy = false;
    if (!onDestroy) {
      // reRenderLayout(); //re-render the parent layout

      getAllRequest(accessToken, refreshToken, dispatch);

      getAllSuggestions(accessToken, refreshToken, dispatch);
    }
    return () => {
      onDestroy = true;
    };
  }, []);

  return (
    <>
      <div className="friend-home-title">
        <h2 className="type">Friend Requests</h2>

        <button
          id="gridSideButton"
          onClick={() => {
            navigate('requests');
          }}
        >
          See All
        </button>
      </div>

      {isLoadingRequest ? (
        <div className="friend-home-grid">
          {[...Array(6)].map((item, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              width={240}
              height={350}
            />
          ))}
        </div>
      ) : (
        <>
          {requestList?.length > 0 ? (
            <div className="friend-home-grid">
              {requestList.map((item) => (
                <div key={item.profile_id}>
                  <FriendCard
                    profileDetails={item}
                    listAction={[listConfirm, listDeny]}
                    navigate={navigate}
                    firstButtonConfig={{
                      onClick: () => {
                        acceptFriendRequest({
                          accessToken,
                          refreshToken,
                          id: item.profile_id,
                          dispatch,
                        });

                        setListConfirm((old) => [
                          ...old,
                          item.profile_id,
                        ]);
                      },
                    }}
                    secondButtonConfig={{
                      onClick: () => {
                        denyFriendRequest({
                          accessToken,
                          refreshToken,
                          id: item.profile_id,
                          dispatch,
                        });

                        setListDeny((old) => [
                          ...old,
                          item.profile_id,
                        ]);
                      },
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <h3 className="text-[8rem] text-center pt-[10rem]">
              You have no friend requests
            </h3>
          )}
        </>
      )}

      <div className="friend-home-title">
        <h2 className="type">People you may know</h2>

        <button
          id="gridSideButton"
          onClick={() => {
            navigate('suggestions');
          }}
        >
          See All
        </button>
      </div>

      {isLoadingSuggestion ? (
        <div className="friend-home-grid">
          {[...Array(6)].map((item, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              width={240}
              height={350}
            />
          ))}
        </div>
      ) : (
        <>
          {suggestionList?.length > 0 ? (
            <div className="friend-home-grid">
              {suggestionList?.map((item) => {
                return Helper.checkValueExistInArray(
                  listRemoved,
                  item.profile_id
                ) ? null : (
                  <div key={item.profile_id}>
                    <FriendCard
                      profileDetails={item}
                      type="suggestions"
                      listAction={listAdded}
                      navigate={navigate}
                      isLoadingAddFriend={isLoadingAddFriend}
                      firstButtonConfig={{
                        name: 'Add Friend',
                        onClick: () => {
                          addFriendRequest({
                            accessToken,
                            refreshToken,
                            id: item.profile_id,
                            dispatch,
                          });

                          setListAdded((old) => [
                            ...old,
                            item.profile_id,
                          ]);
                        },
                      }}
                      secondButtonConfig={{
                        name: 'Remove',
                        onClick: () => {
                          setListRemoved((old) => [
                            ...old,
                            item.profile_id,
                          ]);
                        },
                      }}
                      hiddenButtonConfig={{
                        name: 'Cancel',
                        onClick: () => {
                          addFriendRequest({
                            accessToken,
                            refreshToken,
                            id: item.profile_id,
                            dispatch,
                          });

                          var filter = listAdded.filter(
                            (e) => e !== item.profile_id
                          );
                          setListAdded(filter);
                        },
                      }}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <h3 className="text-[8rem] text-center pt-[10rem]">
              No one here
            </h3>
          )}
        </>
      )}
    </>
  );
};

export default FriendHome;
