import {
  ClickAwayListener,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import Menu from './Menu';
import { Helper } from '../../utils/Helper';
import { BetterIconButton } from './Button/IconButton';

export default function SearchBar(props) {
  const {
    placeHolder,
    getData,
    handleSearch,
    menuConfig,
    toggleProps,
    ...others
  } = props;

  return (
    <ClickAwayListener
      onClickAway={() => {
        toggleProps[1](false);
      }}
    >
      <div style={{ position: 'relative' }}>
        <TextField
          id="searchBar"
          autoComplete="off"
          placeholder={placeHolder}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BetterIconButton
                  sx={{ padding: '0.4rem' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSearch();
                  }}
                >
                  <Search sx={{ fontSize: '2.2rem' }} />
                </BetterIconButton>
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
          onKeyDown={(event) =>
            Helper.handleEnterKeyPress(event, handleSearch)
          }
          onClick={() => toggleProps[1](true)}
          {...others}
        />

        {toggleProps[0] && menuConfig?.list?.length ? (
          <Menu {...menuConfig} />
        ) : null}
      </div>
    </ClickAwayListener>
  );
}
