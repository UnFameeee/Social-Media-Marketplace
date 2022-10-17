import {
  MenuList,
  MenuItem,
  Avatar,
  Typography,
} from '@mui/material';
import React from 'react';
import ReactTooltip from 'react-tooltip';
import { BetterIconButton } from './Button/IconButton';
import './MUI.css';

export default function Menu(props) {
  const { list, before, after, left, middle, right, ...other } =
    props;

  function checkPropsInObject(object, listProps, checkAll) {
    let res = checkAll;
    listProps.forEach((value) => {
      if (checkAll) {
        if (!object.hasOwnProperty(value)) {
          res = false;
        }
      } else {
        if (object.hasOwnProperty(value)) {
          res = true;
        }
      }
    });
    return res;
  }

  return (
    <MenuList className="menu" {...other}>
      {before}

      {list.map((item, index) => (
        <MenuItem key={index} className="menu-item">
          {React.isValidElement(left) ? (
            left
          ) : React.isValidElement(item.left) ? (
            item.left
          ) : typeof item.left == 'object' ? (
            checkPropsInObject(item.left, ['url', 'name'], false) ? (
              <Avatar
                className="left-menu"
                alt={item.left.name}
                src={item.left.url}
              >
                {item.left.name?.at(0)}
              </Avatar>
            ) : (
              checkPropsInObject(item.left, ['icon'], false) && (
                <BetterIconButton
                  id={item.left.id ? item.left.id + index : null}
                  tooltip={item.left.tooltip}
                  className="left-menu"
                  hasBackground={item.left.hasBackground}
                >
                  {item.left.icon}
                </BetterIconButton>
              )
            )
          ) : null}

          {React.isValidElement(middle) ? (
            middle
          ) : React.isValidElement(item.middle) ? (
            item.middle
          ) : typeof item.middle == 'object' ? (
            <>
              <Typography
                data-tip={item.middle.hasTooltip}
                data-for={item.middle.hasTooltip ? item.middle.text + index : null}
                sx={{
                  width: '16.5rem',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {item.middle.text}
              </Typography>

              {item.middle.hasTooltip && (
                <ReactTooltip id={item.middle.text + index}>
                  {item.middle.text}
                </ReactTooltip>
              )}
            </>
          ) : (
            <>
              <Typography
                sx={{
                  width: '16.5rem',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {item.middle}
              </Typography>
            </>
          )}

          {React.isValidElement(right)
            ? right
            : React.isValidElement(item.right)
            ? item.right
            : typeof item.right == 'object'
            ? checkPropsInObject(item.left, ['icon'], false) && (
                <BetterIconButton
                  id={item.right.id ? item.right.id + index : null}
                  tooltip={item.right.tooltip}
                  className="right-menu"
                  hasBackground={item.right.hasBackground}
                >
                  {item.right.icon}
                </BetterIconButton>
              )
            : null}
        </MenuItem>
      ))}

      {after}
    </MenuList>
  );
}
