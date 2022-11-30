import RightBar from './SideBar/RightBar';
import LeftBar from './SideBar/LeftBar';
import './Layout.css';

export default function ThreeColumns(props) {
  const {
    leftBarConfig,
    rightBarConfig,
    children,
    className = '',
  } = props;
  return (
    <div className="layout-wrapper">
      {leftBarConfig && <LeftBar {...leftBarConfig} />}
      <div className={`landing-layout three-column ${className}`}>
        {children}
      </div>
      {rightBarConfig && <RightBar {...rightBarConfig} />}
    </div>
  );
}
