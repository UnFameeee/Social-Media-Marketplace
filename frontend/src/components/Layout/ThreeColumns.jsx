import RightBar from './SideBar/RightBar';
import LeftBar from './SideBar/LeftBar';
import './Layout.css'

export default function ThreeColumns(props) {
  const { leftBarConfig, rightBarConfig, children } = props;
  return (
    // #region oldCode
    // <div className="pt-[5.5rem] flex w-full">
    //   <div className="leftSideBar w-[18%] pb-[5rem] h-screen bg-white fixed overflow-scroll">
    //     <LeftBar listFeature={listFeature} />
    //   </div>
    //   <div className="middleMainContent px-[30%] pt-6 bg-greyf1 w-screen">
    //     {children}
    //   </div>
    //   <div className="rightSideBar fixed right-0 w-[18%] h-screen overflow-scroll  px-[1rem] pt-[2.5rem] pb-[5rem]">
    //     <RightSideBar />
    //   </div>
    // </div>
    // #endregion

    <div className="layout-wrapper">
      <LeftBar {...leftBarConfig} />
      <div className="landing-layout three-column">
        {children}
      </div>
      <RightBar {...rightBarConfig} />
    </div>
  );
}
