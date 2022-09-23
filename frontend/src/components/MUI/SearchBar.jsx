import { TextField, IconButton, InputAdornment } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';

export default function SearchBar(props) {
  const { placeHolder, getData, handleSearch, ...others } = props;

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }
  
  return (
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
      {...others}
    />
  );
}
