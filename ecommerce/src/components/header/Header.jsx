import CrwnsSvg from "../../assets/CrwnsSvg";
import CartIcon from "../cartIcon/CartIcon";
import { ModeToggle } from "../modeToggle/ModeToggle";
import "./header.scss";
import { NavLink, Outlet } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div>
        <div className="header pr-2">
          <div className="logo-container">
            <NavLink to={"/"}>
              <CrwnsSvg />
            </NavLink>
          </div>
          <div className="options">
            <div className="option text-md">
              <NavLink to="/">Home</NavLink>
            </div>
            <div className="option text-md">
              <NavLink to="/shop">Shop</NavLink>
            </div>
            <div className="option text-md">
              <NavLink to="/sign-in">Sign In </NavLink>
            </div>
            <div className="option text-md">
              <NavLink to="/sign-up">Sign Up</NavLink>
            </div>
            <ModeToggle />
            <CartIcon />
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
