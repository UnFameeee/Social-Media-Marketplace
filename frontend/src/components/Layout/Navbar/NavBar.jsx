import {
  Chat,
  FacebookOutlined,
  HomeOutlined,
  LiveTvOutlined,
  Notifications,
  SearchOutlined,
  StorefrontOutlined,
  Menu,
  GroupsOutlined,
} from '@mui/icons-material';
import {
  Box,
  Grid,
  InputAdornment,
  IconButton,
  TextField,
  Button,
  Avatar,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(() => ({
  root: {
    '& .MuiIconButton-root': {
      padding: 0,
    },
    '& .MuiAvatar-root': {
      cursor: 'pointer',
      color: '#050505',
      backgroundColor: '#E4E6EB',
      marginLeft: '8px',
      '&:hover': { backgroundColor: '#bdbdbd' },
    },
    '& .MuiOutlinedInput-root': {
      '& > fieldset': { border: 'none' },
    },
    '& .MuiInputBase-root': {
      background: '#F0F2F5',
      height: '4.4rem',
      borderRadius: '5rem',
    },
  },
  grid: {
    '& .MuiSvgIcon-root': {
      fontSize: '3rem',
    },
    '& .MuiButtonBase-root': {
      width: '14rem',
      color: '#65676B',
      padding: '10px 8px',
      '&:hover': { backgroundColor: '#F0F2F5' },
    },
  },
}));
export default function NavBar() {
  const { classes } = useStyles();

  return (
    <Box
      sx={{
        bgcolor: 'white',
        position: 'fixed',
        width: '100vw',
        height: '6rem',
        padding: '0 1rem',
        zIndex: '1',
      }}
    >
      <Grid
        container
        sx={{
          margin: 0,
          height: '100%',
          alignItems: 'center',
          // paddingRight: '20px',
        }}
        className={classes.root}
      >
        <Grid item xs>
          <IconButton
            sx={{
              '&:hover': { backgroundColor: 'none' },
            }}
          >
            <FacebookOutlined
              sx={{
                fontSize: '4.4rem',
                color: 'var(--primary-color)',
              }}
            />
          </IconButton>

          <TextField
            placeholder="Search Facebook"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <SearchOutlined sx={{ fontSize: '2.2rem' }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              marginLeft: '1.2rem',
            }}
          />
        </Grid>

        <Grid
          item
          xs={5}
          sx={{ display: 'flex', justifyContent: 'space-evenly' }}
          className={classes.grid}
        >
          <Button>
            <HomeOutlined />
          </Button>
          <Button>
            <GroupsOutlined />
          </Button>
          <Button>
            <LiveTvOutlined />
          </Button>
          <Button>
            <StorefrontOutlined />
          </Button>
          <Button>
            <HomeOutlined />
          </Button>
        </Grid>

        <Grid
          item
          xs
          sx={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          <Avatar>
            <Menu sx={{ fontSize: '2.4rem' }} />
          </Avatar>
          <Avatar>
            <Chat sx={{ fontSize: '2.4rem' }} />
          </Avatar>
          <Avatar>
            <Notifications sx={{ fontSize: '2.4rem' }} />
          </Avatar>
          <Avatar
            src="https://i.pinimg.com/originals/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
            sx={{ marginRight: '2rem' }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
