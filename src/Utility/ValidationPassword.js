export const validatePassword = (password) => {
  const minLength = 8;
  const maxLength = 20;
  const hasNumber = /\d/;
  const hasUppercase = /[A-Z]/;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

  if (password.length < minLength) {
    return `Password must be at least ${minLength} characters.`;
  } else if (password.length > maxLength) {
    return `Password cannot exceed ${maxLength} characters.`;
  } else if (!hasNumber.test(password)) {
    return "Password must contain at least one number.";
  } else if (!hasUppercase.test(password)) {
    return "Password must contain at least one uppercase letter.";
  } else if (!hasSpecialChar.test(password)) {
    return "Password must contain at least one special character.";
  } else {
    return ""; // No errors
  }
};
