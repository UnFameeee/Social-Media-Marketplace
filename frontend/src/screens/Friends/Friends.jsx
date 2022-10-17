import React from 'react';
import TwoColumns from '../../components/Layout/TwoColumns';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';

export default function Friends() {
  return (
    <TwoColumns
      leftBarConfig={{
        leftBarList: [
          {
            text: 'Covid- 19 infomation',
            iconName: <LoginOutlinedIcon />,
          },
        ],
        leftBarColor: 'white',
      }}
    >
      coadawdaw
    </TwoColumns>
  );
}
