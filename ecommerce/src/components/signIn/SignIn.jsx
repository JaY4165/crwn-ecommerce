import "./sign-in.scss";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import {
  setErrors,
  signInUser,
  updateFormData,
} from "../../features/sign-in/signInSlice";

const SignIn = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.signIn.formData);
  const errors = useSelector((state) => state.signIn.errors);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [errors, setErrors] = useState({});
  // const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    dispatch(updateFormData({ [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      dispatch(setErrors(validationErrors));
    } else {
      dispatch(signInUser(formData));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 1) {
      newErrors.password = "Enter a valid password";
    }
    setErrors(newErrors);
  };

  // useEffect(() => {
  //   const newErrors = {};

  //   if (!email) {
  //     newErrors.email = "Email is required";
  //   } else if (!/\S+@\S+\.\S+/.test(email)) {
  //     newErrors.email = "Email is invalid";
  //   }

  //   if (!password) {
  //     newErrors.password = "Password is required";
  //   } else if (password.length < 6) {
  //     newErrors.password = "Password must have at least 6 characters";
  //   }
  //   setErrors(newErrors);
  // }, [email, password]);

  return (
    <div className="">
      <Card className="pt-6">
        <CardTitle className="text-start px-6">Sign in</CardTitle>
        <CardHeader className="text-start">
          I already have an account
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              type="email"
              name="email"
              required
              placeholder="Email"
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
            <Input
              type="password"
              name="password"
              required
              placeholder="Password"
              onChange={handleChange}
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
            <Button type="submit" className="sign-in">
              Sign in
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
