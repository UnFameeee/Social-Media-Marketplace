import {
  ClickAwayListener,
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material';
import { Search, Close } from '@mui/icons-material';
import { useState } from 'react';
import Menu from './Menu';

export default function SearchBar(props) {
  const [open, setOpen] = useState(false);

  const {
    placeHolder,
    getData,
    handleSearch,
    recentSearchs,
    ...others
  } = props;

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }
  return (
    <ClickAwayListener
      onClickAway={() => {
        setOpen(false);
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <TextField
          placeholder={placeHolder}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton
                  sx={{ padding: '0.4rem' }}
                  onClick={handleSearch}
                >
                  <Search sx={{ fontSize: '2.2rem' }} />
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
          onClick={() => {
            setOpen(true);
          }}
          {...others}
        />

        {open && recentSearchs && (
          <Menu
            list={recentSearchs}
            before={
              <Typography sx={{ marginLeft: '1.6rem' }}>
                Recent Searchs
              </Typography>
            }
            right={
              <IconButton
                id="recentSearchIcon"
                tooltip="Delete"
                sx={{
                  padding: '0.4rem',
                  position: 'absolute',
                  right: '0.8rem'
                }}
              >
                <Close sx={{ fontSize: '1.6rem' }} />
              </IconButton>
            }
          />
        )}
      </Box>
    </ClickAwayListener>
  );
}
