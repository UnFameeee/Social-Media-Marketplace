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
        <Grid
          item
          xs
          style={{
            maxWidth: '250px',
            minWidth: '200px',
            padding: '4px',
            borderRadius: '8px',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
            }}
          >
            <div>
              <img
                alt="avatar"
                src="https://www.thetonyrobbinsfoundation.org/wp-content/uploads/2017/09/Cool-avatars-anonymous-avatar.jpg"
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
        <Grid
          item
          xs
          style={{
            maxWidth: '250px',
            minWidth: '200px',
            padding: '4px',
            borderRadius: '8px',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
            }}
          >
            <div>
              <img
                alt="avatar"
                src="https://www.thetonyrobbinsfoundation.org/wp-content/uploads/2017/09/Cool-avatars-anonymous-avatar.jpg"
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
        <Grid
          item
          xs
          style={{
            maxWidth: '250px',
            minWidth: '200px',
            padding: '4px',
            borderRadius: '8px',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
            }}
          >
            <div>
              <img
                alt="avatar"
                src="https://www.thetonyrobbinsfoundation.org/wp-content/uploads/2017/09/Cool-avatars-anonymous-avatar.jpg"
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
        <Grid
          item
          xs
          style={{
            maxWidth: '250px',
            minWidth: '200px',
            padding: '4px',
            borderRadius: '8px',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
            }}
          >
            <div>
              <img
                alt="avatar"
                src="https://www.thetonyrobbinsfoundation.org/wp-content/uploads/2017/09/Cool-avatars-anonymous-avatar.jpg"
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
        <Grid
          item
          xs
          style={{
            maxWidth: '250px',
            minWidth: '200px',
            padding: '4px',
            borderRadius: '8px',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
            }}
          >
            <div>
              <img
                alt="avatar"
                src="https://www.thetonyrobbinsfoundation.org/wp-content/uploads/2017/09/Cool-avatars-anonymous-avatar.jpg"
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
        <Grid
          item
          xs
          style={{
            maxWidth: '250px',
            minWidth: '200px',
            padding: '4px',
            borderRadius: '8px',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
            }}
          >
            <div>
              <img
                alt="avatar"
                src="https://www.thetonyrobbinsfoundation.org/wp-content/uploads/2017/09/Cool-avatars-anonymous-avatar.jpg"
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
        <Grid
          item
          xs
          style={{
            maxWidth: '250px',
            minWidth: '200px',
            padding: '4px',
            borderRadius: '8px',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
            }}
          >
            <div>
              <img
                alt="avatar"
                src="https://www.thetonyrobbinsfoundation.org/wp-content/uploads/2017/09/Cool-avatars-anonymous-avatar.jpg"
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
      </Grid>
    </TwoColumns>
  );
}
