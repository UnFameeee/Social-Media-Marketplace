import { IconButton, Avatar, Button, Tooltip } from '@mui/material';

export function BetterIconButton(props) {
  const {
    children,
    tooltip,
    hasBackground = false,
    className,
    ...other
  } = props;

  return (
    <Tooltip title={tooltip ?? ''}>
      <div>
        {hasBackground === true ? (
          <Avatar
            className={`icon-button-with-background ${className}`}
            {...other}
          >
            {children}
          </Avatar>
        ) : (
          <IconButton {...other}>{children}</IconButton>
        )}
      </div>
    </Tooltip>
  );
}

export function ButtonWithIcon(props) {
  const { children, tooltip, className, ...other } = props;

  return (
    <Tooltip title={tooltip ?? ''}>
      <div>
        <Button
          className={`button-with-icon ${className}`}
          {...other}
        >
          {children}
        </Button>
      </div>
    </Tooltip>
  );
}
