import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";
const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(4),
    position: "absolute",
    top: theme.spacing(5),
  },
  dialogTitle: {
    textAlign: "center",
  },
  DialogTitle: {
    textAlign: "center",
  },
  DialogAction: {
    justifyContent: "center",
  },
  titleIcon: {
    backgroundColor: theme.palette.error.contrastText,
    color: theme.palette.error.dark,
    "&:hover": {
      backgroundColor: theme.palette.grey,
      cursor: "default",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "8rem",
    },
  },
}));

export default function ConfirmDialog(props) {
  const classes = useStyles();
  const { confirmDialog, setConfirmDialog } = props;
  return (
    <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
      <DialogTitle className={classes.DialogTitle}>
        {" "}
        <IconButton disableRipple className={classes.titleIcon} size="large">
          <NotListedLocationIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.DialogTitle}>
        <Typography variant="h6">{confirmDialog.title}</Typography>
        <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions className={classes.DialogAction}>
        <Button onClick={confirmDialog.onConfirm}>Yes</Button>
        <Button
          variant="outlined"
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}
