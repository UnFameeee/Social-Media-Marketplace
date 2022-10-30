import { Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { acceptFriendRequest } from '../../../../redux/apiRequest';
import MUI from '../../../../components/MUI';

export default function FriendCard(props) {
  const { imageURL, name, id, reRender } = props;
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser.access
  );

  return (
    <div className="friend-card">
      <Avatar className="image" alt="avatar" src={imageURL}>
        {name?.at(0)}
      </Avatar>
      <div className="bottom">
        <span>{name}</span>

        <MUI.Button
          style={{ marginTop: '12px' }}
          onClick={() => {
            acceptFriendRequest(accessToken, id, dispatch);
            setTimeout(() => {
              reRender(prev => !prev)
            }, 100);
          }}
        >
          Confirm
        </MUI.Button>
        <MUI.Button style={{ marginTop: '12px' }}>Deny</MUI.Button>
      </div>
    </div>
  );
}
