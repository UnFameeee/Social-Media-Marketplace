import React from 'react'
import {
    Avatar,
    Box,
    Button,
    MenuItem,
    Typography,
  } from '@mui/material';
function FriendRequest() {
  return (
    <MenuItem
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
        </MenuItem>
  )
}

export default FriendRequest