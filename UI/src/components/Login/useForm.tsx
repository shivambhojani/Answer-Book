import { useState, useEffect } from "react";

const useForm = (callback:any, authenticate:any) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [submited, IsSubmitted] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submited) {
      callback();
    }
  }, [errors]);

  const handleSubmit = (event:any) => {
    if (event) event.preventDefault();
    setErrors(authenticate(values));

    
  };

  const handleChange = (event:any) => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
    IsSubmitted
  };
};

export default useForm;
