import { KeyboardBackspace } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MiddleHr from '../../../components/FullWidthHr/MiddleHr'

export default function LeftbarTitle({title}) {
  let navigate = useNavigate();

  return (
    <>
      <div
        style={{
          display: 'flex',
          padding: '1.2rem',
          alignItems: 'center',
        }}
      >
        <IconButton
          sx={{ padding: '6px', marginRight: '8px' }}
          onClick={() => navigate('/friends')}
        >
          <KeyboardBackspace sx={{ fontSize: '2.4rem' }} />
        </IconButton>
        <span style={{ fontSize: '2.2rem', fontWeight: '600' }}>
          {title}
        </span>
      </div>
      <MiddleHr />
    </>
  );
}
