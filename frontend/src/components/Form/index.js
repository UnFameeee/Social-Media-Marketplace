import { Form, Formik, useFormikContext } from 'formik';
import { useEffect } from 'react';
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
    handleValid = () => {},
    className,
    ...other
  } = props;

  const Valid = () => {
    const formStatus = useFormikContext();
    useEffect(() => {
      let onDestroy = false;
      if (!onDestroy) {
        handleValid(formStatus.isValid && formStatus.dirty);
      }
      return () => {
        onDestroy = true;
      };
    }, [formStatus.isValid && formStatus.dirty]);

    return null;
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values);
      }}
      {...other}
    >
      <Form style={style} className={className}>
        {children}
        <Valid />
      </Form>
    </Formik>
  );
}
