import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Chat,
  FacebookOutlined,
  HomeOutlined,
  LiveTvOutlined,
  Notifications,
  StorefrontOutlined,
  Menu,
  GroupsOutlined,
  Logout,
} from '@mui/icons-material';
import {
  Paper,
  Grid,
  IconButton,
  Avatar,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import MUI from '../../MUI';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../redux/apiRequest';
import { revertAll } from '../../../redux/resetStore';

const useStyles = makeStyles()(() => ({
  root: {
    '& .MuiAvatar-root': {
      cursor: 'pointer',
      color: '#050505',
      backgroundColor: '#E4E6EB',
      marginRight: '0.8rem',
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
      padding: '1rem 0.8rem',
      '&:hover': { backgroundColor: '#F0F2F5' },
    },
  },
}));

const middleNavIcons = [
  {
    id: "navHome",
    icon: <HomeOutlined />,
    tooltip: "Home"
  },
  {
    id: "navFriends",
    icon: <GroupsOutlined />,
    tooltip: "Friends"
  },
  {
    id: "navWatch",
    icon: <LiveTvOutlined />,
    tooltip: "Watch"
  },
  {
    id: "navMarketplace",
    icon: <StorefrontOutlined />,
    tooltip: "Marketplace"
  },
  {
    id: "navf",
    icon: <HomeOutlined />,
    tooltip: "f"
  },
];

export default function NavBar() {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const { classes } = useStyles();
  const dispatch = useDispatch()
  console.log('rerender')
  const handleLogout= () =>{
    // logOut(dispatch) 
    dispatch(revertAll())
  }
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
        zIndex: 10,
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
            recentSearchs={[
              {
                url: 'https://source.unsplash.com/random/300×300',
                name: 'Thạch Dương Duy',
              },
              {
                url: 'https://source.unsplash.com/random/300×300',
                name: 'Nguyễn Hoàng Vũ',
              },
              {
                url: 'https://source.unsplash.com/random/300×300',
                name: 'Nguyễn Phạm Quốc Thắng',
              },
            ]}
          />
        </Grid>

        <Grid
          item
          xs={5}
          sx={{ display: 'flex', justifyContent: 'space-evenly' }}
          className={classes.grid}
        >
          {middleNavIcons.map(item => (
            <MUI.ButtonWithIcon key={item.id} id={item.id} tooltip={item.tooltip}>
              {item.icon}
            </MUI.ButtonWithIcon>
          ))}
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
          <Avatar onClick={handleLogout} src="https://source.unsplash.com/random/300×300" />
        </Grid>
      </Grid>
    </Paper>
  );
}
