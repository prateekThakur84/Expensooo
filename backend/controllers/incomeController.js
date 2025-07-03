const xlsx = require("xlsx");
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

exports.getAllIncomes = async (req, res) => {
  const userId = req.user._id;

  try {
    const incomes = await Income.find({ userId }).sort({ date: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  } 
};

exports.deleteIncome = async (req, res) => {

  try {
    await Income.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
};

exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const incomes = await Income.find({ userId }).sort({ date: -1 });

    // Prepare data for Excel export
    const data = incomes.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date, // Format date as YYYY-MM-DD
      // Icon: income.icon,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Incomes");
    xlsx.writeFile(wb, "income_details.xlsx");
    res.download("income_details.xlsx");
  } catch (error) {
    res.status(500).json({
      message: "server error",
    })} 
};
