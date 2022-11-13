import './Layout.css'

export default function OneColumn(props) {
  return (    
    <div className="layout-wrapper">
      <div className="landing-layout one-column">
        {props.children}
      </div>
    </div>
  );
}
