import { useDispatch, useSelector } from "react-redux";
import { setErrors, updateFormData } from "../../features/sign-up/signUpSlice";

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

  return <div>SignUp</div>;
};

export default SignUp;
