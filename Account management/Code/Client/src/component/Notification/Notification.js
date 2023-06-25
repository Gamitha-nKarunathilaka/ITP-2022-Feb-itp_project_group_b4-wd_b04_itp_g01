import React from "react";
import { Alert } from "@mui/material";
import { Snackbar } from "@mui/material";
export default function Notification(props) {
  const { notify, setNotify } = props;

  const handleClose = () => {
    setNotify({
      ...notify,
      isOpen: false,
    });
  };

  return (
    <Snackbar
      open={notify.isOpen}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert severity={notify ? notify.type : "success"} onClose={handleClose}>
        {notify.message}
      </Alert>
    </Snackbar>
  );
}
