import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFriendRequests } from '../../../../redux/apiRequest';
import TwoColumns from '../../../../components/Layout/TwoColumns';
import LeftbarTitle from '../LeftbarTitle';
import LeftbarMiddleItem from '../LeftbarMiddleItem';
import UserProfile from '../../../UserProfile/UserProfile';
import '../index.css';

export default function FriendRequests() {
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser.access
  );
  const friendRequests = useSelector(
    (state) => state.friends.getFriendRequests?.data
  );

  useEffect(() => {
    getAllFriendRequests(accessToken, dispatch);
  }, []);

  return (
    <TwoColumns
      leftBarConfig={{
        classNameConfig: {
          listClassname: 'friend-list',
        },
        before: (
          <LeftbarTitle
            title="Friend Requests"
            subTitle={`${friendRequests.page.totalElement} Friend Requests`}
          />
        ),
        leftBarList: friendRequests.data.map((x) => {
          return {
            left: {
              url: x.picture,
              name: x.profile_name,
            },
            middle: <LeftbarMiddleItem name={x.profile_name} />,
          };
        }),
        leftBarColor: 'white',
      }}
    >
      <UserProfile />
    </TwoColumns>
  );
}
