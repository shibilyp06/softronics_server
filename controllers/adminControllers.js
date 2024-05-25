const AccountModel = require("../models/AccountSchema");

const obj = {
  blockuser: async (req, res) => {
    try {
      const { id } = req.params;
      const account = await AccountModel.findOneAndUpdate(
        { accountNumber: id },
        { block: true },
        { new: true }
      );
      res.status(200).json({ message: "usewr blocked " });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: " internal server error " });
    }
  },
};

module.exports = Object;
