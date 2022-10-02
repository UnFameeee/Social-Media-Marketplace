import { Form, Formik } from 'formik';
import InputForm from './InputForm';
import SelectForm from './SelectForm';
import DatePickerForm from './DatePickerForm';
import CheckBoxForm from './CheckBoxForm';
import ButtonForm from './ButtonForm';
import PasswordInputForm from './PasswordInputForm';
import NumberInputForm from './NumberInputForm';

export const FormChildren = {
  InputForm,
  SelectForm,
  DatePickerForm,
  CheckBoxForm,
  ButtonForm,
  PasswordInputForm,
  NumberInputForm,
};


export function ValidateForm(props) {
  const {
    initialValues,
    validationSchema,
    onSubmit,
    children,
    handleValid,
    ...other
   } = props;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values);
      }}
      {...other}
    >
      {({ isValid, dirty, touched }) => {
        handleValid(isValid, dirty, touched)
        return <Form>{children}</Form>;
      }}
    </Formik>
  );
}
