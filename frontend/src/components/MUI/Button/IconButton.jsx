import { IconButton, Avatar, Button } from '@mui/material';
import ReactTooltip from 'react-tooltip';

export function IconButtonWithoutBackground(props) {
  const { id, children, tooltip, ...other } = props;

  return (
    <>
      <IconButton data-tip data-for={id} {...other}>
        {children}
      </IconButton>
      <ReactTooltip id={id}>{tooltip}</ReactTooltip>
    </>
  );
}

export function IconButtonWithBackground(props) {
  const { id, children, tooltip, ...other } = props;

  return (
    <>
      <Avatar data-tip data-for={id} {...other}>
        {children}
      </Avatar>
      <ReactTooltip id={id}>{tooltip}</ReactTooltip>
    </>
  );
}

export function ButtonWithIcon(props) {
  const { id, children, tooltip, ...other } = props;

  return (
    <>
      <Button data-tip data-for={id} {...other}>
        {children}
      </Button>
      <ReactTooltip id={id}>{tooltip}</ReactTooltip>
    </>
  );
}
