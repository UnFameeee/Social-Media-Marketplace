import { Grid } from '@mui/material';
import { useLayoutEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllFriendRequests,
  getFriendSuggestion,
} from '../../../../redux/apiRequest';
import FriendCard from './FriendCard';
import {
  acceptSaga,
  addFriendSaga,
  denySaga,
} from '../../../../redux/friend/friendSlice';
import '../index.css';

const FriendHome = () => {
  const reRenderLayout = useOutletContext();
  const dispatch = useDispatch();
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
      reRenderLayout(); //re-render the parent layout
      getAllFriendRequests(accessToken, refreshToken, dispatch);
      getFriendSuggestion(accessToken, refreshToken, dispatch);
    }
    return () => {
      onDestroy = true;
    };
  }, []);

  return (
    <>
      <h2 className="friend-home-title">Friend Requests</h2>
      {friendRequests?.length > 0 ? (
        <Grid container sx={{ padding: '2rem' }}>
          {friendRequests.map((item, index) => (
            <Grid key={index} item xs className="friend-home-grid">
              <FriendCard
                profileDetails={item}
                firstButtonConfig={{
                  onClick: () => {
                    dispatch(
                      acceptSaga({
                        accessToken,
                        refreshToken,
                        id: item.profile_id,
                        dispatch,
                      })
                    );
                  },
                }}
                secondButtonConfig={{
                  onClick: () => {
                    dispatch(
                      denySaga({
                        accessToken,
                        refreshToken,
                        id: item.profile_id,
                        dispatch,
                      })
                    );
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <h3 className="text-[8rem] text-center pt-[10rem]">
          You have no friend requests
        </h3>
      )}

      <h2 className="friend-home-title">People you may know</h2>
      {friendSuggestions?.length > 0 ? (
        <Grid container sx={{ padding: '2rem' }}>
          {friendSuggestions?.map((item, index) => (
            <Grid key={index} item xs className="friend-home-grid">
              <FriendCard
                type="suggestions"
                profileDetails={item}
                firstButtonConfig={{
                  name:
                    item.isSentFriendRequest != 'REQUEST'
                      ? 'Add Friend'
                      : 'Cancel',
                  onClick: () => {
                    dispatch(
                      addFriendSaga({
                        accessToken,
                        refreshToken,
                        id: item.profile_id,
                        dispatch,
                      })
                    );
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <h3 className="text-[8rem] text-center pt-[10rem]">
          No one here
        </h3>
      )}
    </>
  );
};

export default FriendHome;
