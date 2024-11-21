import { Link } from "react-router-dom";
import "./menu-item.scss";

const MenuItem = (props) => {
  // eslint-disable-next-line react/prop-types
  const { title, imageUrl } = props.product;

  return (
    <Link to={`/shop/${title}`} className="menu-item">
      <div
        className="background-image rounded-xl"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="content rounded-lg">
        {
          // eslint-disable-next-line react/prop-types
          <div className="title">{title.toUpperCase()}</div>
        }
        <div className="text-black">Shop Now</div>
      </div>
    </Link>
  );
};

export default MenuItem;
