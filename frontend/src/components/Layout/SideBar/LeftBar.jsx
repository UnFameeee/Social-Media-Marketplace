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
    // <>
    //   <div className="w-full flex justify-center">
    //     <button className="w-[80%] px-[4rem] py-[1.5rem] bg-blue8f3 text-white rounded-md my-[5%]">
    //       Create New
    //     </button>
    //   </div>
    //   <div className="listFunction flex ">
    //     <ul className="flex flex-col justify-center w-full gap-[0.5rem]">
    //       {props.listFeature.map((feature, index) => {
    //         return (
    //           <li key={index} className="leftHomeSideBarLi ">
    //             <div className={classes.root}>{feature.iconName}</div>
    //             <div>
    //               <span className="text-[2rem]">{feature.text}</span>
    //             </div>
    //           </li>
    //         );
    //       })}
    //     </ul>
    //   </div>
    // </>
    
    <Box
      sx={{
        width: '18%',
        height: 'calc(100vh - var(--navbar-height))',
        overflowY: 'scroll',
        position: 'fixed',
        bottom: 0,
      }}
      className={classes.scrollBar}
    >
      {leftBarList && (
        <List>
          {leftBarList.map((item, index) => (
            <ListItem
              key={index}
              sx={{ padding: '0.8rem' }}
              className={classes.root}
            >
              <ListItemButton onClick={item.onClick}>
                <ListItemIcon>{item.iconName}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}
