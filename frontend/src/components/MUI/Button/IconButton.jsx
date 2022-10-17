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
          data-tip={id && tooltip ? true : null}
          data-for={id && tooltip ? id : null}
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
      {id && tooltip && (
        <ReactTooltip id={id}>{tooltip}</ReactTooltip>
      )}
    </>
  );
}

export function ButtonWithIcon(props) {
  const { id, children, tooltip, ...other } = props;

  return (
    <>
      <Button
        data-tip={id && tooltip ? true : null}
        data-for={id && tooltip ? id : null}
        className="button-with-icon"
        {...other}
      >
        {children}
      </Button>
      {id && tooltip && (
        <ReactTooltip id={id}>{tooltip}</ReactTooltip>
      )}
    </>
  );
}
