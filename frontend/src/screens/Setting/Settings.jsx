import {
  Edit,
  Settings as Setting,
  LockPerson,
  Public,
  Translate,
} from '@mui/icons-material';
import { Button } from '@mui/material';
import Layout from '../../components/Layout';

var listFeature = [
  { text: 'General', iconName: <Setting /> },
  { text: 'Privacy', iconName: <LockPerson /> },
  { text: 'Public Posts', iconName: <Public /> },
  { text: 'Language & Region', iconName: <Translate /> },
];

export default function Settings() {
  var general = (
    <>
      <h1 className="text-[2rem] font-medium mb-[1.5rem]">
        General Account Settings
      </h1>
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
      <h1 className="text-[2rem] font-medium mb-[1.5rem]">
        Language and Region Settings
      </h1>
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

  return (
    <Layout.SideBarOnly listFeature={listFeature}>
      <h1 className="text-[2rem] font-medium mb-[1.5rem]">
        Public Post Filters and Tools
      </h1>
      <div className="w-full border border-[#aaa]"></div>
      <div className="my-[6px]">
        <ul className="">
          <li className="p-[8px] flex items-center">
            <span className="w-[30rem] font-medium">
              Who Can Follow Me
            </span>
            <span className="flex-1 text-[#65676b]">
              Followers see your posts, reels, stories and soundbites
              in Feed. Friends follow your posts, reels, stories and
              soundbites by default, but you can also allow people who
              are not your friends to follow your public posts, reels,
              stories and soundbites. Use this setting to choose who
              can follow you. Each time you post or create a reel,
              story, or soundbite, you choose which audience you want
              to share with.
            </span>
            <Button
              variant="text"
              sx={{ fontSize: '1.6rem', textTransform: 'none' }}
              startIcon={<Edit />}
            >
              Edit
            </Button>
          </li>
          <div className="w-full border border-[#aaa]"></div>

          <li className="p-[8px] flex items-center">
            <span className="w-[30rem] font-medium">
              Public Post Comments
            </span>
            <span className="flex-1 text-[#65676b]">
              Who can comment on your public posts? Public
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
              Public Post Notifications
            </span>
            <span className="flex-1 text-[#65676b]">
              Get notifications from Public
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
              Public Profile Info
            </span>
            <span className="flex-1 text-[#65676b]">
              Who can like or comment on your public profile pictures
              and other profile info? Friends
            </span>
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
      {/* navigate to user profile */}
      Want to know what followers can see? View your public timeline.
    </Layout.SideBarOnly>
  );
}
