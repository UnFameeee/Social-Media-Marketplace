import { KeyboardBackspace } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import MiddleHr from '../../../components/FullWidthHr/MiddleHr';
import MUI from '../../../components/MUI';

export default function LeftbarTitle({
  title,
  subTitle,
  backTo = '/friends',
}) {
  let navigate = useNavigate();

  return (
    <div className="friend-left-bar-title-wrapper">
      <div className="friend-left-bar-title">
        <MUI.BetterIconButton
          sx={{ padding: '0.6rem', marginRight: '0.8rem' }}
          onClick={() => navigate(backTo)}
        >
          <KeyboardBackspace sx={{ fontSize: '2.4rem' }} />
        </MUI.BetterIconButton>
        <span style={{ fontSize: '2.2rem', fontWeight: '600' }}>
          {title}
        </span>
      </div>
      <MiddleHr width="90%" />
      {subTitle && (
        <div style={{ padding: '1.4rem', fontWeight: '500' }}>
          {subTitle}
        </div>
      )}
    </div>
  );
}
