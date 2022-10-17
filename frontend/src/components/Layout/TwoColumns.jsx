import LeftBar from './SideBar/LeftBar';
import './Layout.css'

export default function TwoColumns(props) {
  const { listFeature, children } = props;
  return (
    // #region oldCode
    // <div className="pt-[5.5rem] flex w-full">
    //   <div className="leftSideBar w-[18%] pb-[5rem] h-screen bg-white fixed overflow-scroll">
    //     <LeftBar listFeature={listFeature} />
    //   </div>
    //   <div className="pl-[30%] pr-[12%] pt-6 bg-greyf1 w-screen">
    //     {children}
    //   </div>
    // </div>
    // #endregion

    <div className="layout-wrapper">
      <LeftBar leftBarList={listFeature} />
      <div className="landing-layout two-column">
        {children}
      </div>
    </div>
  );
}
