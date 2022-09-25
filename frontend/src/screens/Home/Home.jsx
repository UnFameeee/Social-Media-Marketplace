import React from 'react';
import {
  Coronavirus,
  People,
  Diversity2,
  Storefront,
  LiveTv,
  EmergencyRecording,
  Search,
  MoreHoriz,
  SearchOutlined,
} from '@mui/icons-material';
import AvatarWithText from '../../components/Avatar/AvatarWithText';
import CardPost from '../../components/Card/CardPost';
import LeftBar from '../../components/Layout/SideBar/LeftBar';
import RightBar from '../../components/Layout/SideBar/RightBar';
import {
  Box,
  Avatar,
  Paper,
  TextField,
  IconButton,
  InputAdornment,
} from '@mui/material';

function Home() {
  return (
    <div className="pt-[6rem] flex w-full">
      <LeftBar
        leftBarList={[
          { text: 'Covid- 19 infomation', iconName: <Coronavirus /> },
          { text: 'Friends', iconName: <People /> },
          { text: 'Groups', iconName: <Diversity2 /> },
          { text: 'Marketplace', iconName: <Storefront /> },
          { text: 'Watch', iconName: <LiveTv /> },
          { text: 'Covid- 19 infomation', iconName: <Coronavirus /> },
          { text: 'Friends', iconName: <People /> },
          { text: 'Groups', iconName: <Diversity2 /> },
          { text: 'Marketplace', iconName: <Storefront /> },
          { text: 'Watch', iconName: <LiveTv /> },
          { text: 'Covid- 19 infomation', iconName: <Coronavirus /> },
          { text: 'Friends', iconName: <People /> },
          { text: 'Groups', iconName: <Diversity2 /> },
          { text: 'Marketplace', iconName: <Storefront /> },
          { text: 'Watch', iconName: <LiveTv /> },
        ]}
      />
      <div className="middleMainContent px-[30%] pt-6 bg-greyf1 w-screen">
        <Paper sx={{ height: '15rem', marginBottom: '1.5rem' }}>
          <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Avatar />
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
                '& .MuiOutlinedInput-root': {
                  '& > fieldset': { border: 'none' },
                },
                '& .MuiInputBase-root': {
                  background: '#F0F2F5',
                  height: '4.4rem',
                  borderRadius: '5rem',
                },
              }}
            />
          </Box>          
        </Paper>
        <CardPost
          userName="duy duong"
          postTime="1 hour"
          url="https://source.unsplash.com/random/330×330"
          content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste reprehenderit laboriosam laudantium modi eum, nulla delectus fugiat distinctio magni quasi minus a iusto numquam saepe quis quia adipisci esse temporibus repellendus necessitatibus iure et animi. Magni eveniet doloribus quam ut esse vitae eum omnis vero nulla, harum rerum laborum, voluptatibus possimus? Cum, ea. Non et quisquam excepturi quod asperiores rem iusto"
          imgUrl="https://source.unsplash.com/random/310×310"
        />
        <CardPost
          userName="lmao duke"
          postTime="5 hour"
          url="https://source.unsplash.com/random/230×230"
          content="Lorem ipsum dolor lmao you r dead laboriosam laudantium modi eum, nulla delectus fugiat distinctio magni quasi minus a iusto numquam saepe quis quia adipisci esse temporibus repellendus necessitatibus iure et animi. Magni eveniet doloribus quam ut esse vitae eum omnis vero nulla, harum rerum laborum, voluptatibus possimus? Cum, ea. Non et quisquam excepturi quod asperiores rem iusto"
          imgUrl="https://source.unsplash.com/random/110×110"
        />
        <CardPost
          userName="Dejavu"
          postTime="8 hour"
          url="https://source.unsplash.com/random/120×120"
          content="Lorem ipsum dolor lmao you r dead laboriosam laudantium modi eum, nulla delectus fugiat distinctio magni quasi minus a iusto numquam saepe quis quia adipisci esse temporibus repellendus necessitatibus iure et animi. Magni eveniet doloribus quam ut esse vitae eum omnis vero nulla, harum rerum laborum, voluptatibus possimus? Cum, ea. Non et quisquam excepturi quod asperiores rem iusto"
          imgUrl="https://source.unsplash.com/random/175×175"
        />
      </div>
      <RightBar />
    </div>
  );
}

export default Home;
