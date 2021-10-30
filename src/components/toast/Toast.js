import Snackbar from "@material-ui/core/Snackbar";

import React from "react";

const Toast = (props) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={props.open}
      onClose={props.handleClose}
      message={props.message}
      autoHideDuration={props.duration}
    />
  );
};
export default Toast;
