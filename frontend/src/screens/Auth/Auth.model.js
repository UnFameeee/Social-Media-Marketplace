import dayjs from 'dayjs';
import * as Yup from 'yup';

//#region register
export const registerModel = {
  profile_name: '',
  email: '',
  password: '',
  birth: dayjs().format('MM/DD/YYYY'),
};

export const registerSchema = Yup.object().shape({
  profile_name: Yup.string().required('Required'),
  password: Yup.string()
    .min(8, 'Your password length must between 8 - 50')
    .max(50, 'Your password length must between 8 - 50')
    .matches(
      /^.*((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      'Password must contain at least one uppercase, one lowercase, one number and one special case character'
    )
    .required('Required'),
  rePassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
  email: Yup.string()
    .email('Your email is invalid')
    .required('Required'),
  birth: Yup.date().required('Required'),
});
//#endregion

//#region Login
export const loginModel = {
  email: '',
  password: '',
};

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Your password length must between 8 - 50')
    .max(50, 'Your password length must between 8 - 50')
    .matches(
      /^.*((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      'Password must contain at least one uppercase, one lowercase, one number and one special case character'
    )
    .required('Required'),
});
//#endregion
