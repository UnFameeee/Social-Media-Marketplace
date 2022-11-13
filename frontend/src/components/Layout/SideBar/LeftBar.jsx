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
import styled from 'styled-components';
const ResponSiveDiv = styled.div`
  @media screen and (max-width: 940px) {
    .left-bar {
      width: 75px;
    }
    .left-bar-text {
      display: none;
    }
  }
`;
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

  const {
    leftBarList,
    before,
    after,
    classNameConfig = {},
    leftBarColor,
  } = props;

  const { listWrapper = '', listClassname = '' } = classNameConfig;

  return (
    <Box
      className={`left-bar ${
        leftBarColor ? 'drop-shadow-md' : ''
      } ${listWrapper}`}
      style={
        leftBarColor
          ? {
              backgroundColor: leftBarColor,
              // boxShadow: '0 0 1px rgba(0,0,0,0.1)',
            }
          : null
      }
    >
      {before}

      <List
        className={cx(
          classes.scroll,
          `left-bar-list ${listClassname}`
        )}
      >
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

      {after}
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

            {Helper.checkPropsInObject(
              item,
              ['left', 'middle', 'right'],
              false
            ) && (
              <ListItem className="list">
                {item.navigate ? (
                  <Link
                    to={item.navigate}
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
                      index === leftBarList.length - 1 &&
                      multiList >= 0
                        ? 'multi'
                        : ''
                    }`}
                  />
                )}
              </ListItem>
            )}
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
      disabled={item.disabled}
      className={`left-bar-button ${classNameConfig}`}
    >
      {item.left && (
        <ListItemIcon
          className={`left ${item.selected ? 'selected' : ''}`}
        >
          {Helper.checkPropsInObject(
            item.left,
            ['iconButton'],
            false
          ) ? (
            <Avatar className="rounded">{item.left.icon}</Avatar>
          ) : Helper.checkPropsInObject(
              item.left,
              ['url', 'name'],
              false
            ) ? (
            <Avatar alt={item.left.name} src={item.left.url}>
              {item.left.name?.at(0)}
            </Avatar>
          ) : (
            item.left
          )}
        </ListItemIcon>
      )}

      <ListItemText className="left-bar-text">
        {item.middle}
      </ListItemText>

      {item.right && (
        <ListItemIcon className="right">{item.right}</ListItemIcon>
      )}
    </ListItemButton>
  );
}
