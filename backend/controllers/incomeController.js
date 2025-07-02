const User = require("../models/User");
const Income = require("../models/Income");

exports.addIncome = async (req, res) => {
  const userId = req.user._id;

  try {
    const { icon, source, amount, date } = req.body;

    // Validations: Check for missing fields
    if (!source || !amount || !date) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    // Create new income entry
    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });

    await newIncome.save();
    res.status(200).json(newIncome);
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
};

exports.getAllIncomes = async (req, res) => {};

exports.deleteIncome = async (req, res) => {};

exports.downloadIncomeExcel = async (req, res) => {};
