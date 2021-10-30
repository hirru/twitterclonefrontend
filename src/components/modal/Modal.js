import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CancelIcon from "@material-ui/icons/Cancel";
import IconButton from "@material-ui/core/IconButton";
import { useDispatch, useSelector } from "react-redux";

import "./Modal.css";
import InputField from "../input/Input";
import Button from "../button/Button";
import { PostAction } from "../../redux/actions/Index";
const FormDialog = (props) => {
  const [status, setStatus] = useState();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const [error, setError] = useState();
  const { userData } = useSelector((state) => state.AuthReducer);
  const handleChange = (e) => {
    setStatus(e.target.value);
  };
  useEffect(() => {
    setError();
    setStatus();
  }, [props.open]);

  const handleSubmit = async () => {
    setLoading(true);
    setError();
    if (!status) {
      setError("Please write a status!");
      setLoading(false);
    } else {
      const response = await dispatch(
        PostAction.postStatus({ status, userId: userData?._id })
      );
      setStatus();
      setError();
      setLoading(false);
      props.handleClose();
    }
  };
  return (
    <div>
      <Dialog
        open={props.open}
        className="details newRender"
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title " className="text-center  headStart">
          New status
          <div className="modelIcon2">
            <IconButton
              type="submit"
              className=" newStatusHead "
              aria-label="search"
            >
              <CancelIcon onClick={props.handleClose} />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent className=" d-flex flex-column newStatus">
          <InputField
            label="Status"
            type="text"
            variant="outlined"
            id="custom-css-outlined-input"
            name="Status"
            value={status}
            handleChange={handleChange}
            // onSubmit={onSubmit}
          />
          {<p className="errorMsg text-center">{error}</p>}
          <div className="d-flex mt-5 buttonDiv">
            <Button
              background="primary"
              color="tertiary"
              name="Post"
              handleClick={handleSubmit}
              loading={loading}
            />{" "}
            <Button
              background="primary"
              color="tertiary"
              name="Cancel"
              handleClick={() => props.handleClose()}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default FormDialog;
