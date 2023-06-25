import {
  Icon,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useStyles } from "./DrawerStyle";
import clsx from "clsx";
import makeStyles from "@mui/styles/makeStyles";
import { Navigate, useLocation, useNavigate } from "react-router";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Redux/userSlice";
const useStyle = makeStyles((theme) => ({
  activeLabel: {
    backgroundColor: theme.palette.grey.A400,
  },
  normal: {},
}));

function NavListitem({ label, icon, activeIcon, path, onClick }) {
  const classes = useStyles();
  const [active, setActive] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    setActive(location.pathname === path);
  }, [location]);
  return (
    /* menuitem class deafult if active is true menuitemative class will be set */
    <Tooltip title={label} placement="right" arrow>
      <ListItem
        button
        key={label}
        onClick={() => {
          if (path === "logout") {
            dispatch(logout());
            navigate("/login");
          } else {
            {
              onClick();
            }
            navigate(path);
          }
        }}
        className={clsx(classes.menuitem, active && classes.menuItemactive)}
      >
        <ListItemIcon
          className={clsx(classes.normal, active && classes.menuItemactive)}
        >
          {active ? activeIcon : icon}
        </ListItemIcon>
        <ListItemText
          primary={label}
          primaryTypographyProps={{ varient: "body2" }}
          className={clsx(classes.menuitem, active && classes.menuItemactive)}
        />
      </ListItem>
    </Tooltip>
  );
}

export default NavListitem;
