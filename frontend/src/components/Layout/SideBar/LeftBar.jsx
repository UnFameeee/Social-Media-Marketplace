import React from 'react';
import {
  Box,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { Link } from 'react-router-dom';
import { Helper } from '../../../utils/Helper';
import MiddleHr from '../../FullWidthHr/MiddleHr';
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
  const { classes, cx } = useStyles();

  const { leftBarList, classNameConfig = {}, leftBarColor } = props;

  const { listWrapper, listClassname } = classNameConfig;

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
      className={cx(
        classes.scroll,
        `left-bar ${
          leftBarColor ? 'drop-shadow-md' : ''
        } ${listWrapper}`
      )}
      style={
        leftBarColor
          ? {
              backgroundColor: leftBarColor,
              // boxShadow: '0 0 1px rgba(0,0,0,0.1)',
            }
          : null
      }
    >
      <List className={listClassname}>
        {Helper.isArrayList(leftBarList)
          ? leftBarList.map((list, index) => {
              return (
                <ul key={index}>
                  <LeftBarList leftBarList={list} multiList={index} />
                  {index !== leftBarList.length - 1 && <MiddleHr />}
                </ul>
              );
            })
          : Array.isArray(leftBarList) && (
              <LeftBarList leftBarList={leftBarList} />
            )}
      </List>
    </Box>
  );
}

function LeftBarList({ leftBarList, multiList }) {
  return (
    <>
      {leftBarList.map((item, index) => {
        return (
          <div key={index}>
            {item.title && (
              <div
                className={`left-bar-title ${
                  multiList ? 'second' : ''
                }`}
              >
                {item.title}
              </div>
            )}
            <ListItem className="list">
              {item.navigate ? (
                <Link
                  to={`${item.navigate}`}
                  style={{ width: '100%' }}
                  disabled={item.disabled}
                >
                  <LeftBarListItem
                    item={item}
                    classNameConfig={`${
                      index === leftBarList.length - 1 &&
                      multiList >= 0
                        ? 'multi'
                        : ''
                    }`}
                  />
                </Link>
              ) : (
                <LeftBarListItem
                  item={item}
                  classNameConfig={`${
                    index === leftBarList.length - 1 && multiList >= 0
                      ? 'multi'
                      : ''
                  }`}
                />
              )}
            </ListItem>
            {item.after}
          </div>
        );
      })}
    </>
  );
}

function LeftBarListItem({ item, classNameConfig }) {
  return (
    <ListItemButton
      onClick={item.onClick}
      selected={item.selected}
      className={`left-bar-button ${classNameConfig}`}
    >
      {item.left && (
        <ListItemIcon
          className={`left ${item.selected ? 'selected' : ''}`}
        >
          {typeof item.left == 'object' && item.left.iconButton ? (
            <Avatar className="rounded">{item.left.icon}</Avatar>
          ) : (
            item.left
          )}
        </ListItemIcon>
      )}

      {React.isValidElement(item.middle) ? (
        item.middle
      ) : (
        <ListItemText
          primary={item.middle}
          className="left-bar-text"
        />
      )}

      {item.right && (
        <ListItemIcon className="right">{item.right}</ListItemIcon>
      )}
    </ListItemButton>
  );
}
