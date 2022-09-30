const express = require("express");
const { body, validationResult, check } = require("express-validator");
const { appendFile } = require("fs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendmail");
const Token = require("../models/token.model");
const User = require("../models/user.model");

const router = express.Router();

const newToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_KEY);
};

router.get("", async (req, res) => {
  try {
    const users = await User.find().lean().exec();
    res.send(users);
  } catch (e) {
    res.send(e.message);
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
      const findUser = await User.find({
        email: req.body.email,
      }).countDocuments();
      if (findUser != 0) {
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
router.post(
  "/signin",
  body("email").notEmpty().isEmail(),
  body("password").notEmpty(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).send("Enter valid email and password");
      }
      const match = user.checkPassword(password);
      if (!match) {
        res.status(400).send("Enter valid email and password");
      }

      if (!user.verified) {
        let token = await Token.findOne({ userId: user._id });
        if (!token) {
          const token = await new Token({
            userId: user._id,
            token: newToken(user),
          }).save();

          const url = `${process.env.CLIENT_BASE_URL}/users/${user._id}/verify/${token.token}`;
          const message = "Click on the link to verify your email :" + url;
          sendEmail(user.email, "Verify Email", message);
          res.status(201).send("Verification mail sent");
        }
      }

      let token = newToken(user);
      return res.send({ token, user });
    } catch (e) {
      res.send(e.message);
    }
  }
);

//verify email
router.get("/:id/verify/:token", async (req, res) => {
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

    await User.updateOne({ _id: user._id, verified: true });
    await token.remove();
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ message: "Error : " + error.meesage });
  }
});

//forgot password
router.post("/forgot-password", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.resetEmail });
    console.log(user);
    if (!user) {
      return res.status(400).send("Enter valid email");
    }

    const token = newToken(user);
    const url = `${process.env.CLIENT_BASE_URL}/users/${user._id}/forgot-password/${token}`;
    const message = "Open the link to reset the password :" + url;
    sendEmail(req.body.resetEmail, "Password Reset", message);

    res.send("Email sent successfully");
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
