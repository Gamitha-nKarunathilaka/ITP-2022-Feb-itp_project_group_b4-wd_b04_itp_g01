import React, { useState, useEffect } from "react";
import makeStyles from '@mui/styles/makeStyles';

const usestyle = makeStyles((theme) => ({}));

export function useForm(initilieValues) {
  const [values, setValues] = useState(initilieValues);
  const [errors, setErrors] = useState({});

  const handleChanges = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };
  return { values, setValues, handleChanges, errors, setErrors };
}

export function Form(props) {
  const classes = usestyle();
  const { children, ...other } = props;
  return (
    <form autoComplete="off" {...other}>
      {props.children}
    </form>
  );
}
