/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
// import CheckOutItem from "../checkOutItem/CheckOutItem";
// import "./check-out.scss";
import { connect } from "react-redux";

// const Checkout = ({ cartItems, totalPrice }) => {
//   return (
//     <div className="checkout-page">
//       <div className="checkout-header">
//         <div className="header-block">
//           <span>Product</span>
//         </div>
//         <div className="header-block">
//           <span>Description</span>
//         </div>
//         <div className="header-block">
//           <span>Quantity</span>
//         </div>
//         <div className="header-block">
//           <span>Price</span>
//         </div>
//         <div className="header-block">
//           <span>Remove</span>
//         </div>
//       </div>
//       {cartItems.map((item, idx) => (
//         <CheckOutItem key={idx} item={item} />
//       ))}
//       <div className="total">
//         <span>Total: $ {totalPrice}</span>
//       </div>
//       <div className="test-warning">
//         *** Please use the following test credit card for the payments**
//         <br />
//         4242 4242 4242 4242 - Exp: 11/22 - CVV:123
//       </div>
//     </div>
//   );
// };

// import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";

import React from "react";
import CheckOutItem from "../checkOutItem/CheckOutItem";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

const styles = {
  shape: "rect",
  layout: "vertical",
  color: "gold",
};

function Checkout({ cartItems, totalPrice }) {
  const [paymentSuccess, setPaymentSuccess] = React.useState(false);
  const navigate = useNavigate();
  const handleApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      setPaymentSuccess(true);
      toast(
        `Transaction completed by ${details.payer.name.given_name}, redirecting to shop...`
      );
      setTimeout(() => {
        navigate("/shop");
      }, 7000);
    });
  };

  const handleError = (err) => {
    console.error("PayPal Error: ", err);
    alert("An error occurred during the payment process");
  };

  const handleCreateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalPrice,
          },
        },
      ],
    });
  };

  return (
    <React.Fragment>
      <main className="px-10 my-8 grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]">
        <div>
          <h1 className="text-2xl font-bold">Your Cart</h1>
          <div className="mt-4 space-y-4">
            {cartItems.map((item, idx) => (
              <CheckOutItem key={idx} item={item} />
            ))}
          </div>
        </div>
        <div className="space-y-4 mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between font-medium">
                <span>Total</span>
                <span>${totalPrice}</span>
              </div>
            </CardContent>
            <CardFooter className="w-full">
              <PayPalButtons
                style={styles}
                className="w-full"
                createOrder={handleCreateOrder}
                onApprove={handleApprove}
                onError={handleError}
              />
            </CardFooter>
          </Card>
        </div>
      </main>
      {paymentSuccess && <Confetti />}
    </React.Fragment>
  );
}

const mapStateToProps = ({ cart }) => ({
  cartItems: cart.cartItems,
  totalPrice: cart.cartItems.reduce(
    (accumulatedQuantity, cartItem) =>
      accumulatedQuantity + cartItem.quantity * cartItem.price,
    0
  ),
});

export default connect(mapStateToProps, null)(Checkout);
