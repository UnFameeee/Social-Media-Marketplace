import {
  People,
  GroupAdd,
  Groups,
  Cake,
  PersonSearch,
  KeyboardArrowRight,
  PersonAdd,
} from '@mui/icons-material';

export const staticLeftbar = [
  {
    title: 'Friends',
    left: {
      iconButton: true,
      icon: <People />,
    },
    middle: 'Home',
    navigate: '/friends',
  },
  {
    left: {
      iconButton: true,
      icon: <GroupAdd />,
    },
    middle: 'Friend Requests',
    right: <KeyboardArrowRight />,
    navigate: 'requests',
  },
  {
    left: {
      iconButton: true,
      icon: <PersonAdd />,
    },
    middle: 'Sent Requests',
    right: <KeyboardArrowRight />,
    navigate: 'sent',
  },
  {
    left: {
      iconButton: true,
      icon: <PersonSearch />,
    },
    middle: 'Friend Suggestions',
    right: <KeyboardArrowRight />,
    navigate: 'suggestions',
  },
  {
    left: {
      iconButton: true,
      icon: <Groups />,
    },
    middle: 'All Friends',
    right: <KeyboardArrowRight />,
    navigate: 'all',
  },
  // {
  //   left: {
  //     iconButton: true,
  //     icon: <Cake />,
  //   },
  //   middle: 'Birthdays',
  //   navigate: 'birthdays',
  // },
];
