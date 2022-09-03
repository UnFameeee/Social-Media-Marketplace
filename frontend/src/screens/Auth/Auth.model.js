import dayjs from 'dayjs';
import * as Yup from 'yup';

//#region register
export const registerModel = {
  profile_name: '',
  email: '',
  hashPassword: '',
  birth: dayjs().format('MM/DD/YYYY'),
};

export function setRegisterModel(values) {
  Object.entries(values).forEach(([key, value]) => {
    registerModel[key] = value;
  });
}

export const registerSchema = Yup.object().shape({
  profile_name: Yup.string().required('Required'),
  hashPassword: Yup.string()
    .min(8, 'Your password length must between 8 - 50')
    .max(50, 'Your password length must between 8 - 50')
    .required('Required'),
  rePassword: Yup.string()
    .oneOf([Yup.ref('hashPassword'), null], 'Passwords must match')
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
  hashPassword: '',
};

export function setLoginModel(values) {
  Object.entries(values).forEach(([key, value]) => {
    loginModel[key] = value;
  });
}

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Required'),
  hashPassword: Yup.string()
    .min(8, 'Your password length must between 8 - 50')
    .max(50, 'Your password length must between 8 - 50')
    .required('Required'),
});
//#endregion