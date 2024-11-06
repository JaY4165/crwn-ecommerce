import mongoose from "mongoose";

const ShopSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  routeName: {
    type: String,
    required: true,
  },
  items: [
    {
      id: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      imageUrl: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Shop = mongoose.model("shop", ShopSchema);

export default Shop;
