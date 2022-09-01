import { useState } from 'react';
import { Box } from '@mui/material';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Face from '../../components/LookingFace/Face';
import CustomForm from '../../components/Form';

const initialValues = {
  username: '',
  password: '',
  repassword: '',
};

const schema = Yup.object().shape({
  username: Yup.string()
    .email('Please enter a valid email')
    .required('Required'),
  password: Yup.string().required('Required'),
  repassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

export default function Register() {
  const [valid, setValid] = useState(true);

  return (
    <Box>
      <Face happy={valid} />
      <Box
        sx={{
          position: 'fixed',
          top: '50%',
          right: '25%',
          width: '25vw',
          borderRadius: '10px',
          padding: '20px',
          background: 'white',
          transform: 'translateY(-50%)',
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ isValid, dirty, touched }) => {
              if (!!Object.keys(touched).length) {
                setValid(isValid && dirty);
              } else {
                setValid(true);
              }
              return (
                <Form>
                  <h1
                    style={{
                      margin: 0,
                      padding: '18px 0',
                      fontSize: '36px',
                      color: 'var(--primary-color)',
                      lineHeight: '36px',
                      fontWeight: 900,
                    }}
                  >
                    Register
                  </h1>
                  <CustomForm.InputForm
                    name="username"
                    label="Username"
                    required
                  />
                  <CustomForm.PasswordInputForm
                    name="password"
                    label="Password"
                    required
                  />
                  <CustomForm.PasswordInputForm
                    name="repassword"
                    label="Confirm Password"
                    required
                  />
                  <CustomForm.ButtonForm
                    name="Register"
                    disabled={!(isValid && dirty)}
                    startIcon={<LoginOutlinedIcon />}
                  />
                  <div
                    style={{
                      color: '#b3b3b3',
                      paddingBottom: '20px',
                    }}
                  >
                    Already have an account? Back to{' '}
                    <Link
                      to="/login"
                      style={{
                        color: 'var(--primary-color',
                        fontWeight: 600,
                      }}
                    >
                      Login
                    </Link>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
}
