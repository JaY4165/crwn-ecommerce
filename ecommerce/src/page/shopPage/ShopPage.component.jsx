import CollectionPreview from "../../components/collections/CollectionPreview";
import { useEffect, useState } from "react";
import axios from "axios";

const ShopPage = () => {
  const [shopData, setShopData] = useState([]);
  


  useEffect(() => {
      const getShopData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/products");
      setShopData(res.data.shopItems);
    } catch (error) {
      console.log(error);
    }
  }
  getShopData();
  }, [])
  
  return (
    <div className="shop-page">
      <h1>Shop Page</h1>
        <CollectionPreview shopData={shopData}  />
    </div>
  );
};

export default ShopPage;
