import { useEffect, useState } from "react";
import MenuItem from "../../components/menuItem/MenuItem";
import "./home-page.style.css";
import axios from "axios";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";

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
        const res = await axios.get("http://localhost:3000/product-categories");
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
      <div className="w-full h-[60vh] mb-36 flex flex-col space-y-6 items-center justify-center">
        <h1 className="text-6xl font-bold">Welcome To Crwn Clothing</h1>
        {/* <Button className="text-5xl p-2 px-5 rounded-lg" size="xl">
          Shop Now
        </Button> */}

        <Link to="/shop" className="text-white dark:text-black">
          <Button
            className={cn(
              "animate-bg-shine text-5xl p-5 py-8 rounded-lg border-[1px] shadow bg-[length:200%_100%] tracking-wide cursor-pointer",
              "bg-[linear-gradient(110deg,#09090B,45%,#27272A,55%,#09090B)] text-white hover:text-white ",
              "dark:bg-[linear-gradient(110deg,#FFF,45%,#E4E4E7,55%,#FFF)] dark:text-zinc-800 hover:text-black "
            )}
          >
            Shop Now
          </Button>
        </Link>
      </div>
      <div className="directory-menu ">
        {productsCat.map((product) => (
          <MenuItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
