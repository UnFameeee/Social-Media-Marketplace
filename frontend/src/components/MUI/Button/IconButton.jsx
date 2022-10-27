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
      <div className={className}>
        {hasBackground === true ? (
          <Avatar className="icon-button-with-background" {...other}>
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
      <div style={{ width: '14rem' }} className={className}>
        <Button className="button-with-icon" {...other}>
          {children}
        </Button>
      </div>
    </Tooltip>
  );
}
