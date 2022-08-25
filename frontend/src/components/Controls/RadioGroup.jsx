import {
  FormControl,
  FormLabel,
  RadioGroup as MuiRadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

export default function RadioGroup(props) {
  const {
    name,
    label,
    value,
    onChange,
    items,
    color = 'primary',
    row,
  } = props;

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <MuiRadioGroup
        row={row}
        name={name}
        value={value}
        onChange={onChange}
      >
        {items.map((item) => (
          <FormControlLabel
            key={item.id}
            value={item.id}
            control={<Radio color={color} />}
            label={item.title}
          />
        ))}
      </MuiRadioGroup>
    </FormControl>
  );
}
