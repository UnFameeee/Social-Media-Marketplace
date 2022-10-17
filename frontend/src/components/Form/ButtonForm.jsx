import { Button } from '@mui/material';

export default function ButtonForm({ name, ...otherProps }) {

  const configButton = {
    ...otherProps,
    type: 'submit',
    variant: 'contained',
    color: 'primary',
  };

  return (
    <Button
      {...configButton}
      sx={{
        width: '80%',
        margin: '12px',
        textTransform: 'none',
        fontSize: '1.8rem',
      }}
    >
      {name}
    </Button>
  );
}
