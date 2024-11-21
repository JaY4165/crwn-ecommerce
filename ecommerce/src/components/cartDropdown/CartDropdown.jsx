import { useSelector } from "react-redux";
import { CartItem } from "../cartItem/cartItem";
// import "./cart-dropdown.scss";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";

const CartDropdown = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log(cartItems);

  return (
    <div className="min-w-[20em] min-h-[5em] ">
      <div className="cart-items py-10 max-h-[20em] overflow-y-scroll">
        {cartItems.length > 0 ? (
          cartItems.map((item) => <CartItem item={item} key={item.id} />)
        ) : (
          <div className="text-center align-middle  text-xl">
            No items in cart
          </div>
        )}
      </div>
      <DropdownMenuItem asChild className="w-full place-self-end mt-5">
        <Link to="/checkout" className="w-full">
          <Button
            className={cn(
              "animate-bg-shine w-full border-[1px] rounded-md shadow bg-[length:200%_100%] tracking-wide cursor-pointer",
              "bg-[linear-gradient(110deg,#09090B,45%,#27272A,55%,#09090B)] text-white hover:text-white ",
              "dark:bg-[linear-gradient(110deg,#FFF,45%,#E4E4E7,55%,#FFF)] dark:text-zinc-800 hover:text-black "
            )}
          >
            Checkout
          </Button>
        </Link>
      </DropdownMenuItem>
    </div>
  );
};

export default CartDropdown;
