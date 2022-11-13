import { Form, Formik } from 'formik';
import InputForm from './InputForm';
import SelectForm from './SelectForm';
import DatePickerForm from './DatePickerForm';
import CheckBoxForm from './CheckBoxForm';
import ButtonForm from './ButtonForm';

export const FormChildren = {
  InputForm,
  SelectForm,
  DatePickerForm,
  CheckBoxForm,
  ButtonForm,
};

export function ValidateForm(props) {
  const {
    initialValues,
    validationSchema,
    onSubmit,
    children,
    style = {},
    className,
    handleValid = () => {},
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
      {(props) => {
        handleValid(props);
        return (
          <Form style={style} className={className}>
            {children}
          </Form>
        );
      }}
    </Formik>
  );
}
