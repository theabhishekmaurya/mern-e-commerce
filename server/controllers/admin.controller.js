const express = require("express");
const verifyToken = require("../utils/verifyToken");
const User = require("../models/user.model");
const Product = require("../models/prod.model");
const router = express.Router();

router.get("/verify", async (req, res) => {
  try {
    const user = await verifyToken(req.headers.token);
    return res.send(user.user.type);
  } catch (error) {
    return res.send(error.msg);
  }
});

router.post("/add-user", async (req, res) => {
  try {
    req.body.verified = true;
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send("User Exists");
    } else {
      await User.create(req.body);
      return res.status(200).send("User added");
    }
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/get-sellers", async (req, res) => {
  try {
    const { user } = await verifyToken(req.headers.token);

    if (user.type === "seller") {
      return res.send([{ name: user.firstName + user.lastName }]);
    }
    const sellers = await User.find({ type: "seller" });
    const sellerNames = sellers.map((seller) => {
      return { name: seller.firstName };
    });
    return res.send(sellerNames);
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/add-product", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.send(product);
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/product/:id", async (req, res) => {
  try {
    const product = await Product.find({ _id: req.params.id });
    return res.send(product);
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/show-products", async (req, res) => {
  try {
    const { sort, filter } = req.query;
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    if (filter === "all") {
      const products = await Product.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .sort(sort)
        .lean()
        .exec();

      const totalProducts = await Product.find().countDocuments();
      const pages = Math.ceil(totalProducts / limit);
      return res.send({ products, pages });
    } else {
      const products = await Product.find()
        .where({
          category: filter,
        })
        .skip((page - 1) * limit)
        .limit(limit)
        .sort(sort)
        .lean()
        .exec();

      const totalProducts = await Product.find()
        .where({
          category: filter,
        })
        .countDocuments();
      const pages = Math.ceil(totalProducts / limit);
      return res.send({ products, pages });
    }
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/all-products", async (req, res) => {
  const products = await Product.find();
  return res.send(products);
});

router.get("/prod/:search", async (req, res) => {
  const term = req.params.search;
  const products = await Product.find();
  const prod = products.filter(
    (item) =>
      item.title.toLowerCase().includes(term.toLowerCase()) ||
      item.category.toLowerCase().includes(term.toLowerCase())
  );

  return res.send(prod);
});

router.get("/show-users", async (req, res) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(404).send("Unauthorized");
  }
  const { user } = await verifyToken(token);
  if (user.type != "admin") {
    return res.status(404).send("Unauthorized");
  }
  try {
    const users = await User.find().lean().exec();
    return res.send(users);
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/approve-seller/:email", async (req, res) => {
  try {
    await User.updateOne(
      { email: req.params.email },
      { sellerReq: false, type: "seller" }
    );
    return res.status(200).send("Updated");
  } catch (error) {
    res.send(error.message);
  }
});

router.delete("/delete-user/:email", async (req, res) => {
  try {
    await User.findOneAndDelete({ email: req.params.email });
    return res.status(200).send("Deleted");
  } catch (error) {
    res.send(error.message);
  }
});

router.delete("/delete-product/:id", async (req, res) => {
  try {
    await Product.findOneAndDelete({ _id: req.params.id });
    return res.status(200).send("Deleted");
  } catch (error) {
    res.send(error.message);
  }
});
module.exports = router;
