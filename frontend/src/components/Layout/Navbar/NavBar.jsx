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
import { logOut } from '../../../redux/apiRequest';
import { localStorageService } from '../../../services/localStorageService';
import '../Layout.css';

export default function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [value, setValue] = useState('');
  const [rightGroup, setRightGroup] = useState('');
  const [avatarMenu, setAvatarMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const accessToken = useSelector(
    (state) => state.auth?.login?.currentUser?.access
  );
  const refreshToken = useSelector(
    (state) => state.auth?.login?.currentUser?.refresh
  );
  const userData = useSelector(
    (state) => state.auth?.user?.userData?.profile
  );
  const profileData = useSelector(
    (state) => state.profile?.profileDetails?.data
  );

  var recentSearch = localStorageService.getItem('recentSearch');

  const handleLogOut = () => {
    logOut(dispatch, accessToken, refreshToken);
    dispatch(revertAll());
  };

  function handleSearch() {
    if (value) {
      navigate(`/search?value=${value}`);
      document.getElementById('searchBar').blur();
    }
    setOpenSearch(false);
  }

  return (
    <Paper className="nav-bar drop-shadow-md">
      <Grid container className="nav-bar-wrapper">
        <Grid item xs sx={{ display: 'flex' }}>
          <MUI.BetterIconButton
            sx={{ padding: 0 }}
            onClick={() => navigate('/')}
          >
            <FacebookOutlined
              sx={{
                fontSize: '4.4rem',
                color: 'var(--primary-color)',
              }}
            />
          </MUI.BetterIconButton>

          <MUI.SearchBar
            placeHolder="Search FB"
            getData={(input) => setValue(input)}
            handleSearch={handleSearch}
            toggleProps={[openSearch, setOpenSearch]}
            menuConfig={{
              classNameConfig: {
                menuClass: 'navbar-search',
                middleClass: 'navbar-search',
              },
              before: (
                <Typography sx={{ marginLeft: '1.6rem' }}>
                  Recent Searchs
                </Typography>
              ),
              list: recentSearch?.map((x) => {
                return {
                  left: {
                    url: x.avatar,
                    name: x.profile_name,
                  },
                  middle: x.profile_name,
                  right: (
                    <MUI.BetterIconButton
                      className="right-menu"
                      onClick={(e) => {
                        e.stopPropagation();
                        localStorageService.deleteFromArray("recentSearch", x);
                        navigate('#')
                      }}
                    >
                      <Close sx={{ fontSize: '1.6rem' }} />
                    </MUI.BetterIconButton>
                  ),
                  onClick: () => {
                    navigate(`/profile?id=${x.profile_id}`);
                  },
                };
              }),
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
                  backgroundColor: 'white',
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
                  <div onClick={() => setAvatarMenu(!avatarMenu)}>
                    <Avatar
                      className="relative"
                      style={{
                        fontSize: '1.5rem',
                      }}
                      alt={userData.profile_name}
                      src={
                        userData?.profile_id ==
                        profileData?.profile_id
                          ? profileData?.avatar
                          : userData?.avatar
                      }
                    >
                      {userData?.profile_name?.at(0)}
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
