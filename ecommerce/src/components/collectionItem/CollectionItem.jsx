/* eslint-disable react/prop-types */
import CustomButton from "../customButton/CustomButton";
import "./collection-item.scss"
const CollectionItem = ({ item }) => {
  return (
    <div className="collection-item">
      <div
        className="image"
        style={{
          backgroundImage: `url(${item.imageUrl})`,
        }}
      ></div>
      <div className="collection-footer">
        <span className="name">{item.name}</span>
        <span className="price">{item.price}</span>
        <CustomButton>Add to cart</CustomButton>
      </div>
    </div>
  );
};

export default CollectionItem;
