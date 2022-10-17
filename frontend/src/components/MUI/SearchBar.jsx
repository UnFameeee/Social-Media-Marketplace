import {
  ClickAwayListener,
  TextField,
  IconButton,
  InputAdornment,
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
    menuConfig,
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
      <div style={{ position: 'relative' }}>
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

        {open && menuConfig.list.length ? (
          <Menu {...menuConfig} />
        ) : null}
      </div>
    </ClickAwayListener>
  );
}
