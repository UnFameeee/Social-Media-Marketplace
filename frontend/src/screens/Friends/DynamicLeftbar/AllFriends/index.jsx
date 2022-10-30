import { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllFriends, getProfile } from '../../../../redux/apiRequest';
import TwoColumns from '../../../../components/Layout/TwoColumns';
import LeftbarTitle from '../LeftbarTitle';
import UserProfile from '../../../UserProfile/UserProfile';
import '../index.css';

export default function AllFriends() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const accessToken = useSelector(
    (state) => state.auth.login.currentUser.access
  );
  const allFriends = useSelector(
    (state) => state.friends.getAll?.data
  );

  const [reRender, setReRender] = useState(false);
  useLayoutEffect(() => {
    getAllFriends(accessToken, dispatch);
  }, [reRender]);

  var subTitle = allFriends?.page?.totalElement
    ? allFriends?.page?.totalElement === 1
      ? `1 Friend`
      : `${allFriends?.page?.totalElement} Friends`
    : `You are CUMLOX`;

  return (
    <TwoColumns
      leftBarConfig={{
        classNameConfig: {
          listClassname: 'friend-list all-friend',
        },
        before: (
          <LeftbarTitle title="All Friends" subTitle={subTitle} />
        ),
        leftBarList: allFriends?.data?.map((x) => {
          return {
            left: {
              url: x.picture,
              name: x.profile_name,
            },
            middle: x.profile_name,
            onClick: () => {
              navigate(`?id=${x.profile_id}`);
              getProfile(accessToken, x.profile_id, dispatch);
              setReRender(!reRender);
            }
          };
        }),
        leftBarColor: 'white',
      }}
    >
      <UserProfile />
    </TwoColumns>
  );
}
