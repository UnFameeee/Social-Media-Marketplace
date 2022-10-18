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
    icon: [<IoHomeOutline />, <IoHomeSharp />],
    tooltip: 'Home',
  },
  {
    icon: [
      <IoPeopleOutline style={{ fontSize: '3.2rem' }} />,
      <IoPeople style={{ fontSize: '3.2rem' }} />,
    ],
    tooltip: 'Friends',
  },
  {
    icon: [<IoBagOutline />, <IoBag />],
    tooltip: 'Marketplace',
  },
  {
    icon: [
      <IoPeopleCircleOutline style={{ fontSize: '3.4rem' }} />,
      <IoPeopleCircle style={{ fontSize: '3.4rem' }} />,
    ],
    tooltip: 'Groups',
  },
  {
    icon: [
      <IoPlayCircleOutline style={{ fontSize: '3.4rem' }} />,
      <IoPlayCircle style={{ fontSize: '3.4rem' }} />,
    ],
    tooltip: 'Watch',
  },
];

export const rightNavIcons = [
  {
    icon: <Menu />,
    tooltip: 'Menu',
  },
  {
    icon: <Chat />,
    tooltip: 'Chat',
  },
  {
    icon: <Notifications />,
    tooltip: 'Notifications',
  },
  {
    avatar: true,
  },
];
