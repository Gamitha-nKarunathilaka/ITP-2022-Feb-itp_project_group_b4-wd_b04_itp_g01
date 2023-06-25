import React, { useState } from "react";
import { useStyles } from "./DrawerStyle";
import Drawer from "@mui/material/Drawer";
import {
  AppBar,
  Container,
  CssBaseline,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Divider,
  Menu,
  Avatar,
  Tooltip,
} from "@mui/material";
import NavListitem from "./NavListitem";
import {
  FinanceRoutes,
  WarrantyRoutes,
  MaintainRoutes,
  EmployeeRoutes,
  FeedBackRoutes,
  ReservationRoutes,
  VehicleRoutes,
  SparepartRoutes,
} from "./DashbordRoute";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
// import Logo1 from "../../img/logo512.png";
// import Logo2 from "../../img/logo192.png";
import clsx from "clsx";
import { Navigate, Outlet, useNavigate } from "react-router";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import NightsStayIcon from "@mui/icons-material/NightsStay";
// import logo from "../../img/gm.png";
import { useSelector, useDispatch } from "react-redux";

import ListCollapse from "./ListCollapse";
import Inboxicon from "@mui/icons-material/MoveToInbox";

//Inboxicon
import ReceiptIcon from "@mui/icons-material/Receipt";
import PersonIcon from "@mui/icons-material/Person";

import DriveEtaIcon from "@mui/icons-material/DriveEta";

import ForumIcon from "@mui/icons-material/Forum";

import BuildIcon from "@mui/icons-material/Build";

import InboxIcon from "@mui/icons-material/Inbox";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";

function DashBordDarwer() {
  const dispatch = useDispatch();
  const { curruntUser, isAdmin } = useSelector((state) => state.user);
  const theme = useTheme();
  const reslution = useMediaQuery(theme.breakpoints.down("md"));
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const navigate = useNavigate();
  const toggelNavigation = () => {
    setOpen(!open);
  };

  const closeNavigation = () => {
    //if resultion match only drawer auto lose when clik button
    if (reslution) {
      setOpen(false);
    }
  };
  const handleClick = (event) => {
    console.log(curruntUser);
  };
  const handleTitle = () => {
    navigate("/");
  };
  return (
    <div className={classes.rootse}>
      {/* {reslution && ( */}
      <AppBar
        className={clsx({
          [classes.appBar]: true,
          [classes.appBarFull]: !open,
          [classes.mobileappBar]: reslution,
        })}
        // style={{ width: `calc(100% - 240px)` }}
      >
        <Toolbar>
          {reslution && (
            <IconButton onClick={toggelNavigation} color="inherit" size="large">
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            style={{ flexGrow: "1", cursor: "pointer" }}
            onClick={handleTitle}
          >
            RosCard
          </Typography>
          {curruntUser && (
            <IconButton aria-label="delete" onClick={handleClick} size="large">
              <Avatar alt="Remy Sharp" src={curruntUser.profileImg} />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      {/* )} */}
      <CssBaseline />
      <Drawer
        variant={reslution ? "temporary" : "permanent"}
        open={open}
        classes={{
          paper: clsx(
            classes.navigationDrawer,
            !open && classes.navigationDawercollapse
          ),
        }}
        anchor="left"
      >
        <div
          className={clsx(
            classes.navigationtoolBar,
            !open && classes.navigationtoolbarCollaps
          )}
        >
          <Tooltip title="Toggle Drawer" placement="right" arrow>
            <IconButton
              onClick={() => {
                toggelNavigation();
              }}
              size="large"
            >
              {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
          </Tooltip>
        </div>
        {/* <div className={classes.navigationLogoContainer}> */}
        {/* <img
            src={open ? logo : Logo2}
            alt="logo"
            className={classes.navgivationLogo}
            loading="lazy"
          /> */}
        {/* <Typography>RosCard.com</Typography> */}
        {/* </div> */}
        <List className={classes.navigationList}>
          {/* {Dashroutes.map((route, index) => {
            return (
              <NavListitem
                label={route.label}
                activeIcon={route.activeIcon}
                icon={route.icon}
                path={route.path}
                onClick={closeNavigation}
                key={index}
              />
            );
          })} */}

          <NavListitem
            label="Dashboard"
            activeIcon={<DashboardIcon />}
            icon={<DashboardOutlinedIcon />}
            path="/dashbord"
            onClick={closeNavigation}
          />

          <Divider style={{ width: "100%" }} />
          <ListCollapse
            TitleIcon={<DriveEtaIcon />}
            TitleText="Vehicle"
            ListItems={VehicleRoutes}
            onclicks={closeNavigation}
          />
          <Divider style={{ width: "100%" }} />
          <ListCollapse
            TitleIcon={<PersonIcon />}
            TitleText="Employee"
            ListItems={EmployeeRoutes}
            onclicks={closeNavigation}
          />
          <Divider style={{ width: "100%" }} />
          <ListCollapse
            TitleIcon={<ReceiptIcon />}
            TitleText="Warranty"
            ListItems={WarrantyRoutes}
            onclicks={closeNavigation}
          />
          <Divider style={{ width: "100%" }} />
          <ListCollapse
            TitleIcon={<InboxIcon />}
            TitleText="Reservation"
            ListItems={ReservationRoutes}
            onclicks={closeNavigation}
          />
          <Divider style={{ width: "100%" }} />
          <ListCollapse
            TitleIcon={<InsertChartIcon />}
            TitleText="Finance"
            ListItems={FinanceRoutes}
            onclicks={closeNavigation}
          />
          <Divider style={{ width: "100%" }} />
          <ListCollapse
            TitleIcon={<BuildIcon />}
            TitleText="Maintaince"
            ListItems={MaintainRoutes}
            onclicks={closeNavigation}
          />
          <Divider style={{ width: "100%" }} />
          <ListCollapse
            TitleIcon={<StoreIcon />}
            TitleText="Spare parts"
            ListItems={SparepartRoutes}
            onclicks={closeNavigation}
          />
          <Divider style={{ width: "100%" }} />
          <ListCollapse
            TitleIcon={<ForumIcon />}
            TitleText="FeedBacks"
            ListItems={FeedBackRoutes}
            onclicks={closeNavigation}
          />

          <Divider style={{ width: "100%" }} />

          <div className={classes.navigationSpacer}></div>
          <NavListitem
            label="Log Out"
            activeIcon={<MeetingRoomIcon />}
            icon={<MeetingRoomOutlinedIcon />}
            path="logout"
          />
        </List>
      </Drawer>
      <div className={classes.page}>
        <div className={open ? classes.shiftTextRight : classes.shiftTextLeft}>
          <div className={classes.toolbar}></div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashBordDarwer;
