/* eslint-disable react/prop-types */
import CollectionItem from "../collectionItem/CollectionItem";
// import "./collection-preview.scss";

const CollectionPreview = ({ shopData }) => {
  return (
    <>
      {shopData.map((product) => (
        <div className="mb-20" key={product.id}>
          <h1 className="text-4xl font-bold mb-5">
            {product.title?.toUpperCase()}
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {product.items.slice(0, 4).map((item) => (
              <CollectionItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default CollectionPreview;
