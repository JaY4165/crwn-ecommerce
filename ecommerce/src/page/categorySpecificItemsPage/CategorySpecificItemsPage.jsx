import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductsPreview from "../../components/productsPreview/ProductsPreview";

const CategorySpecificItemsPage = () => {
  const [products, setProducts] = useState([]);
  const { categoryTitle } = useParams();

  useEffect(() => {
    const getSpecificCategoryProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/shop/categorise/${categoryTitle}`
        );
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSpecificCategoryProducts();
  }, [categoryTitle]);

  return (
    <div className="px-5 mb-10">
      <h1 className="text-4xl font-bold mb-10">
        {products.title?.toUpperCase()}
      </h1>
        <ProductsPreview shopData={products.items} />
    </div>
  );
};

export default CategorySpecificItemsPage;
