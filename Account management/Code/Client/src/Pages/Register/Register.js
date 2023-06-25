import React, { useState } from "react";

import { Link } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import makeStyles from "@mui/styles/makeStyles";

import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Container,
  FormHelperText,
  Typography,
  Box,
  Grid,
  FormControlLabel,
  Checkbox,
  TextField,
  Avatar,
  Button,
  CssBaseline,
} from "@mui/material";
import { useNavigate } from "react-router";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import clsx from "clsx";
import { login } from "../../Redux/userApi";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Notification from "../../component/Notification/Notification";
import { publicRequest } from "../../axiosRequest/defaultAxios";
import { useMutation, useQuery } from "react-query";
// import Header from "../../component/Header";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    alignContent: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  paper: {
    marginTop: "20px",
    padding: "20px",
  },
  textField: {
    width: "100%",
  },
  main: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    height: "100vh",
    marginTop: "-20px",
    marginTop: theme.mixins.toolbar,
  },
  circluerload: {
    ["&.MuiCircularProgress-colorPrimary"]: {
      color: "white",
    },
  },
  container: {
    marginTop: "100px",
  },
  link: {
    color: theme.palette.secondary.main,
  },
}));

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setfullname] = useState("");
  const [address, setaddress] = useState("");
  const [phoneno, setphoneno] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  // const { curruntUser, error, isFetching } = useSelector((state) => state.user);
  const classes = useStyles();

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link to="/" className={classes.link}>
          RosCard.com
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  //redux
  const dispatch = useDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validate = () => {
    let temp = {};

    temp.Email =
      (/$^|.+@.+..+/.test(email) ? "" : "Email is Not Valid") ||
      (email ? "" : "Email is Required");

    temp.Password =
      (password.length >= 7 ? "" : "Password must be at least 7 characters") ||
      (password ? "" : "Password is Required");
    temp.fullname = fullname ? "" : "FullName is Required";
    temp.address = address ? "" : "Address is Required";
    temp.phoneno =
      (/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(phoneno)
        ? ""
        : "Enter Valid Phone No") || (email ? "" : "Phone No is Required");

    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x == "");
  };

  //add data
  const addRegister = async (claim) => {
    console.log(claim);
    const res = await publicRequest.post("auth/register", claim);
  };

  const add = useMutation(addRegister, {
    onSuccess: () => {
      setIsFetching(false);
      setNotify({
        isOpen: true,
        message: "Successfully Registered",
        type: "success",
      });
      navigate(-1);
    },
    onError: (error) => {
      console.log(error.response.data);
      console.log(error.response.data.errors.email);
      const message = error.response.data.errors.email;
      setNotify({
        isOpen: true,
        message: "Error Occurd  " + `${message}`,
        type: "error",
      });
    },
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    //  login logic here

    if (validate()) {
      // login(dispatch, { email, password });
      // setIsFetching(true);
      const obj = {
        email: email,
        password: password,
        fullname: fullname,
        address: address,
        phoneno: phoneno,
      };
      console.log(obj);
      add.mutate(obj);
    }
  };

  return (
    <>
      {/* <Header /> */}
      <div className={classes.main}>
        <br />
        <Container
          component="main"
          maxWidth="sm"
          className={classes.conatiner}
          style={{ marginTop: "1%" }}
        >
          <Paper className={classes.paper}>
            <CssBaseline />
            <div className={classes.paper}>
              <center>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  sign up
                </Typography>
              </center>
              <form
                className={classes.form}
                noValidate
                onSubmit={(e) => handleLogin(e)}
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  error={errors.fullname ? true : false}
                  required
                  fullWidth
                  id="fullname"
                  label="Full Name"
                  name="fullname"
                  autoComplete="fullname"
                  value={fullname}
                  onChange={(e) => setfullname(e.target.value)}
                  autoFocus
                  helperText={errors.fullname}
                  color="secondary"
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  error={errors.address ? true : false}
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="address"
                  value={address}
                  onChange={(e) => setaddress(e.target.value)}
                  autoFocus
                  helperText={errors.address}
                  color="secondary"
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  error={errors.phoneno ? true : false}
                  required
                  fullWidth
                  id="phoneno"
                  label="phone no"
                  name="phoneno"
                  autoComplete="phoneno"
                  type="tel"
                  value={phoneno}
                  onChange={(e) => setphoneno(e.target.value)}
                  autoFocus
                  helperText={errors.phoneno}
                  color="secondary"
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  error={errors.Email ? true : false}
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                  helperText={errors.Email}
                  color="secondary"
                />
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                  color="secondary"
                  variant="outlined"
                >
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    required
                    name="password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    color="secondary"
                    error={errors.Password ? true : false}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          size="large"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={70}
                  />
                  {errors.Password && (
                    <FormHelperText error={true}>
                      {errors.Password}
                    </FormHelperText>
                  )}
                </FormControl>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                >
                  {isFetching ? (
                    <CircularProgress
                      className={classes.circluerload}
                      style={{ width: "20px", height: "20px" }}
                    />
                  ) : (
                    "Sign Up"
                  )}
                </Button>

                <Grid container>
                  <Grid item xs>
                    <Link to="/login" className={classes.link}>
                      Sign In?
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
            <Box mt={8}>
              <Copyright />
            </Box>
          </Paper>
        </Container>
        <Notification notify={notify} setNotify={setNotify} />
      </div>
    </>
  );
}
