import React, { useState } from "react";
import Button from "../../../components/button/Button";
import { ValidateLoginForm } from "./Validation";
import InputField from "../../../components/input/Input";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Toast from "../../../components/toast/Toast";
import { AuthAction } from "../../../redux/actions/Index";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
// import { CustomerAction } from "../../../redux/actions/Index";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { ROUTES } from "../../../services/constants/Index";
import "./style.css";
const Login = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [checked, setChecked] = React.useState();
  const [state, setState] = useState();
  const [toast, setToast] = useState();
  const [loading, setLoading] = useState(false);
  const [errorData, setError] = React.useState();
  const [isShowPassword, setPasswordType] = React.useState(false);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  async function onSubmit(event) {
    event.preventDefault();
    const result = await ValidateLoginForm(state);
    if (result?.isFormValid) {
      setError({});
      const status = await dispatch(AuthAction.login(state));
      if (status) {
        history.push(ROUTES.HOME);
      }
    } else if (result?.isFormValid === false) {
      setError(result?.error);
      return;
    }
    setToast(true);
  }

  return (
    <div className="AuthBg">
      <div className="" style={{ marginTop: "50px" }}></div>

      <div className="Login mb-5 ">
        <div className="signInFormDiv signInmain">
          <div className="formDiv">
            <h1 className="signInHeading">LogIn </h1>
            <div className="randomName">
              <form className="signInForm" noValidate autoComplete="off">
                <div className="signInEmail">
                  <InputField
                    label="E-Mail"
                    type="text"
                    id="custom-css-outlined-input"
                    name="email"
                    value={state?.email}
                    handleChange={handleChange}
                  />
                  <p className="errorMsg">
                    {" "}
                    {errorData?.email && errorData.email[0]}
                  </p>
                </div>
                <div className="signInPassword">
                  <InputField
                    label="Password"
                    type={isShowPassword == true ? "text" : "password"}
                    variant="outlined"
                    id="custom-css-outlined-input"
                    name="password"
                    value={state?.password}
                    handleChange={handleChange}
                    onSubmit={onSubmit}
                  />
                  {isShowPassword === true ? (
                    <a
                      className="eyeicon"
                      onClick={() => setPasswordType(false)}
                    >
                      <VisibilityIcon />
                    </a>
                  ) : (
                    <a
                      className="eyeicon"
                      onClick={() => setPasswordType(true)}
                    >
                      <VisibilityOffIcon />
                    </a>
                  )}

                  <p className="errorMsg">
                    {" "}
                    {errorData?.password && errorData.password[0]}
                  </p>
                </div>
                <div className="signInFormOptions">
                  {/* <div className="rememberMeOption">
                    <input
                      type="checkbox"
                      onChange={(e) => setChecked(!checked)}
                    />
                    <label className="pt-1 mt-1">Remember Me</label>
                  </div> */}
                  {/* <Link to={ROUTES.FORGOT_PASSWORD}>
                    <h6>Forgot password?</h6>
                  </Link> */}
                </div>
                <div class="haveaccount text-center py-2">
                  <p className="mb-0">
                    Don't have an account?{" "}
                    <Link to={ROUTES.REGISTER}>
                      <a>Sign up</a>
                    </Link>
                  </p>
                </div>

                <div className="signInButton">
                  <Button
                    background="primary"
                    color="tertiary"
                    name="Sign In"
                    handleClick={onSubmit}
                    loading={loading}
                  />
                </div>
              </form>
            </div>
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
  );
};

export default Login;
