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
} from '@mui/icons-material';
import RoundedAvatar from '../../components/Avatar/RoundedAvatar';
import CardPost from '../../components/Card/CardPost';
import SideBarFunction from '../../components/SideBarFunction/SideBarFunction';
import RightSideBar from '../../components/RightSideBar/RightSideBar';
import LeftBar from '../../components/Layout/SideBar/LeftBar';
function Home() {
  return (
    <div className="pt-[5.5rem] flex w-full">
      {/* <div className="leftSideBar w-[18%] pb-[5rem] h-screen bg-white fixed overflow-scroll">
        <SideBarFunction
          listFeature={listFeature={[
            { text: "Covid- 19 infomation", iconName: <Coronavirus /> },
            { text: "Friends", iconName: <People /> },
            { text: "Groups", iconName: <Diversity2 /> },
            { text: "Marketplace", iconName: <Storefront /> },
            { text: "Watch", iconName: <LiveTv /> },
          ]}}
        />
      </div> */}
      <LeftBar
        leftBarList={[
          { text: 'Covid- 19 infomation', icon: <Coronavirus /> },
          { text: 'Friends', icon: <People /> },
          { text: 'Groups', icon: <Diversity2 /> },
          { text: 'Marketplace', icon: <Storefront /> },
          { text: 'Watch', icon: <LiveTv /> },
        ]}
      />
      <div className="middleMainContent px-[30%] pt-6 bg-greyf1 w-screen">
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
      <div className="rightSideBar fixed right-0 w-[18%] h-screen overflow-scroll  px-[1rem] pt-[2.5rem] pb-[5rem]">
        <RightSideBar />
      </div>
    </div>
  );
}

export default Home;
