import { useState } from 'react';
import Face from '../../components/LookingFace/Face';
import { Form, useForm } from '../../hooks/useForm';
import Controls from '../../components/Controls/Controls';
import { Grid } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const initialValues = {
  email: '',
  password: '',
  gender: 'male',
  role: '',
};

const genderItems = [
  { id: 'male', title: 'Male' },
  { id: 'female', title: 'Female' },
  { id: 'other', title: 'Other' },
];

const selectItems = [
  { id: 'user', title: 'User' },
  { id: 'manager', title: 'Manager' },
  { id: 'admin', title: 'Admin' },
];

const useStyles = makeStyles()((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1),
    },
  },
}));

export default function Auth() {
  const [valid, setValid] = useState(false);

  const { values, setValues, handleInputChange } =
    useForm(initialValues);

  const { classes } = useStyles();
  
  return (
    <div className="auth">
      {/* <Face happy={valid} /> */}
      <Form style={classes}>
        <Grid container>
          <Grid item xs={6}>
            <Controls.Input
              name="email"
              label="Email"
              value={values.email}
              onChange={handleInputChange}
            />
            <Controls.Input
              name="password"
              label="Password"
              value={values.password}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Controls.RadioGroup
              name="gender"
              label="Gender"
              value={values.gender}
              onChange={handleInputChange}
              items={genderItems}
              row
            />
            <Controls.Select
              name="role"
              label="Role"
              value={values.role}
              onChange={handleInputChange}
              options={selectItems}
            />
          </Grid>
        </Grid>
      </Form>
    </div>
  );
}
