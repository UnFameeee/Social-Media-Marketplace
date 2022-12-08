import { useState } from 'react';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import Face from '../../components/LookingFace/Face';
import { ValidateForm, FormChildren } from '../../components/Form';
import { loginModel, loginSchema } from './Auth.model';
import { login } from '../../redux/apiRequest';
import './Auth.css';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || '/';

  const [valid, setValid] = useState(false);

  const isLoadingLogin = useSelector(
    (state) => state.auth?.login?.isFetching
  );

  return (
    <>
      {isLoadingLogin ? (
        <div
          style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress
            style={{
              width: '6rem',
              height: '6rem',
              color: 'var(--primary-color)',
            }}
          />
        </div>
      ) : (
        <>
          <Face happy={valid} left="25%" />
          <div className="form-wrap">
            <div style={{ textAlign: 'center' }}>
              <ValidateForm
                initialValues={loginModel}
                validationSchema={loginSchema}
                onSubmit={(values) => {
                  login(values, dispatch, navigate, from);
                }}
                handleValid={(data) => {
                  setValid(data);
                }}
              >
                <h1 className="form-title">Login</h1>
                <FormChildren.InputForm
                  name="email"
                  label="Email"
                  required
                  autoComplete="username"
                />
                <FormChildren.InputForm
                  type="password"
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
                  <Link
                    className="form-bottom-special"
                    to="/register"
                  >
                    Register now
                  </Link>
                </div>
              </ValidateForm>
            </div>
          </div>
        </>
      )}
    </>
  );
}
