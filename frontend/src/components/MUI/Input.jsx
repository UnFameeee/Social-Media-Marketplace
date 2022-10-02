import { TextField } from '@mui/material';

export default function Input(props) {
  const {
    variant = 'standard',
    name,
    label,
    value,
    onChange,
    ...other
  } = props;
  
  return (
    <TextField
      variant={variant}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...other}
    />
  );
}