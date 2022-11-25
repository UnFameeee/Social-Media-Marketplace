import { Avatar } from '@mui/material';
import MUI from '../../../../components/MUI';
import { Helper } from '../../../../utils/Helper';

export default function FriendCard(props) {
  const {
    profileDetails,
    type = 'requests',
    firstButtonConfig,
    secondButtonConfig,
    hiddenButtonConfig = { disabled: true, className: 'cursor-not-allowed' },
    navigate,
    listAction,
  } = props;

  function goTo() {
    navigate(`${type}?id=${profileDetails?.profile_id}`);
  }

  var confirmed;
  var denied;
  if (type === 'requests') {
    confirmed = Helper.checkValueExistInArray(
      listAction[0],
      profileDetails?.profile_id
    );
    denied = Helper.checkValueExistInArray(
      listAction[1],
      profileDetails?.profile_id
    );
  } else {
    confirmed = Helper.checkValueExistInArray(
      listAction,
      profileDetails?.profile_id
    );
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
        {type !== 'requests' && (
          <div className="unimportant-text spacing">
            {confirmed && 'Request Sent'}
          </div>
        )}

        {confirmed || denied ? (
          <MUI.Button
            style={{ marginTop: '68px' }}
            {...hiddenButtonConfig}
          >
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
