import {
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import {
  EmergencyRecording,
  Search,
  MoreHoriz,
} from '@mui/icons-material';
import { makeStyles } from 'tss-react/mui';
import '../Layout.css';
import FriendRequest from '../../FriendRequest/FriendRequest';
import FriendContact from '../../FriendContact/FriendContact';

const useStyles = makeStyles()(() => ({
  scroll: {
    '&::-webkit-scrollbar': {
      width: '1rem',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0)',
      borderRadius: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
    },
  },
}));

export default function RightBar() {
  const { classes, cx } = useStyles();

  return (
    // #region oldCode
    // <>
    //   <div className="flex items-center [&>*]:text-slate-500 py-[1rem]">
    //     <span className="flex-1 text-[2rem] font-semibold ">Contacts</span>
    //     <div className="flex gap-[1rem] ">
    //       <EmergencyRecording className="Icon" style={{ fontSize: "2.5rem" }} />
    //       <Search className="Icon" style={{ fontSize: "2.5rem" }} />
    //       <MoreHoriz className="Icon" style={{ fontSize: "2.5rem" }} />
    //     </div>
    //   </div>
    //   <ul className="[&>*]:hoverChangeBg [&>*]:mb-0 [&>*]:px-[1rem]">
    //     <li>
    //       <RoundedAvatar
    //         url="https://source.unsplash.com/random/10×10"
    //         size={35}
    //         border={false}
    //         userName="naruto"
    //       />
    //     </li>
    //     <li>
    //       <RoundedAvatar
    //         url="https://source.unsplash.com/random/750×750"
    //         size={35}
    //         border={false}
    //         userName="naruto"
    //       />
    //     </li>
    //     <li>
    //       <RoundedAvatar
    //         url="https://source.unsplash.com/random/1101×1101"
    //         size={35}
    //         border={false}
    //         userName="naruto"
    //       />
    //     </li>
    //     <li>
    //       <RoundedAvatar
    //         url="https://source.unsplash.com/random/13"
    //         size={35}
    //         border={false}
    //         userName="naruto"
    //       />
    //     </li>
    //     <li>
    //       <RoundedAvatar
    //         url="https://source.unsplash.com/random/12"
    //         size={35}
    //         border={false}
    //         userName="naruto"
    //       />
    //     </li>
    //     <li>
    //       <RoundedAvatar
    //         url="https://source.unsplash.com/random/136"
    //         size={35}
    //         border={false}
    //         userName="naruto"
    //       />
    //     </li>
    //     <li>
    //       <RoundedAvatar
    //         url="https://source.unsplash.com/random/146"
    //         size={35}
    //         border={false}
    //         userName="naruto"
    //       />
    //     </li>
    //     <li>
    //       <RoundedAvatar
    //         url="https://source.unsplash.com/random/132"
    //         size={35}
    //         border={false}
    //         userName="naruto"
    //       />
    //     </li>
    //     <li>
    //       <RoundedAvatar
    //         url="https://source.unsplash.com/random/17"
    //         size={35}
    //         border={false}
    //         userName="naruto"
    //       />
    //     </li>
    //     <li>
    //       <RoundedAvatar
    //         url="https://source.unsplash.com/random/80"
    //         size={35}
    //         border={false}
    //         userName="naruto"
    //       />
    //     </li>
    //     <li>
    //       <RoundedAvatar
    //         url="https://source.unsplash.com/random/1030"
    //         size={35}
    //         border={false}
    //         userName="naruto"
    //       />
    //     </li>
    //     <li>
    //       <RoundedAvatar
    //         url="https://source.unsplash.com/random/1323"
    //         size={35}
    //         border={false}
    //         userName="naruto"
    //       />
    //     </li>
    //     <li>
    //       <RoundedAvatar
    //         url="https://source.unsplash.com/random/13012"
    //         size={35}
    //         border={false}
    //         userName="naruto"
    //       />
    //     </li>
    //     <li>
    //       <RoundedAvatar
    //         url="https://source.unsplash.com/random/1390"
    //         size={35}
    //         border={false}
    //         userName="naruto"
    //       />
    //     </li>
    //     <li>
    //       <RoundedAvatar
    //         url="https://source.unsplash.com/random/34130"
    //         size={35}
    //         border={false}
    //         userName="naruto"
    //       />
    //     </li>
    //   </ul>
    //   <hr className="text-greyf1" />
    // </>
    // #endregion

    <Box
      className={cx(classes.scroll)}
      sx={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        width: 'var(--sidebar-width)',
        height: 'calc(100vh - var(--navbar-height))',
        overflowY: 'scroll',
      }}
    >
      <Box
        sx={{
          padding: '1.5rem 0 8px 0',
          boxShadow: '0px 24px 3px -24px black',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 8px',
          }}
        >
          <Typography>Friend Requests</Typography>
          <Typography>See all</Typography>
        </Box>
        <FriendRequest />
      </Box>
      <Box
        sx={{
          padding: '1.5rem 0 8px 0',
          // boxShadow: '0px 24px 3px -24px black',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 8px',
          }}
        >
          <Typography>Contacts</Typography>
          <Box>
            <IconButton>
              <EmergencyRecording style={{ fontSize: '2.5rem' }} />
            </IconButton>
            <IconButton>
              <Search style={{ fontSize: '2.5rem' }} />
            </IconButton>
            <IconButton>
              <MoreHoriz style={{ fontSize: '2.5rem' }} />
            </IconButton>
          </Box>
        </Box>
        <Box>
         <FriendContact />
        </Box>
      </Box>
    </Box>
  );
}
