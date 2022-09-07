import {
  Edit,
  Settings as Setting,
  LockPerson,
  Public,
  Translate,
} from '@mui/icons-material';
import { Button } from '@mui/material';
import Layout from "../../components/Layout"

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
            <span className="w-[30rem] font-medium">
              Contact Phone
            </span>
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

  var language = (
    <>
      <h2 className="text-[2rem] font-medium mb-[1.5rem]">
        Language and Region Settings
      </h2>
      <div className="my-[6px] rounded-xl bg-white">
        <ul className="pl-[2rem] pr-[1.5rem] pb-[2rem]">
          <li className="pt-[2rem]">
            <span className="font-medium">Language</span>

            <div className="flex items-center">
              <span className="w-[80rem]">
                Language for buttons, titles and other text from
                Facebook for this account
              </span>
              <span className="flex-1 font-medium">English (US)</span>
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

          <li className="mt-[2rem]">
            <span className="font-medium">Region format</span>

            <div className="flex items-center">
              <span className="w-[80rem]">
                Formats for dates, times and numbers
              </span>
              <span className="flex-1 font-medium">MM/DD/YYYY</span>
              <Button
                variant="text"
                sx={{ fontSize: '1.6rem', textTransform: 'none' }}
                startIcon={<Edit />}
              >
                Edit
              </Button>
            </div>

            <div className="flex items-center">
              <span className="w-[80rem]">Temperature</span>
              <span className="flex-1 font-medium">Celsius</span>
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

          <li className="mt-[2rem]">
            <span className="font-medium">Multilingual posts</span>

            <div className="flex items-center">
              <span className="w-[80rem]">
                A feature that lets you post multiple language
                versions of a status
              </span>
              <span className="flex-1 font-medium">Off</span>
              <Button
                variant="text"
                sx={{ fontSize: '1.6rem', textTransform: 'none' }}
                startIcon={<Edit />}
              >
                Edit
              </Button>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
  var listFeature = [
    { text: 'General', iconName: <Setting /> },
    { text: 'Privacy', iconName: <LockPerson /> },
    { text: 'Public Posts', iconName: <Public /> },
    { text: 'Language & Region', iconName: <Translate /> },
  ]

  return (
    <Layout.SideBarOnly listFeature={listFeature}>
      {general}
    </Layout.SideBarOnly>
  );
}
