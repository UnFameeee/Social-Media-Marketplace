import { Close } from '@mui/icons-material';
import {
  MenuList,
  MenuItem,
  Avatar,
  Typography,
} from '@mui/material';
import ReactTooltip from 'react-tooltip';
import { IconButtonWithoutBackground } from './Button/IconButton';

export default function Menu(props) {
  const { list, before, ...other } = props;

  return (
    <MenuList
      sx={{
        position: 'absolute',
        backgroundColor: 'white',
        marginTop: '0.8rem',
        width: '100%',
        borderRadius: '4px',
      }}
      {...other}
    >
      {before}
      {list.map((item, index) => {
        return (
          <MenuItem
            key={index}
            sx={{
              margin: '0.8rem 0.8rem 0 0.8rem',
              borderRadius: '8px',
              padding: '0.6rem 0.8rem',
              minHeight: '46px !important',
            }}
          >
            {item.left && (
              <Avatar
                sx={{ width: '3.5rem', height: '3.5rem' }}
                src={item.left}
              />
            )}

            {item.middle && (
              <>
                <Typography
                  data-tip
                  data-for={index.toString()}
                  sx={{
                    width: '16.5rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {item.middle}
                </Typography>

                <ReactTooltip id={index.toString()}>
                  {item.middle}
                </ReactTooltip>
              </>
            )}

            {item.right && (
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
            )}
          </MenuItem>
        );
      })}
    </MenuList>
  );
}
