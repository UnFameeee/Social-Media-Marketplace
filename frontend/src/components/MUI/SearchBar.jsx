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
import { Search, Close } from '@mui/icons-material';
import { useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import ReactTooltip from 'react-tooltip';
import { IconButtonWithoutBackground } from './Button/IconButton';

const useStyles = makeStyles()(() => ({
  root: {
    '& .MuiAvatar-root': {
      // cursor: 'pointer',
      // color: '#050505',
      // backgroundColor: '#E4E6EB',
      marginRight: '0.8rem',
      '&:hover': { backgroundColor: '#E4E6EB' },
    },
  },
}));

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

  const { classes } = useStyles();
  return (
    <ClickAwayListener
      onClickAway={() => {
        setOpen(false);
      }}
    >
      <Box sx={{ position: 'relative' }} className={classes.root}>
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
          <MenuList
            style={{
              position: 'absolute',
              backgroundColor: 'white',
              marginTop: '0.8rem',
              width: '100%',
              borderRadius: '4px',
            }}
          >
            <Typography sx={{ marginLeft: '1.6rem' }}>
              Recent Searchs
            </Typography>

            {recentSearchs.map((item, index) => (
              <MenuItem
                key={index}
                sx={{
                  margin: '0.8rem 0.8rem 0 0.8rem',
                  borderRadius: '8px',
                  padding: '0.6rem 0.8rem',
                  minHeight: '46px !important',
                }}
              >
                {item.url && (
                  <Avatar
                    sx={{ width: '3.5rem', height: '3.5rem' }}
                    src={item.url}
                  />
                )}
                <Typography
                  data-tip
                  data-for={index.toString()}
                  sx={{
                    width: '16.5rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {item.name}
                </Typography>
                <IconButtonWithoutBackground
                  id="recentSearchIcon"
                  tooltip="Delete"
                  sx={{
                    padding: '0.4rem',
                    position: 'absolute',
                    right: '0.8rem',
                    // '&:hover': {backgroundColor: '#bdbdbd'}
                  }}
                >
                  <Close sx={{ fontSize: '1.6rem' }} />
                </IconButtonWithoutBackground>

                <ReactTooltip id={index.toString()}>
                  {item.name}
                </ReactTooltip>
              </MenuItem>
            ))}
          </MenuList>
        )}
      </Box>
    </ClickAwayListener>
  );
}
