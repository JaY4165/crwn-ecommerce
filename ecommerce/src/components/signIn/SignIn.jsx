import { useEffect, useState } from "react";
import CustomButton from "../customButton/CustomButton";
import FormInput from "../formInput/FormInput";
import "./sign-in.scss";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    if (Object.keys(errors).length === 0) {
      try {
        const res = await axios.post("http://localhost:3000/signin", {
          email,
          password,
        });
        alert("Sign In Successful");
        console.log(res.data);
      } catch (error) {
        alert("Sign in failed, please try again");
        console.log(error);
      }
    } else {
      alert("Sign in Failed, please try again after fixing the errors");
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must have at least 6 characters";
    }
    setErrors(newErrors);
  }, [email, password]);

  return (
    <div className="signIn">
      <h2 className="title">I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          name="email"
          required
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error">{errors.email}</p>}
        <FormInput
          type="password"
          name="password"
          required
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="error">{errors.password}</p>}
        <CustomButton type="submit" className="sign-in" disabled={isSubmitting}>
          Sign in
        </CustomButton>
      </form>
    </div>
  );
};

export default SignIn;
