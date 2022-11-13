import { TextField, MenuItem, Autocomplete } from '@mui/material';
import { useField, useFormikContext } from 'formik';

export default function SelectForm({
  search = false,
  name,
  label,
  noneOption = false,
  options = [],
  ...props
}) {
  const { setFieldValue } = useFormikContext();
  const [field, mata] = useField(name);

  const handleChange = (event) => {
    const { value } = event.target;
    setFieldValue(name, value);
  };

  const selectProps = {
    ...field,
    ...props,
    variant: 'standard',
  };

  if (mata && mata.touched && mata.error) {
    selectProps.error = true;
    selectProps.helperText = mata.error;
  }

  return (
    <>
      {!search ? (
        <TextField
          {...selectProps}
          label={label}
          select
          onChange={handleChange}
          sx={{
            width: '80%',
            margin: '12px',
          }}
        >
          {noneOption && <MenuItem value="">None</MenuItem>}
          {options?.map((item, index) => {
            return (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            );
          })}
        </TextField>
      ) : (
        <Autocomplete
          sx={{
            width: '80%',
            margin: '12px',
            '& .MuiSvgIcon-root': {
              fontSize: '2rem',
            },
          }}
          {...selectProps}
          disablePortal
          autoHighlight
          openOnFocus
          options={options}
          onChange={(event, value) => setFieldValue(name, value)}
          renderInput={(params) => (
            <TextField label={label} variant="standard" {...params} />
          )}
        />
      )}
    </>
  );
}
