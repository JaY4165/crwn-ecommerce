import { useDispatch, useSelector } from "react-redux";
import {
  setErrors,
  signUpUser,
  updateFormData,
} from "../../features/sign-up/signUpSlice";
import { Button } from "../../components/ui/button";
import "./sign-up.scss";
import { Input } from "../../components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

const SignUp = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.signUp.formData);
  const errors = useSelector((state) => state.signUp.errors);
  const status = useSelector((state) => state.signUp.status);
  const errorMessage = useSelector((state) => state.signUp.errorMessage);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    dispatch(updateFormData({ [name]: value }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      dispatch(setErrors(validationErrors));
    } else {
      dispatch(signUpUser(formData));
    }
  };

  return (
    <div className="space-y-5">
      <Card className="pt-6">
        <CardTitle className="text-start px-6">Sign Up</CardTitle>
        <CardHeader className="text-start ">
          Not registered yet ? Create an account
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              type="text"
              name="displayName"
              required
              placeholder="Display Name"
              onChange={handleChange}
            />
            {errors.displayName && (
              <p className="error">{errors.displayName.message}</p>
            )}

            <Input
              type="email"
              name="email"
              required
              placeholder="Email"
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}

            <Input
              type="password"
              name="password"
              required
              placeholder="Password"
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}

            <Input
              type="password"
              name="confirmPassword"
              required
              placeholder="Confirm Password"
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword}</p>
            )}

            <Button type="submit" className="sign-in">
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
