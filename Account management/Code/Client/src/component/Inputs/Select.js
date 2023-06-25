import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FormHelperText } from "@mui/material";
import { makeStyles } from "@mui/styles";

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

export default function Selects(props) {
  const classes = usestyle();
  const {
    name,
    label,
    value,
    error = null,
    onChange,
    options,
    ...others
  } = props;

  return (
    <FormControl
      className={classes.roots}
      fullWidth
      variant="outlined"
      {...(error && { error: true })}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        {...others}
      >
        <MenuItem value="">None</MenuItem>
        {options.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.title}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
