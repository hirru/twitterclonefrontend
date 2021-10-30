import React from "react";
import { withStyles, TextField } from "@material-ui/core";
const CssTextField = withStyles({
  root: {
    "& input": {
      color: "#FFFFFF",
    },

    "& label.Mui-focused": {
      color: "#FFFFFF",
    },
    "& label": {
      color: "#FFFFFF",
    },
    "& .MuiTextField-root": {
      // margin: theme.spacing(1),
      width: "25ch",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#FFFFFF",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#FFFFFF",
      },
      "&:hover fieldset": {
        borderColor: "#FFFFFF",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#FFFFFF",
      },
    },
    width: "30%",
    marginRight: "10px",
  },
})(TextField);

const InputField = (props) => {
  return (
    <CssTextField
      label={props.label}
      variant="outlined"
      type={props.type}
      id={props.id}
      name={props.name}
      value={props.value}
      onChange={props.handleChange}
      disabled={props?.disabled}
    />
  );
};
export default InputField;
