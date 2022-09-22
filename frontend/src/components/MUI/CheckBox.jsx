import {
  FormControl,
  Checkbox,
  FormControlLabel,
} from '@mui/material';

export default function CheckBox(props) {
  const {
    name,
    label,
    value,
    onChange,
    color = 'primary',
    row,
    disabled = false,
    checked,
  } = props;
  
  return (
    <FormControl row={row}>
      <FormControlLabel
        control={
          <Checkbox
            color={color}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            checked={checked}
          />
        }
        label={label}
      />
    </FormControl>
  );
}
