import { Box } from '@mui/material';

export default function OneColumn(props) {
  return (
    // <div className="pt-[5.5rem] flex w-full">
    //   <div className="px-[18%] pt-6 bg-greyf1 w-screen">
    //     {props.children}
    //   </div>
    // </div>
    
    <Box className="pt-[6rem] flex w-full">
      <Box className="px-[18%] pt-6 bg-greyf1 w-screen">
        {props.children}
      </Box>
    </Box>
  );
}
