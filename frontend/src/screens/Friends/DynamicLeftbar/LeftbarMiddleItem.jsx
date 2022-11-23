import { format } from 'timeago.js';
import MUI from '../../../components/MUI';
import { Helper } from '../../../utils/Helper';

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
  var confirmed = Helper.checkValueExistInArray(
    listAction[0],
    profile?.profile_id
  );
  var denied = Helper.checkValueExistInArray(
    listAction[1],
    profile?.profile_id
  );

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

export function LeftbarFriendSuggest({
  listAdded = [],
  profile,
  firstButtonConfig,
  secondButtonConfig,
  hiddenButtonConfig,
}) {
  return (
    <>
      <div className="friend-left-bar-middle title">
        <div className="flex-1">
          <span>{profile?.profile_name}</span>

          {Helper.checkValueExistInArray(
            listAdded,
            profile?.profile_id
          ) && <div className="unimportant-text">Request Sent</div>}
        </div>

        {Helper.checkValueExistInArray(
          listAdded,
          profile?.profile_id
        ) && (
          <MUI.Button
            className="pointer-events-auto"
            {...hiddenButtonConfig}
          >
            Cancel Request
          </MUI.Button>
        )}
      </div>

      {!Helper.checkValueExistInArray(
        listAdded,
        profile?.profile_id
      ) && (
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
