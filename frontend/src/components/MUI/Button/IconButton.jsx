import { IconButton, Avatar, Button } from '@mui/material';
import ReactTooltip from 'react-tooltip';

export function BetterIconButton(props) {
  const {
    id,
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
          data-tip={id && tooltip ? true : null}
          data-for={id && tooltip ? id : null}
          className={`icon-button-with-background ${className}`}
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
  const { id, children, tooltip, className, ...other } = props;

  return (
    <>
      <Button
        data-tip={id && tooltip ? true : null}
        data-for={id && tooltip ? id : null}
        className={`button-with-icon ${className}`}
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
