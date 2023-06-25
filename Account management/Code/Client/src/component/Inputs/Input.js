import { TextField } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";

const usestyle = makeStyles((theme) => ({
  roots: {
    "&.MuiFormControl-root": {
      width: "80%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      margin: theme.spacing(1),
    },
  },
}));

export default function Inputprop(props) {
  const classes = usestyle();
  const {
    name,
    value,
    label,
    onChange,
    error = null,
    type = null,
    ...other
  } = props;
  return (
    <TextField
      className={classes.roots}
      variant="outlined"
      color="secondary"
      label={label}
      name={name}
      value={value}
      type={type ? type : "string"}
      onChange={onChange}
      {...(error && { error: true, helperText: error })}
      {...other}
    ></TextField>
  );
}
