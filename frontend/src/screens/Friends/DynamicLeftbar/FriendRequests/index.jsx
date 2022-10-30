import { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFriendRequests, acceptFriendRequest } from '../../../../redux/apiRequest';
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

  const [reRender, setReRender] = useState(false);
  useLayoutEffect(() => {
    let onDestroy = false;
    if (!onDestroy) {
      getAllFriendRequests(accessToken, dispatch);
    }
    return () => {
      onDestroy = true;
    };
  }, [reRender]);

  var subTitle = friendRequests?.page?.totalElement
    ? friendRequests?.page?.totalElement === 1
      ? `1 Friend Request`
      : `${friendRequests?.page?.totalElement} Friend Requests`
    : `You Have No Friend Requests`;

  return (
    <TwoColumns
      leftBarConfig={{
        classNameConfig: {
          listClassname: 'friend-list',
        },
        before: (
          <LeftbarTitle title="Friend Requests" subTitle={subTitle} />
        ),
        leftBarList: friendRequests?.data?.map((x) => {
          return {
            left: {
              url: x.picture,
              name: x.profile_name,
            },
            middle: (
              <LeftbarMiddleItem
                profileName={x.profile_name}
                firstButtonConfig={{
                  onClick: () => {
                    acceptFriendRequest(accessToken, x.profile_id, dispatch);
                    setTimeout(() => {
                      setReRender(!reRender)
                    }, 100);
                  },
                }}
              />
            ),
          };
        }),
        leftBarColor: 'white',
      }}
    >
      <UserProfile />
    </TwoColumns>
  );
}
