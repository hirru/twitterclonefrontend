import React from "react";
import { Button } from "@material-ui/core";
import "./Button.css";
import Loader from "../loader/Loader";

const CustomButton = (props) => {
  return (
    <div style={{ textAlign: props.textAlign }}>
      <Button
        className={
          props.background === "primary" ? "signOutbtnP" : "signOutbtnS"
        }
        style={{
          cursor: "pointer",

          color:
            props.color === "primary"
              ? "#fff"
              : props.color === "secondary"
              ? "#1d9bf0"
              : props.color === "tertiary"
              ? "#fff"
              : props.color,
          background:
            props.background === "primary"
              ? "#1d9bf0 "
              : props.background === "secondary"
              ? "#fff"
              : "#ffffff",
          borderRadius: "4px",
          fontSize: "14px",
          textTransform: "initial",
          padding: "5px 25px",
          border: "1px solid",
          transition: "all 0.5s ease",
          display: "inline-flex",
          alignItem: "center",
        }}
        disabled={props?.disabled}
        onClick={props.handleClick}
      >
        <div className="iconButton">{props.icon ? props.icon : ""}</div>
        <span className="mr-1"> {props.name}</span>

        <Loader loading={props.loading}></Loader>
      </Button>
    </div>
  );
};
export default CustomButton;
