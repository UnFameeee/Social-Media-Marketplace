import MUI from '../../../components/MUI';

export default function LeftbarMiddleItem({
  profileName,
  firstButtonConfig,
  secondButtonConfig,
}) {
  return (
    <>
      <span style={{ marginLeft: '1.2rem' }}>{profileName}</span>
      <div className="action">
        <MUI.Button className="action-btn" {...firstButtonConfig}>
          Confirm
        </MUI.Button>

        {secondButtonConfig && (
          <MUI.Button className="action-btn" {...secondButtonConfig}>
            Deny
          </MUI.Button>
        )}
      </div>
    </>
  );
}
