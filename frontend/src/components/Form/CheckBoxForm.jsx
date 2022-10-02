import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from '@mui/material';
import { useField, useFormikContext } from 'formik';

export default function CheckBoxForm({
  name,
  label,
  legend,
  ...props
}) {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (evt) => {
    const { checked } = evt.target;
    setFieldValue(name, checked);
  };

  const checkBoxProps = {
    ...field,
    ...props,
    onChange: handleChange,
  };

  const formControlProps = {};
  if (meta && meta.touched && meta.error) {
    formControlProps.error = true;
  }

  return (
    <FormControl
      {...formControlProps}
      sx={{
        width: '80%',
        margin: '12px',
      }}
    >
      <FormLabel component="legend">{legend}</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              {...checkBoxProps}
              sx={{ marginLeft: '2px', transform: 'scale(1.3)' }}
            />
          }
          label={label}
        />
      </FormGroup>
    </FormControl>
  );
}
