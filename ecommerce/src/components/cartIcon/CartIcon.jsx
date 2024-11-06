import { useState } from "react";
import ShoppingBagSvg from "../../assets/ShoppingBagSvg";
import "../cartIcon/cart-icon.scss";
import CartDropdown from "../cartDropdown/CartDropdown";

const CartIcon = () => {
  // const [state, setState] = useState(false);
  // const [users, setUsers] = useState([]);
  const [hidden, setHidden] = useState(false);

  const handleDropdown = () => {
    setHidden(!hidden);
  };

  // this.state = {
  //   hidden: false,
  //   users : [],
  // }

  return (
    <div className="cart-icon" onClick={handleDropdown}>
      <ShoppingBagSvg />
      {hidden ? <CartDropdown /> : null}
    </div>
  );
};

export default CartIcon;
