import { format } from 'timeago.js';
import MUI from '../../../components/MUI';

export default function LeftbarMiddleItem({
  profile,
  firstButtonConfig,
  secondButtonConfig,
}) {
  return (
    <>
      <div className="friend-left-bar-middle title">
        <span className="flex-1">{profile?.profile_name}</span>
      </div>
      <div className="action">
        <MUI.Button className="action-btn" {...firstButtonConfig}>
          Confirm
        </MUI.Button>

        {secondButtonConfig && (
          <MUI.Button className="action-btn" {...secondButtonConfig}>
            Deny
          </MUI.Button>
        )}
      </div>
    </>
  );
}

export function LeftbarFriendRequest({
  listAction,
  profile,
  firstButtonConfig,
  secondButtonConfig,
}) {
  var confirmed = listAction[0].length > 0 && listAction[0].includes(profile?.profile_id);
  var denied = listAction[1].length > 0 && listAction[1].includes(profile?.profile_id);

  return (
    <>
      <div className="friend-left-bar-middle title">
        <span className="flex-1">{profile?.profile_name}</span>
        <span className="unimportant-text">
          {format(profile?.createdAt)}
        </span>
      </div>

      {confirmed || denied ? (
        <div className="friend-left-bar-middle unimportant-text">
          {confirmed && 'Request confirmed'}
          {denied && 'Request denied'}
        </div>
      ) : (
        <div className="action">
          <MUI.Button className="action-btn" {...firstButtonConfig}>
            Confirm
          </MUI.Button>

          {secondButtonConfig && (
            <MUI.Button
              className="action-btn"
              {...secondButtonConfig}
            >
              Deny
            </MUI.Button>
          )}
        </div>
      )}
    </>
  );
}
