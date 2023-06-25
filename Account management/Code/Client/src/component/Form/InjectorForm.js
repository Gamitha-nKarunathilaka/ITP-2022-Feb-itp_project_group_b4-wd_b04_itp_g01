import React, { useEffect } from "react";
import { Form, useForm } from "../../component/Form/useForm";

import { Button, Grid, CircularProgress } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import Inputprop from "../../component/Inputs/Input";
import { addDoc, doc, updateDoc, collection } from "firebase/firestore";
import { db } from "../../init/firebaseinit";
import { useState } from "react";

const initialValues = {
  id: 0,
  Code: "",
  InjetorID: "",
  InjetorNo: "",
  InjetorCode: "",
  EngineCode: "",
};

export default function InjectorForm(props) {
  const { recordForEdit, addOrEdit } = props;
  const { values, setValues, handleChanges, errors, setErrors } =
    useForm(initialValues);
  const colRef = collection(db, "Engine");

  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    let temp = {};

    temp.InjetorID = values.InjetorID ? "" : "This Field is Required";
    temp.InjetorNo = values.InjetorNo ? "" : "This Field is Required";
    temp.InjetorCode = values.InjetorCode ? "" : "This Field is Required";
    temp.EngineCode = values.EngineCode ? "" : "This Field is Required";
    temp.Code = values.Code ? "" : "This Field is Required";
    console.log(temp);
    setErrors({
      ...temp,
    });
    //if all the proprties valid to the function that provide in every() it will return true  or if one fail it return false
    return Object.values(temp).every((x) => x == "");
  };

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    console.log(validate());

    if (validate()) {
      addOrEdit(values);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (recordForEdit != null) {
      setValues({
        ...recordForEdit,
      });
    }
  }, [recordForEdit]);
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container spacing={2} style={{ justifyContent: "center" }}>
        <Grid item xs={12} sm={6}>
          <Inputprop
            name="InjetorID"
            label="InjetorID"
            value={values.InjetorID}
            onChange={handleChanges}
            error={errors.InjetorID}
          />

          <Inputprop
            name="InjetorNo"
            label="InjetorNo"
            value={values.InjetorNo}
            onChange={handleChanges}
            error={errors.InjetorNo}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Inputprop
            name="Injetor Code"
            label="Injetor Code"
            value={values.InjetorCode}
            onChange={handleChanges}
            error={errors.InjetorCode}
          />

          <Inputprop
            name="Engine Code"
            label="Engine Code"
            value={values.EngineCode}
            onChange={handleChanges}
            error={errors.EngineCode}
          />
        </Grid>
        <div>
          {isLoading && <CircularProgress color="secondary" />}
          {!isLoading && (
            <Button
              variant="contained"
              color="secondary"
              text="Submit"
              size="large"
              type="submit"
            >
              Submit
            </Button>
          )}
        </div>
      </Grid>
    </Form>
  );
}
