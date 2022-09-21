import { Box } from '@mui/material';
import LeftBar from './SideBar/LeftBar';

export default function TwoColumns(props) {
  const { listFeature, children } = props;
  return (
    // <div className="pt-[5.5rem] flex w-full">
    //   <div className="leftSideBar w-[18%] pb-[5rem] h-screen bg-white fixed overflow-scroll">
    //     <LeftBar listFeature={listFeature} />
    //   </div>
    //   <div className="pl-[30%] pr-[12%] pt-6 bg-greyf1 w-screen">
    //     {children}
    //   </div>
    // </div>

    <Box className="pt-[var(--navbar-height)] flex">
      <LeftBar leftBarList={listFeature} />
      <Box className="pl-[30%] pr-[12%] pt-6 bg-greyf1 w-screen">
        {children}
      </Box>
    </Box>
  );
}
