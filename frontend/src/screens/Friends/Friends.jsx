import React from 'react';
import TwoColumns from '../../components/Layout/TwoColumns';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import OneColumn from '../../components/Layout/OneColumn';
import ThreeColumns from '../../components/Layout/ThreeColumns';

export default function Friends() {
  return (
    <OneColumn
      listFeature={[
        {
          text: 'Covid- 19 infomation',
          iconName: <LoginOutlinedIcon />,
        },
      ]}
    >
      coadawdaw
    </OneColumn>
  );
}
