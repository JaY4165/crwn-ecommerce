import { useDispatch, useSelector } from "react-redux";
import { setErrors, updateFormData } from "../../features/sign-up/signUpSlice";
import FormInput from "../formInput/FormInput";
import CustomButton from "../customButton/CustomButton";
import "./sign-up.scss";

const SignUp = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.signUp.formData);
  const errors = useSelector((state) => state.signUp.errors);
  const status = useSelector((state) => state.signUp.status);
  const errorMessage = useSelector((state) => state.signUp.errorMessage);
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.displayName.trim()) {
      errors.displayName = "Display name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    }
    if (
      !formData.email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)
    ) {
      errors.email = "Email is not valid";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      dispatch(setErrors(validationErrors));
    } else {
      dispatch(updateFormData(formData));
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Not registered yet ? Create an account</h2>
      <span>Sign up</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          required
          placeholder="Display Name"
          onChange={handleChange}
        />
        {errors.displayName && (
          <p className="error">{errors.displayName.message}</p>
        )}

        <FormInput type="email" name="email" required placeholder="Email" />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <FormInput
          type="password"
          name="password"
          required
          placeholder="Password"
          onChange={handleChange}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}

        <FormInput
          type="password"
          name="confirmPassword"
          required
          placeholder="Confirm Password"
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword.message}</p>
        )}

        <CustomButton type="submit" className="sign-in">
          Sign Up
        </CustomButton>
      </form>
    </div>
  );
};

export default SignUp;
