import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { makeStyles } from "tss-react/mui";
import '../Layout.css';

const useStyles = makeStyles()(() => ({
  scroll: {
    '&::-webkit-scrollbar': {
      width: '1rem',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0)',
      borderRadius: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
    },
  },
}));

export default function LeftBar(props) {
  const { before, after, leftBarList, leftBarColor } = props;
  const { classes, cx } = useStyles();

  return (
    // #region oldCode
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
    // #endregion

    <Box
      className={cx(classes.scroll, `left-bar ${leftBarColor ? 'drop-shadow-md' : ''}`)}
      style={
        leftBarColor
          ? {
              backgroundColor: leftBarColor,
              boxShadow: '0 0 1px rgba(0,0,0,0.1)',
            }
          : null
      }
    >
      {before}

      {leftBarList && (
        <List>
          {leftBarList.map((item, index) => (
            <ListItem key={index} sx={{ padding: '0.8rem' }}>
              <ListItemButton
                onClick={item.onClick}
                className="left-bar-button"
              >
                <ListItemIcon>{item.iconName}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  className="left-bar-text"
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}

      {after}
    </Box>
  );
}
