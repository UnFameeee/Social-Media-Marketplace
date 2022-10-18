import { IconButton, Avatar, Button } from '@mui/material';
import ReactTooltip from 'react-tooltip';
import { Helper } from '../../../utils/Helper';

export function BetterIconButton(props) {
  let id = Helper.generateId();
  const {
    children,
    tooltip,
    hasBackground = false,
    className,
    ...other
  } = props;  

  return (
    <>
      {hasBackground == true ? (
        <Avatar
          data-tip={tooltip ? true : null}
          data-for={tooltip ? id : null}
          className={`icon-button-with-background ${className}`}
          {...other}
        >
          {children}
        </Avatar>
      ) : (
        <IconButton
          data-tip={tooltip ? true : null}
          data-for={tooltip ? id : null}
          {...other}
        >
          {children}
        </IconButton>
      )}
      {tooltip && <ReactTooltip id={id}>{tooltip}</ReactTooltip>}
    </>
  );
}

export function ButtonWithIcon(props) {
  let id = Helper.generateId();
  const { children, tooltip, className, ...other } = props;

  return (
    <>
      <Button
        data-tip={tooltip ? true : null}
        data-for={tooltip ? id : null}
        className={`button-with-icon ${className}`}
        {...other}
      >
        {children}
      </Button>
      {tooltip && <ReactTooltip id={id}>{tooltip}</ReactTooltip>}
    </>
  );
}
