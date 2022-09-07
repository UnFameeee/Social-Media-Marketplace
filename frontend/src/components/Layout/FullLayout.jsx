import SideBarFunction from '../SideBarFunction/SideBarFunction';
import RightSideBar from '../RightSideBar/RightSideBar';

export default function FullLayout(props) {
  const { listFeature, children } = props;
  return (
    <div className="pt-[5.5rem] flex w-full">
      <div className="leftSideBar w-[18%] pb-[5rem] h-screen bg-white fixed overflow-scroll">
        <SideBarFunction listFeature={listFeature} />
      </div>
      <div className="middleMainContent px-[30%] pt-6 bg-greyf1 w-screen">
        {children}
      </div>
      <div className="rightSideBar fixed right-0 w-[18%] h-screen overflow-scroll  px-[1rem] pt-[2.5rem] pb-[5rem]">
        <RightSideBar />
      </div>
    </div>
  );
}
