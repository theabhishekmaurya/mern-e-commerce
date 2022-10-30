const express = require("express");
const { body, validationResult, check } = require("express-validator");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendmail");
const bcrypt = require("bcryptjs");
const Token = require("../models/token.model");
const User = require("../models/user.model");
const Cart = require("../models/cart.model");
const verifyToken = require("../utils/verifyToken");
const router = express.Router();

const newToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_KEY);
};

//get a user
router.get("/user", async (req, res) => {
  try {
    const { token } = req.headers;
    const { user } = await verifyToken(token);
    // console.log(user);
    return res.send(user);
  } catch (error) {
    return res.send(error.message);
  }
});

//update a user
router.patch("/user", async (req, res) => {
  try {
    const { token } = req.headers;
    const { user } = await verifyToken(token);
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      req.body,
      { new: true }
    );
    const nToken = newToken(updatedUser);

    return res.send({ token: nToken, user: updatedUser });
  } catch (error) {
    return res.send(error.message);
  }
});

//add a new user
router.post(
  "/signup",
  body("firstName").notEmpty().isString(),
  body("email").notEmpty().isEmail(),
  check("password")
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("must be at least 5 chars long")
    .matches(/\d/)
    .withMessage("must contain a number"),
  async (req, res) => {
    try {
      const findUser = await User.findOne({
        email: req.body.email,
      });

      if (findUser) {
        if (!findUser.verified) {
          return res.send({
            emailExists:
              "Email exists but not verified, please try logging in and verify your account",
          });
        }
        return res.send({
          emailExists: "Email already exists, please try logging in",
        });
      }
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.send({ errors: errors.array() });
      }

      const user = await User.create(req.body);

      //create a new Token Object

      const token = await new Token({
        userId: user._id,
        token: newToken(user),
      }).save();

      const url = `${process.env.CLIENT_BASE_URL}/users/${user._id}/verify/${token.token}`;
      const message = "Click on the link to verify your email :" + url;
      sendEmail(user.email, "Verify Email", message);
      res.status(201).send("Verification mail sent");
    } catch (e) {
      res.send(e.message);
    }
  }
);

// login a user
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Enter valid email and password");
    }
    const match = user.checkPassword(password);
    if (!match) {
      return res.status(400).send("Enter valid email and password");
    }

    if (!user.verified) {
      let findToken = await Token.find({ userId: user._id });
      let url = "";
      if (findToken.length == 0) {
        const token = await new Token({
          userId: user._id,
          token: newToken(user),
        }).save();
        url = `${process.env.CLIENT_BASE_URL}/users/${user._id}/verify/${token.token}`;
      } else {
        url = `${process.env.CLIENT_BASE_URL}/users/${user._id}/verify/${findToken[0].token}`;
      }
      const message =
        "Click on this one time link to verify your email :" + url;

      sendEmail(user.email, "Verify Email", message);

      return res.send({ emailSent: "Verification mail sent" });
    } else {
      let token = newToken(user);
      const cart = await Cart.find({ userId: user._id }).populate(
        "cartItems.product"
      );

      return res.send({
        token,
        user,
        cart: cart.length > 0 ? cart[0] : { cartItems: [] },
      });
    }
  } catch (e) {
    res.send(e.message);
  }
});

//verify email
router.get("/:id/verifyuser/:token", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(400).send({ message: "Invalid Link" });
    }
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) {
      return res.status(400).send({ message: "Invalid Link" });
    }
    await User.updateOne({ _id: user._id }, { verified: true });
    await token.remove();
    return res.send("Link verified");
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ message: "Error : " + error.meesage });
  }
});

//forgot password
router.post("/forgot-password", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.resetEmail });

    if (!user) {
      return res.status(400).send("Enter valid email");
    }
    if (!user.verified) {
      return res.status(400).send("Enter valid email");
    }
    let findToken = await Token.findOne({ userId: user._id });
    let url = "";
    if (!findToken) {
      var createToken = await new Token({
        userId: user._id,
        token: newToken(user),
      }).save();
      url = `${process.env.CLIENT_BASE_URL}/users/${user._id}/forgot-password/${createToken.token}`;
    } else {
      url = `${process.env.CLIENT_BASE_URL}/users/${user._id}/forgot-password/${findToken.token}`;
    }
    const message = "Open the one time link to reset the password :" + url;
    sendEmail(req.body.resetEmail, "Password Reset", message);

    res.send("Email sent successfully");
  } catch (error) {
    res.send(error.message);
  }
});

//update password
router.post(
  "/update-password/:id",
  check("newPass")
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("must be at least 5 chars long")
    .matches(/\d/)
    .withMessage("must contain a number"),
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }
      const token = await Token.findOne({ userId: req.params.id });
      var hash = bcrypt.hashSync(req.body.newPass, 8);
      await User.updateOne({ _id: req.params.id }, { password: hash });
      await token.remove();

      res.status(200).send({ msg: "Password Updated" });
    } catch (error) {
      return res.send(error.message);
    }
  }
);

//check update link valid or not
router.get("/update-password/:id/:token", async (req, res) => {
  try {
    const token = await Token.findOne({ token: req.params.token });
    const user = await User.findOne({ _id: req.params.id });
    if (!user || !token) return res.status(400).send({ msg: "Link not valid" });
    else {
      return res.status(200).send("okay");
    }
  } catch (error) {
    res.send(error.message);
  }
});

//seller request (check)
router.get("/check-seller-request", async (req, res) => {
  try {
    const token = req.headers.token;
    const user = await verifyToken(token);

    res.status(200).send(user.user.sellerReq);
  } catch (error) {
    res.send(error.message);
  }
});

//send seller request
router.get("/send-seller-request", async (req, res) => {
  try {
    const token = req.headers.token;
    const user = await verifyToken(token);
    const updatedUser = await User.findOneAndUpdate(
      { _id: user.user._id },
      { sellerReq: true }
    );

    const updatedToken = newToken(updatedUser);
    return res.status(200).send(updatedToken);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
