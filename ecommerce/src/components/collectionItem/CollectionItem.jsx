/* eslint-disable react/prop-types */
// import "./collection-item.scss";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../features/cart/cartSlice";
import { Button } from "../../components/ui/button";
import { ShoppingCartIcon } from "lucide-react";
// import { useToast } from "../../hooks/use-toast";
import { toast } from "sonner";

const CollectionItem = ({ item }) => {
  const dispatch = useDispatch();
  // const { toast } = useToast();

  const handleAddToCart = () => {
    dispatch(addItemToCart(item));
    toast(`${item.name} added to cart successfully`);
  };
  return (
    <div className="pb-20">
      <img
        src={item.imageUrl}
        alt="Product Item"
        className="w-full h-full object-cover bg-cover object-center bg-center rounded-lg"
      />
      <div className="flex justify-between pt-2">
        <span className="text-lg font-semibold">{item.name}</span>
        <span className="price">{item.price}$</span>
      </div>
      <div className="flex justify-end pt-2">
        <Button
          size="sm"
          variant="default"
          className="w-full"
          onClick={handleAddToCart}
        >
          <ShoppingCartIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default CollectionItem;
