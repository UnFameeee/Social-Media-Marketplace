import LeftBar from './SideBar/LeftBar';
import './Layout.css';

export default function TwoColumns(props) {
  const { leftBarConfig, children, className = '' } = props;

  return (
    <div className="layout-wrapper">
      {leftBarConfig && <LeftBar {...leftBarConfig} />}
      <div className={`landing-layout two-column ${className}`}>
        {children}
      </div>
    </div>
  );
}
