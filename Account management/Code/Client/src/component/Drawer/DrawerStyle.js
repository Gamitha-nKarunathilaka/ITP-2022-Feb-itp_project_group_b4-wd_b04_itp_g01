import { makeStyles } from "@material-ui/core";
const drawerWidth = 240;
export const useStyles = makeStyles((theme) => ({
  rootse: {
    display: "flex",
  },
  page: {
    background: theme.palette.background.paper,
    width: "100%",
  },

  navgivationLogo: {
    width: "50%",
    cursor: "pointer",
  },
  navigationLogoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: theme.spacing(6),
  },
  navigationDrawer: {
    width: drawerWidth,

    whiteSpace: "nowrap",
    overflowX: "hidden",
  },
  navigationtoolBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingLeft: theme.spacing(8),
    ...theme.mixins.toolbar,
  },
  navigationList: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
  },
  navigationDawercollapse: {
    width: theme.spacing(9),
  },
  menuItemicon: {
    width: "100%",
  },
  menuitem: {
    width: "80%",
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  menuItemactive: {
    // backgroundColor: theme.palette.divider,
    color: theme.palette.secondary.dark,
  },
  navigationSpacer: {
    flex: 1,
  },
  navigationtoolbarCollaps: {
    justifyContent: "center",
    paddingLeft: 0,
  },
  toolbar: {
    ...theme.mixins.toolbar,
  },
  shiftTextLeft: {
    marginLeft: "40px",
  },
  shiftTextRight: {
    [theme.breakpoints.up("sm")]: {
      marginLeft: "240px",
    },
  },
  appBar: {
    width: `calc(100% - 240px)`,
  },
  appBarFull: {
    width: `calc(100% - 72px)`,
  },
  mobileappBar: {
    width: `100%`,
  },
  navigationTitle: {
    color: "#9e9e9e",
  },
}));
