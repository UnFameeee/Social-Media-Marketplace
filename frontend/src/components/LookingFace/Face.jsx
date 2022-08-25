import './Face.css';

export default function Face(props) {
  return (
    <div class="wrapper">
      <div class="move top left"></div>
      <div class="move top"></div>
      <div class="move top right"></div>
      <div class="move left"></div>
      <div class="move"></div>
      <div class="move right"></div>
      <div class="move bottom left"></div>
      <div class="move bottom"></div>
      <div class="move bottom right"></div>
      <div class="head">
        <div class="ear ear_left"></div>
        <div class="ear ear_right"></div>
        <div class="face">
          <div class="eye eye_left"></div>
          <div class="eye eye_right"></div>
          <div class="nose"></div>
          <div class="beard">
            <div class={props.happy?"chin":"sad-chin"}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
