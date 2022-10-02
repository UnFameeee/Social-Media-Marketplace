import { TextField } from '@mui/material';
import { useField } from 'formik';

export default function NumberInputForm({
  name,
  min,
  max,
  ...props
}) {
  const [field, mata] = useField(name);

  const inputProps = {
    ...field,
    ...props,
    variant: 'standard',
  };

  if (mata && mata.touched && mata.error) {
    inputProps.error = true;
    inputProps.helperText = mata.error;
  }

  return (
    <TextField
      {...inputProps}
      type="number"
      InputProps={{ inputProps: { min: min, max: max } }}
      sx={{
        width: '80%',
        margin: '12px',
      }}
    />
  );
}
