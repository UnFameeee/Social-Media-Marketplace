import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(() => ({
  root: {
    '& .MuiSvgIcon-root': {
      color: 'var(--primary-color)',
      fontSize: '3rem',
      marginLeft: '0.8rem',
      marginBottom: '0.3rem',
    },
    '& .MuiButtonBase-root': {
      padding: '0.8rem 0',
      '&:hover': {
        borderRadius: '8px',
      },
    },
    '& .MuiTypography-root': {
      fontSize: '1.8rem !important',
      fontWeight: '500',
    },
  },
  scrollBar: {
    '&::-webkit-scrollbar': {
      width: '1rem',
    },
    //cái đường dài chứa thanh kéo
    '&::-webkit-scrollbar-track': {
      WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      borderRadius: '8px',
    },
    //thanh kéo
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      borderRadius: '8px',
    },
  },
}));

export default function LeftBar({ leftBarList }) {
  const { classes } = useStyles();
  return (
    <Box
      sx={{
        width: '18%',
        height: '100vh',
        // bgcolor: 'white',
        overflow: 'scroll',
        position: 'fixed',
      }}
      className={classes.scrollBar}
    >
      <List>
        {leftBarList &&
          leftBarList.map((item, index) => (
            <ListItem
              key={index}
              sx={{ padding: '0.8rem' }}
              className={classes.root}
            >
              <ListItemButton onClick={item.onClick}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Box>
  );
}
