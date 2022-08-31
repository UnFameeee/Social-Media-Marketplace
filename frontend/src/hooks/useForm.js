import { useState } from 'react';
import { makeStyles } from 'tss-react/mui';

export function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
  };
}


const useStyles = makeStyles()((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1.3),
    },
  },
}));

export function Form(props) {
  const { classes } = useStyles();
  return (
    <form className={classes.root}>
        {props.children}
    </form>
  );
}
