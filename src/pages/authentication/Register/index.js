import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./style.css";
import { VisibilityOff, Visibility, ArrowBack } from "@material-ui/icons";
import Button from "../../../components/button/Button";
import Toast from "../../../components/toast/Toast";
import InputField from "../../../components/input/Input";
import { AuthAction } from "../../../redux/actions/Index";
import { ValidateSignupForm } from "./Validation";
import { ROUTES } from "../../../services/constants/Index";
import { useHistory } from "react-router-dom";
const Register = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [emailDisabled, setEmailDisabled] = useState(false);
  const [state, setState] = useState();
  const [toast, setToast] = useState();
  const [isShowPassword, setPasswordType] = React.useState(false);
  const [isShowConfirmPassword, setConfirmPasswordType] = React.useState(false);

  const [errorData, setError] = React.useState();
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    setError();

    const result = await ValidateSignupForm(state);
    if (!result?.isFormValid) {
      setError(result?.error);
      return;
    } else if (result?.isFormValid) {
      const result = await dispatch(AuthAction.signUp({ ...state }));
      if (result) {
        setToast({
          open: true,
          message: "Sign up success",
          type: "error",
          duration: 5000,
        });
      } else if (!result) {
        setToast({
          open: true,
          message: "User already exits",
          type: "error",
          duration: 5000,
        });
      }
      if (result) {
        let params = { email: state?.email, password: state?.password };
        const status = await dispatch(AuthAction.login(params));

        history.push(ROUTES.HOME);
      }
    }
  };

  return (
    <div className="AuthBg">
      <div className="" style={{ marginTop: "50px" }}></div>

      <div className="signIn">
        <div className="signInFormDiv ">
          <div className="formDiv registerrr">
            <h2>Register</h2>
            <div className="randomName">
              <form className="signInForm" noValidate autoComplete="off">
                <div className="RegisterInfo">
                  <div className="d-flex flex-row row">
                    <div className="d-flex flex-column col-md-6 col-lg-6">
                      <InputField
                        label="First Name"
                        variant="outlined"
                        type="text"
                        id="custom-css-outlined-input"
                        name="firstName"
                        value={state?.firstName}
                        handleChange={handleChange}
                      />
                      <p className="errorMsg">
                        {" "}
                        {errorData?.email && errorData.firstName[0]}
                      </p>
                    </div>
                    <div className="d-flex flex-column col-md-6 col-lg-6">
                      <InputField
                        className=""
                        label="Last Name"
                        variant="outlined"
                        type="text"
                        id="custom-css-outlined-input"
                        name="lastName"
                        value={state?.lastName}
                        handleChange={handleChange}
                      />
                      <p className="errorMsg">
                        {" "}
                        {errorData?.email && errorData.lastName[0]}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="signInEmail">
                  {(state?.email || props.location.search == "") && (
                    <InputField
                      label="E-Mail"
                      variant="outlined"
                      type="text"
                      id="custom-css-outlined-input"
                      disabled={emailDisabled}
                      name="email"
                      value={state?.email}
                      handleChange={handleChange}
                      InputProps={{
                        readOnly: emailDisabled ? true : false,
                      }}
                    />
                  )}
                  <p className="errorMsg">
                    {" "}
                    {errorData?.email && errorData.email[0]}
                  </p>
                </div>

                <div className="RegisterInfo">
                  <div className="d-flex flex-row row">
                    <div className=" d-flex flex-column col-md-6 col-lg-6">
                      <InputField
                        label="Password"
                        type={isShowPassword == true ? "text" : "password"}
                        variant="outlined"
                        id="custom-css-outlined-input"
                        name="password"
                        value={state?.password}
                        handleChange={handleChange}
                      />
                      <p className="errorMsg">
                        {" "}
                        {errorData?.email && errorData.password[0]}
                      </p>
                      {isShowPassword === true ? (
                        <a
                          className="eyeicon"
                          onClick={() => setPasswordType(false)}
                        >
                          <Visibility />
                        </a>
                      ) : (
                        <a
                          className="eyeicon"
                          onClick={() => setPasswordType(true)}
                        >
                          <VisibilityOff />
                        </a>
                      )}
                    </div>
                    <div className=" d-flex flex-column col-md-6 col-lg-6">
                      <InputField
                        label=" Confirm Password"
                        type={
                          isShowConfirmPassword == true ? "text" : "password"
                        }
                        variant="outlined"
                        id="custom-css-outlined-input"
                        name="confirmPassword"
                        value={state?.confirmPassword}
                        handleChange={handleChange}
                      />
                      <p className="errorMsg">
                        {" "}
                        {errorData?.email && errorData.confirmPassword[0]}
                      </p>
                      {isShowConfirmPassword === true ? (
                        <a
                          className="eyeicon"
                          onClick={() => setConfirmPasswordType(false)}
                        >
                          <Visibility />
                        </a>
                      ) : (
                        <a
                          className="eyeicon"
                          onClick={() => setConfirmPasswordType(true)}
                        >
                          <VisibilityOff />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="signUpButton">
                  <Button
                    background="primary"
                    color="tertiary"
                    name="Register"
                    handleClick={onSubmit}
                  />
                </div>
              </form>

              {toast?.open ? (
                <Toast
                  open={toast.open}
                  message={toast.message}
                  duration={toast.duration}
                  type={toast.type}
                  handleClose={() =>
                    setToast({
                      ...toast,
                      open: false,
                    })
                  }
                ></Toast>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
