const xlsx = require("xlsx");
const Expense = require("../models/Expense");

exports.addExpense = async (req, res) => {
  const userId = req.user._id;

  try {
    const { icon, category, amount, date } = req.body;

    // Validations: Check for missing fields
    if (!category || !amount || !date) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    // Create new expense entry
    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });

    await newExpense.save();
    res.status(200).json(newExpense);
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
};

exports.getAllExpense = async (req, res) => {
  const userId = req.user._id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  } 
};

exports.deleteExpense = async (req, res) => {

  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
};

exports.downloadExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    // Prepare data for Excel export
    const data = expense.map((item) => ({
      category: item.category,
      Amount: item.amount,
      Date: item.date, // Format date as YYYY-MM-DD
      // Icon: expense.icon,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "expense");
    xlsx.writeFile(wb, "expense.xlsx");
    res.download("expense.xlsx");
  } catch (error) {
    res.status(500).json({
      message: "server error",
    })} 
};
