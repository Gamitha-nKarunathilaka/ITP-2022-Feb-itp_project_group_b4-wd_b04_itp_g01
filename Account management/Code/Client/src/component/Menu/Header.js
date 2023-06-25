import { useMediaQuery, useTheme } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import React from "react";
import ClientMenu from "./ClientMenu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
  },
}));

const Header = () => {
  const classes = useStyles();
  const theme = useTheme();
  const reslution = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <div className={classes.root}>
      {/* {reslution && <MobileNav />} */}
      {!reslution && <ClientMenu />}
    </div>
  );
};

export default Header;
