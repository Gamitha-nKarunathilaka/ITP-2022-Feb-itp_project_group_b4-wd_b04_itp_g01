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
import { DateTimePicker, LoadingButton } from "@mui/lab";
import { useMutation } from "react-query";
import { useTheme } from "@emotion/react";
import Genrator from "../../component/IdGenrarator/RandomID";
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
    },
  },
}));
const dates = new Date();
const initialValues = {
  title: "",
  fname: "",
  lname: "",
  mobileNo: "",
  serviceType: "",
  vehicleRegistationNo: "",
  mileage: "",
  comment: "",
  ReservationID: "",
  dateTime: new Date(dates.setDate(dates.getDate() + 3)),
};

const ServiceType = [
  {
    value: "GeneralService",
    label: "General Service",
  },
  {
    value: "WarrantyClaim",
    label: "Warranty Claim",
  },
  {
    value: "FreeService",
    label: "Free Servicec",
  },
  {
    value: "Other",
    label: "Other",
  },
];
const ReservationForm = () => {
  const navigate = useNavigate();
  const form = useRef();
  const theme = useTheme();
  const classes = userStyle();
  const [errors, setErrors] = useState([]);
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
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
    const min = date.getMinutes();
    const sec = date.getSeconds();
    const uniqueID = "RID" + year + monthe + day + hour + min + sec;

    setValues({
      ...values,
      ReservationID: uniqueID,
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
  //Api Calls
  //add data
  const addClaims = async (claim) => {
    console.log(claim);
    const res = await publicRequest.post("Reservation/addreservation", claim);
  };
  //insert
  const add = useMutation(addClaims, {
    onSuccess: () => {
      setNotify({
        isOpen: true,
        message: "Your reservation successfully added",
        type: "success",
      });

      setValues(initialValues);
    },
    onError: (error) => {
      console.log(error.response);

      const message = error.response.data.error;
      setNotify({
        isOpen: true,
        message: "Error Occurd  " + `${message}`,
        type: "error",
      });
    },
  });

  //error handle
  const validate = () => {
    let temp = {};
    temp.title = values.title ? "" : "This Field is Required";
    temp.fname = values.fname ? "" : "This Field is Required";
    temp.lname = values.lname ? "" : "This Field is Required";
    temp.mobileNo =
      (/^\d{10}$/.test(values.mobileNo) ? "" : "Enter Valid Phone Number") ||
      (values.mobileNo ? "" : "This Field is Required");
    temp.serviceType = values.serviceType ? "" : "This Field is Required";
    // temp.dataTime = values.dataTime ? "" : "This Field is Required";
    temp.vehicleRegistationNo = values.vehicleRegistationNo
      ? ""
      : "This Field is Required";
    temp.mileage = values.mileage ? "" : "This Field is Required";
    // temp.mileageUnit = values.mileageUnit ? "" : "This Field is Required";
    temp.comment = values.comment ? "" : "This Field is Required";
    console.log(temp);
    temp.dateTime = values.dateTime ? "" : "This Field is Required";

    setErrors({
      ...temp,
    });
    // //if all the proprties valid to the function that provide in every() it will return true  or if one fail it return false
    return Object.values(temp).every((x) => x == "");
  };

  useEffect(() => {
    setValues({
      ...values,
      ReservationID: Genrator("GMR"),
    });
  }, []);

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
    // setLoading(true);
    // setUrls("");
    setValues({
      ...values,
      ReservationID: Genrator("GMR"),
    });
    if (validate()) {
      // console.log(values.dateTime);
      const status = "Pending";
      const date = values.dateTime.toDateString();
      // getUniqueWarrantyID();

      const Time =
        values.dateTime.getHours().toString() +
        ":" +
        values.dateTime.getMinutes().toString();

      console.log(values);
      add.mutate({ status, Time, date, ...values });
    }
  };

  return (
    <div className={classes.roots} id="review">
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" color="primary">
            Reservation Form
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
                    name="title"
                    label="Title"
                    value={values.title}
                    onChange={handleChanges}
                    error={errors.title}
                  />

                  <Inputprop
                    name="fname"
                    label="First Name"
                    value={values.fname}
                    onChange={handleChanges}
                    error={errors.fname}
                  />
                  <Inputprop
                    name="lname"
                    label="Last Name"
                    value={values.lname}
                    onChange={handleChanges}
                    error={errors.lname}
                  />
                </Grid>
                <Grid item xs={12} sm={6} className={classes.griditem}>
                  <Inputprop
                    name="mobileNo"
                    label="Contact No"
                    value={values.mobileNo}
                    onChange={handleChanges}
                    error={errors.mobileNo}
                  />
                  <Inputprop
                    name="vehicleRegistationNo"
                    label="Vehicle Registration No"
                    value={values.vehicleRegistationNo}
                    onChange={handleChanges}
                    error={errors.vehicleRegistationNo}
                  />
                </Grid>

                <Grid item xs={12} sm={6} className={classes.griditem}>
                  <Inputprop
                    name="mileage"
                    label="Mileage"
                    type="number"
                    value={values.mileage}
                    onChange={handleChanges}
                    error={errors.mileage}
                  />
                  <Inputprop
                    name="comment"
                    label="Comment"
                    value={values.comment}
                    onChange={handleChanges}
                    error={errors.comment}
                  />
                </Grid>
                <Grid item xs={12} sm={6} className={classes.griditem}>
                  <TextField
                    id="serviceType"
                    select
                    name="serviceType"
                    label="Service Type"
                    value={values.serviceType}
                    onChange={handleChanges}
                    helperText={
                      errors.serviceType ? "Please Select Service Type" : ""
                    }
                    fullWidth
                    className={classes.select}
                    error={errors.serviceType ? true : false}
                  >
                    {ServiceType.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <DateTimePicker
                    renderInput={(props) => (
                      <TextField
                        name="dateTime"
                        sx={{ width: "80%", marginTop: "20px" }}
                        error={errors.dateTime ? true : false}
                        helperText={
                          errors.dateTime ? "Please Select Date and Time" : ""
                        }
                        {...props}
                      />
                    )}
                    label="DateTimePicker"
                    value={values.dateTime}
                    onChange={(newValue) => {
                      setValues({
                        ...values,
                        ["dateTime"]: newValue,
                      });
                    }}
                  />
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

export default ReservationForm;
