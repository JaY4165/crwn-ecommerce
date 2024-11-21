/* eslint-disable no-undef */
// import ShoppingBagSvg from "../../assets/ShoppingBagSvg";
// import "../cartIcon/cart-icon.scss";
import CartDropdown from "../cartDropdown/CartDropdown";
import { ShoppingCartIcon } from "lucide-react";
import { Button } from "../ui/button";
// import { connect } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";

const CartIcon = () => {
  // const [hidden, setHidden] = useState(false);
  // const handleDropDown = () => {
  //   setHidden(!hidden);
  // };
  return (
    <div className="cart-icon">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <ShoppingCartIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
            <span className="sr-only">Toggle Cart</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Your Cart</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <CartDropdown />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

// const mapStateToProps = (state) => ({
//   itemCount: state.cart.cartItems.length,
// });
// export default connect(mapStateToProps, null)(CartIcon);
export default CartIcon;
