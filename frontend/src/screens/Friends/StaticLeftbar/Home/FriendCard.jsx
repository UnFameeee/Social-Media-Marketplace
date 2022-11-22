import { Avatar } from '@mui/material';
import MUI from '../../../../components/MUI';

export default function FriendCard(props) {
  const {
    profileDetails,
    type = 'requests',
    firstButtonConfig,
    secondButtonConfig,
    navigate,
    listAction,
  } = props;

  function goTo() {
    navigate(`${type}?id=${profileDetails?.profile_id}`);
  }

  var confirmed;
  var denied;
  if (type === 'requests') {
    confirmed =
      listAction[0].length > 0 &&
      listAction[0].includes(profileDetails?.profile_id);

    denied =
      listAction[1].length > 0 &&
      listAction[1].includes(profileDetails?.profile_id);
  }

  return (
    <div className="friend-card">
      <Avatar
        className="image"
        alt="avatar"
        src={profileDetails.avatar}
        onClick={goTo}
      >
        {profileDetails?.profile_name?.at(0)}
      </Avatar>

      <div className="bottom">
        <span className="hover:underline" onClick={goTo}>
          {profileDetails.profile_name}
        </span>

        {confirmed || denied ? (
          <MUI.Button style={{ marginTop: '68px', cursor: 'not-allowed' }} disabled>
            {confirmed && 'Request confirmed'}
            {denied && 'Request denied'}
          </MUI.Button>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}
