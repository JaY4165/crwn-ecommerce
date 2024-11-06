/* eslint-disable react/prop-types */
import CollectionItem from "../collectionItem/CollectionItem";
import "./collection-preview.scss";

const CollectionPreview = ({ shopData }) => {
  return (
    <>
      {
        shopData.map((product) => (
          <div className="collection-preview" key={product.id}>
            <h1 className="title">{product.title}</h1>
            <div className="preview">
              {product.items.slice(0, 4).map((item) => (
                <CollectionItem key={item.id} item={item} />
              ))}
            </div>  
          </div>
        ))
      }
    </>
  );
};

export default CollectionPreview;
