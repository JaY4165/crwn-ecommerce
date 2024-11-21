import CollectionPreview from "../../components/collections/CollectionPreview";
import { useEffect, useState } from "react";
import axios from "axios";
import { LoaderIcon } from "lucide-react";

const ShopPage = () => {
  const [shopData, setShopData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getShopData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:3000/products");
        setShopData(res.data.shopItems);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getShopData();
  }, []);

  return (
    <div className="shop-page px-5">
      {loading ? (
        <div className="flex justify-center items-center h-[80vh]">
          <LoaderIcon className="animate-spin size-16" />
        </div>
      ) : (
        <CollectionPreview shopData={shopData} />
      )}
    </div>
  );
};

export default ShopPage;
