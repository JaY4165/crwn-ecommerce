import CrwnsSvg from "../../assets/CrwnsSvg";
import CartIcon from "../cartIcon/CartIcon";
import "./header.scss";
import { NavLink, Outlet } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div>
        <div className="header">
          <div className="logo-container">
            <NavLink to={"/"}> <CrwnsSvg /></NavLink>
          </div>
          <div className="options">
            <div className="option">
              <NavLink to="/shop">SHOP</NavLink>
            </div>
            <div className="option">
              <NavLink to="/auth">SIGN IN</NavLink>
            </div>
            <div className="option">CONTACT</div>
            <CartIcon />
          </div>
        </div>
      </div>
      <Outlet />
    </>

  );
};

export default Header;
