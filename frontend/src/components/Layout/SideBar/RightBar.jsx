import {
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import {
  EmergencyRecording,
  Search,
  MoreHoriz,
} from '@mui/icons-material';
import '../Layout.css'

export default function RightBar() {

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
            padding: '0 8px'
          }}
        >
          <Typography>Friend Requests</Typography>
          <Typography>See all</Typography>
        </Box>

        <Button
          sx={{
            padding: '8px',
          }}
        >
          <Avatar sx={{ width: '50px', height: '50px' }} />
          <Box>
            <Typography
              sx={{
                textTransform: 'none',
                color: 'black',
                textAlign: 'left',
                marginLeft: '8px',
                marginBottom: '4px',
              }}
            >
              Dibu
            </Typography>
            <Button
              sx={{
                width: '118px',
                height: '36px',
                fontSize: '1.6rem',
                textTransform: 'none',
                color: 'white',
                borderRadius: '8px',
                backgroundColor: 'var(--primary-color)',
                marginLeft: '8px',
              }}
            >
              Confirm
            </Button>
            <Button
              sx={{
                width: '118px',
                height: '36px',
                fontSize: '1.6rem',
                textTransform: 'none',
                color: 'white',
                borderRadius: '8px',
                backgroundColor: 'gray',
                marginLeft: '8px',
              }}
            >
              Decline
            </Button>
          </Box>
        </Button>
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
            padding: '0 8px'
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
          <Button sx={{width: '99%', justifyContent: 'left',}}>
            <Avatar/>
            <Typography sx={{textTransform: 'none', marginLeft: '10px'}}>Nguyễn Hoàng Hai Dụ</Typography>
          </Button>
          <Button sx={{width: '99%', justifyContent: 'left',}}>
            <Avatar/>
            <Typography sx={{textTransform: 'none', marginLeft: '10px'}}>Nguyễn Hoàng Hai Dụ</Typography>
          </Button>
          <Button sx={{width: '99%', justifyContent: 'left',}}>
            <Avatar/>
            <Typography sx={{textTransform: 'none', marginLeft: '10px'}}>Nguyễn Hoàng Hai Dụ</Typography>
          </Button>
          <Button sx={{width: '99%', justifyContent: 'left',}}>
            <Avatar/>
            <Typography sx={{textTransform: 'none', marginLeft: '10px'}}>Nguyễn Hoàng Hai Dụ</Typography>
          </Button>
          <Button sx={{width: '99%', justifyContent: 'left',}}>
            <Avatar/>
            <Typography sx={{textTransform: 'none', marginLeft: '10px'}}>Nguyễn Hoàng Hai Dụ</Typography>
          </Button>
          <Button sx={{width: '99%', justifyContent: 'left',}}>
            <Avatar/>
            <Typography sx={{textTransform: 'none', marginLeft: '10px'}}>Nguyễn Hoàng Hai Dụ</Typography>
          </Button>
          <Button sx={{width: '99%', justifyContent: 'left',}}>
            <Avatar/>
            <Typography sx={{textTransform: 'none', marginLeft: '10px'}}>Nguyễn Hoàng Hai Dụ</Typography>
          </Button>
          <Button sx={{width: '99%', justifyContent: 'left',}}>
            <Avatar/>
            <Typography sx={{textTransform: 'none', marginLeft: '10px'}}>Nguyễn Hoàng Hai Dụ</Typography>
          </Button>
          <Button sx={{width: '99%', justifyContent: 'left',}}>
            <Avatar/>
            <Typography sx={{textTransform: 'none', marginLeft: '10px'}}>Nguyễn Hoàng Hai Dụ</Typography>
          </Button>
          <Button sx={{width: '99%', justifyContent: 'left',}}>
            <Avatar/>
            <Typography sx={{textTransform: 'none', marginLeft: '10px'}}>Nguyễn Hoàng Hai Dụ</Typography>
          </Button>
          <Button sx={{width: '99%', justifyContent: 'left',}}>
            <Avatar/>
            <Typography sx={{textTransform: 'none', marginLeft: '10px'}}>Nguyễn Hoàng Hai Dụ</Typography>
          </Button>
          <Button sx={{width: '99%', justifyContent: 'left',}}>
            <Avatar/>
            <Typography sx={{textTransform: 'none', marginLeft: '10px'}}>Nguyễn Hoàng Hai Dụ</Typography>
          </Button>
          <Button sx={{width: '99%', justifyContent: 'left',}}>
            <Avatar/>
            <Typography sx={{textTransform: 'none', marginLeft: '10px'}}>Nguyễn Hoàng Hai Dụ</Typography>
          </Button>
          <Button sx={{width: '99%', justifyContent: 'left',}}>
            <Avatar/>
            <Typography sx={{textTransform: 'none', marginLeft: '10px'}}>Nguyễn Hoàng Hai Dụ</Typography>
          </Button>
          <Button sx={{width: '99%', justifyContent: 'left',}}>
            <Avatar/>
            <Typography sx={{textTransform: 'none', marginLeft: '10px'}}>Nguyễn Hoàng Hai Dụ</Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
