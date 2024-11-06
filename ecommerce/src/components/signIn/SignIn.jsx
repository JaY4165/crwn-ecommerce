import CustomButton from "../customButton/CustomButton"
import FormInput from "../formInput/FormInput"
import "./sign-in.scss"

const SignIn = () => {
  return (
      <div className="signIn">
          <h2>I already have an account</h2>
          <span>Sign in with your email and password</span>
          <form>
              <FormInput type="email" name="email" placeholder="Email" />
              <FormInput type="password" name="password" placeholder="Password" />
              <CustomButton type="submit" className="sign-in">Sign in</CustomButton>
          </form>
    </div>
  )
}

export default SignIn