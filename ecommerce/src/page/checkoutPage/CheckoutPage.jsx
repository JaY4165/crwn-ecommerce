import { useSelector } from "react-redux";
import CheckOut from "../../components/checkOut/CheckOut";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log(cartItems, "cart items data");

  return <CheckOut cartItems={cartItems} totalPrice={0} />;
};

export default CheckoutPage;
