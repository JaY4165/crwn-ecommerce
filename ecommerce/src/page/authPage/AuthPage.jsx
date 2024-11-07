import SignIn from "../../components/signIn/SignIn";
import SignUp from "../../components/signUp/SignUp";
import "./auth-page.scss";

const AuthPage = () => {
  return (
    <div className="authentication-container">
      <SignUp />
      <SignIn />
    </div>
  );
};

export default AuthPage;
