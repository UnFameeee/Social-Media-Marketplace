import MUI from "../../../../components/MUI";

export default function FriendCard(props) {
  const { imageURL, name } = props;
  return (
    <div className="friend-card">
      <img alt="avatar" src={imageURL} />
      <div className="bottom">
        <span>{name}</span>

        <MUI.Button style={{ marginTop: '12px' }}>Confirm</MUI.Button>
        <MUI.Button style={{ marginTop: '12px' }}>Deny</MUI.Button>
      </div>
    </div>
  );
}
