import MUI from '../../../components/MUI';

export default function LeftbarMiddleItem({
  profileName,
  firstButtonConfig,
  secondButtonConfig,
}) {
  return (
    <>
      <span style={{ marginLeft: '1.4rem' }}>{profileName}</span>
      <div
        style={{ display: 'flex', justifyContent: 'space-evenly' }}
      >
        <MUI.Button
          style={{ width: '12rem', maxHeight: '4rem' }}
          {...firstButtonConfig}
        >
          Confirm
        </MUI.Button>
        <MUI.Button
          style={{ width: '12rem', maxHeight: '4rem' }}
          {...secondButtonConfig}
        >
          Deny
        </MUI.Button>
      </div>
    </>
  );
}
