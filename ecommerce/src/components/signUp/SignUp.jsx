import CustomButton from "../customButton/CustomButton";
import FormInput from "../formInput/FormInput";
import "./sign-up.scss";
import axios from "axios";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isSubmitting },
    watch,
  } = useForm({
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSignUp = async (data) => {
    console.log(data);
    try {
      const res = await axios.post("http://localhost:3000/signup", {
        displayName: data.displayName,
        email: data.email,
        password: data.password,
      });
      alert("Sign Up Successful");
      console.log(res.data);
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      alert(`Sign up failed: ${errorMessage}`);
      console.log(error);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Not registered yet? Create an account</h2>
      <span>Sign up</span>
      <form onSubmit={handleSubmit(handleSignUp)}>
        <FormInput
          type="text"
          name="displayName"
          required
          placeholder="Display Name"
          {...register("displayName", { required: "Display Name is required" })}
        />
        {formErrors.displayName && (
          <p className="error">{formErrors.displayName.message}</p>
        )}

        <FormInput
          type="email"
          name="email"
          required
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "Email is invalid",
            },
          })}
        />
        {formErrors.email && (
          <p className="error">{formErrors.email.message}</p>
        )}

        <FormInput
          type="password"
          name="password"
          required
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must have at least 6 characters",
            },
          })}
        />
        {formErrors.password && (
          <p className="error">{formErrors.password.message}</p>
        )}

        <FormInput
          type="password"
          name="confirmPassword"
          required
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
        />
        {formErrors.confirmPassword && (
          <p className="error">{formErrors.confirmPassword.message}</p>
        )}

        <CustomButton type="submit" className="sign-in" disabled={isSubmitting}>
          Sign Up
        </CustomButton>
      </form>
    </div>
  );
};

export default SignUp;
