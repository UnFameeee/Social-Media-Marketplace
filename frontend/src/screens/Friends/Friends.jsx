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
      <Grid container>
        <Grid
          item
          xs
          style={{
            maxWidth: '250px',
            minWidth: '200px',
            backgroundColor: 'white',
            borderRadius: '8px',
          }}
        >
          <div>
            <div>
              <img
                alt="avatar"
                src="https://www.thetonyrobbinsfoundation.org/wp-content/uploads/2017/09/Cool-avatars-anonymous-avatar.jpg"
                style={{
                  minWidth: '240px',
                  minHeight: '240px',
                  borderTopLeftRadius: '8px',
                  borderTopRightRadius: '8px',
                }}
              />
            </div>
            <div style={{ padding: '12px' }}>
              <div>
                <span style={{ fontWeight: '500' }}>Duy Dương</span>
              </div>
              <div>
                <MUI.Button>Confirm</MUI.Button>
              </div>
              <div>
                <MUI.Button>Deny</MUI.Button>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </TwoColumns>
  );
}
