import { IconButton, Avatar, Button } from '@mui/material';
import ReactTooltip from 'react-tooltip';

export function BetterIconButton(props) {
  const {
    id,
    children,
    tooltip,
    hasBackground = false,
    ...other
  } = props;

  return (
    <>
      {hasBackground == true ? (
        <Avatar
          data-tip
          data-for={id}
          className="icon-button-with-background"
          {...other}
        >
          {children}
        </Avatar>
      ) : (
        <IconButton data-tip data-for={id} {...other}>
          {children}
        </IconButton>
      )}
      {tooltip && <ReactTooltip id={id}>{tooltip}</ReactTooltip>}
    </>
  );
}

export function ButtonWithIcon(props) {
  const { id, children, tooltip, ...other } = props;

  return (
    <>
      <Button
        data-tip
        data-for={id}
        className="button-with-icon"
        {...other}
      >
        {children}
      </Button>
      <ReactTooltip id={id}>{tooltip}</ReactTooltip>
    </>
  );
}
