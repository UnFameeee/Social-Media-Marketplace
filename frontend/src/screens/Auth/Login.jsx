import { useState } from 'react';
import { Box } from '@mui/material';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import Face from '../../components/LookingFace/Face';
import CustomForm from '../../components/Form';
import { loginModel, loginSchema } from './Auth.model';
import AuthService from './Auth.service';

export default function Login() {
  const [valid, setValid] = useState(true);
  var navigate = useNavigate();

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
            initialValues={loginModel}
            validationSchema={loginSchema}
            onSubmit={(values) => {
              AuthService.login(values).then(value => {
                if(value) {
                  navigate('/')
                }
              })
            }}
          >
            {({ isValid, dirty, touched }) => {
              if(!!Object.keys(touched).length){
                setValid(isValid && dirty)
              }
              return (
                <Form>
                  <h1
                    style={{
                      margin: 0,
                      padding: '18px 0',
                      fontSize: '3.6rem',
                      color: 'var(--primary-color)',
                      lineHeight: '3.6rem',
                      fontWeight: 900,
                    }}
                  >
                    Login
                  </h1>
                  <CustomForm.InputForm
                    name="email"
                    label="Email"
                    required
                  />
                  <CustomForm.PasswordInputForm
                    name="password"
                    label="Password"
                    required
                  />
                  <CustomForm.CheckBoxForm
                    name="remember"
                    label="Remember Me"
                    sx={{ textAlign: 'left' }}
                  />
                  <CustomForm.ButtonForm
                    name="Login"
                    disabled={!(isValid && dirty)}
                    startIcon={<LoginOutlinedIcon />}
                  />
                  <div
                    style={{
                      color: '#b3b3b3',
                      paddingBottom: '20px',
                    }}
                  >
                    You don't have an account yet?{' '}
                    <Link
                      to="/register"
                      style={{
                        color: 'var(--primary-color)',
                        fontWeight: 600,
                      }}
                    >
                      Register now
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
