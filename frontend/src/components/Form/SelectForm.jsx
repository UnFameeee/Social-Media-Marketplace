import { TextField, MenuItem } from '@mui/material';
import { useField, useFormikContext } from 'formik';

export default function SelectForm({ name, options, ...props }) {
  const { setFieldValue } = useFormikContext();
  const [field, mata] = useField(name);

  const handleChange = (event) => {
    const { value } = event.target;
    setFieldValue(name, value);
  };

  const selectProps = {
    ...field,
    ...props,
    select: true,
    variant: 'outlined',
    onChange: handleChange,
  };

  if (mata && mata.touched && mata.error) {
    selectProps.error = true;
    selectProps.helperText = mata.error;
  }

  return (
    <TextField
      {...selectProps}
      sx={{
        width: '80%',
        margin: '12px',
      }}
    >
      {Object.keys(options).map((item, index) => {
        return (
          <MenuItem key={index} value={item}>
            {options[item]}
          </MenuItem>
        );
      })}
    </TextField>
  );
}
