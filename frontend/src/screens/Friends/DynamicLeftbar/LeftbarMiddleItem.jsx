import MUI from '../../../components/MUI'

export default function LeftbarMiddleItem({ name }) {
    return (
      <>
        <span style={{ marginLeft: '1.4rem' }}>{name}</span>
        <div
          style={{ display: 'flex', justifyContent: 'space-evenly' }}
        >
          <MUI.Button style={{ width: '12rem', maxHeight: '4rem' }}>
            Confirm
          </MUI.Button>
          <MUI.Button style={{ width: '12rem', maxHeight: '4rem' }}>
            Delete
          </MUI.Button>
        </div>
      </>
    );
  }