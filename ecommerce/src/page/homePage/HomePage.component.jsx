import { useEffect, useState } from "react";
import MenuItem from "../../components/menuItem/MenuItem";
import "./home-page.style.css";
import axios from "axios";

const HomePage = () => {
  // const arr = [1, 2, 3];
  // const [x, y, z] = arr;
  // console.log(x, y, z);

  // const obj = { a: 1, b: 2, c: 3 };
  // const { a, b, c } = obj;
  // console.log(a, b, c);
  const [productsCat, setProductsCat] = useState([]);

  useEffect(() => {
    const getProductData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/categories");
        console.log(res.data.categories);
        setProductsCat(res.data.categories);
      } catch (error) {
        console.log(error);
      }
    };
    getProductData();
  }, []);

  return (
    <div className="home-page">
      <h1>Welcome to my Home Page</h1>
      <div className="directory-menu">
        {productsCat.map((product) => (
          <MenuItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
