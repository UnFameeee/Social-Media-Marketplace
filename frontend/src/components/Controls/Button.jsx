import { Button as MuiButton } from '@mui/material';

export default function Button(props) {
  const {
    variant = 'contained',
    name,
    size = 'large',
    onClick,
    color = 'primary',
    disabled = false,
    pascalCase = true,
    ...other
  } = props;

  return (
    <MuiButton
      variant={variant}
      size={size}
      color={color}
      onClick={onClick}
      disabled={disabled}
      {...(pascalCase && { sx: { textTransform: 'none' } })}
      {...other}
    >
      {name}
    </MuiButton>
  );
}
