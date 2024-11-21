import CollectionItem from "../collectionItem/CollectionItem";
// import "./products-preview.scss";

/* eslint-disable react/prop-types */
const ProductsPreview = ({ shopData }) => {
  console.log(shopData, "shopData");
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
      {shopData &&
        shopData.map((item) => <CollectionItem key={item.id} item={item} />)}
    </div>
  );
};

export default ProductsPreview;
