import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import MUI from '../../../../components/MUI';

export default function FriendCard(props) {
  const {
    profileDetails,
    type = 'requests',
    firstButtonConfig,
    secondButtonConfig,
  } = props;

  return (
    <div className="friend-card">
      <Link to={`${type}?id=${profileDetails?.profile_id}`}>
        <Avatar
          className="image"
          alt="avatar"
          src={profileDetails.avatar}
        >
          {profileDetails?.profile_name?.at(0)}
        </Avatar>
      </Link>

      <div className="bottom">
        <Link
          to={`${type}?id=${profileDetails.profile_id}`}
          className="hover:underline"
        >
          <span>{profileDetails.profile_name}</span>
        </Link>

        {firstButtonConfig && (
          <MUI.Button
            style={{ marginTop: '12px' }}
            {...firstButtonConfig}
          >
            Confirm
          </MUI.Button>
        )}

        {secondButtonConfig && (
          <MUI.Button
            style={{ marginTop: '12px' }}
            {...secondButtonConfig}
          >
            Deny
          </MUI.Button>
        )}
      </div>
    </div>
  );
}
