const express = require('express');
const { addExpense, getAllExpense, deleteExpense, downloadExpense } = require('../controllers/expenseController');

const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/add', protect, addExpense);
router.get('/get', protect, getAllExpense);
router.delete('/:id', protect, deleteExpense);
router.get('/downloadexcel', protect, downloadExpense);

module.exports = router;