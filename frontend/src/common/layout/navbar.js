import { Chat, Notifications, Menu } from '@mui/icons-material';
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
} from 'react-icons/io5';

export const middleNavIcons = [
  {
    id: 'navHome',
    icon: [<IoHomeOutline />, <IoHomeSharp />],
    tooltip: 'Home',
  },
  {
    id: 'navFriends',
    icon: [
      <IoPeopleOutline style={{ fontSize: '3.2rem' }} />,
      <IoPeople style={{ fontSize: '3.2rem' }} />,
    ],
    tooltip: 'Friends',
  },
  {
    id: 'navMarketplace',
    icon: [<IoBagOutline />, <IoBag />],
    tooltip: 'Marketplace',
  },
  {
    id: 'navGroups',
    icon: [
      <IoPeopleCircleOutline style={{ fontSize: '3.4rem' }} />,
      <IoPeopleCircle style={{ fontSize: '3.4rem' }} />,
    ],
    tooltip: 'Groups',
  },
  {
    id: 'navWatch',
    icon: [
      <IoPlayCircleOutline style={{ fontSize: '3.4rem' }} />,
      <IoPlayCircle style={{ fontSize: '3.4rem' }} />,
    ],
    tooltip: 'Watch',
  },
];

export const rightNavIcons = [
  {
    id: 'navMenu',
    icon: <Menu />,
    tooltip: 'Menu',
  },
  {
    id: 'navChat',
    icon: <Chat />,
    tooltip: 'Chat',
  },
  {
    id: 'navNotifications',
    icon: <Notifications />,
    tooltip: 'Notifications',
  },
  {
    avatar: true,
  },
];
