import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import RefreshIcon from "@mui/icons-material/Refresh";
import makeStyles from '@mui/styles/makeStyles';
import { useToast } from "@chakra-ui/react";
import Header from "../../component/Header";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Paper,
  Container,
  Typography,
  Box,
  Grid,
  Avatar,
  Button,
  CssBaseline,
} from "@mui/material";
import PasswordInput from "../../component/Inputs/PasswordInput";
import { publicRequest } from "../../axiosRequestMethod/defaultAxios";
import Notification from "../../component/Notification/Notification";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    padding: "20px",
  },
  main: {
    backgroundColor: theme.palette.background.paper,
  },
  roots: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    height: "100vh",
  },
  link: {
    color: theme.palette.secondary.main,
  },
}));

export default function ResetPassword() {
  const toast = useToast();
  const [errors, setErrors] = useState({});
  const classes = useStyles();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confrimPassword, setConfirmPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const { resetlink } = useParams();
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

  const validate = () => {
    let temp = {};
    if (password) {
      console.log("true");
    } else {
      console.log("false");
    }
    temp.Password =
      (password ? "" : "This Field is Required") ||
      (password.length > 6 ? "" : "Password not strong");

    if (confrimPassword != "") {
      if (password !== confrimPassword && password != "") {
        temp.confrimPassword = "Password and confrim password doesnt match";
      }
    } else {
      temp.confrimPassword = confrimPassword ? "" : "This Field is Required";
    }

    setErrors({
      ...temp,
    });
    console.log(temp);
    return Object.values(temp).every((x) => x == "");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // your login logic here
    console.log("hello");
    if (validate()) {
      try {
        const success = await publicRequest.post("/auth/ressetPassword", {
          password,
          resetlink,
        });

        if (success) {
          setNotify({
            isOpen: true,
            message: success.data.message,
            type: "success",
          });

          navigate("/login");
        }
      } catch (err) {
        setNotify({
          isOpen: true,
          message: err.response.data.error,
          type: "error",
        });
      }
    }
  };

  const hadnlePassword = (e) => {
    setPassword(e.target.value);
  };

  const hadnleConfrimPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  return (
    <div className={classes.roots} id="review">
      <Header />
      <div className={classes.main}>
        <Container component="main" maxWidth="sm" style={{ marginTop: "10%" }}>
          <Paper className={classes.paper}>
            <CssBaseline />
            <div className={classes.paper}>
              <center>
                <Avatar className={classes.avatar}>
                  <RefreshIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Reset Password
                </Typography>
              </center>
              <form
                className={classes.form}
                noValidate
                onSubmit={(e) => handleLogin(e)}
              >
                <PasswordInput
                  label="Password"
                  value={password}
                  setvalue={hadnlePassword}
                  error={errors.Password}
                />
                <PasswordInput
                  label="Confrim Password"
                  value={confrimPassword}
                  setvalue={hadnleConfrimPassword}
                  error={errors.confrimPassword}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                >
                  Reset
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link to="/login" className={classes.link}>
                      <span style={{ display: "flex" }}>
                        <ArrowBackIcon /> Login
                      </span>
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
            <Box mt={8}>
              <Copyright />
            </Box>
          </Paper>
          <Notification notify={notify} setNotify={setNotify} />
        </Container>
      </div>
    </div>
  );
}
