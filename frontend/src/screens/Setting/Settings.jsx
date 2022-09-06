import SideBarFunction from '../../components/SideBarFunction/SideBarFunction';
import {
  Edit,
  Settings as Setting,
  LockPerson,
  Public,
  Translate,
} from '@mui/icons-material';
import { Button } from '@mui/material';

export default function Settings() {
  var general = (
    <>
      <h2 className="text-[2rem] font-medium mb-[1.5rem]">
        General Account Settings
      </h2>
      <div className="w-full border border-[#aaa]"></div>
      <div className="my-[6px]">
        <ul className="">
          <li className="p-[8px] flex items-center">
            <span className="w-[30rem] font-medium">User Name</span>
            <span className="flex-1 text-[#65676b]">Duy Dương</span>
            <Button
              variant="text"
              sx={{ fontSize: '1.6rem', textTransform: 'none' }}
              startIcon={<Edit />}
            >
              Edit
            </Button>
          </li>
          <div className="w-full border border-[#e3e5e9]"></div>

          <li className="p-[8px] flex items-center">
            <span className="w-[30rem] font-medium">
              Your Profile Link
            </span>
            <span className="flex-1 text-[#65676b]">
              http://facebook.com/duyduong
            </span>
            <Button
              variant="text"
              sx={{ fontSize: '1.6rem', textTransform: 'none' }}
              startIcon={<Edit />}
            >
              Edit
            </Button>
          </li>
          <div className="w-full border border-[#e3e5e9]"></div>

          <li className="p-[8px] flex items-center">
            <span className="w-[30rem] font-medium">Email</span>
            <span className="flex-1 text-[#65676b]">
              junrante@gmail.com
            </span>
            <Button
              variant="text"
              sx={{ fontSize: '1.6rem', textTransform: 'none' }}
              startIcon={<Edit />}
            >
              Edit
            </Button>
          </li>
          <div className="w-full border border-[#e3e5e9]"></div>

          <li className="p-[8px] flex items-center">
            <span className="w-[30rem] font-medium">Contact Phone</span>
            <span className="flex-1 text-[#65676b]">0123456789</span>
            <Button
              variant="text"
              sx={{ fontSize: '1.6rem', textTransform: 'none' }}
              startIcon={<Edit />}
            >
              Edit
            </Button>
          </li>
          <div className="w-full border border-[#e3e5e9]"></div>

          <li className="p-[8px] flex items-center">
            <span className="w-[30rem] font-medium">Birth</span>
            <span className="flex-1 text-[#65676b]">19/1/2001</span>
            <Button
              variant="text"
              sx={{ fontSize: '1.6rem', textTransform: 'none' }}
              startIcon={<Edit />}
            >
              Edit
            </Button>
          </li>
        </ul>
      </div>
      <div className="w-full border border-[#aaa]"></div>
    </>
  );

  return (
    <div className="pt-[5.5rem] flex w-full">
      <div className="leftSideBar w-[18%] pb-[5rem] h-screen bg-white fixed overflow-scroll">
        <SideBarFunction
          listFeature={[
            { text: 'General', iconName: <Setting /> },
            { text: 'Privacy', iconName: <LockPerson /> },
            { text: 'Public Posts', iconName: <Public /> },
            { text: 'Language & Region', iconName: <Translate /> },
          ]}
        />
      </div>
      <div className="pl-[30%] pr-[12%] pt-6 bg-greyf1 w-screen">
        <div className="w-full">
          <h2 className="text-[2rem] font-medium mb-[1.5rem]">
            Language and Region Settings
          </h2>
          <div className="my-[6px] rounded-xl bg-white">
            <ul className="pl-[10px] pr-[4px]">
              <li className="">
                <span className="font-medium">Language</span>

                <div className="flex items-center">
                  <span className="w-[80rem]">Language for buttons, titles and other text from Facebook for this account</span>
                  <span className="flex-1 font-medium">
                    English (US)
                  </span>
                  <Button
                    variant="text"
                    sx={{ fontSize: '1.6rem', textTransform: 'none' }}
                    startIcon={<Edit />}
                  >
                    Edit
                  </Button>
                </div>
              </li>
              <div className="w-full border border-[#e3e5e9]"></div>

              <li className="">
                <span className="font-medium">Region format</span>

                <div className="flex items-center">
                  <span className="w-[80rem]">Language for buttons, titles and other text from Facebook for this account</span>
                  <span className="flex-1 font-medium">
                    Duy Dương
                  </span>
                  <Button
                    variant="text"
                    sx={{ fontSize: '1.6rem', textTransform: 'none' }}
                    startIcon={<Edit />}
                  >
                    Edit
                  </Button>
                </div>
              </li>
              <div className="w-full border border-[#e3e5e9]"></div>

            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
