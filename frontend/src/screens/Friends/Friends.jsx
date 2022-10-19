import {
  People,
  GroupAdd,
  SupervisedUserCircle,
  Cake,
} from '@mui/icons-material';
import { Grid } from '@mui/material';
import TwoColumns from '../../components/Layout/TwoColumns';
import MUI from '../../components/MUI';
import './Friends.css';

export default function Friends() {
  return (
    <TwoColumns
      leftBarConfig={{
        before: <h1 className="friend-left-bar-title">Friends</h1>,
        leftBarList: [
          {
            left: <People />,
            middle: 'Home',
            selected: true,
          },
          {
            left: <GroupAdd />,
            middle: 'Friend Requests',
            navigate: 'requests',
          },
          {
            left: <SupervisedUserCircle />,
            middle: 'All Friends',
            navigate: 'list',
          },
          {
            left: <Cake />,
            middle: 'Birthdays',
            navigate: 'birthdays',
          },
        ],
        leftBarColor: 'white',
      }}
    >
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
        {[...Array(15)].map((e, i) => (
          <Grid
            item
            xs
            style={{
              maxWidth: '250px',
              minWidth: '200px',
              padding: '6px',
              borderRadius: '8px',
            }}
          >
            <div
              style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 0 1px 1px var(--shadow-2)',
              }}
            >
              <div>
                <img
                  alt="avatar"
                  src="https://cf.shopee.vn/file/8c178f3e0f1f947afa378dd7f15068a5"
                  style={{
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                  }}
                />
              </div>
              <div
                style={{
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: '500',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  Duy DươngDuy DươngDuy DươngDuy DươngDuy Dương
                </span>
                <MUI.Button style={{ marginTop: '12px' }}>
                  Confirm
                </MUI.Button>
                <MUI.Button
                  color="secondary"
                  style={{ marginTop: '12px' }}
                >
                  Deny
                </MUI.Button>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </TwoColumns>
  );
}
