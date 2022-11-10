import { useState } from 'react';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ValidateForm, FormChildren } from '../../components/Form';
import Face from '../../components/LookingFace/Face';
import { registerModel, registerSchema } from './Auth.model';
import './Auth.css';
import { register } from '../../redux/apiRequest';

export default function Register() {
  const dispatch = useDispatch();
  const location = useLocation();
  const from = location.state?.from.pathname || '/';
  var navigate = useNavigate();

  const [valid, setValid] = useState(false);

  return (
    <div>
      <Face happy={valid} left="25%" />
      <div className="form-wrap">
        <div style={{ textAlign: 'center' }}>
          <ValidateForm
            initialValues={registerModel}
            validationSchema={registerSchema}
            onSubmit={(values) => {
              register(values, dispatch, navigate, from);
            }}
            handleValid={(props) => {
              if (Object.keys(props.touched).length) {
                setValid(props.isValid && props.dirty);
              }
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
            <FormChildren.PasswordInputForm
              name="password"
              label="Password"
              required
              autoComplete="new-password"
            />
            <FormChildren.PasswordInputForm
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
    </div>
  );
}
