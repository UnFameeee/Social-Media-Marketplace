import {
  Avatar,
  Box,
  Button,
  Typography,
} from '@mui/material';
import React from 'react';
import TwoColumns from '../../../components/Layout/TwoColumns';

export default function FriendRequests() {
  return (
    <TwoColumns
      leftBarConfig={{
        leftBarList: [
          {
            middle: (
              <>
              </>
            ),
          },
        ],
        leftBarColor: 'white',
      }}
    ></TwoColumns>
  );
}
