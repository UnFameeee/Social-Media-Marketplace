import { useState } from 'react';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Face from '../../components/LookingFace/Face';
import { ValidateForm, FormChildren } from '../../components/Form';
import { loginModel, loginSchema } from './Auth.model';
import './Auth.css';
import { login } from '../../redux/apiRequest';

export default function Login() {
  const dispatch = useDispatch();
  const location = useLocation();
  const from = location.state?.from.pathname || '/';
  let navigate = useNavigate();

  const [valid, setValid] = useState(false);

  return (
    <div>
      <Face happy={valid} left="25%" />
      <div className="form-wrap">
        <div style={{ textAlign: 'center' }}>
          <ValidateForm
            initialValues={loginModel}
            validationSchema={loginSchema}
            onSubmit={(values) => {
              login(values, dispatch, navigate, from);
            }}
            handleValid={(props) => {
              if (Object.keys(props.touched).length) {
                setValid(props.isValid && props.dirty);
              }
            }}
          >
            <h1 className="form-title">Login</h1>
            <FormChildren.InputForm
              name="email"
              label="Email"
              required
              autoComplete="username"
            />
            <FormChildren.PasswordInputForm
              name="password"
              label="Password"
              required
              autoComplete="current-password"
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
        </div>
      </div>
    </div>
  );
}
