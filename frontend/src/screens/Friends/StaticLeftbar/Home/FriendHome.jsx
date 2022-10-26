import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import FriendCard from './FriendCard';

const FriendHome = () => {
  // #region re-render the layout
  const reRenderLayout = useOutletContext();
  useEffect(() => {
    reRenderLayout();
  }, []);
  // #endregion

  return (
    <>
      <h2
        style={{
          fontSize: '20px',
          fontWeight: '500',
          padding: '4px 0 0 24px',
        }}
      >
        Friend Requests
      </h2>
      <Grid container sx={{ padding: '2rem' }}>
        {[...Array(14)].map((item, index) => (
          <Grid
            key={index}
            item
            xs
            style={{
              maxWidth: '250px',
              minWidth: '200px',
              padding: '6px',
              borderRadius: '8px',
            }}
          >
            <FriendCard
              imageURL="https://cf.shopee.vn/file/8c178f3e0f1f947afa378dd7f15068a5"
              name="Dibu"
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default FriendHome;
