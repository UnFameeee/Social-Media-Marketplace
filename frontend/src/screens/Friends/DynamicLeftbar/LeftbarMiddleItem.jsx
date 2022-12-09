import { useState } from 'react';
import { RiMore2Fill } from 'react-icons/ri';
import { BiUserX } from 'react-icons/bi';
import { format } from 'timeago.js';
import { CircularProgress } from '@mui/material';
import MUI from '../../../components/MUI';
import { Helper } from '../../../utils/Helper';

export function LeftbarFriendRequest({
  listAction,
  profile,
  firstButtonConfig,
  secondButtonConfig,
  isLoading,
  currentId,
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
        {profile?.createdAt && (
          <span className="unimportant-text">
            {format(profile?.createdAt)}
          </span>
        )}
      </div>

      {isLoading && currentId === profile?.profile_id ? (
        <div className="text-center">
          <CircularProgress
            style={{
              color: 'var(--primary-color)',
              width: '2.4rem',
              height: '2.4rem',
            }}
          />
        </div>
      ) : (
        <>
          {confirmed || denied ? (
            <div className="friend-left-bar-middle unimportant-text">
              {confirmed && 'Request Confirmed'}
              {denied && 'Request Denied'}
            </div>
          ) : (
            <div className="action">
              <MUI.Button
                className="action-btn"
                {...firstButtonConfig}
              >
                Confirm
              </MUI.Button>

              <MUI.Button
                className="action-btn"
                {...secondButtonConfig}
              >
                Deny
              </MUI.Button>
            </div>
          )}
        </>
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
  isLoading,
  currentId,
}) {
  return (
    <>
      <div className="friend-left-bar-middle title">
        <div className="flex-1">
          <span>{profile?.profile_name}</span>

          {Helper.checkValueExistInArray(
            listAdded,
            profile?.profile_id
          ) &&
            (!isLoading || !(currentId === profile?.profile_id)) && (
              <div className="unimportant-text">Request Sent</div>
            )}
        </div>

        {Helper.checkValueExistInArray(
          listAdded,
          profile?.profile_id
        ) &&
          (!isLoading || !(currentId === profile?.profile_id)) && (
            <MUI.Button
              className="pointer-events-auto"
              {...hiddenButtonConfig}
            >
              Cancel Request
            </MUI.Button>
          )}
      </div>

      {isLoading && currentId === profile?.profile_id ? (
        <div className="text-center">
          <CircularProgress
            style={{
              color: 'var(--primary-color)',
              width: '2.4rem',
              height: '2.4rem',
            }}
          />
        </div>
      ) : (
        <>
          {!Helper.checkValueExistInArray(
            listAdded,
            profile?.profile_id
          ) && (
            <div className="action">
              <MUI.Button
                className="action-btn"
                {...firstButtonConfig}
              >
                Add Friend
              </MUI.Button>

              <MUI.Button
                className="action-btn"
                {...secondButtonConfig}
              >
                Remove
              </MUI.Button>
            </div>
          )}
        </>
      )}
    </>
  );
}

export function LeftbarSentRequest({
  listCancel = [],
  profile,
  cancelButtonConfig,
  isLoading,
  currentId,
}) {
  var canceled = Helper.checkValueExistInArray(
    listCancel,
    profile?.profile_id
  );

  return (
    <>
      <div className="friend-left-bar-middle title">
        <span className="flex-1">{profile?.profile_name}</span>
      </div>

      {isLoading && currentId === profile?.profile_id ? (
        <div className="text-center">
          <CircularProgress
            style={{
              color: 'var(--primary-color)',
              width: '2.4rem',
              height: '2.4rem',
            }}
          />
        </div>
      ) : (
        <>
          {canceled ? (
            <div className="friend-left-bar-middle unimportant-text">
              Request Canceled
            </div>
          ) : (
            <div className="action">
              <MUI.Button
                className="action-btn"
                {...cancelButtonConfig}
              >
                Cancel
              </MUI.Button>
            </div>
          )}
        </>
      )}
    </>
  );
}

export function LeftbarAllFriend({
  profile,
  openOptions,
  handleUnfriend,
  handleAddFriend,
  handleCancelRequest,
  listUnfriend,
  listAdded,
  isLoading,
  currentId,
}) {
  const [openConfirm, setOpenConfirm] = useState(false);

  return (
    <div className="flex items-center">
      <div className="flex-1 flex flex-col justify-center px-[0.8rem]">
        <span>{profile?.profile_name}</span>

        {Helper.checkValueExistInArray(
          listAdded,
          profile?.profile_id
        ) ? (
          <span className="unimportant-text text-[1.4rem]">
            Request Sent
          </span>
        ) : (
          profile?.mutualFriend > 0 && (
            <span className="unimportant-text text-[1.4rem]">
              {Helper.isMultiple(
                'mutual friend',
                profile?.mutualFriend
              )}
            </span>
          )
        )}
      </div>

      {isLoading && currentId === profile?.profile_id ? (
        <div className="flex items-center w-[16%] loading">
          <CircularProgress
            style={{
              width: '3rem',
              height: '3rem',
            }}
          />
        </div>
      ) : (
        <>
          {!Helper.checkValueExistInArray(
            listUnfriend,
            profile?.profile_id
          ) ? (
            <>
              <MUI.BetterIconButton
                className="pointer-events-auto mr-[0.8rem] [&>button]:p-[0.4rem]"
                onClick={(e) => {
                  e.stopPropagation();
                  if (openOptions[0] === profile?.profile_id) {
                    openOptions[1]('');
                  } else {
                    openOptions[1](profile?.profile_id);
                  }
                }}
              >
                <RiMore2Fill
                  style={{
                    margin: 0,
                    fontSize: '2rem',
                    color: '#656565',
                  }}
                />
              </MUI.BetterIconButton>

              {openOptions[0] === profile?.profile_id && (
                <MUI.Menu
                  classNameConfig={{
                    menuClass: 'all-friend',
                    middleClass: 'all-friend',
                  }}
                  list={[
                    {
                      left: <BiUserX />,
                      middle: 'Unfriend',
                      onClick: (e) => {
                        e.stopPropagation();
                        setOpenConfirm(true);
                      },
                    },
                  ]}
                />
              )}

              <MUI.ConfirmDialog
                modalProps={[openConfirm, setOpenConfirm]}
                clickAwayClose
                title={`Unfriend ${profile?.profile_name}`}
                actionName={`remove ${profile?.profile_name} as your friend`}
                confirmAction={(e) => {
                  e.stopPropagation();
                  handleUnfriend();
                }}
              />
            </>
          ) : !Helper.checkValueExistInArray(
              listAdded,
              profile?.profile_id
            ) ? (
            <MUI.Button
              style={{ pointerEvents: 'auto', marginRight: '0.8rem' }}
              onClick={(e) => {
                e.stopPropagation();
                handleAddFriend();
              }}
            >
              Add Friend
            </MUI.Button>
          ) : (
            <MUI.Button
              style={{ pointerEvents: 'auto', marginRight: '0.8rem' }}
              onClick={(e) => {
                e.stopPropagation();
                handleCancelRequest();
              }}
            >
              Cancel Request
            </MUI.Button>
          )}
        </>
      )}
    </div>
  );
}
