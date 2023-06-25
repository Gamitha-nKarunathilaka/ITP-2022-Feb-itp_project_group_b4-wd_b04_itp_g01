import {
  Button,
  Container,
  Grid,
  Typography,
  Paper,
  TextField,
  CssBaseline,
  CircularProgress,
  Box,
  MenuItem,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { purple } from "@mui/material/colors";
import { getByDisplayValue } from "@testing-library/react";
import { useEffect, useState } from "react";
import React, { useRef } from "react";
import { publicRequest } from "../../axiosRequest/defaultAxios";
import Notification from "../../component/Notification/Notification";
import { useNavigate } from "react-router-dom";
import Inputprop from "../../component/Inputs/Input";
import { Form, useForm } from "../../component/Form/useForm";
const userStyle = makeStyles((theme) => ({
  roots: {
    minHeight: "60vh",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    justifyContent: "center",
    alignContent: "center",
    display: "flex",
    textAlign: "center",
  },
  container: {
    margin: "40px 0",
  },
  typo: {
    margin: "20px 0",
    color: purple[2],
  },
  paper: {
    padding: "10px",
    [theme.breakpoints.up("sm")]: {
      padding: "40px",
    },
    marginTop: "20px",
  },
  submit: {
    marginTop: "20px",
  },
  grid: {
    marginTop: "20px",
  },
  inputs: {
    display: "none",
  },
  img: {
    display: "flex",
    alignContent: "center",
    textAlign: "center",
  },
  buttons: {
    marginRight: "10px",
  },
  main: {
    [theme.breakpoints.down("md")]: {
      padding: "50px 10px",
    },
  },
  gridcontiner: {
    margin: "0px",
  },
  griditem: {
    padding: "0px",
  },
  select: {
    "&.MuiFormControl-root": {
      width: "80%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      margin: theme.spacing(1),
    },
  },
}));
const initialValues = {
  employeeId: "",
  employeeName: "",
  address: "",
  contactNo: "",
  nic: "",
  basicSalary: "",
  jobRole: "",
};

const EmployeeOptions = [
  {
    value: "Quality Checker",
    label: "Quality Checker",
  },
  {
    value: "mechanical engineer",
    label: "mechanical engineer",
  },
  {
    value: "Mechanic",
    label: "Mechanic",
  },
  {
    value: "Traning",
    label: "Traning",
  },
];
const EmployeeForm = () => {
  const navigate = useNavigate();
  const form = useRef();
  const classes = userStyle();
  const [errors, setErrors] = useState([]);
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  // const [employeeId, setEmployeeId] = useState("");
  // const [employeeName, setEmployeeName] = useState("");
  // const [address, setAddress] = useState("");
  // const [contactNo, setContactNo] = useState("");
  // const [nic, setNic] = useState("");
  // const [basicSalary, setBasicSalary] = useState("");
  // const [jobRole, setjobRole] = useState("");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  function getUnique(arr, comp) {
    // store the comparison  values in array
    const unique = arr
      .map((e) => e[comp])

      // store the indexes of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the false indexes & return unique objects
      .filter((e) => arr[e])
      .map((e) => arr[e]);

    return unique;
  }

  function getUniqueWarrantyID() {
    const date = new Date();
    const year = date.getFullYear();
    const monthe = date.getMonth();
    const day = date.getDay();
    const hour = date.getHours();
    const sec = date.getSeconds();
    const uniqueID = "EID" + year + monthe + day + hour + sec;

    setValues({
      ...values,
      employeeId: uniqueID,
    });
  }
  function formatDate(thedate) {
    return (
      thedate.getFullYear() +
      "/" +
      (thedate.getMonth() + 1) +
      "/" +
      thedate.getDate()
    );
  }
  //hadnle textArea Input exits

  //error handle
  const validate = () => {
    let temp = {};
    temp.employeeName = values.employeeName ? "" : "This Field is Required";
    temp.address = values.address ? "" : "This Field is Required";
    temp.contactNo = values.contactNo ? "" : "This Field is Required";
    temp.nic = values.nic ? "" : "This Field is Required";
    temp.basicSalary = values.basicSalary ? "" : "This Field is Required";
    temp.jobRole = values.jobRole ? "" : "This Field is Required";
    console.log("job role-" + values.jobRole);
    console.log(temp);
    setErrors({
      ...temp,
    });
    // //if all the proprties valid to the function that provide in every() it will return true  or if one fail it return false
    return Object.values(temp).every((x) => x == "");
  };

  useEffect(() => {
    getUniqueWarrantyID();
  }, []);

  //Reset value
  //   const reset = () => {
  //     setAddress("");
  //     setContactNo("");
  //     setUser("");
  //     setBrand("");
  //     setCode("");

  //     setTecnician("");
  //     settechnicianContactNo("");
  //     setRegistarationNo("");
  //     setInjectorMake("");
  //     setInjectorNo("");
  //     setInjectorCode("");

  //     setNewParts("");
  //     setUrls("");
  //     setBillNo("");
  //     setImages([]);
  //   };

  //hadnle submit
  const handleChanges = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      publicRequest
        .post("Employee/add", values)
        .then((data) => {
          setNotify({
            isOpen: true,
            message: "Successfully inserted",
            type: "success",
          });
          navigate(-1);
        })
        .catch((error) => {
          setNotify({
            isOpen: true,
            message: `Error Occurd ${e}`,
            type: "error",
          });
        });
    }
  };

  return (
    <div className={classes.roots} id="review">
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" color="primary">
            Employee
          </Typography>
          <Paper className={classes.paper}>
            <form
              ref={form}
              className={classes.form}
              onSubmit={(e) => handleSubmit(e)}
              autoComplete="none"
              id="submitForm"
            >
              <Grid container spacing={4} className={classes.gridcontiner}>
                <Grid item xs={12} sm={6} className={classes.griditem}>
                  <Inputprop
                    name="employeeName"
                    label="Employee Name"
                    value={values.employeeName}
                    onChange={handleChanges}
                    error={errors.employeeName}
                  />
                  <Inputprop
                    name="address"
                    label="Address"
                    value={values.address}
                    onChange={handleChanges}
                    error={errors.address}
                  />
                </Grid>
                <Grid item xs={12} sm={6} className={classes.griditem}>
                  <Inputprop
                    name="contactNo"
                    label="Contact No"
                    value={values.contactNo}
                    onChange={handleChanges}
                    error={errors.contactNo}
                  />
                  <Inputprop
                    name="nic"
                    label="NIC"
                    value={values.nic}
                    onChange={handleChanges}
                    error={errors.nic}
                  />
                </Grid>

                <Grid item xs={12} sm={6} className={classes.griditem}>
                  <Inputprop
                    name="basicSalary"
                    label="Basic Salary"
                    value={values.basicSalary}
                    onChange={handleChanges}
                    error={errors.basicSalary}
                  />
                </Grid>
                <Grid item xs={12} sm={6} className={classes.griditem}>
                  {/* <Inputprop
                    name="jobRole"
                    label="Job Role"
                    value={values.jobRole}
                    onChange={handleChanges}
                    error={errors.jobRole}
                  /> */}

                  <TextField
                    id="Job Role"
                    select
                    name="jobRole"
                    label="Select Job Role"
                    value={values.jobRole}
                    onChange={handleChanges}
                    helperText={errors.jobRole ? "Please select JobRole" : ""}
                    fullWidth
                    className={classes.select}
                    error={errors.jobRole ? true : false}
                  >
                    {EmployeeOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={12}>
                  {loading && <CircularProgress color="secondary" />}
                  {!loading && (
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.buttons}
                      type="submit"
                    >
                      Submit
                    </Button>
                  )}
                </Grid>
              </Grid>
            </form>
            <Notification notify={notify} setNotify={setNotify} />
          </Paper>
        </div>
      </Container>
    </div>
  );
};

export default EmployeeForm;
