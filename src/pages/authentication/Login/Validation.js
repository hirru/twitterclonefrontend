function isBlank(str) {
  return !str || /^\s*$/.test(str);
}

export const ValidateLoginForm = (formData) => {
  const { email, password } = formData || {};
  let error = { email: [], password: [] };
  let isFormValid = true;

  if (isBlank(email) === true) {
    isFormValid = false;
    error.email = ["This field is required."];
  } else if (
    email.trim().length > 0 &&
    /^([a-zA-Z0-9_\.\-]+)@([a-zA-Z0-9_\.\-]+)\.([a-zA-Z]{2,8})$/.test(
      formData.email
    ) === false
  ) {
    isFormValid = false;
    error.email = ["Please enter a valid email address"];
  }

  if (isBlank(password) === true) {
    isFormValid = false;
    error.password = ["This field is required."];
  } else if (
    password?.trim().length > 0 &&
    (password?.trim().length < 6 || password?.trim().length > 15)
  ) {
    isFormValid = false;
    error.password = ["Password length must be between 6 to 15 characters."];
  }

  return { isFormValid, error };
};
