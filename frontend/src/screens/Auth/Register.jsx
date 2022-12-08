import { useState } from 'react';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { ValidateForm, FormChildren } from '../../components/Form';
import Face from '../../components/LookingFace/Face';
import { registerModel, registerSchema } from './Auth.model';
import { register } from '../../redux/apiRequest';
import './Auth.css';

export default function Register() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from.pathname || '/';

  const [valid, setValid] = useState(false);

  const isLoadingRegister = useSelector(
    (state) => state.auth?.register?.isFetching
  );

  return (
    <>
      {isLoadingRegister ? (
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
                initialValues={registerModel}
                validationSchema={registerSchema}
                onSubmit={(values) => {
                  register(values, dispatch, navigate, from);
                }}
                handleValid={(data) => {
                  setValid(data);
                }}
              >
                <h1 className="form-title">Register</h1>
                <FormChildren.InputForm
                  name="profile_name"
                  label="Username"
                  required
                  autoComplete="username"
                />
                <FormChildren.InputForm
                  name="email"
                  label="Email"
                  required
                />
                <FormChildren.InputForm
                  type="password"
                  name="password"
                  label="Password"
                  required
                  autoComplete="new-password"
                />
                <FormChildren.InputForm
                  type="password"
                  name="rePassword"
                  label="Confirm Password"
                  required
                  autoComplete="new-password"
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
            </div>
          </div>
        </>
      )}
    </>
  );
}
