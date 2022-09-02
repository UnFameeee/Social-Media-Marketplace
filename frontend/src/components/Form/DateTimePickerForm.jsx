import { TextField } from '@mui/material';
import { useField } from 'formik';

export default function DateTimePicker({ name, ...props }) {
  const [field, meta] = useField(name);

  const dateTimePickerProps = {
    ...field,
    ...props,
    type: 'date',
    variant: 'outlined',
    InputLabelProps: {
      shrink: true,
    },
  };

  if (meta && meta.touched && meta.error) {
    dateTimePickerProps.error = true;
    dateTimePickerProps.helperText = meta.error;
  }

  return (
    <TextField
      {...dateTimePickerProps}
      sx={{ width: '80%', margin: '12px' }}
    />
  );
}
