import {
  Button as MuiButton,
  createTheme,
  ThemeProvider,
} from '@mui/material';

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

  const btnTheme = createTheme({
    palette: {
      primary: {
        main: '#9a6de1',
      },
      secondary: {
        main: '#e5e7eb',
      },
    },
  });

  return (
    <ThemeProvider theme={btnTheme}>
      <MuiButton
        variant={variant}
        size={size}
        color={color}
        onClick={onClick}
        disabled={disabled}
        {...(pascalCase && { sx: { textTransform: 'none' } })}
        {...other}
      >
        {name || props.children}
      </MuiButton>
    </ThemeProvider>
  );
}
