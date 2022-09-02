import dayjs from 'dayjs';
import * as Yup from 'yup';

export const registerModel = {
  profile_name: '',
  email: '',
  hashPassword: '',
  birth: dayjs().format('MM/DD/YYYY'),
};

export function setRegisterModel(values) {
  Object.entries(values).forEach(([key, value]) => {
    registerModel[key] = value
  })
}

//validation form
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

export const loginModel = {
  email: '',
  hashPassword: '',
};
