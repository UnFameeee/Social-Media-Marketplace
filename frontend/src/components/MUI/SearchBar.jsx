import {
  ClickAwayListener,
  Box,
  MenuList,
  MenuItem,
  TextField,
  IconButton,
  InputAdornment,
  Avatar,
  Typography,
} from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import { useState } from 'react';

export default function SearchBar(props) {
  const [open, setOpen] = useState(false);

  const { placeHolder, getData, handleSearch, ...others } = props;
  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }

  return (
    <ClickAwayListener onClickAway={() => {setOpen(false)}}>
      <Box sx={{position: 'relative'}}>
        <TextField
          placeholder={placeHolder}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton
                  sx={{ padding: '0.4rem' }}
                  onClick={handleSearch}
                >
                  <SearchOutlined sx={{ fontSize: '2.2rem' }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            marginLeft: '1.2rem',
            '& .MuiOutlinedInput-root': {
              '& > fieldset': { border: 'none' },
            },
            '& .MuiInputBase-root': {
              background: '#F0F2F5',
              height: '4.4rem',
              borderRadius: '5rem',
            },
          }}
          onChange={(event) => getData(event.target.value)}
          onKeyDown={(event) => handleKeyDown(event)}
          onClick={() => {setOpen(true)}}
          {...others}
        />

        {open && (
          <MenuList
            style={{ position: 'absolute', backgroundColor: 'white', marginTop: '8px' }}
          >
            <MenuItem>
              <Avatar sx={{width: '3.5rem', height: '3.5rem'}}/>
              <Typography>Dibu</Typography>
              <IconButton>

              </IconButton>
            </MenuItem>
          </MenuList>
        )}
      </Box>
    </ClickAwayListener>
  );
}
