const bcrypt = require("bcrypt");
const User = require("../models/UserSchema");
const jwt = require("jsonwebtoken");
const AccountModel = require("../models/AccountSchema");
const { stringify } = require("querystring");

const userObject = {
  signUp: async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        fullName,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({ message: "Signup successful", token });
    } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).json({ error: "An error occurred during signup" });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid email or password" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ error: "Invalid email or password" });
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "An error occurred during login" });
    }
  },
  accountDetails: async (req, res) => {
    try {
      const { accountNumber, ifsc, phoneNumber } = req.body;
      if (accountNumber.toString().length <= 8) {
        return res.status(400).json({ error: " enter a valid account number" });
      }
      const accountDetails = new AccountModel({
        accountNumber,
        phoneNumber,
        ifsc,
      }).save();
      res.status(200).json({ message: "account details saved successfully" });
    } catch (errr) {
      console.error("Account details error", errr);
      res
        .status(500)
        .json({ error: "An error occurred saveing account details " });
    }
  },
  deposit: async (req, res) => {
    try {
      const { amount, accountNumber } = req.body;
      const val = await AccountModel.findOne({ accountNumber });
      const updatedAccount = await AccountModel.findOneAndUpdate(
        { accountNumber },
        { $inc: { balance: amount } },
        { new: true }
      );
      res.status(200).json({ message: " money deposited " });
    } catch (err) {
      console.error(" Error while deposite money", err);
      res.status(500).json({ err });
    }
  },
  withdrawal: async (req, res) => {
    try {
      const { amount, accountNumber } = req.body;
      const account = await AccountModel.findOne({
        accountNumber: accountNumber,
      });

      if (!account) {
        return res.status(404).json({ message: "Account not found" });
      }

      if (account.balance < amount) {
        return res.status(400).json({ message: "Insufficient funds" });
      }

      const updatedAccount = await AccountModel.findOneAndUpdate(
        { accountNumber },
        { $inc: { balance: -amount } },
        { new: true }
      );

      res.status(200).json({
        message: "Money withdrawn",
        newBalance: updatedAccount.balance,
      });
    } catch (err) {
      console.error("Error while withdrawing money", err);
      res.status(500).json({ err });
    }
  },
  checkBalance: async (req, res) => {
    try {
      const { accountNumber } = req.params;

      const account = await AccountModel.findOne({ accountNumber });

      if (!account) {
        return res.status(404).json({ message: "Account not found" });
      }

      res.status(200).json({ balance: account.balance });
    } catch (err) {
      console.error("Error while checking balance", err);
      res.status(500).json( err );
    }
  },
};

module.exports = userObject;
