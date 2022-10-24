import { Outlet } from 'react-router-dom';
import {
  People,
  GroupAdd,
  Groups,
  Cake,
  PersonSearch,
  KeyboardArrowRight,
} from '@mui/icons-material';
import TwoColumns from '../../components/Layout/TwoColumns';
import { Helper } from '../../utils/Helper';
import './index.css';
import { useState } from 'react';

export function StaticLeftbarLayout() {
  const [reRender, setReRender] = useState(true);

  return (
    <TwoColumns
      leftBarConfig={{
        leftBarList: [
          {
            title: 'Friends',
            left: {
              iconButton: true,
              icon: <People />,
            },
            middle: 'Home',
            selected: Helper.checkURL('friends', {}, true),
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
            navigate: 'list',
          },
          {
            left: {
              iconButton: true,
              icon: <Cake />,
            },
            middle: 'Birthdays',
            selected: Helper.checkURL('birthdays', {}, true),
            navigate: 'birthdays',
          },
        ],
        leftBarColor: 'white',
      }}
    >
      <Outlet context={() => setReRender(!reRender)} />
    </TwoColumns>
  );
}

export function DynamicLeftbarLayout() {
  return <Outlet />;
}
