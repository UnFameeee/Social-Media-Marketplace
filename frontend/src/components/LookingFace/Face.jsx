import './Face.css';

export default function Face(props) {
  const { happy, left, top } = props;
  return (
    <div className="wrapper">
      <div className="move top left"></div>
      <div className="move top"></div>
      <div className="move top right"></div>
      <div className="move left"></div>
      <div className="move"></div>
      <div className="move right"></div>
      <div className="move bottom left"></div>
      <div className="move bottom"></div>
      <div className="move bottom right"></div>
      <div className={'head'} style={{ left: left, top: top }}>
        <div className="ear ear_left"></div>
        <div className="ear ear_right"></div>
        <div className="face">
          <div className="eye eye_left"></div>
          <div className="eye eye_right"></div>
          <div className="nose"></div>
          <div className="beard">
            <div className={happy ? 'chin' : 'chin sad'}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
