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
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import clsx from "clsx";
import { login } from "../../Redux/userApi";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
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

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { curruntUser, error, isFetching } = useSelector((state) => state.user);
  const classes = useStyles();
  const errEmail = error && error.email;
  const errPassword = error && error.password;

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
    temp.Password = password ? "" : "This Field is Required";
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x == "");
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    //  login logic here

    if (validate()) {
      login(dispatch, { email, password });
    }
  };
  const register = () => {
    navigate("register");
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
                  Sign in
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
                  error={
                    (errEmail ? true : false) || (errors.Email ? true : false)
                  }
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                  helperText={error ? error.email : errors.Email}
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
                    error={
                      (errPassword ? true : false) ||
                      (errors.Password ? true : false)
                    }
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
                    <FormHelperText error={true}>Enter Password</FormHelperText>
                  )}
                  {errPassword && (
                    <FormHelperText error={true}>
                      {error.password}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControlLabel
                  control={<Checkbox value="remember" color="secondary" />}
                  label="Remember me"
                />

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
                    "Sign In"
                  )}
                </Button>

                <Grid container>
                  <Grid item xs>
                    <Link to="/forgotpassword" className={classes.link}>
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
                <Stack sx={{ marginTop: "20px" }}>
                  <Typography align="center">
                    Don't Have Acccount Register from here
                  </Typography>
                  <Button onClick={register}>Register</Button>
                </Stack>
              </form>
            </div>
            <Box mt={8}>
              <Copyright />
            </Box>
          </Paper>
        </Container>
      </div>
    </>
  );
}
