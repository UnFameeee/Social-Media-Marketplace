import { TextField, InputAdornment, IconButton } from '@mui/material';
import { useField } from 'formik';
import { useState } from 'react';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

export default function PasswordInputForm({ name, ...props }) {
  const [field, mata] = useField(name);
  const [showPassword, setShowPassword] = useState(false);

  const inputProps = {
    ...field,
    ...props,
    variant: 'standard',
  };

  if (mata && mata.touched && mata.error) {
    inputProps.error = true;
    inputProps.helperText = mata.error;
  }

  function handleClickShowPassword() {
    setShowPassword((prev) => !prev);
  }

  return (
    <TextField
      {...inputProps}
      sx={{
        width: '80%',
        margin: '12px',
      }}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              //aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? (
                <VisibilityOffOutlinedIcon sx={{transform: 'scale(1.3)'}}/>
              ) : (
                <VisibilityOutlinedIcon sx={{transform: 'scale(1.3)'}}/>
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
