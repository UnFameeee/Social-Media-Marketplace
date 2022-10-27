import TwoColumns from '../../../../components/Layout/TwoColumns';
import LeftbarTitle from '../LeftbarTitle';
import LeftbarMiddleItem from '../LeftbarMiddleItem';
import '../index.css';
import UserProfile from '../../../UserProfile/UserProfile';

export default function AllFriends() {
  return (
    <TwoColumns
      leftBarConfig={{
        classNameConfig: {
          listClassname: 'friend-list'
        },
        before: <LeftbarTitle title="All Friends" subTitle={`${131} Friends`} />,
        leftBarList: [
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Duy',
            },
            middle: "Thạch Dương Duy",
          },
        ],
        leftBarColor: 'white',
      }}
    >
      <UserProfile />
    </TwoColumns>
  );
}
