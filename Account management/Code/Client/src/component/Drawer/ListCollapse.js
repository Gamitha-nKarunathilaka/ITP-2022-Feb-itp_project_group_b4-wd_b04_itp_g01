import React, { useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Dashroutes from "./DashbordRoute";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import Inboxicon from "@mui/icons-material/MoveToInbox";
import NavListitem from "./NavListitem";
import { Tooltip } from "@mui/material";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  icon: {
    color: theme.palette.grey[800],
  },
}));

function ListCollapse(props) {
  const { TitleIcon, TitleText, ListItems, onclicks } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <Tooltip title={TitleText} placement="right" arrow>
        <ListItem button onClick={handleClick}>
          <ListItemIcon className={classes.icon}>{TitleIcon}</ListItemIcon>
          <ListItemText primary={TitleText} />

          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      </Tooltip>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          component="div"
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {ListItems.map((route, index) => {
            return (
              <NavListitem
                label={route.label}
                activeIcon={route.activeIcon}
                icon={route.icon}
                path={route.path}
                key={index}
                onClick={onclicks}
              />
            );
          })}
        </List>
      </Collapse>
    </List>
  );
}
export default ListCollapse;
