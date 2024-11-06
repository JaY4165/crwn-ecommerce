import express from "express";
import mongoose from "mongoose";
import User from "./models/User.js";
import ProductCategory from "./models/ProductCategory.js";
import Shop from "./models/Shop.js";

const app = express();
const port = 3000;
const URI = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

app.post("/user", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let newSignup = new User({ email, password });
  newSignup
    .save()
    .then((user) => res.send(`${user.email} Sign Up Successful`))
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

app.get("/categories", async (req, res) => {
  try {
    const categories = await ProductCategory.find({});
    console.log(categories);
    res.json(categories);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.get("/products", async (req, res) => {
  try {
    const shopItems = await Shop.find({});
    console.log(shopItems);
    res.json(shopItems);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
