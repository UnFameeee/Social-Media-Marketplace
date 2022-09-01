import { useState } from 'react';
import { Box, Grid } from '@mui/material';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import Face from '../../components/LookingFace/Face';
import { Form, useForm } from '../../hooks/useForm';
import Controls from '../../components/Controls';
import { Link } from 'react-router-dom';

const initialValues = {
  username: '',
  password: '',
  remember: false,
};
export default function Auth() {
  const [valid, setValid] = useState(false);

  const { values, setValues, handleInputChange } =
    useForm(initialValues);

  return (
    <Box>
      <Face happy />
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
        <Form>
          <Box sx={{ textAlign: 'center' }}>
            <h1
              style={{
                margin: 0,
                padding: '18px 0',
                fontSize: '36px',
                color: 'var(--primary-color)',
                lineHeight: '36px',
              }}
            >
              Login
            </h1>
            <Controls.Input
              name="username"
              label="Username"
              value={values.username}
              onChange={handleInputChange}
            />
            <Controls.Input
              name="password"
              label="Password"
              value={values.password}
              onChange={handleInputChange}
            />
            <Controls.CheckBox
              name="remember"
              label="Remember Me"
              value={values.remember}
              onChange={handleInputChange}
            />
            <Controls.Button
              text="Login"
              type="submit"
              sx={{
                textTransform: 'none',
                margin: '12px 0',
                width: '80%',
                fontSize: 18,
              }}
              startIcon={<LoginOutlinedIcon />}
            />
            <div
              style={{
                color: '#b3b3b3',
                paddingBottom: '20px',
              }}
            >
              You don't have an account yet? Want to{' '}
              <span
                style={{
                  color: 'var(--primary-color',
                  fontWeight: 600,
                }}
              >
                Join
              </span>{' '}
              us?
            </div>
          </Box>
        </Form>
      </Box>
    </Box>
  );
}
