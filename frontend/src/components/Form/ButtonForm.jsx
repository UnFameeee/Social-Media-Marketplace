import { Button } from '@mui/material';
import { useFormikContext } from 'formik';

export default function ButtonForm({ name, ...otherProps }) {
  const { submitForm } = useFormikContext();

  const handleSubmit = () => {
    submitForm();
  };

  const configButton = {
    ...otherProps,
    variant: 'contained',
    color: 'primary',
    onClick: handleSubmit,
  };

  return (
    <Button
      {...configButton}
      sx={{
        width: '80%',
        margin: '12px',
        textTransform: 'none',
        fontSize: '18px',
      }}
    >
      {name}
    </Button>
  );
}
