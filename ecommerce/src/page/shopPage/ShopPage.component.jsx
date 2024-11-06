import SHOP_DATA from "./shop-data";
import CollectionPreview from "../../components/collections/CollectionPreview";
import { useState } from "react";

const ShopPage = () => {
  const [shopData] = useState(SHOP_DATA);
  return (
    <div className="shop-page">
      <h1>Shop Page</h1>
        <CollectionPreview shopData={shopData}  />
    </div>
  );
};

export default ShopPage;
