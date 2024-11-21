/* eslint-disable react/prop-types */
import "./checkout-item.scss";

import { connect } from "react-redux";
import {
  addItemToCart,
  clearItem,
  removeItem,
} from "../../features/cart/cartSlice";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { DeleteIcon, MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";

const CheckOutItem = ({ item, addItem, clearItem, removeItem }) => {
  const { name, imageUrl, price, quantity } = item;
  return (
    // <div className="checkout-item">
    //   <div className="image-container">
    //     <img src={imageUrl} alt="item" />
    //   </div>
    //   <span className="name">{name}</span>

    //   <span className="quantity">
    //     <span onClick={() => clearItem(item)} className="arrow">
    //       &#10094;
    //     </span>
    //     {quantity}
    //     <span onClick={() => addItem(item)} className="arrow">
    //       &#10095;
    //     </span>
    //   </span>
    //   <span className="price">{price}</span>
    //   <div onClick={() => removeItem(item)} className="remove-button">
    //     &#10005;
    //   </div>
    // </div>
    <Card className="flex items-center gap-4 rounded-lg  p-4 shadow-sm ">
      <img
        src={imageUrl}
        width={80}
        height={80}
        alt="Product Image"
        className="rounded-md"
        style={{ aspectRatio: "80/80", objectFit: "cover" }}
      />
      <div className="flex-1">
        <h3 className="text-lg font-medium">{name}</h3>
        <p className="text-gray-500 dark:text-gray-400">{price}$</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => clearItem(item)}>
          <MinusIcon className="h-4 w-4" />
        </Button>
        <span>{quantity}</span>
        <Button variant="outline" size="icon" onClick={() => addItem(item)}>
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className="cursor-pointer text-red-500">
        <Trash2Icon className="h-4 w-4" onClick={() => removeItem(item)} />
      </div>
    </Card>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItemToCart(item)),
  clearItem: (item) => dispatch(clearItem(item)),
  removeItem: (item) => dispatch(removeItem(item)),
});
export default connect(null, mapDispatchToProps)(CheckOutItem);
