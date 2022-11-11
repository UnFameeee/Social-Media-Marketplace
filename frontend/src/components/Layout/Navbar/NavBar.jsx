import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FacebookOutlined, Close } from '@mui/icons-material';
import {
  Paper,
  Grid,
  IconButton,
  Avatar,
  Typography,
  ClickAwayListener,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { IoLogOut } from 'react-icons/io5';
import MUI from '../../MUI';
import { useDispatch, useSelector } from 'react-redux';
import {
  middleNavIcons,
  rightNavIcons,
} from '../../../common/layoutConfigs/navbar';
import { revertAll } from '../../../redux/resetStore';
import { Helper } from '../../../utils/Helper';
import '../Layout.css';
import { logOut } from '../../../redux/apiRequest';

export default function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [avatarMenu, setAvatarMenu] = useState(false);
  const [value, setValue] = useState('');
  const [rightGroup, setRightGroup] = useState('');
  const userData = useSelector((state) => state.auth.user.userData);
  const profileData = useSelector(
    (state) => state.profile?.profileDetails?.data
  );
  const auth = useSelector((state) => state.auth.login);

  function handleSearch() {}
  const handleLogOut = () => {
    logOut(
      dispatch,
      auth.currentUser.access,
      auth.currentUser.refresh
    );
    dispatch(revertAll());
  };

  return (
    <Paper className="nav-bar drop-shadow-md">
      <Grid container className="nav-bar-wrapper">
        <Grid item xs sx={{ display: 'flex' }}>
          <IconButton
            sx={{ padding: 0 }}
            onClick={() => navigate('/')}
          >
            <FacebookOutlined
              sx={{
                fontSize: '4.4rem',
                color: 'var(--primary-color)',
              }}
            />
          </IconButton>

          <MUI.SearchBar
            placeHolder="Search FB"
            getData={(input) => setValue(input)}
            handleSearch={handleSearch}
            menuConfig={{
              classNameConfig: {
                menuClass: 'navbar-search',
                middleClass: 'navbar-search',
              },
              list: [
                {
                  left: {
                    url: 'https://source.unsplash.com/random/300×300',
                    name: 'Duy',
                  },
                  middle: 'Thạch Dương Duy',
                },
                {
                  left: {
                    url: 'https://source.unsplash.com/random/300×300',
                    name: 'Vũ',
                  },
                  middle: 'Nguyễn Hoàng Vũ',
                },
                {
                  left: {
                    url: 'https://source.unsplash.com/random/300×300',
                    name: 'Thắng',
                  },
                  middle: 'Nguyễn Phạm Quốc Thắng',
                },
              ],
              before: (
                <Typography sx={{ marginLeft: '1.6rem' }}>
                  Recent Searchs
                </Typography>
              ),
              right: (
                <IconButton className="right-menu">
                  <Close sx={{ fontSize: '1.6rem' }} />
                </IconButton>
              ),
            }}
          />
        </Grid>

        <Grid
          item
          xs={5}
          sx={{ display: 'flex', justifyContent: 'space-evenly' }}
        >
          {middleNavIcons.map((item, index) => (
            <MUI.ButtonWithIcon
              className="w-[22rem]"
              sx={{
                padding: '1rem 0.8rem',
              }}
              key={index}
              tooltip={item.tooltip}
              style={
                Helper.checkURL(item.tooltip?.toLowerCase(), {
                  url: 'home',
                  path: '',
                })
                  ? {
                      marginBottom: '-0.4rem',
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                      color: 'var(--primary-color)',
                      borderBottom:
                        '0.4rem solid var(--primary-color)',
                    }
                  : null
              }
              onClick={() => {
                if (item.tooltip) {
                  if (item.tooltip === 'Home') navigate('/');
                  else navigate(`/${item.tooltip?.toLowerCase()}`);
                }
              }}
              disabled={Helper.checkURL(item.tooltip?.toLowerCase(), {
                url: 'home',
                path: '',
              })}
            >
              {Helper.checkURL(item.tooltip?.toLowerCase(), {
                url: 'home',
                path: '',
              })
                ? item.icon[1]
                : item.icon[0]}
            </MUI.ButtonWithIcon>
          ))}
        </Grid>

        <Grid
          item
          xs
          sx={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          <ToggleButtonGroup
            value={rightGroup}
            exclusive
            onChange={(e, x) => {
              e.preventDefault();
              setRightGroup(x);
            }}
            aria-label="right-button"
          >
            {rightNavIcons.map((item, index) => (
              <ToggleButton
                key={index}
                style={{
                  position: 'relative',
                  border: 0,
                  padding: '4px',
                }}
                value={item.tooltip}
                sx={{ textTransform: 'none' }}
                onClick={() => {
                  if (item.navigate) {
                    navigate(item.navigate);
                  }
                }}
              >
                {item.icon ? (
                  <MUI.BetterIconButton
                    hasBackground
                    tooltip={item.tooltip}
                  >
                    {item.icon}
                  </MUI.BetterIconButton>
                ) : (
                  <div>
                    <Avatar
                      onClick={() => setAvatarMenu(!avatarMenu)}
                      className="relative"
                      style={{
                        fontSize: '1.5rem',
                      }}
                      alt={userData.profile.profile_name}
                      src={
                        userData.profile?.profile_id == profileData?.profile_id
                          ? profileData?.avatar
                          : userData.profile?.avatar
                      }
                    >
                      {userData.profile.profile_name?.at(0)}
                    </Avatar>

                    {avatarMenu && (
                      <MUI.Menu
                        sx={{ right: '2px', minWidth: '20rem' }}
                        list={[
                          {
                            onClick: handleLogOut,
                            left: {
                              icon: (
                                <IoLogOut
                                  style={{
                                    fontSize: '2.4rem',
                                    color: 'black',
                                  }}
                                />
                              ),
                              hasBackground: true,
                            },
                            middle: 'Log Out',
                          },
                        ]}
                      />
                    )}
                  </div>
                )}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Grid>
      </Grid>
    </Paper>
  );
}
