import { useState } from 'react';
import { Box } from '@mui/material';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { Link, useNavigate } from 'react-router-dom';
import Face from '../../components/LookingFace/Face';
import { ValidateForm, FormChildren } from '../../components/Form';
import { loginModel, loginSchema } from './Auth.model';
import AuthService from './Auth.service';
import './Auth.css';

export default function Login() {
  const [valid, setValid] = useState(false);
  var navigate = useNavigate();

  return (
    <Box>
      <Face happy={valid} />
      <Box className="form-wrap">
        <Box sx={{ textAlign: 'center' }}>
          <ValidateForm
            initialValues={loginModel}
            validationSchema={loginSchema}
            onSubmit={(values) => {
              AuthService.login(values).then((value) => {
                if (value) {
                  navigate('/');
                }
              });
            }}
            handleValid={(isValid, dirty, touched) => {
              if (Object.keys(touched).length) {
                setValid(isValid && dirty);
              }
            }}
          >
            <h1 className="form-title">Login</h1>
            <FormChildren.InputForm
              name="email"
              label="Email"
              required
            />
            <FormChildren.PasswordInputForm
              name="password"
              label="Password"
              required
            />
            <FormChildren.CheckBoxForm
              name="remember"
              label="Remember Me"
              sx={{ textAlign: 'left' }}
            />
            <FormChildren.ButtonForm
              name="Login"
              disabled={!valid}
              startIcon={<LoginOutlinedIcon />}
            />
            <div className="form-bottom">
              You don't have an account yet?{' '}
              <Link className="form-bottom-special" to="/register">
                Register now
              </Link>
            </div>
          </ValidateForm>
        </Box>
      </Box>
    </Box>
  );
}
