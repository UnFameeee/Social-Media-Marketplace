import { useState } from 'react';
import { Box } from '@mui/material';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { ValidateForm, FormChildren } from '../../components/Form';
import Face from '../../components/LookingFace/Face';
import { registerModel, registerSchema } from './Auth.model';
import AuthService from './Auth.service';
import './Auth.css';

export default function Register() {
  const [valid, setValid] = useState(false);
  var navigate = useNavigate();

  return (
    <Box>
      <Face happy={valid} />
      <Box className="form-wrap">
        <Box sx={{ textAlign: 'center' }}>
          <ValidateForm
            initialValues={registerModel}
            validationSchema={registerSchema}
            onSubmit={(values) => {
              AuthService.register(values).then((value) => {
                if (value) {
                  navigate('/login');
                }
              });
            }}
            handleValid={(isValid, dirty, touched) => {
              if (Object.keys(touched).length) {
                setValid(isValid && dirty);
              }
            }}
          >
            <h1 className="form-title">Register</h1>
            <FormChildren.InputForm
              name="profile_name"
              label="Username"
              required
            />
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
            <FormChildren.PasswordInputForm
              name="rePassword"
              label="Confirm Password"
              required
            />
            <FormChildren.DatePickerForm
              name="birth"
              label="Birth"
              disableFuture
              required
            />
            <FormChildren.ButtonForm
              name="Register"
              disabled={!valid}
              startIcon={<LoginOutlinedIcon />}
            />
            <div className="form-bottom">
              Already have an account? Back to{' '}
              <Link className="form-bottom-special" to="/login">
                Login
              </Link>
            </div>
          </ValidateForm>
        </Box>
      </Box>
    </Box>
  );
}
