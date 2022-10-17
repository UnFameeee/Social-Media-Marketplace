import './Layout.css'

export default function OneColumn(props) {
  return (
    // #region oldCode
    // <div className="pt-[5.5rem] flex w-full">
    //   <div className="px-[18%] pt-6 bg-greyf1 w-screen">
    //     {props.children}
    //   </div>
    // </div>
    // #endregion
    
    <div className="layout-wrapper">
      <div className="landing-layout one-column">
        {props.children}
      </div>
    </div>
  );
}
