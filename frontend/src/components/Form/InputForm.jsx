import { TextField, Input } from '@mui/material';
import { useField } from 'formik';

export default function InputForm({name, ...props}) {
  const [field, mata] = useField(name);

  const inputProps = {
    ...field,
    ...props,
    variant: "standard",
  }
  
  if(mata && mata.touched && mata.error) {
    inputProps.error = true;
    inputProps.helperText = mata.error
  }

  return (
    <TextField
      {...inputProps}
      sx = {{
        width: '80%',
        margin: '12px'
      }}
    />
  );
}
