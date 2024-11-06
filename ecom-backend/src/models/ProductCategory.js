import mongoose from "mongoose";

const ProductCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
});
const ProductCategory = mongoose.model(
  "productcategory",
  ProductCategorySchema
);

export default ProductCategory;
