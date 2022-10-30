import { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFriends } from '../../../../redux/apiRequest';
import TwoColumns from '../../../../components/Layout/TwoColumns';
import LeftbarTitle from '../LeftbarTitle';
import LeftbarMiddleItem from '../LeftbarMiddleItem';
import UserProfile from '../../../UserProfile/UserProfile';
import '../index.css';

export default function FriendSuggestions() {
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser.access
  );
  // const allFriends = useSelector(
  //   (state) => state.friends.getAllFriends?.data
  // );

  const [reRender, setReRender] = useState(false);
  useLayoutEffect(() => {
    let onDestroy = false;
    if (!onDestroy) {
    }
    return () => {
      onDestroy = true;
    };
  }, [reRender]);

  return (
    <TwoColumns
      leftBarConfig={{
        classNameConfig: {
          listClassname: 'friend-list'
        },
        before: <LeftbarTitle title="Friend Suggestions" subTitle="People You May Know" />,
        leftBarList: [
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Duy',
            },
            middle: <LeftbarMiddleItem profileName="Thạch Dương Duy" />,
          },
        ],
        leftBarColor: 'white',
      }}
    >
      <UserProfile />
    </TwoColumns>
  );
}
