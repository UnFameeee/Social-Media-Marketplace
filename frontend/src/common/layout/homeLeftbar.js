import {
  IoPeople,
  IoPeopleCircle,
  IoPlayCircle,
  IoBag,
} from 'react-icons/io5';

export const homeLeftbar = [
  {
    left: <IoPeople />,
    middle: 'Friends',
    navigate: '/friends'
  },
  {
    left: <IoBag />,
    middle: 'Marketplace',
    navigate: '/marketplace'
  },
  // {
  //   left: <IoPeopleCircle />,
  //   middle: 'Groups',
  //   navigate: '/groups'
  // },
  // {
  //   left: <IoPlayCircle />,
  //   middle: 'Watch',
  //   navigate: '/watch'
  // },
];
