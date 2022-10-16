import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import '../Layout.css';

export default function LeftBar({ leftBarList }) {
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

    <Box className="left-bar">
      {leftBarList && (
        <List>
          {leftBarList.map((item, index) => (
            <ListItem
              key={index}
              sx={{ padding: '0.8rem' }}
            >
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
    </Box>
  );
}
