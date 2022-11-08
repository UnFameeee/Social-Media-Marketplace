import { Grid } from '@mui/material';
import { useLayoutEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFriendRequests } from '../../../../redux/apiRequest';
import FriendCard from './FriendCard';
import {
  acceptSaga,
  denySaga,
} from '../../../../redux/friend/friendSlice';
import '../index.css';

const FriendHome = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser.access
  );
  const refreshToken = useSelector(
    (state) => state.auth.login.currentUser.refresh
  );
  const friendRequests = useSelector(
    (state) => state.friends.getRequests?.data?.data
  );

  const reRenderLayout = useOutletContext();

  useLayoutEffect(() => {
    let onDestroy = false;
    if (!onDestroy) {
      reRenderLayout(); //re-render the parent layout
      getAllFriendRequests(accessToken, refreshToken, dispatch);
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
                    let id = item.profile_id;
                    dispatch(
                      acceptSaga({
                        accessToken,
                        refreshToken,
                        id,
                        dispatch,
                      })
                    );
                  },
                }}
                secondButtonConfig={{
                  onClick: () => {
                    let id = item.profile_id;
                    dispatch(
                      denySaga({
                        accessToken,
                        refreshToken,
                        id,
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
    </>
  );
};

export default FriendHome;
