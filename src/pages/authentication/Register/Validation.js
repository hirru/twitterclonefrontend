function isBlank(str) {
  return !str || /^\s*$/.test(str);
}
function isNumber(str) {
  var reg = /^\d+$/;
  return reg.test(str);
}

export const ValidateSignupForm = (formData) => {
  const { firstName, lastName, email, password, confirmPassword } =
    formData || {};
  let error = {
    firstName: [],
    lastName: [],
    email: [],
    password: [],
    confirmPassword: [],
  };
  let isFormValid = true;
  if (isBlank(firstName) === true) {
    isFormValid = false;
    error.firstName = ["This field is required."];
  } else if (firstName?.trim().length > 0 && firstName?.trim().length > 50) {
    isFormValid = false;
    error.firstName = ["Name cannot be greater than 50."];
  }
  if (isBlank(lastName) === true) {
    isFormValid = false;
    error.lastName = ["This field is required."];
  } else if (lastName?.trim().length > 0 && lastName?.trim().length > 50) {
    isFormValid = false;
    error.lastName = ["Last Name cannot be greater than 50."];
  }

  if (isBlank(email) === true) {
    isFormValid = false;
    error.email = ["This field is required."];
  } else if (
    email.trim().length > 0 &&
    /^([a-zA-Z0-9_\.\-]+)@([a-zA-Z0-9_\.\-]+)\.([a-zA-Z]{2,5})$/.test(
      formData.email
    ) === false
  ) {
    isFormValid = false;
    error.email = ["This must be a valid email address."];
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
  if (isBlank(confirmPassword) === true) {
    isFormValid = false;
    error.confirmPassword = ["This field is required."];
  } else if (
    confirmPassword?.trim().length > 0 &&
    confirmPassword?.trim().length > 0 &&
    password?.trim() !== confirmPassword?.trim()
  ) {
    isFormValid = false;
    error.confirmPassword = ["Passwords Don’t Match!"];
  }

  return { isFormValid, error };
};
