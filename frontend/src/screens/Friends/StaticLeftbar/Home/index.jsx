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
          fontSize: '2rem',
          lineHeight: '2rem',
          fontWeight: '500',
          padding: '2.4rem 0 0 2.4rem',
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
              maxWidth: '25rem',
              minWidth: '20rem',
              padding: '0.6rem',
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
