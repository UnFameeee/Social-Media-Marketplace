import {
  IoHomeOutline,
  IoHomeSharp,
  IoPeopleOutline,
  IoPeople,
  IoPeopleCircleOutline,
  IoPeopleCircle,
  IoPlayCircleOutline,
  IoPlayCircle,
  IoBagOutline,
  IoBag,
  IoChatbubbleEllipses,
  IoNotifications,
} from 'react-icons/io5';
import { CgMenuGridO } from "react-icons/cg";

export const middleNavIcons = [
  {
    icon: [<IoHomeOutline />, <IoHomeSharp />],
    tooltip: 'Home',
  },
  {
    icon: [
      <IoPeopleOutline />,
      <IoPeople />,
    ],
    tooltip: 'Friends',
  },
  {
    icon: [<IoBagOutline />, <IoBag />],
    tooltip: 'Marketplace',
    navigate: 'marketplace/shopping'
  },
  // {
  //   icon: [
  //     <IoPeopleCircleOutline />,
  //     <IoPeopleCircle />,
  //   ],
  //   tooltip: 'Groups',
  // },
  // {
  //   icon: [
  //     <IoPlayCircleOutline />,
  //     <IoPlayCircle />,
  //   ],
  //   tooltip: 'Watch',
  // },
];

export const rightNavIcons = [
  {
    icon: <CgMenuGridO />,
    tooltip: 'Menu',
  },
  {
    icon: <IoChatbubbleEllipses style={{ fontSize: '2.4rem' }} />,
    tooltip: 'Chat',
    navigate: '/messenger'
  },
  {
    icon: <IoNotifications style={{ fontSize: '2.4rem' }} />,
    tooltip: 'Notifications',
  },
  {
    avatar: true,
    tooltip: 'Avatar'
  },
];
