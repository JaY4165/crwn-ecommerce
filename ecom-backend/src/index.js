import express from "express";
import mongoose from "mongoose";
import User from "./models/User.js";
import ProductCategory from "./models/ProductCategory.js";
import Shop from "./models/Shop.js";
import cors from "cors";

const app = express();
const port = 3000;
const URI = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
  })
);

mongoose
  .connect(URI, {
    dbName: dbName,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err.message));

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to db");
});

mongoose.connection.on("error", (err) => {
  console.log(err.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose connection is disconnected");
});

app.post("/signup", (req, res) => {
  const displayName = req.body.displayName;
  const email = req.body.email;
  const password = req.body.password;
  let newSignup = new User({ email, password, displayName });
  newSignup
    .save()
    .then((user) => res.status(200).send(`${user.email} Sign Up Successful`))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err });
    });
});

app.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  await User.findOne({ email, password })
    .then((user) => {
      if (user) {
        res.status(200).json({ user });
      } else {
        res.status(401).json({ errorMessage: "Sign In Failed" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err });
    });
});

app.post("/product-categories/add", async (req, res) => {
  console.log(req.body);
  try {
    const { categoryName, categoryImage } = req.body;
    let productCategory = new ProductCategory({
      title: categoryName,
      id: Date.now(),
      imageUrl: categoryImage,
    });
    productCategory
      .save()
      .then((category) => {
        res.status(201).json(category);
      })
      .catch((err) => {
        res.send(err);
      });
  } catch (err) {
    res.status(500).json({ messsage: err.message });
  }
});

app.get("/product-categories", async (req, res) => {
  try {
    const categories = await ProductCategory.find();
    console.log(categories);
    res.status(200).json({ categories });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

app.delete("/product-categories/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCategory = await ProductCategory.deleteOne({ id });
    res.send(deleteCategory);
  } catch (error) {
    res.send(error);
  }
});

app.get("/products", async (req, res) => {
  try {
    const shopItems = await Shop.find();
    res.json({ shopItems });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

app.post("/products/add", async (req, res) => {
  const data = req.body;
  const newItem = {
    id: Date.now(),
    name: data.name,
    price: data.price,
    imageUrl: data.imageUrl,
  };

  try {
    const routeName = data.category;
    console.log(routeName);
    const shop = await Shop.findOne({ routeName: routeName });
    console.log(shop);
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }
    shop.items.push(newItem);
    const updatedShop = await shop.save();
    res.status(201).json(updatedShop);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

app.post("/shop", async (req, res) => {
  try {
    const categoryProduct = req.body;
    const categoryExists = await Shop.findOne({ id: categoryProduct.id });
    console.log(categoryExists);
    if (!categoryExists) {
      let products = new ShopModel(categoryProduct);
      products
        .save()
        .then((resp) => {
          console.log(resp);
          res.send(resp);
        })
        .catch((error) => console.log("Not able to create product", error));
    } else {
      const { id, items } = req.body;
      const product = items[0];
      const update = {
        $set: {
          "items.$": product,
        },
      };
      let newProducts = ShopModel.updateOne(
        { id: id, "items.id": product.id },
        update,
        {
          upsert: false,
          arrayFilters: [
            {
              "items.id": product.id,
            },
          ],
        }
      ).then((resp) => {
        res.send(resp);
      });
      console.log(newProducts);
    }
  } catch (error) {
    res.send(error);
  }
});

app.put("/products/:id", async (req, res) => {
  const productId = Number(req.params.id);
  const updatedData = req.body;

  try {
    const shop = await Shop.findOne({ "items.id": productId });

    if (!shop) {
      return res.status(404).json({ message: "Product not found" });
    }

    const result = await Shop.findOneAndUpdate(
      { "items.id": productId },
      {
        $set: {
          "items.$.name": updatedData.name,
          "items.$.price": updatedData.price,
          "items.$.imageUrl": updatedData.imageUrl,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!result) {
      return res.status(404).json({ message: "Failed to update product" });
    }
    const updatedProduct = result.items.find((item) => item.id === productId);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      message: "Error updating product",
      error: error.message,
    });
  }
});

app.put("/shop/:id", async (req, res) => {
  const { id, items } = req.body;
  try {
    const categoryExists = await Shop.findOne({ id: id });
    if (categoryExists) {
      const product = items[0];
      const update = {
        $set: {
          "items.$": product,
        },
      };
      let newProducts = Shop.updateOne(
        { id: id, "items.id": product.id },
        update,
        {
          upsert: false,
          arrayFilters: [
            {
              "items.id": product.id,
            },
          ],
        }
      ).then((resp) => {
        res.status(200).send(resp);
      });
    } else {
      res.status(404).send("Category not found");
    }
  } catch (error) {
    res.send(error);
  }
});

app.get("/shop/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const shop = await Shop.findOne({ "items.id": id }, { "items.$": 1 });

    if (!shop || !shop.items.length) {
      return res.status(404).json({ message: "Product not found" });
    }

    const product = shop.items[0];

    console.log(product);

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/shop/categorise/:categoryTitle", async (req, res) => {
  const { categoryTitle } = req.params;
  console.log(categoryTitle);

  try {
    const shop = await Shop.findOne({ routeName: categoryTitle });
    console.log(shop);
    if (!shop) {
      return res
        .status(404)
        .json({ message: "Shop with this title not found" });
    }
    return res.status(200).json(shop);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// app.delete("/product-categories/:id", async (req, res) => {
//   console.log(req.params);
//   const category = await ProductCategory.deleteOne({ id: req.params.id });
//   console.log(category);
//   if (!category) {
//     return next(
//       res.status(204).json({
//         status: "success",
//         message: "No product category found with that ID",
//         data: null,
//       })
//     );
//   }
//   res.status(200).json({
//     status: "success",
//     message: "category deleted successfully",
//     data: null,
//   });
// });
app.delete("/products/:id", async (req, res) => {
  const productId = Number(req.params.id);

  // Start a session for transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find the shop containing the product
    const shop = await Shop.findOne({ "items.id": productId }).session(session);

    if (!shop) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        status: "error",
        message: "Product not found",
        data: null,
      });
    }

    // Remove the product from the items array
    const result = await Shop.findOneAndUpdate(
      { "items.id": productId },
      {
        $pull: {
          items: { id: productId },
        },
      },
      {
        session,
        new: true,
        runValidators: true,
      }
    );

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    if (!result) {
      return res.status(500).json({
        status: "error",
        message: "Failed to delete product",
        data: null,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
      data: {
        productId: productId,
        categoryName: result.routeName,
      },
    });
  } catch (error) {
    // Rollback transaction
    await session.abortTransaction();
    session.endSession();

    console.error("Error deleting product:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      data: null,
      error: error.message,
    });
  }
});

app.get("/shop", async (req, res) => {
  try {
    const shop = await shopData.find();
    res.json(shop);
  } catch (err) {
    res.status(500).json({ messsage: err.message });
  }
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
