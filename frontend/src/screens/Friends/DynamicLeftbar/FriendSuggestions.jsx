import TwoColumns from '../../../components/Layout/TwoColumns';
import LeftbarTitle from './LeftbarTitle';
import {
  People,
  GroupAdd,
  Groups,
  Cake,
  PersonSearch,
  KeyboardArrowRight,
} from '@mui/icons-material';
import MUI from '../../../components/MUI';
import './index.css';

export default function FriendSuggestions() {
  return (
    <TwoColumns
      leftBarConfig={{
        classNameConfig: {
          listClassname: 'friend-list'
        },
        before: <LeftbarTitle title="Friend Suggestions" />,
        leftBarList: [
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Duy',
            },
            middle: <MiddleItem name="Thạch Dương Duy" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Vũ',
            },
            middle: <MiddleItem name="Nguyễn Hoàng Vũ" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Thắng',
            },
            middle: <MiddleItem name="Nguyễn Phạm Quốc Thắng" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Duy',
            },
            middle: <MiddleItem name="Thạch Dương Duy" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Vũ',
            },
            middle: <MiddleItem name="Nguyễn Hoàng Vũ" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Thắng',
            },
            middle: <MiddleItem name="Nguyễn Phạm Quốc Thắng" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Duy',
            },
            middle: <MiddleItem name="Thạch Dương Duy" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Vũ',
            },
            middle: <MiddleItem name="Nguyễn Hoàng Vũ" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Thắng',
            },
            middle: <MiddleItem name="Nguyễn Phạm Quốc Thắng" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Duy',
            },
            middle: <MiddleItem name="Thạch Dương Duy" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Vũ',
            },
            middle: <MiddleItem name="Nguyễn Hoàng Vũ" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Thắng',
            },
            middle: <MiddleItem name="Nguyễn Phạm Quốc Thắng" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Duy',
            },
            middle: <MiddleItem name="Thạch Dương Duy" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Vũ',
            },
            middle: <MiddleItem name="Nguyễn Hoàng Vũ" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Thắng',
            },
            middle: <MiddleItem name="Nguyễn Phạm Quốc Thắng" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Duy',
            },
            middle: <MiddleItem name="Thạch Dương Duy" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Vũ',
            },
            middle: <MiddleItem name="Nguyễn Hoàng Vũ" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Thắng',
            },
            middle: <MiddleItem name="Nguyễn Phạm Quốc Thắng" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Duy',
            },
            middle: <MiddleItem name="Thạch Dương Duy" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Vũ',
            },
            middle: <MiddleItem name="Nguyễn Hoàng Vũ" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Thắng',
            },
            middle: <MiddleItem name="Nguyễn Phạm Quốc Thắng" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Duy',
            },
            middle: <MiddleItem name="Thạch Dương Duy" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Vũ',
            },
            middle: <MiddleItem name="Nguyễn Hoàng Vũ" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Thắng',
            },
            middle: <MiddleItem name="Nguyễn Phạm Quốc Thắng" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Duy',
            },
            middle: <MiddleItem name="Thạch Dương Duy" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Vũ',
            },
            middle: <MiddleItem name="Nguyễn Hoàng Vũ" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Thắng',
            },
            middle: <MiddleItem name="Nguyễn Phạm Quốc Thắng" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Duy',
            },
            middle: <MiddleItem name="Thạch Dương Duy" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Vũ',
            },
            middle: <MiddleItem name="Nguyễn Hoàng Vũ" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Thắng',
            },
            middle: <MiddleItem name="Nguyễn Phạm Quốc Thắng" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Duy',
            },
            middle: <MiddleItem name="Thạch Dương Duy" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Vũ',
            },
            middle: <MiddleItem name="Nguyễn Hoàng Vũ" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Thắng',
            },
            middle: <MiddleItem name="Nguyễn Phạm Quốc Thắng" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Duy',
            },
            middle: <MiddleItem name="Thạch Dương Duy" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Vũ',
            },
            middle: <MiddleItem name="Nguyễn Hoàng Vũ" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Thắng',
            },
            middle: <MiddleItem name="Nguyễn Phạm Quốc Thắng" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Duy',
            },
            middle: <MiddleItem name="Thạch Dương Duy" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Vũ',
            },
            middle: <MiddleItem name="Nguyễn Hoàng Vũ" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Thắng',
            },
            middle: <MiddleItem name="Nguyễn Phạm Quốc Thắng" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Duy',
            },
            middle: <MiddleItem name="Thạch Dương Duy" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Vũ',
            },
            middle: <MiddleItem name="Nguyễn Hoàng Vũ" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Thắng',
            },
            middle: <MiddleItem name="Nguyễn Phạm Quốc Thắng" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Duy',
            },
            middle: <MiddleItem name="Thạch Dương Duy" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Vũ',
            },
            middle: <MiddleItem name="Nguyễn Hoàng Vũ" />,
          },
          {
            left: {
              url: 'https://source.unsplash.com/random/300×300',
              name: 'Thắng',
            },
            middle: <MiddleItem name="Nguyễn Phạm Quốc Thắng" />,
          },
        ],
        leftBarColor: 'white',
      }}
    ></TwoColumns>
  );
}

function MiddleItem({ name }) {
  return (
    <>
      <span style={{ marginLeft: '14px' }}>{name}</span>
      <div
        style={{ display: 'flex', justifyContent: 'space-evenly' }}
      >
        <MUI.Button style={{ width: '120px', maxHeight: '40px' }}>
          Confirm
        </MUI.Button>
        <MUI.Button style={{ width: '120px', maxHeight: '40px' }}>
          Delete
        </MUI.Button>
      </div>
    </>
  );
}
