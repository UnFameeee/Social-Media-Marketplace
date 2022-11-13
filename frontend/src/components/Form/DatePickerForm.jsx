import { useField, useFormikContext } from 'formik';
import { TextField } from '@mui/material';
import {
  DatePicker,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export default function DatePickerForm({ name, required=false, ...props }) {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (value) => {
    setFieldValue(name, dayjs(value).format('MM/DD/YYYY'));
  };

  const dateTimePickerProps = {
    ...field,
    ...props,
    onChange: handleChange,
  };

  if (meta && meta.touched && meta.error) {
    dateTimePickerProps.error = true;
    dateTimePickerProps.helperText = meta.error;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        {...dateTimePickerProps}
        inputFormat="MM/DD/YYYY"
        PopperProps={{
          sx: {
            svg: { transform: 'scale(1.3)' },
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            sx={{
              width: '80%',
              margin: '12px',
              svg: { transform: 'scale(1.3)' },
            }}
            required={required}
          />
        )}
      />
    </LocalizationProvider>
  );
}
