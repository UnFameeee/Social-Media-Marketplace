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

export default function RightBar() {
  return (
    <Box
      sx={{
        position: 'fixed',
        right: 0,
        width: '18%',
        height: '100%',
        overflow: 'scroll',
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
