import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import ErrorIcon from "@material-ui/icons/ErrorOutline";

const ErrorPage = props => (
  <div className={props.classes.root}>
    <ErrorIcon className={props.classes.icon} />
    <Typography variant="h5" component="h2">
      {props.text}
    </Typography>
  </div>
);

const styles = {
  root: {
    textAlign: "Center",
    padding: 16
  },
  icon: {
    color: "red",
    fontSize: 48,
    padding: 16
  }
};

export default withStyles(styles)(ErrorPage);
