import { useState } from 'react';
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
  Paper,
  Grid,
  InputAdornment,
  IconButton,
  TextField,
  Button,
  Avatar,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import MUI from '../../MUI';

const useStyles = makeStyles()(() => ({
  root: {
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
  const [value, setValue] = useState('');
  const { classes } = useStyles();

  function handleSearch() {}

  return (
    // <div className="flex items-center px-5 py-1 bg-white fixed w-screen drop-shadow-md z-50">
    //   <div className="rightNav flex items-center w-[25%] gap-1 pt-3">
    //     <Facebook className=" text-blue8f3 Icon " style={{ fontSize: 40 }} />
    //     <div className="">
    //       <form action="">
    //         <div className="flex relative items-center">
    //           <Search className=" absolute left-2 text-slate-500 pointer-events-none rotate-90 " style={{ fontSize: 25 }}/>
    //           <input
    //             type="text"
    //             className="pl-[3.3rem] py-[0.75rem] rounded-xl outline-none bg-greyf1"
    //           />
    //         </div>
    //       </form>
    //     </div>
    //   </div>

    //   <div className="centerNav flex-1">
    //     <ul className="listNav flex justify-center gap-0">
    //       <li className="navBarLi group">
    //         <Home className="navBarIcon" style={{ fontSize: 40 }} />
    //         <hr className="navBarIconHr"/>
    //       </li>
    //       <li className="navBarLi group  ">
    //         <Storefront className="navBarIcon" style={{ fontSize: 40 }} />
    //         <hr className="navBarIconHr"/>
    //       </li>
    //       <li className="navBarLi group ">
    //         <LiveTv className="navBarIcon" style={{ fontSize: 40 }} />
    //         <hr className="navBarIconHr"/>
    //       </li>
    //       <li className="navBarLi group ">
    //         <Groups className="navBarIcon" style={{ fontSize: 40 }} />
    //         <hr className="navBarIconHr"/>
    //       </li>
    //       <li className="navBarLi group ">
    //         <SportsEsports className="navBarIcon" style={{ fontSize: 40 }} />
    //         <hr className="navBarIconHr"/>
    //       </li>
    //     </ul>

    //   </div>
    //   <div className="w-[25%] flex justify-end gap-3 items-center mr-5">
    //     <MarkEmailUnread className="Icon" style={{ fontSize: 25 }} />
    //     <Notifications className="Icon" style={{ fontSize: 25 }} />
    //     <div className="flex gap-2 items-center bg-greyf1 rounded-xl p-1">
    //       <img
    //         src="https://source.unsplash.com/random/300×300"
    //         className="w-[30px] h-[30px] rounded-[50%] border-2 border-blue-300"
    //         alt=""
    //       />
    //       <span>Hexa Pentania</span>
    //       <KeyboardArrowDown className="Icon" />
    //     </div>
    //   </div>
    // </div>

    <Paper
      sx={{
        boxShadow: 'none',
        position: 'fixed',
        width: '100vw',
        height: 'var(--navbar-height)',
        padding: '0 1rem',
        zIndex: 2,
      }}
    >
      <Grid
        container
        sx={{
          margin: 0,
          height: '100%',
          alignItems: 'center',
          paddingRight: '14px',
        }}
        className={classes.root}
      >
        <Grid item xs sx={{ display: 'flex' }}>
          <IconButton sx={{ padding: 0 }}>
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
            sx={{ marginRight: '0.8rem' }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
