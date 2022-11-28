import { useLayoutEffect, useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
  const reRenderLayout = useOutletContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // requests
  const [listConfirm, setListConfirm] = useState([]);
  const [listDeny, setListDeny] = useState([]);

  // suggestions
  const [listAdded, setListAdded] = useState([]);
  const [listRemoved, setListRemoved] = useState([]);

  const accessToken = useSelector(
    (state) => state.auth?.login?.currentUser?.access
  );
  const refreshToken = useSelector(
    (state) => state.auth?.login?.currentUser?.refresh
  );
  const friendRequests = useSelector(
    (state) => state.friends?.getRequests?.data?.data
  );
  const friendSuggestions = useSelector(
    (state) => state.friends?.getSuggestion?.data?.data
  );

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
      {friendRequests?.length > 0 ? (
        <div className="friend-home-grid">
          {friendRequests.map((item, index) => (
            <div key={index}>
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

                    setListDeny((old) => [...old, item.profile_id]);
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
      {friendSuggestions?.length > 0 ? (
        <div className="friend-home-grid">
          {friendSuggestions?.map((item, index) => {
            return Helper.checkValueExistInArray(
              listRemoved,
              item.profile_id
            ) ? (
              <></>
            ) : (
              <div key={index}>
                <FriendCard
                  profileDetails={item}
                  type="suggestions"
                  listAction={listAdded}
                  navigate={navigate}
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
  );
};

export default FriendHome;
