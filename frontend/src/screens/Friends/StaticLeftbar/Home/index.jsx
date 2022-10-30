import { Grid } from '@mui/material';
import { useLayoutEffect, useState, } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFriendRequests } from '../../../../redux/apiRequest';
import FriendCard from './FriendCard';
import '../index.css';

const FriendHome = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser.access
  );
  const friendRequests = useSelector(
    (state) => state.friends.getFriendRequests?.data?.data
  );

  const reRenderLayout = useOutletContext();
  const [reRender, setReRender] = useState(false);

  useLayoutEffect(() => {
    let onDestroy = false;
    if (!onDestroy) {
      reRenderLayout(); //re-render the parent layout
      getAllFriendRequests(accessToken, dispatch);
    }
    return () => {
      onDestroy = true;
    };
  }, [reRender]);
  
  return (
    <>
      <h2 className="friend-home-title">Friend Requests</h2>
      {friendRequests?.length > 0 ? (
        <Grid container sx={{ padding: '2rem' }}>
          {friendRequests.map((item, index) => (
            <Grid key={index} item xs className="friend-home-grid">
              <FriendCard
                id={item.profile_id}
                imageURL={item.picture}
                name={item.profile_name}
                reRender={setReRender}
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
