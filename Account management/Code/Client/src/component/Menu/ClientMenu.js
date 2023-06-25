import {
  AppBar,
  IconButton,
  Toolbar,
  Collapse,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  MenuItem,
  Menu,
  Avatar,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React, { useEffect, useState } from "react";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../../Redux/userSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    margin: "auto 0",
  },
  appbar: {
    color: "White",
    backgroundColor: theme.palette.grey[900],
  },
  btn: {
    marginLeft: theme.spacing(1),
    fontSize: "18px",
  },
  link: {},
}));

export default function ClientMenu() {
  const { curruntUser, isAdmin } = useSelector((state) => state.user);

  const [anchor, setAnchor] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const classes = useStyles();

  const theme = useTheme();
  const reslution = useMediaQuery(theme.breakpoints.down("md"));
  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = (path) => {
    if (path === "logout") {
      dispatch(logout());
      setAnchor(false);
    } else {
      navigate(path);
      setAnchor(false);
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar} elevation={0}>
        <Toolbar className={classes.toolbar}>
          <Typography
            variant={reslution ? "h7" : "h6"}
            className={classes.title}
            color="primary"
          >
            <Link to="/" style={{ textDecoration: "none" }}>
              {" "}
              <Button
                variant="text"
                color="primary"
                size="large"
                style={{ fontSize: "30px" }}
              >
                RosCard
              </Button>
            </Link>
          </Typography>
          {/* <Navlink to="/store" name="Vehicles" color="primary" /> */}

          <Link to="/reservations" style={{ textDecoration: "none" }}>
            <Button variant="text" color="primary" className={classes.btn}>
              Reservations
            </Button>
          </Link>
          <Link to="/sale" style={{ textDecoration: "none" }}>
            <Button variant="text" color="primary" className={classes.btn}>
              Vehicle Sale
            </Button>
          </Link>
          <Link to="/store" style={{ textDecoration: "none" }}>
            <Button variant="text" color="primary" className={classes.btn}>
              Store
            </Button>
          </Link>
          {!curruntUser && (
            <Link to="/login">
              {" "}
              <Button
                variant="contained"
                endIcon={<ExitToAppIcon />}
                color="primary"
                className={classes.btn}
              >
                Login
              </Button>
            </Link>
          )}
          {curruntUser && (
            <IconButton aria-label="delete" onClick={handleClick} size="large">
              <Avatar
                alt="Remy Sharp"
                src="https://firebasestorage.googleapis.com/v0/b/socialtest-cef88.appspot.com/o/Defaultimg%2Fundraw_Images_re_0kll.png?alt=media&token=ee57b9d5-fa04-4d85-8ac0-bd2cb8d04fb0"
              />
            </IconButton>
          )}
          <Menu
            id="simple-menu"
            anchorEl={anchor}
            keepMounted
            open={anchor}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleClose("/profile")}>
              My account
            </MenuItem>
            {isAdmin && (
              <MenuItem onClick={() => handleClose("/dashbord")}>
                DashBord
              </MenuItem>
            )}
            <MenuItem onClick={() => handleClose("logout")}>Logout</MenuItem>
          </Menu>
          {/* <IconButton
            onClick={() => dispatch(changeDarkMode())}
            className={classes.btn}
          >
            {darkModeSet ? <NightsStayIcon /> : <Brightness7Icon />}
          </IconButton> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}
