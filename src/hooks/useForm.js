import { useState, useCallback } from "react";

export const useForm = (initialValues) => {
  const [values, setValues] = useState({isEdit: false, form: initialValues});

  const formValues = values.form;
  const isEdit = values.isEdit

  const handleChange = (e) => {
    setValues({...values, form:{...values.form, [e.target.name]: e.target.value}, isEdit: true });
  };

  const handleReset = (resetValues) => {
    setValues({...values, form: resetValues, isEdit: false})
  }


  return [formValues,
    handleChange,
    handleReset,
    isEdit]
};