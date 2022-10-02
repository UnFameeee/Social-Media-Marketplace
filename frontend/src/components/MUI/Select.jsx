import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
} from '@mui/material';

export default function Select(props) {
  const {
    variant = 'standard',
    name,
    label,
    value,
    onChange,
    options,
    noneOption = false,
  } = props;

  return (
    <FormControl variant={variant}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        label={label}
        name={name}
        value={value}
        onChange={onChange}
      >
        {noneOption && <MenuItem value="">None</MenuItem>}
        {
            options.map((item) => (
                <MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>
            ))
        }
      </MuiSelect>
    </FormControl>
  );
}
